import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1612834478784
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'appointmentUser', // NOME DA CHAVE ESTRANGEIRA PARA PODER USAR PARA DESFAZER.
                columnNames: ['user_id'], // NOME DA COLUNA CRIADA.
                referencedColumnNames: ['id'], // A COLUNA ESTRANGEIRA QUE VAI SER USADA.
                referencedTableName: 'users', // A TABELA ESTRANGEIRA QUE VAI SER USADA.
                onDelete: 'SET NULL', // CASO SEJÁ DELETADO SETA PARA NULL.
                onUpdate: 'CASCADE', // EM CASO DE UPDATE DELETA TUDO.
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'appointmentUser');
        await queryRunner.dropColumn('appointments', 'user_id');
    }
}
