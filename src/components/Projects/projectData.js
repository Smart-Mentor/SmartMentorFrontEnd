// projectData.js
export const projectsDatabase = {
  // Frontend Projects
  "fe-101": {
    id: "fe-101",
    title: "Personal Portfolio Website",
    shortDescription: "Build a responsive portfolio to showcase your work",
    description: "Create a modern, responsive portfolio website that showcases your skills, projects, and experience. This project will teach you essential frontend concepts including responsive design, CSS animations, and DOM manipulation.",
    tech: ["HTML5", "CSS3", "JavaScript", "Git"],
    toolsIcon: "🎨",
    features: [
      "Responsive design for all devices",
      "Dark/light mode toggle with localStorage",
      "Interactive animations and transitions",
      "Contact form with validation",
      "Projects gallery with dynamic filtering",
      "Smooth scrolling navigation"
    ],
    duration: "2-3 weeks",
    level: "Beginner",
    mainTech: "HTML/CSS/JS",
    difficulty: "Easy",
    prerequisites: ["Basic HTML", "Basic CSS", "Basic JavaScript"],
    learningOutcomes: [
      "Semantic HTML5 structure and accessibility",
      "CSS Grid and Flexbox layouts",
      "CSS variables for theming",
      "JavaScript event handling",
      "Local storage for theme persistence"
    ],
    steps: [
      "Plan your portfolio structure and design",
      "Create HTML skeleton with semantic tags",
      "Style with CSS using mobile-first approach",
      "Implement dark/light mode toggle",
      "Add JavaScript for interactivity",
      "Build projects gallery",
      "Create contact form with validation",
      "Deploy to Netlify or Vercel"
    ],
    resources: [
      { name: "Build a Portfolio Website – Kevin Powell", url: "https://www.youtube.com/watch?v=_xkSvufmjEs" },
      { name: "HTML & CSS Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=mU6anWqZJcc" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=_xkSvufmjEs",
    liveDemo: "https://your-portfolio.netlify.app",
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Use semantic HTML for better SEO", "Optimize images", "Test on mobile devices"],
    commonMistakes: ["Not making the site mobile-responsive", "Too many animations"],
    estimatedHours: 40,
    totalTasks: 12
  },
  "fe-102": {
    id: "fe-102",
    title: "Weather Dashboard",
    shortDescription: "Fetch and display real-time weather data",
    description: "Build a weather application that fetches real-time weather data from an API. Learn to work with external APIs and handle asynchronous operations.",
    tech: ["React", "CSS3", "OpenWeatherMap API", "Axios"],
    toolsIcon: "🌤️",
    features: [
      "Current weather conditions",
      "5-day forecast",
      "Search by city",
      "Geolocation support",
      "Dynamic weather backgrounds"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "React",
    difficulty: "Easy",
    prerequisites: ["JavaScript ES6", "Basic React", "Basic CSS"],
    learningOutcomes: [
      "React hooks (useState, useEffect)",
      "API integration with axios",
      "Async/await patterns",
      "Loading and error states",
      "Component composition"
    ],
    steps: [
      "Set up React app with Vite",
      "Get OpenWeatherMap API key",
      "Create components",
      "Implement API service",
      "Add loading skeletons",
      "Style with CSS",
      "Add geolocation feature",
      "Deploy to Vercel"
    ],
    resources: [
      { name: "React Weather App – Traversy Media", url: "https://www.youtube.com/watch?v=GuA0_Z1llYU" },
      { name: "OpenWeatherMap API Docs", url: "https://openweathermap.org/api" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=GuA0_Z1llYU",
    liveDemo: "https://weather-dashboard.netlify.app",
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Use environment variables for API keys", "Add loading skeletons", "Cache responses"],
    commonMistakes: ["Hardcoding API keys", "Not handling errors"],
    estimatedHours: 50,
    totalTasks: 14
  },
  "fe-103": {
    id: "fe-103",
    title: "Interactive Quiz App",
    shortDescription: "Build a dynamic quiz application with scoring",
    description: "Create an engaging quiz application with timers, scoring, and high scores leaderboard.",
    tech: ["React", "Tailwind CSS", "LocalStorage"],
    toolsIcon: "📝",
    features: [
      "Multiple choice questions",
      "Timer for each question",
      "Score tracking",
      "Leaderboard",
      "Quiz categories"
    ],
    duration: "2-3 weeks",
    level: "Beginner",
    mainTech: "React",
    difficulty: "Easy",
    prerequisites: ["JavaScript ES6", "Basic React"],
    learningOutcomes: [
      "State management with useState",
      "Timer implementation",
      "Array manipulation",
      "Conditional rendering",
      "Local storage"
    ],
    steps: [
      "Create quiz data structure",
      "Build question component",
      "Implement timer",
      "Add scoring system",
      "Save high scores"
    ],
    resources: [
      { name: "React Quiz App – Web Dev Simplified", url: "https://www.youtube.com/watch?v=LcGHiFnBh3Y" },
      { name: "React useState Hook – Official Docs", url: "https://react.dev/reference/react/useState" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=LcGHiFnBh3Y",
    liveDemo: "https://quiz-app-demo.netlify.app",
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Keep questions engaging", "Add sound effects", "Create multiple categories"],
    commonMistakes: ["Timer not resetting", "Score calculation errors"],
    estimatedHours: 35,
    totalTasks: 10
  },
  "fe-201": {
    id: "fe-201",
    title: "E-commerce Store Frontend",
    shortDescription: "Build a complete e-commerce shopping experience",
    description: "Create a full-featured e-commerce store with product catalog, shopping cart, and checkout flow using Next.js.",
    tech: ["Next.js", "Redux Toolkit", "Stripe", "Tailwind CSS"],
    toolsIcon: "🛒",
    features: [
      "Product catalog with categories",
      "Shopping cart management",
      "Secure checkout flow",
      "User authentication",
      "Order history"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "Next.js",
    difficulty: "Moderate",
    prerequisites: ["React", "JavaScript ES6", "Basic Next.js"],
    learningOutcomes: [
      "Next.js SSR and SSG",
      "Stripe payment integration",
      "Authentication with NextAuth.js",
      "State management with Redux Toolkit",
      "Cart persistence"
    ],
    steps: [
      "Set up Next.js with TypeScript",
      "Configure Redux store",
      "Build product pages",
      "Implement shopping cart",
      "Add authentication",
      "Integrate Stripe"
    ],
    resources: [
      { name: "Next.js E-commerce Tutorial – freeCodeCamp", url: "https://www.youtube.com/watch?v=wm5gMKuwSYk" },
      { name: "Next.js Official Docs", url: "https://nextjs.org/docs" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
    liveDemo: "https://ecommerce-store-demo.vercel.app",
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Implement proper loading states", "Add error boundaries", "Optimize images"],
    commonMistakes: ["Cart not persisting", "Payment integration issues"],
    estimatedHours: 80,
    totalTasks: 18
  },
  "fe-202": {
    id: "fe-202",
    title: "Task Management Kanban Board",
    shortDescription: "Create a Trello-style drag-and-drop application",
    description: "Build a powerful task management tool with drag-and-drop functionality and multiple boards.",
    tech: ["React", "Redux Toolkit", "DnD Kit", "Tailwind CSS"],
    toolsIcon: "📋",
    features: [
      "Drag-and-drop between columns",
      "Multiple boards",
      "Task labels and due dates",
      "Activity log",
      "Collaborative features"
    ],
    duration: "5-6 weeks",
    level: "Intermediate",
    mainTech: "React + Drag-and-Drop",
    difficulty: "Moderate",
    prerequisites: ["React", "Redux", "JavaScript ES6"],
    learningOutcomes: [
      "Drag-and-drop implementations",
      "Complex state management",
      "Optimistic UI updates",
      "Custom hooks",
      "Performance optimization"
    ],
    steps: [
      "Setup DnD Kit",
      "Create board components",
      "Implement drag-and-drop",
      "Add task editing",
      "Implement data persistence"
    ],
    resources: [
      { name: "Drag and Drop Kanban – Fireship", url: "https://www.youtube.com/watch?v=RG-3R6Pu_Ik" },
      { name: "dnd kit Official Docs", url: "https://docs.dndkit.com" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=RG-3R6Pu_Ik",
    liveDemo: "https://kanban-board-demo.netlify.app",
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Add keyboard shortcuts", "Implement undo/redo", "Add due date reminders"],
    commonMistakes: ["Drag-and-drop performance", "State sync problems"],
    estimatedHours: 70,
    totalTasks: 16
  },
  "fe-203": {
    id: "fe-203",
    title: "Real-time Chat Application",
    shortDescription: "Build a chat app with WebSockets",
    description: "Create a real-time messaging application with rooms, typing indicators, and user presence.",
    tech: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
    toolsIcon: "💬",
    features: [
      "Real-time messaging",
      "User presence",
      "Typing indicators",
      "Chat rooms",
      "Message history"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "React + Socket.io",
    difficulty: "Challenging",
    prerequisites: ["React", "Node.js", "WebSockets basics"],
    learningOutcomes: [
      "WebSocket programming",
      "Real-time event handling",
      "JWT authentication",
      "Message persistence",
      "Online/offline status"
    ],
    steps: [
      "Setup backend with Socket.io",
      "Create authentication",
      "Build React frontend",
      "Implement messaging",
      "Add typing indicators"
    ],
    resources: [
      { name: "Socket.io Chat App – Traversy Media", url: "https://www.youtube.com/watch?v=jD7FnbI76Hg" },
      { name: "Socket.io Official Docs", url: "https://socket.io/docs/v4/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=jD7FnbI76Hg",
    liveDemo: null,
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Handle reconnection", "Add message reactions", "Implement file sharing"],
    commonMistakes: ["Connection drops", "Message ordering issues"],
    estimatedHours: 75,
    totalTasks: 15
  },
  "fe-301": {
    id: "fe-301",
    title: "Video Conferencing Platform",
    shortDescription: "Build a Zoom-like video conferencing app",
    description: "Create a complete video conferencing solution with screen sharing and recording.",
    tech: ["React", "WebRTC", "Socket.io", "Node.js", "MongoDB"],
    toolsIcon: "🎥",
    features: [
      "Video and audio calls",
      "Screen sharing",
      "Chat during calls",
      "Participant management",
      "Recording capability"
    ],
    duration: "10-12 weeks",
    level: "Advanced",
    mainTech: "WebRTC + React",
    difficulty: "Expert",
    prerequisites: ["React", "WebRTC", "Node.js", "Socket.io"],
    learningOutcomes: [
      "WebRTC peer connections",
      "MediaDevices API",
      "STUN/TURN servers",
      "Real-time video processing",
      "Media recording API"
    ],
    steps: [
      "Setup WebRTC connection",
      "Implement getUserMedia",
      "Create signaling server",
      "Add screen sharing",
      "Implement recording"
    ],
    resources: [
      { name: "WebRTC Video Chat – Fireship", url: "https://www.youtube.com/watch?v=WmR9IMUD_CY" },
      { name: "WebRTC MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=WmR9IMUD_CY",
    liveDemo: null,
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Implement bandwidth management", "Add noise cancellation", "Optimize for mobile"],
    commonMistakes: ["ICE candidate handling", "Media stream issues"],
    estimatedHours: 120,
    totalTasks: 22
  },
  "fe-302": {
    id: "fe-302",
    title: "Online Code Editor & Compiler",
    shortDescription: "Build a browser-based code editor with execution",
    description: "Create a powerful online code editor that supports multiple languages and real-time compilation.",
    tech: ["React", "Monaco Editor", "Docker", "Node.js", "Redis"],
    toolsIcon: "💻",
    features: [
      "Syntax highlighting",
      "Code compilation",
      "Multi-language support",
      "Code sharing",
      "Real-time collaboration"
    ],
    duration: "10-12 weeks",
    level: "Advanced",
    mainTech: "React + Docker",
    difficulty: "Expert",
    prerequisites: ["React", "Docker", "Node.js", "WebSockets"],
    learningOutcomes: [
      "Monaco editor integration",
      "Docker containerization",
      "Sandboxing",
      "Load balancing",
      "WebSocket collaboration"
    ],
    steps: [
      "Setup Monaco Editor",
      "Create execution API",
      "Implement language support",
      "Add code sharing",
      "Implement collaboration"
    ],
    resources: [
      { name: "Build a Code Editor – Traversy Media", url: "https://www.youtube.com/watch?v=THgBePRV13o" },
      { name: "Monaco Editor Docs", url: "https://microsoft.github.io/monaco-editor/docs.html" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=THgBePRV13o",
    liveDemo: "https://code-editor-demo.onrender.com",
    careerPath: "frontend",
    careerColor: "#3b82f6",
    tips: ["Add code completion", "Implement syntax checking", "Add themes"],
    commonMistakes: ["Security issues", "Performance problems"],
    estimatedHours: 130,
    totalTasks: 24
  },

  // Backend Projects
  "be-101": {
    id: "be-101",
    title: "Blog Platform API",
    shortDescription: "Build RESTful API for a blogging platform",
    description: "Create a RESTful API for a blog platform with user authentication, post management, and comments.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Bcrypt"],
    toolsIcon: "📝",
    features: [
      "User registration and login",
      "CRUD for blog posts",
      "Comment system",
      "Like/unlike posts",
      "User profiles"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "Node.js/Express",
    difficulty: "Moderate",
    prerequisites: ["JavaScript", "Basic Node.js", "MongoDB basics"],
    learningOutcomes: [
      "Express.js routing",
      "MongoDB with Mongoose",
      "JWT authentication",
      "Password hashing",
      "API documentation"
    ],
    steps: [
      "Setup Express project",
      "Connect MongoDB",
      "Create models",
      "Implement JWT auth",
      "Create CRUD endpoints"
    ],
    resources: [
      { name: "REST API with Node.js & Express – Traversy Media", url: "https://www.youtube.com/watch?v=l8WPWK9mS5M" },
      { name: "Node.js & MongoDB Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=4yqu8YF29cU" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=l8WPWK9mS5M",
    liveDemo: null,
    careerPath: "backend",
    careerColor: "#10b981",
    tips: ["Use environment variables", "Implement rate limiting", "Add input validation"],
    commonMistakes: ["Not validating input", "Exposing sensitive data"],
    estimatedHours: 45,
    totalTasks: 15
  },
  "be-102": {
    id: "be-102",
    title: "Task Manager API",
    shortDescription: "Build API for task management application",
    description: "Create a robust REST API for task management with user authentication and search functionality.",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT", "Joi"],
    toolsIcon: "✅",
    features: [
      "User registration/login",
      "Task CRUD operations",
      "Task categories",
      "Search and filter",
      "Task sharing"
    ],
    duration: "2-3 weeks",
    level: "Beginner",
    mainTech: "Node.js + PostgreSQL",
    difficulty: "Moderate",
    prerequisites: ["JavaScript", "Basic SQL", "Node.js basics"],
    learningOutcomes: [
      "PostgreSQL database design",
      "Express middleware",
      "Input validation",
      "Query optimization",
      "Error handling"
    ],
    steps: [
      "Design database schema",
      "Setup Express server",
      "Implement user routes",
      "Create task endpoints",
      "Add search and filter"
    ],
    resources: [
      { name: "Node.js PostgreSQL REST API – freeCodeCamp", url: "https://www.youtube.com/watch?v=ldYcgPKEZC8" },
      { name: "PostgreSQL Tutorial for Beginners", url: "https://www.postgresqltutorial.com" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=ldYcgPKEZC8",
    liveDemo: null,
    careerPath: "backend",
    careerColor: "#10b981",
    tips: ["Use connection pooling", "Implement migrations", "Add request logging"],
    commonMistakes: ["SQL injection", "Not using transactions"],
    estimatedHours: 35,
    totalTasks: 12
  },
  "be-201": {
    id: "be-201",
    title: "URL Shortener Service",
    shortDescription: "Create a scalable URL shortening service",
    description: "Build a high-performance URL shortener with analytics and custom aliases.",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "Bull"],
    toolsIcon: "🔗",
    features: [
      "URL shortening",
      "Custom aliases",
      "Click tracking",
      "Analytics dashboard",
      "QR code generation"
    ],
    duration: "4-5 weeks",
    level: "Intermediate",
    mainTech: "Node.js + Redis",
    difficulty: "Challenging",
    prerequisites: ["Node.js", "Redis basics", "PostgreSQL"],
    learningOutcomes: [
      "Caching strategies",
      "Base62 encoding",
      "Analytics tracking",
      "Rate limiting",
      "Background jobs"
    ],
    steps: [
      "Design database schema",
      "Implement shortening",
      "Add Redis caching",
      "Create click tracking",
      "Implement rate limiting"
    ],
    resources: [
      { name: "URL Shortener with Node.js & Redis – Traversy Media", url: "https://www.youtube.com/watch?v=SLpUKAGnm-g" },
      { name: "Redis Crash Course – Fireship", url: "https://www.youtube.com/watch?v=G1rOthIU-uo" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=SLpUKAGnm-g",
    liveDemo: null,
    careerPath: "backend",
    careerColor: "#10b981",
    tips: ["Handle collisions", "Add expiration", "Create API rate limits"],
    commonMistakes: ["Duplicate URLs", "Cache invalidation"],
    estimatedHours: 60,
    totalTasks: 14
  },
  "be-202": {
    id: "be-202",
    title: "Real-time Notification Service",
    shortDescription: "Build scalable notification system",
    description: "Create a distributed notification system supporting email, SMS, and push notifications.",
    tech: ["Node.js", "RabbitMQ", "Socket.io", "MongoDB", "Redis"],
    toolsIcon: "🔔",
    features: [
      "Email notifications",
      "SMS notifications",
      "Push notifications",
      "Notification preferences",
      "Real-time delivery"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "Node.js + Message Queue",
    difficulty: "Challenging",
    prerequisites: ["Node.js", "Message queues", "WebSockets"],
    learningOutcomes: [
      "Message queuing",
      "Microservices patterns",
      "WebSocket connections",
      "Email/SMS integration",
      "Retry mechanisms"
    ],
    steps: [
      "Setup RabbitMQ",
      "Create notification API",
      "Add email provider",
      "Add SMS provider",
      "Create WebSocket server"
    ],
    resources: [
      { name: "Message Queues with RabbitMQ – freeCodeCamp", url: "https://www.youtube.com/watch?v=Cie5v59mrTg" },
      { name: "RabbitMQ Official Tutorials", url: "https://www.rabbitmq.com/tutorials" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=Cie5v59mrTg",
    liveDemo: null,
    careerPath: "backend",
    careerColor: "#10b981",
    tips: ["Add dead letter queues", "Create templates", "Add delivery receipts"],
    commonMistakes: ["Message loss", "Duplicate notifications"],
    estimatedHours: 85,
    totalTasks: 18
  },
  "be-301": {
    id: "be-301",
    title: "E-commerce Microservices",
    shortDescription: "Build scalable microservices architecture",
    description: "Design and implement a complete microservices architecture for an e-commerce platform.",
    tech: ["Node.js", "Docker", "Kubernetes", "RabbitMQ", "MongoDB", "Redis"],
    toolsIcon: "🏗️",
    features: [
      "Service discovery",
      "API gateway",
      "Distributed tracing",
      "Circuit breakers",
      "Event-driven architecture"
    ],
    duration: "12-14 weeks",
    level: "Advanced",
    mainTech: "Node.js Microservices",
    difficulty: "Expert",
    prerequisites: ["Node.js", "Docker", "Kubernetes basics"],
    learningOutcomes: [
      "Microservices patterns",
      "Docker/Kubernetes",
      "API gateway design",
      "SAGA pattern",
      "Service mesh"
    ],
    steps: [
      "Design microservices",
      "Create product service",
      "Create order service",
      "Create user service",
      "Implement API gateway"
    ],
    resources: [
      { name: "Microservices with Node.js – freeCodeCamp", url: "https://www.youtube.com/watch?v=8qN7rMFsd3g" },
      { name: "Kubernetes Full Course – TechWorld with Nana", url: "https://www.youtube.com/watch?v=X48VuDVv0do" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=8qN7rMFsd3g",
    liveDemo: null,
    careerPath: "backend",
    careerColor: "#10b981",
    tips: ["Add distributed tracing", "Implement health checks", "Create centralized logging"],
    commonMistakes: ["Service coupling", "Transaction issues"],
    estimatedHours: 150,
    totalTasks: 28
  },
  "be-302": {
    id: "be-302",
    title: "Distributed Job Scheduler",
    shortDescription: "Build a distributed cron job system",
    description: "Create a robust distributed job scheduling system with retry mechanisms and monitoring.",
    tech: ["Node.js", "Redis", "BullMQ", "PostgreSQL", "Docker", "Kubernetes"],
    toolsIcon: "⏰",
    features: [
      "Distributed scheduling",
      "Retry mechanisms",
      "Job prioritization",
      "Monitoring dashboard",
      "Webhook support"
    ],
    duration: "10-12 weeks",
    level: "Advanced",
    mainTech: "Node.js + BullMQ",
    difficulty: "Expert",
    prerequisites: ["Node.js", "Redis", "BullMQ", "Docker"],
    learningOutcomes: [
      "Distributed queues",
      "Cron scheduling",
      "Redis queuing",
      "Job failure handling",
      "Monitoring"
    ],
    steps: [
      "Setup BullMQ",
      "Implement scheduling",
      "Add retry mechanisms",
      "Create monitoring",
      "Implement webhooks"
    ],
    resources: [
      { name: "BullMQ Job Queues with Node.js – Codevolution", url: null },
      { name: "BullMQ Official Docs", url: "https://docs.bullmq.io" }
    ],
    videoTutorial: null,
    liveDemo: null,
    careerPath: "backend",
    careerColor: "#10b981",
    tips: ["Add job deduplication", "Create job dependencies", "Set SLAs"],
    commonMistakes: ["Memory leaks", "Job starvation"],
    estimatedHours: 110,
    totalTasks: 20
  },

  // Fullstack Projects
  "fs-101": {
    id: "fs-101",
    title: "Task Manager App",
    shortDescription: "Complete MERN task management application",
    description: "Build a full-stack task management app with authentication and dashboard statistics.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind"],
    toolsIcon: "✅",
    features: [
      "User authentication",
      "Task CRUD operations",
      "Task categories",
      "Search and filter",
      "Dashboard stats"
    ],
    duration: "4-5 weeks",
    level: "Beginner",
    mainTech: "MERN Stack",
    difficulty: "Moderate",
    prerequisites: ["JavaScript", "React basics", "Node.js basics"],
    learningOutcomes: [
      "MERN stack integration",
      "JWT authentication flow",
      "REST API consumption",
      "State management",
      "Deployment"
    ],
    steps: [
      "Setup backend API",
      "Create MongoDB models",
      "Implement authentication",
      "Build React frontend",
      "Connect frontend to API"
    ],
    resources: [
      { name: "MERN Stack Task Manager – Traversy Media", url: "https://www.youtube.com/watch?v=NqzdVN2tyvQ" },
      { name: "Full Stack MERN Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=7CqJlxBYj-M" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=NqzdVN2tyvQ",
    liveDemo: null,
    careerPath: "fullstack",
    careerColor: "#f59e0b",
    tips: ["Add optimistic updates", "Implement real-time sync", "Create reusable components"],
    commonMistakes: ["API error handling", "State complexity"],
    estimatedHours: 55,
    totalTasks: 16
  },
  "fs-201": {
    id: "fs-201",
    title: "E-commerce Platform",
    shortDescription: "Complete online store with payment processing",
    description: "Build a full-featured e-commerce platform with product catalog, shopping cart, and payment processing.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "Tailwind"],
    toolsIcon: "🛒",
    features: [
      "Product catalog",
      "Shopping cart",
      "Payment processing",
      "Order management",
      "Admin dashboard"
    ],
    duration: "8-10 weeks",
    level: "Intermediate",
    mainTech: "Next.js + Node.js",
    difficulty: "Challenging",
    prerequisites: ["React", "Node.js", "Next.js basics", "SQL"],
    learningOutcomes: [
      "Next.js SSR/SSG",
      "Stripe integration",
      "Session management",
      "Inventory management",
      "Email notifications"
    ],
    steps: [
      "Setup Next.js frontend",
      "Create backend API",
      "Design database schema",
      "Implement product catalog",
      "Add shopping cart"
    ],
    resources: [
      { name: "Next.js Full Stack E-commerce – freeCodeCamp", url: "https://www.youtube.com/watch?v=wm5gMKuwSYk" },
      { name: "Stripe Payments with Next.js – Lee Robinson", url: "https://www.youtube.com/watch?v=G6D4HP7ETUM" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
    liveDemo: "https://ecommerce-platform.vercel.app",
    careerPath: "fullstack",
    careerColor: "#f59e0b",
    tips: ["Add inventory management", "Create order tracking", "Build admin analytics"],
    commonMistakes: ["Cart sync issues", "Payment security"],
    estimatedHours: 100,
    totalTasks: 22
  },
  "fs-202": {
    id: "fs-202",
    title: "Social Media Dashboard",
    shortDescription: "Analytics dashboard with real-time updates",
    description: "Build a comprehensive social media analytics dashboard with real-time data visualization.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "Socket.io"],
    toolsIcon: "📊",
    features: [
      "User authentication",
      "Real-time updates",
      "Interactive charts",
      "Report generation",
      "Data export"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "PERN + WebSockets",
    difficulty: "Challenging",
    prerequisites: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    learningOutcomes: [
      "Complex queries",
      "Real-time WebSockets",
      "Data aggregation",
      "Chart.js integration",
      "CSV/PDF export"
    ],
    steps: [
      "Design database schema",
      "Build REST API",
      "Implement WebSockets",
      "Create React dashboard",
      "Add charts"
    ],
    resources: [
      { name: "Real-time Dashboard with Chart.js – Traversy Media", url: "https://www.youtube.com/watch?v=sE08f4iuOhA" },
      { name: "Chart.js Official Docs", url: "https://www.chartjs.org/docs/latest/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=sE08f4iuOhA",
    liveDemo: null,
    careerPath: "fullstack",
    careerColor: "#f59e0b",
    tips: ["Add data caching", "Create export functionality", "Add custom date ranges"],
    commonMistakes: ["Real-time performance", "Data accuracy"],
    estimatedHours: 80,
    totalTasks: 18
  },
  "fs-301": {
    id: "fs-301",
    title: "Real-time Collaboration Platform",
    shortDescription: "Google Docs-like collaborative editing",
    description: "Build a real-time collaborative document editing platform with cursor tracking and version history.",
    tech: ["React", "Node.js", "WebSockets", "MongoDB", "Redis", "Docker"],
    toolsIcon: "🤝",
    features: [
      "Real-time editing",
      "Cursor tracking",
      "Version history",
      "Comments",
      "Document sharing"
    ],
    duration: "12-14 weeks",
    level: "Advanced",
    mainTech: "MERN + WebSockets",
    difficulty: "Expert",
    prerequisites: ["React", "Node.js", "WebSockets", "CRDT/OT concepts"],
    learningOutcomes: [
      "Operational Transformation",
      "CRDT structures",
      "WebSocket management",
      "Conflict resolution",
      "Versioning"
    ],
    steps: [
      "Implement OT algorithm",
      "Create WebSocket server",
      "Build editor component",
      "Add cursor tracking",
      "Implement version history"
    ],
    resources: [
      { name: "Real-time Collaboration with Yjs – Kevin Jahns", url: "https://www.youtube.com/watch?v=gq2bbDmSokU" },
      { name: "Operational Transformation Explained – Medium", url: "https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=gq2bbDmSokU",
    liveDemo: "https://collaboration-demo.onrender.com",
    careerPath: "fullstack",
    careerColor: "#f59e0b",
    tips: ["Add offline support", "Include rich text formatting", "Create user presence"],
    commonMistakes: ["Conflict resolution bugs", "Performance issues"],
    estimatedHours: 140,
    totalTasks: 26
  },

  // Mobile Projects
  "mb-101": {
    id: "mb-101",
    title: "Fitness Tracker App",
    shortDescription: "Workout tracking mobile application",
    description: "Build a mobile fitness tracking app with workout logging and progress tracking.",
    tech: ["React Native", "Expo", "SQLite", "AsyncStorage", "React Navigation"],
    toolsIcon: "💪",
    features: [
      "Workout logging",
      "Exercise library",
      "Progress charts",
      "Offline support",
      "Workout history"
    ],
    duration: "4-6 weeks",
    level: "Beginner",
    mainTech: "React Native",
    difficulty: "Moderate",
    prerequisites: ["JavaScript", "Basic React", "React Native basics"],
    learningOutcomes: [
      "React Native components",
      "Navigation",
      "Local storage with SQLite",
      "Chart visualization",
      "Push notifications"
    ],
    steps: [
      "Setup Expo project",
      "Create navigation",
      "Build workout logging",
      "Implement exercise library",
      "Add progress charts"
    ],
    resources: [
      { name: "React Native Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=hg1_yiBvSBo" },
      { name: "React Native Official Docs", url: "https://reactnative.dev/docs/getting-started" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=hg1_yiBvSBo",
    liveDemo: null,
    commonMistakes: ["Performance issues", "Navigation problems"],
    estimatedHours: 50,
    totalTasks: 14
  },
  "mb-102": {
    id: "mb-102",
    title: "News Reader App",
    shortDescription: "Mobile news aggregator application",
    description: "Build a mobile news app that fetches and displays news from various sources.",
    tech: ["React Native", "NewsAPI", "AsyncStorage", "React Navigation"],
    toolsIcon: "📰",
    features: [
      "News categories",
      "Search articles",
      "Save favorites",
      "Offline reading",
      "Share articles"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "React Native",
    difficulty: "Easy",
    prerequisites: ["JavaScript", "Basic React Native"],
    learningOutcomes: [
      "API integration",
      "List rendering",
      "Navigation patterns",
      "Local storage",
      "Social sharing"
    ],
    steps: [
      "Get NewsAPI key",
      "Setup API calls",
      "Create category screens",
      "Implement search",
      "Add favorites"
    ],
    resources: [
      { name: "React Native News App – JavaScript Mastery", url: "https://www.youtube.com/watch?v=Ef-labCLgFA" },
      { name: "React Navigation Docs", url: "https://reactnavigation.org/docs/getting-started" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=Ef-labCLgFA",
    liveDemo: null,
    careerPath: "mobile",
    careerColor: "#ef4444",
    tips: ["Add pull-to-refresh", "Implement infinite scroll", "Cache articles"],
    commonMistakes: ["API rate limits", "Poor image loading"],
    estimatedHours: 35,
    totalTasks: 12
  },
  "mb-201": {
    id: "mb-201",
    title: "E-commerce Mobile App",
    shortDescription: "Complete mobile shopping experience",
    description: "Build a full-featured mobile e-commerce app with product catalog, cart, and payments.",
    tech: ["React Native", "Redux", "Node.js", "Stripe", "Firebase"],
    toolsIcon: "🛍️",
    features: [
      "Product catalog",
      "Shopping cart",
      "User authentication",
      "Payment processing",
      "Order tracking"
    ],
    duration: "8-10 weeks",
    level: "Intermediate",
    mainTech: "React Native + Redux",
    difficulty: "Challenging",
    prerequisites: ["React Native", "Redux", "Node.js basics"],
    learningOutcomes: [
      "Complex state management",
      "Payment gateway",
      "Authentication flows",
      "Push notifications",
      "Offline sync"
    ],
    steps: [
      "Setup Redux store",
      "Implement product listing",
      "Add shopping cart",
      "Integrate Stripe",
      "Add authentication"
    ],
    resources: [
      { name: "React Native E-commerce – JavaScript Mastery", url: "https://www.youtube.com/watch?v=m1f5qkFDZnk" },
      { name: "Redux Toolkit with React Native – freeCodeCamp", url: "https://www.youtube.com/watch?v=9zySeP5vH9c" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=m1f5qkFDZnk",
    liveDemo: null,
    careerPath: "mobile",
    careerColor: "#ef4444",
    tips: ["Add biometric auth", "Include wishlist", "Create order tracking"],
    commonMistakes: ["Payment security", "Cart sync issues"],
    estimatedHours: 90,
    totalTasks: 20
  },
  "mb-301": {
    id: "mb-301",
    title: "Food Delivery App",
    shortDescription: "Complete food delivery with real-time tracking",
    description: "Build a complete food delivery app with restaurant discovery and real-time tracking.",
    tech: ["React Native", "Node.js", "Firebase", "Google Maps", "Stripe"],
    toolsIcon: "🍔",
    features: [
      "Restaurant discovery",
      "Real-time tracking",
      "Payment processing",
      "Push notifications",
      "Driver tracking"
    ],
    duration: "12-14 weeks",
    level: "Advanced",
    mainTech: "React Native + Firebase",
    difficulty: "Expert",
    prerequisites: ["React Native", "Firebase", "Google Maps API"],
    learningOutcomes: [
      "Google Maps API",
      "Real-time location",
      "Push notifications",
      "Payment integration",
      "In-app messaging"
    ],
    steps: [
      "Setup Maps API",
      "Implement restaurant search",
      "Create order system",
      "Add real-time tracking",
      "Integrate payments"
    ],
    resources: [
      { name: "React Native Food Delivery App – JavaScript Mastery", url: "https://www.youtube.com/watch?v=LKrX390fJMw" },
      { name: "Google Maps React Native Docs", url: "https://github.com/react-native-maps/react-native-maps" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=LKrX390fJMw",
    liveDemo: null,
    careerPath: "mobile",
    careerColor: "#ef4444",
    tips: ["Optimize battery", "Add offline mode", "Calculate ETA"],
    commonMistakes: ["Location performance", "Order state management"],
    estimatedHours: 130,
    totalTasks: 24
  },

  // DevOps Projects
  "do-101": {
    id: "do-101",
    title: "CI/CD Pipeline with GitHub Actions",
    shortDescription: "Automated deployment pipeline for web app",
    description: "Build a complete CI/CD pipeline using GitHub Actions to automatically test and deploy your application.",
    tech: ["GitHub Actions", "Docker", "AWS EC2", "Nginx", "Node.js"],
    toolsIcon: "🔄",
    features: [
      "Automated testing",
      "Docker containerization",
      "AWS deployment",
      "Health checks",
      "Rollback capability"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "GitHub Actions + Docker",
    difficulty: "Moderate",
    prerequisites: ["Git basics", "Docker basics", "Node.js"],
    learningOutcomes: [
      "CI/CD pipeline design",
      "Docker containerization",
      "GitHub Actions workflows",
      "AWS EC2 and ECR",
      "Infrastructure as Code"
    ],
    steps: [
      "Containerize app with Docker",
      "Setup GitHub Actions workflow",
      "Configure automated testing",
      "Push to AWS ECR",
      "Deploy to EC2"
    ],
    resources: [
      { name: "GitHub Actions CI/CD Full Tutorial – TechWorld with Nana", url: "https://www.youtube.com/watch?v=R8_veQiYBjI" },
      { name: "GitHub Actions Official Docs", url: "https://docs.github.com/en/actions" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=R8_veQiYBjI",
    liveDemo: null,
    careerPath: "devops",
    careerColor: "#06b6d4",
    tips: ["Use secrets", "Add caching", "Implement deployment strategies"],
    commonMistakes: ["Hardcoded credentials", "Not testing pipeline"],
    estimatedHours: 45,
    totalTasks: 12
  },
  "do-102": {
    id: "do-102",
    title: "Dockerized Node.js Application",
    shortDescription: "Containerize and deploy Node.js app with Docker",
    description: "Learn Docker by containerizing a Node.js application with multi-container setup using Docker Compose.",
    tech: ["Docker", "Node.js", "Express", "Nginx", "Docker Compose"],
    toolsIcon: "🐳",
    features: [
      "Multi-container setup",
      "Volume mounting for live reload",
      "Environment variables management",
      "Network configuration",
      "Production deployment"
    ],
    duration: "2-3 weeks",
    level: "Beginner",
    mainTech: "Docker",
    difficulty: "Moderate",
    prerequisites: ["Node.js basics", "Git basics"],
    learningOutcomes: [
      "Dockerfile creation and optimization",
      "Docker Compose for multi-container apps",
      "Container networking",
      "Volume management for persistence",
      "Production deployment strategies"
    ],
    steps: [
      "Create Dockerfile for Node.js app",
      "Build and test Docker image locally",
      "Setup Docker Compose with Node and Nginx",
      "Configure environment variables",
      "Deploy to production server"
    ],
    resources: [
      { name: "Docker for Node.js – TechWorld with Nana", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
      { name: "Docker Official Getting Started Docs", url: "https://docs.docker.com/get-started/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=3c-iBn73dDE",
    liveDemo: null,
    careerPath: "devops",
    careerColor: "#06b6d4",
    tips: ["Use .dockerignore", "Layer caching for faster builds", "Use specific image tags"],
    commonMistakes: ["Not handling signals", "Running as root", "Hardcoding configs"],
    estimatedHours: 30,
    totalTasks: 10
  },
  "do-201": {
    id: "do-201",
    title: "Kubernetes Cluster Setup",
    shortDescription: "Deploy and manage applications on Kubernetes",
    description: "Set up a Kubernetes cluster and deploy microservices with auto-scaling, load balancing, and monitoring.",
    tech: ["Kubernetes", "Docker", "Terraform", "Prometheus", "Grafana", "Helm"],
    toolsIcon: "☸️",
    features: [
      "Multi-container orchestration",
      "Auto-scaling based on CPU/memory",
      "Load balancing with Ingress",
      "Monitoring stack with Prometheus",
      "Rolling updates and rollbacks"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "Kubernetes",
    difficulty: "Challenging",
    prerequisites: ["Docker", "YAML basics", "CLI experience"],
    learningOutcomes: [
      "Kubernetes architecture and components",
      "Writing YAML manifests",
      "Deployments, Services, ConfigMaps",
      "Helm charts for package management",
      "Prometheus and Grafana monitoring"
    ],
    steps: [
      "Write Terraform code for cluster",
      "Setup Kubernetes cluster on cloud",
      "Create Docker images for services",
      "Write Kubernetes manifests",
      "Configure Ingress and monitoring"
    ],
    resources: [
      { name: "Kubernetes Full Course – TechWorld with Nana", url: "https://www.youtube.com/watch?v=X48VuDVv0do" },
      { name: "Kubernetes Official Docs", url: "https://kubernetes.io/docs/home/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=X48VuDVv0do",
    liveDemo: null,
    careerPath: "devops",
    careerColor: "#06b6d4",
    tips: ["Use namespaces", "Implement resource limits", "Add health probes"],
    commonMistakes: ["Missing resource requests", "Not using ConfigMaps", "Large images"],
    estimatedHours: 70,
    totalTasks: 16
  },
  "do-301": {
    id: "do-301",
    title: "Multi-cloud Infrastructure",
    shortDescription: "Build resilient multi-cloud architecture",
    description: "Design and implement a highly available infrastructure across AWS, GCP, and Azure using Terraform and service mesh.",
    tech: ["Terraform", "Kubernetes", "Istio", "AWS", "GCP", "Azure", "Vault"],
    toolsIcon: "☁️",
    features: [
      "Multi-cloud deployment",
      "Service mesh with Istio",
      "Disaster recovery setup",
      "Traffic splitting and canary",
      "Centralized secrets management"
    ],
    duration: "12-14 weeks",
    level: "Advanced",
    mainTech: "Multi-cloud + Istio",
    difficulty: "Expert",
    prerequisites: ["Kubernetes", "Terraform", "Cloud providers basics"],
    learningOutcomes: [
      "Multi-cloud strategies and patterns",
      "Istio service mesh configuration",
      "Disaster recovery and failover",
      "Traffic management and canary",
      "Cost optimization across clouds"
    ],
    steps: [
      "Design multi-cloud architecture",
      "Setup Terraform for 3 providers",
      "Deploy Kubernetes clusters",
      "Install and configure Istio",
      "Configure traffic splitting and failover"
    ],
    resources: [
      { name: "Terraform Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=SLB_c_ayRMo" },
      { name: "Istio Service Mesh Docs", url: "https://istio.io/latest/docs/setup/getting-started/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=SLB_c_ayRMo",
    liveDemo: null,
    careerPath: "devops",
    careerColor: "#06b6d4",
    tips: ["Start with 2 regions", "Implement blue-green", "Use Terraform modules"],
    commonMistakes: ["Vendor lock-in", "Network latency", "Cost explosion"],
    estimatedHours: 140,
    totalTasks: 24
  },

  // Security Projects
  "sec-101": {
    id: "sec-101",
    title: "Web Security Scanner",
    shortDescription: "Build a basic vulnerability scanner for web applications",
    description: "Create a security scanner that checks for common web vulnerabilities like XSS, SQL injection, and insecure headers.",
    tech: ["Python", "Requests", "BeautifulSoup", "SQLite", "Flask"],
    toolsIcon: "🛡️",
    features: [
      "XSS vulnerability detection",
      "SQL injection testing",
      "Security headers checker",
      "Open port scanning",
      "Report generation"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "Python",
    difficulty: "Moderate",
    prerequisites: ["Python basics", "HTTP/HTTPS understanding", "Basic web security concepts"],
    learningOutcomes: [
      "Common web vulnerabilities (OWASP Top 10)",
      "HTTP request/response manipulation",
      "Regular expressions for pattern matching",
      "SQL injection detection techniques",
      "Security report generation"
    ],
    steps: [
      "Learn OWASP Top 10 vulnerabilities",
      "Build HTTP request handler",
      "Implement XSS detection patterns",
      "Add SQL injection testing",
      "Create security headers checker",
      "Build report generator"
    ],
    resources: [
      { name: "Ethical Hacking with Python – freeCodeCamp", url: "https://www.youtube.com/watch?v=fNzpcB7ODxQ" },
      { name: "OWASP Top 10 Official Docs", url: "https://owasp.org/www-project-top-ten/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=fNzpcB7ODxQ",
    liveDemo: null,
    careerPath: "security",
    careerColor: "#8b5cf6",
    tips: ["Start with safe test environments", "Use virtual machines for testing", "Document findings thoroughly"],
    commonMistakes: ["Testing on unauthorized sites", "False positives", "Missing edge cases"],
    estimatedHours: 45,
    totalTasks: 12
  },
  "sec-102": {
    id: "sec-102",
    title: "Password Strength Checker",
    shortDescription: "Build a sophisticated password strength analyzer",
    description: "Create a tool that analyzes password strength using entropy calculation, dictionary attacks simulation, and pattern detection.",
    tech: ["Python", "Flask", "zxcvbn", "JavaScript", "HTML/CSS"],
    toolsIcon: "🔐",
    features: [
      "Entropy calculation",
      "Breached password checking (HaveIBeenPwned API)",
      "Pattern detection (keyboard patterns, repetitions)",
      "Dictionary attack simulation",
      "Password generation tool"
    ],
    duration: "2-3 weeks",
    level: "Beginner",
    mainTech: "Python + zxcvbn",
    difficulty: "Easy",
    prerequisites: ["Python basics", "Basic cryptography concepts", "API integration"],
    learningOutcomes: [
      "Password entropy mathematics",
      "Common password patterns",
      "API integration with security services",
      "Client-side security best practices",
      "Password policy design"
    ],
    steps: [
      "Implement entropy calculation",
      "Add common password dictionary",
      "Integrate HaveIBeenPwned API",
      "Create pattern detection algorithms",
      "Build web interface",
      "Add password generator"
    ],
    resources: [
      { name: "Password Security & Cryptography – Computerphile", url: "https://www.youtube.com/watch?v=iJ01q-sRJAw" },
      { name: "HaveIBeenPwned API Docs", url: "https://haveibeenpwned.com/API/v3" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=iJ01q-sRJAw",
    liveDemo: null,
    careerPath: "security",
    careerColor: "#8b5cf6",
    tips: ["Never log passwords", "Use secure API calls", "Add strength visual indicators"],
    commonMistakes: ["Transmitting passwords insecurely", "Weak entropy calculation", "Missing dictionary words"],
    estimatedHours: 30,
    totalTasks: 10
  },
  "sec-201": {
    id: "sec-201",
    title: "Network Intrusion Detection System",
    shortDescription: "Build a real-time network traffic analyzer",
    description: "Create an IDS that monitors network traffic, detects suspicious patterns, and alerts on potential intrusions using machine learning.",
    tech: ["Python", "Scapy", "TensorFlow", "Scikit-learn", "Elasticsearch", "Kibana"],
    toolsIcon: "🌐",
    features: [
      "Real-time packet capture and analysis",
      "Signature-based detection",
      "Anomaly detection with ML",
      "Alert system with notifications",
      "Dashboard for visualization"
    ],
    duration: "8-10 weeks",
    level: "Intermediate",
    mainTech: "Python + Machine Learning",
    difficulty: "Challenging",
    prerequisites: ["Python", "Networking fundamentals", "Basic ML concepts", "Linux basics"],
    learningOutcomes: [
      "Network protocols (TCP/IP, UDP, ICMP)",
      "Packet analysis with Scapy",
      "Feature engineering for network data",
      "Classification algorithms for intrusion detection",
      "Real-time data processing"
    ],
    steps: [
      "Setup packet capture with Scapy",
      "Implement signature-based detection",
      "Extract network features",
      "Train ML model for anomaly detection",
      "Build real-time alert system",
      "Create visualization dashboard"
    ],
    resources: [
      { name: "Network Security with Python & Scapy – freeCodeCamp", url: "https://www.youtube.com/watch?v=b5ZsUseOjQo" },
      { name: "Scapy Official Documentation", url: "https://scapy.readthedocs.io/en/latest/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=b5ZsUseOjQo",
    liveDemo: null,
    careerPath: "security",
    careerColor: "#8b5cf6",
    tips: ["Use test networks only", "Optimize for performance", "Implement false positive reduction"],
    commonMistakes: ["High false positives", "Performance bottlenecks", "Missing encrypted traffic analysis"],
    estimatedHours: 90,
    totalTasks: 18
  },
  "sec-202": {
    id: "sec-202",
    title: "Secure Authentication Service",
    shortDescription: "Implement multi-factor authentication system",
    description: "Build a production-ready authentication service with MFA support, OAuth2, and security best practices.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "OTP", "TOTP", "OAuth2", "Rate Limiting"],
    toolsIcon: "🔑",
    features: [
      "Multi-factor authentication (SMS, TOTP, Email)",
      "OAuth2 integration (Google, GitHub)",
      "JWT with refresh tokens",
      "Brute force protection",
      "Session management",
      "Audit logging"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "Node.js + JWT + TOTP",
    difficulty: "Challenging",
    prerequisites: ["Node.js", "JWT concepts", "Cryptography basics", "REST APIs"],
    learningOutcomes: [
      "OAuth2 and OpenID Connect flows",
      "TOTP algorithm (RFC 6238)",
      "Secure token storage",
      "Rate limiting strategies",
      "Security audit logging",
      "Password hashing best practices"
    ],
    steps: [
      "Setup authentication server",
      "Implement password-based auth with bcrypt",
      "Add TOTP-based MFA",
      "Integrate OAuth2 providers",
      "Implement refresh tokens",
      "Add rate limiting and brute force protection",
      "Create audit logging system"
    ],
    resources: [
      { name: "Node.js Auth with JWT & MFA – Traversy Media", url: "https://www.youtube.com/watch?v=enopDSs3DRw" },
      { name: "OAuth 2.0 Explained – Fireship", url: "https://www.youtube.com/watch?v=996OiexHze0" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=enopDSs3DRw",
    liveDemo: null,
    careerPath: "security",
    careerColor: "#8b5cf6",
    tips: ["Implement rate limiting on auth endpoints", "Use secure HTTP-only cookies", "Add account lockout policies"],
    commonMistakes: ["Weak token expiration", "Missing CSRF protection", "Insecure token storage"],
    estimatedHours: 80,
    totalTasks: 16
  },
  "sec-301": {
    id: "sec-301",
    title: "Security Information and Event Management (SIEM)",
    shortDescription: "Build an enterprise-grade SIEM system",
    description: "Create a comprehensive SIEM solution that aggregates logs from multiple sources, correlates events, and detects security incidents.",
    tech: ["Elastic Stack", "Kafka", "Python", "Docker", "Kubernetes", "React", "Redis"],
    toolsIcon: "📊",
    features: [
      "Centralized log aggregation",
      "Real-time event correlation",
      "Rule-based alerting",
      "Threat intelligence integration",
      "Incident response workflow",
      "Compliance reporting"
    ],
    duration: "12-14 weeks",
    level: "Advanced",
    mainTech: "Elastic Stack + Kafka",
    difficulty: "Expert",
    prerequisites: ["Elasticsearch", "Logstash", "Kibana", "Kafka", "Python", "Linux administration"],
    learningOutcomes: [
      "Log aggregation and normalization",
      "Event correlation algorithms",
      "Threat intelligence feeds integration",
      "Security compliance frameworks",
      "Incident response automation",
      "Real-time stream processing"
    ],
    steps: [
      "Setup Elastic Stack cluster",
      "Configure log ingestion pipeline with Kafka",
      "Implement event correlation engine",
      "Create rule-based alerting system",
      "Integrate threat intelligence feeds",
      "Build incident response dashboard",
      "Implement compliance reporting"
    ],
    resources: [
      { name: "Elastic Stack SIEM Tutorial – Elastic", url: null },
      { name: "Elastic SIEM Official Docs", url: "https://www.elastic.co/guide/en/security/current/index.html" }
    ],
    videoTutorial: null,
    liveDemo: null,
    careerPath: "security",
    careerColor: "#8b5cf6",
    tips: ["Start with common log sources", "Use MITRE ATT&CK for correlation", "Implement data retention policies"],
    commonMistakes: ["Overwhelming alert volume", "Missing log sources", "Poor correlation rules"],
    estimatedHours: 150,
    totalTasks: 28
  },

  // Data Science Projects
  "ds-101": {
    id: "ds-101",
    title: "Exploratory Data Analysis Dashboard",
    shortDescription: "Build an interactive EDA dashboard for dataset analysis",
    description: "Create a web-based dashboard that allows users to upload datasets, perform exploratory analysis, and visualize insights.",
    tech: ["Python", "Pandas", "Streamlit", "Plotly", "Seaborn", "Scikit-learn"],
    toolsIcon: "📊",
    features: [
      "CSV/Excel file upload",
      "Automatic data profiling",
      "Interactive visualizations",
      "Statistical summary",
      "Correlation analysis",
      "Missing value handling"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "Python + Pandas + Streamlit",
    difficulty: "Moderate",
    prerequisites: ["Python basics", "Pandas fundamentals", "Basic statistics"],
    learningOutcomes: [
      "Data cleaning and preprocessing",
      "Statistical analysis techniques",
      "Data visualization best practices",
      "Dashboard development with Streamlit",
      "Feature correlation analysis"
    ],
    steps: [
      "Setup Streamlit app",
      "Implement file upload and parsing",
      "Add data profiling functionality",
      "Create interactive plots with Plotly",
      "Build correlation heatmap",
      "Add statistical summary tables",
      "Deploy to Streamlit Cloud"
    ],
    resources: [
      { name: "Streamlit Data Dashboard – freeCodeCamp", url: "https://www.youtube.com/watch?v=JwSS70SZdyM" },
      { name: "Pandas Official Documentation", url: "https://pandas.pydata.org/docs/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=JwSS70SZdyM",
    liveDemo: "https://eda-dashboard.streamlit.app",
    careerPath: "data",
    careerColor: "#ec4899",
    tips: ["Handle large datasets efficiently", "Add caching for performance", "Provide download options for reports"],
    commonMistakes: ["Not handling missing data", "Poor visualization choices", "Ignoring data types"],
    estimatedHours: 40,
    totalTasks: 12
  },
  "ds-102": {
    id: "ds-102",
    title: "Customer Segmentation Analysis",
    shortDescription: "Perform customer segmentation using clustering algorithms",
    description: "Build a customer segmentation model using unsupervised learning to group customers based on purchasing behavior.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    toolsIcon: "👥",
    features: [
      "Data preprocessing and scaling",
      "K-means clustering",
      "Elbow method for optimal K",
      "PCA for dimensionality reduction",
      "Segment visualization",
      "Customer profiling"
    ],
    duration: "2-3 weeks",
    level: "Beginner",
    mainTech: "Python + Scikit-learn",
    difficulty: "Moderate",
    prerequisites: ["Python basics", "Pandas", "Basic machine learning concepts"],
    learningOutcomes: [
      "Unsupervised learning concepts",
      "K-means clustering algorithm",
      "Feature scaling techniques",
      "PCA for visualization",
      "Cluster interpretation and profiling"
    ],
    steps: [
      "Load and explore customer data",
      "Clean and preprocess features",
      "Scale features appropriately",
      "Implement K-means clustering",
      "Determine optimal K using elbow method",
      "Visualize clusters with PCA",
      "Create customer segment profiles"
    ],
    resources: [
      { name: "K-Means Clustering with Python – freeCodeCamp", url: "https://www.youtube.com/watch?v=4b5d3muPQmA" },
      { name: "Scikit-learn Clustering Docs", url: "https://scikit-learn.org/stable/modules/clustering.html" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=4b5d3muPQmA",
    liveDemo: null,
    careerPath: "data",
    careerColor: "#ec4899",
    tips: ["Try multiple clustering algorithms", "Visualize clusters in 2D/3D", "Name segments meaningfully"],
    commonMistakes: ["Not scaling features", "Choosing wrong K value", "Ignoring domain context"],
    estimatedHours: 35,
    totalTasks: 10
  },
  "ds-201": {
    id: "ds-201",
    title: "Sales Forecasting with Time Series",
    shortDescription: "Build a time series forecasting model for retail sales",
    description: "Create a predictive model that forecasts future sales using historical data with ARIMA, Prophet, and LSTM.",
    tech: ["Python", "Pandas", "Statsmodels", "Prophet", "TensorFlow/Keras", "Plotly"],
    toolsIcon: "📈",
    features: [
      "Time series decomposition",
      "ARIMA/SARIMA modeling",
      "Facebook Prophet integration",
      "LSTM neural network",
      "Model comparison dashboard",
      "Forecast visualization"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "Python + Prophet + TensorFlow",
    difficulty: "Challenging",
    prerequisites: ["Python", "Pandas", "Statistics", "Basic deep learning"],
    learningOutcomes: [
      "Time series analysis concepts",
      "ARIMA model theory and implementation",
      "Seasonality and trend decomposition",
      "LSTM for sequence prediction",
      "Model evaluation metrics (MAPE, RMSE)",
      "Cross-validation for time series"
    ],
    steps: [
      "Load and prepare time series data",
      "Perform EDA and decomposition",
      "Implement ARIMA/SARIMA model",
      "Build Prophet model for forecasting",
      "Create LSTM neural network",
      "Compare model performance",
      "Build forecast dashboard"
    ],
    resources: [
      { name: "Time Series Forecasting with Python – freeCodeCamp", url: "https://www.youtube.com/watch?v=e8Yw4alG16Q" },
      { name: "Facebook Prophet Docs", url: "https://facebook.github.io/prophet/docs/quick_start.html" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=e8Yw4alG16Q",
    liveDemo: null,
    careerPath: "data",
    careerColor: "#ec4899",
    tips: ["Handle missing dates", "Consider holidays and events", "Use walk-forward validation"],
    commonMistakes: ["Data leakage in time series", "Ignoring seasonality", "Overfitting to noise"],
    estimatedHours: 75,
    totalTasks: 16
  },
  "ds-202": {
    id: "ds-202",
    title: "Recommendation Engine",
    shortDescription: "Build a production-ready recommendation system",
    description: "Create a hybrid recommendation engine combining collaborative filtering and content-based approaches.",
    tech: ["Python", "Pandas", "Scikit-learn", "Surprise", "FastAPI", "Redis", "Docker"],
    toolsIcon: "🎯",
    features: [
      "Collaborative filtering (user-based/item-based)",
      "Matrix factorization (SVD)",
      "Content-based filtering",
      "Hybrid recommendations",
      "REST API for recommendations",
      "Caching for performance"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "Python + Surprise + FastAPI",
    difficulty: "Challenging",
    prerequisites: ["Python", "Linear algebra basics", "Pandas", "REST APIs"],
    learningOutcomes: [
      "Collaborative filtering algorithms",
      "Matrix factorization techniques",
      "Content-based feature extraction",
      "Hybrid recommendation strategies",
      "API development for ML models",
      "Caching strategies"
    ],
    steps: [
      "Load and explore rating data",
      "Implement user-based CF",
      "Implement item-based CF",
      "Build SVD matrix factorization",
      "Create content-based filter",
      "Combine models into hybrid system",
      "Build FastAPI endpoint",
      "Add Redis caching"
    ],
    resources: [
      { name: "Build a Recommendation System – freeCodeCamp", url: "https://www.youtube.com/watch?v=G4MBc40rQ2k" },
      { name: "Surprise Library Docs", url: "https://surprise.readthedocs.io/en/stable/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=G4MBc40rQ2k",
    liveDemo: null,
    careerPath: "data",
    careerColor: "#ec4899",
    tips: ["Handle cold-start problem", "Use implicit feedback too", "A/B test recommendations"],
    commonMistakes: ["Popularity bias", "Not handling new users/items", "Poor evaluation metrics"],
    estimatedHours: 80,
    totalTasks: 18
  },
  "ds-301": {
    id: "ds-301",
    title: "End-to-End ML Pipeline",
    shortDescription: "Build a production ML pipeline with MLOps practices",
    description: "Create a complete machine learning pipeline with data versioning, model training, deployment, and monitoring.",
    tech: ["Python", "DVC", "MLflow", "Airflow", "Docker", "Kubernetes", "FastAPI", "Prometheus", "Grafana"],
    toolsIcon: "⚙️",
    features: [
      "Data version control with DVC",
      "Automated retraining pipeline",
      "Model registry with MLflow",
      "API deployment",
      "Model monitoring and drift detection",
      "A/B testing framework"
    ],
    duration: "10-12 weeks",
    level: "Advanced",
    mainTech: "MLflow + DVC + Airflow + Kubernetes",
    difficulty: "Expert",
    prerequisites: ["Python", "Docker", "Kubernetes basics", "CI/CD concepts", "ML fundamentals"],
    learningOutcomes: [
      "MLOps best practices",
      "Data versioning strategies",
      "Pipeline orchestration with Airflow",
      "Model versioning and registry",
      "Continuous training and deployment",
      "Model monitoring and drift detection"
    ],
    steps: [
      "Setup DVC for data versioning",
      "Create feature engineering pipeline",
      "Implement model training with MLflow tracking",
      "Build Airflow DAG for orchestration",
      "Containerize with Docker",
      "Deploy to Kubernetes",
      "Add Prometheus monitoring",
      "Implement drift detection"
    ],
    resources: [
      { name: "MLOps Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=-dJPoLm_gtE" },
      { name: "MLflow Official Docs", url: "https://mlflow.org/docs/latest/index.html" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=-dJPoLm_gtE",
    liveDemo: null,
    careerPath: "data",
    careerColor: "#ec4899",
    tips: ["Start with simple pipeline", "Implement data validation", "Add model explainability"],
    commonMistakes: ["Not versioning data", "Ignoring model decay", "Poor monitoring setup"],
    estimatedHours: 130,
    totalTasks: 24
  },

  // AI/ML Projects
  "ai-101": {
    id: "ai-101",
    title: "Image Classification with CNN",
    shortDescription: "Build a convolutional neural network for image recognition",
    description: "Create an image classifier using CNNs to recognize objects in images using TensorFlow/Keras.",
    tech: ["Python", "TensorFlow", "Keras", "NumPy", "Matplotlib", "Jupyter"],
    toolsIcon: "🖼️",
    features: [
      "Data augmentation",
      "CNN architecture design",
      "Transfer learning with pretrained models",
      "Training visualization",
      "Model evaluation metrics",
      "Inference API"
    ],
    duration: "4-5 weeks",
    level: "Beginner",
    mainTech: "TensorFlow + Keras",
    difficulty: "Moderate",
    prerequisites: ["Python basics", "NumPy", "Basic ML concepts", "Linear algebra fundamentals"],
    learningOutcomes: [
      "Convolutional neural network architecture",
      "Image preprocessing techniques",
      "Transfer learning with VGG16/ResNet",
      "Data augmentation strategies",
      "Model evaluation and interpretation"
    ],
    steps: [
      "Load and preprocess image dataset (CIFAR-10/MNIST)",
      "Build CNN from scratch",
      "Implement data augmentation",
      "Train and evaluate model",
      "Apply transfer learning",
      "Compare model performances",
      "Build simple inference API"
    ],
    resources: [
      { name: "Deep Learning with TensorFlow – freeCodeCamp", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk" },
      { name: "TensorFlow Official CNN Tutorial", url: "https://www.tensorflow.org/tutorials/images/cnn" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=tPYj3fFJGjk",
    liveDemo: null,
    careerPath: "ai",
    careerColor: "#14b8a6",
    tips: ["Start with small dataset", "Use GPU if available", "Visualize filter outputs"],
    commonMistakes: ["Overfitting without regularization", "Too small dataset", "Poor data preprocessing"],
    estimatedHours: 50,
    totalTasks: 12
  },
  "ai-102": {
    id: "ai-102",
    title: "Sentiment Analysis with NLP",
    shortDescription: "Build a sentiment classifier for text reviews",
    description: "Create an NLP model that classifies movie or product reviews as positive or negative using various text processing techniques.",
    tech: ["Python", "NLTK", "Scikit-learn", "Transformers", "HuggingFace", "Flask"],
    toolsIcon: "💬",
    features: [
      "Text preprocessing and cleaning",
      "TF-IDF and word embeddings",
      "Traditional ML classifiers (Naive Bayes, SVM)",
      "Fine-tuned BERT model",
      "Model comparison dashboard",
      "REST API for predictions"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "Python + HuggingFace Transformers",
    difficulty: "Moderate",
    prerequisites: ["Python basics", "NLP fundamentals", "Basic ML concepts"],
    learningOutcomes: [
      "Text preprocessing (tokenization, stemming, lemmatization)",
      "Feature extraction (Bag-of-Words, TF-IDF, Word2Vec)",
      "Traditional ML for text classification",
      "Transformer architecture basics",
      "Fine-tuning BERT for downstream tasks"
    ],
    steps: [
      "Load IMDB or product review dataset",
      "Clean and preprocess text data",
      "Implement BoW and TF-IDF features",
      "Train Naive Bayes and SVM models",
      "Fine-tune DistilBERT/BERT",
      "Compare model performances",
      "Build Flask prediction API"
    ],
    resources: [
      { name: "NLP with Python & HuggingFace – freeCodeCamp", url: "https://www.youtube.com/watch?v=M7SWr5xObkA" },
      { name: "HuggingFace NLP Course (Free)", url: "https://huggingface.co/learn/nlp-course/chapter1/1" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=M7SWr5xObkA",
    liveDemo: null,
    careerPath: "ai",
    careerColor: "#14b8a6",
    tips: ["Handle emojis and slang", "Consider context and sarcasm", "Use pre-trained embeddings"],
    commonMistakes: ["Poor handling of negations", "Ignoring class imbalance", "Over-relying on single model"],
    estimatedHours: 45,
    totalTasks: 11
  },
  "ai-201": {
    id: "ai-201",
    title: "Object Detection System",
    shortDescription: "Build real-time object detection using YOLO",
    description: "Create an object detection system that identifies and localizes multiple objects in images/video using YOLO architecture.",
    tech: ["Python", "PyTorch", "YOLO", "OpenCV", "Albumentations", "FastAPI"],
    toolsIcon: "👁️",
    features: [
      "Real-time object detection",
      "Multiple object tracking",
      "Custom dataset training",
      "Video stream processing",
      "Bounding box visualization",
      "API endpoint for detection"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "PyTorch + YOLO + OpenCV",
    difficulty: "Challenging",
    prerequisites: ["Python", "PyTorch basics", "CNN understanding", "OpenCV basics"],
    learningOutcomes: [
      "Object detection architectures (YOLO, SSD)",
      "Anchor boxes and non-max suppression",
      "Transfer learning for custom objects",
      "Real-time video processing",
      "Model optimization for inference"
    ],
    steps: [
      "Setup YOLO environment",
      "Download pretrained weights",
      "Implement detection on images",
      "Add video/webcam support",
      "Train on custom dataset (COCO subset)",
      "Optimize for real-time performance",
      "Build FastAPI detection service"
    ],
    resources: [
      { name: "YOLO Object Detection – Nicolai Nielsen", url: "https://www.youtube.com/watch?v=ag3DLKsl2vk" },
      { name: "Ultralytics YOLO Docs", url: "https://docs.ultralytics.com" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=ag3DLKsl2vk",
    liveDemo: null,
    careerPath: "ai",
    careerColor: "#14b8a6",
    tips: ["Use GPU for training", "Implement NMS properly", "Optimize for your use case"],
    commonMistakes: ["Poor anchor box configuration", "Missing data augmentation", "Slow inference speed"],
    estimatedHours: 85,
    totalTasks: 16
  },
  "ai-202": {
    id: "ai-202",
    title: "LLM-Powered Chatbot",
    shortDescription: "Build a conversational AI using large language models",
    description: "Create an intelligent chatbot using GPT, LangChain, and RAG (Retrieval-Augmented Generation) for custom knowledge bases.",
    tech: ["Python", "LangChain", "OpenAI API", "Chroma/FAISS", "Streamlit", "FastAPI"],
    toolsIcon: "🤖",
    features: [
      "Document ingestion and chunking",
      "Vector embeddings and storage",
      "Retrieval-augmented generation (RAG)",
      "Conversation memory",
      "Custom knowledge base integration",
      "Streaming responses"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "LangChain + OpenAI API + Vector DB",
    difficulty: "Challenging",
    prerequisites: ["Python", "API integration", "Basic NLP concepts", "Vector embeddings"],
    learningOutcomes: [
      "LLM prompt engineering techniques",
      "RAG architecture and implementation",
      "Vector databases for semantic search",
      "Conversation memory management",
      "LangChain framework proficiency",
      "Cost optimization for LLM APIs"
    ],
    steps: [
      "Setup LangChain environment",
      "Implement document loading and splitting",
      "Create vector embeddings with OpenAI",
      "Build retrieval system with Chroma/FAISS",
      "Implement RAG chain",
      "Add conversation memory",
      "Build Streamlit chat interface",
      "Add document upload functionality"
    ],
    resources: [
      { name: "LangChain RAG Chatbot – freeCodeCamp", url: "https://www.youtube.com/watch?v=sVcwVQRHIc8" },
      { name: "LangChain Official Docs", url: "https://python.langchain.com/docs/introduction/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=sVcwVQRHIc8",
    liveDemo: null,
    careerPath: "ai",
    careerColor: "#14b8a6",
    tips: ["Use streaming for better UX", "Implement rate limiting", "Add citation sources"],
    commonMistakes: ["Poor chunking strategy", "No context window management", "High token usage"],
    estimatedHours: 80,
    totalTasks: 16
  },
  "ai-301": {
    id: "ai-301",
    title: "Reinforcement Learning Agent",
    shortDescription: "Train an RL agent to play games using deep Q-learning",
    description: "Build a deep reinforcement learning agent that learns to play Atari games or custom environments using DQN and PPO.",
    tech: ["Python", "PyTorch", "OpenAI Gym", "Stable-Baselines3", "TensorBoard", "Ray RLlib"],
    toolsIcon: "🎮",
    features: [
      "Deep Q-Network (DQN) implementation",
      "Experience replay buffer",
      "Target network for stability",
      "Proximal Policy Optimization (PPO)",
      "Training visualization with TensorBoard",
      "Model checkpointing and evaluation"
    ],
    duration: "10-12 weeks",
    level: "Advanced",
    mainTech: "PyTorch + OpenAI Gym",
    difficulty: "Expert",
    prerequisites: ["Python", "PyTorch", "Deep learning", "Probability theory", "Game theory basics"],
    learningOutcomes: [
      "Reinforcement learning fundamentals (MDP, Bellman equation)",
      "Q-learning and deep Q-networks",
      "Policy gradient methods",
      "PPO algorithm architecture",
      "Experience replay and target networks",
      "Hyperparameter tuning for RL"
    ],
    steps: [
      "Setup OpenAI Gym environment (CartPole/LunarLander)",
      "Implement experience replay buffer",
      "Build DQN from scratch",
      "Add target network",
      "Implement training loop with epsilon-greedy",
      "Track metrics with TensorBoard",
      "Implement PPO with Stable-Baselines3",
      "Compare DQN vs PPO performance",
      "Add model checkpointing"
    ],
    resources: [
      { name: "Reinforcement Learning with PyTorch – freeCodeCamp", url: "https://www.youtube.com/watch?v=Mut_u40Sqz4" },
      { name: "OpenAI Spinning Up in Deep RL", url: "https://spinningup.openai.com/en/latest/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=Mut_u40Sqz4",
    liveDemo: null,
    careerPath: "ai",
    careerColor: "#14b8a6",
    tips: ["Start with simple environments", "Use vectorized environments", "Implement proper exploration strategies"],
    commonMistakes: ["Unstable training", "Poor reward shaping", "Overestimation bias in DQN"],
    estimatedHours: 120,
    totalTasks: 22
  },

  // Game Development Projects
  "gd-101": {
    id: "gd-101",
    title: "2D Platformer Game",
    shortDescription: "Create a classic side-scrolling platformer game",
    description: "Build a 2D platformer game with Unity, featuring player movement, enemies, collectibles, and multiple levels.",
    tech: ["Unity", "C#", "Photoshop/ASEprite", "FMOD"],
    toolsIcon: "🎮",
    features: [
      "Player movement and physics",
      "Enemy AI and patrol paths",
      "Collectibles and power-ups",
      "Multiple levels with checkpoints",
      "Save/load game progress",
      "Sound effects and background music"
    ],
    duration: "4-5 weeks",
    level: "Beginner",
    mainTech: "Unity + C#",
    difficulty: "Moderate",
    prerequisites: ["Basic C#", "Unity Editor basics", "Object-oriented programming"],
    learningOutcomes: [
      "Unity 2D physics and collisions",
      "C# scripting for game logic",
      "Animation controller setup",
      "Scene management and level loading",
      "PlayerPrefs for save system",
      "Basic enemy AI behavior"
    ],
    steps: [
      "Setup Unity 2D project",
      "Create player controller with movement",
      "Implement jump and physics",
      "Design first level with tiles",
      "Add collectible items",
      "Create enemy patrol AI",
      "Implement UI and scoring",
      "Add save/load functionality"
    ],
    resources: [
      { name: "Unity 2D Platformer Tutorial – Brackeys", url: "https://www.youtube.com/watch?v=dwcT-Dch0bA" },
      { name: "Unity 2D Official Learn Path", url: "https://learn.unity.com/pathway/unity-essentials" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=dwcT-Dch0bA",
    liveDemo: null,
    careerPath: "game",
    careerColor: "#f97316",
    tips: ["Use tilemaps for level design", "Implement coyote time for jumps", "Test physics values iteratively"],
    commonMistakes: ["Poor jump feel", "Non-responsive controls", "Inconsistent frame rates"],
    estimatedHours: 50,
    totalTasks: 14
  },
  "gd-102": {
    id: "gd-102",
    title: "Endless Runner Mobile Game",
    shortDescription: "Build an addictive endless runner for mobile",
    description: "Create an endless runner game with procedural generation, touch controls, and increasing difficulty.",
    tech: ["Unity", "C#", "Procedural Generation", "Unity Ads", "Mobile Optimization"],
    toolsIcon: "🏃",
    features: [
      "Procedural level generation",
      "Touch/swipe controls",
      "Score and combo system",
      "Power-ups and obstacles",
      "Increasing difficulty curve",
      "Leaderboard integration"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "Unity + C#",
    difficulty: "Moderate",
    prerequisites: ["Unity basics", "C# fundamentals", "Mobile development concepts"],
    learningOutcomes: [
      "Procedural content generation",
      "Object pooling for performance",
      "Mobile touch input handling",
      "Game feel and juice techniques",
      "Performance optimization for mobile"
    ],
    steps: [
      "Setup infinite scrolling background",
      "Create object pooling system",
      "Implement procedural obstacle generation",
      "Add touch controls",
      "Create scoring system",
      "Implement power-ups",
      "Add difficulty scaling",
      "Optimize for mobile performance"
    ],
    resources: [
      { name: "Unity Endless Runner – Brackeys", url: "https://www.youtube.com/watch?v=qXvdIDPAGV8" },
      { name: "Unity Mobile Optimization Docs", url: "https://docs.unity3d.com/Manual/MobileOptimizationPracticalGuide.html" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=qXvdIDPAGV8",
    liveDemo: null,
    careerPath: "game",
    careerColor: "#f97316",
    tips: ["Use object pooling heavily", "Optimize draw calls", "Add visual feedback for touches"],
    commonMistakes: ["Memory leaks from spawning", "Poor touch responsiveness", "Difficulty too steep"],
    estimatedHours: 40,
    totalTasks: 12
  },
  "gd-201": {
    id: "gd-201",
    title: "Multiplayer Racing Game",
    shortDescription: "Build a real-time multiplayer racing game",
    description: "Create a networked racing game with real-time multiplayer, vehicle physics, and track editor using Unity Netcode.",
    tech: ["Unity", "C#", "Unity Netcode", "Photon", "Wheel Colliders", "Blender"],
    toolsIcon: "🏎️",
    features: [
      "Real-time multiplayer networking",
      "Vehicle physics and handling",
      "Track editor with save/load",
      "Race positions and timing",
      "Lobby and matchmaking",
      "Replay system"
    ],
    duration: "8-10 weeks",
    level: "Intermediate",
    mainTech: "Unity + Netcode/Photon",
    difficulty: "Challenging",
    prerequisites: ["Unity", "C#", "Network programming concepts", "Physics understanding"],
    learningOutcomes: [
      "Network architecture for real-time games",
      "Vehicle physics implementation",
      "Client-server synchronization",
      "Latency compensation techniques",
      "Custom editor tools creation"
    ],
    steps: [
      "Setup vehicle physics system",
      "Create car controller with wheel colliders",
      "Implement track system",
      "Setup networking foundation",
      "Add player spawning and syncing",
      "Implement race management",
      "Create lobby system",
      "Build track editor"
    ],
    resources: [
      { name: "Unity Multiplayer with Netcode – Unity", url: "https://www.youtube.com/watch?v=3yuBOB3VrCk" },
      { name: "Unity Netcode for GameObjects Docs", url: "https://docs-multiplayer.unity3d.com/netcode/current/about/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=3yuBOB3VrCk",
    liveDemo: null,
    careerPath: "game",
    careerColor: "#f97316",
    tips: ["Use authoritative server", "Implement interpolation/extrapolation", "Test with high latency simulation"],
    commonMistakes: ["Poor network synchronization", "Cheating vulnerabilities", "Rubberbanding issues"],
    estimatedHours: 100,
    totalTasks: 20
  },
  "gd-301": {
    id: "gd-301",
    title: "Open World RPG",
    shortDescription: "Build an ambitious open world RPG game",
    description: "Create an open world RPG with quest system, inventory, skill trees, and dynamic NPCs using Unity's ECS for performance.",
    tech: ["Unity", "C#", "ECS/DOTS", "ProBuilder", "Shader Graph", "Addressables", "ScriptableObjects"],
    toolsIcon: "⚔️",
    features: [
      "Large open world streaming",
      "Quest system with branching",
      "Inventory and equipment",
      "Skill tree and character progression",
      "Dynamic NPC AI and schedules",
      "Day/night cycle and weather",
      "Save system for persistent world"
    ],
    duration: "12-14 weeks",
    level: "Advanced",
    mainTech: "Unity + ECS/DOTS",
    difficulty: "Expert",
    prerequisites: ["Advanced Unity", "C# design patterns", "ECS architecture", "Optimization techniques"],
    learningOutcomes: [
      "ECS/DOTS for massive entity counts",
      "Open world streaming techniques",
      "Quest system architecture",
      "ScriptableObject-based data management",
      "Advanced AI behavior trees",
      "Save system for persistent data"
    ],
    steps: [
      "Setup ECS/DOTS architecture",
      "Implement world streaming system",
      "Create character controller with ECS",
      "Build inventory system",
      "Implement quest system",
      "Create skill tree framework",
      "Add NPC AI with behavior trees",
      "Implement save/load system",
      "Add dynamic day/night cycle",
      "Optimize for performance"
    ],
    resources: [
      { name: "Unity RPG Tutorial Series – Game Dev TV", url: "https://www.youtube.com/watch?v=UyTJLDGcT64" },
      { name: "Unity ECS/DOTS Official Docs", url: "https://docs.unity3d.com/Packages/com.unity.entities@latest" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=UyTJLDGcT64",
    liveDemo: null,
    careerPath: "game",
    careerColor: "#f97316",
    tips: ["Start with small prototype", "Use addressables for content streaming", "Implement data-oriented design principles"],
    commonMistakes: ["Over-scoping features", "Poor world streaming performance", "Complex save system bugs"],
    estimatedHours: 150,
    totalTasks: 28
  },

  // UI/UX Projects
  "uiux-101": {
    id: "uiux-101",
    title: "Mobile App Design System",
    shortDescription: "Create a comprehensive design system for mobile apps",
    description: "Build a complete design system including components, typography, colors, and interaction patterns using Figma.",
    tech: ["Figma", "Design Tokens", "Auto Layout", "Components", "Variants"],
    toolsIcon: "🎨",
    features: [
      "Color system (primary, secondary, semantic)",
      "Typography scale and hierarchy",
      "Component library with variants",
      "Auto Layout responsive components",
      "Dark mode support",
      "Design tokens export"
    ],
    duration: "3-4 weeks",
    level: "Beginner",
    mainTech: "Figma",
    difficulty: "Easy",
    prerequisites: ["Figma basics", "Design fundamentals", "Color theory basics"],
    learningOutcomes: [
      "Design system architecture and structure",
      "Component creation and variants",
      "Auto Layout for responsive design",
      "Design tokens and theming",
      "Collaboration and handoff best practices"
    ],
    steps: [
      "Define design principles",
      "Create color system",
      "Build typography scale",
      "Create basic components (buttons, inputs)",
      "Build complex components (cards, modals)",
      "Add variants for states",
      "Implement dark mode",
      "Create documentation page",
      "Export design tokens"
    ],
    resources: [
      { name: "Figma Design System Tutorial – DesignCourse", url: "https://www.youtube.com/watch?v=EK-pHkc5EL4" },
      { name: "Figma Official Learn Resources", url: "https://www.figma.com/resource-library/" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=EK-pHkc5EL4",
    liveDemo: null,
    careerPath: "uiux",
    careerColor: "#a855f7",
    tips: ["Start with atomic design principles", "Use consistent naming conventions", "Document everything"],
    commonMistakes: ["Inconsistent spacing", "Too many component variants", "Missing interaction states"],
    estimatedHours: 35,
    totalTasks: 12
  },
  "uiux-102": {
    id: "uiux-102",
    title: "E-commerce UX Case Study",
    shortDescription: "Complete UX research and design for e-commerce app",
    description: "Conduct user research, create user flows, wireframes, and high-fidelity prototypes for an e-commerce mobile app.",
    tech: ["Figma", "Miro", "User Research", "Usability Testing", "Prototyping"],
    toolsIcon: "🛍️",
    features: [
      "User research and personas",
      "Competitive analysis",
      "User journey maps",
      "Information architecture",
      "Wireframes and mockups",
      "Interactive prototype",
      "Usability testing plan"
    ],
    duration: "4-5 weeks",
    level: "Beginner",
    mainTech: "Figma + Miro",
    difficulty: "Moderate",
    prerequisites: ["Basic design principles", "Figma basics", "Interest in UX research"],
    learningOutcomes: [
      "UX research methodologies",
      "User persona creation",
      "User journey mapping",
      "Information architecture principles",
      "Wireframing and prototyping",
      "Usability testing facilitation"
    ],
    steps: [
      "Define research goals",
      "Conduct user interviews",
      "Create user personas",
      "Map user journeys",
      "Design information architecture",
      "Create low-fidelity wireframes",
      "Build hi-fi mockups",
      "Create interactive prototype",
      "Conduct usability testing",
      "Iterate based on feedback"
    ],
    resources: [
      { name: "UX Research Full Course – Google UX Design Certificate", url: "https://www.youtube.com/watch?v=kCR-9J8ggiA" },
      { name: "Figma Prototyping Official Tutorial", url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=kCR-9J8ggiA",
    liveDemo: null,
    careerPath: "uiux",
    careerColor: "#a855f7",
    tips: ["Recruit diverse participants", "Test early and often", "Document all findings"],
    commonMistakes: ["Skipping user research", "Designing for yourself", "Not validating assumptions"],
    estimatedHours: 50,
    totalTasks: 14
  },
  "uiux-201": {
    id: "uiux-201",
    title: "Design System with React",
    shortDescription: "Implement design system in production code",
    description: "Turn your design system into a living component library using React, Storybook, and Tailwind CSS.",
    tech: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Figma API", "Chromatic"],
    toolsIcon: "💻",
    features: [
      "Component library with Storybook",
      "TypeScript for type safety",
      "Design tokens as CSS variables",
      "Dark mode implementation",
      "Visual regression testing",
      "Documentation site"
    ],
    duration: "6-8 weeks",
    level: "Intermediate",
    mainTech: "React + Storybook + Tailwind",
    difficulty: "Challenging",
    prerequisites: ["React", "TypeScript basics", "CSS/Tailwind", "Component-driven development"],
    learningOutcomes: [
      "Bridge between design and development",
      "Storybook for component documentation",
      "CSS-in-JS and design tokens",
      "Accessibility implementation",
      "Visual regression testing with Chromatic",
      "Versioning and release strategies"
    ],
    steps: [
      "Extract design tokens from Figma",
      "Setup Storybook project",
      "Create foundation components",
      "Build form components",
      "Create layout components",
      "Implement dark mode",
      "Add accessibility features",
      "Setup Chromatic for visual testing",
      "Create documentation site",
      "Publish to npm"
    ],
    resources: [
      { name: "Build a Component Library with Storybook – Jack Herrington", url: "https://www.youtube.com/watch?v=NgkYH97Z3nk" },
      { name: "Storybook Official Docs", url: "https://storybook.js.org/docs/get-started/install" }
    ],
    videoTutorial: "https://www.youtube.com/watch?v=NgkYH97Z3nk",
    liveDemo: null,
    careerPath: "uiux",
    careerColor: "#a855f7",
    tips: ["Use design tokens from Figma plugins", "Write accessibility tests", "Version components semantically"],
    commonMistakes: ["Design-dev misalignment", "Missing accessibility", "Poor documentation"],
    estimatedHours: 80,
    totalTasks: 18
  },
  "uiux-301": {
    id: "uiux-301",
    title: "UX Metrics Dashboard",
    shortDescription: "Build analytics dashboard for UX metrics",
    description: "Create a comprehensive UX analytics dashboard that tracks user behavior, conversion funnels, and usability metrics.",
    tech: ["Figma", "Analytics", "Data Visualization", "User Testing", "Surveys"],
    toolsIcon: "📈",
    features: [
      "User behavior analytics",
      "Conversion funnel tracking",
      "Session recording integration",
      "Heatmaps and click tracking",
      "User satisfaction surveys (CSAT, NPS)",
      "Usability score dashboard",
      "Automated reporting"
    ],
    duration: "8-10 weeks",
    level: "Advanced",
    mainTech: "Figma + Analytics Tools",
    difficulty: "Expert",
    prerequisites: ["UX research experience", "Data analysis basics", "Product analytics knowledge"],
    learningOutcomes: [
      "UX metrics definition and tracking",
      "Quantitative UX research methods",
      "Funnel analysis and optimization",
      "Correlation between UX metrics and business KPIs",
      "Data-informed design decisions",
      "A/B testing methodology"
    ],
    steps: [
      "Define UX metrics framework (HEART/GSM)",
      "Setup analytics implementation",
      "Create tracking plan",
      "Design metrics dashboard",
      "Implement heatmap integration",
      "Build NPS/CSAT survey system",
      "Create session replay viewer",
      "Develop automated reports",
      "Validate metrics with user research"
    ],
    resources: [
      { name: "UX Analytics & Metrics – Nielsen Norman Group", url: null },
      { name: "Google HEART Framework Guide", url: "https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-research-on-google/" }
    ],
    videoTutorial: null,
    liveDemo: null,
    careerPath: "uiux",
    careerColor: "#a855f7",
    tips: ["Start with key metrics only", "Connect metrics to business goals", "Regularly audit metric relevance"],
    commonMistakes: ["Vanity metrics", "Not acting on insights", "Ignoring qualitative feedback"],
    estimatedHours: 100,
    totalTasks: 20
  }
};

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projectsDatabase[id] || null;
};

// Helper function to get all projects for a career path
export const getProjectsByCareer = (careerPath) => {
  return Object.values(projectsDatabase).filter(
    project => project.careerPath === careerPath
  );
};

// Helper function to get projects by career and level
export const getProjectsByCareerAndLevel = (careerPath, level) => {
  return Object.values(projectsDatabase).filter(
    project => project.careerPath === careerPath && project.level === level
  );
};