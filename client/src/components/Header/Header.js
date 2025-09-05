import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <Link to="/login" onClick={closeMenu}>
                        <h2>Portfolio</h2>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <Link to="/" className={isActive('/')}>
                        Home
                    </Link>
                    <Link to="/about" className={isActive('/about')}>
                        About
                    </Link>
                    <Link to="/projects" className={isActive('/projects')}>
                        Projects
                    </Link>
                    <Link to="/contact" className={isActive('/contact')}>
                        Contact
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                {/* Mobile Navigation */}
                <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className={isActive('/')} onClick={closeMenu}>
                        Home
                    </Link>
                    <Link to="/about" className={isActive('/about')} onClick={closeMenu}>
                        About
                    </Link>
                    <Link to="/projects" className={isActive('/projects')} onClick={closeMenu}>
                        Projects
                    </Link>
                    <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>
                        Contact
                    </Link>
                </nav>

                {/* Mobile Overlay */}
                {isMenuOpen && (
                    <div className="mobile-overlay" onClick={closeMenu}></div>
                )}
            </div>
        </header>
    );
};

export default Header;