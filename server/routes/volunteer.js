const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// Register a new volunteer
router.post('/register', async (req, res) => {
    try {
        const volunteer = new Volunteer(req.body);
        await volunteer.save();

        // Generate AI summary
        const summary = generateVolunteerSummary(volunteer);

        res.status(201).json({
            success: true,
            message: 'Volunteer registered successfully!',
            data: volunteer,
            summary: summary
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        res.status(400).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// Get all volunteers
router.get('/all', async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ registeredAt: -1 });
        res.status(200).json({
            success: true,
            count: volunteers.length,
            data: volunteers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch volunteers',
            error: error.message
        });
    }
});

// AI-powered summary generator
function generateVolunteerSummary(volunteer) {
    const skillsList = volunteer.skills.split(',').map(s => s.trim()).join(', ');
    const availabilityText = volunteer.availability.charAt(0).toUpperCase() + volunteer.availability.slice(1);

    let summary = `📋 Registration Summary:\n\n`;
    summary += `👤 ${volunteer.fullName} (Age: ${volunteer.age}) has registered as a volunteer.\n\n`;
    summary += `📧 Contact: ${volunteer.email} | ${volunteer.phone}\n\n`;
    summary += `💼 Skills: ${skillsList}\n\n`;
    summary += `📅 Availability: ${availabilityText}\n\n`;

    if (volunteer.experience) {
        summary += `🎓 Experience: ${volunteer.experience.substring(0, 100)}${volunteer.experience.length > 100 ? '...' : ''}\n\n`;
    }

    summary += `💭 Motivation: ${volunteer.motivation.substring(0, 150)}${volunteer.motivation.length > 150 ? '...' : ''}\n\n`;
    summary += `✅ Status: Active and ready to help!`;

    return summary;
}

module.exports = router;
