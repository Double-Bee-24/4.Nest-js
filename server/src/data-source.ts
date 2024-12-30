import { DataSource } from 'typeorm';
import { People } from 'src/people/entities/people.entity';
import * as dotenv from 'dotenv';
import { Planets } from './planets/entities/planets.entity';
import { Starships } from './starships/entities/starships.entity';
import { Species } from './species/entities/species.entity';
import { Vehicles } from './vehicles/entities/vehicles.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [People, Planets, Starships, Species, Vehicles],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
