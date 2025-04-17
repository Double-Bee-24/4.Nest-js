# Star Wars Universe

Fullstack project for displaying data from the Star Wars universe in tables. It uses NestJS, TypeORM with PostgreSQL for the backend and React for the frontend. Currently under development.

## Prerequisites

To run this project you need to have installed:

- [Docker](https://www.docker.com/)
- Docker Compose

Make sure that Docker Engine is running

## Technologies

- **NestJS**: A framework for building server-side applications in Node.js. Built on top of ExpressJS.
- **PostgreSQL**: A relational database management system.
- **TypeORM**: An ORM for working with PostgreSQL.
- **React**: A library for building user interfaces.
- **TypeScript**: A superset of JavaScript that provides stricter type safety.
- **Axios**: A library for making HTTP requests.
- **Zod**: A library that helps with data validation in TypeScript.
- **ESLint**: A static code analysis tool for finding problems in your code.
- **Prettier**: A code formatter for maintaining consistent style.
- **Swagger**: A tool for API interaction and automatic documentation generation.
- **REST**: An architectural style for interacting with web services.
- **Docker**: A tool to run your code in isolated environments.
- **Docker Compose**: Simplier way to configure app with multiple containers.
- **Prometheus**: Tool for collecting metrics from the app.
- **Grafana**: Tool for metrics visualization, used along with Prometheus.
- **Caddy**:
  - Used to reverse proxy requests on different services
  - Automatically updates TLS certificate (domain name required)

## Features

- **Migrations to fetch and set up data from Starwars API**
- **CRUD operations with Starwars API data**
- **Ability to upload an image as an avatar**
- **Predifined grafana datasource and dashobards**

> **Note:** To retrieve some data, the Star Wars API website was used: https://swapi.dev/, but due to recent and frequent SW api changes, data was downloaded into seeding_data.json

## Project Structure

- 📁.github - Deploy workflow
- 📁bash - Some useful scripts (migrations, seeding, swap increase, )
- 📁client - React UI code
- 📁docker - Docker configurations for prometheus and grafana
- 📁server - NestJS server code

## Running the Project

### 1. Project Setup

1. Clone the repository:

```bash
   git clone https://github.com/Double-Bee-24/4.Nest-js.git
```

### 2. Environment Setup for the Project

To simplify this step .env.template files were provided to both 'client' and 'server' folder. You can configure it up to your needs

### 3. Running the project

In the root folder execute the next command

```bash
docker compose -f docker-compose.prod.yml up --build
```

Enter the 'bash' folder and run next scripts:

```
./run_migrations.sh
```

```
./run_seeding.sh
```

Or you can look into these scripts and perform the logic manually.
Other script might be useful in case if you want to execute your app on Amazon EC2 instance.
