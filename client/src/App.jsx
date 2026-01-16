import React, { useState } from 'react';
import VolunteerForm from './components/VolunteerForm';
import PatientSupportForm from './components/PatientSupportForm';
import Chatbot from './components/Chatbot';

function App() {
    const [activeTab, setActiveTab] = useState('volunteer');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            Jarurat NGO
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Making a Difference, One Life at a Time
                        </p>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 py-4">
                        <button
                            onClick={() => setActiveTab('volunteer')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'volunteer'
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Volunteer Registration
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('patient')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'patient'
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Patient Support
                            </span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="space-y-8">
                    {activeTab === 'volunteer' && <VolunteerForm />}
                    {activeTab === 'patient' && <PatientSupportForm />}

                    {/* AI Features Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-xl p-6 md:p-8 shadow-lg">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            AI-Powered Features
                        </h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Our platform includes an intelligent chatbot that can answer your questions about our services,
                            volunteer opportunities, and patient support programs. Click the chat icon in the bottom-right
                            corner to get instant answers!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>24/7 AI-powered FAQ assistance</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Intelligent keyword matching</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Auto-response system</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Data summarization</span>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="card">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            About Jarurat NGO
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Jarurat is dedicated to providing comprehensive support to patients in need. We connect
                            compassionate volunteers with individuals requiring medical assistance, counseling,
                            transportation, and financial aid.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="border-l-4 border-black pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                                <p className="text-gray-600">
                                    To ensure no one faces medical challenges alone by building a strong community support network.
                                </p>
                            </div>
                            <div className="border-l-4 border-black pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                                <p className="text-gray-600">
                                    A world where quality healthcare and support are accessible to everyone, regardless of their circumstances.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2024 Jarurat NGO. Making a difference in people's lives.
                        </p>
                    </div>
                </div>
            </footer>

            <Chatbot />
        </div>
    );
}

export default App;
