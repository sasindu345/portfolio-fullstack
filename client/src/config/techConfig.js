// src/config/techConfig.js

import {
    faReact, faJs, faNodeJs, faPython, faAws, faDocker, faGitAlt
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCodeBranch, faInfinity, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

// ============================================
// EDIT THIS SECTION TO UPDATE YOUR TECH STACK
// ============================================

export const technologies = [
    {
        name: 'React',
        icon: faReact,
        category: 'Frontend',
        proficiency: 90,
        color: '#61DAFB' // Optional: custom color for each tech
    },
    {
        name: 'JavaScript',
        icon: faJs,
        category: 'Language',
        proficiency: 95,
        color: '#F7DF1E'
    },
    {
        name: 'Node.js',
        icon: faNodeJs,
        category: 'Backend',
        proficiency: 85,
        color: '#339933'
    },
    {
        name: 'Python',
        icon: faPython,
        category: 'Language',
        proficiency: 80,
        color: '#3776AB'
    },
    {
        name: 'MongoDB',
        icon: faDatabase,
        category: 'Database',
        proficiency: 75,
        color: '#47A248'
    },
    {
        name: 'AWS',
        icon: faAws,
        category: 'Cloud',
        proficiency: 70,
        color: '#FF9900'
    },
    {
        name: 'Docker',
        icon: faDocker,
        category: 'DevOps',
        proficiency: 75,
        color: '#2496ED'
    },
    {
        name: 'Git',
        icon: faGitAlt,
        category: 'Tools',
        proficiency: 90,
        color: '#F05032'
    }
];

export const sectionContent = {
    label: 'Technologies',
    title: 'My Technical Arsenal',
    subtitle: 'I work with cutting-edge technologies to build scalable and efficient solutions.',
    footerNote: 'Always learning and exploring new technologies to stay ahead of the curve.'
};

export const highlights = [
    {
        icon: faCodeBranch,
        number: '8+',
        label: 'Technologies'
    },
    {
        icon: faFeatherAlt,
        number: '5+',
        label: 'Years Learning'
    },
    {
        icon: faInfinity,
        number: '∞',
        label: 'Curiosity'
    }
];

// ============================================
// TO ADD A NEW TECHNOLOGY:
// 1. Import the icon at the top if needed
// 2. Add a new object to the technologies array above
// 3. Save the file - changes will reflect automatically
// ============================================