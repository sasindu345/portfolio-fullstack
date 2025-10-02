// controllers/uploadController.js
export const uploadSingleImage = async (req, res) => {
    try {
        console.log('Upload request received');
        console.log('File:', req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const fileUrl = `/api/uploads/projects/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                path: fileUrl,  // Changed from 'url' to 'path'
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            }
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Upload failed',
            error: error.message
        });
    }
};

export const deleteUploadedFile = async (req, res) => {
    try {
        const { filename } = req.params;
        res.json({
            success: true,
            message: `File ${filename} deleted`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};