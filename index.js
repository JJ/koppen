#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('Calculadora de zonas climáticas de Köppen\n');
  
  const temperatura = await ask('Temperatura Media Anual (°C): ');
  const precipitacion = await ask('Precipitación anual (mm): ');
  
  console.log('\nDatos ingresados:');
  console.log(`Temperatura Media Anual: ${temperatura}°C`);
  console.log(`Precipitación anual: ${precipitacion}mm`);
  
  rl.close();
}

main();
