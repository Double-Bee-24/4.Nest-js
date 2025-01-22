import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpeciesPlanetsTable1735661595742
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE speciesplanets(
            "speciesId" INT,
            "planetsId" INT,
            PRIMARY KEY("speciesId", "planetsId"),
            FOREIGN KEY ("speciesId") REFERENCES species(id),
            FOREIGN KEY ("planetsId") REFERENCES planets(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE speciesplanets;`);
  }
}
