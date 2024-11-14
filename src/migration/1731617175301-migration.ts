import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731617175301 implements MigrationInterface {
    name = 'Migration1731617175301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Rename the "body" column to "content"
        await queryRunner.query(`ALTER TABLE "Posts" RENAME COLUMN "body" TO "content"`);

        // Ensure "autor" column is added if it doesn't already exist
        await queryRunner.query(`ALTER TABLE "Posts" ADD COLUMN IF NOT EXISTS "autor" character varying NOT NULL DEFAULT 'default author'`);

        // Remove the default value on "autor" after adding it
        await queryRunner.query(`ALTER TABLE "Posts" ALTER COLUMN "autor" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rename "content" back to "body" in case of rollback
        await queryRunner.query(`ALTER TABLE "Posts" RENAME COLUMN "content" TO "body"`);

        // Drop the "autor" column in case of rollback
        await queryRunner.query(`ALTER TABLE "Posts" DROP COLUMN "autor"`);
    }
}
