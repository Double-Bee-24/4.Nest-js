import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {
  Planet,
  Species,
  Starship,
  Vehicle,
  Film,
  User,
  Person,
} from './database/entities';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Person, Planet, Starship, Species, Vehicle, Film, User],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});
