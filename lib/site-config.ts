// Edit this file to update your personal info site-wide.
// No need to touch any other files for these changes.

export const siteConfig = {
    name: "Joaquin Pacia",
    role: "UI / UX Designer · Multimedia Producer",
    location: "Mississauga, ON",
    status: "Open to junior UI/UX roles",
    currently:
        "Recent graduate, building case studies and looking for opportunities",

    // Hero headline — keep it short. Use *asterisks* to italicize parts.
    headline:
        "Crafting imaginative digital experiences where *creativity meets technology.*",

    // About section — supports paragraphs. Use \n\n between paragraphs.
    about: `Hi, I'm Joaquin — a UofT graduate (High Distinction) and UI/UX designer who believes fun is equal to success. \n\n I love turning messy problems into clean, intuitive interfaces, with a background that blends Figma-driven UI/UX work, multimedia production, and a healthy obsession for tech (the kind that has me self-hosting services and tinkering with Linux on the weekends). \n\n I bring both a creator's eye and a problem-solver's mindset to every project — whether that's a 53-test-case usability study or a Lottie animation handoff to engineering.`,

    // CV
    experience: [
        {
            year: "May 2025 - Present",
            role: "Independent UI/UX Designer & Front-End Developer",
            org: "Self-Employed · Mississauga, ON",
        },
        {
            year: "Nov 2024 - Jan 2025",
            role: "Website & UI/UX Designer",
            org: "EVDrop Technology Inc. · Toronto, ON",
        },
        {
            year: "Oct 2024 — May 2025",
            role: "Content Manager ",
            org: "University of Toronto Mississauga eSports Club · Mississauga, ON",
        },
        {
            year: "Sep 2024 — Apr 2025",
            role: "Video Editor",
            org: "Institute of Islamic Studies - University of Toronto · Toronto, ON",
        },
    ],

    education: [
        {
            year: "Mar 2026 - May 2026",
            role: "Foundations of DevOps II: Ecosystem, Architecture and Continuous Software Delivery",
            org: "University of Toronto School of Continuing Studies · Toronto, ON",
        },
        {
            year: "Sep 2025 - Dec 2025",
            role: "Foundations of DevOps I: Principles and Practices",
            org: "University of Toronto School of Continuing Studies · Toronto, ON",
        },
        {
            year: "Sep 2021 - Jun 2025",
            role: "Honours Bachelor of Arts (HBA), Communication, Culture, Information & Technology | Technology, Coding & Society",
            org: "University of Toronto Mississauga · Mississauga, ON",
        },
    ],

    skills: [
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "Prototyping & Wireframing",
        "Front-End Development",
        "Graphic Design",
        "Design Thinking & User-Centered Design",
        "Human-Computer Interaction (HCI)",
        "Stakeholder Management & Cross-Functional Collaboration",
    ],

    tools: [
        // Design Tools
        { name: "Figma", icon: "logos:figma" },
        { name: "Illustrator", icon: "logos:adobe-illustrator" },
        { name: "Photoshop", icon: "logos:adobe-photoshop" },
        { name: "InDesign", icon: "logos:adobe-indesign" },
        { name: "After Effects", icon: "logos:adobe-after-effects" },
        { name: "Premiere Pro", icon: "logos:adobe-premiere" },
        // { name: "Descript", icon: "logos:descript-icon" },

        // Productivity
        { name: "Notion", icon: "logos:notion-icon" },
        { name: "Obsidian", icon: "skill-icons:obsidian-dark" },
        { name: "Warp", icon: "material-icon-theme:warp" },

        // Frontend Development
        { name: "HTML", icon: "skill-icons:html" },
        { name: "CSS", icon: "skill-icons:css" },
        { name: "JavaScript", icon: "logos:javascript" },
        { name: "TypeScript", icon: "devicon:typescript" },
        { name: "React", icon: "logos:react" },
        { name: "Next.js", icon: "logos:nextjs-icon" },
        { name: "Vite", icon: "devicon:vitejs" },
        { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
        { name: "Bootstrap", icon: "logos:bootstrap" },
        { name: "VS Code", icon: "logos:visual-studio-code" },

        // Backend & DevOps
        { name: "Node.js", icon: "logos:nodejs" },
        { name: "Python", icon: "logos:python" },
        { name: "Ubuntu Linux", icon: "logos:ubuntu" },
        { name: "Docker", icon: "logos:docker-icon" },
        { name: "Supabase", icon: "logos:supabase-icon" },
        { name: "Vercel", icon: "skill-icons:vercel-light" },

        // Version Control & AI
        { name: "Git", icon: "logos:git-icon" },
        { name: "GitHub", icon: "logos:github-icon" },
        { name: "Claude", icon: "logos:claude-icon" },
    ],

    recognition: [
        {
            year: "2025",
            role: "Graduated with High Distinction",
            org: "University of Toronto Mississauga",
        },
        {
            year: "2025",
            role: "2025 Winter Dean's List Scholar",
            org: "University of Toronto Mississauga",
        },
    ],

    // Contact
    email: "jpop0393@gmail.com",
    linkedin: "https://www.linkedin.com/in/joaquin-pacia-2551b3259/",
    github: "https://github.com/Kydesss",
};

export type SiteConfig = typeof siteConfig;
