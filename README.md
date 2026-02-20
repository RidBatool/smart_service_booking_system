# Smart Service Booking & Management System (SSBMS)

Full-stack MERN booking platform with:
- Customer booking workflow
- Service Provider (agent) service management
- Admin monitoring and provider approval workflow

## Tech Stack
- Frontend: React 18, React Router, Redux Toolkit, Axios, Bootstrap, MUI
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB

## Project Structure
```text
booking_service/
  backend/
    controllers/
    models/
    routes/
    middleware/
    utils/
  frontend/
    src/
      components/
      pages/
      redux/
      hooks/
      services/
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
- Users can have roles: `customer`, `agent` (provider), `admin`.
- Provider (`agent`) accounts require admin approval (`isApproved`) before access.
- Public signup can create only `customer` or `agent` accounts.
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

### Service Routes (protected)
- `GET /api/services` - List all services
- `GET /api/services/my-services` - List current provider/admin services
- `GET /api/services/:id` - Get one service
- `POST /api/services` - Create service (provider/admin)
- `PATCH /api/services/:id` - Update owned service (provider/admin)
- `DELETE /api/services/:id` - Delete owned service (provider/admin)

### Admin Routes (protected + admin role)
- `GET /api/admin/users` - List all users (password excluded)
- `GET /api/admin/bookings` - List all bookings
- `GET /api/admin/providers/pending` - List providers awaiting approval
- `PATCH /api/admin/providers/:id/approve` - Approve provider account
- `PATCH /api/admin/providers/:id/reject` - Mark provider as not approved

## Frontend Routes
- `/` - Customer dashboard
- `/provider` - Provider dashboard (approved providers)
- `/admin` - Admin dashboard
- `/login`, `/create-account`, `/admin-login` - Public auth pages

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
