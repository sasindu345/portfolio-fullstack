// src/Pages/Admin/components/ProjectCard.js
import React, { useState, useEffect } from 'react';
import { resolveImageUrl } from '../../../utils/imageUrlResolver';

const ProjectCard = ({ project, onEdit, onDelete }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Prepare all images
    const allImages = [];
    if (project.images?.thumbnail) {
        allImages.push(project.images.thumbnail);
    }
    if (project.images?.gallery && Array.isArray(project.images.gallery)) {
        allImages.push(...project.images.gallery);
    }

    // Auto-slideshow effect
    useEffect(() => {
        if (allImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % allImages.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [allImages.length]);

    // Manual navigation
    const nextImage = () => {
        setCurrentImageIndex(prev => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(prev =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    // Get image URL - uses centralized resolver
    const getImageUrl = (imagePath) => {
        return resolveImageUrl(imagePath, '/Images/home/myimg.jpeg');
    };

    const currentImage = allImages[currentImageIndex] || '/Images/home/myimg.jpeg';

    return (
        <div className="project-card">
            <div className="project-image">
                <img
                    src={getImageUrl(currentImage)}
                    alt={project.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/home/myimg.jpeg';
                    }}
                />

                {/* Image counter and navigation */}
                {allImages.length > 1 && (
                    <>
                        <div className="image-counter">
                            {currentImageIndex + 1} / {allImages.length}
                        </div>
                        <button
                            className="image-nav prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                        >
                            ‹
                        </button>
                        <button
                            className="image-nav next"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                        >
                            ›
                        </button>

                        {/* Dots indicator */}
                        <div className="image-dots">
                            {allImages.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {project.isFeatured && <span className="featured-badge">Featured</span>}
                {!project.isPublished && <span className="draft-badge">Draft</span>}
            </div>

            <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.shortDescription || project.description}</p>

                {project.technologies?.length > 0 && (
                    <div className="technologies">
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                )}

                <div className="project-meta">
                    <span>Category: {project.category}</span>
                    <span>Status: {project.isPublished ? 'Published' : 'Draft'}</span>
                </div>

                <div className="project-links">
                    {project.links?.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    )}
                    {project.links?.liveDemo && (
                        <a href={project.links.liveDemo} target="_blank" rel="noopener noreferrer">
                            Live Demo
                        </a>
                    )}
                </div>

                <div className="project-actions">
                    <button
                        type="button"
                        className="action-btn small secondary"
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="action-btn small danger"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;