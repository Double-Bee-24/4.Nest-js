import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsStarshipsTable1736256241764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE filmsstarships (
        "filmsId" INT,
        "starshipsId" INT,
        PRIMARY KEY("filmsId", "starshipsId"),
        FOREIGN KEY ("filmsId") REFERENCES films(id),
        FOREIGN KEY ("starshipsId") REFERENCES starships(id)  
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE filmsstarships;`);
  }
}
