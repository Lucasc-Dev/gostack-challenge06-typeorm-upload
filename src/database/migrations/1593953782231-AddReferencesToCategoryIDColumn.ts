import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddReferencesToCategoryIDColumn1593953782231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('transactions', 'category_id');

        await queryRunner.addColumn('transactions', new TableColumn({
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('transactions', new TableForeignKey({
            name: 'CategoryID',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('transactions', 'CategoryID'),

        await queryRunner.dropColumn('transactions', 'category_id');

        await queryRunner.addColumn('transactions', new TableColumn({
            name: 'category_id',
            type: 'uuid',
        }));
    }

}
