# Star Wars Universe

A project for displaying data from the Star Wars universe in tables. It uses NestJS, TypeORM with PostgreSQL for the backend and React for the frontend. Currently under development.

## Technologies

- **NestJS**: A framework for building server-side applications in Node.js.
- **TypeORM**: An ORM for working with PostgreSQL.
- **PostgreSQL**: A relational database management system.
- **React**: A library for building user interfaces.
- **Axios**: For making HTTP requests.
- **Typescript**: Development with stricter type safety
- **Zod**: A library that helps to check data that typescripts passes.
- **Eslint**: Statically analyzes your code to quickly find problems.
- **Prettier**: Code style formatter.
- **Swagger**: Different use cases - development, interaction with APIs, and documentation.

## Features

- **Migrations to fetch and set up data from Starwars API**
- **CRUD operations with Starwars API data**
- **Ability to upload an image as an avatar**
- **Simple jwt authentication - in process** 

> **Note:** To retrieve some data, the Star Wars API website was used: https://swapi.dev/

## Description

This project collects data from the public API [swapi.tech](https://www.swapi.tech/), which contains information about characters, planets, starships, and other entities from the Star Wars universe. The data is fetched through the API, stored in a PostgreSQL database, and displayed in tables on the frontend.

## Project Structure

1. **Backend**: 
   - API implementation using **NestJS**.
   - **TypeORM** is used for interacting with PostgreSQL.
   - Models and migrations for storing data.

2. **Frontend**:
   - **React** for displaying the data.
   - Tables to display data for each category (People, Planets, Species, Starships, Vehicles, Films).
   
3. **Database**:
   - PostgreSQL for storing Star Wars data.

## Running the Project

### 1. Backend Setup (NestJS)

1. Clone the repository:
```bash
   git clone https://github.com/Double-Bee-24/4.Nest-js.git
```

2. Install dependencies in both server and client directories:
```bash
   npm i
```
### 2. Environment Setup for the Project

### Server Configuration (server)
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

### Client Configuration (client)
In the `client` folder, create a `.env` file and add the following environment variable:

```
VITE_BASE_API_URL=http://localhost:4000/api/
```

This will allow the client-side to interact with the server-side API.

---
### Running the project

In the server folder you can once run this command
```bash
npm run quick
```
to quickly build, run migrations and start the server

After that you can run the project by running:
```bash
npm run start:dev
```

If you would like to download data from Starwars api, go to http://localhost:4000/swagger/ , find Swapi section and execute GET: /api/swapi, then GET: /api/swapi/relationships

In the client folder to run frontend part of the app you can just use:
```bash
npm run dev
```


