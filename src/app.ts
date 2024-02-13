import { yarg } from "./config/plugins/yargs.plugins";
import { ServerApp } from "./presentation/server-app";



// FUNCION ANONIMA AUTOINVOCADA
(async() => {
   await main()
    
})();

async function main() { // Punto de entrada de la applicacion
    
    // console.log(yarg);

    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = yarg // la dependencia solo esta en la funcion main

    ServerApp.run({ base, limit, showTable, fileName, fileDestination }); // ejecutamos al metodo que pone a correr el servidor
    
}
 