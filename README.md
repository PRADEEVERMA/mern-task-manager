# 🚀 MERN Task Manager

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

A full-stack Task Manager application built using the MERN stack (MongoDB, Express.js, React, Node.js).  
This application allows users to manage their daily tasks efficiently with authentication, task tracking, and a clean UI.

---

## 📸 Screenshots

![Home](/images/home.png)
![Signup](/images/singup.png)
![Login](/images/login.png)
![Task Details](/images/taskdetails.png)
![Edit Task](/images/taskedit.png)

---

## 🌟 Features

- 🔐 User Authentication (JWT + Google OAuth)
- 📝 Create, update, delete tasks
- 📊 Task status management (To Do, In Progress, Done)
- 🔄 Drag & Drop task movement
- ⚡ Optimized UI with React Query
- 🛡️ Protected routes
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- React Query
- Tailwind CSS
- Axios
- Firebase (Google Auth)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt.js
- Cookie Parser

---

## 🚀 Live Demo

👉 https://taskmanger-4sy5.onrender.com

---

## ⚙️ Run Locally

### 1. Clone repo

```bash
git clone https://github.com/PRADEEVERMA/mern-task-manager.git
cd mern-task-manager
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
COOKIE_SECRET=your_cookie_secret
FRONTEND_BASE_URL=http://localhost:5173
```

Run backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env`:

```env
VITE_BACKEND_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
```

Run frontend:

```bash
npm run dev
```

---

## 🚀 Future Improvements

- User profile & avatar
- Notifications system
- UI enhancements
- Dark mode

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Pradeep Verma**

- 🔗 GitHub: https://github.com/PRADEEVERMA  
- 🔗 LinkedIn: https://www.linkedin.com/in/pradeep-verma-533216318/  

---

⭐ If you like this project, give it a star ⭐
