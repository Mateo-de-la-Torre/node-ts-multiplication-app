// USES CASES: tienen como objetivo hacer una tarea particular


export interface CreateTableUseCase { // reglas de negocio que quiero que implemente la clase CreateTable

    execute: (options: CreateTableOptions) => string // el metodo execute va a recibir como options la interface CreateTableOptions
}

export interface CreateTableOptions { // esta interface tipea las options a number
    base: number;
    limit?: number; // ? (el limit no es obligatorio)
}




export class CreateTable implements CreateTableUseCase { // el implements es para conectar la clase con la interface

    constructor(
        /**
         * DI - Dependency Injection
         */
    ) {}

    execute({ base, limit = 10 }: CreateTableOptions){ // cada caso de uso va tener un metodo EXECUTE para EJECUTAR al caso de uso

        let outputMessage = '';

        for (let i = 1; i <= limit; i++) {
            outputMessage += ` ${base} x ${i} = ${base * i} \n`
        }

        return outputMessage;
    }
}