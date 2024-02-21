// 1er TESTING

import { CreateTable } from '../src/domain/uses-cases/create-table.use-case.'

describe('CreateTableUseCase', () => {

    it('should create table with default values', () => { // prueba con los valores por defecto si no memanda nada  

        const createTable = new CreateTable();

        const table = createTable.execute({ base: 2 }); // si le manda la base 2
        const rows = table.split('\n').length; // por default deberia tener 10 lineas

        // console.log(table);        

        expect( createTable ).toBeInstanceOf( CreateTable ); // nos aseguramos que es una instancia de nuestra clase
        expect( table ).toContain('2 x 1 = 2'); // si le mandamos la tabla del 2 por default deberia contener 2x1
        expect( table ).toContain('2 x 10 = 20'); // si le mandamos la tabla del 2 por default deberia contener 2x10
        expect( rows ).toBe(10);
    });

    it('should create table with custom values', () => {
        
        const createTable = new CreateTable();

        const options = {
            base: 3,
            limit: 20
        }
        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        // console.log(table);
        
        expect( table ).toContain('3 x 1 = 3');
        expect( table ).toContain('3 x 10 = 30');
        expect( table ).toContain('3 x 20 = 60');
        expect( rows ).toBe(options.limit);
    })
})