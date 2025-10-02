// src/Pages/Admin/components/ProjectFormModal.js
import React from 'react';

const ProjectFormModal = ({
    projectForm,
    editingProject,
    loading,
    onClose,
    onSubmit,
    onChange,
    onRemoveImage
}) => {
    const getImagePreview = (img) => {
        if (typeof img === 'string') {
            if (img.startsWith('http')) return img;
            if (img.startsWith('/api/uploads/')) {
                return `http://localhost:5001${img}`;
            }
            return img;
        }
        return img.preview;
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                    <button type="button" className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={onSubmit} className="project-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="title">Project Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={projectForm.title}
                            onChange={onChange}
                            required
                            placeholder="My Awesome Project"
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="shortDescription">Short Description *</label>
                        <input
                            type="text"
                            id="shortDescription"
                            name="shortDescription"
                            value={projectForm.shortDescription}
                            onChange={onChange}
                            required
                            maxLength="200"
                            placeholder="Brief summary for project cards"
                            autoComplete="off"
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            {projectForm.shortDescription.length}/200 characters
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Full Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={projectForm.description}
                            onChange={onChange}
                            rows={4}
                            required
                            maxLength="2000"
                            placeholder="Detailed project description..."
                            autoComplete="off"
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            {projectForm.description.length}/2000 characters
                        </small>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                name="category"
                                value={projectForm.category}
                                onChange={onChange}
                                required
                            >
                                <option value="web-development">Web Development</option>
                                <option value="mobile-app">Mobile App</option>
                                <option value="desktop-app">Desktop App</option>
                                <option value="api">API</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="technologies">Technologies *</label>
                            <input
                                type="text"
                                id="technologies"
                                name="technologies"
                                value={projectForm.technologies}
                                onChange={onChange}
                                required
                                placeholder="React, Node.js, MongoDB"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date *</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={projectForm.startDate}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={projectForm.endDate}
                                onChange={onChange}
                                min={projectForm.startDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Upload Project Images (Multiple)</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            multiple
                            onChange={onChange}
                            style={{
                                padding: '0.8rem',
                                border: '2px dashed var(--glass-border)',
                                borderRadius: '12px',
                                background: 'rgba(30, 41, 59, 0.3)',
                                color: 'var(--text-secondary)'
                            }}
                        />
                        <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            Select multiple images for carousel. First image will be the thumbnail.
                        </small>

                        {/* Image Previews */}
                        {projectForm.images.length > 0 && (
                            <div className="image-previews" style={{ marginTop: '1rem' }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    {projectForm.images.map((img, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                position: 'relative',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: '1px solid var(--glass-border)'
                                            }}
                                        >
                                            <img
                                                src={getImagePreview(img)}
                                                alt={`Preview ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100px',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => {
                                                    e.target.src = '/images/home/myimg.jpeg';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => onRemoveImage(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    background: 'rgba(239, 68, 68, 0.9)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '24px',
                                                    height: '24px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                ×
                                            </button>
                                            {index === 0 && (
                                                <span style={{
                                                    position: 'absolute',
                                                    bottom: '5px',
                                                    left: '5px',
                                                    background: 'rgba(59, 130, 246, 0.9)',
                                                    color: 'white',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '600'
                                                }}>
                                                    Thumbnail
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="links.github">GitHub Repository</label>
                        <input
                            type="url"
                            id="links.github"
                            name="links.github"
                            value={projectForm.links.github}
                            onChange={onChange}
                            placeholder="https://github.com/username/project"
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="links.liveDemo">Live Demo URL</label>
                            <input
                                type="url"
                                id="links.liveDemo"
                                name="links.liveDemo"
                                value={projectForm.links.liveDemo}
                                onChange={onChange}
                                placeholder="https://myproject.com"
                                autoComplete="off"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="links.documentation">Documentation URL</label>
                            <input
                                type="url"
                                id="links.documentation"
                                name="links.documentation"
                                value={projectForm.links.documentation}
                                onChange={onChange}
                                placeholder="https://docs.myproject.com"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={projectForm.isFeatured}
                                    onChange={onChange}
                                />
                                Featured Project
                            </label>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={projectForm.isPublished}
                                    onChange={onChange}
                                />
                                Publish Project
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="action-btn secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="action-btn primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectFormModal;