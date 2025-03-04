import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlanetsTable1734302557796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE planets (
        id SERIAL PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description TEXT,
        diameter VARCHAR(255),
        "rotationPeriod" VARCHAR(255),
        "orbitalPeriod" VARCHAR(255),
        gravity VARCHAR(255),
        population VARCHAR(255),
        climate VARCHAR(255),
        terrain VARCHAR(255),
        "surfaceWater" VARCHAR(255),
        name VARCHAR(255),
        avatar VARCHAR(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE planets;
    `);
  }
}
