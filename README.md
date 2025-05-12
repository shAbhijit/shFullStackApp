# Full-Stack Application

This repository contains a full-stack application with a **NestJS** backend and a **React** frontend. The backend provides APIs for managing books and genres, while the frontend offers a responsive user interface for interacting with the application.

## Project Structure

```
/
  backend.Dockerfile       # Dockerfile for the backend service
  frontend.Dockerfile      # Dockerfile for the frontend service
  docker-compose.yml       # Docker Compose file to run the project
  packages/
    backend/               # Backend service (NestJS)
    frontend/              # Frontend service (React)
```

## Prerequisites

- Docker and Docker Compose installed on your system.

## Running the Project

To run the project using Docker, follow these steps:

1. Build and start the services:
   ```bash
   docker-compose up --build
   ```

2. Access the services:
   - **Frontend**: Open [http://localhost:8080](http://localhost:8080) in your browser.
   - **Backend**: The backend API is available at [http://localhost:3001](http://localhost:3001).

3. Stop the services:
   ```bash
   docker-compose down
   ```

## Running the Project Without Docker

To run the project without Docker, follow these steps:

1. Install dependencies for both the backend and frontend:
   ```bash
   npm install
   ```

2. Start the backend service:
   ```bash
   cd packages/backend
   npm run start:be
   ```

3. Start the frontend service:
   ```bash
   cd packages/frontend
   npm run start:fe
   ```

4. Access the services:
   - **Frontend**: Open [http://localhost:8080](http://localhost:8080) in your browser.
   - **Backend**: The backend API is available at [http://localhost:3001](http://localhost:3001).

## Additional Information

- The backend service uses **PostgreSQL** as the database.
- The frontend is built with **React** and styled using **Material-UI**.
- Both services are containerized and can be run independently or together using Docker Compose.

For more details, refer to the individual `README.md` files in the `packages/backend` and `packages/frontend` directories.
