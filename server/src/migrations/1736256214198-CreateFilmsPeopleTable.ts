import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsPeopleTable1736256214198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE filmspeople(
            "filmsId" INT,
            "peopleId" INT,
            PRIMARY KEY("filmsId", "peopleId"),
            FOREIGN KEY ("filmsId") REFERENCES films(id),
            FOREIGN KEY ("peopleId") REFERENCES people(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE filmspeople;`);
  }
}
