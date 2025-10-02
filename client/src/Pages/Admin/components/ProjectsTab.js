// src/Pages/Admin/components/ProjectsTab.js - FIXED
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsTab = ({ projects = [], loading, onAddProject, onEditProject, onDeleteProject }) => {
    // Safety check - ensure projects is always an array
    const safeProjects = Array.isArray(projects) ? projects : [];

    return (
        <div className="projects-content">
            <div className="content-header">
                <h2>Manage Projects</h2>
                <button
                    type="button"
                    className="action-btn primary"
                    onClick={onAddProject}
                >
                    Add New Project
                </button>
            </div>

            {loading && <div className="loading">Loading projects...</div>}

            {!loading && safeProjects.length > 0 && (
                <div className="projects-grid">
                    {safeProjects.map(project => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onEdit={() => onEditProject(project)}
                            onDelete={() => onDeleteProject(project._id)}
                        />
                    ))}
                </div>
            )}

            {!loading && safeProjects.length === 0 && (
                <div className="empty-state">
                    <h3>No projects yet</h3>
                    <p>Start by adding your first project!</p>
                    <button
                        type="button"
                        className="action-btn primary"
                        onClick={onAddProject}
                    >
                        Add Project
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectsTab;