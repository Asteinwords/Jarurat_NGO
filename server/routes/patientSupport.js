const express = require('express');
const router = express.Router();
const PatientSupport = require('../models/PatientSupport');

// Submit patient support request
router.post('/submit', async (req, res) => {
    try {
        const supportRequest = new PatientSupport(req.body);
        await supportRequest.save();

        // Generate AI summary
        const summary = generateSupportSummary(supportRequest);

        res.status(201).json({
            success: true,
            message: 'Support request submitted successfully! Our team will contact you soon.',
            data: supportRequest,
            summary: summary
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to submit support request',
            error: error.message
        });
    }
});

// Get all support requests
router.get('/all', async (req, res) => {
    try {
        const requests = await PatientSupport.find().sort({ submittedAt: -1 });
        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch support requests',
            error: error.message
        });
    }
});

// Update support request status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const request = await PatientSupport.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Support request not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Status updated successfully',
            data: request
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update status',
            error: error.message
        });
    }
});

// AI-powered summary generator
function generateSupportSummary(request) {
    const urgencyEmoji = {
        low: '🟢',
        medium: '🟡',
        high: '🟠',
        critical: '🔴'
    };

    const supportTypeText = {
        medical: 'Medical Assistance',
        financial: 'Financial Aid',
        counseling: 'Counseling Services',
        transportation: 'Transportation Support',
        other: 'Other Support'
    };

    let summary = `📋 Support Request Summary:\n\n`;
    summary += `${urgencyEmoji[request.urgency]} Urgency: ${request.urgency.toUpperCase()}\n\n`;
    summary += `👤 Patient: ${request.patientName} (Age: ${request.age})\n\n`;
    summary += `📧 Contact: ${request.contactEmail} | ${request.contactPhone}\n\n`;
    summary += `🏥 Condition: ${request.medicalCondition}\n\n`;
    summary += `💊 Support Type: ${supportTypeText[request.supportType]}\n\n`;
    summary += `📍 Location: ${request.address.substring(0, 80)}${request.address.length > 80 ? '...' : ''}\n\n`;
    summary += `📝 Details: ${request.description.substring(0, 150)}${request.description.length > 150 ? '...' : ''}\n\n`;
    summary += `⏰ Submitted: ${new Date(request.submittedAt).toLocaleString()}\n\n`;
    summary += `📊 Status: ${request.status.toUpperCase()}`;

    return summary;
}

module.exports = router;
