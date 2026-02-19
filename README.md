# Booking Service

Full-stack booking management application with:
- A React frontend for customer and admin workflows
- An Express/MongoDB backend with JWT-based authentication

## Tech Stack
- Frontend: React 18, React Router, Redux Toolkit, Axios, Bootstrap, MUI
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB

## Project Structure
```text
booking_service/
  backend/    # Express API + MongoDB models
  frontend/   # React app
```

## Prerequisites
- Node.js 18+ (recommended)
- npm 9+ (recommended)
- MongoDB connection string

## Environment Variables
Create `backend/.env` with:

```env
MONGO_URI=<your_mongodb_connection_string>
SECRET=<your_jwt_secret>
PORT=5000
```

## Installation
Install dependencies for both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the App
### Run frontend + backend together
From `backend/`:

```bash
npm start
```

This runs:
- Backend API on `http://localhost:5000`
- Frontend app on `http://localhost:3000`

### Run services separately
Backend:

```bash
cd backend
npm run server
```

Frontend:

```bash
cd frontend
npm start
```

## Authentication and Roles
- JWT auth is required for booking endpoints.
- Users can have roles: `customer`, `agent`, `admin`.
- Admin-only endpoints are under `/api/admin/*`.

## API Overview
Base backend URL: `http://localhost:5000`

### Auth Routes
- `POST /api/create-acc` - Create user account
- `POST /api/login` - Login and receive JWT

### Booking Routes (protected)
- `GET /api/bookings` - Get current user's bookings
- `GET /api/bookings/:id` - Get one booking by ID (owned by current user)
- `POST /api/bookings/schedule-booking` - Create booking
- `PATCH /api/bookings/update-booking/:id` - Update booking
- `DELETE /api/bookings/remove-booking/:id` - Delete booking

### Admin Routes (protected + admin role)
- `GET /api/admin/users` - List all users (password excluded)
- `GET /api/admin/bookings` - List all bookings

## Testing
Backend:

```bash
cd backend
npm test
```

Frontend:

```bash
cd frontend
npm test
```

## Notes
- Frontend uses a proxy to backend (`frontend/package.json`) pointing to `http://localhost:5000/`.
- If authentication fails, confirm `SECRET` matches token signing and verification in backend.
