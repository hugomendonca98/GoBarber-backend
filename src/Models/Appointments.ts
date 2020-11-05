import { v4 as uuid } from 'uuid';

// CRIANDO A INTERFACE/MODELS-MODELO DO OBJ, DITANDO QUAIS TIPOS DE DADOS OS ATRIBUTOS RECEBEM.
class Appointments {
    id: string;

    provider: string;

    date: Date;

    constructor({ provider, date }: Omit<Appointments, 'id'>) {
        //  MONTANDO O ONB PARA SER ARMAZENDADO.
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}


export default Appointments;
