# DevAssist: Online Education Platform

## 🎓 Introduction
DevAssist aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a hub for instructors to showcase their expertise and connect with learners across the globe.

---

## 🛠️ System Architecture
The DevAssist EdTech platform consists of three main components: the **front-end**, the **back-end**, and the **database**. The platform follows a **client-server architecture**, with the front-end serving as the client and the back-end and database operating as the server.

---

## 🎨 Frontend Details
The front end of DevAssist includes all the essential pages for an ed-tech platform. Key sections include:

### 🧑‍🎓 For Students:
- **Homepage:** A brief introduction to the platform, with links to course listings and user details.
- **Course List:** Displays all available courses with their descriptions and ratings.
- **Wishlist:** Shows courses that a student has favorited for future enrollment.
- **Cart & Checkout:** Enables course purchase flow with integrated payment handling.
- **Course Content:** Presents course materials, including videos, documents, and related resources.
- **Profile & Edit Details:** Allows students to view and update their account information.

### 🧑‍🏫 For Instructors:
- **Dashboard:** Provides an overview of an instructor’s courses, ratings, and feedback.
- **Insights:** Offers detailed metrics on course views, clicks, and enrollments.
- **Course Management:** Enables creation, updating, and deletion of courses, as well as media uploads and pricing control.
- **Profile Management:** Lets instructors view and modify their profile details.

### 🛡️ Admin (Future Scope):
- **Admin Dashboard:** High-level overview of courses, instructors, and students.
- **Admin Insights:** Platform-wide metrics, such as total users, courses, and revenue.
- **Instructor Management:** Tools to manage instructor accounts, courses, and ratings.
- **User & Course Management:** Additional pages for comprehensive platform administration.

These pages are implemented using **ReactJS**, styled with **TailwindCSS**, and managed with **Redux** for state control.

---

## 🧩 Backend Details
Built with **NodeJS**, **ExpressJS**, and **MongoDB** (via Mongoose).

### Core Features
- **User Auth & Authz:** JWT, OTP verification, forgot-password flows.
- **Course Management:** CRUD operations, media uploads to Cloudinary.
- **Markdown Support:** Store and render content in Markdown format.
- **Media Management:** Cloudinary for images, videos, and docs.

### Data Models
- **Student:** name, email, password, enrolledCourses.
- **Instructor:** name, email, password, createdCourses.
- **Course:** title, description, instructorRef, mediaURLs, ratings.
---



