import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1685175692070 implements MigrationInterface {
    name = 'AddedEntity1685175692070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "bidItemId" character varying NOT NULL, "bidPrice" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_7950d066d322aab3a488ac39fe5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bids"`);
    }

}
