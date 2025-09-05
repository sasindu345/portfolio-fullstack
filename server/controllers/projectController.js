import Project from '../models/Project.js';

// @desc    Get all projects (public)
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ status: 'published' })
            .sort({ createdAt: -1 }); // Newest first

        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects'
        });
    }
};

// @desc    Get single project by ID (public)
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Only show published projects to public
        if (project.status !== 'published' && !req.user?.isAdmin) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch project'
        });
    }
};

// @desc    Create new project (admin only)
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
    try {
        const {
            title,
            shortDescription,
            description,
            technologies,
            category,
            images,
            startDate
        } = req.body;

        // Basic validation
        if (!title || !shortDescription || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title, short description, and description are required'
            });
        }

        const project = await Project.create({
            title,
            shortDescription,
            description,
            technologies,
            category: category || 'web-development',
            images: images || { thumbnail: 'default-image.jpg' },
            startDate: startDate || new Date(),
            isPublished: true
        });

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create project'
        });
    }
};

// @desc    Update project (admin only)
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update project'
        });
    }
};

// @desc    Delete project (admin only)
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        await Project.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete project'
        });
    }
};

// @desc    Get all projects for admin (includes drafts)
// @route   GET /api/admin/projects
// @access  Private/Admin
export const getAdminProjects = async (req, res) => {
    try {
        const projects = await Project.find({})
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Get admin projects error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects'
        });
    }
};