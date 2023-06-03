import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1685776444873 implements MigrationInterface {
    name = 'AddedEntity1685776444873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."bidItems_status_enum" RENAME TO "bidItems_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."bidItems_status_enum" AS ENUM('draft', 'published', 'on_going', 'completed')`);
        await queryRunner.query(`ALTER TABLE "bidItems" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bidItems" ALTER COLUMN "status" TYPE "public"."bidItems_status_enum" USING "status"::"text"::"public"."bidItems_status_enum"`);
        await queryRunner.query(`ALTER TABLE "bidItems" ALTER COLUMN "status" SET DEFAULT 'draft'`);
        await queryRunner.query(`DROP TYPE "public"."bidItems_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bidItems_status_enum_old" AS ENUM('draft', 'published', 'on_going', 'conpleted')`);
        await queryRunner.query(`ALTER TABLE "bidItems" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bidItems" ALTER COLUMN "status" TYPE "public"."bidItems_status_enum_old" USING "status"::"text"::"public"."bidItems_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "bidItems" ALTER COLUMN "status" SET DEFAULT 'draft'`);
        await queryRunner.query(`DROP TYPE "public"."bidItems_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."bidItems_status_enum_old" RENAME TO "bidItems_status_enum"`);
    }

}
