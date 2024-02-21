// 2do TESTING

import {SaveFile} from '../src/domain/uses-cases/save-file.use-case'
import fs from 'fs';

describe('SaveFileUseCase' , () => {

   // CICLO DE VIDA
    // afterEach(() => { // despues de cada prueba borra el archivo basura
    //     // clean up
    //     const outputsFolderExist = fs.existsSync('outputs'); // si existe la carpeta outputs
       
    //     if( outputsFolderExist ) fs.rmSync('outputs', {recursive: true}); // borra de manera recursiva la carpeta outputs

    //     const customFolderExist = fs.existsSync(`${customOptions.fileDestination}`);

    //     if( customFolderExist ) fs.rmSync( customOptions.fileDestination, {recursive: true});

    // })

    it('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        }

        const result = saveFile.execute(options); // verifica q crea la carpeta OUTPUTS, el archivo TABLE y el file content
    
        const fileExists = fs.existsSync(filePath); // asegurarnos que el archivo existe
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});
        
        expect( result ).toBe( true );
        expect( fileExists ).toBe( true ); // espera que el archivo exista
        expect( fileContent ).toBe( options.fileContent ); // espera que exista el fileContent

    });

    const customOptions = {
        fileContent: 'custom content',
        fileDestination:'custom-outputs',
        fileName:'custom-table-name'
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    it('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions); // verifica q crea la carpeta CUSTOM, el archivo CUSTOM y el content CUSTOM

        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf8'});

        
        expect( result ).toBe( true );
        expect( fileExists ).toBe( true ); // espera que el archivo exista
        expect( fileContent ).toBe( customOptions.fileContent ); // espera que exista el fileContent
    });



    it('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();

        // espia el fs el metodo 'mkdirSync' haya  sido llamado y con que argumentos
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation( // con mockImplementation remplazo la funcionalidad de 'mkdirSync' por la imlementacion del error 
            () => {throw new Error('This is a custom error message from testing')}
        );
        
        const result = saveFile.execute(customOptions);

        expect(result).toBe(false); 

        mkdirSpy.mockRestore(); // vuleve la funcionalidad principal del metodo para las siguientes pruebas

    });


    it('should return false if file could not be created', () => {

        const saveFile = new SaveFile();

        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation( 
            () => {throw new Error('This is a custom writing from testing')}
        );
        
        const result = saveFile.execute({fileContent: 'hola'});

        expect(result).toBe(false); 

        writeFileSpy.mockRestore();

    });


})