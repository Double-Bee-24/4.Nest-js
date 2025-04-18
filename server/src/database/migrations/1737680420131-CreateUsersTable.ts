import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1737680420131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username varchar(255),
            password varchar(255),
            role varchar(255)    
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
