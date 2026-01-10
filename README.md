# SimpleBank Frontend

A modern React + TypeScript frontend for the SimpleBank application.

## Features

- **User Management**: Create, view, update, and delete users
- **Account Management**: Create, list, view, update balance, and delete accounts
- **Money Transfers**: Transfer money between accounts
- **Modern UI**: Built with React, TypeScript, Tailwind CSS, and Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── client.ts          # API client for backend communication
│   ├── pages/
│   │   ├── Home.tsx          # Home page
│   │   ├── Users.tsx         # User management page
│   │   ├── Accounts.tsx      # Account management page
│   │   └── Transfers.tsx     # Transfer money page
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## API Endpoints

The frontend communicates with the backend API at `/api/v1`:

- **Users**: `/api/v1/users`
- **Accounts**: `/api/v1/accounts`
- **Transfers**: `/api/v1/transfers`

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework

