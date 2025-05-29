import { MigrationInterface, QueryRunner } from "typeorm";

export class OrdersTable1748523390522 implements MigrationInterface {
    name = 'CreateOrdersTable1748523390522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE orders (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                order_number VARCHAR(255) NOT NULL,
                payment_description VARCHAR(255) NOT NULL,
                street_address VARCHAR(255) NOT NULL,
                town VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                currency VARCHAR(3) NOT NULL,
                payment_due_date TIMESTAMP WITH TIME ZONE NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE orders`);
    }
}
