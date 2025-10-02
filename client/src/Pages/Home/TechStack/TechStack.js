// src/components/TechStack/TechStack.js

import React from 'react';
import './TechStack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faReact, faJs, faNodeJs, faPython, faAws, faDocker, faGitAlt
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCodeBranch, faInfinity, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';


const TechStack = () => {
    const technologies = [
        {
            name: 'React',
            icon: faReact,
            category: 'Frontend',
            proficiency: 90
        },
        {
            name: 'JavaScript',
            icon: faJs,
            category: 'Language',
            proficiency: 95
        },
        {
            name: 'Node.js',
            icon: faNodeJs,
            category: 'Backend',
            proficiency: 85
        },
        {
            name: 'Python',
            icon: faPython,
            category: 'Language',
            proficiency: 80
        },
        {
            name: 'MongoDB',
            icon: faDatabase, // Using a solid icon for Database
            category: 'Database',
            proficiency: 75
        },
        {
            name: 'AWS',
            icon: faAws,
            category: 'Cloud',
            proficiency: 70
        },
        {
            name: 'Docker',
            icon: faDocker,
            category: 'DevOps',
            proficiency: 75
        },
        {
            name: 'Git',
            icon: faGitAlt, // Using a brand icon for Git
            category: 'Tools',
            proficiency: 90
        }
    ];

    // Icons for the footer section
    const highlightIcons = {
        tech: faCodeBranch,
        years: faFeatherAlt,
        curiosity: faInfinity,
    };

    return (
        <section className="tech-stack">
            <div className="tech-container">
                <div className="tech-header">
                    <span className="section-label">Technologies</span>
                    <h2 className="tech-title">My Technical Arsenal</h2>
                    <p className="tech-subtitle">
                        I work with cutting-edge technologies to build scalable and efficient solutions.
                    </p>
                </div>

                <div className="tech-grid">
                    {technologies.map((tech, index) => (
                        <div key={index} className="tech-card" style={{ '--delay': `${index * 0.1}s` }}>
                            <div className="tech-icon">
                                {/* Using FontAwesomeIcon component */}
                                <FontAwesomeIcon icon={tech.icon} />
                            </div>
                            <div className="tech-info">
                                <h3 className="tech-name">{tech.name}</h3>
                                <span className="tech-category">{tech.category}</span>
                                <div className="proficiency-bar">
                                    <div
                                        className="proficiency-fill"
                                        style={{ '--proficiency': `${tech.proficiency}%` }}
                                    ></div>
                                </div>
                                <span className="proficiency-text">{tech.proficiency}%</span>
                            </div>
                            <div className="tech-glow"></div>
                        </div>
                    ))}
                </div>

                <div className="tech-footer">
                    <p className="tech-note">
                        Always learning and exploring new technologies to stay ahead of the curve.
                    </p>
                    <div className="tech-highlights">
                        <div className="highlight-item">
                            <FontAwesomeIcon icon={highlightIcons.tech} className="highlight-icon" />
                            <span className="highlight-number">8+</span>
                            <span className="highlight-label">Technologies</span>
                        </div>
                        <div className="highlight-item">
                            <FontAwesomeIcon icon={highlightIcons.years} className="highlight-icon" />
                            <span className="highlight-number">5+</span>
                            <span className="highlight-label">Years Learning</span>
                        </div>
                        <div className="highlight-item">
                            <FontAwesomeIcon icon={highlightIcons.curiosity} className="highlight-icon" />
                            <span className="highlight-number">∞</span>
                            <span className="highlight-label">Curiosity</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;