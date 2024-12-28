# Star Wars Data Viewer

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
   git clone <your-repository-url>
   cd <your-repository-folder>
