import React from 'react';
import './TechStack.css';

const TechStack = () => {
    const technologies = [
        {
            name: 'React',
            icon: '⚛️',
            category: 'Frontend',
            proficiency: 90
        },
        {
            name: 'JavaScript',
            icon: '🟨',
            category: 'Language',
            proficiency: 95
        },
        {
            name: 'Node.js',
            icon: '🟢',
            category: 'Backend',
            proficiency: 85
        },
        {
            name: 'Python',
            icon: '🐍',
            category: 'Language',
            proficiency: 80
        },
        {
            name: 'MongoDB',
            icon: '🍃',
            category: 'Database',
            proficiency: 75
        },
        {
            name: 'AWS',
            icon: '☁️',
            category: 'Cloud',
            proficiency: 70
        },
        {
            name: 'Docker',
            icon: '🐳',
            category: 'DevOps',
            proficiency: 75
        },
        {
            name: 'Git',
            icon: '📝',
            category: 'Tools',
            proficiency: 90
        }
    ];

    return (
        <section className="tech-stack">
            <div className="tech-container">
                <div className="tech-header">
                    <span className="section-label">Technologies</span>
                    <h2 className="tech-title">My Technical Arsenal</h2>
                    <p className="tech-subtitle">
                        I work with cutting-edge technologies to build scalable and efficient solutions
                    </p>
                </div>

                <div className="tech-grid">
                    {technologies.map((tech, index) => (
                        <div key={index} className="tech-card" style={{ '--delay': `${index * 0.1}s` }}>
                            <div className="tech-icon">
                                <span>{tech.icon}</span>
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
                        Always learning and exploring new technologies to stay ahead of the curve
                    </p>
                    <div className="tech-highlights">
                        <div className="highlight-item">
                            <span className="highlight-number">8+</span>
                            <span className="highlight-label">Technologies</span>
                        </div>
                        <div className="highlight-item">
                            <span className="highlight-number">5+</span>
                            <span className="highlight-label">Years Learning</span>
                        </div>
                        <div className="highlight-item">
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