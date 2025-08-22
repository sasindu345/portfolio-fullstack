import React from 'react';
import './Hero.css';

const Hero = () => {
  // ========== CHANGE YOUR PERSONAL DETAILS HERE ==========

  const personalDetails = {
    // Replace with your actual name
    name: "Sasindu Wijewardana", // CHANGE THIS: Your full name

    // Replace with your job title/role
    title: "Full Stack Developer", // CHANGE THIS: Your profession (e.g., "React Developer", "MERN Stack Developer", "Software Engineer")

    // Replace with your greeting message
    greeting: "Hello, I'm", // CHANGE THIS: Your greeting (e.g., "Hi there, I'm", "Welcome, I'm")

    // Replace with your personal description (2-3 lines max)
    description: "I craft exceptional digital experiences through innovative web solutions, combining cutting-edge technology with creative design to bring your ideas to life.",
    // CHANGE THIS: Write about yourself, your skills, what you do

    // Replace with your image path
    profileImage: "Images/home/myimg.jpeg", // CHANGE THIS: Path to your profile photo
    imageAlt: "John Doe Profile", // CHANGE THIS: Alt text for your image

    // Replace with your CV file path
    cvFile: "/files/john-doe-cv.pdf", // CHANGE THIS: Path to your CV/Resume file

    // Social links - add your actual links
    portfolioSection: "#projects", // CHANGE THIS: Link to your work section (usually #projects or #portfolio)
  };

  // ========== COMPONENT RENDER (Don't change unless you understand React) ==========

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">

          {/* Left side - Text content */}
          <div className="hero-text">
            <span className="hero-greeting">{personalDetails.greeting}</span>
            <h1 className="hero-name">{personalDetails.name}</h1>
            <h2 className="hero-title">{personalDetails.title}</h2>
            <p className="hero-description">
              {personalDetails.description}
            </p>

            {/* Action buttons */}
            <div className="hero-buttons">
              <a
                href={personalDetails.portfolioSection}
                className="btn btn-primary"
                aria-label="View my work portfolio"
              >
                View My Work
              </a>
              <a
                href={personalDetails.cvFile}
                className="btn btn-secondary"
                download
                aria-label="Download my CV/Resume"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div className="hero-image">
            <div className="hero-avatar">
              <img
                src={personalDetails.profileImage}
                alt={personalDetails.imageAlt}
                className="avatar-image"
                loading="lazy"
              />
              <div className="avatar-glow"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div className="hero-scroll">
          <div className="scroll-indicator">
            <span>Scroll Down</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

/* 
========== QUICK SETUP GUIDE FOR BEGINNERS ==========

1. UPDATE PERSONAL DETAILS:
   - Change personalDetails object values above
   - Replace "John Doe" with your name
   - Update your job title
   - Write your own description
   
2. ADD YOUR IMAGES:
   - Put your profile photo in: public/images/profile.jpg
   - Make sure image is good quality (square works best)
   - Update the profileImage path if different location

3. ADD YOUR CV:
   - Put your CV/Resume in: public/files/your-name-cv.pdf
   - Update the cvFile path
   - Make sure file is accessible

4. CUSTOMIZATION TIPS:
   - Keep description under 2 lines for better design
   - Use professional profile photo
   - Test both buttons work correctly
   - Make sure image loads properly

5. COMMON FILE PATHS:
   - Images: /images/your-photo.jpg
   - Files: /files/your-cv.pdf
   - These paths start from 'public' folder

6. NEED HELP?
   - All changes are in personalDetails object at top
   - Don't modify the return() section unless you know React
   - Test after each change to make sure it works
*/