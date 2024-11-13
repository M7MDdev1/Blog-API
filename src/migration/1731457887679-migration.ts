import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731457887679 implements MigrationInterface {
    name = 'Migration1731457887679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("ID" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f0eace201126c1c8be2ae32fd22" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
