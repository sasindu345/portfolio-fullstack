// src/components/ContactCTA/ContactCTA.js
import React from 'react';
import './ContactCTA.css';

const ContactCTA = () => {
    return (
        <section className="contact-cta">
            <div className="cta-container">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to build something great together?</h2>
                    <p className="cta-description">
                        Whether you have a project in mind, a question, or just want to say hello, I'd love to hear from you.
                    </p>
                    <a href="/contact" className="cta-button">
                        Get in Touch
                        <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;