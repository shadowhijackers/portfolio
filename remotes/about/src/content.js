import portraitImg from './assets/images/user.jpeg';

const devicon = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

/** Edit this file with your résumé / bio copy */
export const aboutContent = {
  portrait: portraitImg,
  portraitAlt: 'Portrait of Nagaraj Ravi, frontend engineer',
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Nagaraj-Ravi-Resume.pdf',

  eyebrow: 'Frontend Lead · Available for work',
  headline: 'Hi, I\'m Nagaraj Ravi',
  headlineAccent: '',
  headlineLine2: '',
  lead:
    'Frontend Lead with 9+ years of experience designing and building high-performance React and Angular applications. Specialized in micro-frontend architecture, clean architecture, state management, reusable component libraries, performance optimization, accessibility, and enterprise-grade delivery.',
  leadSecondary:
    'I have led UI for dashboards, design systems, and government platforms—with a focus on motion, typography, and craft that makes digital products feel premium.',

  badges: ['React', 'Angular', 'MFE'],

  stats: [
    { value: '9+', label: 'Years building UIs' },
    { value: '20+', label: 'Projects shipped' },
    { value: '10+', label: 'Teams collaborated' },
  ],

  highlights: [
    {
      title: 'Design systems',
      text: 'Token-driven components, accessibility audits, and Storybook documentation adopted across engineering squads.',
    },
    {
      title: 'Micro frontends',
      text: 'Module Federation hosts and remotes with shared runtime boundaries and independent deployment pipelines.',
    },
    {
      title: 'Performance',
      text: 'Core Web Vitals optimization, bundle splitting, and lazy hydration strategies for large-scale React apps.',
    },
  ],

  skillsTitle: 'Primary Skills',
  skills: [
    { name: 'HTML5', icon: devicon('html5/html5-original.svg') },
    { name: 'CSS3', icon: devicon('css3/css3-original.svg') },
    { name: 'SASS', icon: devicon('sass/sass-original.svg') },
    { name: 'JavaScript', icon: devicon('javascript/javascript-original.svg') },
    { name: 'TypeScript', icon: devicon('typescript/typescript-original.svg') },
    { name: 'React', icon: devicon('react/react-original.svg') },
    { name: 'Redux', icon: devicon('redux/redux-original.svg') },
    { name: 'Redux Saga', icon: devicon('redux/redux-original.svg') },
    { name: 'Zustand' },
    { name: 'Material UI', icon: devicon('materialui/materialui-original.svg') },
    { name: 'Bootstrap', icon: devicon('bootstrap/bootstrap-original.svg') },
    { name: 'Angular (6+)', icon: devicon('angular/angular-original.svg') },
    { name: 'NgRx', icon: devicon('angular/angular-original.svg') },
    { name: 'RxJS', icon: devicon('rxjs/rxjs-original.svg') },
    { name: 'Angular Material', icon: devicon('angular/angular-original.svg') },
    { name: 'Storybook', icon: devicon('storybook/storybook-original.svg') },
    { name: 'webpack', icon: devicon('webpack/webpack-original.svg') },
    { name: 'Vite', icon: devicon('vite/vite-original.svg') },
    { name: 'Micro Frontends', icon: devicon('webpack/webpack-original.svg') },
    { name: 'GraphQL', icon: devicon('graphql/graphql-plain.svg') },
  ],

  secondarySkillsTitle: 'Secondary Skills',
  secondarySkills: [
    { name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg') },
    { name: 'Express', icon: devicon('express/express-original.svg') },
    { name: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg') },
    { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original.svg') },
    { name: 'AWS', icon: devicon('amazonwebservices/amazonwebservices-plain-wordmark.svg') },
    { name: 'Apollo GraphQL', icon: devicon('graphql/graphql-plain.svg') },
    { name: 'Docker', icon: devicon('docker/docker-original.svg') },
    { name: 'Microservices', icon: devicon('docker/docker-original.svg') },
  ],

  exploringTitle: 'Actively Exploring',
  exploringSkills: [
    { name: 'AI Agents' },
    { name: 'Cursor AI' },
    { name: 'Skills, rules & sub-agents' },
    { name: 'MCP' },
    { name: 'Azure Cloud', icon: devicon('azure/azure-original.svg') },
    { name: 'Cybersecurity Red Team' },
  ],
};
