// src/pages/Contact/Contact.js

import React, { useState } from 'react';
import './Contact.css';
import { contactService } from '../../services/contactService';

// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 1. Import SOLID icons (used for contact info and loading spinner)
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faClock,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

// 2. Import BRAND icons (used for social media links)
import {
    faLinkedinIn,
    faGithub as faGithubBrands,
    faTwitter as faTwitterBrands,
    faInstagram as faInstagramBrands
} from '@fortawesome/free-brands-svg-icons';
// NOTE: We only import and use the aliased brand icons, not the general solid ones.



const Contact = () => {
    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // State to show loading and success/error messages
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setShowMessage('');

        if (formData.message.length < 10) {
            setShowMessage('error');
            setIsLoading(false);
            return;
        }

        try {
            const result = await contactService.submitContact(formData);
            console.log('Message sent successfully:', result);
            setShowMessage('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
            setShowMessage('error');
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setShowMessage('');
            }, 5000);
        }
    };

    return (
        <div className="contact-page">
            {/* Page Header */}
            <div className="contact-header">
                <div className="container">
                    <h1 className="page-title">Let's Work Together</h1>
                    <p className="page-subtitle">
                        Have a project in mind? I'd love to hear about it.
                        Let's discuss how we can bring your ideas to life.
                    </p>
                </div>
            </div>

            {/* Main Contact Content */}
            <div className="contact-content">
                <div className="container">
                    <div className="contact-grid">

                        {/* Contact Form */}
                        <div className="contact-form-section">
                            <h2 className="section-title">Send Me a Message</h2>

                            {/* Success/Error Messages */}
                            {showMessage === 'success' && (
                                <div className="message success-message">
                                    ✅ Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {showMessage === 'error' && (
                                <div className="message error-message">
                                    ❌ Something went wrong. Please try again.
                                </div>
                            )}

                            <form className="contact-form" onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>

                                {/* Subject Input */}
                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="What's this about?"
                                        required
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="form-textarea"
                                        placeholder="Tell me about your project or idea..."
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} spin className="spinner-icon" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <span className="button-arrow">→</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="contact-info-section">
                            <h2 className="section-title">Get In Touch</h2>

                            <div className="contact-info">
                                {/* Email */}
                                <div className="info-item">
                                    <div className="info-icon">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <div className="info-content">
                                        <h3 className="info-title">Email</h3>
                                        <p className="info-text">jayamadusasindu5@gmail.com</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="info-item">
                                    <div className="info-icon">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                    <div className="info-content">
                                        <h3 className="info-title">Phone</h3>
                                        <p className="info-text">0767349531</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="info-item">
                                    <div className="info-icon">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    </div>
                                    <div className="info-content">
                                        <h3 className="info-title">Location</h3>
                                        <p className="info-text">Elpitiya, Galle, Sri Lanka</p>
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="info-item">
                                    <div className="info-icon">
                                        <FontAwesomeIcon icon={faClock} />
                                    </div>
                                    <div className="info-content">
                                        <h3 className="info-title">Response Time</h3>
                                        <p className="info-text">Usually within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="social-links">
                                <h3 className="social-title">Follow Me</h3>
                                <div className="social-icons">
                                    <a
                                        href="https://linkedin.com/in/your-profile"
                                        className="social-link"
                                        aria-label="LinkedIn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>
                                    <a
                                        href="https://github.com/your-username"
                                        className="social-link"
                                        aria-label="GitHub"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faGithubBrands} />
                                    </a>
                                    <a
                                        href="https://twitter.com/your-username"
                                        className="social-link"
                                        aria-label="Twitter"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faTwitterBrands} />
                                    </a>
                                    <a
                                        href="https://instagram.com/your-username"
                                        className="social-link"
                                        aria-label="Instagram"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={faInstagramBrands} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;