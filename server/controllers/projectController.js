import Project from '../models/Project.js';

// @desc    Get all projects (public)
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isPublished: true })
            .sort({ createdAt: -1 }); // Add missing sort

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
        if (!project.isPublished && !req.user?.isAdmin) {
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

// @desc    Create new project with JSON data (admin only)
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
    try {
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Request body:', req.body);

        // Check if this is form-data or JSON
        const isFormData = req.headers['content-type']?.includes('multipart/form-data');

        let projectData;

        if (isFormData) {
            // Handle form-data with file uploads
            const {
                title,
                shortDescription,
                description,
                category,
                startDate,
                endDate,
                isFeatured,
                isPublished
            } = req.body;

            // Parse JSON fields from form-data
            const technologies = JSON.parse(req.body.technologies || '[]');
            const links = JSON.parse(req.body.links || '{}');

            // Handle uploaded image (Cloudinary returns secure URL at req.file.path)
            const images = {
                thumbnail: req.file?.path || req.file?.filename || 'default-image.jpg',
                gallery: []
            };

            projectData = {
                title,
                shortDescription,
                description,
                technologies,
                category,
                images,
                links,
                startDate,
                endDate: endDate || null,
                isFeatured: isFeatured === 'true',
                isPublished: isPublished === 'true'
            };
        } else {
            // Handle JSON data directly (no file upload)
            const {
                title,
                shortDescription,
                description,
                technologies,
                category,
                images,
                links,
                status,
                startDate,
                endDate,
                isFeatured,
                isPublished
            } = req.body;

            // Validate required fields
            if (!title || !shortDescription || !description || !technologies) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: title, shortDescription, description, technologies'
                });
            }

            projectData = {
                title,
                shortDescription,
                description,
                technologies, // Already an array from JSON
                category: category || 'web-development',
                images: images || { thumbnail: 'default-image.jpg', gallery: [] },
                links: links || {},
                status: status || 'completed',
                startDate,
                endDate: endDate || null,
                isFeatured: isFeatured === true,
                isPublished: isPublished === true
            };
        }

        const project = await Project.create(projectData);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create project'
        });
    }
};

// @desc    Update project (admin only)
// @route   PUT /api/projects/:id
// @access  Private/Admin
// In projectController.js - Update the updateProject function:
// Add this function if you don't have it already
// In controllers/projectController.js, update the updateProject function:
export const updateProject = async (req, res) => {
    try {
        console.log('Update request for project:', req.params.id);
        console.log('Request body:', req.body);

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        let updateData = { ...req.body };

        // If a new file is uploaded (multipart), persist the Cloudinary URL as thumbnail
        if (req.file?.path) {
            updateData.images = {
                thumbnail: req.file.path,
                // Preserve existing gallery if present
                gallery: project.images?.gallery || []
            };
        }

        // Handle technologies array
        if (typeof updateData.technologies === 'string') {
            updateData.technologies = updateData.technologies
                .split(',')
                .map(tech => tech.trim())
                .filter(tech => tech);
        }

        // Handle boolean values
        if (updateData.isFeatured !== undefined) {
            updateData.isFeatured = Boolean(updateData.isFeatured);
        }
        if (updateData.isPublished !== undefined) {
            updateData.isPublished = Boolean(updateData.isPublished);
        }

        // IMPORTANT: Handle endDate properly
        if (updateData.endDate === '' || updateData.endDate === null) {
            updateData.endDate = null;
        }

        // Manual date validation before database operation
        if (updateData.endDate && updateData.startDate) {
            const startDate = new Date(updateData.startDate);
            const endDate = new Date(updateData.endDate);

            if (endDate <= startDate) {
                return res.status(400).json({
                    success: false,
                    message: 'End date must be after start date'
                });
            }
        }

        updateData.updatedAt = Date.now();

        console.log('Processed update data:', updateData);

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
                context: 'query' // Important for custom validators
            }
        );

        console.log('Project updated successfully');

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update project'
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