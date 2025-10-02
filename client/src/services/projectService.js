// src/services/projectService.js
import api from './api';

const projectService = {
    // Get all published projects
    getAllProjects: async () => {
        try {
            const response = await api.get('/projects'); // Fixed: added /api prefix
            return response.data;

        } catch (error) {
            console.error('Error fetching projects:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch projects. Please check your internet connection.'
            };
        }
    },

    // Get featured projects only
    getFeaturedProjects: async () => {
        try {
            const response = await api.get('/projects?isFeatured=true');
            return response.data;

        } catch (error) {
            console.error('Error fetching featured projects:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch featured projects.'
            };
        }
    },

    // Get projects by technology filter
    getProjectsByTechnology: async (tech) => {
        try {
            const response = await api.get(`/projects?technology=${tech}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching projects by technology:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch projects by technology.'
            };
        }
    },

    // Get single project by ID
    getProject: async (id) => {
        try {
            const response = await api.get(`/projects/${id}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching project:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch project details.'
            };
        }
    },

    // Create new project (admin only)
    createProject: async (projectData) => {
        try {
            const response = await api.post('/projects', projectData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error creating project:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to create project.'
            };
        }
    },

    // Update project (admin only)
    updateProject: async (id, projectData) => {
        try {
            const response = await api.put(`/projects/${id}`, projectData);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error updating project:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to update project.'
            };
        }
    },

    // Delete project (admin only)
    deleteProject: async (id) => {
        try {
            const response = await api.delete(`/projects/${id}`);
            return {
                // success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error deleting project:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to delete project.'
            };
        }
    }
};

export default projectService;