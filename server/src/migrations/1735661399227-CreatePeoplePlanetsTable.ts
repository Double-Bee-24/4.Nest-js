import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeoplePlanetsTable1735661399227
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE peopleplanets (
            "peopleId" INT,
            "planetsId" INT,
            PRIMARY KEY ("peopleId", "planetsId"),
            FOREIGN KEY ("peopleId") REFERENCES people(id),
            FOREIGN KEY ("planetsId") REFERENCES planets(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE peopleplanets;`);
  }
}
