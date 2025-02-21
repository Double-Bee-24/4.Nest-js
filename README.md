# Star Wars Universe Observer

A project for displaying data from the Star Wars universe in tables. It uses NestJS, TypeORM with PostgreSQL for the backend and React for the frontend.

## Technologies

- **NestJS**: A framework for building server-side applications in Node.js.
- **TypeORM**: An ORM for working with PostgreSQL.
- **PostgreSQL**: A relational database management system.
- **React**: A library for building user interfaces.
- **Axios**: For making HTTP requests on the server side.
- **RxJS**: A library for handling asynchronous events.

## Description

This project collects data from the public API [swapi.tech](https://www.swapi.tech/), which contains information about characters, planets, starships, species, and other entities from the Star Wars universe. The data is fetched through the API, stored in a PostgreSQL database, and displayed in tables on the frontend.

## Project Structure

1. **Backend**: 
   - API implementation using **NestJS**.
   - **TypeORM** is used for interacting with PostgreSQL.
   - Models and migrations for storing data.

2. **Frontend**:
   - **React** for displaying the data.
   - Tables to display data for each category (People, Planets, Species, Starships, Vehicles).
   
3. **Database**:
   - PostgreSQL for storing Star Wars data.

## Running the Project

### 1. Backend Setup (NestJS)

1. Clone the repository:
   ```bash
   git clone https://github.com/Double-Bee-24/4.Nest-js.git
   cd <your-repository-folder>

### 2. Environment Setup for the Project

## Server Configuration (server)
In the root folder of `server`, create a `.env` file and add the following environment variables:

```
PORT=4000
CLIENT_PORT=3000

DB_HOST=localhost
DB_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_database_password
POSTGRES_DB=starwars_db

SWAPI_URL="https://www.swapi.tech/api"

JWT_SECRET=your_jwt_secret
```
> **Note:** Replace `your_database_password` with your actual database password and `your_jwt_secret` with your own JWT secret key.

---

## Client Configuration (client)
In the `client` folder, create a `.env` file and add the following environment variable:

```
VITE_BASE_API_URL=http://localhost:4000/api/
```

This will allow the client-side to interact with the server-side API.

---

Once the environment is set up, the project will be ready to run!


