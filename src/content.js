export const presentation = {
  profile: {
    name: 'Sean Shmulevich',
    role: 'New Grad Software Engineer Candidate',
    location: 'Pittsburgh, PA',
    school: 'B.S. in Computer Science: University of Pittsburgh',
    focus: 'Systems-minded engineer with a focus on infrastructure, tooling, and full-stack product work',
    thesis:
      'I care about understanding systems deeply, taking real ownership, and building tools that help people get organized, move faster, and do more.',
    skillGroups: [
      {
        title: 'Frontend & Product',
        skills: [
          'React.js',
          'Next.js',
          'Svelte',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'HTML',
          'CSS',
          'UI/UX',
        ],
      },
      {
        title: 'Backend & Cloud',
        skills: [
          'Node.js',
          'Java Spring Boot',
          'REST + RPC + gRPC',
          'PostgreSQL',
          'Redis',
          'Docker',
          'AWS: Lambda, Cognito, EC2, S3',
          'SendGrid',
        ],
      },
      {
        title: 'Systems & Languages',
        skills: [
          'Java',
          'Python',
          'C++',
          'Rust',
          'Lua',
          'Compilers',
          'LLVM',
          'Lex / Bison / Yacc',
          'Interpreters',
          'WebSockets',
        ],
      },
      {
        title: 'Data, Research & Tools',
        skills: [
          'Selenium',
          'Beautiful Soup',
          'Web Scraping',
          'Regex',
          'XPath / XSLT / XSD',
          'JSON',
          'Git',
          'Project Management',
          'Agile Methodologies',
        ],
      },
    ],
  },
  slides: [
    {
      id: 'intro',
      desktopLabel: 'Overview',
      title: 'Introduction',
      windowTitle: 'Sean.exe',
      variant: 'intro',
    },
    {
      id: 'principles',
      desktopLabel: 'Four Principles',
      title: 'The Four Principles of Sean',
      windowTitle: 'sean_principles.dll',
      variant: 'principles',
      principles: [
        {
          title: 'Lifelong Mastery',
          metric: '1% better every day',
          label: 'Software, skiing, Rubik’s Cubes, and everything else',
          body:
            'I approach life with a constant-improvement mindset. Whether it is software development, systems engineering, freestyle skiing, or Rubik’s Cubes, I want to keep taking steps toward mastery over the long term.',
        },
        {
          title: 'Communication & Collaboration',
          metric: 'Strong ideas get stronger together',
          label: 'Collaborative thinking',
          body:
            'I think ideas get uplifted when you can work closely with smart people, bounce things back and forth, and refine them together in real time. I value strong in-person collaboration a lot.',
        },
        {
          title: 'Workflow',
          metric: 'Systems for every part of life',
          label: 'Tools, habits, and workflows designed on purpose',
          body:
            'I develop systems for all parts of my life. Better notes, better tools, and better habits help me stay organized, move quickly, and handle complexity with intention.',
        },
        {
          title: 'Execution',
          metric: 'I finish what I start',
          label: 'Follow-through matters more than good intentions',
          body:
            'When I commit to something, I see it through. I care about finishing strong, pushing through ambiguity, and turning ideas into real shipped work instead of leaving things half-done.',
        },
      ],
    },
    {
      id: 'philosophy',
      desktopLabel: 'Philosophy',
      title: 'Programming Philosophy',
      windowTitle: 'programming_philosophy.txt',
      variant: 'philosophy',
      philosophies: [
        {
          title: 'Understand First',
          line: 'If you do not understand the problem, you will not understand the solution.',
          body:
            'I try to reason about execution flow, constraints, and tradeoffs before I reach for abstractions. That is usually the fastest path to a real fix.',
        },
        {
          title: 'Every Tool Has Its Place',
          line: 'Power comes from knowing why a tool belongs, not just that it exists.',
          body:
            'I like strong tools, but I do not want accidental complexity. I would rather understand one good tool deeply than stack five things I cannot justify.',
        },
        {
          title: 'Execution Is the Difference',
          line: 'Something actually good is 99% execution.',
          body:
            'Ideas matter, but execution is what makes software real. Plenty of good ideas fail because they are not built thoughtfully enough for the user. Great software usually reflects deeper thinking, stronger iteration, and real collaboration.',
        },
        {
          title: 'Software Should Empower',
          line: 'Good tools should adapt to the user, not the other way around.',
          body:
            'I care about building software that helps people find what they need, get organized, move faster, and do more. That focus on making information accessible and useful is a big part of why Google appeals to me.',
        },
      ],
    },
    {
      id: 'academic-recommendations',
      desktopLabel: 'Academic Recommendations',
      title: 'Recommendations from Faculty',
      windowTitle: 'faculty_feedback.sys',
      variant: 'recommendations',
      intro: 'Faculty who challenged me and believe in me',
      recommendations: [
        {
          name: 'Luis Oliveira',
          href: 'https://www.cs.pitt.edu/people/full-time-faculty/luis-oliveira',
          role: 'Systems Programming Professor',
          quote:
            'I supervised Sean during his capstone project, where he was a standout contributor on the team.',
          bullets: [
            'Consistently took ownership of complex parts of the system',
            'Wrote a significant portion of the codebase with strong technical judgment',
            'Was reliable, collaborative, and elevated the overall quality of the project',
          ],
        },
        {
          name: 'Wonsun Ahn',
          href: 'https://www.linkedin.com/in/wonsun-ahn-33369a5/',
          role: 'Compilers Professor',
          quote:
            'Sean stood out for both technical ability and for how seriously he approaches programming as a discipline.',
          bullets: [
            'Engaged deeply with material and asked thoughtful questions',
            'Showed strong drive to understand systems at a fundamental level',
            'Brings both skill and intentionality to his work',
          ],
        },
      ],
    },
    {
      id: 'peer-recommendations',
      desktopLabel: 'Peer Recommendations',
      title: 'Recommendations from Teammates',
      windowTitle: 'peer_feedback.msg',
      variant: 'recommendations',
      recommendations: [
        {
          name: 'Joseph Secosky',
          href: 'https://www.linkedin.com/in/jmsjoseph/',
          role: 'Capstone Project',
          quote:
            'Sean was a key team member, developed and oversaw many features, and consistently exceeded expectations for the group.',
          bullets: [
            'Strong technically and dependable on meaningful project work',
            'Comfortable taking leadership when the team needed direction',
            'Asks useful questions and raises the quality of collaboration',
          ],
        },
        {
          name: 'Jagger Hershey',
          role: 'Rust Game Development Project',
          quote:
            'Sean became one of the most impactful contributors on the team and took on some of the hardest technical challenges, including networking.',
          bullets: [
            'Learned Rust quickly despite the language’s steep learning curve',
            'Delivered a significant portion of implementation work',
            'Helped guide and manage the group throughout the project',
          ],
        },
      ],
    },
  ],
};
