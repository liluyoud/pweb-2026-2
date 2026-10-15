// Union types em TypeScript
export {};

// ---------------------------------------------------------------
// Problema: função que aceita number ou string
// ---------------------------------------------------------------
// Usar any perde a verificação de tipos:
function addAny(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return a.concat(b);
  }
  throw new Error('Os parâmetros devem ser números ou strings');
}

console.log(addAny(1, 2)); // 3
console.log(addAny('Olá, ', 'mundo')); // Olá, mundo

// ---------------------------------------------------------------
// Solução: union type (tipo1 | tipo2)
// ---------------------------------------------------------------
function add(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return a.concat(b);
  }
  throw new Error('Os parâmetros devem ser números ou strings');
}

console.log(add(10, 20)); // 30
console.log(add('TypeScript ', 'é ótimo')); // TypeScript é ótimo

// add(true, 1); // Erro: Argument of type 'boolean' is not assignable to 'string | number'.

// ---------------------------------------------------------------
// Variáveis com union type
// ---------------------------------------------------------------
let id: number | string;

id = 100;
id = 'ABC-100';
// id = true; // Erro: Type 'boolean' is not assignable to type 'string | number'.

// ---------------------------------------------------------------
// Type narrowing (estreitamento) com typeof
// ---------------------------------------------------------------
function format(value: number | string): string {
  if (typeof value === 'number') {
    return value.toFixed(2); // aqui value é number
  }
  return value.toUpperCase(); // aqui value é string
}

console.log(format(3.14159)); // 3.14
console.log(format('texto')); // TEXTO

// Só os membros comuns a todos os tipos são acessíveis sem estreitamento:
function describe(value: number | string) {
  return value.toString(); // toString existe em number e string
  // return value.toUpperCase(); // Erro: não existe em number
}
console.log(describe(42));

// ---------------------------------------------------------------
// Union com null e undefined
// ---------------------------------------------------------------
let name2: string | null = null;
name2 = 'Maria';

function greet(name: string | undefined): string {
  return name ? `Olá, ${name}!` : 'Olá, visitante!';
}
console.log(greet('João'));
console.log(greet(undefined));

// ---------------------------------------------------------------
// Union de tipos literais
// ---------------------------------------------------------------
let size: 'pequeno' | 'médio' | 'grande';
size = 'médio';
// size = 'gigante'; // Erro: Type '"gigante"' is not assignable to type ...

let dice: 1 | 2 | 3 | 4 | 5 | 6 = 4;
console.log(size, dice);

// ---------------------------------------------------------------
// Union com arrays e objetos
// ---------------------------------------------------------------
let values: (number | string)[] = [1, 'dois', 3];
let numberOrList: number | number[] = [1, 2, 3];

if (Array.isArray(numberOrList)) {
  console.log(numberOrList.length); // 3
}

console.log(values);

// ---------------------------------------------------------------
// Alias de tipo para uniões
// ---------------------------------------------------------------
type Identifier = number | string;

let userId: Identifier = 1;
userId = 'u-2';
console.log(userId);
