import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { People } from 'src/people/entities/people.entity';
import { Planets } from './planets/entities/planets.entity';
import { Starships } from './starships/entities/starships.entity';
import { Species } from './species/entities/species.entity';
import { Vehicles } from './vehicles/entities/vehicles.entity';
import { Films } from './films/entities/films.entity';
import { Users } from './users/entities/users.entity';
import { Sessions } from './utils/typeorm-session';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    People,
    Planets,
    Starships,
    Species,
    Vehicles,
    Films,
    Users,
    Sessions,
  ],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
