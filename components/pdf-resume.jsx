// pdf-resume.jsx
"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";

// 🎨 Professional Color Palette
const colors = {
  dark: "#1e293b",
  darker: "#0f172a",
  light: "#f8fafc",
  primary: "#3b82f6",
  secondary: "#1e40af",
  text: "#334155",
  muted: "#64748b",
  border: "#e2e8f0",
  accent: "#2563eb",
  success: "#10b981",
  warning: "#f59e0b",
};

// 📄 Professional Resume Layout Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },

  // ===== SIDEBAR =====
  sidebar: {
    width: "35%",
    backgroundColor: colors.dark,
    color: "#ffffff",
    padding: 25,
    flexDirection: "column",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    borderBottom: `1pt solid ${colors.primary}`,
    paddingBottom: 15,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 12,
    border: `3pt solid ${colors.primary}`,
    backgroundColor: colors.darker,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: "#e2e8f0",
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  contactIcon: {
    width: 12,
    marginRight: 6,
  },

  // Sidebar Sections
  sidebarSection: {
    marginBottom: 16,
  },
  sidebarSectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottom: `1pt solid ${colors.primary}`,
    paddingBottom: 3,
    letterSpacing: 0.5,
  },
  skillTag: {
    backgroundColor: colors.primary,
    color: "#ffffff",
    borderRadius: 12,
    padding: "4px 10px",
    fontSize: 8,
    marginRight: 5,
    marginBottom: 6,
    textAlign: "center",
    fontWeight: "bold",
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listItem: {
    fontSize: 9,
    color: "#e2e8f0",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    marginRight: 6,
    fontSize: 8,
  },

  // ===== MAIN CONTENT =====
  main: {
    width: "65%",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.dark,
    textTransform: "uppercase",
    borderBottom: `2pt solid ${colors.primary}`,
    paddingBottom: 5,
    marginBottom: 12,
    letterSpacing: 0.8,
  },
  summaryText: {
    fontSize: 10,
    color: colors.text,
    textAlign: "justify",
    lineHeight: 1.5,
  },

  // Experience & Education Entries
  entry: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 6,
    borderLeft: `3pt solid ${colors.primary}`,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  entryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 2,
  },
  entryOrg: {
    fontSize: 10,
    color: colors.muted,
    fontStyle: "italic",
    marginBottom: 3,
  },
  entryDate: {
    fontSize: 9,
    color: colors.muted,
    fontWeight: "bold",
    backgroundColor: "#f1f5f9",
    padding: "3px 8px",
    borderRadius: 10,
    minWidth: 100,
    textAlign: "center",
  },
  currentBadge: {
    backgroundColor: colors.success,
    color: "#ffffff",
    fontSize: 7,
    fontWeight: "bold",
    padding: "2px 6px",
    borderRadius: 8,
    marginLeft: 5,
  },
  entryDescription: {
    marginTop: 6,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "flex-start",
  },
  bullet: {
    color: colors.primary,
    marginRight: 6,
    fontSize: 10,
    fontWeight: "bold",
  },
  bulletText: {
    fontSize: 9.5,
    color: colors.text,
    lineHeight: 1.4,
    flex: 1,
  },

  // Education Specific
  educationEntry: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f0fdf4",
    borderRadius: 6,
    borderLeft: `3pt solid ${colors.success}`,
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 2,
  },
  educationInstitution: {
    fontSize: 10,
    color: colors.muted,
    fontStyle: "italic",
  },

  // Projects Specific
  projectEntry: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fef7ff",
    borderRadius: 6,
    borderLeft: `3pt solid ${colors.warning}`,
  },
});

// 🧩 Enhanced Content Parser
const parseResumeContent = (content) => {
  if (!content) return { sections: [] };

  // Clean content
  const cleanContent = content
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '')
    .replace(/align="[^"]*"/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  const sections = [];
  const lines = cleanContent.split('\n');
  let currentSection = { type: '', content: [], entries: [] };
  let currentEntry = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) return;

    // Section detection
    if (trimmedLine.startsWith('## ')) {
      if (currentSection.type && (currentSection.entries.length > 0 || currentSection.content.length > 0)) {
        sections.push(currentSection);
      }
      currentSection = {
        type: trimmedLine.replace('## ', '').trim(),
        content: [],
        entries: []
      };
      currentEntry = null;
    }
    // Entry title detection (###)
    else if (trimmedLine.startsWith('### ')) {
      if (currentEntry) {
        currentSection.entries.push(currentEntry);
      }
      currentEntry = {
        title: trimmedLine.replace('### ', '').trim(),
        organization: '',
        date: '',
        bullets: [],
        institution: '',
        current: false
      };
    }
    // Bold text (organization/date)
    else if (trimmedLine.includes('**') && (trimmedLine.includes(' – ') || trimmedLine.includes(' - '))) {
      if (currentEntry) {
        const separator = trimmedLine.includes(' – ') ? ' – ' : ' - ';
        const parts = trimmedLine.split(separator);
        if (parts.length >= 2) {
          currentEntry.organization = parts[0].replace(/\*\*/g, '').trim();
          currentEntry.date = parts[1].replace(/\*\*/g, '').trim();
          currentEntry.current = currentEntry.date.includes('Present');
        }
      }
    }
    // Bold text (date only for education)
    else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      if (currentEntry && !currentEntry.date) {
        currentEntry.date = trimmedLine.replace(/\*\*/g, '').trim();
        currentEntry.current = currentEntry.date.includes('Present');
      }
    }
    // Italic text (institution)
    else if (trimmedLine.startsWith('_') && trimmedLine.endsWith('_')) {
      if (currentEntry) {
        currentEntry.institution = trimmedLine.replace(/_/g, '').trim();
      }
    }
    // Bullet points
    else if (trimmedLine.startsWith('- ')) {
      const bulletText = trimmedLine.replace('- ', '').trim();
      if (currentEntry) {
        currentEntry.bullets.push(bulletText);
      } else {
        currentSection.content.push(bulletText);
      }
    }
    // Regular text
    else if (!trimmedLine.startsWith('---')) {
      if (currentEntry) {
        currentEntry.bullets.push(trimmedLine);
      } else {
        currentSection.content.push(trimmedLine);
      }
    }
  });

  // Push the last entry and section
  if (currentEntry) {
    currentSection.entries.push(currentEntry);
  }
  if (currentSection.type) {
    sections.push(currentSection);
  }

  return { sections, cleanContent };
};

const PDFResume = ({ content, profileImage, personalInfo }) => {
  const { sections } = parseResumeContent(content);

  // Extract skills from content or use form data
  const extractSkills = () => {
    const skillsSection = sections.find(s => s.type.toLowerCase().includes('skill'));
    if (skillsSection && skillsSection.content.length > 0) {
      const skillsText = skillsSection.content.join(' ');
      return skillsText.split(/[,•·]/)
        .map(skill => skill.trim())
        .filter(skill => skill && skill.length > 1)
        .slice(0, 12); // Limit to 12 skills
    }
    return ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"];
  };

  const skills = extractSkills();

  // ===== SIDEBAR RENDER =====
  const renderSidebar = () => (
    <View style={styles.sidebar}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image src={profileImage} style={styles.profileImage} />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.darker,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
            >
              <Text style={{ color: "#cbd5e1", fontSize: 9, fontWeight: "bold" }}>PROFILE</Text>
              <Text style={{ color: "#94a3b8", fontSize: 7, marginTop: 2 }}>IMAGE</Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{personalInfo?.name || "Your Name"}</Text>
        <Text style={styles.title}>{personalInfo?.title || "Professional Title"}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Contact</Text>
        {personalInfo?.email && (
          <Text style={styles.contactInfo}>
            <Text style={styles.contactIcon}>📧</Text> {personalInfo.email}
          </Text>
        )}
        {personalInfo?.mobile && (
          <Text style={styles.contactInfo}>
            <Text style={styles.contactIcon}>📱</Text> {personalInfo.mobile}
          </Text>
        )}
        {personalInfo?.linkedin && personalInfo.linkedin !== 'https://linkedin.com/in/' && (
          <Text style={styles.contactInfo}>
            <Text style={styles.contactIcon}>💼</Text> LinkedIn
          </Text>
        )}
        {personalInfo?.twitter && personalInfo.twitter !== 'https://twitter.com/' && (
          <Text style={styles.contactInfo}>
            <Text style={styles.contactIcon}>🐦</Text> Twitter
          </Text>
        )}
      </View>

      {/* Skills */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Technical Skills</Text>
        <View style={styles.skillRow}>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.skillTag}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {/* Languages */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Languages</Text>
        <Text style={styles.listItem}>
          <Text style={styles.bullet}>•</Text> English (Professional)
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bullet}>•</Text> Hindi (Native)
        </Text>
      </View>

      {/* Interests */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Interests</Text>
        <Text style={styles.listItem}>
          <Text style={styles.bullet}>•</Text> Web Development
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bullet}>•</Text> Open Source
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bullet}>•</Text> UI/UX Design
        </Text>
      </View>
    </View>
  );

  // ===== MAIN CONTENT RENDER =====
  const renderExperience = (section) => {
    return section.entries.map((entry, index) => (
      <View key={index} style={styles.entry}>
        <View style={styles.entryHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.entryTitle}>{entry.title}</Text>
            {entry.organization && (
              <Text style={styles.entryOrg}>{entry.organization}</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.entryDate}>{entry.date}</Text>
            {entry.current && (
              <Text style={styles.currentBadge}>CURRENT</Text>
            )}
          </View>
        </View>
        
        {entry.bullets.length > 0 && (
          <View style={styles.entryDescription}>
            {entry.bullets.map((bullet, bulletIndex) => (
              <View key={bulletIndex} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    ));
  };

  const renderEducation = (section) => {
    return section.entries.map((entry, index) => (
      <View key={index} style={styles.educationEntry}>
        <View style={styles.entryHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.educationDegree}>{entry.title}</Text>
            {entry.institution && (
              <Text style={styles.educationInstitution}>{entry.institution}</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.entryDate}>{entry.date}</Text>
            {entry.current && (
              <Text style={styles.currentBadge}>CURRENT</Text>
            )}
          </View>
        </View>
        
        {entry.bullets.length > 0 && (
          <View style={styles.entryDescription}>
            {entry.bullets.map((bullet, bulletIndex) => (
              <View key={bulletIndex} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    ));
  };

  const renderProjects = (section) => {
    return section.entries.map((entry, index) => (
      <View key={index} style={styles.projectEntry}>
        <View style={styles.entryHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.entryTitle}>{entry.title}</Text>
            {entry.organization && (
              <Text style={styles.entryOrg}>{entry.organization}</Text>
            )}
          </View>
          <Text style={styles.entryDate}>{entry.date}</Text>
        </View>
        
        {entry.bullets.length > 0 && (
          <View style={styles.entryDescription}>
            {entry.bullets.map((bullet, bulletIndex) => (
              <View key={bulletIndex} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    ));
  };

  const renderSummary = (section) => {
    const summaryText = section.content.join(' ');
    return <Text style={styles.summaryText}>{summaryText}</Text>;
  };

  const renderSkills = (section) => {
    // Skills are already displayed in sidebar, so we can show additional info here
    return (
      <Text style={styles.summaryText}>
        {section.content.join(' ')}
      </Text>
    );
  };

  const renderSection = (section) => {
    const sectionType = section.type.toLowerCase();

    let sectionTitle = section.type.toUpperCase();
    let contentRenderer = null;

    switch(sectionType) {
      case 'professional summary':
      case 'profile':
        sectionTitle = 'PROFESSIONAL PROFILE';
        contentRenderer = () => renderSummary(section);
        break;
      case 'skills':
        sectionTitle = 'TECHNICAL SKILLS';
        contentRenderer = () => renderSkills(section);
        break;
      case 'work experience':
        sectionTitle = 'PROFESSIONAL EXPERIENCE';
        contentRenderer = () => renderExperience(section);
        break;
      case 'education':
        sectionTitle = 'EDUCATION';
        contentRenderer = () => renderEducation(section);
        break;
      case 'projects':
        sectionTitle = 'PROJECTS';
        contentRenderer = () => renderProjects(section);
        break;
      default:
        return null;
    }

    return (
      <View style={styles.section} key={section.type}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        {contentRenderer()}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderSidebar()}
        <View style={styles.main}>
          {sections.length > 0 ? (
            sections.map(renderSection)
          ) : (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROFESSIONAL PROFILE</Text>
              <Text style={styles.summaryText}>
                Experienced professional with a strong background in software development and team leadership. 
                Passionate about creating efficient, scalable solutions and mentoring junior developers.
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

// Generate resume PDF
export const generateResumePDF = async (content, profileImage = null, personalInfo = {}) => {
  try {
    console.log('🔄 Generating professional PDF resume...');
    
    const blob = await pdf(
      <PDFResume 
        content={content} 
        profileImage={profileImage} 
        personalInfo={personalInfo} 
      />
    ).toBlob();
    
    console.log('✅ Professional PDF resume generated successfully!');
    return blob;
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

export default PDFResume;