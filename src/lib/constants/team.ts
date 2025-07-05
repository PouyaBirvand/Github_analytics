export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const teamData: TeamMember[] = [
  {
    id: '1',
    name: 'Pouya Birvand',
    role: 'Frontend Developer',
    bio: 'Frontend developer with 2+ years of experience in React, NextJS, and unit testing. Passionate about creating intuitive user experiences.',
    skills: [
      'React',
      'NextJS',
      'Typescript',
      'React Query',
      'Redux Toolkit',
      'Zustand',
      'TailwindCSS',
      'ShadCN',
      'Jest',
      'Storybook',
    ],
    social: {
      github: 'https://github.com/Pouyabirvand',
      twitter: 'https://twitter.com/Pouyabirvand',
      linkedin: 'https://linkedin.com/in/Pouya-birvand',
      website: 'https://portfolio-nine-black-48.vercel.app/',
    },
    // },
    // {
    //   id: '2',
    //   name: 'Sarah Chen',
    //   role: 'UI/UX Designer',
    //   bio: 'Creative designer focused on user-centered design and accessibility. Specializes in creating beautiful, functional interfaces that users love.',
    //   skills: [
    //     'Figma',
    //     'Design Systems',
    //     'Prototyping',
    //     'User Research',
    //     'Accessibility',
    //   ],
    //   social: {
    //     github: 'https://github.com/sarahchen',
    //     twitter: 'https://twitter.com/sarahchen',
    //     linkedin: 'https://linkedin.com/in/sarahchen',
    //   },
    // },
    // {
    //   id: '3',
    //   name: 'Mike Rodriguez',
    //   role: 'Data Engineer',
    //   bio: 'Data enthusiast with expertise in analytics, machine learning, and API integrations. Loves turning complex data into actionable insights.',
    //   skills: [
    //     'Python',
    //     'Data Analysis',
    //     'APIs',
    //     'Machine Learning',
    //     'PostgreSQL',
    //   ],
    //   social: {
    //     github: 'https://github.com/mikerodriguez',
    //     linkedin: 'https://linkedin.com/in/mikerodriguez',
    //     website: 'https://mikerodriguez.tech',
    //   },
    // },
    // {
    //   id: '4',
    //   name: 'Emily Watson',
    //   role: 'DevOps Engineer',
    //   bio: 'Infrastructure specialist ensuring our platform runs smoothly and securely. Expert in cloud technologies and automated deployment pipelines.',
    //   skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Monitoring'],
    //   social: {
    //     github: 'https://github.com/emilywatson',
    //     twitter: 'https://twitter.com/emilywatson',
    //     linkedin: 'https://linkedin.com/in/emilywatson',
    //   },
    // },
    // {
    //   id: '5',
    //   name: 'David Kim',
    //   role: 'Product Manager',
    //   bio: 'Product strategist with a background in software development. Bridges the gap between user needs and technical implementation.',
    //   skills: [
    //     'Product Strategy',
    //     'User Research',
    //     'Agile',
    //     'Analytics',
    //     'Leadership',
    //   ],
    //   social: {
    //     github: 'https://github.com/davidkim',
    //     twitter: 'https://twitter.com/davidkim',
    //     linkedin: 'https://linkedin.com/in/davidkim',
    //   },
    // },
    // {
    //   id: '6',
    //   name: 'Lisa Thompson',
    //   role: 'QA Engineer',
    //   bio: 'Quality assurance specialist ensuring our platform delivers a bug-free experience. Expert in automated testing and performance optimization.',
    //   skills: [
    //     'Test Automation',
    //     'Performance Testing',
    //     'Cypress',
    //     'Jest',
    //     'Quality Assurance',
    //   ],
    //   social: {
    //     github: 'https://github.com/lisathompson',
    //     linkedin: 'https://linkedin.com/in/lisathompson',
    //   },
  },
];
