import React, { useState, useEffect } from 'react';
import './Project.css';
import projectService from '../../services/projectService';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const result = await projectService.getAllProjects();

                if (result.success) {
                    setProjects(result.data.projects || result.data || []);
                } else {
                    setError(result.error || 'Failed to load projects');
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Something went wrong while loading projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Handle modal
    const openModal = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'unset';
    };

    // Handle image gallery
    const nextImage = () => {
        if (selectedProject?.images?.gallery?.length > 0) {
            setCurrentImageIndex((prev) =>
                (prev + 1) % (selectedProject.images.gallery.length + 1)
            );
        }
    };

    const prevImage = () => {
        if (selectedProject?.images?.gallery?.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedProject.images.gallery.length : prev - 1
            );
        }
    };

    // Get image URL helper
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/images/placeholder-project.png';
        if (imagePath.startsWith('http')) return imagePath;

        // If path already has the full server path format
        if (imagePath.startsWith('/api/uploads/')) {
            return `http://localhost:5001${imagePath}`;
        }

        // Handle direct filenames
        return `http://localhost:5001/api/uploads/projects/${imagePath}`;
    };
    // Format date helper
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    // Close modal on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.keyCode === 27) closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    if (loading) {
        return (
            <div className="project-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading projects...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="project-container">
                <div className="error">
                    <h3>Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="project-container">
            <div className="project-header">
                <h1>My Projects</h1>
                <p>Click on any project to explore in detail</p>
            </div>

            <div className="projects-grid">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div
                            key={project._id}
                            className="project-card"
                            onClick={() => openModal(project)}
                        >
                            <div className="project-image">
                                <img
                                    src={getImageUrl(project.images?.thumbnail)}
                                    alt={project.title}
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder-project.png';
                                    }}
                                />
                                <div className="project-overlay">
                                    <span className="view-details">View Details</span>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-meta">
                                    <span className={`status status-${project.status}`}>
                                        {project.status}
                                    </span>
                                    <span className="category">{project.category}</span>
                                </div>

                                <h3>{project.title}</h3>
                                <p className="project-description">
                                    {project.shortDescription || project.description}
                                </p>

                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="project-tech">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span key={index} className="tech-tag">{tech}</span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="tech-more">+{project.technologies.length - 3}</span>
                                        )}
                                    </div>
                                )}

                                {project.isFeatured && (
                                    <div className="featured-badge">⭐ Featured</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-projects">
                        <h3>No projects found</h3>
                        <p>Projects will appear here once they're added to the database.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>

                        <div className="modal-header">
                            <h2>{selectedProject.title}</h2>
                            <div className="modal-meta">
                                <span className={`status status-${selectedProject.status}`}>
                                    {selectedProject.status}
                                </span>
                                <span className="date-range">
                                    {formatDate(selectedProject.startDate)}
                                    {selectedProject.endDate && ` - ${formatDate(selectedProject.endDate)}`}
                                </span>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="modal-image-section">
                                <div className="main-image">
                                    <img
                                        src={getImageUrl(
                                            currentImageIndex === 0
                                                ? selectedProject.images?.thumbnail
                                                : selectedProject.images?.gallery[currentImageIndex - 1]
                                        )}
                                        alt={selectedProject.title}
                                    />
                                    {selectedProject.images?.gallery?.length > 0 && (
                                        <div className="image-controls">
                                            <button onClick={prevImage}>‹</button>
                                            <span>{currentImageIndex + 1} / {(selectedProject.images?.gallery?.length || 0) + 1}</span>
                                            <button onClick={nextImage}>›</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="modal-details">
                                <div className="description-section">
                                    <h3>About This Project</h3>
                                    <p>{selectedProject.description}</p>
                                </div>

                                <div className="tech-section">
                                    <h3>Technologies Used</h3>
                                    <div className="tech-grid">
                                        {selectedProject.technologies?.map((tech, index) => (
                                            <span key={index} className="tech-pill">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="links-section">
                                    <h3>Project Links</h3>
                                    <div className="modal-links">
                                        {selectedProject.links?.liveDemo && (
                                            <a
                                                href={selectedProject.links.liveDemo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="modal-link live-demo"
                                            >
                                                🚀 Live Demo
                                            </a>
                                        )}
                                        {selectedProject.links?.github && (
                                            <a
                                                href={selectedProject.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="modal-link github"
                                            >
                                                📂 GitHub Repository
                                            </a>
                                        )}
                                        {selectedProject.links?.documentation && (
                                            <a
                                                href={selectedProject.links.documentation}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="modal-link docs"
                                            >
                                                📚 Documentation
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;