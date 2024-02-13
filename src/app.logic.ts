// import fs from 'fs';
// import { yarg } from './config/plugins/yargs.plugins';

// console.log(yarg);


// let outputMessage = '';
// const {b:base, l:limit, s:showTable } = yarg
// const headerMessage = `
// ========================================
//             Tabla del ${yarg.b}
// ======================================== \n
// `

// for (let i = 1; i <= limit; i++) {
    
//     outputMessage += ` ${base} x ${i} = ${base * i} \n`
// }

// outputMessage = headerMessage + outputMessage;

// if (showTable) {
//     console.log(outputMessage);
// }

// const outputsPath = 'outputs'

// fs.mkdirSync(outputsPath, {recursive:true}); // crear la carpeta
// fs.writeFileSync(`${outputsPath}/tabla-${yarg.b}.txt`, outputMessage);
// console.log('File created!');
