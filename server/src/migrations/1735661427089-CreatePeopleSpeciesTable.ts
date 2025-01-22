import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleSpeciesTable1735661427089
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE peoplespecies(
            "peopleId" INT,
            "speciesId" INT,
            PRIMARY KEY ("peopleId", "speciesId"),
            FOREIGN KEY ("peopleId") REFERENCES people(id),
            FOREIGN KEY ("speciesId") REFERENCES species(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE peoplespecies;`);
  }
}
