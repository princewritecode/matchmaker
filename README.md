# User Management API

<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js Logo" width="100" height="100">
  <h3>A RESTful API for User Management with Node.js and MongoDB</h3>

  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
  ![Node.js](https://img.shields.io/badge/Node.js-16.x-green.svg)
  ![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4.x-darkgreen.svg)
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Installation and Setup](#installation-and-setup)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Overview

This project is a robust Node.js and Express.js server that provides a RESTful API for comprehensive user management. The API integrates seamlessly with MongoDB using Mongoose to enable efficient CRUD operations on user records.

## ✨ Features

- **User Authentication** - Secure signup and login functionality
- **Email-based Retrieval** - Get user details using email addresses
- **User Feed** - List all registered users in the system
- **User Management** - Create, read, update, and delete user profiles
- **Data Validation** - Input validation for all API requests
- **Error Handling** - Comprehensive error responses

## 💻 Tech Stack

- **Runtime Environment**: [Node.js](https://nodejs.org/)
- **Web Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)

## 📁 Project Structure

```
.
├── config/                  # Configuration files
│   └── database.js          # MongoDB connection setup
├── model/                   # Data models
│   └── user.js              # User schema and model
├── routes/                  # API routes
│   └── user.routes.js       # User-related endpoints
├── middleware/              # Custom middleware
│   └── auth.js              # Authentication middleware
├── controllers/             # Request handlers
│   └── user.controller.js   # User-related logic
├── utils/                   # Utility functions
├── index.js                 # Main application entry point
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## 🔌 API Endpoints

### Authentication

#### 1. Register New User
```
POST /signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "emailId": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**
```
Status: 201 Created
Body: "user added successfully"
```

### User Operations

#### 2. Get User by Email
```
GET /user
```

**Request Body:**
```json
{
  "emailId": "john@example.com"
}
```

**Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe",
  "emailId": "john@example.com",
  "createdAt": "2023-05-14T10:30:00.000Z",
  "updatedAt": "2023-05-14T10:30:00.000Z"
}
```

#### 3. Get All Users
```
GET /feed
```

**Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "emailId": "john@example.com",
    "createdAt": "2023-05-14T10:30:00.000Z",
    "updatedAt": "2023-05-14T10:30:00.000Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c86",
    "name": "Jane Smith",
    "emailId": "jane@example.com",
    "createdAt": "2023-05-14T11:30:00.000Z",
    "updatedAt": "2023-05-14T11:30:00.000Z"
  }
]
```

#### 4. Delete User
```
DELETE /user
```

**Request Body:**
```json
{
  "userId": "60d21b4667d0d8992e610c85"
}
```

**Response:**
```
Status: 200 OK
Body: "deleted user successfully..."
```

#### 5. Update User
```
PATCH /user
```

**Request Body:**
```json
{
  "userId": "60d21b4667d0d8992e610c85",
  "name": "John Updated",
  "emailId": "johnupdated@example.com"
}
```

**Response:**
```
Status: 200 OK
Body: "user updated successfully..."
```

## 📥 Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- MongoDB (v4.4 or later)

### Clone the Repository
```bash
git clone https://github.com/yourusername/user-management-api.git
cd user-management-api
```

### Install Dependencies
```bash
npm install
```

### Configure Environment
Create a `.env` file in the root directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user_management
JWT_SECRET=your_jwt_secret_key
```

### Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000` by default.

## 📝 Usage Examples

### cURL

#### Register a new user
```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "emailId": "john@example.com", "password": "securepassword"}'
```

#### Get user by email
```bash
curl -X GET http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"emailId": "john@example.com"}'
```

### JavaScript (Fetch API)

```javascript
// Register a new user
async function registerUser() {
  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'John Doe',
      emailId: 'john@example.com',
      password: 'securepassword'
    }),
  });
  
  const data = await response.text();
  console.log(data);
}

// Get all users
async function getAllUsers() {
  const response = await fetch('http://localhost:3000/feed');
  const users = await response.json();
  console.log(users);
}
```

## ⚙️ Configuration

### Database Setup
The application connects to MongoDB using the connection string defined in `config/database.js`. You can modify this file to configure your database connection:

```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/princewritecode">Prince Patel</a></p>
  <p>
    <a href="https://github.com/yourusername">
      <img src="https://img.shields.io/github/followers/princewritecode?label=Follow&style=social" alt="GitHub">
    </a>
  </p>
</div>
