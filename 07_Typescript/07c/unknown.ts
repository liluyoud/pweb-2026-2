// O tipo unknown em TypeScript
export {};

// ---------------------------------------------------------------
// unknown: aceita qualquer valor, mas exige verificação antes do uso
// ---------------------------------------------------------------
let result: unknown;

result = 1;
result = 'olá';
result = true;
result = { name: 'João' };
result = [1, 2, 3];

// ---------------------------------------------------------------
// Diferença para any: operações diretas não são permitidas
// ---------------------------------------------------------------
let anyValue: any = 'texto';
anyValue.toUpperCase(); // any: sem verificação

let value: unknown = 'texto';
// value.toUpperCase(); // Erro: 'value' is of type 'unknown'.
// value + 1; // Erro: 'value' is of type 'unknown'.

// ---------------------------------------------------------------
// Estreitamento com typeof
// ---------------------------------------------------------------
result = 10;

if (typeof result === 'number') {
  console.log(result.toFixed(2)); // 10.00
}

result = 'abc';

if (typeof result === 'string') {
  console.log(result.toUpperCase()); // ABC
}

// ---------------------------------------------------------------
// Estreitamento com instanceof
// ---------------------------------------------------------------
result = new Date();

if (result instanceof Date) {
  console.log(result.getFullYear());
}

// ---------------------------------------------------------------
// Função que recebe unknown
// ---------------------------------------------------------------
function describe(input: unknown): string {
  if (typeof input === 'string') return `string: ${input.toUpperCase()}`;
  if (typeof input === 'number') return `número: ${input.toFixed(1)}`;
  if (typeof input === 'boolean') return `booleano: ${input}`;
  if (Array.isArray(input)) return `array com ${input.length} itens`;
  if (input === null) return 'null';
  if (typeof input === 'object') return 'objeto';
  return 'tipo desconhecido';
}

console.log(describe('olá'));
console.log(describe(3.14159));
console.log(describe([1, 2, 3]));
console.log(describe({ a: 1 }));

// ---------------------------------------------------------------
// Asserção de tipo (use com cuidado: ignora a verificação)
// ---------------------------------------------------------------
let data: unknown = '123';
let length = (data as string).length;
console.log(length); // 3

// ---------------------------------------------------------------
// Uso típico: tratamento de erros em catch e dados externos
// ---------------------------------------------------------------
try {
  JSON.parse('{ inválido');
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

const parsed: unknown = JSON.parse('{"name":"Maria"}');
if (typeof parsed === 'object' && parsed !== null && 'name' in parsed) {
  console.log((parsed as { name: string }).name); // Maria
}

// ---------------------------------------------------------------
// Atribuição: unknown só pode ser atribuído a unknown e any
// ---------------------------------------------------------------
let u: unknown = 5;
let a: any = u; // OK
let u2: unknown = u; // OK
// let n: number = u; // Erro: Type 'unknown' is not assignable to type 'number'.

console.log(a, u2);

// ---------------------------------------------------------------
// Comparações são permitidas
// ---------------------------------------------------------------
console.log(u === 5); // true
