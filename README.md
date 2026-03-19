EaseDrive - Premium Car Rental System
EaseDrive is a high-performance, full-stack car rental application designed for seamless vehicle management and booking. Built with a focus on Serverless stability.
--Features
Owner Dashboard: Real-time management of car fleets and rental orders.
Smart Database Connection: Implemented a Singleton Pattern for Mongoose to prevent connection buffering timeouts in serverless environments.
Utilizing Lasy Loading and Suspense to break the application into smaller bundles
Responsive UI/UX: A clean, modern interface focused on high conversion and ease of use.
To test the Owner management features, use the following credentials:
email:=harshit@email.com
pass-harshit
--Tech Stack
Frontend: React.js + Vite,Tailwind CSS (UI/UX)
Backend: Node.js, Express.js
Image Storage-Cloudinary
Database: MongoDB Atlas (Mongoose ODM)
Deployment: Vercel (Serverless Functions)
--Technical Optimizations
Regional Routing
Configured via vercel.json to ensure all serverless functions execute in the BOM1 (Mumbai) region, ensuring the fastest possible data round-trip for users in South Asia.
