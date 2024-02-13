// PRESENTATION: lo que esta mas expuesto al usuario final

import { CreateTable } from "../domain/uses-cases/create-table.use-case.";
import { SaveFile } from "../domain/uses-cases/save-file.use-case";


interface RunOptions { // reglas para poner a un objeto
    base           : number;
    limit          : number;
    showTable      : boolean;
    fileName       : string;
    fileDestination: string;
}

export class ServerApp { // Logica del servidor
    

    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) { // metodo estatico para no inicializar la clase

        console.log('Server running...');
        

        const table = new CreateTable().execute({ base, limit }); // Ejecutamos el caso de uso (CreateTable)
        
        const wasCreated = new SaveFile() // Ejecutamos el caso de uso (SaveFile)
            .execute({ 
                fileContent: table, // ponemos la tabla como contenido
                fileDestination,
                fileName
            });


        if (showTable) console.log(table);
        
        (wasCreated)
        ? console.log('File created')
        : console.error('File not created')
        
        
        
        
        
    }
}