import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStarshipsTable1734302585810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE starships (
        id SERIAL PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        model VARCHAR(255),
        "starshipClass" VARCHAR(255),
        manufacturer VARCHAR(255),
        "costInCredits" VARCHAR(255),
        length VARCHAR(255),
        crew VARCHAR(255),
        passengers VARCHAR(255),
        "maxAtmospheringSpeed" VARCHAR(255),
        "hyperdriveRating" VARCHAR(255),
        "MGLT" VARCHAR(255),
        "cargoCapacity" VARCHAR(255),
        consumables VARCHAR(255),
        "pilotsIds" VARCHAR(50)[],
        pilots VARCHAR(255)[],
        name VARCHAR(255),
        description TEXT,
        avatar varchar(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE starships;
    `);
  }
}
