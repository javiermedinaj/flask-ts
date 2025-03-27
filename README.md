# Biblioteca Digital

A comprehensive digital library system with a Flask backend, React frontend, and data scraping capabilities.

## Project Overview

This project implements a digital library platform inspired by the Biblioteca Nacional Mariano Moreno, featuring:
- Book catalog and management
- User authentication system
- Cultural events calendar
- News section
- Modern, responsive UI with TailwindCSS

## Tech Stack

### Backend (back)
- Flask web framework
- SQLAlchemy ORM
- Flask-Login for authentication
- SQLite database

### Frontend (books-front)
- React 19
- TypeScript
- TailwindCSS 4
- Vite build tool
- React Router for navigation
- Lucide icons

### Data Scraper (scraper-data)
- Go (Golang)
- ChromeDP for browser automation
- JSON data storage

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory.
2. Create a virtual environment.
3. Install dependencies.
4. Run the application:
   - The server will start on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies.
3. Start the development server:
   - The application will be available at http://localhost:5173

### Scraper Setup
1. Navigate to the scraper directory.
2. Install Go dependencies.
3. Run the scraper.

## Features

- Book Management: Browse, search, and filter books by category and price range.
- User Authentication: Secure login system with password hashing.
- Events Calendar: Display of upcoming cultural events.
- News Section: Latest updates and articles.
- Responsive Design: Works on desktop and mobile devices.

### Running Tests
For backend tests:

### Building for Production
To build the frontend for production:
- The build artifacts will be stored in the books-front/dist/ directory.

