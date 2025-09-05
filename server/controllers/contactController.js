import Contact from '../models/Contact.js';

// @desc    Submit contact form (public)
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Email validation (simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const contact = await Contact.create({
            name,
            email,
            subject: subject || 'No Subject',
            message,
            submittedAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for your message! I\'ll get back to you soon.',
            data: {
                id: contact._id,
                submittedAt: contact.submittedAt
            }
        });
    } catch (error) {
        console.error('Submit contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit contact form. Please try again.'
        });
    }
};

// @desc    Get all contact submissions (admin only)
// @route   GET /api/admin/contacts
// @access  Private/Admin
export const getAllContacts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const contacts = await Contact.find({})
            .sort({ submittedAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalContacts = await Contact.countDocuments();

        res.json({
            success: true,
            data: contacts,
            pagination: {
                current: page,
                pages: Math.ceil(totalContacts / limit),
                total: totalContacts
            }
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact submissions'
        });
    }
};

// @desc    Get single contact by ID (admin only)
// @route   GET /api/admin/contacts/:id
// @access  Private/Admin
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        // Mark as read when admin views it
        if (!contact.isRead) {
            contact.isRead = true;
            contact.readAt = new Date();
            await contact.save();
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Get contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact submission'
        });
    }
};

// @desc    Mark contact as read/unread (admin only)
// @route   PUT /api/admin/contacts/:id/read
// @access  Private/Admin
export const toggleContactRead = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        contact.isRead = !contact.isRead;
        contact.readAt = contact.isRead ? new Date() : null;
        await contact.save();

        res.json({
            success: true,
            message: `Contact marked as ${contact.isRead ? 'read' : 'unread'}`,
            data: contact
        });
    } catch (error) {
        console.error('Toggle contact read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update contact status'
        });
    }
};

// @desc    Delete contact submission (admin only)
// @route   DELETE /api/admin/contacts/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        await Contact.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Contact submission deleted successfully'
        });
    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact submission'
        });
    }
};

// @desc    Get contact statistics (admin only)
// @route   GET /api/admin/contacts/stats
// @access  Private/Admin
export const getContactStats = async (req, res) => {
    try {
        const totalContacts = await Contact.countDocuments();
        const unreadContacts = await Contact.countDocuments({ isRead: false });
        const todayContacts = await Contact.countDocuments({
            submittedAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        });

        res.json({
            success: true,
            data: {
                total: totalContacts,
                unread: unreadContacts,
                today: todayContacts,
                read: totalContacts - unreadContacts
            }
        });
    } catch (error) {
        console.error('Get contact stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact statistics'
        });
    }
};