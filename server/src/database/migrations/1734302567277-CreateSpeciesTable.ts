import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpeciesTable1734302567277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE species (
        id SERIAL PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description TEXT,
        classification VARCHAR(255),
        designation VARCHAR(255),
        "averageHeight" VARCHAR(255),
        "averageLifespan" VARCHAR(255),
        "hairColors" VARCHAR(255),
        "skinColors" VARCHAR(255),
        "eyeColors" VARCHAR(255),
        "homeworldId" VARCHAR(50),
        language VARCHAR(255),
        pilots VARCHAR(255),
        "peopleIds" VARCHAR(50)[],
        name VARCHAR(255),
        "speciesId" VARCHAR(24),
        avatar VARCHAR(255),
        "planetId" INT,
        CONSTRAINT "fkPeoplePlanet" FOREIGN KEY ("planetId") REFERENCES planets(id) ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE species;
    `);
  }
}
