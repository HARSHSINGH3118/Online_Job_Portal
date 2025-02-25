# HireBridge

A full-stack web application for a job portal with multiple user roles (Admin, Employer, Job Seeker). The portal features user authentication (including Google OAuth), job posting and management, applicant tracking, password reset functionality, and a modern, responsive frontend built with React, Vite, and Tailwind CSS.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

The Online Job Portal is a comprehensive platform that connects job seekers with employers. The backend is built using Node.js, Express, and MongoDB, while the frontend is developed with React, Vite, and Tailwind CSS for a modern, responsive user interface. The application supports JWT-based authentication and integrates Google OAuth for seamless login.

## Features

### User Authentication & Authorization
- Register, login, and logout with JWT-based authentication.
- Password reset functionality (via email using Nodemailer).
- Google OAuth integration.

### Role-Based Dashboards
- Employers can post jobs, view, clone, delete job listings, and manage applicant details.
- Job Seekers can browse available jobs, apply with a resume, cover letter ("why"), and experience details, and view their application status.

### Job Management
- Employers can create, update, and delete job postings.
- Clone functionality to duplicate job postings.
- Pagination, search, and sorting on job listings.

### Applicant Tracking
- Employers can view applicants per job.
- Update application status (e.g., call for interview).

### Profile Management
- Users can view and update their profiles.
- Upload a profile picture via multer.

### Modern Frontend UI
- Responsive design using Tailwind CSS.
- A classy Home page featuring a background image, glassmorphism effects, animated stats, a featured jobs carousel, testimonials, a search & filter bar, and more.
- Separate multi-tab dashboards for job seekers and employers.

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Passport (with Google OAuth strategy)
- Nodemailer for email notifications (password reset)
- Multer for file uploads

### Frontend
- React (with Vite as the build tool)
- Tailwind CSS for styling
- Axios for HTTP requests
- React Router for client-side routing

## Installation & Setup

### Backend Setup

Clone the repository and navigate to the backend folder:

```bash
git clone https://github.com/yourusername/online-job-portal.git
cd online-job-portal/backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend folder with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/online-job-portal
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Run the backend server:

```bash
npm run dev
```

### Frontend Setup

Navigate to the frontend folder:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Ensure Tailwind CSS is configured correctly:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Run the frontend:

```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user (roles: employer, jobseeker).
- `POST /auth/login` - Login and receive JWT.
- `POST /auth/logout` - Logout.
- `POST /auth/forgot-password` - Send reset password email.
- `POST /auth/reset-password` - Reset password.
- `GET /auth/google` - Initiate Google OAuth.
- `GET /auth/google/callback` - Google OAuth callback.

### Employer Endpoints
- `POST /employers/jobs` - Create a job listing.
- `GET /employers/jobs` - Get all jobs posted by the employer.
- `PATCH /employers/jobs/:id` - Update a job listing.
- `DELETE /employers/jobs/:id` - Delete a job listing.
- `GET /employers/applications` - Get all applications for jobs posted by the employer.
- `PATCH /employers/applications/:id` - Update application status (e.g., call for interview).
- `POST /employers/jobs/:id/clone` - Clone a job posting.

### Job Seeker Endpoints
- `GET /jobs` - Get all job listings.
- `GET /jobs/:id` - Get a specific job listing.
- `POST /jobs/:id/apply` - Apply for a job (requires fields: resume, why, experience).
- `GET /applications` - Get all applications made by the job seeker.
- `DELETE /applications/:id` - Withdraw an application.

### Profile Management
- `GET /profile` - View user profile.
- `PATCH /profile` - Update profile (including uploading a profile picture).

## Folder Structure

```bash
online-job-portal/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── app.js
│   ├── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── index.css
    │   ├── App.jsx
    │   ├── main.jsx
    ├── package.json
    ├── vite.config.js
```

## Future Enhancements

- **Real-Time Chat**: Integrate Socket.IO for real-time messaging between job seekers and employers.
- **Interview Scheduler**: Allow employers to schedule interviews directly via the portal.
- **AI Recommendations**: Provide personalized job recommendations for job seekers.
- **Advanced Analytics**: Create an admin dashboard for platform metrics.
- **Mobile App**: Develop a mobile version using React Native.

## Developed By

This project is developed by **Harsh Singh**.

## License

This project is licensed under the MIT License.

