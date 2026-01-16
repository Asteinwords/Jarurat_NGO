import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const VolunteerForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        age: '',
        skills: '',
        availability: 'flexible',
        experience: '',
        motivation: ''
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
            const response = await axios.post(`${API_URL}/api/volunteer/register`, formData);

            if (response.data.success) {
                setMessage({ type: 'success', text: response.data.message });
                setSummary(response.data.summary);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    age: '',
                    skills: '',
                    availability: 'flexible',
                    experience: '',
                    motivation: ''
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Registration failed. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Volunteer Registration
                </h2>
                <p className="text-gray-600">
                    Join our community of volunteers and make a difference in people's lives.
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
                        <label htmlFor="fullName" className="label">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="label">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="label">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="+91-XXXXXXXXXX"
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
                            min="18"
                            className="input-field"
                            placeholder="18+"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="skills" className="label">
                        Skills & Expertise <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="e.g., Medical, Counseling, Transportation, Teaching"
                    />
                </div>

                <div>
                    <label htmlFor="availability" className="label">
                        Availability <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        className="input-field"
                    >
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="flexible">Flexible</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="experience" className="label">
                        Previous Volunteer Experience
                    </label>
                    <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        rows="3"
                        className="input-field resize-none"
                        placeholder="Tell us about your previous volunteer work (optional)"
                    />
                </div>

                <div>
                    <label htmlFor="motivation" className="label">
                        Why do you want to volunteer? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="input-field resize-none"
                        placeholder="Share your motivation for joining us"
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
                            Register as Volunteer
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default VolunteerForm;
