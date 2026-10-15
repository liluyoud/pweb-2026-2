// O tipo string em TypeScript
export {};

// ---------------------------------------------------------------
// Strings: aspas simples, aspas duplas e template strings
// ---------------------------------------------------------------
let firstName: string = 'João';
let title: string = "Bom dia";

console.log(firstName, title);

// Aspas simples dentro de aspas duplas (e vice-versa)
let phrase1: string = "Ele disse: 'olá'";
let phrase2: string = 'Ela respondeu: "oi"';

console.log(phrase1, phrase2);

// ---------------------------------------------------------------
// Template strings: strings com várias linhas
// ---------------------------------------------------------------
let description = `Este é um exemplo
de uma string
com várias linhas`;

console.log(description);

// ---------------------------------------------------------------
// Template strings: interpolação de expressões
// ---------------------------------------------------------------
let name2: string = 'Maria';
let age: number = 30;

let greeting: string = `Olá, meu nome é ${name2} e eu tenho ${age} anos.`;
console.log(greeting); // Olá, meu nome é Maria e eu tenho 30 anos.

// Expressões dentro da interpolação
let price = 10;
let tax = 0.1;
console.log(`Total: R$ ${(price * (1 + tax)).toFixed(2)}`); // Total: R$ 11.00

// ---------------------------------------------------------------
// Template strings: o exemplo de aplicar uma expressão
// ---------------------------------------------------------------
let a: number = 5;
let b: number = 7;
console.log(`${a} + ${b} = ${a + b}`); // 5 + 7 = 12

// ---------------------------------------------------------------
// Propriedades e métodos comuns de string
// ---------------------------------------------------------------
let text: string = 'TypeScript é divertido';

console.log(text.length); // 22
console.log(text.toUpperCase()); // TYPESCRIPT É DIVERTIDO
console.log(text.toLowerCase()); // typescript é divertido
console.log(text.charAt(0)); // T
console.log(text.indexOf('Script')); // 4
console.log(text.includes('divertido')); // true
console.log(text.startsWith('Type')); // true
console.log(text.endsWith('do')); // true
console.log(text.slice(0, 10)); // TypeScript
console.log(text.replace('divertido', 'poderoso')); // TypeScript é poderoso
console.log(text.split(' ')); // [ 'TypeScript', 'é', 'divertido' ]
console.log('  espaços  '.trim()); // 'espaços'
console.log('ab'.repeat(3)); // ababab
console.log('5'.padStart(3, '0')); // 005

// ---------------------------------------------------------------
// Concatenação
// ---------------------------------------------------------------
let fullName: string = 'João' + ' ' + 'Silva';
console.log(fullName); // João Silva

// ---------------------------------------------------------------
// Erros de compilação
// ---------------------------------------------------------------
// firstName = 100; // Erro: Type 'number' is not assignable to type 'string'.
