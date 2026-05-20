# Task Management Web Application

A simple full-stack task management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, login, and manage their personal tasks.

## Features

- User registration and login using JWT Authentication
- Create, Read, Update, and Delete (CRUD) personal tasks
- Mark tasks as pending or completed
- Responsive, clean, and simple UI
- Data persistence with MongoDB

## Tech Stack

- **Frontend:** React.js, Vite, React Router DOM, CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, BcryptJS

## Project Structure

The repository contains two main folders:
- `backend/`: Node.js API server
- `frontend/`: React frontend application

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally or an Atlas connection string

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
   *Make sure your local MongoDB instance is running, or update `MONGO_URI` to point to your cloud DB.*
4. Start the backend server:
   ```bash
   npm run dev
   # or
   node server.js
   ```
   *The server will run on http://localhost:5000*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The app will run on http://localhost:5173 (or another port specified by Vite)*

## Usage

1. Open the frontend URL in your browser.
2. Click "Register" to create a new account.
3. Log in with your new credentials.
4. Use the dashboard to add new tasks, edit their status, or delete them.
