import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PatientSupportForm = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        contactEmail: '',
        contactPhone: '',
        age: '',
        medicalCondition: '',
        supportType: 'medical',
        urgency: 'medium',
        description: '',
        address: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [summary, setSummary] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        setSummary('');

        try {
            const response = await axios.post(`${API_URL}/api/patient-support/submit`, formData);

            if (response.data.success) {
                setMessage({ type: 'success', text: response.data.message });
                setSummary(response.data.summary);
                setFormData({
                    patientName: '',
                    contactEmail: '',
                    contactPhone: '',
                    age: '',
                    medicalCondition: '',
                    supportType: 'medical',
                    urgency: 'medium',
                    description: '',
                    address: ''
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Submission failed. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Patient Support Request
                </h2>
                <p className="text-gray-600">
                    Request assistance for medical support, counseling, or other patient care needs.
                </p>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg border-l-4 ${message.type === 'success'
                    ? 'bg-gray-50 border-black text-gray-900'
                    : 'bg-red-50 border-red-500 text-red-900'
                    }`}>
                    {message.text}
                </div>
            )}

            {summary && (
                <div className="mb-6 p-6 bg-gradient-to-br from-gray-900 to-black text-white rounded-lg border border-gray-800">
                    <div className="flex items-start gap-3 mb-3">
                        <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2">Auto-Generated Summary</h3>
                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-200 leading-relaxed">
                                {summary}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="patientName" className="label">
                            Patient Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Enter patient's full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="age" className="label">
                            Age <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="1"
                            className="input-field"
                            placeholder="Patient's age"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contactEmail" className="label">
                            Contact Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="contact@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="contactPhone" className="label">
                            Contact Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="+91-XXXXXXXXXX"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="medicalCondition" className="label">
                        Medical Condition <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="medicalCondition"
                        name="medicalCondition"
                        value={formData.medicalCondition}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Brief description of medical condition"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="supportType" className="label">
                            Type of Support Needed <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="supportType"
                            name="supportType"
                            value={formData.supportType}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="medical">Medical Assistance</option>
                            <option value="financial">Financial Aid</option>
                            <option value="counseling">Counseling</option>
                            <option value="transportation">Transportation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="urgency" className="label">
                            Urgency Level <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="label">
                        Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="input-field resize-none"
                        placeholder="Please provide detailed information about the support needed"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="label">
                        Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="input-field resize-none"
                        placeholder="Complete address for contact/visit"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Submit Support Request
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default PatientSupportForm;
