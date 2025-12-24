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

                {/* Professional Header Section */}
                <div className={`about-header ${isVisible ? 'animate-in' : ''}`}>
                    <div className="header-content">
                        <h2 className="about-title">About Me</h2>
                        <p className="about-subtitle">
                            Passionate developer crafting innovative solutions with cutting-edge technology
                        </p>
                    </div>
                </div>

                <div className={`about-content ${isVisible ? 'animate-in' : ''}`}>
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

                    {/* Right Side - Image */}
                    <div className={`about-image-wrapper ${isVisible ? 'animate-in' : ''}`}>
                        <div className="about-image">
                            <img
                                src={aboutData.image.src}
                                alt={aboutData.image.alt || 'Profile'}
                                loading="lazy"
                            />
                            <div className="image-overlay"></div>
                        </div>
                    </div>
                </div>

                {/* Skills Section - Now separate full-width section */}
                <div className={`about-skills-section ${isVisible ? 'animate-in' : ''}`}>
                    <h2 className="section-title">💻 Technical Skills</h2>
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

                {/* Stats Section */}
                <div className={`about-stats ${isVisible ? 'animate-in' : ''}`}>
                    {aboutData.stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <h3>{stat.number}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Education Section */}
                <div className={`about-education ${isVisible ? 'animate-in' : ''}`}>
                    <h2 className="section-title">🎓 Education</h2>
                    <div className="education-grid">
                        {aboutData.education.map((edu, index) => (
                            <div key={index} className="education-card">
                                <div className="education-header">
                                    <h3 className="education-level">{edu.level}</h3>
                                    {edu.stream && (
                                        <span className="education-stream">{edu.stream}</span>
                                    )}
                                </div>
                                <div className="education-grades">
                                    <span className="grades-label">Grades:</span>
                                    <span className="grades-value">{edu.grades}</span>
                                </div>
                                {edu.description && (
                                    <p className="education-description">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements Section */}
                <div className={`about-achievements ${isVisible ? 'animate-in' : ''}`}>
                    <h2 className="section-title">🏆 Achievements</h2>
                    <div className="achievements-list">
                        {aboutData.achievements.map((achievement, index) => (
                            <div key={index} className="achievement-card">
                                {achievement.image ? (
                                    <div className="achievement-image-wrapper">
                                        <img
                                            src={achievement.image.src}
                                            alt={achievement.image.alt || achievement.title}
                                            className="achievement-image"
                                            loading="lazy"
                                        />
                                    </div>
                                ) : (
                                    <div className="achievement-icon">{achievement.icon}</div>
                                )}
                                <div className="achievement-content">
                                    <h3 className="achievement-title">{achievement.title}</h3>
                                    {achievement.description && (
                                        <p className="achievement-description">{achievement.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;