# 🎓 CourseReview – For College Students: Course Review/Feedback Platform

A full-stack web application where students can browse and post reviews about courses from colleges across the U.S. Users can register, leave feedback on courses they've taken, and view insights shared by others.

🌐 Live Demo: [https://pern-webdev.onrender.com](https://pern-webdev.onrender.com)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Planned Features](#planned-features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Setup](#setup)

---

## 🔍 Overview

This project aims to create a space for students to share honest feedback about courses they've taken, helping future students make better-informed decisions. The platform supports user authentication, personalized profiles, and organized course data by university.

---

## 🧩 Main Features

- **🏠 Home Page**
  - Brief intro and navigation to all key pages

- **📝 Register / 🔐 Login / 🚪 Logout**
  - Secure user account system

- **📋 Main Page**
  - Add and delete your own comments
  - Select a specific college and browse courses within it
  - View comments from other users on each course

---

## 🧪 Planned Features

- 🚫 Currently, universities and courses are added manually because there is no external API available for fetching course data per university.
  - ➡️ This is a major limitation I'm actively thinking about...
- Course creation and management UI
- Admin/moderator role to manage duplicate or invalid courses
- Profile Page
  - Displays user info: age, attended/attending college
  - Adds a "Verified" badge for users who attended the reviewed college

---

## 🖼️ Screenshots

<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <img src="./assets/About.png" alt="About" width="600"/>
  <img src="./assets/Login.png" alt="Login" width="600"/>
  <img src="./assets/Register.png" alt="Register" width="600"/>
  <img src="./assets/About2.png" alt="Review" width="600"/>
  <img src="./assets/Search.png" alt="Search" width="600"/>
  <img src="./assets/Review.png" alt="Review" width="600"/>
  <img src="./assets/Review2.png" alt="Review" width="600"/>
  
  
</div>

---

## ⚙️ Tech Stack

**Frontend:**
- React + TypeScript
- React-Bootstrap for styling
- React Router DOM for routing

**Backend:**
- Express.js
- Node.js
- PostgreSQL for comments/users data

**Other:**
- Cookie-based session authentication (JWT)
- Bcrypt for securely hashing and storing user passwords
- Deployed on [Render](https://pern-webdev.onrender.com)

---

## 🧑‍💻 Setup

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) installed
- [PostgreSQL](https://www.postgresql.org/) installed and running locally
- A `.env` file set up for backend

Create a .env file inside the /server directory and add the following:
```
# Server settings
PORT=port_number

# PostgreSQL database configuration
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432

# JWT secret for authentication
JWT_SECRET=your_jwt_secret_key
```
📝 Replace the placeholder values with your actual PostgreSQL setup.
✅ Make sure the database is created before running the server.

---

### 📦 Clone & Install

> ⚠️ This project uses `main` as the deployment branch.  
> To get the latest development version, please clone the `dev` branch:

```bash
git clone -b dev https://github.com/dbalstjr16/PERN_webdev.git
cd my-fullstack-app

# Install root dependencies (e.g., concurrently)
npm install

# Install frontend dependencies (react-boostrap, boostrap, react-router-dom)
cd client
npm install

# Install backend dependencies (bcrypt, cookie-parser, cors, dotenv, express, jsonwebtoken, pg)
cd ../server
npm install
```

---

## 🐳 Docker Support (Optional Testing Branches)

If you'd like to test or run this project using Docker instead of setting everything up manually, you can check out the following feature branches:

### 🔀 `feature/docker`

This branch provides a basic Docker setup for local development:

- Includes `Dockerfile` and `docker-compose.yml`
- Spins up both the client and server containers
- Connects to a local PostgreSQL container

**How to try it:**

```bash
git checkout feature/docker
cd my-fullstack-app
docker-compose up --build
```
---

### 🚀 `feature/deployWithDocker`

This branch includes **production-ready Docker configurations** for deploying the app in a containerized environment:

- Uses **multi-stage builds** in the `Dockerfile` to reduce image size
- Includes `docker-compose.yml` for orchestrating containers in production
- Serves the frontend with **Nginx**
- Prepares backend and database services for deployment

**How to try it:**

```bash
git checkout feature/deployWithDocker
cd my-fullstack-app
docker-compose --build
```

#### 🛠️ Environment Setup For Both 🔀 `feature/docker` and 🚀 `feature/deployWithDocker`

You must create a `.env` file in the **same directory** as `docker-compose.yml`.  
This file will be used to pass environment variables into the backend container.

**Example `.env` file:**

```env
# PostgreSQL Configuration
DB_HOST=db
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key
