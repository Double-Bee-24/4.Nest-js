import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleStarshipsTable1735661520719
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE peoplestarships(
            "peopleId" INT,
            "starshipsId" INT,
            PRIMARY KEY ("peopleId", "starshipsId"),
            FOREIGN KEY ("peopleId") REFERENCES people(id),
            FOREIGN KEY ("starshipsId") REFERENCES starships(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE peoplestarships`);
  }
}
