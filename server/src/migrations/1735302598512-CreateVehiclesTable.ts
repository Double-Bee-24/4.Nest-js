import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehiclesTable1735302598512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE vehicles (
        id VARCHAR(24) PRIMARY KEY,
        model VARCHAR(255),
        "vehicleClass" VARCHAR(255),
        manufacturer VARCHAR(255),
        "costInCredits" VARCHAR(255),
        length VARCHAR(255),
        crew VARCHAR(255),
        passengers VARCHAR(255),
        "maxAtmospheringSpeed" VARCHAR(255),
        "cargoCapacity" VARCHAR(255),
        consumables VARCHAR(255),
        films TEXT[],
        pilots TEXT[],
        created TIMESTAMP,
        edited TIMESTAMP,
        name VARCHAR(255),
        url VARCHAR(255),
        description TEXT
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE vehicles;
    `);
  }
}
