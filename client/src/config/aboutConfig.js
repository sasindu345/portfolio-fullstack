// src/config/aboutConfig.js

// ============================================
// EDIT THIS SECTION TO UPDATE YOUR ABOUT PAGE
// ============================================

export const aboutData = {
    // Your personal story (2-3 paragraphs)
    story: {
        title: "Hello! I'm an aspiring software engineer",
        paragraphs: [
            "I'm a student at the University of Moratuwa – Faculty of IT, exploring the world of software engineering, AI/ML, and full-stack development.",
            "I enjoy working on innovative projects, learning modern tools, and collaborating with teams to create impactful solutions.",
            "I believe in constant improvement, problem-solving, and taking initiative in both academic and project environments."
        ]
    },

    // Personal details
    details: [
        { label: "Name", value: "Sasindu Jayamadu" },
        { label: "Location", value: "Colombo, Sri Lanka" },
        { label: "Email", value: "jayamadusasindu5@gmail.com" },
        { label: "Phone", value: "076 734 9531" },
        { label: "Current Focus", value: "University of Moratuwa – Faculty of IT" }
    ],

    // CV file link (same as Hero section)
    cvFile: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID",

    // About image
    image: {
        src: "Images/home/myimg.jpeg",
        alt: "Sasindu Jayamadu - About Me"
    },

    // Skills with proficiency levels (0-100)
    skills: [
        { name: "JavaScript", level: 95 },
        { name: "React", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "CSS/SCSS", level: 88 }
    ],

    // Statistics/Achievements
    stats: [
        { number: "10+", label: "Academic Projects" },
        { number: "3", label: "Hackathon Finals" },
        { number: "4", label: "Community Workshops Led" },
        { number: "6", label: "Research Mini-Projects" }
    ],

    // Education Section
    education: [
        {
            level: "G.C.E. O/L",
            grades: "A6 / B2 / C1",
            description: "Ordinary Level Examination"
        },
        {
            level: "G.C.E. A/L",
            grades: "A B B",
            stream: "Physical Science Stream",
            description: "Advanced Level Examination"
        }
    ],

    // Achievements Section
    // You can add images by including an 'image' property with src path
    // Example: image: { src: "Images/achievements/certificate.jpg", alt: "Certificate" }
    achievements: [
        {
            title: "Top 5 Finalist – Two Machine Learning Competitions",
            description: "Recognized for innovative solutions and practical ML implementation.",
            icon: "🏆",
            // image: { src: "Images/achievements/ml-competition.jpg", alt: "ML Competition Certificate" } // Optional: uncomment and add image path
        }
    ]
};

// ============================================
// TO UPDATE YOUR ABOUT PAGE:
// 1. Change the story paragraphs above
// 2. Update your personal details
// 3. Set your CV file link (Google Drive recommended)
// 4. Update your skills and proficiency levels
// 5. Change your statistics/achievements
// 6. Update education section with your qualifications
// 7. Update achievements section with your accomplishments
//    - To add an image: uncomment the 'image' property and set the path
//    - Example: image: { src: "Images/achievements/cert.jpg", alt: "Certificate" }
// 8. Save the file - changes will reflect automatically
// ============================================