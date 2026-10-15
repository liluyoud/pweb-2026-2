// O tipo boolean em TypeScript
export {};

// ---------------------------------------------------------------
// Declaração: dois valores possíveis, true e false
// ---------------------------------------------------------------
let pending: boolean;
pending = true;
console.log(pending); // true

pending = false;
console.log(pending); // false

// ---------------------------------------------------------------
// Inferência de tipo
// ---------------------------------------------------------------
let done = false; // TypeScript infere: boolean
console.log(done);

// Erro de compilação:
// Type 'string' is not assignable to type 'boolean'.
// done = 'sim';

// ---------------------------------------------------------------
// Resultado de comparações
// ---------------------------------------------------------------
let age: number = 18;
let isAdult: boolean = age >= 18;
console.log(isAdult); // true

// ---------------------------------------------------------------
// Operadores lógicos: &&, || e !
// ---------------------------------------------------------------
let hasTicket: boolean = true;
let hasId: boolean = false;

console.log(hasTicket && hasId); // false
console.log(hasTicket || hasId); // true
console.log(!hasTicket); // false

// ---------------------------------------------------------------
// Função que retorna boolean
// ---------------------------------------------------------------
function isEven(n: number): boolean {
  return n % 2 === 0;
}

console.log(isEven(4)); // true
console.log(isEven(7)); // false

// ---------------------------------------------------------------
// Boolean (objeto) vs boolean (primitivo)
// ---------------------------------------------------------------
// Evite o tipo Boolean (com B maiúsculo): é o objeto wrapper.
let primitive: boolean = true;
let wrapper: Boolean = new Boolean(true);

console.log(typeof primitive); // boolean
console.log(typeof wrapper); // object

// Um objeto Boolean é sempre "truthy", mesmo se contiver false:
let falseWrapper: Boolean = new Boolean(false);
console.log(falseWrapper.valueOf()); // false
console.log(falseWrapper ? 'truthy' : 'falsy'); // truthy (é um objeto)

// ---------------------------------------------------------------
// Conversão para boolean
// ---------------------------------------------------------------
console.log(Boolean(0)); // false
console.log(Boolean('')); // false
console.log(Boolean(null)); // false
console.log(Boolean('texto')); // true
console.log(!!42); // true
