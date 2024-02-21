import { ServerApp } from "../src/presentation/server-app";


describe('Test App.ts', () => {

    it('Should call Server.run with values', async() => {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock; // sobreescribimos el metodo run por nuestro mock

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination' ]; // valores aleatorios para probar el metodo

        await import ('../src/app'); // dispara todo el proceso

        expect( serverRunMock ).toHaveBeenCalledWith({
            base: 10, 
            fileDestination: "test-destination", 
            fileName: "test-file", 
            limit: 5, 
            showTable: true
        }); 
    })
})