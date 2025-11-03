import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const personalDetails = {
    name: "Sasindu Wijewardana",
    title: "Full Stack Developer",
    greeting: "HELLO, I'M",
    description: "I craft exceptional digital experiences through innovative web solutions, combining cutting-edge technology with creative design to bring your ideas to life.",
    profileImage: "Images/home/myimg.jpeg",
    imageAlt: "Sasindu Wijewardana Profile",
    cvFile: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID",
    portfolioSection: "/projects",
  };

  return (
    <section className="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg">
        <div className="hero-grid"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">

          {/* Profile Image */}
          <div className={`hero-image ${isVisible ? 'animate-in' : ''}`}>
            <div className="hero-avatar">
              <img
                src={personalDetails.profileImage}
                alt={personalDetails.imageAlt}
                className="avatar-image"
              />
              <div className="avatar-glow"></div>
              <div className="avatar-ring"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="hero-text">
            <span className={`hero-greeting ${isVisible ? 'animate-in' : ''}`}>
              {personalDetails.greeting}
            </span>
            <h1 className={`hero-name ${isVisible ? 'animate-in' : ''}`}>
              {personalDetails.name}
            </h1>
            <h2 className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
              {personalDetails.title}
            </h2>
            <p className={`hero-description ${isVisible ? 'animate-in' : ''}`}>
              {personalDetails.description}
            </p>

            <div className={`hero-buttons ${isVisible ? 'animate-in' : ''}`}>
              <Link
                to={personalDetails.portfolioSection}
                className="btn btn-primary"
              >
                <span>View My Work</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={personalDetails.cvFile}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3V13M10 13L6 9M10 13L14 9M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;