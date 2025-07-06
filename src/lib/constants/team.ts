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
  },
];
