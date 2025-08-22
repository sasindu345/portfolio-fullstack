import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        // ...existing socialLinks...
    ];

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' }, // <-- match your Route path
        { name: 'Contact', href: '/contact' }
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer__container">
                {/* Main Footer Content */}
                <div className="footer__content">
                    {/* Brand Section */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span className="footer__logo-text">Portfolio</span>
                        </div>
                        <p className="footer__description">
                            Full-stack developer passionate about creating amazing web experiences and solving complex problems through code.
                        </p>
                        <div className="footer__social">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__social-link"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__links">
                        <h3 className="footer__links-title">Quick Links</h3>
                        <ul className="footer__links-list">
                            {quickLinks.map((link, index) => (
                                <li key={index} className="footer__links-item">
                                    <Link
                                        to={link.href}
                                        className="footer__links-link"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer__contact">
                        <h3 className="footer__contact-title">Get In Touch</h3>
                        <div className="footer__contact-info">
                            <div className="footer__contact-item">
                                <span className="footer__contact-label">Email:</span>
                                <a href="mailto:your.email@example.com" className="footer__contact-link">
                                    your.email@example.com
                                </a>
                            </div>
                            <div className="footer__contact-item">
                                <span className="footer__contact-label">Location:</span>
                                <span className="footer__contact-text">Your City, Country</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer__bottom">
                    <div className="footer__bottom-content">
                        <p className="footer__copyright">
                            © {currentYear} Your Name. All rights reserved.
                        </p>
                        <button
                            className="footer__back-to-top"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 14l5-5 5 5z" />
                            </svg>
                            Back to Top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;