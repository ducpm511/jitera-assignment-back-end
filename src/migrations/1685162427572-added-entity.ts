import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1685162427572 implements MigrationInterface {
    name = 'AddedEntity1685162427572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "ballance" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ballance"`);
    }

}
