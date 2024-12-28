import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleTable1735199504590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE people (
        id varchar(24) NOT NULL,
        description text NOT NULL,
        height varchar(50) NOT NULL,
        mass varchar(50) NOT NULL,
        hair_color varchar(50) NOT NULL,
        skin_color varchar(50) NOT NULL,
        eye_color varchar(50) NOT NULL,
        birth_year varchar(50) NOT NULL,
        gender varchar(50) NOT NULL,
        created varchar(50) NOT NULL,
        edited varchar(50) NOT NULL,
        name varchar(255) NOT NULL,
        homeworld varchar(255) NOT NULL,
        url varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE people`);
  }
}
