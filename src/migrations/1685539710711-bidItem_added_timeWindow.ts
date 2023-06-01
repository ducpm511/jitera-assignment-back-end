import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1685539710711 implements MigrationInterface {
    name = 'AddedEntity1685539710711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bidItems" DROP COLUMN "startAt"`);
        await queryRunner.query(`ALTER TABLE "bidItems" DROP COLUMN "endAt"`);
        await queryRunner.query(`ALTER TABLE "bidItems" ADD "timeWindow" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bidItems" DROP COLUMN "timeWindow"`);
        await queryRunner.query(`ALTER TABLE "bidItems" ADD "endAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bidItems" ADD "startAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
