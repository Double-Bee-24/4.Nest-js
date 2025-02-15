import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsPlanetsTable1736256223615
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE filmsplanets (
        "filmsId" INT,
        "planetsId" INT,
        PRIMARY KEY("filmsId", "planetsId"),
        FOREIGN KEY ("filmsId") REFERENCES films(id),
        FOREIGN KEY ("planetsId") REFERENCES planets(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE filmsplanets;`);
  }
}
