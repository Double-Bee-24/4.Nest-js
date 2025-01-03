import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpeciesTable1735302567277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE species (
        id INT PRIMARY KEY,
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
        homeworld VARCHAR(255),
        language VARCHAR(255),
        people VARCHAR(255),
        name VARCHAR(255),
        "speciesId" varchar(24)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE species;
    `);
  }
}
