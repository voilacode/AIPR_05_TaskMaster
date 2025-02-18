# TaskMaster: AI-Powered Productivity Enhancer

## 🚀 Introduction

In a fast-paced world where efficiency and time management are paramount, **TaskMaster** emerges as a game-changing productivity enhancer powered by artificial intelligence. This platform redefines task management by offering intelligent tools to streamline workflows, prioritize tasks, and boost productivity.

Built using modern technologies such as **Node.js, Express, Tailwind CSS, and MySQL**, TaskMaster integrates AI-driven insights and automation to empower users in managing their professional and personal responsibilities effectively.

---

## ⚡ Features

- **Intelligent Task Management**: Streamline workflows with smart task creation, assignment, and tracking.
- **AI-Driven Insights**: Leverage AI algorithms to optimize schedules, prioritize tasks, and provide actionable recommendations.
- **Real-Time Notifications**: Stay updated with reminders and notifications for deadlines and task progress.
- **Collaboration Tools**: Enhance team productivity with shared task lists, comments, and real-time updates.
- **Goal Setting & Progress Tracking**: Set achievable goals and measure progress with precision.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: Tailwind CSS
- **Database**: MySQL
- **AI Integration**: Advanced algorithms for intelligent scheduling and productivity insights

---

## 🎨 User Experience

TaskMaster provides a seamless user experience through its intuitive interface and feature-rich functionality. It enables users to:

- Track tasks effortlessly
- Set and manage goals
- Measure progress with detailed analytics
- Collaborate with team members in real-time

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voilacode/AIPR_05_TaskMaster.git
   cd AIPR_05_TaskMaster
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

Insert default users into tables, the accounts are created with password as 12345

```sh
INSERT INTO users (name, phone, email, password, gender, location, role)
VALUES ('Admin', '1234567890', 'admin@gmail.com', '$2b$10$MN9cI0M2wzY2r8fJ6xazlOqKWgdPGBsNUWEZqtqBcyIb01fXs.WGW', 'male', 'Admin Location', 'admin');

INSERT INTO users (name, phone, email, password, gender, location, role)
VALUES ('User', '1234567890', 'user@gmail.com', '$2b$10$MN9cI0M2wzY2r8fJ6xazlOqKWgdPGBsNUWEZqtqBcyIb01fXs.WGW', 'male', 'User Location', 'user');
```

## Login Details

- **User Account:** email: user@gmail.com, password: 12345
- **Admin Account:** email: admin@gmail.com, password: 12345

### 4️⃣ Run the application by starting the server

```sh
node app.js
```

Open the browser and point the url to http://localhost:3000
