import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Person } from './modules/people/entities/people.entity';
import { Planet } from './modules/planets/entities/planets.entity';
import { Starship } from './modules/starships/entities/starships.entity';
import { Species } from './modules/species/entities/species.entity';
import { Vehicle } from './modules/vehicles/entities/vehicles.entity';
import { Film } from './modules/films/entities/films.entity';
import { User } from './modules/users/entities/users.entity';
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
