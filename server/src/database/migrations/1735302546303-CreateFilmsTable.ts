import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsTable1735302546303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE films (
        id SERIAL PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR NOT NULL,
        "episodeId" INT NOT NULL,
        director VARCHAR NOT NULL,
        producer VARCHAR NOT NULL,
        "openingCrawl" TEXT NOT NULL,
        "releaseDate" VARCHAR NOT NULL,
        description TEXT NOT NULL,
        "charactersIds" INT[], -- Array of character IDs
        "planetsIds" INT[],    -- Array of planet IDs
        "starshipsIds" INT[],  -- Array of starship IDs
        "vehiclesIds" INT[],   -- Array of vehicle IDs
        "speciesIds" INT[],     -- Array of species IDs
        avatar varchar(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE films;`);
  }
}
