export const TRAININGS_DATA = [
  { 
    id: 1, 
    title: "Java Full-Stack Development", 
    subject: "Java", 
    date: "03 Apr 2024", 
    duration: "4 Weeks", 
    level: "Beginner",
    description: "Master enterprise Java development. Learn Core Java, Spring Boot, Hibernate, and build a full-fledged REST API backend connected to a MySQL database.",
    instructor: "Dr. Arvind Kumar",
    fileUrl: "https://youtu.be/grEKMHGYfns",
    whatYouLearn: [
      "Object-Oriented Programming (OOP) in Java",
      "Building robust REST APIs using Spring Boot",
      "Database integration with Hibernate & JPA",
      "Security fundamentals with Spring Security"
    ],
    syllabus: [
      { week: 1, title: "Core Java & OOP Principles", lessons: 4 },
      { week: 2, title: "Spring Framework Fundamentals", lessons: 5 },
      { week: 3, title: "Building RESTful Web Services", lessons: 6 },
      { week: 4, title: "Database & Final Project", lessons: 3 }
    ]
  },
  { 
    id: 2, 
    title: "PHP & Server-Side Scripting", 
    subject: "PHP", 
    date: "10 May 2024", 
    duration: "3 Weeks", 
    level: "Beginner",
    description: "Learn the fundamentals of PHP, session management, and how to interact with MySQL databases to create dynamic, data-driven web pages.",
    instructor: "Prof. Rajesh Singh",
    fileUrl: "https://youtu.be/OK_JCtrrv-c",
    whatYouLearn: [
      "PHP Basics and Syntax",
      "Handling Forms and User Input",
      "Sessions and Cookies Management",
      "Connecting to MySQL with PDO"
    ],
    syllabus: [
      { week: 1, title: "Introduction to PHP", lessons: 3 },
      { week: 2, title: "Forms and Data Handling", lessons: 4 },
      { week: 3, title: "Database Operations", lessons: 5 }
    ]
  },
  { 
    id: 3, 
    title: "SIS Architecture with PHP", 
    subject: "PHP", 
    date: "17 May 2024", 
    duration: "6 Weeks", 
    level: "Advanced",
    description: "A comprehensive project-based module focusing on building a Student Information System (SIS). Covers advanced PHP concepts, scalable architecture, and security practices.",
    instructor: "Prof. Rajesh Singh",
    fileUrl: "https://youtu.be/OK_JCtrrv-c",
    whatYouLearn: [
      "Advanced MVC Architecture in PHP",
      "Role-Based Access Control (RBAC)",
      "Generating PDF & Excel Reports",
      "Securing against SQLi & XSS"
    ],
    syllabus: [
      { week: 1, title: "System Design & Database Schema", lessons: 2 },
      { week: 2, title: "Implementing Core Modules", lessons: 4 },
      { week: 3, title: "Authentication & Authorization", lessons: 3 },
      { week: 4, title: "Reporting & Exporting", lessons: 3 },
      { week: 5, title: "Security Protocols", lessons: 2 },
      { week: 6, title: "Deployment & Maintenance", lessons: 2 }
    ]
  },
  { 
    id: 4, 
    title: "ASP.NET Core Fundamentals", 
    subject: "ASP", 
    date: "25 May 2024", 
    duration: "5 Weeks", 
    level: "Intermediate",
    description: "Dive into building cross-platform, high-performance web applications using ASP.NET Core and C#.",
    instructor: "Mrs. Sneha Patel",
    fileUrl: "https://youtu.be/C5cnZ-gZy2I",
    whatYouLearn: [
      "C# Advanced Concepts",
      "ASP.NET Core MVC Pattern",
      "Routing and Middleware Pipeline",
      "Dependency Injection in .NET"
    ],
    syllabus: [
      { week: 1, title: "C# Refresher", lessons: 3 },
      { week: 2, title: ".NET Core Ecosystem", lessons: 4 },
      { week: 3, title: "Building APIs", lessons: 4 },
      { week: 4, title: "Middleware & Auth", lessons: 5 },
      { week: 5, title: "Performance Testing", lessons: 2 }
    ]
  },
  { 
    id: 5, 
    title: "React JS Frontend Mastery", 
    subject: "React", 
    date: "02 Jun 2024", 
    duration: "6 Weeks", 
    level: "Intermediate",
    description: "Master modern React development. Build highly interactive, scalable Single Page Applications using Hooks, Context API, and state management.",
    instructor: "Mr. Dev Sharma",
    fileUrl: "https://youtu.be/bMknfKXIFA8",
    whatYouLearn: [
      "JSX and Component Architecture",
      "React Hooks (useState, useEffect, custom hooks)",
      "Complex State Management with Redux Toolkit",
      "API Integration & Performance Optimization"
    ],
    syllabus: [
      { week: 1, title: "React Basics & JSX", lessons: 4 },
      { week: 2, title: "Props & State", lessons: 5 },
      { week: 3, title: "Component Lifecycle & Hooks", lessons: 6 },
      { week: 4, title: "Routing with React Router", lessons: 3 },
      { week: 5, title: "Redux State Management", lessons: 5 },
      { week: 6, title: "Deployment on Vercel/Netlify", lessons: 2 }
    ]
  },
  { 
    id: 6, 
    title: "Node.js Backend & REST APIs", 
    subject: "NodeJS", 
    date: "08 Jun 2024", 
    duration: "5 Weeks", 
    level: "Intermediate",
    description: "Learn to build fast, scalable network applications. Master asynchronous programming, Express.js framework, and MongoDB integration.",
    instructor: "Ms. Priya Desai",
    fileUrl: "https://youtu.be/fBNz5xF-Kx4",
    whatYouLearn: [
      "Event-Driven Architecture in Node.js",
      "Building RESTful APIs with Express",
      "Data Modeling with Mongoose & MongoDB",
      "Authentication with JWT"
    ],
    syllabus: [
      { week: 1, title: "Node Core & NPM", lessons: 3 },
      { week: 2, title: "Express.js Fundamentals", lessons: 4 },
      { week: 3, title: "MongoDB Integration", lessons: 5 },
      { week: 4, title: "User Auth & Security", lessons: 4 },
      { week: 5, title: "Error Handling & Logging", lessons: 3 }
    ]
  },
  { 
    id: 7, 
    title: "React Native Mobile App", 
    subject: "React", 
    date: "15 Jun 2024", 
    duration: "8 Weeks", 
    level: "Advanced",
    description: "Learn to build truly native iOS and Android applications with one codebase using React Native and Expo.",
    instructor: "Mr. Dev Sharma",
    fileUrl: "https://youtu.be/0-S5a0eXPoc",
    whatYouLearn: [
      "React Native Components and APIs",
      "State Management with Redux Toolkit",
      "Navigation using React Navigation",
      "Publishing to App Stores"
    ],
    syllabus: [
      { week: 1, title: "Environment Setup & Expo", lessons: 2 },
      { week: 2, title: "Core Components & Flexbox", lessons: 5 },
      { week: 3, title: "React Navigation", lessons: 4 },
      { week: 4, title: "State Management", lessons: 5 },
      { week: 5, title: "Handling Hardware Interfaces", lessons: 3 },
      { week: 6, title: "Animations", lessons: 3 },
      { week: 7, title: "Offline Storage", lessons: 4 },
      { week: 8, title: "Build & Release", lessons: 3 }
    ]
  },
  { 
    id: 8, 
    title: "Python Data Science Bootcamp", 
    subject: "Python", 
    date: "20 Jun 2024", 
    duration: "10 Weeks", 
    level: "Beginner",
    description: "Master Python programming and explore Data Science libraries including Pandas, NumPy, Matplotlib, and scikit-learn for machine learning.",
    instructor: "Dr. Ananya Reddy",
    fileUrl: "https://youtu.be/LHBE6Q9XlzI",
    whatYouLearn: [
      "Python Scripting and Logic",
      "Data Manipulation with Pandas",
      "Data Visualization Strategies",
      "Introductory Machine Learning Models"
    ],
    syllabus: [
      { week: 1, title: "Python Basics", lessons: 5 },
      { week: 2, title: "Data Structures", lessons: 4 },
      { week: 3, title: "NumPy Fundamentals", lessons: 3 },
      { week: 4, title: "Pandas for Data Analysis", lessons: 6 },
      { week: 5, title: "Data Visualization", lessons: 4 },
      { week: 6, title: "Statistical Modeling", lessons: 3 },
      { week: 7, title: "Machine Learning Concepts", lessons: 2 },
      { week: 8, title: "Supervised Learning Algorithms", lessons: 5 },
      { week: 9, title: "Unsupervised Learning", lessons: 4 },
      { week: 10, title: "Final Capstone Project", lessons: 2 }
    ]
  },
  { 
    id: 9, 
    title: "UI/UX Design Principles", 
    subject: "Design", 
    date: "01 Jul 2024", 
    duration: "4 Weeks", 
    level: "Beginner",
    description: "Learn the core principles of user interface and user experience design. Master Figma to create stunning wireframes and interactive prototypes.",
    instructor: "Ms. Neha Gupta",
    fileUrl: "https://youtu.be/c9Wg6Cb_YlU",
    whatYouLearn: [
      "Color Theory and Typography",
      "Wireframing and Prototyping in Figma",
      "Usability Testing methodologies",
      "Creating Design Systems"
    ],
    syllabus: [
      { week: 1, title: "Design Fundamentals", lessons: 5 },
      { week: 2, title: "Introduction to Figma", lessons: 6 },
      { week: 3, title: "Prototyping & Animation", lessons: 4 },
      { week: 4, title: "User Testing & Handoff", lessons: 3 }
    ]
  },
  { 
    id: 10, 
    title: "Advanced Java & Microservices", 
    subject: "Java", 
    date: "10 Jul 2024", 
    duration: "6 Weeks", 
    level: "Advanced",
    description: "Take your Java skills to the next level. Learn to architect and deploy resilient, distributed microservice applications using Spring Cloud and Docker.",
    instructor: "Dr. Arvind Kumar",
    fileUrl: "https://youtu.be/grEKMHGYfns",
    whatYouLearn: [
      "Microservice Architecture Patterns",
      "Service Discovery and API Gateways",
      "Containerization using Docker",
      "Centralized Configuration & Logging"
    ],
    syllabus: [
      { week: 1, title: "Monoliths vs Microservices", lessons: 3 },
      { week: 2, title: "Spring Cloud Netflix Eureka", lessons: 4 },
      { week: 3, title: "API Gateway & Circuit Breakers", lessons: 5 },
      { week: 4, title: "Docker Containerization", lessons: 4 },
      { week: 5, title: "Distributed Tracing", lessons: 3 },
      { week: 6, title: "Deployment Strategies", lessons: 2 }
    ]
  },
  { 
    id: 11, 
    title: "Full-Stack Python with Django", 
    subject: "Python", 
    date: "15 Jul 2024", 
    duration: "7 Weeks", 
    level: "Intermediate",
    description: "Build robust web applications rapidly using the Django web framework. Learn ORM, Class-Based Views, and REST Framework.",
    instructor: "Dr. Ananya Reddy",
    fileUrl: "https://youtu.be/LHBE6Q9XlzI",
    whatYouLearn: [
      "Django MTV Architecture",
      "Database Migrations and Models API",
      "Authentication and User Management",
      "Building APIs with Django REST Framework"
    ],
    syllabus: [
      { week: 1, title: "Django Setup & Routing", lessons: 4 },
      { week: 2, title: "Models & ORM", lessons: 5 },
      { week: 3, title: "Templates & Forms", lessons: 4 },
      { week: 4, title: "User Authentication", lessons: 3 },
      { week: 5, title: "Django REST Framework Intro", lessons: 5 },
      { week: 6, title: "Serializers & ViewSets", lessons: 4 },
      { week: 7, title: "Production Deployment", lessons: 2 }
    ]
  },
  { 
    id: 12, 
    title: "Modern UI Engineering", 
    subject: "Design", 
    date: "22 Jul 2024", 
    duration: "5 Weeks", 
    level: "Advanced",
    description: "Bridge the gap between design and code. Learn advanced CSS, animations, accessibility, and how to build pixel-perfect react components.",
    instructor: "Ms. Neha Gupta",
    fileUrl: "https://youtu.be/c9Wg6Cb_YlU",
    whatYouLearn: [
      "Advanced CSS Grid and Flexbox",
      "CSS Animations and Framer Motion",
      "Web Accessibility (a11y) Standards",
      "Responsive Design Strategies"
    ],
    syllabus: [
      { week: 1, title: "Layout Architectures", lessons: 4 },
      { week: 2, title: "Complex CSS Selectors & Variables", lessons: 3 },
      { week: 3, title: "Micro-interactions & Animations", lessons: 5 },
      { week: 4, title: "Accessibility Auditing", lessons: 4 },
      { week: 5, title: "Performance Optimization", lessons: 2 }
    ]
  }
];
