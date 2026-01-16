# Bump2Baby Backend

Node.js/Express backend for the Bump2Baby application. This service provides authentication (register/login) backed by MongoDB, with request validation via Joi and JWT-based tokens.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Auth: JWT (`jsonwebtoken`)
- Password hashing: `bcryptjs`
- Validation: `joi`
- CORS: `cors`

## Project Structure

```
src/
	server.js              # Express app entry
	config/
		db.js                # MongoDB connection
	controllers/
		authController.js    # Register/login handlers
	models/
		User.js              # User schema + password hashing
	routes/
		authRoutes.js        # /api/auth routes
	validation/
		authValidation.js    # Joi schemas
```

## Prerequisites

- Node.js (recommended: LTS)
- A MongoDB connection string (local or Atlas)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Notes:

- `PORT` is optional (defaults to `5000`).
- CORS is currently configured to allow all origins (see `src/server.js`). If you want to restrict it, update the `cors()` middleware.

## Running the Server

- Development (auto-restart):

```bash
npm run dev
```

- Production:

```bash
npm start
```

Once running, the server will respond on:

- `GET /` → `Backend running successfully`

## API

Base path: `/api/auth`

All request bodies must be JSON.

### Register

`POST /api/auth/register`

Request body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "yourpassword",
  "role": "pregnant",
  "babyage": "Newborn"
}
```

Notes:

- `babyage` is required for all roles in the current backend.
- The backend also accepts `babyAge` (camelCase) and normalizes it to `babyage`.

Validation rules (Joi):

- `name`: string, min 3, required
- `email`: valid email, min 6, required
- `password`: string, min 6, required
- `role`: one of `pregnant`, `new_parent`, `caregiver`, required
- `babyage`: one of `Newborn`, `1mo`, `2mo`, `3mo`, `4mo`, `5mo`, `6mo`, `9mo`, `12mo`, required

Success response (201):

```json
{
  "_id": "...",
  "name": "Your Name",
  "email": "you@example.com",
  "role": "pregnant",
  "babyage": "Newborn",
  "token": "..."
}
```

Common error responses:

- `400` if validation fails or user already exists
- `500` if the server encounters an unexpected error

### Login

`POST /api/auth/login`

Request body:

```json
{
  "email": "you@example.com",
  "password": "yourpassword"
}
```

Success response (200):

```json
{
  "_id": "...",
  "name": "Your Name",
  "email": "you@example.com",
  "token": "..."
}
```

Common error responses:

- `400` if credentials are invalid or validation fails
- `500` if the server encounters an unexpected error

## Example cURL

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"role\":\"pregnant\",\"babyage\":\"Newborn\"}"
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

## Environment Variables

- `MONGO_URI` (required): MongoDB connection string
- `JWT_SECRET` (required): secret used to sign JWTs
- `PORT` (optional): server port (default `5000`)

## Notes

- Passwords are hashed automatically via a Mongoose `pre('save')` hook in `src/models/User.js`.
- JWT tokens are issued with an expiry of `7d`.
