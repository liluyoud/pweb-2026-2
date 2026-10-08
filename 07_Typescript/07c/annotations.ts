// Type annotations em TypeScript
export {};
// Sintaxe: identifier: type;

// ---------------------------------------------------------------
// Variáveis e constantes
// ---------------------------------------------------------------
// let variableName: type;
// let variableName: type = value;
// const constantName: type = value;

let counter: number;
counter = 1;

// Erro de compilação:
// Type '"Hello"' is not assignable to type 'number'.
// counter = 'Hello';

let counter2: number = 1;

let firstName: string = 'John';
let age: number = 25;
let active: boolean = true;

// ---------------------------------------------------------------
// Arrays
// ---------------------------------------------------------------
// let arrayName: type[];

let names: string[] = ['John', 'Jane', 'Peter', 'David', 'Mary'];

// ---------------------------------------------------------------
// Objetos
// ---------------------------------------------------------------
let person: {
  name: string;
  age: number;
};

person = {
  name: 'John',
  age: 25,
}; // válido

// ---------------------------------------------------------------
// Argumentos e tipo de retorno de funções
// ---------------------------------------------------------------
function greeting(name: string): string {
  return `Hi ${name}`;
}

let message = greeting('John');
console.log(message);

// Erro de compilação:
// Argument of type 'number' is not assignable to parameter of type 'string'.
// let message2 = greeting(1);
// console.log(message2);

console.log(counter, counter2, firstName, age, active, names, person);
