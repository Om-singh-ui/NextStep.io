// app/data/resume-templates.js
export const resumeTemplates = [
  {
    id: 'modern-tech',
    name: 'Modern Tech Resume',
    description: 'Clean, professional template for software developers',
    structure: {
      personalInfo: {
        name: 'John Doe',
        title: 'Senior Software Engineer',
        email: 'john.doe@email.com',
        mobile: '+1 234 567 8900',
        linkedin: 'https://linkedin.com/in/johndoe',
        location: 'San Francisco, CA'
      },
      summary: 'Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable applications and leading engineering teams. Strong expertise in JavaScript, React, Node.js, and cloud technologies.',
      skills: 'JavaScript, React, Node.js, Python, AWS, Docker, MongoDB, PostgreSQL, Git, Agile Methodologies',
      experience: [
        {
          title: 'Senior Software Engineer',
          organization: 'Tech Company Inc',
          startDate: 'Jan 2022',
          endDate: 'Present',
          current: true,
          description: 'Lead development of microservices architecture\nMentored junior developers and conducted code reviews\nImproved application performance by 40% through optimization'
        },
        {
          title: 'Software Developer',
          organization: 'Startup XYZ',
          startDate: 'Jun 2019',
          endDate: 'Dec 2021',
          current: false,
          description: 'Developed full-stack web applications using React and Node.js\nCollaborated with product team to implement new features\nReduced page load time by 60% through code optimization'
        }
      ],
      education: [
        {
          title: 'Bachelor of Science in Computer Science',
          organization: 'University of Technology',
          startDate: '2015',
          endDate: '2019',
          current: false,
          description: 'Graduated Magna Cum Laude\nRelevant Coursework: Data Structures, Algorithms, Web Development'
        }
      ],
      projects: [
        {
          title: 'E-commerce Platform',
          organization: 'Personal Project',
          startDate: '2023',
          endDate: 'Present',
          current: true,
          description: 'Built a full-stack e-commerce solution using Next.js and MongoDB\nImplemented payment integration with Stripe\nDeployed on AWS with CI/CD pipeline'
        }
      ]
    }
  },
  {
    id: 'fresh-graduate',
    name: 'Fresh Graduate Template',
    description: 'Perfect for recent graduates and entry-level positions',
    structure: {
      personalInfo: {
        name: 'Jane Smith',
        title: 'Junior Software Developer',
        email: 'jane.smith@email.com',
        mobile: '+1 234 567 8901',
        linkedin: 'https://linkedin.com/in/janesmith',
        location: 'New York, NY'
      },
      summary: 'Recent Computer Science graduate with strong foundation in software engineering principles. Eager to apply academic knowledge and internship experience to real-world projects. Quick learner with excellent problem-solving skills.',
      skills: 'Java, Python, JavaScript, HTML/CSS, SQL, Git, Data Structures, Algorithms',
      experience: [
        {
          title: 'Software Development Intern',
          organization: 'Innovative Solutions LLC',
          startDate: 'Jun 2022',
          endDate: 'Aug 2022',
          current: false,
          description: 'Assisted in developing web applications using React and Node.js\nParticipated in agile development processes\nWrote unit tests achieving 90% code coverage'
        }
      ],
      education: [
        {
          title: 'Bachelor of Computer Science',
          organization: 'State University',
          startDate: '2018',
          endDate: '2022',
          current: false,
          description: 'GPA: 3.8/4.0\nDean\'s List for 4 semesters\nSenior Project: Machine Learning-based recommendation system'
        }
      ],
      projects: [
        {
          title: 'Task Management App',
          organization: 'Academic Project',
          startDate: '2021',
          endDate: '2022',
          current: false,
          description: 'Developed a full-stack task management application\nUsed React for frontend and Express.js for backend\nImplemented user authentication and real-time updates'
        },
        {
          title: 'Weather Forecast App',
          organization: 'Personal Project',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: 'Built a responsive weather application using React\nIntegrated with OpenWeather API\nFeatures location-based forecasts and historical data'
        }
      ]
    }
  },
  {
    id: 'executive',
    name: 'Executive Template',
    description: 'Professional template for senior roles and leadership positions',
    structure: {
      personalInfo: {
        name: 'Michael Johnson',
        title: 'Technical Director',
        email: 'm.johnson@email.com',
        mobile: '+1 234 567 8902',
        linkedin: 'https://linkedin.com/in/michaeljohnson',
        location: 'Chicago, IL'
      },
      summary: 'Seasoned technology leader with 15+ years of experience driving digital transformation and building high-performing engineering teams. Proven track record in delivering complex projects on time and within budget. Strong background in strategic planning and cross-functional collaboration.',
      skills: 'Strategic Planning, Team Leadership, Project Management, Cloud Architecture, DevOps, Agile/Scrum, Budget Management, Stakeholder Communication',
      experience: [
        {
          title: 'Technical Director',
          organization: 'Global Tech Corp',
          startDate: 'Mar 2020',
          endDate: 'Present',
          current: true,
          description: 'Lead a team of 50+ engineers across multiple projects\nOversaw $10M annual technology budget\nDrove adoption of microservices architecture across organization'
        },
        {
          title: 'Senior Engineering Manager',
          organization: 'Enterprise Solutions Inc',
          startDate: 'Apr 2015',
          endDate: 'Feb 2020',
          current: false,
          description: 'Managed three engineering teams totaling 25 developers\nImplemented CI/CD pipelines reducing deployment time by 70%\nMentored and promoted 8 engineers to senior positions'
        },
        {
          title: 'Software Architect',
          organization: 'Innovative Tech Partners',
          startDate: 'Jun 2010',
          endDate: 'Mar 2015',
          current: false,
          description: 'Designed and implemented scalable system architectures\nLed migration from monolithic to service-oriented architecture\nEstablished coding standards and best practices'
        }
      ],
      education: [
        {
          title: 'Master of Business Administration',
          organization: 'Prestigious Business School',
          startDate: '2008',
          endDate: '2010',
          current: false,
          description: 'Focus on Technology Management\nGraduated with Honors'
        },
        {
          title: 'Bachelor of Science in Computer Engineering',
          organization: 'Top Engineering University',
          startDate: '2004',
          endDate: '2008',
          current: false,
          description: 'Magna Cum Laude\nPresident of Computer Science Club'
        }
      ]
    }
  },
  {
    id: 'minimalist',
    name: 'Minimalist Template',
    description: 'Clean, concise template focusing on essential information',
    structure: {
      personalInfo: {
        name: 'Alex Chen',
        title: 'Full Stack Developer',
        email: 'alex.chen@email.com',
        mobile: '+1 234 567 8903',
        linkedin: 'https://linkedin.com/in/alexchen',
        location: 'Seattle, WA'
      },
      summary: 'Full stack developer specializing in building efficient, user-friendly web applications. Strong focus on code quality and performance optimization.',
      skills: 'TypeScript, React, Next.js, Node.js, PostgreSQL, GraphQL, Docker, AWS',
      experience: [
        {
          title: 'Full Stack Developer',
          organization: 'Digital Creations',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: 'Develop and maintain multiple client projects\nImplement responsive designs and optimize performance\nCollaborate with designers and product managers'
        }
      ],
      education: [
        {
          title: 'Computer Science Degree',
          organization: 'City College',
          startDate: '2017',
          endDate: '2021',
          current: false,
          description: 'Focus on Web Technologies and Software Engineering'
        }
      ],
      projects: [
        {
          title: 'Portfolio Website Builder',
          organization: 'Open Source Project',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: 'Created a tool for developers to build portfolio websites\nUsed by 500+ developers worldwide\nOpen source with 200+ GitHub stars'
        }
      ]
    }
  }
];