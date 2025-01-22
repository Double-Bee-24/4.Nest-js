import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsSpeciesTable1736256231691
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE filmsspecies (
        "filmsId" INT,
        "speciesId" INT,
        PRIMARY KEY("filmsId", "speciesId"),
        FOREIGN KEY ("filmsId") REFERENCES films(id),
        FOREIGN KEY ("speciesId") REFERENCES species(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE filmsspecies;`);
  }
}
