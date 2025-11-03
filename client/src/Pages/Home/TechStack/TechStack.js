// src/components/TechStack/TechStack.js

import React, { useState } from 'react';
import './TechStack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { technologies, sectionContent, highlights } from '../../../config/techConfig';

const TechStack = () => {
    const [selectedTech, setSelectedTech] = useState(null);

    return (
        <section className="tech-stack">
            <div className="tech-container">
                <div className="tech-header">
                    <span className="section-label">{sectionContent.label}</span>
                    <h2 className="tech-title">{sectionContent.title}</h2>
                    <p className="tech-subtitle">{sectionContent.subtitle}</p>
                </div>

                <div className="tech-list-container">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className={`tech-item ${selectedTech === index ? 'active' : ''}`}
                            onClick={() => setSelectedTech(selectedTech === index ? null : index)}
                            style={{
                                '--delay': `${index * 0.05}s`,
                                '--tech-color': tech.color || '#60a5fa'
                            }}
                        >
                            <div className="tech-item-content">
                                <div className="tech-item-left">
                                    <div className="tech-item-icon">
                                        <FontAwesomeIcon icon={tech.icon} />
                                    </div>
                                    <div className="tech-item-info">
                                        <h3 className="tech-item-name">{tech.name}</h3>
                                        <span className="tech-item-category">{tech.category}</span>
                                    </div>
                                </div>
                                <div className="tech-item-right">
                                    <span className="tech-item-proficiency">{tech.proficiency}%</span>
                                    <div className="tech-item-arrow">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="tech-item-details">
                                <div className="proficiency-bar-full">
                                    <div
                                        className="proficiency-fill-full"
                                        style={{ '--proficiency': `${tech.proficiency}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="tech-footer">
                    <p className="tech-note">{sectionContent.footerNote}</p>
                    <div className="tech-highlights">
                        {highlights.map((highlight, index) => (
                            <div key={index} className="highlight-item">
                                <FontAwesomeIcon icon={highlight.icon} className="highlight-icon" />
                                <span className="highlight-number">{highlight.number}</span>
                                <span className="highlight-label">{highlight.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;