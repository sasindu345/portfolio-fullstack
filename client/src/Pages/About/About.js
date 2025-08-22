import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="about-container">

                {/* Page Title */}
                <div className="about-header">
                    <h2 className="about-title">About Me</h2>
                    <p className="about-subtitle">Get to know me better</p>
                </div>

                <div className="about-content">

                    {/* Left Side - Personal Info */}
                    <div className="about-text">

                        {/* CHANGE THIS: Write your personal story */}
                        <div className="about-intro">
                            <h3>Hello! I'm a passionate developer</h3>
                            <p>
                                I'm a full-stack developer with 3+ years of experience creating
                                digital solutions that make a difference. I love turning complex
                                problems into simple, beautiful designs.
                            </p>
                            <p>
                                My journey started in 2021 when I built my first website. Since then,
                                I've worked with startups and established companies to bring their
                                visions to life through code.
                            </p>
                        </div>

                        {/* CHANGE THIS: Update your personal details */}
                        <div className="about-details">
                            <div className="detail-item">
                                <span className="detail-label">Name:</span>
                                <span className="detail-value">Your Full Name</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Location:</span>
                                <span className="detail-value">Your City, Country</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">your.email@example.com</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Phone:</span>
                                <span className="detail-value">+1 (555) 123-4567</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Experience:</span>
                                <span className="detail-value">3+ Years</span>
                            </div>
                        </div>

                        {/* CHANGE THIS: Update your CV link */}
                        <div className="about-actions">
                            <a href="/files/your-cv.pdf" className="btn-download" download>
                                Download My CV
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Skills & Image */}
                    <div className="about-right">

                        {/* CHANGE THIS: Replace with your image */}
                        <div className="about-image">
                            <img src="/images/about-me.jpg" alt="About Me" />
                            <div className="image-overlay"></div>
                        </div>

                        {/* CHANGE THIS: Update your skills */}
                        <div className="about-skills">
                            <h4>Technical Skills</h4>
                            <div className="skills-grid">
                                <div className="skill-item">
                                    <span className="skill-name">React</span>
                                    <div className="skill-bar">
                                        <div className="skill-progress" data-percent="90"></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <span className="skill-name">Node.js</span>
                                    <div className="skill-bar">
                                        <div className="skill-progress" data-percent="85"></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <span className="skill-name">MongoDB</span>
                                    <div className="skill-bar">
                                        <div className="skill-progress" data-percent="80"></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <span className="skill-name">JavaScript</span>
                                    <div className="skill-bar">
                                        <div className="skill-progress" data-percent="95"></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <span className="skill-name">CSS/SCSS</span>
                                    <div className="skill-bar">
                                        <div className="skill-progress" data-percent="88"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CHANGE THIS: Update your stats/achievements */}
                <div className="about-stats">
                    <div className="stat-item">
                        <h3>50+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div className="stat-item">
                        <h3>3+</h3>
                        <p>Years Experience</p>
                    </div>
                    <div className="stat-item">
                        <h3>30+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div className="stat-item">
                        <h3>15+</h3>
                        <p>Technologies</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

/* 
BEGINNER SETUP GUIDE:

1. UPDATE YOUR STORY (Lines 19-28):
   - Write about your background, experience, and passion
   - Keep it personal but professional
   - 2-3 paragraphs work best

2. UPDATE PERSONAL DETAILS (Lines 32-52):
   - Replace with your actual name, location, email, phone
   - Update your years of experience
   - All details are optional - remove what you don't want to show

3. UPDATE YOUR IMAGE (Line 61):
   - Put your professional photo in: public/images/about-me.jpg
   - Can be different from hero image (more casual/workspace photo)

4. UPDATE YOUR SKILLS (Lines 67-97):
   - Replace with your actual technologies
   - Change data-percent values (0-100) to match your skill level
   - Add or remove skills as needed

5. UPDATE YOUR STATS (Lines 102-117):
   - Change numbers to match your actual achievements
   - Examples: Projects, Clients, Years, Awards, etc.
   - Remove or add stat items as needed

6. UPDATE CV LINK (Line 55):
   - Make sure your CV file exists in: public/files/your-cv.pdf

TIPS:
- Keep your story authentic and engaging
- Use realistic skill percentages
- Update stats regularly as you grow
- Professional photo works best for about section
*/