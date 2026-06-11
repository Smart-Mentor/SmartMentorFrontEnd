// careerData.js - Static career data with weekly study plans for all careers
// All days (Monday - Sunday) have proper tasks
// Extended to 4-5 weeks per career for month-long planning

export const CAREER_STUDY_PLANS = {
  // ==================== JUNIOR BACKEND .NET DEVELOPER ====================
  "Junior Backend .NET Developer": {
    title: "Junior Backend .NET Developer",
    description: "Build and maintain RESTful APIs using ASP.NET Core and SQL Server.",
    totalWeeks: 4,
    icon: "🔷",
    color: "#512BD4",
    skills: ["C#", ".NET Core", "ASP.NET Core", "SQL Server", "Entity Framework", "REST APIs", "Git"],
    weeklyPlan: {
      week1: {
        focus: "C# Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "C# Basics - Variables & Types", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Value types, reference types", resources: ["Microsoft Learn", "C# Guide"] },
              { id: "mon-2", name: "Control Flow & Loops", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "if/else, switch, for/foreach", resources: ["C# Exercises"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Methods & Parameters", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Return types, ref/out params", resources: ["Methods Guide"] },
              { id: "tue-2", name: "Method Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Write reusable functions", resources: ["Method Exercises"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Arrays & Collections", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "List, Dictionary, Array", resources: ["Collections Guide"] },
              { id: "wed-2", name: "Collection Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Manipulate data structures", resources: ["Collection Exercises"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "OOP - Classes & Objects", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Constructors, properties, fields", resources: ["OOP Guide"] },
              { id: "thu-2", name: "Build Class Library", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Create domain models", resources: ["Class Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Inheritance & Polymorphism", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Base classes, override", resources: ["Inheritance Guide"] },
              { id: "fri-2", name: "Build Console App", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete CLI application", resources: ["Console Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Interfaces & Abstract Classes", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Contracts, abstraction", resources: ["Interfaces Guide"] },
              { id: "sat-2", name: "Exception Handling", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "try/catch/finally", resources: ["Exceptions Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review & Quiz", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review C# basics", resources: ["C# Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "SQL Server & EF", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "SQL Server & Entity Framework",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "SQL Server Setup & Queries", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SELECT, INSERT, UPDATE, DELETE", resources: ["SQL Server Docs"] },
              { id: "mon-2", name: "SQL Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Write complex queries", resources: ["SQL Exercises"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "JOINs & Subqueries", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "INNER, LEFT, RIGHT JOINs", resources: ["JOIN Guide"] },
              { id: "tue-2", name: "JOIN Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Multi-table queries", resources: ["JOIN Exercises"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Entity Framework Core", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Code First, DbContext", resources: ["EF Core Guide"] },
              { id: "wed-2", name: "Create Database Models", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Entity relationships", resources: ["EF Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "LINQ Queries", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Query syntax, method syntax", resources: ["LINQ Guide"] },
              { id: "thu-2", name: "LINQ Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Filter, sort, group data", resources: ["LINQ Exercises"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Migrations", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Add-Migration, Update-Database", resources: ["Migrations Guide"] },
              { id: "fri-2", name: "Database Project", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete DB schema", resources: ["DB Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Stored Procedures", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Create and execute SPs", resources: ["SP Guide"] },
              { id: "sat-2", name: "Indexes & Performance", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Query optimization", resources: ["Performance Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review SQL/EF", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "ASP.NET Core", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "ASP.NET Core Web API",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "ASP.NET Core Setup", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Create Web API project", resources: ["ASP.NET Core Docs"] },
              { id: "mon-2", name: "Controllers & Routing", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "API endpoints, attributes", resources: ["Controllers Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "REST API Design", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "GET, POST, PUT, DELETE", resources: ["REST Guide"] },
              { id: "tue-2", name: "Build CRUD API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Complete CRUD operations", resources: ["CRUD Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Dependency Injection", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Services, lifetimes", resources: ["DI Guide"] },
              { id: "wed-2", name: "Implement Repository Pattern", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Separation of concerns", resources: ["Repository Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Model Validation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Data annotations, FluentValidation", resources: ["Validation Guide"] },
              { id: "thu-2", name: "Error Handling", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Global exception handling", resources: ["Error Guide"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Authentication & JWT", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Identity, JWT bearer", resources: ["Auth Guide"] },
              { id: "fri-2", name: "Build Full API", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete Web API", resources: ["API Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "API Documentation (Swagger)", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "OpenAPI, Swagger UI", resources: ["Swagger Guide"] },
              { id: "sat-2", name: "Testing APIs (Postman)", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Integration testing", resources: ["Postman Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review ASP.NET Core", resources: ["Week Summary"] },
              { id: "sun-2", name: "Portfolio Building", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Plan final project", resources: [] }
            ]
          }
        }
      },
      week4: {
        focus: "Final Project & Deployment",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Project Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "N-tier, Clean Architecture", resources: ["Architecture Guide"] },
              { id: "mon-2", name: "Setup Project Structure", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Organize solution", resources: ["Structure Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Implement Business Logic", time: "09:00 - 11:00", duration: "2h", type: "practice", priority: "high", notes: "Service layer implementation", resources: [] },
              { id: "tue-2", name: "Data Access Layer", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Repository + UnitOfWork", resources: [] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "API Endpoints", time: "09:00 - 11:00", duration: "2h", type: "practice", priority: "high", notes: "Complete all endpoints", resources: [] },
              { id: "wed-2", name: "DTOs & AutoMapper", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Map entities to DTOs", resources: ["AutoMapper Guide"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Authentication Setup", time: "09:00 - 11:00", duration: "2h", type: "practice", priority: "high", notes: "JWT authentication", resources: [] },
              { id: "thu-2", name: "Authorization", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Role-based authorization", resources: [] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Deployment to Azure", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Azure App Service", resources: ["Azure Deployment"] },
              { id: "fri-2", name: "Deploy API", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Live deployment", resources: ["Deploy Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Code Review & Refactoring", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Clean up code", resources: [] },
              { id: "sat-2", name: "Write Documentation", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "API documentation", resources: [] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review & Quiz", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete .NET review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Job Search Prep", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Resume, portfolio", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== FULL-STACK .NET DEVELOPER ====================
  "Full-Stack .NET Developer": {
    title: "Full-Stack .NET Developer",
    description: "Develop complete web applications using ASP.NET Core and React.js.",
    totalWeeks: 4,
    icon: "🌐",
    color: "#512BD4",
    skills: ["C#", "ASP.NET Core", "React.js", "SQL Server", "Entity Framework", "TypeScript", "REST APIs", "Git"],
    weeklyPlan: {
      week1: {
        focus: "C# & .NET Core Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "C# Basics & OOP", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Classes, inheritance, polymorphism", resources: ["Microsoft Learn", "C# Guide"] },
              { id: "mon-2", name: "C# Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Build class hierarchy", resources: ["C# Exercises"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "LINQ & Collections", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Query syntax, method syntax", resources: ["LINQ Guide"] },
              { id: "tue-2", name: "LINQ Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Data manipulation", resources: ["LINQ Exercises"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "ASP.NET Core Setup", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Web API project structure", resources: ["ASP.NET Docs"] },
              { id: "wed-2", name: "Build Basic API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Create endpoints", resources: ["API Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Dependency Injection", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Services, lifetimes", resources: ["DI Guide"] },
              { id: "thu-2", name: "Implement Services", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Business logic layer", resources: ["Service Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Entity Framework Core", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Code First, migrations", resources: ["EF Core Guide"] },
              { id: "fri-2", name: "Database Integration", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Connect API to DB", resources: ["DB Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "React Basics", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Components, JSX, props", resources: ["React Docs"] },
              { id: "sat-2", name: "React State (useState)", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Interactive components", resources: ["State Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review .NET backend", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Frontend with React", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "React Frontend Development",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "React Components Deep Dive", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Functional components, hooks", resources: ["Components Guide"] },
              { id: "mon-2", name: "Build Component Library", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Reusable UI components", resources: ["Component Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "useEffect & API Calls", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Side effects, data fetching", resources: ["useEffect Guide"] },
              { id: "tue-2", name: "Connect to .NET API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Fetch and display data", resources: ["API Integration"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "React Router", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Navigation, routing", resources: ["React Router"] },
              { id: "wed-2", name: "Build Multi-page App", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Page navigation", resources: ["Router Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Forms & Validation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "React Hook Form", resources: ["Form Guide"] },
              { id: "thu-2", name: "Build Contact Form", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "POST to API", resources: ["Form Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "State Management (Context)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Global state, Context API", resources: ["Context Guide"] },
              { id: "fri-2", name: "Implement Theme/User Context", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Global state management", resources: ["Context Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "TailwindCSS Styling", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Utility-first CSS", resources: ["Tailwind Docs"] },
              { id: "sat-2", name: "Style Application", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Responsive design", resources: ["Styling Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review React frontend", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Full-stack integration", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Full-Stack Integration",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "CORS & API Security", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Cross-origin requests", resources: ["CORS Guide"] },
              { id: "mon-2", name: "Secure API Endpoints", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "JWT authentication", resources: ["Security Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Authentication Flow", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Login, register, tokens", resources: ["Auth Flow Guide"] },
              { id: "tue-2", name: "Implement Auth in React", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Protected routes", resources: ["Auth Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "CRUD Operations", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Complete CRUD from UI", resources: ["CRUD Guide"] },
              { id: "wed-2", name: "Build Data Grid", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Display, edit, delete", resources: ["Grid Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Error Handling", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Global error handling", resources: ["Error Guide"] },
              { id: "thu-2", name: "Loading States & UX", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Skeletons, spinners", resources: ["UX Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Full-stack Project - Setup", time: "09:00 - 11:00", duration: "2h", type: "project", priority: "high", notes: "Project structure", resources: [] },
              { id: "fri-2", name: "Build Backend API", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete API endpoints", resources: [] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Build Frontend UI", time: "10:00 - 12:00", duration: "2h", type: "project", priority: "medium", notes: "React components", resources: [] },
              { id: "sat-2", name: "Integrate Frontend & Backend", time: "14:00 - 16:00", duration: "2h", type: "project", priority: "medium", notes: "Connect to API", resources: [] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review full-stack integration", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Deployment", resources: [] }
            ]
          }
        }
      },
      week4: {
        focus: "Deployment & Portfolio",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Deploy API to Azure", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Azure App Service", resources: ["Azure Guide"] },
              { id: "mon-2", name: "Deploy React to Vercel/Netlify", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Frontend hosting", resources: ["Deploy Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Environment Variables", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Configuration management", resources: ["Env Guide"] },
              { id: "tue-2", name: "Configure Production Settings", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Connection strings, secrets", resources: ["Config Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Complete Final Project", time: "09:00 - 11:00", duration: "2h", type: "project", priority: "high", notes: "Polish features", resources: [] },
              { id: "wed-2", name: "Testing & Bug Fixes", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "End-to-end testing", resources: [] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Write Documentation", time: "09:00 - 11:00", duration: "2h", type: "practice", priority: "high", notes: "README, API docs", resources: [] },
              { id: "thu-2", name: "Code Review & Refactor", time: "14:00 - 16:00", duration: "2h", type: "review", priority: "high", notes: "Clean up code", resources: [] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Portfolio Building", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Showcase projects", resources: ["Portfolio Guide"] },
              { id: "fri-2", name: "Create Portfolio Site", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Personal portfolio", resources: ["Portfolio Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Resume & LinkedIn", time: "10:00 - 12:00", duration: "2h", type: "career", priority: "medium", notes: "Update professional profiles", resources: ["Resume Guide"] },
              { id: "sat-2", name: "Mock Interviews", time: "14:00 - 16:00", duration: "2h", type: "career", priority: "medium", notes: "Technical interview prep", resources: ["Interview Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete full-stack review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Job Search Strategy", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Apply for jobs", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== FRONTEND REACT DEVELOPER ====================
  "Frontend React Developer": {
    title: "Frontend React Developer",
    description: "Create responsive and interactive user interfaces using React and modern JavaScript.",
    totalWeeks: 4,
    icon: "🎨",
    color: "#61DAFB",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "TypeScript", "Next.js", "TailwindCSS", "Redux", "Git"],
    weeklyPlan: {
      week1: {
        focus: "HTML5, CSS3 & JavaScript Moderno",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "HTML5 Semántico y Accesibilidad", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SEO, aria labels, estructura", resources: ["MDN Web Docs", "W3Schools"] },
              { id: "mon-2", name: "CSS Moderno - Flexbox y Grid", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Layouts responsive", resources: ["CSS Tricks"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "JavaScript ES6+", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Arrow functions, destructuring, spread/rest", resources: ["JavaScript.info"] },
              { id: "tue-2", name: "Manejo de Arrays", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "map, filter, reduce", resources: ["Array Exercises"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Async JavaScript", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Promises, async/await, fetch", resources: ["Async Guide"] },
              { id: "wed-2", name: "Consumir APIs", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Fetch y manejo de errores", resources: ["API Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Responsive Design", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Media queries, mobile-first", resources: ["Responsive Guide"] },
              { id: "thu-2", name: "CSS Animations", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Transitions, keyframes", resources: ["Animations Guide"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "DOM Manipulation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Eventos, creación dinámica", resources: ["DOM Guide"] },
              { id: "fri-2", name: "Build Interactive Website", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Proyecto integrador", resources: ["Final Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Git y GitHub", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Control de versiones", resources: ["Git Guide"] },
              { id: "sat-2", name: "Deploy a GitHub Pages", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Publicar sitio", resources: ["Deploy Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Repaso general", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "React Fundamentals", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "React Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "React Setup & JSX", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Create React App, Vite", resources: ["React Docs"] },
              { id: "mon-2", name: "Componentes y Props", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Componentes funcionales", resources: ["Components Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "useState Hook", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Estado local", resources: ["useState Guide"] },
              { id: "tue-2", name: "Build Counter y TodoInput", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Interactividad básica", resources: ["State Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "useEffect", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Efectos secundarios", resources: ["useEffect Guide"] },
              { id: "wed-2", name: "Fetch de API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Mostrar datos externos", resources: ["Fetch Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Rendering de Listas", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "map(), keys", resources: ["Lists Guide"] },
              { id: "thu-2", name: "Build Todo List", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "CRUD de tareas", resources: ["Todo Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Formularios Controlados", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Manejo de inputs", resources: ["Forms Guide"] },
              { id: "fri-2", name: "Build Contact Form", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Validación básica", resources: ["Form Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Conditional Rendering", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "if, &&, ternary", resources: ["Conditional Guide"] },
              { id: "sat-2", name: "Estilos en React", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "CSS Modules, styled-components", resources: ["Styling Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Repaso React", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Advanced React", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Advanced React & State Management",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Context API", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Estado global", resources: ["Context Guide"] },
              { id: "mon-2", name: "Tema Oscuro/Claro", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Theme provider", resources: ["Theme Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "React Router", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Navegación SPA", resources: ["React Router"] },
              { id: "tue-2", name: "Multi-page App", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Rutas y links", resources: ["Router Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Custom Hooks", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Reutilizar lógica", resources: ["Custom Hooks"] },
              { id: "wed-2", name: "useLocalStorage Hook", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Persistir datos", resources: ["Hook Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Redux Toolkit", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Estado global avanzado", resources: ["Redux Toolkit"] },
              { id: "thu-2", name: "Shopping Cart", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Carrito de compras", resources: ["Cart Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "React Query", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Caché de datos", resources: ["React Query"] },
              { id: "fri-2", name: "Optimización de API Calls", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Mejorar rendimiento", resources: ["Query Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Testing con Jest", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Pruebas unitarias", resources: ["Testing Guide"] },
              { id: "sat-2", name: "React Testing Library", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Test de componentes", resources: ["RTL Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Repaso avanzado", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "TypeScript & Next.js", resources: [] }
            ]
          }
        }
      },
      week4: {
        focus: "TypeScript & Next.js",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "TypeScript Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Tipos, interfaces", resources: ["TypeScript Handbook"] },
              { id: "mon-2", name: "Tipado en React", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Props y estados tipados", resources: ["TS React"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Next.js Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pages, routing", resources: ["Next.js Docs"] },
              { id: "tue-2", name: "Build Next.js App", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Primer proyecto", resources: ["Next Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "SSR y SSG", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "getServerSideProps, getStaticProps", resources: ["SSR Guide"] },
              { id: "wed-2", name: "Blog Estático", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Markdown blog", resources: ["Blog Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "API Routes", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Backend en Next.js", resources: ["API Routes Guide"] },
              { id: "thu-2", name: "Build API en Next", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Endpoints propios", resources: ["API Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "TailwindCSS", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Utilidades CSS", resources: ["Tailwind Docs"] },
              { id: "fri-2", name: "Build Portfolio", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Portafolio profesional", resources: ["Portfolio Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Deployment", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Vercel, Netlify", resources: ["Deploy Guide"] },
              { id: "sat-2", name: "Deploy Portfolio", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Publicar proyecto", resources: ["Vercel Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Preparación para entrevistas", resources: ["Interview Prep"] },
              { id: "sun-2", name: "Plan de Búsqueda", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "LinkedIn, portfolio", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== DATA ANALYST ====================
  "Data Analyst": {
    title: "Data Analyst",
    description: "Analyze datasets, generate insights, and build dashboards using Python and SQL.",
    totalWeeks: 3,
    icon: "📈",
    color: "#4CAF50",
    skills: ["Python", "Pandas", "SQL", "Data Visualization", "Excel", "Statistics", "Tableau/Power BI"],
    weeklyPlan: {
      week1: {
        focus: "Python Fundamentals for Data Analysis",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Python Basics for Data", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Variables, types, lists", resources: ["Python.org", "DataCamp"] },
              { id: "mon-2", name: "Control Flow & Functions", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Loops, conditionals, functions", resources: ["Python Exercises"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "NumPy Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Arrays, operations", resources: ["NumPy Guide"] },
              { id: "tue-2", name: "NumPy Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Mathematical operations", resources: ["NumPy Exercises"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Pandas Series & DataFrames", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Data structures", resources: ["Pandas Guide"] },
              { id: "wed-2", name: "Load & Explore Data", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "read_csv, head, info, describe", resources: ["Pandas Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Data Cleaning", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Missing values, duplicates", resources: ["Cleaning Guide"] },
              { id: "thu-2", name: "Clean Real Dataset", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Kaggle dataset", resources: ["Cleaning Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Data Filtering & Grouping", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "loc, iloc, groupby", resources: ["Filtering Guide"] },
              { id: "fri-2", name: "Analyze Dataset", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Basic analysis report", resources: ["Analysis Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "SQL Basics", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "SELECT, WHERE, ORDER BY", resources: ["SQL Tutorial"] },
              { id: "sat-2", name: "SQL Joins", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "INNER, LEFT JOIN", resources: ["SQL Exercises"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Python & Pandas", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Visualization & Stats", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Data Visualization & Statistics",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Matplotlib Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Line plots, bar charts", resources: ["Matplotlib Guide"] },
              { id: "mon-2", name: "Create Charts", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Customize plots", resources: ["Plot Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Seaborn for Statistics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Statistical visualizations", resources: ["Seaborn Guide"] },
              { id: "tue-2", name: "Heatmaps & Pairplots", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Correlation analysis", resources: ["Seaborn Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Descriptive Statistics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Mean, median, mode, std", resources: ["Statistics Guide"] },
              { id: "wed-2", name: "Calculate Statistics", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Analyze distribution", resources: ["Stats Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Exploratory Data Analysis (EDA)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "EDA process", resources: ["EDA Guide"] },
              { id: "thu-2", name: "Perform EDA", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Complete analysis", resources: ["EDA Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Advanced SQL", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Subqueries, window functions", resources: ["Advanced SQL"] },
              { id: "fri-2", name: "SQL Analysis", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Data extraction", resources: ["SQL Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Excel for Data Analysis", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Pivot tables, formulas", resources: ["Excel Guide"] },
              { id: "sat-2", name: "Excel Dashboard", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Create dashboard", resources: ["Excel Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Stats & Viz", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Business Intelligence", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Business Intelligence & Dashboarding",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Tableau Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Connections, worksheets", resources: ["Tableau Tutorial"] },
              { id: "mon-2", name: "Create Visualizations", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Bar, line, scatter", resources: ["Tableau Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Tableau Dashboards", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Interactive dashboards", resources: ["Dashboard Guide"] },
              { id: "tue-2", name: "Build Dashboard", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sales dashboard", resources: ["Dashboard Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Power BI Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Power Query, DAX", resources: ["Power BI Docs"] },
              { id: "wed-2", name: "Load & Transform Data", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Data modeling", resources: ["Power BI Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Power BI Reports", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Reports & sharing", resources: ["Reports Guide"] },
              { id: "thu-2", name: "Create Power BI Dashboard", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Complete dashboard", resources: ["BI Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Storytelling with Data", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Presentation skills", resources: ["Storytelling Guide"] },
              { id: "fri-2", name: "Final Project - EDA to Dashboard", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete analysis + dashboard", resources: ["Final Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Portfolio Building", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Showcase projects", resources: ["Portfolio Guide"] },
              { id: "sat-2", name: "Create Portfolio", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "GitHub portfolio", resources: [] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Job Search Prep", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Resume & LinkedIn", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== MACHINE LEARNING ENGINEER ====================
  "Machine Learning Engineer": {
    title: "Machine Learning Engineer",
    description: "Develop predictive models and AI solutions using Python and ML frameworks.",
    totalWeeks: 3,
    icon: "🧠",
    color: "#9C27B0",
    skills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn", "SQL", "MLOps"],
    weeklyPlan: {
      week1: {
        focus: "Python for ML & Data Processing",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Python Review for ML", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "NumPy, Pandas basics", resources: ["Python ML Guide"] },
              { id: "mon-2", name: "Data Manipulation Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Pandas operations", resources: ["Pandas Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Data Preprocessing", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Scaling, encoding, imputation", resources: ["Preprocessing Guide"] },
              { id: "tue-2", name: "Preprocess Dataset", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Clean real data", resources: ["Preprocessing Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Scikit-learn Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Models, pipelines", resources: ["Scikit-learn Docs"] },
              { id: "wed-2", name: "Train First Model", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Linear regression", resources: ["ML Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Supervised Learning", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Regression & classification", resources: ["Supervised Guide"] },
              { id: "thu-2", name: "Compare Models", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Decision Tree, SVM", resources: ["Model Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Model Evaluation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Metrics, cross-validation", resources: ["Evaluation Guide"] },
              { id: "fri-2", name: "Evaluate Models", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "ML project", resources: ["ML Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Unsupervised Learning", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Clustering, PCA", resources: ["Unsupervised Guide"] },
              { id: "sat-2", name: "K-Means Clustering", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Customer segmentation", resources: ["Clustering Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review ML basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Deep Learning", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Deep Learning with TensorFlow",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Neural Networks Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Perceptron, activation", resources: ["NN Guide"] },
              { id: "mon-2", name: "TensorFlow 2.0", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Build first NN", resources: ["TF Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "CNNs for Image Classification", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Convolutional layers", resources: ["CNN Guide"] },
              { id: "tue-2", name: "Build CNN", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "MNIST classifier", resources: ["CNN Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "RNNs & LSTMs", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Sequence models", resources: ["RNN Guide"] },
              { id: "wed-2", name: "Time Series Prediction", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Stock prediction", resources: ["RNN Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Transfer Learning", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pre-trained models", resources: ["Transfer Learning"] },
              { id: "thu-2", name: "Fine-tune Model", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "ImageNet models", resources: ["Transfer Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "NLP Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Tokenization, embeddings", resources: ["NLP Guide"] },
              { id: "fri-2", name: "Sentiment Analysis", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Text classification", resources: ["NLP Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "PyTorch Basics", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Tensors, autograd", resources: ["PyTorch Docs"] },
              { id: "sat-2", name: "Build Model in PyTorch", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Neural network", resources: ["PyTorch Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Deep Learning", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "MLOps", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "MLOps & Deployment",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Model Serialization", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Save & load models", resources: ["Serialization Guide"] },
              { id: "mon-2", name: "MLflow Basics", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Experiment tracking", resources: ["MLflow Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Model Deployment with FastAPI", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "REST API for model", resources: ["FastAPI Guide"] },
              { id: "tue-2", name: "Deploy Model as API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Prediction endpoint", resources: ["Deploy Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Docker for ML", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Containerize models", resources: ["Docker ML Guide"] },
              { id: "wed-2", name: "Containerize API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Dockerfile", resources: ["Docker Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Cloud Deployment (AWS/GCP)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SageMaker, Vertex AI", resources: ["Cloud ML Guide"] },
              { id: "thu-2", name: "Deploy to Cloud", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Cloud deployment", resources: ["Cloud Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "ML Pipeline Automation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "CI/CD for ML", resources: ["MLOps Guide"] },
              { id: "fri-2", name: "Final ML Project", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "End-to-end ML system", resources: ["Final Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Model Monitoring", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Drift detection", resources: ["Monitoring Guide"] },
              { id: "sat-2", name: "Portfolio Building", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Showcase projects", resources: ["Portfolio Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete ML review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Interview Prep", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "ML interview questions", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== CLOUD ENGINEER (AZURE) ====================
  "Cloud Engineer (Azure)": {
    title: "Cloud Engineer (Azure)",
    description: "Design and deploy scalable applications on Microsoft Azure.",
    totalWeeks: 3,
    icon: "☁️",
    color: "#0078D4",
    skills: ["Azure", "Infrastructure as Code", "Docker", "Kubernetes", "DevOps", "Networking", "Security"],
    weeklyPlan: {
      week1: {
        focus: "Azure Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Azure Portal & Subscriptions", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Azure account, resource groups", resources: ["Azure Docs", "Microsoft Learn"] },
              { id: "mon-2", name: "Azure CLI & PowerShell", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Command line tools", resources: ["Azure CLI Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Virtual Machines (VMs)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Provision VMs", resources: ["VM Guide"] },
              { id: "tue-2", name: "Deploy Web Server on VM", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "IIS/Apache setup", resources: ["VM Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Azure Storage", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Blob, Queue, Table", resources: ["Storage Guide"] },
              { id: "wed-2", name: "Upload/Download Files", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Blob storage operations", resources: ["Storage Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Azure Networking", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "VNet, subnets, NSG", resources: ["Networking Guide"] },
              { id: "thu-2", name: "Build Custom VNet", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Secure networking", resources: ["VNet Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Azure App Services", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Web Apps, API Apps", resources: ["App Service Guide"] },
              { id: "fri-2", name: "Deploy App to App Service", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Full deployment", resources: ["App Service Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Azure SQL Database", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Managed database", resources: ["SQL DB Guide"] },
              { id: "sat-2", name: "Connect App to DB", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Integration", resources: ["DB Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Azure basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Advanced Azure", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Containers & Orchestration on Azure",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Azure Container Instances (ACI)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Run containers", resources: ["ACI Guide"] },
              { id: "mon-2", name: "Deploy Container to ACI", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Docker + ACI", resources: ["ACI Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Azure Kubernetes Service (AKS)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Managed K8s", resources: ["AKS Guide"] },
              { id: "tue-2", name: "Deploy to AKS", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "K8s deployment", resources: ["AKS Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Azure DevOps", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "CI/CD pipelines", resources: ["DevOps Guide"] },
              { id: "wed-2", name: "Build Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Automated deployment", resources: ["Pipeline Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Infrastructure as Code - ARM", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ARM templates", resources: ["ARM Guide"] },
              { id: "thu-2", name: "Write ARM Template", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Deploy infrastructure", resources: ["ARM Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Terraform on Azure", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Terraform with Azure", resources: ["Terraform Azure"] },
              { id: "fri-2", name: "Terraform Project", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete IaC", resources: ["Terraform Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Azure Monitor & Logging", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Monitoring, alerts", resources: ["Monitor Guide"] },
              { id: "sat-2", name: "Setup Monitoring", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Log Analytics", resources: ["Monitor Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Azure services", resources: ["Week Summary"] },
              { id: "sun-2", name: "Certification Prep", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "AZ-900/AZ-104", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Security & Advanced Topics",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Azure Active Directory", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Identity management", resources: ["AAD Guide"] },
              { id: "mon-2", name: "Configure SSO", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Authentication", resources: ["SSO Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Azure Key Vault", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Secrets management", resources: ["Key Vault Guide"] },
              { id: "tue-2", name: "Secure Secrets", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Integrate Key Vault", resources: ["Key Vault Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Azure Functions (Serverless)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Event-driven computing", resources: ["Functions Guide"] },
              { id: "wed-2", name: "Build Serverless API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "HTTP trigger", resources: ["Functions Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Azure Logic Apps", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Workflow automation", resources: ["Logic Apps Guide"] },
              { id: "thu-2", name: "Create Workflow", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Automate process", resources: ["Logic Apps Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Cost Management", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pricing calculator", resources: ["Cost Guide"] },
              { id: "fri-2", name: "Final Project", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete Azure solution", resources: ["Final Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Best Practices & Architecture", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Well-Architected Framework", resources: ["Architecture Guide"] },
              { id: "sat-2", name: "Portfolio Building", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Showcase projects", resources: [] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete Azure review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Certification Plan", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "AZ-104 or AZ-400", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== DEVOPS ENGINEER ====================
  "DevOps Engineer": {
    title: "DevOps Engineer",
    description: "Automate deployments and manage CI/CD pipelines using Docker and cloud tools.",
    totalWeeks: 4,
    icon: "⚙️",
    color: "#F59E0B",
    skills: ["Linux", "Docker", "Kubernetes", "Jenkins/GitHub Actions", "Terraform", "AWS/Azure", "Prometheus", "Git"],
    weeklyPlan: {
      week1: {
        focus: "Linux & Git Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Linux Commands & File System", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Basic Linux commands, file system navigation", resources: ["Linux Guide", "Linux Journey"] },
              { id: "mon-2", name: "File Permissions & Users", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "chmod, chown, user management", resources: ["Permissions Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Shell Scripting Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Bash scripts, variables, loops", resources: ["Bash Tutorial"] },
              { id: "tue-2", name: "Write Shell Scripts", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Automate tasks with bash", resources: ["Scripting Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Git Version Control", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Git commands, branching strategies", resources: ["Git Guide", "GitHub"] },
              { id: "wed-2", name: "Git Workflow Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Branch, merge, rebase, PRs", resources: ["Git Exercises"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "GitHub Actions", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "CI/CD with GitHub", resources: ["GitHub Actions"] },
              { id: "thu-2", name: "Setup CI Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Automated testing", resources: ["CI/CD Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Process Management", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ps, top, kill, systemd", resources: ["Process Guide"] },
              { id: "fri-2", name: "Network Configuration", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "netstat, ssh, firewall", resources: ["Network Guide"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Package Management", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "apt, yum, npm, pip", resources: ["Package Guide"] },
              { id: "sat-2", name: "System Monitoring", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "htop, iostat, df", resources: ["Monitoring Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review & Practice", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Linux & Git", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Docker containers", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Docker & Containerization",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Docker - Containers & Images", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Docker basics, containers vs VMs", resources: ["Docker Docs"] },
              { id: "mon-2", name: "Docker Commands", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "docker run, ps, stop, rm", resources: ["Docker Commands"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Dockerfile", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Create custom images", resources: ["Dockerfile Guide"] },
              { id: "tue-2", name: "Build Docker Images", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Dockerize applications", resources: ["Image Building"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Docker Compose", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Multi-container applications", resources: ["Compose Guide"] },
              { id: "wed-2", name: "Docker Compose Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Set up app stack", resources: ["Compose Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Docker Networking", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Container communication", resources: ["Networking Guide"] },
              { id: "thu-2", name: "Docker Volumes", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Persistent data", resources: ["Volumes Guide"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Docker Registry & Hub", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Push/pull images", resources: ["Registry Guide"] },
              { id: "fri-2", name: "Dockerize Full Stack App", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete containerization", resources: ["Docker Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Docker Best Practices", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Optimization, security", resources: ["Best Practices"] },
              { id: "sat-2", name: "Docker Review & Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Complete exercises", resources: ["Practice Problems"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review & Quiz", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Docker concepts", resources: ["Docker Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Kubernetes", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Kubernetes & Orchestration",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Kubernetes Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pods, nodes, clusters", resources: ["K8s Docs"] },
              { id: "mon-2", name: "kubectl Commands", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "kubectl get, describe, logs", resources: ["kubectl Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Pods & Deployments", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Create and manage pods", resources: ["Deployment Guide"] },
              { id: "tue-2", name: "Deploy App to K8s", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "YAML manifests", resources: ["Deploy Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Services & Networking", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ClusterIP, NodePort, LoadBalancer", resources: ["Services Guide"] },
              { id: "wed-2", name: "Expose Applications", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Create services", resources: ["Networking Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "ConfigMaps & Secrets", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Manage configuration", resources: ["Config Guide"] },
              { id: "thu-2", name: "Use Secrets", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Secure configuration", resources: ["Secrets Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Ingress Controllers", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "HTTP routing", resources: ["Ingress Guide"] },
              { id: "fri-2", name: "Setup Ingress", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Configure Nginx Ingress", resources: ["Ingress Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Helm Charts", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Package manager for K8s", resources: ["Helm Guide"] },
              { id: "sat-2", name: "Create Helm Chart", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Template your app", resources: ["Helm Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review K8s concepts", resources: ["K8s Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Cloud & IaC", resources: [] }
            ]
          }
        }
      },
      week4: {
        focus: "AWS Cloud & Infrastructure as Code",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "AWS Core Services", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "EC2, S3, VPC, IAM", resources: ["AWS Docs"] },
              { id: "mon-2", name: "Launch EC2 Instance", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Configure security groups", resources: ["EC2 Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Terraform Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "HCL, providers, resources", resources: ["Terraform Docs"] },
              { id: "tue-2", name: "Write Terraform Config", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Create EC2 with Terraform", resources: ["Terraform Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Terraform State", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "State management, backends", resources: ["State Guide"] },
              { id: "wed-2", name: "Remote State", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "S3 backend", resources: ["Remote State"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "CI/CD with Jenkins", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pipeline as Code", resources: ["Jenkins Guide"] },
              { id: "thu-2", name: "Build Jenkins Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Automated build/deploy", resources: ["Jenkins Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Monitoring with Prometheus", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Metrics collection", resources: ["Prometheus Guide"] },
              { id: "fri-2", name: "Setup Monitoring Stack", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Prometheus + Grafana", resources: ["Monitoring Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Logging with ELK", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Elasticsearch, Logstash, Kibana", resources: ["ELK Guide"] },
              { id: "sat-2", name: "Centralized Logging", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Aggregate logs", resources: ["Logging Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review DevOps tools", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Advanced topics", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== CYBERSECURITY ANALYST ====================
  "Cybersecurity Analyst": {
    title: "Cybersecurity Analyst",
    description: "Secure applications and infrastructure by applying modern security practices.",
    totalWeeks: 3,
    icon: "🛡️",
    color: "#EF4444",
    skills: ["Network Security", "Linux", "Python", "Security Tools", "Risk Assessment", "Incident Response"],
    weeklyPlan: {
      week1: {
        focus: "Network Security Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Network Protocols & OSI Model", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "TCP/IP, UDP, HTTP/HTTPS", resources: ["Network Guide"] },
              { id: "mon-2", name: "Wireshark Basics", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Packet analysis", resources: ["Wireshark Tutorial"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Firewalls & IDS/IPS", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Security devices", resources: ["Firewall Guide"] },
              { id: "tue-2", name: "Configure Firewall Rules", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "iptables, ufw", resources: ["Firewall Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "VPN & Encryption", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "IPsec, SSL/TLS", resources: ["VPN Guide"] },
              { id: "wed-2", name: "Setup VPN Server", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "OpenVPN configuration", resources: ["VPN Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Network Scanning", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Nmap, vulnerability scanning", resources: ["Nmap Guide"] },
              { id: "thu-2", name: "Nmap Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Port scanning, OS detection", resources: ["Nmap Exercises"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Security Auditing", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Security assessment", resources: ["Auditing Guide"] },
              { id: "fri-2", name: "Conduct Security Audit", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Network vulnerability assessment", resources: ["Audit Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Security Monitoring", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Log analysis, SIEM", resources: ["Monitoring Guide"] },
              { id: "sat-2", name: "Setup Monitoring Tools", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "ELK stack basics", resources: ["Monitoring Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review & Quiz", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review network security", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Cryptography", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Cryptography & Web Security",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Symmetric Encryption", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "AES, DES", resources: ["Encryption Guide"] },
              { id: "mon-2", name: "Implement AES", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Encrypt/decrypt files", resources: ["Crypto Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Asymmetric Encryption", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "RSA, ECC", resources: ["RSA Guide"] },
              { id: "tue-2", name: "Digital Signatures", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sign and verify", resources: ["Signature Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Hashing & Salting", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SHA, bcrypt", resources: ["Hashing Guide"] },
              { id: "wed-2", name: "Password Storage", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Hash passwords", resources: ["Hashing Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "OWASP Top 10", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Web vulnerabilities", resources: ["OWASP Guide"] },
              { id: "thu-2", name: "SQL Injection Demo", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Prevent SQLi", resources: ["SQLi Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "XSS & CSRF", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Cross-site scripting", resources: ["XSS Guide"] },
              { id: "fri-2", name: "Secure Web App", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Implement security headers", resources: ["Security Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Penetration Testing", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Metasploit", resources: ["Pentest Guide"] },
              { id: "sat-2", name: "Run Pentest", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Vulnerability scanning", resources: ["Pentest Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review cryptography", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Incident Response", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Incident Response & Compliance",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Incident Response Lifecycle", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Detection, containment, recovery", resources: ["IR Guide"] },
              { id: "mon-2", name: "Create IR Plan", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Document procedures", resources: ["IR Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Security Frameworks (NIST, ISO)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Compliance standards", resources: ["Framework Guide"] },
              { id: "tue-2", name: "Risk Assessment", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Identify threats", resources: ["Risk Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Security Awareness Training", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Social engineering, phishing", resources: ["Awareness Guide"] },
              { id: "wed-2", name: "Phishing Simulation", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Test campaign", resources: ["Simulation Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Security Tools", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Snort, Suricata, OSSEC", resources: ["Tools Guide"] },
              { id: "thu-2", name: "Configure IDS", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Setup Snort", resources: ["IDS Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Python for Security", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Security scripting", resources: ["Python Security"] },
              { id: "fri-2", name: "Build Security Script", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Automated scanner", resources: ["Script Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Compliance (GDPR, HIPAA)", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Regulations", resources: ["Compliance Guide"] },
              { id: "sat-2", name: "Security Documentation", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Policies", resources: ["Documentation Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete security review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Certification Plan", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Security+ or CEH", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== SENIOR BACKEND .NET DEVELOPER ====================
  "Senior Backend .NET Developer": {
    title: "Senior Backend .NET Developer",
    description: "Lead backend architecture, mentor juniors, and design scalable distributed systems.",
    totalWeeks: 3,
    icon: "🏆",
    color: "#512BD4",
    skills: ["C#", ".NET Core", "Microservices", "Message Queues", "Redis", "MongoDB", "Docker", "Kubernetes", "Azure"],
    weeklyPlan: {
      week1: {
        focus: "Advanced C# & .NET Core",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Advanced C# Features", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Async/await, LINQ, delegates", resources: ["Advanced C# Guide"] },
              { id: "mon-2", name: "Generics & Reflection", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Type safety, metadata", resources: ["Generics Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Performance Optimization", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Memory management, profiling", resources: ["Performance Guide"] },
              { id: "tue-2", name: "Benchmarking", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "BenchmarkDotNet", resources: ["Benchmark Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Design Patterns in .NET", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Repository, CQRS, Mediator", resources: ["Patterns Guide"] },
              { id: "wed-2", name: "Implement Patterns", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "MediatR library", resources: ["Patterns Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Dependency Injection Deep Dive", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Scopes, lifetimes", resources: ["DI Advanced"] },
              { id: "thu-2", name: "Custom DI Container", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Advanced configuration", resources: ["DI Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Testing Strategies", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Unit, integration, E2E", resources: ["Testing Guide"] },
              { id: "fri-2", name: "Mocking & Test Containers", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Moq, Testcontainers", resources: ["Test Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Logging & Monitoring", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Serilog, Application Insights", resources: ["Logging Guide"] },
              { id: "sat-2", name: "Setup Structured Logging", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Serilog + Seq", resources: ["Logging Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review advanced C#", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Microservices", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Microservices Architecture",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Microservices Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Domain-driven design", resources: ["Microservices Guide"] },
              { id: "mon-2", name: "Service Boundaries", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Define services", resources: ["DDD Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Message Queues (RabbitMQ)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pub/sub, event-driven", resources: ["RabbitMQ Guide"] },
              { id: "tue-2", name: "Implement Event Bus", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "MassTransit", resources: ["Event Bus Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "API Gateway (Ocelot)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Routing, aggregation", resources: ["Ocelot Guide"] },
              { id: "wed-2", name: "Setup API Gateway", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Configure routes", resources: ["Gateway Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Service Discovery (Consul)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Dynamic service location", resources: ["Consul Guide"] },
              { id: "thu-2", name: "Register Services", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Consul + .NET", resources: ["Discovery Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Distributed Transactions", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Saga pattern", resources: ["Saga Guide"] },
              { id: "fri-2", name: "Implement Saga", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "MassTransit sagas", resources: ["Saga Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Circuit Breaker & Retry", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Polly library", resources: ["Polly Guide"] },
              { id: "sat-2", name: "Implement Resilience", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Retry policies", resources: ["Resilience Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review microservices", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Containers & Cloud", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Containers, Orchestration & Leadership",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Docker for .NET", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Multi-stage builds", resources: ["Docker .NET Guide"] },
              { id: "mon-2", name: "Containerize Services", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Docker compose", resources: ["Container Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Kubernetes for .NET", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Deployments, services", resources: ["K8s .NET Guide"] },
              { id: "tue-2", name: "Deploy to K8s", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "AKS/EKS", resources: ["K8s Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Azure Service Bus", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Cloud messaging", resources: ["Service Bus Guide"] },
              { id: "wed-2", name: "Integrate Service Bus", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Topics/queues", resources: ["SB Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Redis Caching", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Distributed caching", resources: ["Redis Guide"] },
              { id: "thu-2", name: "Implement Caching", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "IDistributedCache", resources: ["Cache Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Mentoring & Code Reviews", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Leadership skills", resources: ["Mentoring Guide"] },
              { id: "fri-2", name: "Architecture Decision Records", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Document decisions", resources: ["ADR Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "System Design Interviews", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Design distributed systems", resources: ["System Design Guide"] },
              { id: "sat-2", name: "Mock System Design", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Design Twitter/URL shortener", resources: ["Design Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete senior review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Career Advancement", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Tech lead path", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== SOFTWARE ARCHITECT ====================
  "Software Architect": {
    title: "Software Architect",
    description: "Design high-level system architecture and make strategic technology decisions.",
    totalWeeks: 3,
    icon: "🏛️",
    color: "#6366F1",
    skills: ["System Design", "Microservices", "Cloud Architecture", "Design Patterns", "Database Design", "API Design"],
    weeklyPlan: {
      week1: {
        focus: "System Design Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "System Design Principles", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Scalability, reliability, availability", resources: ["System Design Primer"] },
              { id: "mon-2", name: "CAP Theorem & Trade-offs", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Consistency vs availability", resources: ["CAP Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Load Balancing", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Round robin, consistent hashing", resources: ["Load Balancing Guide"] },
              { id: "tue-2", name: "Caching Strategies", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "CDN, Redis, Memcached", resources: ["Caching Guide"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Database Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Sharding, replication, partitioning", resources: ["DB Architecture Guide"] },
              { id: "wed-2", name: "SQL vs NoSQL Decision", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Use cases comparison", resources: ["DB Decision Guide"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Message Queues & Event-Driven", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Kafka, RabbitMQ", resources: ["Messaging Guide"] },
              { id: "thu-2", name: "Event Sourcing & CQRS", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Patterns", resources: ["CQRS Guide"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Design URL Shortener", time: "09:00 - 11:00", duration: "2h", type: "design", priority: "high", notes: "TinyURL system", resources: ["URL Shortener Design"] },
              { id: "fri-2", name: "Document Architecture", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Create design doc", resources: ["Architecture Doc"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "API Design Best Practices", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "REST, GraphQL, gRPC", resources: ["API Design Guide"] },
              { id: "sat-2", name: "Versioning & Documentation", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "medium", notes: "OpenAPI, Swagger", resources: ["Docs Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review fundamentals", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Microservices", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Microservices & Distributed Systems",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Microservices Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Service boundaries, DDD", resources: ["Microservices Guide"] },
              { id: "mon-2", name: "Service Discovery", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Consul, etcd, Eureka", resources: ["Discovery Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "API Gateway Pattern", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Kong, Ocelot", resources: ["Gateway Guide"] },
              { id: "tue-2", name: "Circuit Breaker Pattern", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Resilience4j, Hystrix", resources: ["Circuit Breaker Guide"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Distributed Transactions", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "2PC, Saga", resources: ["Distributed Tx Guide"] },
              { id: "wed-2", name: "Idempotency & Retries", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Design patterns", resources: ["Idempotency Guide"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Observability", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Logging, metrics, tracing", resources: ["Observability Guide"] },
              { id: "thu-2", name: "Distributed Tracing", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Jaeger, Zipkin", resources: ["Tracing Guide"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Design Uber/Logistics System", time: "09:00 - 11:00", duration: "2h", type: "design", priority: "high", notes: "Real-time matching", resources: ["Uber Design"] },
              { id: "fri-2", name: "Document Architecture", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Complete design", resources: [] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Security Architecture", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Zero trust, OAuth2", resources: ["Security Architecture"] },
              { id: "sat-2", name: "Threat Modeling", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "STRIDE", resources: ["Threat Modeling"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review distributed systems", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Cloud & Migration", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Cloud Architecture & Migration",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Cloud Design Patterns", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Strangler fig, circuit breaker", resources: ["Cloud Patterns"] },
              { id: "mon-2", name: "AWS Well-Architected", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "5 pillars", resources: ["AWS WA Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Migration Strategies", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Lift & shift, re-platform", resources: ["Migration Guide"] },
              { id: "tue-2", name: "Database Migration", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "DMS, CDC", resources: ["DB Migration"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Hybrid Cloud Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Azure Arc, AWS Outposts", resources: ["Hybrid Guide"] },
              { id: "wed-2", name: "Multi-cloud Strategy", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Avoid vendor lock-in", resources: ["Multi-cloud Guide"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Design Netflix/Streaming", time: "09:00 - 11:00", duration: "2h", type: "design", priority: "high", notes: "Content delivery", resources: ["Netflix Design"] },
              { id: "thu-2", name: "Document Architecture", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Complete design", resources: [] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Technical Decision Making", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ADR, trade-off analysis", resources: ["Decision Guide"] },
              { id: "fri-2", name: "Create ADR", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Document decision", resources: ["ADR Template"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Architecture Review", time: "10:00 - 12:00", duration: "2h", type: "practice", priority: "medium", notes: "Review peer design", resources: ["Review Guide"] },
              { id: "sat-2", name: "Stakeholder Communication", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "medium", notes: "Presenting architecture", resources: ["Communication Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete architecture review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Architecture Portfolio", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Document designs", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== MOBILE DEVELOPER (REACT NATIVE) ====================
  "Mobile Developer (React Native)": {
    title: "Mobile Developer (React Native)",
    description: "Build cross-platform mobile apps using React Native and modern JavaScript.",
    totalWeeks: 3,
    icon: "📱",
    color: "#61DAFB",
    skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Firebase", "REST APIs", "App Store Deployment"],
    weeklyPlan: {
      week1: {
        focus: "React Native Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "React Native Setup & Environment", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Expo vs CLI, emulator setup", resources: ["React Native Docs"] },
              { id: "mon-2", name: "Core Components", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "View, Text, Image, ScrollView", resources: ["Components Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Styling & Layout", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "StyleSheet, Flexbox", resources: ["Styling Guide"] },
              { id: "tue-2", name: "Build UI Screens", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Create beautiful interfaces", resources: ["UI Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "State & Props", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "useState, props passing", resources: ["State Guide"] },
              { id: "wed-2", name: "Interactive Components", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Buttons, inputs, toggles", resources: ["Interactive Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "React Navigation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Stack, Tab navigation", resources: ["Navigation Guide"] },
              { id: "thu-2", name: "Navigation Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Multi-screen app", resources: ["Navigation Exercises"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "API Integration", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Fetch data from APIs", resources: ["API Guide"] },
              { id: "fri-2", name: "Build Complete App", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Full mobile application", resources: ["App Tutorial"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Lists & FlatList", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Rendering lists", resources: ["FlatList Guide"] },
              { id: "sat-2", name: "Touchable Components", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "TouchableOpacity, gestures", resources: ["Touchable Guide"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review & Quiz", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review mobile concepts", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Advanced features", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Advanced React Native & Firebase",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "AsyncStorage & Local Data", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Persist data locally", resources: ["AsyncStorage Guide"] },
              { id: "mon-2", name: "Implement Storage", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Save user preferences", resources: ["Storage Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Firebase Setup", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Firebase config, services", resources: ["Firebase Docs"] },
              { id: "tue-2", name: "Firebase Auth", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Email/password login", resources: ["Auth Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Firebase Firestore", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "NoSQL database", resources: ["Firestore Guide"] },
              { id: "wed-2", name: "CRUD Operations", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Read/write to Firestore", resources: ["Firestore Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Push Notifications", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Expo Notifications", resources: ["Notifications Guide"] },
              { id: "thu-2", name: "Send Notifications", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Implement push notifications", resources: ["Notification Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Animations", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Animated API, Reanimated", resources: ["Animation Guide"] },
              { id: "fri-2", name: "Add Animations", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Animate transitions", resources: ["Animation Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Image Picker & Camera", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Device features", resources: ["Camera Guide"] },
              { id: "sat-2", name: "Upload Images", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Image upload to Firebase", resources: ["Upload Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Firebase integration", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Deployment", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "App Store Deployment & Advanced Features",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "App Icons & Splash Screen", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Branding assets", resources: ["Assets Guide"] },
              { id: "mon-2", name: "Configure Assets", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Generate icons", resources: ["Asset Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Building for Production", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "EAS Build, APK, IPA", resources: ["Build Guide"] },
              { id: "tue-2", name: "Generate APK", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Create Android build", resources: ["Build Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "App Store Submission", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Google Play, App Store", resources: ["Submission Guide"] },
              { id: "wed-2", name: "Prepare Store Listing", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Screenshots, descriptions", resources: ["Store Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Code Push & OTA Updates", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Expo Updates", resources: ["Code Push Guide"] },
              { id: "thu-2", name: "Implement OTA", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Over-the-air updates", resources: ["OTA Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Analytics & Crash Reporting", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Firebase Analytics, Crashlytics", resources: ["Analytics Guide"] },
              { id: "fri-2", name: "Integrate Analytics", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Track user events", resources: ["Analytics Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Performance Monitoring", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "App performance metrics", resources: ["Performance Guide"] },
              { id: "sat-2", name: "Optimize App", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Reduce bundle size", resources: ["Optimization"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review deployment", resources: ["Week Summary"] },
              { id: "sun-2", name: "Portfolio Building", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Showcase apps", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== QA AUTOMATION ENGINEER ====================
  "QA Automation Engineer": {
    title: "QA Automation Engineer",
    description: "Write automated tests and build CI/CD testing pipelines for quality assurance.",
    totalWeeks: 3,
    icon: "🧪",
    color: "#F97316",
    skills: ["Selenium", "Cypress", "Jest", "Playwright", "CI/CD", "API Testing", "JavaScript/Python", "Test Automation Frameworks"],
    weeklyPlan: {
      week1: {
        focus: "Testing Fundamentals & Unit Testing",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Software Testing Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Types: unit, integration, E2E", resources: ["Testing Guide"] },
              { id: "mon-2", name: "Test Pyramid & Strategies", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Test planning", resources: ["Strategy Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Jest Unit Testing", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Jest setup, matchers", resources: ["Jest Docs"] },
              { id: "tue-2", name: "Write Unit Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Test functions", resources: ["Jest Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Mocking & Spies", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Jest mocks, sinon", resources: ["Mocking Guide"] },
              { id: "wed-2", name: "Mock API Calls", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Mock functions", resources: ["Mock Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Integration Testing", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Test components together", resources: ["Integration Guide"] },
              { id: "thu-2", name: "React Testing Library", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Test React components", resources: ["RTL Guide"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Python Unit Testing (pytest)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "pytest framework", resources: ["Pytest Guide"] },
              { id: "fri-2", name: "Write Python Tests", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Test Python functions", resources: ["Pytest Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Test-Driven Development (TDD)", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Red-green-refactor", resources: ["TDD Guide"] },
              { id: "sat-2", name: "TDD Exercise", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Build with TDD", resources: ["TDD Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review unit testing", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "UI Automation", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "UI Automation with Selenium & Cypress",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Selenium WebDriver Setup", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Python + Selenium", resources: ["Selenium Docs"] },
              { id: "mon-2", name: "Locators & Interactions", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "find_element, clicks", resources: ["Selenium Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Waits & Synchronization", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Explicit, implicit waits", resources: ["Waits Guide"] },
              { id: "tue-2", name: "Page Object Model", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Design pattern", resources: ["POM Guide"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Cypress Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Cypress setup, commands", resources: ["Cypress Docs"] },
              { id: "wed-2", name: "Write Cypress Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "E2E tests", resources: ["Cypress Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Playwright Automation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Multi-browser testing", resources: ["Playwright Docs"] },
              { id: "thu-2", name: "Playwright Practice", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Cross-browser tests", resources: ["Playwright Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "API Testing with Postman", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Collections, assertions", resources: ["Postman Guide"] },
              { id: "fri-2", name: "Automate API Tests", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Newman CLI", resources: ["API Test Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Visual Regression Testing", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Percy, Applitools", resources: ["Visual Testing"] },
              { id: "sat-2", name: "Implement Visual Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Snapshot testing", resources: ["Visual Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review UI automation", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "CI/CD Integration", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "CI/CD Integration & Advanced Testing",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "CI/CD with GitHub Actions", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Automated test runs", resources: ["GitHub Actions Guide"] },
              { id: "mon-2", name: "Setup Test Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Run tests on PR", resources: ["Pipeline Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Test Reporting", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Allure, JUnit reports", resources: ["Reporting Guide"] },
              { id: "tue-2", name: "Generate Reports", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Test results dashboard", resources: ["Report Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Performance Testing (k6)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Load testing", resources: ["k6 Guide"] },
              { id: "wed-2", name: "Run Load Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Stress test API", resources: ["k6 Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Security Testing Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "OWASP ZAP", resources: ["Security Test Guide"] },
              { id: "thu-2", name: "Run Security Scan", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Vulnerability scan", resources: ["ZAP Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Test Automation Framework", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Build custom framework", resources: ["Framework Guide"] },
              { id: "fri-2", name: "Build Test Framework", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete automation suite", resources: ["Framework Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Mobile Testing (Appium)", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "iOS/Android testing", resources: ["Appium Guide"] },
              { id: "sat-2", name: "Write Mobile Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Emulator testing", resources: ["Appium Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete QA review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Portfolio & Certification", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "ISTQB certification", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== SITE RELIABILITY ENGINEER ====================
  "Site Reliability Engineer": {
    title: "Site Reliability Engineer",
    description: "Ensure system reliability, observability, and incident response at scale.",
    totalWeeks: 3,
    icon: "📊",
    color: "#0EA5E9",
    skills: ["SLOs/SLIs", "Observability", "Prometheus", "Grafana", "Distributed Systems", "Incident Response", "Chaos Engineering"],
    weeklyPlan: {
      week1: {
        focus: "SRE Fundamentals & SLIs/SLOs",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "SRE Principles", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Google SRE book", resources: ["SRE Guide"] },
              { id: "mon-2", name: "Error Budgets", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Balance reliability & velocity", resources: ["Error Budget Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "SLIs (Service Level Indicators)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Latency, availability, throughput", resources: ["SLI Guide"] },
              { id: "tue-2", name: "Define SLIs", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "For sample service", resources: ["SLI Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "SLOs (Service Level Objectives)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Targets, compliance", resources: ["SLO Guide"] },
              { id: "wed-2", name: "Set SLOs", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Calculate error budgets", resources: ["SLO Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "SLAs (Service Level Agreements)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Legal agreements", resources: ["SLA Guide"] },
              { id: "thu-2", name: "Draft SLA", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sample service", resources: ["SLA Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Toil Reduction", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Automation strategies", resources: ["Toil Guide"] },
              { id: "fri-2", name: "Automation Planning", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Reduce manual work", resources: ["Automation Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Capacity Planning", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Resource forecasting", resources: ["Capacity Guide"] },
              { id: "sat-2", name: "Scalability Analysis", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Load testing", resources: ["Scalability Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review SRE basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Observability", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Observability & Monitoring",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Observability Pillars", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Metrics, logs, traces", resources: ["Observability Guide"] },
              { id: "mon-2", name: "Structured Logging", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "JSON logs", resources: ["Logging Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Prometheus Metrics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Setup, exporters", resources: ["Prometheus Guide"] },
              { id: "tue-2", name: "Instrument Application", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Prometheus client", resources: ["Instrumentation Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Grafana Dashboards", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Visualization", resources: ["Grafana Guide"] },
              { id: "wed-2", name: "Build Dashboard", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "SLO dashboard", resources: ["Dashboard Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Distributed Tracing (Jaeger)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "OpenTelemetry", resources: ["Tracing Guide"] },
              { id: "thu-2", name: "Add Tracing", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Trace requests", resources: ["Tracing Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Alerting (Alertmanager)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Alert rules, routing", resources: ["Alerting Guide"] },
              { id: "fri-2", name: "Setup Alerts", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "SLO-based alerts", resources: ["Alerting Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Log Aggregation (Loki)", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "LogQL", resources: ["Loki Guide"] },
              { id: "sat-2", name: "Setup Loki", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Log analysis", resources: ["Loki Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review observability", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Incident Response", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Incident Response & Chaos Engineering",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Incident Response Lifecycle", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Detect, respond, recover", resources: ["IR Guide"] },
              { id: "mon-2", name: "Write Runbook", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Incident procedures", resources: ["Runbook Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Postmortems & Blameless Culture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Learn from failures", resources: ["Postmortem Guide"] },
              { id: "tue-2", name: "Write Postmortem", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sample incident", resources: ["Postmortem Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Chaos Engineering", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Chaos Monkey", resources: ["Chaos Guide"] },
              { id: "wed-2", name: "Run Chaos Experiment", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Inject failures", resources: ["Chaos Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "On-Call Best Practices", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Rotation, handoffs", resources: ["OnCall Guide"] },
              { id: "thu-2", name: "Setup On-Call Schedule", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "PagerDuty/Opsgenie", resources: ["Schedule Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "SRE Tools & Automation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Terraform, Ansible", resources: ["SRE Tools"] },
              { id: "fri-2", name: "Build Automation Script", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Reliability automation", resources: ["Automation Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Disaster Recovery", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "RTO, RPO", resources: ["DR Guide"] },
              { id: "sat-2", name: "Create DR Plan", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Backup strategies", resources: ["DR Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete SRE review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Certification Plan", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "SRE certification", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== DATABASE DEVELOPER ====================
  "Database Developer": {
    title: "Database Developer",
    description: "Design optimized database schemas, stored procedures, and performance tuning.",
    totalWeeks: 3,
    icon: "🗄️",
    color: "#2E7D32",
    skills: ["SQL", "Query Optimization", "Stored Procedures", "Indexing", "Database Design", "ETL", "NoSQL"],
    weeklyPlan: {
      week1: {
        focus: "Advanced SQL & Query Optimization",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Advanced SQL Queries", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Window functions, CTEs", resources: ["Advanced SQL Guide"] },
              { id: "mon-2", name: "PIVOT & UNPIVOT", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Data transformation", resources: ["Pivot Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Indexing Strategies", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Clustered, non-clustered", resources: ["Indexing Guide"] },
              { id: "tue-2", name: "Analyze Query Plans", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "EXPLAIN, execution plans", resources: ["Plan Analysis"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Query Optimization", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Rewrite for performance", resources: ["Optimization Guide"] },
              { id: "wed-2", name: "Optimize Slow Queries", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Real optimization", resources: ["Optimization Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Stored Procedures", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Parameters, error handling", resources: ["SP Guide"] },
              { id: "thu-2", name: "Write Stored Procedures", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Complex logic", resources: ["SP Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Functions & Triggers", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "User-defined functions", resources: ["Functions Guide"] },
              { id: "fri-2", name: "Implement Triggers", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Audit logging", resources: ["Triggers Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Transactions & Locking", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "ACID, isolation levels", resources: ["Transaction Guide"] },
              { id: "sat-2", name: "Deadlock Handling", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Detect and resolve", resources: ["Deadlock Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review advanced SQL", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Database Design", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Database Design & Normalization",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Normalization (1NF-3NF)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Reduce redundancy", resources: ["Normalization Guide"] },
              { id: "mon-2", name: "Denormalization", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Performance trade-offs", resources: ["Denormalization Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Entity Relationship Modeling", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ER diagrams", resources: ["ERD Guide"] },
              { id: "tue-2", name: "Design Database Schema", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "E-commerce schema", resources: ["Schema Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Data Integrity & Constraints", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "PK, FK, unique, check", resources: ["Constraints Guide"] },
              { id: "wed-2", name: "Implement Constraints", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Data validation", resources: ["Constraints Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Partitioning & Sharding", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Large table strategies", resources: ["Partitioning Guide"] },
              { id: "thu-2", name: "Implement Partitioning", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Range/List partitioning", resources: ["Partitioning Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "NoSQL Databases (MongoDB)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Document model", resources: ["MongoDB Guide"] },
              { id: "fri-2", name: "MongoDB Schema Design", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "Embedding vs referencing", resources: ["MongoDB Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "ETL Processes", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Extract, transform, load", resources: ["ETL Guide"] },
              { id: "sat-2", name: "Build ETL Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Data migration", resources: ["ETL Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review DB design", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Performance & Admin", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Performance Tuning & Administration",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Database Performance Monitoring", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "DMVs, performance counters", resources: ["Performance Monitoring"] },
              { id: "mon-2", name: "Identify Bottlenecks", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Slow query log", resources: ["Bottleneck Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Backup & Recovery", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Full, differential, log backups", resources: ["Backup Guide"] },
              { id: "tue-2", name: "Restore Database", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Point-in-time recovery", resources: ["Restore Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "High Availability", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Replication, clustering", resources: ["HA Guide"] },
              { id: "wed-2", name: "Setup Replication", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Master-slave", resources: ["Replication Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Security & User Management", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Roles, permissions", resources: ["Security Guide"] },
              { id: "thu-2", name: "Implement Row-Level Security", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Fine-grained access", resources: ["RLS Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Database Migration", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Schema changes", resources: ["Migration Guide"] },
              { id: "fri-2", name: "Build Migration Plan", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Zero-downtime", resources: ["Migration Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Data Warehouse Concepts", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Star schema, snowflake", resources: ["DW Guide"] },
              { id: "sat-2", name: "Design Data Warehouse", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Fact & dimension tables", resources: ["DW Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete DB review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Certification Plan", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Oracle/SQL Server cert", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== TECHNICAL PRODUCT MANAGER ====================
  "Technical Product Manager": {
    title: "Technical Product Manager",
    description: "Bridge engineering and business to deliver impactful technical products.",
    totalWeeks: 3,
    icon: "📋",
    color: "#F59E0B",
    skills: ["Product Strategy", "Agile/Scrum", "Technical Communication", "Roadmapping", "User Stories", "Data Analysis"],
    weeklyPlan: {
      week1: {
        focus: "Product Management Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Product Management 101", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Roles, responsibilities", resources: ["Product Guide"] },
              { id: "mon-2", name: "Product Lifecycle", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Discovery to sunset", resources: ["Lifecycle Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Market Research & Analysis", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Competitive analysis", resources: ["Market Research"] },
              { id: "tue-2", name: "SWOT Analysis", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sample product", resources: ["SWOT Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "User Personas & Stories", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "User-centered design", resources: ["Persona Guide"] },
              { id: "wed-2", name: "Create Personas", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Target users", resources: ["Persona Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Writing User Stories", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "As a... I want... so that...", resources: ["User Stories Guide"] },
              { id: "thu-2", name: "Write Stories", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Acceptance criteria", resources: ["Stories Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Product Roadmapping", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Strategic planning", resources: ["Roadmap Guide"] },
              { id: "fri-2", name: "Create Roadmap", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "12-month roadmap", resources: ["Roadmap Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "OKRs & KPIs", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Goal setting", resources: ["OKR Guide"] },
              { id: "sat-2", name: "Define Metrics", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Product success metrics", resources: ["Metrics Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review PM basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Agile & Execution", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Agile & Product Execution",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Agile Methodologies", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Scrum, Kanban", resources: ["Agile Guide"] },
              { id: "mon-2", name: "Scrum Ceremonies", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sprint planning, retro", resources: ["Scrum Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Backlog Management", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Prioritization techniques", resources: ["Backlog Guide"] },
              { id: "tue-2", name: "Prioritize Backlog", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "MoSCoW, RICE", resources: ["Prioritization Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Stakeholder Management", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Communication strategies", resources: ["Stakeholder Guide"] },
              { id: "wed-2", name: "Communication Plan", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Status updates", resources: ["Comm Plan Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Technical Communication", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Bridging dev & business", resources: ["Tech Comm Guide"] },
              { id: "thu-2", name: "Technical Requirements", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Write PRD", resources: ["PRD Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Data-Driven Decisions", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "A/B testing, analytics", resources: ["Data Guide"] },
              { id: "fri-2", name: "Analyze Product Data", time: "14:00 - 17:00", duration: "3h", type: "practice", priority: "high", notes: "SQL for PMs", resources: ["Data Practice"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Go-to-Market Strategy", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Launch planning", resources: ["GTM Guide"] },
              { id: "sat-2", name: "Create Launch Plan", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Launch checklist", resources: ["Launch Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review Agile & Execution", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Leadership & Strategy", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Product Leadership & Strategy",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Product Strategy", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Vision, mission, strategy", resources: ["Strategy Guide"] },
              { id: "mon-2", name: "Create Product Vision", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Vision statement", resources: ["Vision Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "MVP Definition", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Minimum Viable Product", resources: ["MVP Guide"] },
              { id: "tue-2", name: "Define MVP Scope", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Feature prioritization", resources: ["MVP Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Product Metrics & KPIs", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "North Star metric", resources: ["Metric Guide"] },
              { id: "wed-2", name: "Define North Star", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sample product", resources: ["NSM Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Customer Development", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "User interviews", resources: ["Customer Dev Guide"] },
              { id: "thu-2", name: "Interview Script", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Customer discovery", resources: ["Interview Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Competitive Analysis", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Feature comparison", resources: ["Competitive Guide"] },
              { id: "fri-2", name: "Build Comparison Matrix", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Analyze competitors", resources: ["Matrix Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Product Leadership", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Leading without authority", resources: ["Leadership Guide"] },
              { id: "sat-2", name: "Career Path Planning", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Senior PM to Director", resources: ["Career Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete PM review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Portfolio & Networking", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Product portfolio", resources: [] }
            ]
          }
        }
      }
    }
  },
  // ==================== BLOCKCHAIN DEVELOPER ====================
  "Blockchain Developer": {
    title: "Blockchain Developer",
    description: "Build decentralized applications and smart contracts on blockchain platforms.",
    totalWeeks: 3,
    icon: "⛓️",
    color: "#F7931A",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Hardhat", "Truffle", "Remix", "DeFi"],
    weeklyPlan: {
      week1: {
        focus: "Blockchain Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Blockchain Concepts", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Blocks, chains, consensus", resources: ["Blockchain Guide", "Bitcoin Whitepaper"] },
              { id: "mon-2", name: "Cryptographic Hash Functions", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "SHA256, Merkle trees", resources: ["Crypto Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Ethereum Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "EVM, gas, accounts", resources: ["Ethereum Guide"] },
              { id: "tue-2", name: "MetaMask & Wallets", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Setup and transact", resources: ["MetaMask Guide"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Smart Contracts Introduction", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "What are smart contracts", resources: ["Smart Contract Guide"] },
              { id: "wed-2", name: "Remix IDE", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "First contract deployment", resources: ["Remix Guide"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Solidity Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Variables, types, functions", resources: ["Solidity Docs"] },
              { id: "thu-2", name: "Write Simple Contract", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Counter, storage", resources: ["Solidity Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Gas Optimization", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Gas costs, optimization", resources: ["Gas Guide"] },
              { id: "fri-2", name: "Optimize Contract", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Reduce gas usage", resources: ["Gas Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Test Networks", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Goerli, Sepolia", resources: ["Testnet Guide"] },
              { id: "sat-2", name: "Deploy to Testnet", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Live test deployment", resources: ["Deploy Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review blockchain basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Smart Contract Development", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Smart Contract Development",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Advanced Solidity", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Inheritance, modifiers", resources: ["Advanced Solidity"] },
              { id: "mon-2", name: "Events & Errors", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Logging, require/revert", resources: ["Events Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "ERC20 Token Standard", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Token implementation", resources: ["ERC20 Guide"] },
              { id: "tue-2", name: "Create Token", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Deploy own token", resources: ["Token Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "ERC721 (NFT) Standard", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Non-fungible tokens", resources: ["ERC721 Guide"] },
              { id: "wed-2", name: "Create NFT Collection", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Mint NFTs", resources: ["NFT Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Hardhat Framework", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Dev environment", resources: ["Hardhat Docs"] },
              { id: "thu-2", name: "Write Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Hardhat tests", resources: ["Hardhat Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "OpenZeppelin", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Secure contracts library", resources: ["OpenZeppelin Guide"] },
              { id: "fri-2", name: "Upgradeable Contracts", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "UUPS pattern", resources: ["Upgradeable Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Security Best Practices", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Reentrancy, overflow", resources: ["Security Guide"] },
              { id: "sat-2", name: "Audit Contract", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Find vulnerabilities", resources: ["Audit Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review smart contracts", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "dApp Development", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "dApp Development & Web3",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Web3.js Fundamentals", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Interact with contracts", resources: ["Web3.js Docs"] },
              { id: "mon-2", name: "Connect to MetaMask", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Read contract", resources: ["Web3 Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Ethers.js", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Alternative library", resources: ["Ethers Guide"] },
              { id: "tue-2", name: "Build dApp Frontend", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "React + Ethers", resources: ["dApp Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "IPFS Integration", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Decentralized storage", resources: ["IPFS Guide"] },
              { id: "wed-2", name: "Store Files on IPFS", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Pinata/Web3.storage", resources: ["IPFS Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "The Graph (Subgraph)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Index blockchain data", resources: ["The Graph Guide"] },
              { id: "thu-2", name: "Query Events", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "GraphQL queries", resources: ["Graph Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "DeFi Concepts", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Uniswap, AMM", resources: ["DeFi Guide"] },
              { id: "fri-2", name: "Build DeFi dApp", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Simple exchange", resources: ["DeFi Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Layer 2 Solutions", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Polygon, Arbitrum", resources: ["L2 Guide"] },
              { id: "sat-2", name: "Deploy to Polygon", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Low gas deployment", resources: ["Polygon Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete blockchain review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Portfolio & Jobs", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "DeFi/NFT roles", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== EMBEDDED SYSTEMS ENGINEER ====================
  "Embedded Systems Engineer": {
    title: "Embedded Systems Engineer",
    description: "Develop firmware and software for microcontrollers and IoT devices.",
    totalWeeks: 3,
    icon: "🔌",
    color: "#2DD4BF",
    skills: ["C/C++", "Python", "Microcontrollers", "RTOS", "IoT Protocols", "PCB Design", "Arduino", "Raspberry Pi"],
    weeklyPlan: {
      week1: {
        focus: "C Programming for Embedded Systems",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "C Basics for Embedded", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pointers, memory management", resources: ["C Guide", "Embedded C Book"] },
              { id: "mon-2", name: "Bit Manipulation", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Bitwise operations", resources: ["Bitwise Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Data Structures for Embedded", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Arrays, linked lists", resources: ["Embedded DS"] },
              { id: "tue-2", name: "Memory Optimization", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Stack vs heap", resources: ["Memory Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Microcontroller Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Registers, peripherals", resources: ["MCU Guide"] },
              { id: "wed-2", name: "GPIO Programming", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Blink LED", resources: ["GPIO Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Arduino Platform", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "IDE, libraries", resources: ["Arduino Guide"] },
              { id: "thu-2", name: "Sensor Interfacing", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Read temperature", resources: ["Sensor Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Interrupts & Timers", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Event-driven programming", resources: ["Interrupt Guide"] },
              { id: "fri-2", name: "Build Timer Project", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Stopwatch", resources: ["Timer Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Debugging Techniques", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Serial debug, logic analyzer", resources: ["Debug Guide"] },
              { id: "sat-2", name: "Oscilloscope Basics", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Measure signals", resources: ["Scope Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review C & basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "RTOS & Protocols", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Real-Time OS & Communication Protocols",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "RTOS Concepts", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Tasks, scheduling", resources: ["RTOS Guide"] },
              { id: "mon-2", name: "FreeRTOS Setup", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Create tasks", resources: ["FreeRTOS Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Semaphores & Queues", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Synchronization", resources: ["RTOS Sync Guide"] },
              { id: "tue-2", name: "Producer-Consumer", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Queue implementation", resources: ["Queue Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "I2C Protocol", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "2-wire communication", resources: ["I2C Guide"] },
              { id: "wed-2", name: "Connect Sensor (I2C)", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Read data", resources: ["I2C Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "SPI Protocol", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Full-duplex", resources: ["SPI Guide"] },
              { id: "thu-2", name: "SPI Device Communication", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "SD card, display", resources: ["SPI Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "UART/Serial Communication", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "RS232, TTL", resources: ["UART Guide"] },
              { id: "fri-2", name: "Build Serial Monitor", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Send/receive data", resources: ["UART Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "PWM & ADC/DAC", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Analog signals", resources: ["PWM Guide"] },
              { id: "sat-2", name: "Control Servo", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "PWM control", resources: ["Servo Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review RTOS & Protocols", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "IoT & Embedded Linux", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Embedded Linux & IoT",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Raspberry Pi Setup", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "OS, GPIO", resources: ["RPi Guide"] },
              { id: "mon-2", name: "Python on RPi", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Control LEDs", resources: ["RPi Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "IoT Protocols", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "MQTT, CoAP", resources: ["IoT Guide"] },
              { id: "tue-2", name: "MQTT Broker Setup", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Publish/Subscribe", resources: ["MQTT Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "ESP32 Development", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "WiFi, BLE", resources: ["ESP32 Guide"] },
              { id: "wed-2", name: "Connect to Cloud", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "AWS IoT Core", resources: ["ESP32 Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Embedded C++", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Classes for hardware", resources: ["C++ Embedded"] },
              { id: "thu-2", name: "Object-Oriented Firmware", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Driver classes", resources: ["CPP Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Power Optimization", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Sleep modes, low power", resources: ["Low Power Guide"] },
              { id: "fri-2", name: "Battery-powered Device", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Sensor node", resources: ["Power Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "PCB Design Basics", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "KiCad, Eagle", resources: ["PCB Guide"] },
              { id: "sat-2", name: "Design Simple PCB", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Schematic & layout", resources: ["PCB Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete embedded review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Portfolio Building", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Showcase projects", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== SECURITY ARCHITECT ====================
  "Security Architect": {
    title: "Security Architect",
    description: "Design enterprise security frameworks and threat mitigation strategies.",
    totalWeeks: 3,
    icon: "🔐",
    color: "#DC2626",
    skills: ["Threat Modeling", "Zero Trust", "Security Frameworks", "Cloud Security", "Identity Management", "Compliance"],
    weeklyPlan: {
      week1: {
        focus: "Security Architecture Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Security Architecture Principles", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Defense in depth, least privilege", resources: ["Architecture Guide"] },
              { id: "mon-2", name: "Security Frameworks", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "NIST, ISO 27001", resources: ["Framework Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Threat Modeling", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "STRIDE, DREAD", resources: ["Threat Modeling Guide"] },
              { id: "tue-2", name: "Create Threat Model", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Sample application", resources: ["Threat Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Zero Trust Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Never trust, always verify", resources: ["Zero Trust Guide"] },
              { id: "wed-2", name: "Design Zero Trust Network", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Micro-segmentation", resources: ["Zero Trust Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Identity & Access Management", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SSO, MFA, RBAC", resources: ["IAM Guide"] },
              { id: "thu-2", name: "Design IAM System", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Entra ID/Azure AD", resources: ["IAM Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Application Security Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Secure SDLC, DevSecOps", resources: ["AppSec Guide"] },
              { id: "fri-2", name: "Design Secure API", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "API security", resources: ["API Security Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Cryptography Architecture", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "PKI, key management", resources: ["Crypto Architecture"] },
              { id: "sat-2", name: "Design PKI", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Certificate lifecycle", resources: ["PKI Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review security fundamentals", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Cloud Security", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Cloud & Network Security Architecture",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Cloud Security Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Shared responsibility", resources: ["Cloud Security Guide"] },
              { id: "mon-2", name: "AWS Security Hub", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Centralized security", resources: ["Security Hub Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Network Security Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Firewalls, IDS/IPS, SDN", resources: ["Network Security Guide"] },
              { id: "tue-2", name: "Design Secure Network", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "VPC, subnets", resources: ["Network Design Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Container Security", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Image scanning, K8s security", resources: ["Container Security"] },
              { id: "wed-2", name: "Secure K8s Cluster", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Pod security policies", resources: ["K8s Security Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Data Security Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Encryption, DLP, masking", resources: ["Data Security Guide"] },
              { id: "thu-2", name: "Design Encryption Strategy", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "At-rest, in-transit", resources: ["Encryption Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Security Operations (SecOps)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SIEM, SOAR", resources: ["SecOps Guide"] },
              { id: "fri-2", name: "Design SOC Architecture", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Alerting, response", resources: ["SOC Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Compliance & Governance", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "GDPR, HIPAA, PCI-DSS", resources: ["Compliance Guide"] },
              { id: "sat-2", name: "Create Compliance Map", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Control mapping", resources: ["Compliance Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review cloud & network security", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Advanced Security", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Enterprise Security & Strategy",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Enterprise Security Strategy", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Roadmap, maturity models", resources: ["Strategy Guide"] },
              { id: "mon-2", name: "Create Security Roadmap", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "3-year plan", resources: ["Roadmap Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Risk Management Framework", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Risk assessment, mitigation", resources: ["Risk Guide"] },
              { id: "tue-2", name: "Conduct Risk Assessment", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Identify risks", resources: ["Risk Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Incident Response Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "IR playbooks", resources: ["IR Architecture"] },
              { id: "wed-2", name: "Design IR System", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Detection to recovery", resources: ["IR Design Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Business Continuity & DR", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "BCP, DRP", resources: ["BCP Guide"] },
              { id: "thu-2", name: "Create DR Plan", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "RTO/RPO", resources: ["DR Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Security Architecture Review", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Assessment methodologies", resources: ["Review Guide"] },
              { id: "fri-2", name: "Conduct Architecture Review", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Sample system", resources: ["Review Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Security Leadership", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "CISO, board communication", resources: ["Leadership Guide"] },
              { id: "sat-2", name: "Present Security Strategy", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Mock presentation", resources: ["Presentation Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete security architecture", resources: ["Career Summary"] },
              { id: "sun-2", name: "Certification Plan", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "CISSP, SABSA", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== PLATFORM ENGINEER ====================
  "Platform Engineer": {
    title: "Platform Engineer",
    description: "Build internal developer platforms and tooling to improve engineering velocity.",
    totalWeeks: 3,
    icon: "🏗️",
    color: "#8B5CF6",
    skills: ["Kubernetes", "Internal Developer Platform", "Crossplane", "Backstage", "CI/CD", "Go/Python", "Terraform"],
    weeklyPlan: {
      week1: {
        focus: "Platform Engineering Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Platform Engineering Concepts", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "IDP, golden paths", resources: ["Platform Guide"] },
              { id: "mon-2", name: "Platform vs Product", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Internal platforms", resources: ["IDP Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Backstage Introduction", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Spotify Backstage", resources: ["Backstage Docs"] },
              { id: "tue-2", name: "Setup Backstage", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Developer portal", resources: ["Backstage Setup"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Service Catalog", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Entity definitions", resources: ["Service Catalog Guide"] },
              { id: "wed-2", name: "Create Service Catalog", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Register services", resources: ["Catalog Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Kubernetes Operators", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "CRDs, controllers", resources: ["Operator Guide"] },
              { id: "thu-2", name: "Build Simple Operator", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Kubebuilder", resources: ["Operator Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Crossplane", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Control plane", resources: ["Crossplane Guide"] },
              { id: "fri-2", name: "Provision Infrastructure", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Crossplane composition", resources: ["Crossplane Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Platform Metrics", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "DORA metrics, SPACE", resources: ["Metrics Guide"] },
              { id: "sat-2", name: "Track Platform Usage", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Adoption metrics", resources: ["Metrics Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review platform basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "IDP Implementation", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Internal Developer Platform Implementation",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Infrastructure as Code for Platform", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Terraform, CDK", resources: ["IaC Guide"] },
              { id: "mon-2", name: "Build Platform Components", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Terraform modules", resources: ["Platform IaC Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Self-Service Infrastructure", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Templating", resources: ["Self-Service Guide"] },
              { id: "tue-2", name: "Create App Template", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Golden path", resources: ["Template Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "CI/CD for Platform", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pipeline templates", resources: ["CI/CD Platform"] },
              { id: "wed-2", name: "Build Reusable Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "GitHub Actions/ GitLab CI", resources: ["Pipeline Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Platform Security", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Policy as Code", resources: ["Platform Security"] },
              { id: "thu-2", name: "Implement OPAC", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Rego policies", resources: ["OPA Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Multi-Cloud Platform", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Abstraction layers", resources: ["Multi-Cloud Guide"] },
              { id: "fri-2", name: "Platform Federation", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Unified control", resources: ["Federation Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Developer Experience (DX)", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Documentation, CLI", resources: ["DX Guide"] },
              { id: "sat-2", name: "Build Platform CLI", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Go/Cobra", resources: ["CLI Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review IDP implementation", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Advanced Platform", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Platform Operations & Scaling",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Platform Observability", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Monitor platform itself", resources: ["Platform Observability"] },
              { id: "mon-2", name: "Setup Platform Monitoring", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Prometheus, Grafana", resources: ["Monitor Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Platform Testing", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Integration tests", resources: ["Platform Testing"] },
              { id: "tue-2", name: "Test Platform Components", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Terratest", resources: ["Testing Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Cost Management for Platform", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Showback, chargeback", resources: ["Cost Guide"] },
              { id: "wed-2", name: "Implement Cost Tracking", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Cloud cost API", resources: ["Cost Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Platform Governance", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Policy enforcement", resources: ["Governance Guide"] },
              { id: "thu-2", name: "Create Governance Rules", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Guardrails", resources: ["Governance Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Platform Evolution", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Versioning, migration", resources: ["Evolution Guide"] },
              { id: "fri-2", name: "Plan Platform Migration", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Zero downtime", resources: ["Migration Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Team Topologies", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Platform team structure", resources: ["Team Topologies"] },
              { id: "sat-2", name: "Design Platform Org", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Interaction modes", resources: ["Org Design Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete platform review", resources: ["Career Summary"] },
              { id: "sun-2", name: "Community & Learning", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "PlatformCon", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== DATA ENGINEER ====================
  "Data Engineer": {
    title: "Data Engineer",
    description: "Build and maintain ETL pipelines, data warehouses, and data infrastructure.",
    totalWeeks: 3,
    icon: "📦",
    color: "#0EA5E9",
    skills: ["Python", "SQL", "ETL", "Data Warehousing", "Apache Spark", "Airflow", "dbt", "AWS/GCP"],
    weeklyPlan: {
      week1: {
        focus: "Data Engineering Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Data Engineering Concepts", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ETL vs ELT, data pipeline", resources: ["DE Guide"] },
              { id: "mon-2", name: "Data Warehouse Design", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "Star schema, snowflake", resources: ["DW Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Advanced SQL for Data", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Window functions, CTEs", resources: ["Advanced SQL"] },
              { id: "tue-2", name: "Analytical Queries", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Complex aggregations", resources: ["SQL Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Python for Data", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Pandas, data processing", resources: ["Python Data Guide"] },
              { id: "wed-2", name: "Data Transformation", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Clean & transform", resources: ["Pandas Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "ETL with Python", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Extract, transform, load", resources: ["ETL Guide"] },
              { id: "thu-2", name: "Build ETL Script", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "CSV to database", resources: ["ETL Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Database Optimization", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Indexing, partitioning", resources: ["Optimization Guide"] },
              { id: "fri-2", name: "Optimize Queries", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Performance tuning", resources: ["Optimization Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Data Quality", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Validation, testing", resources: ["DQ Guide"] },
              { id: "sat-2", name: "Implement Data Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Great Expectations", resources: ["DQ Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review data basics", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Big Data Tools", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Big Data & Streaming",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Apache Spark Introduction", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "RDDs, DataFrames", resources: ["Spark Guide"] },
              { id: "mon-2", name: "Spark with Python (PySpark)", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Transformations", resources: ["PySpark Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Spark SQL", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SQL on big data", resources: ["Spark SQL Guide"] },
              { id: "tue-2", name: "Analyze Large Dataset", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Spark cluster", resources: ["Spark Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Apache Kafka Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Topics, producers, consumers", resources: ["Kafka Guide"] },
              { id: "wed-2", name: "Stream Data with Kafka", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Produce/consume", resources: ["Kafka Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Spark Streaming", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Real-time processing", resources: ["Streaming Guide"] },
              { id: "thu-2", name: "Process Real-Time Data", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Streaming pipeline", resources: ["Streaming Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Data Warehousing (Snowflake/BigQuery)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Cloud DW", resources: ["Cloud DW Guide"] },
              { id: "fri-2", name: "Load Data to Warehouse", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "ETL to cloud", resources: ["Warehouse Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "dbt (Data Build Tool)", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Transformations", resources: ["dbt Guide"] },
              { id: "sat-2", name: "Build dbt Models", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "SQL transformations", resources: ["dbt Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review big data tools", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Pipeline Orchestration", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Pipeline Orchestration & Cloud",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Apache Airflow", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "DAGs, operators", resources: ["Airflow Guide"] },
              { id: "mon-2", name: "Create DAG", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Scheduled pipeline", resources: ["Airflow Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Cloud Data Services (AWS)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "S3, Redshift, Glue", resources: ["AWS Data Guide"] },
              { id: "tue-2", name: "Build Cloud Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "AWS services", resources: ["AWS Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Data Lake Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Medallion architecture", resources: ["Data Lake Guide"] },
              { id: "wed-2", name: "Design Data Lake", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Bronze/silver/gold", resources: ["Lake Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Data Governance", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Data catalog, lineage", resources: ["Governance Guide"] },
              { id: "thu-2", name: "Setup Data Catalog", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Amundsen/DataHub", resources: ["Catalog Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Infrastructure as Code for Data", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Terraform data pipelines", resources: ["IaC Data Guide"] },
              { id: "fri-2", name: "Deploy Data Pipeline as Code", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete pipeline", resources: ["Pipeline Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "DataOps Best Practices", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "CI/CD for data", resources: ["DataOps Guide"] },
              { id: "sat-2", name: "Implement Data CI/CD", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "GitHub Actions for data", resources: ["DataOps Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete data engineering", resources: ["Career Summary"] },
              { id: "sun-2", name: "Portfolio & Jobs", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Data engineer roles", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== AI/ML ARCHITECT ====================
  "AI/ML Architect": {
    title: "AI/ML Architect",
    description: "Design end-to-end machine learning systems and MLOps pipelines.",
    totalWeeks: 3,
    icon: "🤖",
    color: "#A855F7",
    skills: ["ML Systems", "MLOps", "Model Deployment", "Feature Store", "MLflow", "Kubeflow", "Cloud ML"],
    weeklyPlan: {
      week1: {
        focus: "ML Systems Design",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "ML Systems Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "End-to-end ML systems", resources: ["ML Systems Guide"] },
              { id: "mon-2", name: "ML Lifecycle", time: "14:00 - 16:00", duration: "2h", type: "course", priority: "high", notes: "From data to production", resources: ["Lifecycle Guide"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Feature Store", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Feast, Tecton", resources: ["Feature Store Guide"] },
              { id: "tue-2", name: "Design Feature Store", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Feature engineering", resources: ["Feature Store Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Model Registry", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Model versioning", resources: ["Model Registry Guide"] },
              { id: "wed-2", name: "Setup MLflow", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Track experiments", resources: ["MLflow Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Data Validation Pipeline", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "TensorFlow Data Validation", resources: ["TFDV Guide"] },
              { id: "thu-2", name: "Implement Data Validation", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Schema validation", resources: ["Validation Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Model Training Architecture", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Distributed training", resources: ["Training Architecture"] },
              { id: "fri-2", name: "Design Training Pipeline", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Scalable training", resources: ["Training Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Batch vs Real-time Inference", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Trade-offs", resources: ["Inference Guide"] },
              { id: "sat-2", name: "Design Inference System", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "API design", resources: ["Inference Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review ML systems", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "MLOps", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "MLOps & Deployment",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "CI/CD for ML", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ML pipelines", resources: ["ML CI/CD Guide"] },
              { id: "mon-2", name: "Build ML Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "GitHub Actions", resources: ["ML Pipeline Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Model Serving", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "TensorFlow Serving, TorchServe", resources: ["Serving Guide"] },
              { id: "tue-2", name: "Deploy Model as API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "FastAPI + Model", resources: ["Serving Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Model Monitoring", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Drift detection", resources: ["Monitor Guide"] },
              { id: "wed-2", name: "Setup Monitoring", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Evidently AI", resources: ["Monitor Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Kubeflow", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "K8s-native ML", resources: ["Kubeflow Guide"] },
              { id: "thu-2", name: "Run Kubeflow Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Notebook to pipeline", resources: ["Kubeflow Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Cloud ML Architectures", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "SageMaker, Vertex AI", resources: ["Cloud ML Guide"] },
              { id: "fri-2", name: "Design Cloud ML System", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "AWS/GCP solution", resources: ["Cloud ML Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "AutoML & LLMOps", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Emerging trends", resources: ["LLMOps Guide"] },
              { id: "sat-2", name: "LLM Pipeline Design", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "RAG architecture", resources: ["RAG Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review MLOps", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Advanced Topics", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Scalable ML & Architecture Patterns",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Scalable ML Patterns", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Lambda, Kappa architecture", resources: ["Scalable ML Guide"] },
              { id: "mon-2", name: "Design Scalable Pipeline", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "High throughput", resources: ["Scalable Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Multi-Model Systems", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Model ensembles", resources: ["Multi-Model Guide"] },
              { id: "tue-2", name: "Shadow Deployment", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "A/B testing", resources: ["Shadow Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Data Privacy in ML", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Differential privacy", resources: ["Privacy Guide"] },
              { id: "wed-2", name: "Implement Privacy", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "TensorFlow Privacy", resources: ["Privacy Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "ML Architecture Review", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Assessment methods", resources: ["Review Guide"] },
              { id: "thu-2", name: "Review ML System", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Find improvements", resources: ["Review Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "ML Strategy & Roadmap", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Business alignment", resources: ["ML Strategy"] },
              { id: "fri-2", name: "Create ML Roadmap", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Organization-level", resources: ["Roadmap Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "ML Team Leadership", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Lead ML engineers", resources: ["Leadership Guide"] },
              { id: "sat-2", name: "ML Best Practices", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Standards, documentation", resources: ["Best Practices"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete ML architecture", resources: ["Career Summary"] },
              { id: "sun-2", name: "Community & Learning", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "ML conference prep", resources: [] }
            ]
          }
        }
      }
    }
  },

  // ==================== FULL-STACK TYPESCRIPT DEVELOPER ====================
  "Full-Stack TypeScript Developer": {
    title: "Full-Stack TypeScript Developer",
    description: "Build type-safe full-stack applications with TypeScript, Node.js, and React.",
    totalWeeks: 3,
    icon: "📘",
    color: "#3178C6",
    skills: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Prisma", "tRPC", "Next.js", "TailwindCSS"],
    weeklyPlan: {
      week1: {
        focus: "TypeScript Fundamentals",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "TypeScript Basics", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Types, interfaces, type inference", resources: ["TypeScript Handbook"] },
              { id: "mon-2", name: "Type Annotations", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Type functions", resources: ["TS Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Advanced Types", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Generics, unions, intersections", resources: ["Advanced TS"] },
              { id: "tue-2", name: "Utility Types", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Partial, Pick, Omit", resources: ["Utility Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "TypeScript with React", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Component props, hooks", resources: ["TS React Guide"] },
              { id: "wed-2", name: "Type React Components", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Props, state, events", resources: ["React TS Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "TypeScript with Node.js", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "ts-node, tsx, tsconfig", resources: ["Node TS Guide"] },
              { id: "thu-2", name: "Build TypeScript Server", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Express + TS", resources: ["Node TS Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Type Declarations", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "@types, declaration files", resources: ["Declaration Guide"] },
              { id: "fri-2", name: "Write Type Declarations", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Library typing", resources: ["Declaration Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "TypeScript Tooling", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "ESLint, Prettier, tsconfig", resources: ["Tooling Guide"] },
              { id: "sat-2", name: "Configure Project", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Strict mode", resources: ["Config Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review TypeScript", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Backend APIs", resources: [] }
            ]
          }
        }
      },
      week2: {
        focus: "Backend with TypeScript",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "Express.js with TypeScript", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Type-safe middleware", resources: ["Express TS Guide"] },
              { id: "mon-2", name: "Build REST API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "CRUD endpoints", resources: ["API Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "Prisma ORM", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Type-safe database", resources: ["Prisma Guide"] },
              { id: "tue-2", name: "Database Models", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Prisma schema", resources: ["Prisma Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "Zod Validation", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Runtime type safety", resources: ["Zod Guide"] },
              { id: "wed-2", name: "Validate API Inputs", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Request validation", resources: ["Zod Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "tRPC", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "End-to-end typesafe APIs", resources: ["tRPC Guide"] },
              { id: "thu-2", name: "Build tRPC API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Procedures", resources: ["tRPC Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Authentication (JWT)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Type-safe auth", resources: ["Auth Guide"] },
              { id: "fri-2", name: "Implement Auth", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Login/register", resources: ["Auth Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Database Optimization", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Indexing, queries", resources: ["DB Opt Guide"] },
              { id: "sat-2", name: "Optimize Database", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Prisma optimize", resources: ["Optimize Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Weekly Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Review backend", resources: ["Week Summary"] },
              { id: "sun-2", name: "Plan Next Week", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Frontend & Integration", resources: [] }
            ]
          }
        }
      },
      week3: {
        focus: "Frontend & Full-Stack Integration",
        days: {
          "Monday": {
            tasks: [
              { id: "mon-1", name: "React with TypeScript Deep Dive", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Advanced patterns", resources: ["React TS Deep"] },
              { id: "mon-2", name: "Custom Hooks with TS", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Reusable logic", resources: ["Hooks Practice"] }
            ]
          },
          "Tuesday": {
            tasks: [
              { id: "tue-1", name: "tRPC with React", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Full-stack typesafety", resources: ["tRPC React Guide"] },
              { id: "tue-2", name: "Connect Frontend to API", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "tRPC hooks", resources: ["tRPC React Practice"] }
            ]
          },
          "Wednesday": {
            tasks: [
              { id: "wed-1", name: "State Management (Zustand)", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "Type-safe store", resources: ["Zustand Guide"] },
              { id: "wed-2", name: "Implement Zustand", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Global state", resources: ["Zustand Practice"] }
            ]
          },
          "Thursday": {
            tasks: [
              { id: "thu-1", name: "Next.js 14 with TypeScript", time: "09:00 - 11:00", duration: "2h", type: "course", priority: "high", notes: "App Router", resources: ["Next.js TS Guide"] },
              { id: "thu-2", name: "Build Next.js App", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "high", notes: "Server components", resources: ["Next Practice"] }
            ]
          },
          "Friday": {
            tasks: [
              { id: "fri-1", name: "Full-Stack Project", time: "09:00 - 11:00", duration: "2h", type: "project", priority: "high", notes: "Plan architecture", resources: [] },
              { id: "fri-2", name: "Build Full-Stack App", time: "14:00 - 17:00", duration: "3h", type: "project", priority: "high", notes: "Complete application", resources: ["Full-Stack Project"] }
            ]
          },
          "Saturday": {
            tasks: [
              { id: "sat-1", name: "Testing TypeScript Apps", time: "10:00 - 12:00", duration: "2h", type: "course", priority: "medium", notes: "Jest, Vitest", resources: ["Testing Guide"] },
              { id: "sat-2", name: "Write Tests", time: "14:00 - 16:00", duration: "2h", type: "practice", priority: "medium", notes: "Type-safe tests", resources: ["Test Practice"] }
            ]
          },
          "Sunday": {
            tasks: [
              { id: "sun-1", name: "Final Review", time: "10:00 - 12:00", duration: "2h", type: "review", priority: "medium", notes: "Complete TypeScript full-stack", resources: ["Career Summary"] },
              { id: "sun-2", name: "Portfolio & Deployment", time: "15:00 - 16:00", duration: "1h", type: "planning", priority: "low", notes: "Deploy to Vercel/Railway", resources: [] }
            ]
          }
        }
      }
    }
  }
};

// Helper functions
export const getCareerData = (careerName) => {
  return CAREER_STUDY_PLANS[careerName] || CAREER_STUDY_PLANS["Software Architect"];
};

export const getCurrentWeekTasks = (careerName, currentWeek = 1) => {
  const career = getCareerData(careerName);
  const weekKey = `week${currentWeek}`;
  return career.weeklyPlan[weekKey] || career.weeklyPlan.week1;
};

export const getAllCareers = () => {
  return Object.keys(CAREER_STUDY_PLANS);
};

export const getTotalWeeks = (careerName) => {
  const career = getCareerData(careerName);
  return career.totalWeeks;
};