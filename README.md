# QuickHire

QuickHire is a full-stack job platform with:

- Frontend: Next.js (`frontend`)
- Backend: Node.js + Express + MongoDB (`backend`)

## Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas (or local MongoDB)

## 1) Clone and install dependencies

From the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 2) Configure backend environment

Create `backend/.env` and add:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
```

You can copy values from `backend/.env.example`.

## 3) Run backend locally

In terminal 1:

```bash
cd backend
npm run dev
```

Backend API runs at: `http://localhost:5000`

## 4) Run frontend locally

In terminal 2:

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:3000`

Frontend uses `NEXT_PUBLIC_API_URL` if set; otherwise defaults to:

```text
http://localhost:5000/api
```

If needed, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 5) Seed demo data (optional)

After backend `.env` is configured:

```bash
cd backend
npm run seed
```

This inserts sample jobs and applications for testing.

## Useful scripts

Backend (`backend/package.json`):

- `npm run dev` - run backend with nodemon
- `npm start` - run backend in production mode
- `npm run seed` - seed demo data

Frontend (`frontend/package.json`):

- `npm run dev` - run Next.js dev server
- `npm run build` - build production app
- `npm start` - start production server
- `npm run lint` - run eslint
