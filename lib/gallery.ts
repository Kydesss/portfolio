// Gallery of non-case-study work: graphic design, video, multimedia, and code.
// These are lighter than the UX case studies in content/work — each is a single
// card (image + short blurb + a link to the artifact), not a deep write-up.
//
// Generated once from the old Wix CMS export, now hand-maintained. To add an item,
// append to GALLERY_ITEMS below:
//   - category must be one of GALLERY_CATEGORIES.
//   - image: drop a file in public/gallery-img/ and reference "/gallery-img/<file>".
//   - href: only a real, working link. Omit if none exists. Never invent a URL.

export const GALLERY_CATEGORIES = [
  'Graphic Design',
  'Video',
  'Multimedia',
  'Code',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  slug: string;
  title: string;
  category: GalleryCategory;
  year: string;
  description: string;
  tags?: string[];
  image?: string;
  href?: string;
  linkLabel?: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    "slug": "ai-powered-job-application-automation",
    "title": "AI-Powered Job Application Automation",
    "category": "Code",
    "year": "2026",
    "description": "I built this project to speed up the most repetitive parts of applying to jobs: finding roles, judging fit, tailoring a resume, and tracking everything in one place.",
    "tags": [
      "Automation",
      "n8n",
      "Apify",
      "LinkedIn Job Scraping"
    ],
    "image": "/gallery-img/ai-powered-job-application-automation.jpg"
  },
  {
    "slug": "awe-digital-wellness-sales-sheet-indesign-project",
    "title": "AWE Digital Wellness Marketing PDF / Sales Sheet Design",
    "category": "Graphic Design",
    "year": "2026",
    "description": "This project started as an assignment for AWE Digital Wellness when I was applying for their Graphic Designer and Audio & Video Editing job position.",
    "tags": [
      "Graphic Design",
      "Marketing Collateral",
      "PDF Design",
      "Sales Enablement"
    ],
    "image": "/gallery-img/awe-digital-wellness-sales-sheet-indesign-project.jpg",
    "href": "https://drive.google.com/file/d/1gcfOIOU8kLVOx2GJ7-Zz7snsvzvMwgji/view?usp=sharing",
    "linkLabel": "View PDF"
  },
  {
    "slug": "evdrop-company-profile-video-project",
    "title": "EVDrop Company Profile Video",
    "category": "Video",
    "year": "2025",
    "description": "EVDrop Technology Inc. needed a company profile video to establish credibility in Canada’s EV and software space. I directed, shot, and edited a three-act documentary from five founder interviews.",
    "tags": [
      "Video Production",
      "Videography",
      "Video Editing",
      "Sound Design"
    ],
    "image": "/gallery-img/evdrop-company-profile-video-project.jpg",
    "href": "https://www.youtube.com/watch?v=xCuUuZXkc1c",
    "linkLabel": "Watch"
  },
  {
    "slug": "cospaces-educational-mathematics-environment",
    "title": "CoSpaces Educational Mathematics Environment",
    "category": "Multimedia",
    "year": "2024",
    "description": "For EDS285, I designed and built an interactive virtual learning environment in CoSpaces Edu to teach early elementary students foundational math skills through short, guided, multimedia activities.",
    "tags": [
      "CoSpaces",
      "Virtual Learning Environment (VLE) Development",
      "3D Content Creation",
      "Curriculum Development"
    ],
    "href": "https://edu.cospaces.io/KQS-CJB",
    "linkLabel": "Open"
  },
  {
    "slug": "galactic-conquest-board-game-project",
    "title": "'Galactic Conquest' Board Game",
    "category": "Multimedia",
    "year": "2024",
    "description": "For my CCT419: User Experience Design course final project, I developed \"Galactic Conquest,\" an innovative space-themed strategy board game focused on resource management, combat, and territory control.",
    "tags": [
      "Game Design",
      "Project Management",
      "User Experience",
      "Documentation"
    ]
  },
  {
    "slug": "evolution-of-digital-media-ebook-indesign-project",
    "title": "Evolution of Digital Media eBook InDesign",
    "category": "Graphic Design",
    "year": "2024",
    "description": "Created an interactive digital publication for CCT305: Design and Implementation of Multimedia Documents, using Adobe InDesign to explore the evolution of digital media and technology through responsive layouts, accessible typography, interactive navigation, hyperlinks, and embedded multimedia elements.",
    "tags": [
      "Adobe InDesign",
      "Rule of Thirds Composition",
      "Visual Effects",
      "Information Hierarchy"
    ],
    "image": "/gallery-img/evolution-of-digital-media-ebook-indesign-project.jpg",
    "href": "https://drive.google.com/file/d/1f2X9OpHjMKufbMM6inklLukCAoQ361ie/view?usp=sharing",
    "linkLabel": "View PDF"
  },
  {
    "slug": "university-cookbook-indesign-project",
    "title": "Cookbook For University Students InDesign",
    "category": "Graphic Design",
    "year": "2024",
    "description": "Created a cookbook photobook for CCT305: Design and Implementation of Multimedia Documents, using Adobe InDesign to apply Gestalt principles, structured typography, minimalist visual design, and full-page food photography across recipe layouts.",
    "tags": [
      "Adobe InDesign",
      "Rule of Thirds Composition",
      "Visual Effects",
      "Information Hierarchy"
    ],
    "image": "/gallery-img/university-cookbook-indesign-project.jpg",
    "href": "https://drive.google.com/file/d/1SOa8viD487AR-WRNY0By6NWPMc5Hh8As/view?usp=sharing",
    "linkLabel": "View PDF"
  },
  {
    "slug": "music-concert-publication-indesign-project",
    "title": "Music Concert 2D Publication InDesign",
    "category": "Graphic Design",
    "year": "2024",
    "description": "Created a print and digital concert poster for “The Dream Concert,” a high school music event completed for CCT305: Design and Implementation of Multimedia Documents.",
    "tags": [
      "Adobe InDesign",
      "Rule of Thirds Composition",
      "Visual Effects",
      "Information Hierarchy"
    ],
    "image": "/gallery-img/music-concert-publication-indesign-project.jpg"
  },
  {
    "slug": "ai-impact-on-art-and-gaming-research-project",
    "title": "AI's Impact on Art and Gaming Research",
    "category": "Code",
    "year": "2024",
    "description": "Led a 3-person research project for CCT416: Social Data Analytics, analyzing AI’s impact on the art and gaming industries through Reddit data and academic research.",
    "tags": [
      "Data Collection",
      "Data Analysis",
      "Natural Language Processing (NLP)",
      "Topic Modelling"
    ],
    "href": "https://github.com/Kydesss/cct416",
    "linkLabel": "GitHub"
  },
  {
    "slug": "dreams-video-production-project",
    "title": "'The Necessity of Dreams' Video",
    "category": "Video",
    "year": "2023",
    "description": "Created a 5-minute narrative drama titled “The Necessity of Dreams” for CCT353 Digital Media: Video at University of Toronto Mississauga, exploring ambition, mental health, and personal growth.",
    "tags": [
      "Video Production",
      "Cinematography",
      "Directing",
      "Scriptwriting"
    ],
    "image": "/gallery-img/dreams-video-production-project.jpg",
    "href": "https://www.youtube.com/watch?v=CLTgLDhdaxU",
    "linkLabel": "Watch"
  },
  {
    "slug": "wikipedia-page-redesign",
    "title": "Wikipedia Page Redesign Professional Website",
    "category": "Code",
    "year": "2023",
    "description": "Redesigned a Wikipedia article into a professional, responsive website for CCT360: Web Development and Design II, focusing on improved user experience, visual design, and content organization while preserving the original article’s content.",
    "tags": [
      "HTML",
      "CSS",
      "Content Strategy",
      "Information Architecture"
    ],
    "href": "https://github.com/Kydesss/cct360-project1",
    "linkLabel": "GitHub"
  },
  {
    "slug": "god-sees-all-piano-cover-youtube-thumbnail",
    "title": "'God Sees All' Piano Cover YouTube Video Thumbnail",
    "category": "Graphic Design",
    "year": "2023",
    "description": "Designed a custom YouTube thumbnail for Ryan Xiao’s piano cover video, collaborating closely with the client to match the channel’s branding, audience preferences, and video theme.",
    "tags": [
      "YouTube",
      "Social Media",
      "Graphic Design",
      "Content Creation"
    ],
    "image": "/gallery-img/god-sees-all-piano-cover-youtube-thumbnail.jpg",
    "href": "https://www.youtube.com/watch?v=vu9NOq4hulY",
    "linkLabel": "Watch"
  },
  {
    "slug": "mtg-goats-deck-youtube-thumbnail",
    "title": "Magic the Gathering: Goats Deck YouTube Video Thumbnail",
    "category": "Graphic Design",
    "year": "2023",
    "description": "Designed this YouTube thumbnail in collaboration with Ryan Xiao for his Magic: The Gathering Online video showcasing a Goats deck that went 5-0 in a league — a result that's as absurd as it sounds given how underpowered Goat tokens are as a win condition.",
    "tags": [
      "YouTube",
      "Social Media",
      "Graphic Design",
      "Content Creation"
    ],
    "image": "/gallery-img/mtg-goats-deck-youtube-thumbnail.jpg",
    "href": "https://www.youtube.com/watch?v=YK7hiOJMBQs",
    "linkLabel": "Watch"
  },
  {
    "slug": "password-manager-python-app",
    "title": "Password Manager App",
    "category": "Code",
    "year": "2023",
    "description": "Led a 4-person team to develop a secure Password Manager application for CCT211: Fundamentals of User Interface Programming at the University of Toronto.",
    "tags": [
      "Python",
      "Tkinter GUI Development",
      "User Authentication",
      "Cryptography (SHA-256 Hashing)"
    ],
    "href": "https://github.com/Kydesss/cct211project2",
    "linkLabel": "GitHub"
  },
  {
    "slug": "utmfsa-asian-airlines-instagram-post-design",
    "title": "UTM FSA Asian Airlines Event Instagram Post Design",
    "category": "Graphic Design",
    "year": "2022",
    "description": "Designed this Instagram post for the UTM Filipino Student Association's Asian Airlines event, a cultural night co-hosted with ISA UTM and UTM VSA at the University of Toronto Mississauga.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-asian-airlines-instagram-post-design.jpg"
  },
  {
    "slug": "utmfsa-executive-team-election-results-instagram-story-design",
    "title": "UTM FSA Executive Team Election Results Instagram Story Design",
    "category": "Graphic Design",
    "year": "2022",
    "description": "Designed this Instagram Story for the UTM Filipino Student Association to announce the results of the 2021–2022 executive team elections.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-executive-team-election-results-instagram-story-design.jpg"
  },
  {
    "slug": "utmfsa-kingmaker-documentary-instagram-post-design",
    "title": "UTM FSA Kingmaker Documentary Screening Event Instagram Post Design",
    "category": "Graphic Design",
    "year": "2022",
    "description": "Designed this Instagram post for the UTM Filipino Student Association to promote a screening of The Kingmaker, a documentary about Imelda Marcos, timed alongside the 2022 Philippine presidential elections.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-kingmaker-documentary-instagram-post-design.jpg"
  },
  {
    "slug": "utmfsa-coffee-house-instagram-post-design",
    "title": "UTM FSA Coffee House Event Instagram Post Design",
    "category": "Graphic Design",
    "year": "2022",
    "description": "Designed this Instagram post for the UTM Filipino Student Association's Coffee House event, a Valentine's Day virtual talent showcase held on Discord inviting students to perform, watch, and celebrate together.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-coffee-house-instagram-post-design.jpg"
  },
  {
    "slug": "utmfsa-office-hours-timetable-instagram-post-design-2022",
    "title": "UTM FSA Winter 2022 Office Hours Timetable Instagram Post Design",
    "category": "Graphic Design",
    "year": "2022",
    "description": "Designed this Instagram post to communicate the UTM Filipino Student Association's Winter 2022 office hours schedule to students in a clear and visually engaging format.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-office-hours-timetable-instagram-post-design-2022.jpg"
  },
  {
    "slug": "utmfsa-christmas-fundraiser-instagram-post-design",
    "title": "UTM FSA Christmas Fundraiser Instagram Post Design",
    "category": "Graphic Design",
    "year": "2021",
    "description": "Designed this Instagram post for the UTM Filipino Student Association's Christmas Fundraiser, a campaign raising donations for The Salvation Army through a raffle incentive.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-christmas-fundraiser-instagram-post-design.jpg"
  },
  {
    "slug": "utmfsa-office-hours-timetable-instagram-post-design-2021",
    "title": "UTM FSA Fall 2021 Office Hours Timetable Instagram Post Design",
    "category": "Graphic Design",
    "year": "2021",
    "description": "Designed this Instagram post to display the UTM Filipino Student Association's Fall 2021 office hours schedule — the first iteration of what became a recurring format across subsequent semesters.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-office-hours-timetable-instagram-post-design-2021.jpg"
  },
  {
    "slug": "utmfsa-exec-team-instagram-post-designs",
    "title": "UTM FSA 2021 Executive Team Introduction Instagram Post Design",
    "category": "Graphic Design",
    "year": "2021",
    "description": "Designed a series of Instagram posts to introduce each department of the UTM Filipino Student Association's 2021 executive team to the broader UTM community.",
    "tags": [
      "UTMFSA",
      "Instagram",
      "Graphic Design",
      "Adobe Photoshop"
    ],
    "image": "/gallery-img/utmfsa-exec-team-instagram-post-designs.jpg"
  },
  {
    "slug": "patco-cafe-logo-design",
    "title": "Patco Cafe Logo Design",
    "category": "Graphic Design",
    "year": "2021",
    "description": "Designed a logo and brand mark for Patco Cafe, a cold brew and bottled coffee brand, using Adobe Illustrator.",
    "tags": [
      "Graphic Design",
      "Logo Design",
      "Adobe Illustrator"
    ],
    "image": "/gallery-img/patco-cafe-logo-design.jpg"
  },
  {
    "slug": "spring-concert-showcase-poster-design",
    "title": "WAB Spring Concert Showcase Event Poster Design",
    "category": "Graphic Design",
    "year": "2021",
    "description": "Designed three poster variants for the Western Academy of Beijing's Spring Concert Showcase, a large-scale school performance event featuring groups including Concert Band, String Orchestra, HS Choir, APAC Strings, MYP/DP Dance, Junior Dance, and APAC Dance.",
    "tags": [
      "Western Academy of Beijing",
      "Graphic Design",
      "Poster Design",
      "Adobe Illustrator"
    ],
    "image": "/gallery-img/spring-concert-showcase-poster-design.jpg"
  },
  {
    "slug": "ltm-social-media-facebook-posts",
    "title": "Las Tres Maria's Social Media Facebook Posts",
    "category": "Graphic Design",
    "year": "2021",
    "description": "Designed a set of Facebook promotional posts for Las Tres Maria's in support of a brand partnership project with ELA Essentials, a Philippine-based essential oils company.",
    "tags": [
      "Las Tres Marias",
      "ELA Essentials",
      "Labworx",
      "Graphic Design"
    ],
    "image": "/gallery-img/ltm-social-media-facebook-posts.jpg"
  },
  {
    "slug": "ltm-food-jar-label-designs",
    "title": "Las Tres Maria's Food Jar Label Design",
    "category": "Graphic Design",
    "year": "2020",
    "description": "For the creation of the product jar labels for Las Tres Maria's, I utilized Adobe Photoshop and Illustrator to bring the designs to life. Each software played a crucial role in different aspects of the design process.",
    "tags": [
      "Las Tres Marias",
      "Graphic Design",
      "Brand Design",
      "Print Design"
    ],
    "image": "/gallery-img/ltm-food-jar-label-designs.jpg"
  },
  {
    "slug": "grin-to-win-sports-livestream-poster-design",
    "title": "WAB Grin to Win Sports Event Livestream Schedule Poster Design",
    "category": "Graphic Design",
    "year": "2020",
    "description": "Designed a livestream schedule poster for the Western Academy of Beijing's Grin to Win sports event, a school-wide athletics day broadcast online for students, parents, and community members unable to attend in person.",
    "tags": [
      "Western Academy of Beijing",
      "Graphic Design",
      "Poster Design",
      "Adobe Illustrator"
    ],
    "image": "/gallery-img/grin-to-win-sports-livestream-poster-design.jpg"
  },
  {
    "slug": "halloween-costume-contest-poster-design",
    "title": "WAB HS Student Council Halloween Costume Contest Poster Design",
    "category": "Graphic Design",
    "year": "2020",
    "description": "Designed this Halloween Costume Contest poster for the Western Academy of Beijing High School Student Council, promoting a costume competition with cash prizes held during Friday lunch on October 30th.",
    "tags": [
      "Western Academy of Beijing",
      "Student Council",
      "Graphic Design",
      "Poster Design"
    ],
    "image": "/gallery-img/halloween-costume-contest-poster-design.jpg"
  },
  {
    "slug": "perfectly-adequate-advertisement-poster",
    "title": "Perfectly Adequate Band Drummer Advertisement Poster",
    "category": "Graphic Design",
    "year": "2020",
    "description": "Designed a drummer recruitment poster for Perfectly Adequate, a student band at the Western Academy of Beijing looking to fill their open drummer position.",
    "tags": [
      "Perfectly Adequate",
      "Graphic Design",
      "Poster Design",
      "Adobe Illustrator"
    ],
    "image": "/gallery-img/perfectly-adequate-advertisement-poster.jpg"
  },
  {
    "slug": "minecraft-server-project",
    "title": "Minecraft Server",
    "category": "Code",
    "year": "2020",
    "description": "Built and administered a student-only Minecraft server community GeekForce Tech Club at the Western Academy of Beijing, leading a 7-person team to design custom worlds and event arenas.",
    "tags": [
      "Project Management",
      "Team Leadership",
      "Event Planning and Execution",
      "Server Administration"
    ]
  }
];

export function getGalleryItems(): GalleryItem[] {
  return GALLERY_ITEMS;
}
