import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddReferencesToCategoryIDColumn1593953782231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.dropColumn('transactions', 'category_id');

        queryRunner.addColumn('transactions', new TableColumn({
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
        }));

        queryRunner.createForeignKey('transactions', new TableForeignKey({
            name: 'CategoryID',
            columnNames: [''],
            referencedColumnNames: [''],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.dropForeignKey('transactions', 'CategoryID'),

        queryRunner.dropColumn('transactions', 'category_id');

        queryRunner.addColumn('transactions', new TableColumn({
            name: 'category_id',
            type: 'uuid',
        }));
    }

}
