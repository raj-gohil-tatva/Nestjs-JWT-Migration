import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTable1683801987583 implements MigrationInterface {
    name = 'AddUserTable1683801987583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("ID" SERIAL NOT NULL, "Email" character varying NOT NULL, "FirstName" character varying NOT NULL, "LastName" character varying NOT NULL, "Password" character varying NOT NULL, CONSTRAINT "UQ_b7eee57d84fb7ed872e660197fb" UNIQUE ("Email"), CONSTRAINT "PK_f0eace201126c1c8be2ae32fd22" PRIMARY KEY ("ID")); COMMENT ON COLUMN "user"."Email" IS 'Email is the unique and only created but not updated.'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
