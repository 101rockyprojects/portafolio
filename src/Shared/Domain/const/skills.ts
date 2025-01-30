import { type IconDefinition, faPhp, faJs, faNodeJs, faJava, faPython, faGitAlt, faYoutubeSquare, faDocker, faTrello, faNpm, faGolang, faLaravel } from '@fortawesome/free-brands-svg-icons';
import { faArrowsAlt, faSpoon } from '@fortawesome/free-solid-svg-icons';

export const techData: Record<string, { source: IconDefinition | string; category: string; level: string; link: string, color?: string }> = {
  'Composer': {
    source: 'composer.png',
    category: 'Tool',
    level: 'Experienced',
    link: 'https://getcomposer.org',
  },
  'Docker': {
    source: faDocker,
    category: 'Tool',
    level: 'Experienced',
    link: 'https://www.docker.com',
    color: 'text-blue-500',
  },
  'Git': {
    source: faGitAlt,
    category: 'Tool',
    level: 'Experienced',
    link: 'https://git-scm.com',
    color: 'text-orange-600',
  },
  'Javascript': {
    source: faJs,
    category: 'Front',
    level: 'Experienced',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: 'text-yellow-500',
  },
  'Java': {
    source: faJava,
    category: 'Back',
    level: 'Experienced',
    link: 'https://www.java.com/en',
    color: 'text-red-600',
  },
  'Mysql': {
    source: 'mysql.png',
    category: 'Tool',
    level: 'Experienced',
    link: 'https://www.mysql.com',
  },
  'Node.js': {
    source: faNodeJs,
    category: 'Back',
    level: 'Experienced',
    link: 'https://nodejs.org/en',
    color: 'text-green-600',
  },
  'Npm': {
    source: faNpm,
    category: 'Tool',
    level: 'Experienced',
    link: 'https://nodejs.org/en',
    color: 'text-red-600',
  },
  'PHP': {
    source: faPhp,
    category: 'Back',
    level: 'Experienced',
    link: 'https://www.php.net/',
    color: 'text-indigo-500',
  },
  'Postgres': {
    source: 'postgres.png',
    category: 'Tool',
    level: 'Experienced',
    link: 'https://www.postgresql.org',
  },
  'Python': {
    source: faPython,
    category: 'Back',
    level: 'Experienced',
    link: 'https://www.python.org',
    color: 'text-indigo-700',
  },
  'RabbitMQ': {
    source: 'rabbitmq.png',
    category: 'Tool',
    level: 'Learning',
    link: 'https://www.rabbitmq.com'
  },
  'Scalar': {
    source: faArrowsAlt,
    category: 'Front',
    level: 'Experienced',
    link: 'https://github.com/mirdware/scalar?tab=readme-ov-file#scalar',
    color: 'text-flame',
  },
  'Scoop': {
    source: faSpoon,
    category: 'Back',
    level: 'Experienced',
    link: 'https://scoop.ct.ws/?i=1',
    color: 'text-gold',
  },
  'Strapi': {
    source: 'strapi.svg',
    category: 'Back',
    level: 'Learning',
    link: 'https://strapi.io/',
  },
  'Svelte': {
    source: 'svelte.svg',
    category: 'Front',
    level: 'Experienced',
    link: 'https://svelte.dev',
  },
  'Tailwind': {
    source: 'tailwind.png',
    category: 'Front',
    level: 'Experienced',
    link: 'https://tailwindcss.com/',
  },
  'Trello': {
    source: faTrello,
    category: 'Tool',
    level: 'N/A',
    link: 'https://trello.com',
    color: 'text-blue-700',
  },
  'Typescript': {
    source: 'typescript.png',
    category: 'Front',
    level: 'Experienced',
    link: 'https://www.typescriptlang.org',
  },
  'Vite': {
    source: 'vite.svg',
    category: 'Front',
    level: 'Learning',
    link: 'https://vitejs.dev',
  },
  'Youtube API': {
    source: faYoutubeSquare,
    category: 'Tool',
    level: 'Experienced',
    link: 'https://developers.google.com/youtube/v3/getting-started',
    color: 'text-red-600',
  },
  'Hibernate': {
    source: 'hibernate.png',
    category: 'Back',
    level: 'Experienced',
    link: 'https://hibernate.org'
  },
  'Laravel': {
    source: faLaravel,
    category: 'Back',
    level: 'Want',
    link: 'https://laravel.com',
    color: 'text-gray-500',
  },
  'Go': {
    source: faGolang,
    category: 'Back',
    level: 'Want',
    link: 'https://golang.org/',
    color: 'text-gray-500',
  }
};