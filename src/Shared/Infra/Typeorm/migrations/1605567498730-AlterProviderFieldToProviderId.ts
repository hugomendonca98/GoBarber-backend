import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1605567498730
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'appointmentProvider', // NOME DA CHAVE ESTRANGEIRA PARA PODER USAR PARA DESFAZER.
                columnNames: ['provider_id'], // NOME DA COLUNA CRIADA.
                referencedColumnNames: ['id'], // A COLUNA ESTRANGEIRA QUE VAI SER USADA.
                referencedTableName: 'users', // A TABELA ESTRANGEIRA QUE VAI SER USADA.
                onDelete: 'SET NULL', // CASO SEJÁ DELETADO SETA PARA NULL.
                onUpdate: 'CASCADE', // EM CASO DE UPDATE DELETA TUDO.
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'appointmentProvider');
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
