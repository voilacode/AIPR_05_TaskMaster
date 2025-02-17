# coreapp: Barebone Code Framework for Building Projects

## 🚀 Introduction

**coreapp** is a minimalistic code framework designed to serve as a foundation for building other applications. Built with **Node.js, Express, Tailwind CSS, and MySQL**, this framework provides the essential features required for authentication, role-based access control, and AI-driven content generation via the GPT Rapid API.

## 🎯 Features

- **Basic Authentication** – User login and registration system.
- **Role-Based Access Control** – Admins have access to all users' listings; users have limited access.
- **Admin Dashboard** – Admins can manage and view all user data.
- **AI-Powered Content Generation** – Generate content using the GPT Rapid API.
- **Tailwind CSS** – Sleek, responsive design for the user interface.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Tailwind CSS
- **Database:** MySQL
- **Authentication & Roles:** Csurf, Express Session
- **AI Integration:** GPT Rapid API for generating content.

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/voilacode/coreapp.git
cd coreapp
npm i
```

### 2️⃣ Setup Database Credentials

```sh
const mysql = require('mysql2');

const db = mysql
  .createPool({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'databasename',
  })
  .promise();

module.exports = db;
```

### 3️⃣ Setup Database

User table

```sh
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    location VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Insert default users with password as 12345

```sh
INSERT INTO users (name, phone, email, password, gender, location, role)
VALUES ('Admin', '1234567890', 'admin@gmail.com', '$2b$10$K7VtV9GZnFh1i.AJ1lDAauodmOPX6P5kpcKl7tt4jIhZ1P33mpsNi', 'male', 'Admin Location', 'admin');
INSERT INTO users (name, phone, email, password, gender, location, role)
VALUES ('User', '1234567890', 'user@gmail.com', '$2b$10$K7VtV9GZnFh1i.AJ1lDAauodmOPX6P5kpcKl7tt4jIhZ1P33mpsNi', 'male', 'User Location', 'user');
```

### 4️⃣ Start the Server

```sh
node app.js
```

convert this to an app called "SignSense: AI Hand Gesture-Based Language Interpreter", and keep table only of users table
