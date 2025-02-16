import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PeopleModule } from './modules/people/people.module';
import { Person } from './modules/people/entities/people.entity';
import { FilmsModule } from './modules/films/films.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { SpeciesModule } from './modules/species/species.module';
import { StarshipsModule } from './modules/starships/starships.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { SwapiModule } from './modules/swapi/swapi.module';
import { Planet } from './modules/planets/entities/planets.entity';
import { Species } from './modules/species/entities/species.entity';
import { Starship } from './modules/starships/entities/starships.entity';
import { Vehicle } from './modules/vehicles/entities/vehicles.entity';
import { Film } from './modules/films/entities/films.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [Person, Planet, Species, Starship, Vehicle, Film, User],
        synchronize: false,
        migrations: [],
      }),
    }),
    PeopleModule,
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
    SwapiModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}
}
