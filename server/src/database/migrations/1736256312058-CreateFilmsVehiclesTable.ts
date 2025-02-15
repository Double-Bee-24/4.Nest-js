import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsVehiclesTable1736256312058
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE filmsvehicles (
        "filmsId" INT,
        "vehiclesId" INT,
        PRIMARY KEY("filmsId", "vehiclesId"),
        FOREIGN KEY ("filmsId") REFERENCES films(id),
        FOREIGN KEY ("vehiclesId") REFERENCES vehicles(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE filmsvehicles;`);
  }
}
