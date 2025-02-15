import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { People } from './modules/people/entities/people.entity';
import { Planets } from './modules/planets/entities/planets.entity';
import { Starships } from './modules/starships/entities/starships.entity';
import { Species } from './modules/species/entities/species.entity';
import { Vehicles } from './modules/vehicles/entities/vehicles.entity';
import { Films } from './modules/films/entities/films.entity';
import { Users } from './modules/users/entities/users.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [People, Planets, Starships, Species, Vehicles, Films, Users],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  logging: true,
  logger: 'advanced-console',
});
