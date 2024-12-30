import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlanetsTable1735302557796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE planets (
        id VARCHAR PRIMARY KEY,
        description VARCHAR,
        diameter VARCHAR,
        "rotationPeriod" VARCHAR,
        "orbitalPeriod" VARCHAR,
        gravity VARCHAR,
        population VARCHAR,
        climate VARCHAR,
        terrain VARCHAR,
        "surfaceWater" VARCHAR,
        created TIMESTAMP,
        edited TIMESTAMP,
        name VARCHAR,
        url VARCHAR
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE planets;
    `);
  }
}