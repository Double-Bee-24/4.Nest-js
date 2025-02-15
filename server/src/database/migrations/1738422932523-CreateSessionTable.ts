import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSessionsTable1738422932523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE session (
        id VARCHAR(255) PRIMARY KEY,
        json TEXT NOT NULL,
        "expiredAt" BIGINT NOT NULL,
        "deletedAt" TIMESTAMP
      );

      CREATE UNIQUE INDEX session_id_idx ON session (id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE session;
    `);
  }
}
