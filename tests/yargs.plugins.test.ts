// 3er TESTING


// import {yarg} from "../src/config/plugins/yargs.plugins";

const runCommand = async( args: string[] ) => { // Funcion para poder modifica el argv

// operador spread '...'
    process.argv = [...process.argv, ...args]; // le agrega los args al argv

// Importación dinámica: para importar un módulo de forma asíncrona. La importación se realizará en tiempo de ejecución, no en tiempo de carga.
    const {yarg} = await import('../src/config/plugins/yargs.plugins');
    return yarg;
}


describe('Tests args.plugins.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => { // que este el argv original antes de cada prueba
        process.argv = originalArgv;
        jest.resetModules();
    })
    
    it('should return default values', async() => {

        const argv =  await runCommand(['-b', '5']); // le mandams la base
        // console.log(argv);
   
        expect(argv).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
          })); 
    });


    it('should return custom values', async() => {

        const argv =  await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']); // le mandams la base
        // console.log(argv);
   
        expect(argv).toEqual( expect.objectContaining({
            b: 8,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-dir'
          })); 
    })
})




