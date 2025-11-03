import React, { useState, useEffect } from 'react';
import './About.css';
import { aboutData } from '../../config/aboutConfig';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('.about');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="about" id="about">
            <div className="about-container">

                {/* Page Header */}
                <div className={`about-header ${isVisible ? 'animate-in' : ''}`}>
                    <h2 className="about-title">About Me</h2>
                    <p className="about-subtitle">Get to know me better</p>
                </div>

                <div className="about-content">

                    {/* Left Side - Personal Info */}
                    <div className={`about-text ${isVisible ? 'animate-in' : ''}`}>

                        <div className="about-intro">
                            <h3>{aboutData.story.title}</h3>
                            {aboutData.story.paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Personal Details Card */}
                        <div className="about-details">
                            {aboutData.details.map((detail, index) => (
                                <div key={index} className="detail-item">
                                    <span className="detail-label">{detail.label}:</span>
                                    <span className="detail-value">{detail.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Download CV Button */}
                        <div className="about-actions">
                            <a
                                href={aboutData.cvFile}
                                className="btn-download"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 3V13M10 13L6 9M10 13L14 9M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Download My CV</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Image & Skills */}
                    <div className={`about-right ${isVisible ? 'animate-in' : ''}`}>

                        {/* About Image */}
                        <div className="about-image">
                            <img
                                src={aboutData.image.src}
                                alt={aboutData.image.alt}
                                loading="lazy"
                            />
                            <div className="image-overlay"></div>
                        </div>

                        {/* Skills Card */}
                        <div className="about-skills">
                            <h4>Technical Skills</h4>
                            <div className="skills-grid">
                                {aboutData.skills.map((skill, index) => (
                                    <div key={index} className="skill-item">
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percent">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{
                                                    '--skill-level': `${skill.level}%`,
                                                    animationDelay: `${index * 0.1}s`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className={`about-stats ${isVisible ? 'animate-in' : ''}`}>
                    {aboutData.stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <h3>{stat.number}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;