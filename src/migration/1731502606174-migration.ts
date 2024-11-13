import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731502606174 implements MigrationInterface {
    name = 'Migration1731502606174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_0f050d6d1112b2d07545b43f945" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Posts"`);
    }

}
