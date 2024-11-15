import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731699871361 implements MigrationInterface {
    name = 'Migration1731699871361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "ID" TO "id"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_f0eace201126c1c8be2ae32fd22" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER SEQUENCE "user_ID_seq" RENAME TO "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "Posts" RENAME COLUMN "autor" TO "autorId"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "postId" integer, "userId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "followers_following" ("id" SERIAL NOT NULL, "followerId" integer, "followedId" integer, CONSTRAINT "PK_95627c64d9f57814010a003032e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "autorId"`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "autorId" integer`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD CONSTRAINT "FK_d9a1d8606ea3cccfea0d470354e" FOREIGN KEY ("autorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers_following" ADD CONSTRAINT "FK_5594c738c37ff42c8798c5119c6" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers_following" ADD CONSTRAINT "FK_06d4055e319a237483318666046" FOREIGN KEY ("followedId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers_following" DROP CONSTRAINT "FK_06d4055e319a237483318666046"`);
        await queryRunner.query(`ALTER TABLE "followers_following" DROP CONSTRAINT "FK_5594c738c37ff42c8798c5119c6"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP CONSTRAINT "FK_d9a1d8606ea3cccfea0d470354e"`);
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "autorId"`);
        await queryRunner.query(`ALTER TABLE "Posts" ADD "autorId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "followers_following"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "Posts" RENAME COLUMN "autorId" TO "autor"`);
        await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RENAME TO "user_ID_seq"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_f0eace201126c1c8be2ae32fd22"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "ID"`);
    }

}
