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

## Normal Installation

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
## Docker

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

 1. Clone the Repository
    ```bash
    git clone https://github.com/your-username/your-laravel-project.git
    cd your-laravel-project
    ```
2. Copy the ```.env``` File. Make sure to have a ```.env``` file in the project root. If it doesn't exist, you can create it:
    ```bash
    cp .env.example .env
    ```

3. Configure your .env file to connect to your MySQL database:
    ```bash
    POSTGRES_USER = your_username
    POSTGRES_PASSWORD = your_password
    POSTGRES_DB = your_db_name

    MAIL_FROM_ADDRESS="info@example.com"
    MAIL_FROM_NAME="Example Company"
    MAIL_DOMAIN_NAME ="example.com"
    ```

4. Build and Start the Containers To build and start the containers, run the following command:
    ```bash
    docker-compose up --build -d
    ```
5. Generate Application Key Run the following command to generate the application key:
    ```bash
    docker-compose exec <contatiner_name_for_backend> php artisan key:generate
    ```
6. Run Migrations To execute database migrations, use:
    ```bash
    docker-compose exec <contatiner_name_for_backend> php artisan migrate
    ```
### Stopping the Containers
1. To stop the running containers, use:
    ```bash
    docker-compose down
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
