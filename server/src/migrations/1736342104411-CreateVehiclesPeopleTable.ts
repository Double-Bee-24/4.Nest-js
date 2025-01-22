import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehiclesPeopleTable1736342104411
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE vehiclespeople (
            "vehiclesId" INT,
            "peopleId" INT,
            PRIMARY KEY("vehiclesId", "peopleId"),
            FOREIGN KEY ("vehiclesId") REFERENCES vehicles(id),
            FOREIGN KEY ("peopleId") REFERENCES people(id)
        );        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE vehiclespeople;`);
  }
}
