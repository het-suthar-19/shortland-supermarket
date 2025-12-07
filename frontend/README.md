# Shortland Frontend

React + Vite frontend application for Softland Supermarket.

## Setup

1. Install dependencies:

```bash
npm install
```

2. (Optional) Configure environment variables in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:

```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features

- Modern React with Hooks
- TailwindCSS for styling
- Zustand for state management
- React Router for navigation
- Socket.io for real-time updates
- Responsive design

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
│   └── admin/      # Admin pages
├── store/          # Zustand stores
├── lib/            # Utilities and API
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```
