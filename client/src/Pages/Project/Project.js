import React, { useState, useEffect } from 'react';
import './Project.css';

const Projects = () => {
    // Sample project data - Replace with your real projects
    const [projects] = useState([
        {
            id: 1,
            title: "E-Commerce Website",
            description: "Full-stack e-commerce platform with user authentication, shopping cart, and payment integration. Built with modern technologies for optimal performance.",
            image: "/images/project1.jpg", // Add your project images to public/images/
            techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
            liveLink: "https://your-project-live-link.com",
            githubLink: "https://github.com/yourusername/project1",
            featured: true
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
            image: "/images/project2.jpg",
            techStack: ["React", "Firebase", "Material-UI", "Socket.io"],
            liveLink: "https://your-project-live-link.com",
            githubLink: "https://github.com/yourusername/project2",
            featured: true
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "Interactive weather dashboard displaying current conditions, 7-day forecasts, and weather maps with location-based services.",
            image: "/images/project3.jpg",
            techStack: ["JavaScript", "HTML5", "CSS3", "Weather API"],
            liveLink: "https://your-project-live-link.com",
            githubLink: "https://github.com/yourusername/project3",
            featured: false
        },
        {
            id: 4,
            title: "Portfolio Website",
            description: "Professional portfolio website showcasing projects and skills. Features responsive design and modern animations.",
            image: "/images/project4.jpg",
            techStack: ["React", "CSS3", "Node.js", "MongoDB"],
            liveLink: "https://your-portfolio-link.com",
            githubLink: "https://github.com/yourusername/portfolio",
            featured: false
        }
    ]);

    const [filter, setFilter] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Filter projects based on selected filter
    useEffect(() => {
        if (filter === 'all') {
            setFilteredProjects(projects);
        } else if (filter === 'featured') {
            setFilteredProjects(projects.filter(project => project.featured));
        } else {
            // Filter by technology (you can expand this)
            setFilteredProjects(
                projects.filter(project =>
                    project.techStack.some(tech =>
                        tech.toLowerCase().includes(filter.toLowerCase())
                    )
                )
            );
        }
    }, [filter, projects]);

    // Handle filter change
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="projects-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading Projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="projects-page">
            {/* Page Header */}
            <section className="projects-header">
                <div className="container">
                    <h1 className="page-title">My Projects</h1>
                    <p className="page-subtitle">
                        Explore my latest work and development projects. Each project represents
                        a unique challenge and learning experience in my journey as a developer.
                    </p>
                </div>
            </section>

            {/* Filter Buttons */}
            <section className="projects-filters">
                <div className="container">
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('all')}
                        >
                            All Projects
                        </button>
                        <button
                            className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('featured')}
                        >
                            Featured
                        </button>
                        <button
                            className={`filter-btn ${filter === 'react' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('react')}
                        >
                            React
                        </button>
                        <button
                            className={`filter-btn ${filter === 'javascript' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('javascript')}
                        >
                            JavaScript
                        </button>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="projects-grid">
                <div className="container">
                    <div className="projects-container">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <div key={project.id} className="project-card">
                                    {/* Project Image */}
                                    <div className="project-image">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            onError={(e) => {
                                                // Fallback image if project image fails to load
                                                e.target.src = 'https://via.placeholder.com/400x250/1a2332/d4af37?text=Project+Image';
                                            }}
                                        />
                                        <div className="project-overlay">
                                            <div className="project-links">
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >
                                                    <span>Live Demo</span>
                                                </a>
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >
                                                    <span>View Code</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="project-content">
                                        <div className="project-header">
                                            <h3 className="project-title">{project.title}</h3>
                                            {project.featured && <span className="featured-badge">Featured</span>}
                                        </div>

                                        <p className="project-description">{project.description}</p>

                                        {/* Tech Stack */}
                                        <div className="tech-stack">
                                            {project.techStack.map((tech, index) => (
                                                <span key={index} className="tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Project Links */}
                                        <div className="project-actions">
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="primary-button"
                                            >
                                                View Live
                                            </a>
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="secondary-button"
                                            >
                                                Source Code
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-projects">
                                <p>No projects found for the selected filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="projects-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Interested in Working Together?</h2>
                        <p>I'm always open to discussing new opportunities and exciting projects.</p>
                        <a href="/contact" className="primary-button">Get In Touch</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Projects;