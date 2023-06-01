import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1685540256447 implements MigrationInterface {
    name = 'AddedEntity1685540256447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bidItems" ADD "publishedAt" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bidItems" DROP COLUMN "publishedAt"`);
    }

}
