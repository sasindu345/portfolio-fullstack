// src/Pages/Admin/Admin.js - FIXED VERSION
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Admin.css';

// Import sub-components
import DashboardTab from './components/DashboardTab';
import ProjectsTab from './components/ProjectsTab';
import ContactsTab from './components/ContactsTab';
import ProjectFormModal from './components/ProjectFormModal';

const Admin = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    // Memoize initial state
    const initialProjectFormState = useMemo(() => ({
        title: '',
        shortDescription: '',
        description: '',
        technologies: '',
        category: 'web-development',
        startDate: '',
        endDate: '',
        images: [],
        imagePreview: '',
        links: {
            github: '',
            liveDemo: '',
            documentation: ''
        },
        isFeatured: false,
        isPublished: true
    }), []);

    // State Declarations
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [stats, setStats] = useState({
        projects: 0,
        contacts: 0,
        unreadContacts: 0
    });
    const [projectForm, setProjectForm] = useState(initialProjectFormState);
    const [contacts, setContacts] = useState([]);

    // Load projects
    const loadProjects = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/projects');
            const projectsData = response.data.data || [];
            setProjects(projectsData);
            setStats(prev => ({ ...prev, projects: projectsData.length }));
        } catch (error) {
            console.error('Load projects error:', error);
            setError('Failed to load projects');
            setProjects([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load contacts
    const loadContacts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/contact');
            const contactsData = response.data.data || [];
            setContacts(contactsData);
            setStats(prev => ({
                ...prev,
                contacts: contactsData.length,
                unreadContacts: contactsData.filter(c => !c.isRead).length
            }));
        } catch (error) {
            console.error('Load contacts error:', error);
            setError('Failed to load contacts');
        } finally {
            setLoading(false);
        }
    }, []);

    // Load dashboard stats
    const loadDashboardStats = useCallback(async () => {
        try {
            const [projectsRes, contactsRes] = await Promise.all([
                api.get('/projects'),
                api.get('/contact/stats').catch(() => ({ data: { data: { total: 0, unread: 0 } } }))
            ]);

            setStats({
                projects: projectsRes.data.count || projectsRes.data.data?.length || 0,
                contacts: contactsRes.data.data?.total || 0,
                unreadContacts: contactsRes.data.data?.unread || 0
            });
        } catch (error) {
            console.error('Error loading stats:', error);
            setStats({
                projects: projects.length,
                contacts: contacts.length,
                unreadContacts: contacts.filter(c => !c.isRead).length
            });
        }
    }, [projects.length, contacts]);

    // Reset form
    const resetProjectForm = useCallback(() => {
        setProjectForm(initialProjectFormState);
        setEditingProject(null);
        setShowProjectForm(false);
    }, [initialProjectFormState]);

    // Form change handler
    const handleProjectFormChange = useCallback((e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            if (files && files.length > 0) {
                const fileArray = Array.from(files);
                const previews = fileArray.map(file => ({
                    file,
                    preview: URL.createObjectURL(file)
                }));

                setProjectForm(prev => ({
                    ...prev,
                    images: [...prev.images, ...previews],
                    imagePreview: previews[0]?.preview || prev.imagePreview
                }));
            }
            return;
        }

        if (name.startsWith('links.')) {
            const linkField = name.split('.')[1];
            setProjectForm(prev => ({
                ...prev,
                links: { ...prev.links, [linkField]: value }
            }));
        } else {
            setProjectForm(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    }, []);

    // Remove image from form
    const handleRemoveImage = useCallback((index) => {
        setProjectForm(prev => {
            const newImages = prev.images.filter((_, i) => i !== index);
            return {
                ...prev,
                images: newImages,
                imagePreview: newImages[0]?.preview || newImages[0] || ''
            };
        });
    }, []);

    // Form submission
    const handleProjectSubmit = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);
        setError(null);

        try {
            // Validate dates
            if (projectForm.endDate && projectForm.startDate) {
                const startDate = new Date(projectForm.startDate);
                const endDate = new Date(projectForm.endDate);
                if (endDate <= startDate) {
                    setError({ field: 'endDate', message: 'End date must be after start date' });
                    setLoading(false);
                    return;
                }
            }

            // Upload images
            let uploadedPaths = [];
            const newImages = projectForm.images.filter(img => img.file);

            if (newImages.length > 0) {
                for (const imgObj of newImages) {
                    const formData = new FormData();
                    formData.append('image', imgObj.file);

                    try {
                        const uploadResponse = await api.post('/upload/single', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        uploadedPaths.push(uploadResponse.data.data.path);
                    } catch (uploadError) {
                        console.error('Upload error:', uploadError);
                    }
                }
            }

            // Combine with existing images (for edit mode)
            const existingImages = projectForm.images.filter(img => typeof img === 'string');
            const allImages = [...uploadedPaths, ...existingImages];

            // Prepare project data
            const projectData = {
                title: projectForm.title.trim(),
                shortDescription: projectForm.shortDescription.trim(),
                description: projectForm.description.trim(),
                category: projectForm.category,
                startDate: projectForm.startDate,
                ...(projectForm.endDate ? { endDate: projectForm.endDate } : {}),
                isFeatured: Boolean(projectForm.isFeatured),
                isPublished: Boolean(projectForm.isPublished),
                technologies: projectForm.technologies
                    .split(',')
                    .map(tech => tech.trim())
                    .filter(tech => tech),
                links: {
                    github: projectForm.links.github.trim(),
                    liveDemo: projectForm.links.liveDemo.trim(),
                    documentation: projectForm.links.documentation.trim()
                },
                images: {
                    thumbnail: allImages[0] || '/default-project.jpg',
                    gallery: allImages.slice(1)
                }
            };

            // Validation
            if (!projectData.title) {
                setError({ field: 'title', message: 'Title is required' });
                setLoading(false);
                return;
            }
            if (!projectData.shortDescription) {
                setError({ field: 'shortDescription', message: 'Short description is required' });
                setLoading(false);
                return;
            }
            if (!projectData.description) {
                setError({ field: 'description', message: 'Description is required' });
                setLoading(false);
                return;
            }

            if (projectData.technologies.length === 0) {
                setError({ field: 'technologies', message: 'At least one technology is required' });
                setLoading(false);
                return;
            }

            // Submit
            if (editingProject) {
                await api.put(`/projects/${editingProject._id}`, projectData, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                await api.post('/projects', projectData, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            setSuccess(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
            resetProjectForm();
            await loadProjects();
            await loadDashboardStats();
        } catch (error) {
            console.error('Submit error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            setError({ field: 'submit', message: `Failed to ${editingProject ? 'update' : 'create'} project: ${errorMessage}` });
        } finally {
            setLoading(false);
        }
    }, [projectForm, editingProject, resetProjectForm, loadProjects, loadDashboardStats]);

    // Edit project
    const handleEditProject = useCallback((project) => {
        setEditingProject(project);

        // Prepare images array
        const images = [];
        if (project.images?.thumbnail) {
            images.push(project.images.thumbnail);
        }
        if (project.images?.gallery && Array.isArray(project.images.gallery)) {
            images.push(...project.images.gallery);
        }

        setProjectForm({
            title: project.title || '',
            shortDescription: project.shortDescription || '',
            description: project.description || '',
            technologies: Array.isArray(project.technologies)
                ? project.technologies.join(', ')
                : (project.technologies || ''),
            category: project.category || 'web-development',
            startDate: project.startDate ? project.startDate.split('T')[0] : '',
            endDate: project.endDate ? project.endDate.split('T')[0] : '',
            images: images,
            imagePreview: images[0] || '',
            links: {
                github: project.links?.github || '',
                liveDemo: project.links?.liveDemo || '',
                documentation: project.links?.documentation || ''
            },
            isFeatured: Boolean(project.isFeatured),
            isPublished: project.isPublished !== false
        });
        setShowProjectForm(true);
    }, []);

    // Delete project
    const handleDeleteProject = useCallback(async (projectId) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        setLoading(true);
        try {
            await api.delete(`/projects/${projectId}`);
            setSuccess('Project deleted successfully!');
            await loadProjects();
            await loadDashboardStats();
        } catch (error) {
            setError('Failed to delete project');
        } finally {
            setLoading(false);
        }
    }, [loadProjects, loadDashboardStats]);

    // Contact handlers
    const handleMarkAsRead = useCallback(async (contactId) => {
        try {
            await api.put(`/contact/${contactId}/read`);
            loadContacts();
            setSuccess('Message marked as read');
        } catch (error) {
            setError('Failed to mark as read');
        }
    }, [loadContacts]);

    const handleMarkAsUnread = useCallback(async (contactId) => {
        try {
            await api.put(`/contact/${contactId}/read`);
            loadContacts();
            setSuccess('Message marked as unread');
        } catch (error) {
            setError('Failed to mark as unread');
        }
    }, [loadContacts]);

    const handleDeleteContact = useCallback(async (contactId) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            await api.delete(`/contact/${contactId}`);
            setSuccess('Message deleted successfully');
            loadContacts();
        } catch (error) {
            setError('Failed to delete message');
        }
    }, [loadContacts]);

    // Load initial data - FIXED
    // Load initial data - FIXED
    useEffect(() => {
        loadProjects();
        loadDashboardStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // ...existing code...

    // Add this useEffect to handle blur when modal opens
    useEffect(() => {
        const header = document.querySelector('.admin-header');
        const nav = document.querySelector('.admin-nav');
        const main = document.querySelector('.admin-main');

        if (showProjectForm) {
            // Add blur when modal is open
            header?.classList.add('blur-background');
            nav?.classList.add('blur-background');
            main?.classList.add('blur-background');
            document.body.classList.add('modal-open');
        } else {
            // Remove blur when modal is closed
            header?.classList.remove('blur-background');
            nav?.classList.remove('blur-background');
            main?.classList.remove('blur-background');
            document.body.classList.remove('modal-open');
        }

        // Cleanup on unmount
        return () => {
            header?.classList.remove('blur-background');
            nav?.classList.remove('blur-background');
            main?.classList.remove('blur-background');
            document.body.classList.remove('modal-open');
        };
    }, [showProjectForm]);

    // ...existing code... 

    // Load data when tab changes - FIXED
    // Load data when tab changes - FIXED
    useEffect(() => {
        if (activeTab === 'dashboard') {
            loadDashboardStats();
        } else if (activeTab === 'projects') {
            loadProjects();
        } else if (activeTab === 'contacts') {
            loadContacts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    // Clear messages after 5 seconds
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess('');
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    return (
        <div className="admin-container">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-content">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-user-info">
                        <span>Welcome, {user?.firstName || user?.username}</span>
                        <button type="button" onClick={logout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="admin-nav">
                <button
                    type="button"
                    className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Dashboard
                </button>
                <button
                    type="button"
                    className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects ({stats.projects})
                </button>
                <button
                    type="button"
                    className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contacts')}
                >
                    Messages ({stats.unreadContacts})
                </button>
            </nav>

            {/* Messages */}
            {error && !showProjectForm && <div className="alert alert-error">{error.message}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Content */}
            <main className="admin-main">
                {activeTab === 'dashboard' && (
                    <DashboardTab
                        stats={stats}
                        onAddProject={() => {
                            setActiveTab('projects');
                            setShowProjectForm(true);
                        }}
                        onViewMessages={() => setActiveTab('contacts')}
                    />
                )}

                {activeTab === 'projects' && (
                    <ProjectsTab
                        projects={projects}
                        loading={loading}
                        onAddProject={() => setShowProjectForm(true)}
                        onEditProject={handleEditProject}
                        onDeleteProject={handleDeleteProject}
                    />
                )}

                {activeTab === 'contacts' && (
                    <ContactsTab
                        contacts={contacts}
                        loading={loading}
                        onMarkAsRead={handleMarkAsRead}
                        onMarkAsUnread={handleMarkAsUnread}
                        onDeleteContact={handleDeleteContact}
                    />
                )}
            </main>
            {showProjectForm && (
                <ProjectFormModal
                    projectForm={projectForm}
                    editingProject={editingProject}
                    loading={loading}
                    error={error}
                    onClose={resetProjectForm}
                    onSubmit={handleProjectSubmit}
                    onChange={handleProjectFormChange}
                    onRemoveImage={handleRemoveImage}
                />
            )}
        </div>
    );
};

export default Admin;