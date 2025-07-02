export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  skills: string[];
}

export const teamData: TeamMember[] = [
  {
    id: '1',
    name: 'Pouya Birvand',
    role: 'Lead Developer',
    bio: 'Full-stack developer with 2+ years of experience in React, NextJS, and front architecture. Passionate about creating scalable solutions.',
    social: {
      github: 'https://github.com/pouyabirvand',
      linkedin: 'https://linkedin.com/in/pouya-birvand',
      website: 'https://portfolio-nine-black-48.vercel.app/',
    },
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    bio: 'Creative designer focused on user-centered design and modern interfaces. Specializes in creating intuitive and beautiful user experiences.',
    social: {
      github: 'https://github.com/sarahchen',
      twitter: 'https://twitter.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
    },
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'CSS'],
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Backend Engineer',
    bio: 'Backend specialist with expertise in API design, database optimization, and microservices architecture. Loves solving complex problems.',
    social: {
      github: 'https://github.com/michaelrodriguez',
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      website: 'https://mrodriguez.tech',
    },
    skills: ['Python', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL'],
  },
  {
    id: '4',
    name: 'Emily Watson',
    role: 'Data Analyst',
    bio: 'Data scientist with a passion for turning complex data into actionable insights. Expert in statistical analysis and data visualization.',
    social: {
      github: 'https://github.com/emilywatson',
      twitter: 'https://twitter.com/emilywatson',
      linkedin: 'https://linkedin.com/in/emilywatson',
    },
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Viz'],
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'DevOps Engineer',
    bio: 'Infrastructure and deployment specialist ensuring our platform runs smoothly and scales efficiently. Expert in cloud technologies.',
    social: {
      github: 'https://github.com/davidkim',
      linkedin: 'https://linkedin.com/in/davidkim',
      website: 'https://davidkim.cloud',
    },
    skills: ['AWS', 'Docker', 'Terraform', 'CI/CD', 'Monitoring'],
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    role: 'Product Manager',
    bio: 'Product strategist with a focus on user needs and market trends. Bridges the gap between technical capabilities and user requirements.',
    social: {
      twitter: 'https://twitter.com/lisathompson',
      linkedin: 'https://linkedin.com/in/lisathompson',
      website: 'https://lisathompson.pm',
    },
    skills: [
      'Product Strategy',
      'User Research',
      'Analytics',
      'Agile',
      'Leadership',
    ],
  },
];
