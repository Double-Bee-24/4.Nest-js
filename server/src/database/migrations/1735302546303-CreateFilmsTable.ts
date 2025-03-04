import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsTable1735302546303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE films (
        id SERIAL PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(255),
        "episodeId" INT,
        director VARCHAR(255),
        producer VARCHAR(255),
        "openingCrawl" TEXT,
        "releaseDate" VARCHAR(255),
        description TEXT,
        "charactersIds" VARCHAR(50)[],
        "planetsIds" VARCHAR(50)[],
        "starshipsIds" VARCHAR(50)[],
        "vehiclesIds" VARCHAR(50)[],
        "speciesIds" VARCHAR(50)[],
        avatar VARCHAR(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE films;`);
  }
}
