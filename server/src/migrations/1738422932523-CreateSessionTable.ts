import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSessionsTable1738422932523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE sessions (
        id VARCHAR(255) PRIMARY KEY,
        json TEXT,
        "expiredAt" BIGINT NOT NULL,
        "deletedAt" TIMESTAMP
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE sessions');
  }
}
