import { CreateTable } from '../src/domain/uses-cases/create-table.use-case.';
import { SaveFile } from '../src/domain/uses-cases/save-file.use-case';
import { ServerApp } from '../src/presentation/server-app'


describe('Tests server-app.ts', () => {

    const options = { 
        base           : 2,
        limit          : 10,
        showTable      : false,
        fileDestination: 'test-destination',
        fileName       : 'test-fileName'
    }

    it('should create ServerApp instance', () => {

        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run ).toBe('function'); // me aseguro que siempre este el metodo run y que sea estatico 
    });

    // PRUEBAS DE INTEGRACION (se realiza todo el proceso)
    it('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute'); // prototype para ver el metodo execute
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute');


        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes(options.showTable ? 3 : 2); // si showTable es true, van a venir 3 logs sino son 2 logs

        expect( logSpy ).toHaveBeenCalledWith('Server running...'); // el log de que esta corriendo el servidor
        expect( logSpy ).toHaveBeenCalledWith('File created'); // el log de que se creo el archivo
        
        expect( createTableSpy ).toHaveBeenCalledTimes(1); // espera q se haya llamado una vez
        expect( createTableSpy ).toHaveBeenCalledWith({  // espera que se haya llamado con la base y el limit
            base: options.base, limit: options.limit 
        }); 

        expect( saveFileSpy ).toHaveBeenCalledTimes(1); // espera q se haya llamado una vez
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileDestination: options.fileDestination, fileName: options.fileName, fileContent: expect.any(String)
        });
    })


    // PRUEBAS UNITARIAS
    it('should run with custom values mocks', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('1 x 2 = 2'); // va retornar un string
        const saveFileMock = jest.fn().mockReturnValue(true); // retorna true porq se creo correctamente

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock

        ServerApp.run(options);


        expect( logMock ).toHaveBeenCalledWith( "Server running..." );
        expect( createTableMock ).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileDestination: options.fileDestination,
            fileName: options.fileName,
            fileContent: expect.any(String) // cualquier string
        });
        expect( logMock ).toHaveBeenCalledWith( "File created" );
        expect( logErrorMock ).not.toHaveBeenCalledWith(); // espera que el error no haya sido llamado
    })
})