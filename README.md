# 🚀 EasyURL – Advanced URL Shortener (MERN Stack) 🌐

Welcome to **EasyURL**, a fully-featured, full-stack **URL Shortener** built with the **MERN** stack. This project simulates a real-world SaaS-style product complete with analytics, authentication, sharing, QR generation, and more.

## 🔗 Live Demo

👉 https://www.easurl.xyz

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ **React + Vite** – Fast, optimized single-page performance
* 🎨 **TailwindCSS v4 + Headless UI** – Modern, responsive UI
* 📊 **recharts + react-simple-maps** – Rich data visualizations and geo-based analytics
* 🔗 **react-share** – Easy sharing to social platforms

### Backend

* 🧠 **Node.js + Express + MongoDB** – Robust and scalable backend
* 🛡️ **JWT Authentication** – Secure login and protected routes
* ✉️ **Nodemailer** – Password reset via secure email link
* 📁 **Multer** – Profile image upload handling
* 📷 **QR Code Generator** – Downloadable QR for each short URL

---

## ✨ Features

* 🔗 Create and customize short URLs
* 📈 Track total clicks and geo-location-based insights
* 📤 Share URLs via social platforms
* 📷 Generate and download QR codes for shortened URLs
* 🔐 Secure JWT-based authentication, email-based password reset through nodemailer
* 🖼️ Upload user profile images or custom images

---

## ⚙️ Installation & Setup

### Prerequisites

* **Node.js** (v18 or later recommended)
* **MongoDB** / MongoDB Atlas
* **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Sabbirhossain97/EasyURL.git
cd EasyURL
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the required environment variables.

Then start the backend:

```bash
npm run dev
```

### 3. Install Frontend Dependencies

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory and add the required environment variables.

Then start the frontend:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🚀 Deployment

| Component     | Platform          |
| ------------- | ----------------- |
| Frontend      | **Vercel**        |
| Backend / API | **Render**        |
| Database      | **MongoDB Atlas** |

* **Frontend:** Deployed on Vercel
* **Backend / API:** Deployed on Render
* **Database:** Hosted on MongoDB Atlas

---

## 📚 What I Learned

Through this project, I explored and implemented:

* 🔍 **MongoDB Aggregation Pipeline** – For advanced stats and analytics
* 🧩 **Clean API architecture** – With modular middleware and route protection
* ⚙️ **End-to-end full-stack workflow** – From frontend UI/UX to backend API design and deployment

---

⭐ If you find this project useful, consider giving it a star!
