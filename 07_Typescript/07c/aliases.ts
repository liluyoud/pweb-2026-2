// Type aliases em TypeScript
export {};

// ---------------------------------------------------------------
// Sintaxe: type alias = existingType;
// ---------------------------------------------------------------
type alphanumeric = string | number;

let input: alphanumeric = 100; // OK
input = 'Hi'; // OK
// input = false; // Erro: Type 'boolean' is not assignable to type 'alphanumeric'.

// ---------------------------------------------------------------
// Reutilização em funções
// ---------------------------------------------------------------
function validate(value: alphanumeric): boolean {
  if (typeof value === 'number') {
    return value > 0;
  }
  return value.length > 0;
}

console.log(validate(10)); // true
console.log(validate('')); // false

// ---------------------------------------------------------------
// Alias para tipos de objeto
// ---------------------------------------------------------------
type Person = {
  name: string;
  age: number;
};

let person: Person = { name: 'João', age: 30 };
console.log(person);

// Alias dentro de alias
type Employee = Person & {
  jobTitle: string;
};

let employee: Employee = { name: 'Maria', age: 28, jobTitle: 'Analista' };
console.log(employee);

// ---------------------------------------------------------------
// Alias para tipos literais e uniões
// ---------------------------------------------------------------
type Status = 'pendente' | 'ativo' | 'inativo';

let status: Status = 'ativo';
// status = 'removido'; // Erro: Type '"removido"' is not assignable to type 'Status'.
console.log(status);

// ---------------------------------------------------------------
// Alias para tipos de função
// ---------------------------------------------------------------
type Operation = (a: number, b: number) => number;

const sum: Operation = (a, b) => a + b;
const multiply: Operation = (a, b) => a * b;

console.log(sum(2, 3)); // 5
console.log(multiply(2, 3)); // 6

// ---------------------------------------------------------------
// Alias para arrays e tuplas
// ---------------------------------------------------------------
type StringList = string[];
type Point = [number, number];

let names: StringList = ['Ana', 'Bruno'];
let origin: Point = [0, 0];
console.log(names, origin);

// ---------------------------------------------------------------
// Alias com genéricos
// ---------------------------------------------------------------
type Box<T> = { value: T };

let numberBox: Box<number> = { value: 42 };
let textBox: Box<string> = { value: 'texto' };
console.log(numberBox, textBox);

// ---------------------------------------------------------------
// Alias para tipos primitivos (apenas documentação, não cria novo tipo)
// ---------------------------------------------------------------
type UserId = number;

let id: UserId = 10;
let plain: number = id; // são totalmente compatíveis
console.log(plain);

// ---------------------------------------------------------------
// Alias vs interface (breve comparação)
// ---------------------------------------------------------------
// type pode nomear uniões, primitivos e tuplas; interface só descreve objetos
// (e pode ser estendida/mesclada). Para objetos, ambos funcionam:
interface PersonInterface {
  name: string;
  age: number;
}

let p2: PersonInterface = { name: 'Carla', age: 22 };
console.log(p2);
