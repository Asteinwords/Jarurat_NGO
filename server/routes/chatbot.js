const express = require('express');
const router = express.Router();

// AI-powered FAQ chatbot responses
const faqDatabase = {
    'what is jarurat': {
        answer: 'Jarurat is an NGO dedicated to providing medical support, counseling, and assistance to patients in need. We connect volunteers with those who require help.',
        keywords: ['jarurat', 'ngo', 'about', 'who are you']
    },
    'how to volunteer': {
        answer: 'You can register as a volunteer by filling out our volunteer registration form. We need your basic information, skills, and availability. Once registered, our team will contact you with opportunities.',
        keywords: ['volunteer', 'join', 'help', 'register', 'signup']
    },
    'patient support': {
        answer: 'We offer various types of patient support including medical assistance, financial aid, counseling, and transportation. Submit a patient support request form with details about your needs.',
        keywords: ['patient', 'support', 'help needed', 'medical', 'assistance']
    },
    'contact': {
        answer: 'You can reach us at support@jarurat.org or call us at +91-XXXX-XXXXXX. Our team is available Monday to Friday, 9 AM to 6 PM.',
        keywords: ['contact', 'email', 'phone', 'reach', 'call']
    },
    'services': {
        answer: 'We provide: 1) Medical Support - Healthcare assistance and medication, 2) Financial Aid - Support for treatment costs, 3) Counseling - Mental health support, 4) Transportation - Help reaching medical facilities, 5) Volunteer Network - Community support system.',
        keywords: ['services', 'what do you do', 'offerings', 'help types']
    },
    'eligibility': {
        answer: 'Anyone in need of medical or patient support can apply. For volunteers, you must be 18+ years old. We welcome people from all backgrounds who want to make a difference.',
        keywords: ['eligibility', 'qualify', 'requirements', 'who can']
    },
    'urgent help': {
        answer: 'For urgent/critical cases, please mark your support request as "Critical" urgency. Our emergency response team will prioritize your case and contact you within 2-4 hours.',
        keywords: ['urgent', 'emergency', 'critical', 'immediate', 'asap']
    },
    'donation': {
        answer: 'We accept donations to support our cause. You can donate through our website or contact us directly. All donations are tax-deductible and go directly to patient care.',
        keywords: ['donate', 'donation', 'contribute', 'fund', 'money']
    }
};

// AI chatbot endpoint with intelligent matching
router.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Please provide a question'
            });
        }

        const userQuestion = question.toLowerCase().trim();

        // AI-powered keyword matching with scoring
        let bestMatch = null;
        let highestScore = 0;

        for (const [key, faq] of Object.entries(faqDatabase)) {
            let score = 0;

            // Check if question contains any keywords
            for (const keyword of faq.keywords) {
                if (userQuestion.includes(keyword)) {
                    score += keyword.split(' ').length; // Multi-word keywords get higher scores
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = faq;
            }
        }

        // If no match found, provide default response
        if (highestScore === 0 || !bestMatch) {
            return res.status(200).json({
                success: true,
                answer: "I'm here to help! I can answer questions about our NGO, volunteer opportunities, patient support services, eligibility, contact information, and more. Could you please rephrase your question or ask about one of these topics?",
                confidence: 'low',
                suggestions: [
                    'What is Jarurat?',
                    'How can I volunteer?',
                    'What patient support do you offer?',
                    'How do I contact you?'
                ]
            });
        }

        // Return matched answer with confidence score
        res.status(200).json({
            success: true,
            answer: bestMatch.answer,
            confidence: highestScore > 2 ? 'high' : 'medium',
            relatedTopics: Object.keys(faqDatabase).filter(k => k !== bestMatch).slice(0, 3)
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Chatbot error',
            error: error.message
        });
    }
});

// Get all available FAQ topics
router.get('/topics', (req, res) => {
    const topics = Object.keys(faqDatabase).map(key => ({
        topic: key,
        keywords: faqDatabase[key].keywords
    }));

    res.status(200).json({
        success: true,
        topics
    });
});

module.exports = router;
