import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePlanetsTable1735302557796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE planets (
        id INT PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description VARCHAR,
        diameter VARCHAR,
        "rotationPeriod" VARCHAR,
        "orbitalPeriod" VARCHAR,
        gravity VARCHAR,
        population VARCHAR,
        climate VARCHAR,
        terrain VARCHAR,
        "surfaceWater" VARCHAR,
        name VARCHAR,
        avatar varchar(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE planets;
    `);
  }
}
