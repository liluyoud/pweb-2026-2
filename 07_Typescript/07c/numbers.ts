// O tipo number em TypeScript
export {};

// ---------------------------------------------------------------
// Number: todos os números são ponto flutuante (IEEE 754)
// ---------------------------------------------------------------
let price: number;
price = 9.95;

let quantity: number = 10;

// ---------------------------------------------------------------
// Literais decimais
// ---------------------------------------------------------------
let counter: number = 0;
let x: number = 100;
let y: number = 200;

// ---------------------------------------------------------------
// Literais binários (prefixo 0b ou 0B)
// ---------------------------------------------------------------
let bin = 0b100;
let anotherBin: number = 0B010;

// ---------------------------------------------------------------
// Literais octais (prefixo 0o ou 0O)
// ---------------------------------------------------------------
let octal: number = 0o10;

// ---------------------------------------------------------------
// Literais hexadecimais (prefixo 0x ou 0X)
// ---------------------------------------------------------------
let hexadecimal: number = 0XA;

console.log(bin, anotherBin, octal, hexadecimal); // 4 2 8 10

// ---------------------------------------------------------------
// Separadores numéricos (facilitam a leitura)
// ---------------------------------------------------------------
let budget = 1_000_000_000_000;
console.log(budget); // 1000000000000

console.log(9_998.123_456); // 9998.123456
console.log(0b1010_0001_1000_0101); // 41349
console.log(0xA0_B0_C0); // 10531008

// ---------------------------------------------------------------
// Valores especiais
// ---------------------------------------------------------------
console.log(0.1 + 0.2); // 0.30000000000000004 (imprecisão de ponto flutuante)
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.EPSILON);
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log(Number.NaN); // NaN
console.log(Number.isNaN(0 / 0)); // true

// ---------------------------------------------------------------
// Big integers (bigint) - inteiros de tamanho arbitrário
// ---------------------------------------------------------------
// Requer target ES2020 ou superior
let big: bigint = 9007199254740991n;
let bigger: bigint = big + 2n;
console.log(bigger); // 9007199254740993n

// number e bigint são tipos diferentes:
// let mix: number = big; // Erro: Type 'bigint' is not assignable to type 'number'.
let converted: number = Number(big);
console.log(converted);

// ---------------------------------------------------------------
// Conversões
// ---------------------------------------------------------------
console.log(Number('42.5')); // 42.5
console.log(parseInt('42px')); // 42
console.log(parseFloat('3.14abc')); // 3.14
console.log((255).toString(16)); // 'ff'
console.log((3.14159).toFixed(2)); // '3.14'

// ---------------------------------------------------------------
// Erros de compilação
// ---------------------------------------------------------------
// price = 'dez'; // Erro: Type 'string' is not assignable to type 'number'.
