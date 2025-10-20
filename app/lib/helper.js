// app/lib/helper.js
export const entriesToMarkdown = (entries, sectionTitle) => {
  if (!entries || entries.length === 0) return '';

  const entriesMarkdown = entries.map((entry, index) => {
    let markdown = `### ${entry.title}\n\n`;
    
    if (entry.organization && sectionTitle.toLowerCase() !== 'education') {
      markdown += `**${entry.organization}** – ${entry.startDate}${entry.endDate ? ` – ${entry.endDate}` : entry.current ? ' – Present' : ''}\n\n`;
    } else if (sectionTitle.toLowerCase() === 'education') {
      markdown += `**${entry.startDate}${entry.endDate ? ` – ${entry.endDate}` : entry.current ? ' – Present' : ''}**\n`;
      if (entry.organization) {
        markdown += `_${entry.organization}_\n\n`;
      } else {
        markdown += '\n';
      }
    } else {
      markdown += `**${entry.startDate}${entry.endDate ? ` – ${entry.endDate}` : entry.current ? ' – Present' : ''}**\n\n`;
    }
    
    if (entry.description) {
      const bulletPoints = entry.description.split('\n').filter(line => line.trim());
      bulletPoints.forEach(point => {
        markdown += `- ${point.trim()}\n`;
      });
    }
    
    if (index < entries.length - 1) {
      markdown += '\n---\n\n';
    }
    
    return markdown;
  }).join('');

  return entriesMarkdown ? `## ${sectionTitle}\n\n${entriesMarkdown}` : '';
};

export const educationToMarkdown = (entries) => {
  return entriesToMarkdown(entries, 'Education');
};

export const cleanMarkdownContent = (content) => {
  if (!content) return '';
  return content
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '')
    .replace(/align="[^"]*"/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
};

// Add template-specific helper
export const applyTemplateToForm = (template, setValue, user) => {
  if (!template?.structure) return;

  const personal = template.structure.personalInfo || {};
  Object.keys(personal).forEach((key) => {
    try {
      setValue(`personalInfo.${key}`, personal[key]);
    } catch (e) {
      // ignore if field path doesn't exist in the form
    }
  });

  // Prefer logged-in user's name when available
  if (user?.fullName) {
    setValue('personalInfo.name', user.fullName);
  }

  setValue('summary', template.structure.summary || '');
  setValue('skills', template.structure.skills || '');

  // Populate arrays (experience, education, projects) if present
  setValue('experience', template.structure.experience || []);
  setValue('education', template.structure.education || []);
  setValue('projects', template.structure.projects || []);

  return template;
};