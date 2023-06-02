import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1685678052612 implements MigrationInterface {
    name = 'AddedEntity1685678052612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bidItems" DROP COLUMN "startedPrice"`);
        await queryRunner.query(`ALTER TABLE "bidItems" ADD "startedPrice" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bidItems" DROP COLUMN "startedPrice"`);
        await queryRunner.query(`ALTER TABLE "bidItems" ADD "startedPrice" integer NOT NULL DEFAULT '0'`);
    }

}
