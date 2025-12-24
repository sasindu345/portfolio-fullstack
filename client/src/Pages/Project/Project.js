import React, { useState, useEffect } from 'react';
import './Project.css';
import projectService from '../../services/projectService';
import { resolveImageUrl } from '../../utils/imageUrlResolver';

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
                    const projectData = result.data.projects || result.data || [];
                    setProjects(projectData)
                    console.log('PROJECT DATA SAMPLE:', result.data.projects?.[0] || result.data?.[0]);

                    // DEBUG: Log first project's image structure to verify data shape
                    if (projectData.length > 0) {
                        console.log('First project image data:', projectData[0].images);
                        console.log('First project image field:', projectData[0].image);
                    }
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
        document.body.style.overflow = '';
    };

    // Handle image gallery
    const nextImage = () => {
        const totalImages = getTotalImageCount(selectedProject);
        if (totalImages > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % totalImages);
        }
    };

    const prevImage = () => {
        const totalImages = getTotalImageCount(selectedProject);
        if (totalImages > 1) {
            setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
        }
    };

    // Get image URL helper - uses centralized resolver
    const getImageUrl = (imagePath) => {
        return resolveImageUrl(imagePath, '/images/placeholder-project.png');
    };

    // Extract actual URL string from various image data formats
    // Handles: strings, objects ({ url, path }), arrays, null/undefined
    const extractImageUrl = (imageData) => {
        if (!imageData) return null;

        // Already a string - return as-is
        if (typeof imageData === 'string') return imageData;

        // Object with url property (e.g., { url: "...", path: "..." })
        if (typeof imageData === 'object' && imageData.url) return imageData.url;

        // Object with path property
        if (typeof imageData === 'object' && imageData.path) return imageData.path;

        // Array - extract first element
        if (Array.isArray(imageData) && imageData[0]) {
            return extractImageUrl(imageData[0]); // Recursive for nested formats
        }

        // Fallback to null (triggers placeholder)
        return null;
    };

    // Get first available image from project with fallback chain
    // Tolerates multiple data shapes: images.thumbnail, images.gallery[0], image, images[0]
    const getProjectThumbnail = (project) => {
        // Try: images.thumbnail
        if (project.images?.thumbnail) {
            const thumb = extractImageUrl(project.images.thumbnail);

            // If backend default placeholder, ignore it
            if (thumb === '/default-project.jpg') {
                return null; // triggers frontend placeholder
            }

            return thumb;
        }

        // Try: images.gallery first element
        if (project.images?.gallery?.[0]) return extractImageUrl(project.images.gallery[0]);

        // Try: legacy "image" field
        if (project.image) return extractImageUrl(project.image);

        // Try: legacy "images" array first element
        if (Array.isArray(project.images) && project.images[0]) return extractImageUrl(project.images[0]);

        // Return null (will use placeholder via getImageUrl fallback)
        return null;
    };

    // Get image from gallery or thumbnail based on index
    // currentImageIndex 0 = thumbnail, 1+ = gallery images
    const getModalImage = (project, imageIndex) => {
        if (imageIndex === 0) {
            return getProjectThumbnail(project);
        }

        // Gallery image (adjust index)
        const galleryIndex = imageIndex - 1;

        // Try: images.gallery array
        if (project.images?.gallery?.[galleryIndex]) {
            return extractImageUrl(project.images.gallery[galleryIndex]);
        }

        // Try: legacy "images" array
        if (Array.isArray(project.images) && project.images[galleryIndex]) {
            return extractImageUrl(project.images[galleryIndex]);
        }

        return null;
    };

    // Get total image count (thumbnail + gallery)
    const getTotalImageCount = (project) => {
        const galleryLength = Array.isArray(project.images?.gallery) ? project.images.gallery.length : 0;
        const legacyLength = Array.isArray(project.images) && !project.images.gallery ? project.images.length - 1 : 0;
        const hasThumbnail = getProjectThumbnail(project) ? 1 : 0;
        return hasThumbnail + Math.max(galleryLength, legacyLength);
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
                                    src={getImageUrl(getProjectThumbnail(project))}
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
                                        src={getImageUrl(getModalImage(selectedProject, currentImageIndex))}
                                        alt={selectedProject.title}
                                    />
                                    {getTotalImageCount(selectedProject) > 1 && (
                                        <div className="image-controls">
                                            <button onClick={prevImage}>‹</button>
                                            <span>{currentImageIndex + 1} / {getTotalImageCount(selectedProject)}</span>
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