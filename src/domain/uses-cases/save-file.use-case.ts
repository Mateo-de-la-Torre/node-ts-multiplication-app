import fs from 'fs';

export interface SaveFileUseCase {
    execute: ( options: Options ) => boolean;
}

export interface Options {
    fileContent     : string;
    fileDestination?: string;
    fileName?       : string;
}


export class SaveFile implements SaveFileUseCase{

    constructor( // inyecciones de dependencias
        // repository: StorageRepository // posible dependencia donde guardamos la info 
    ){}


    execute({ 
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table' 
    }: Options): boolean{

        try {
            fs.mkdirSync(fileDestination, {recursive:true}); // crear la carpeta
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent); // crea el archivo
            return true;

        } catch (error) {
            // console.error(error); winston
            return false;
        }
    }
}