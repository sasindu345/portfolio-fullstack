import api from './api';

export const projectService = {
    // Get all projects (for your Project page)
    getAllProjects: async () => {
        try {
            const response = await api.get('/projects');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch projects');
        }
    },

    // Get single project
    getProject: async (id) => {
        try {
            const response = await api.get(`/projects/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch project');
        }
    },

    // Create new project (admin only)
    createProject: async (projectData) => {
        try {
            const response = await api.post('/projects', projectData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create project');
        }
    },

    // Update project (admin only)
    updateProject: async (id, projectData) => {
        try {
            const response = await api.put(`/projects/${id}`, projectData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update project');
        }
    },

    // Delete project (admin only)
    deleteProject: async (id) => {
        try {
            const response = await api.delete(`/projects/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete project');
        }
    }
};