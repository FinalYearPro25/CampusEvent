# Event Management System

### Project Overview
Event Management System is a full-stack web application developed to simplify and streamline the process of planning, organizing, and managing events.

The project is divided into two parts:
- **Backend**: Built with [Laravel](https://laravel.com/), a PHP framework for robust API and server-side functionalities.
- **Frontend**: Built with [React](https://reactjs.org/) using [Vite](https://vitejs.dev/) for a fast development and build process.

---

## Technologies

- **Backend**: Laravel (PHP), PostgreSQL, REST API
- **Frontend**: React, Vite, Material UI
- **Package Manager**: npm (frontend), Composer (backend)

---

## Installation

### Backend (Laravel)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/event-management.git
   cd event-management/backend
   ```
2. Install backend dependencies using Composer:
    ```bash
    composer install
    ```
3. Set up your ```.env``` file:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
4. Configure your .env file to connect to your MySQL database:
    ```bash
    DB_DATABASE=your_database
    DB_USERNAME=your_username
    DB_PASSWORD=your_password

    MAIL_FROM_ADDRESS="info@example.com"
    MAIL_FROM_NAME="Example Company"
    MAIL_DOMAIN_NAME ="example.com"
    ```
5. Run database migrations:
    ```bash
    php artisan migrate
    ```
6. Start the backend development server:
    ```bash
    php artisan serve
    ```
### Frontend (React + Vite)

1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies using npm:
    ```bash
    npm install
    ```
3. Start the Vite development server:
    ```bash
    npm run dev
    ```

## Features

- Event Scheduling: Create, update, and manage events.
- Notifications: Email or push notifications to event attendees.
- User Authentication: Secure login and registration (backend).
- Responsive Design: Fully responsive design using Material UI for mobile, tablet, and desktop views.

## Usage
1. Open the backend server (Laravel) using ```php artisan serve``` or deploy to your server of choice (e.g., Apache, Nginx).
2. Open the frontend (React + Vite) by running ```npm run dev``` for development or ```npm run build``` to create a production build.
### Access the Application:
- Frontend: Navigate to the URL where Vite is running (e.g., http://localhost:3000).
- Backend API: Access the Laravel backend through http://localhost:8000/api.

### License
This project is licensed under the MIT License.
