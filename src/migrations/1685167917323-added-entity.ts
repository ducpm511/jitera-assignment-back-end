import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEntity1685167917323 implements MigrationInterface {
    name = 'AddedEntity1685167917323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bidItems_status_enum" AS ENUM('draft', 'published', 'on_going', 'conpleted')`);
        await queryRunner.query(`CREATE TABLE "bidItems" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "startedPrice" integer NOT NULL DEFAULT '0', "currentPrice" integer NOT NULL DEFAULT '0', "startAt" TIMESTAMP NOT NULL DEFAULT now(), "endAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."bidItems_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "UQ_db936e266699270bccb3f34ef68" UNIQUE ("name"), CONSTRAINT "PK_062066e282f01581cef8a09160b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bidItems"`);
        await queryRunner.query(`DROP TYPE "public"."bidItems_status_enum"`);
    }

}
