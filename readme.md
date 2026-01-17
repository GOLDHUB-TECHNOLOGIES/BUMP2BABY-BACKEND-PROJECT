# Bump2Baby Backend

A secure and scalable backend API for the Bump2Baby application, built with Node.js, Express, and MongoDB.

## 📋 Overview

This backend service provides authentication and user management functionality for the Bump2Baby platform. It implements JWT-based authentication, input validation, and secure password handling.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Password Security**: Password hashing using bcrypt
- **Input Validation**: Request validation using Joi
- **MongoDB Integration**: Database persistence with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure configuration using environment variables

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: bcrypt for password hashing

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd BUMP2BABY-BACKEND-PROJECT
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

Or for production:

```bash
npm start
```

## 📁 Project Structure

```
src/
├── server.js              # Application entry point
├── config/
│   └── db.js             # Database configuration
├── controllers/
│   └── authController.js # Authentication logic
├── models/
│   └── User.js           # User data model
├── routes/
│   └── authRoutes.js     # Authentication endpoints
└── validation/
    └── authValidation.js # Request validation schemas
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT token

## 🔐 Environment Variables

| Variable      | Description                          | Required |
| ------------- | ------------------------------------ | -------- |
| `PORT`        | Server port number                   | Yes      |
| `MONGODB_URI` | MongoDB connection string            | Yes      |
| `JWT_SECRET`  | Secret key for JWT signing           | Yes      |
| `NODE_ENV`    | Environment (development/production) | No       |

## 🧪 Development

The project uses nodemon for development with hot-reloading:

```bash
npm run dev
```

## 📝 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for Bump2Baby
