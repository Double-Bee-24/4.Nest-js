import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilmsTable1735302546303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE films (
            id varchar(24)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE films`);
  }
}
