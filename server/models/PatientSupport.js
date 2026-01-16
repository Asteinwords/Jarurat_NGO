const mongoose = require('mongoose');

const patientSupportSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true
    },
    contactEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    medicalCondition: {
        type: String,
        required: true
    },
    supportType: {
        type: String,
        required: true,
        enum: ['medical', 'financial', 'counseling', 'transportation', 'other']
    },
    urgency: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high', 'critical']
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'in-progress', 'completed']
    }
});

module.exports = mongoose.model('PatientSupport', patientSupportSchema);
