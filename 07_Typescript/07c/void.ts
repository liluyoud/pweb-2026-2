// O tipo void em TypeScript
export {};

// ---------------------------------------------------------------
// void: tipo de retorno de funções que não retornam valor
// ---------------------------------------------------------------
function log(message: string): void {
  console.log(message);
}

log('Olá, mundo!');

// Sem anotação, o TypeScript infere void
function warn(message: string) {
  console.warn(message);
}
warn('Atenção');

// ---------------------------------------------------------------
// Uso prático: funções com efeitos colaterais
// ---------------------------------------------------------------
function showTotal(prices: number[]): void {
  const total = prices.reduce((sum, price) => sum + price, 0);
  console.log(`Total: R$ ${total.toFixed(2)}`);
}

showTotal([10, 20.5, 5]); // Total: R$ 35.50

// ---------------------------------------------------------------
// Não use o valor retornado por uma função void
// ---------------------------------------------------------------
// let result = log('teste');
// result é do tipo void: não pode ser usado de forma útil.

// ---------------------------------------------------------------
// return vazio é permitido
// ---------------------------------------------------------------
function greet(name: string): void {
  if (!name) {
    return; // sai da função sem valor
  }
  console.log(`Olá, ${name}!`);
}

greet('Maria');
greet('');

// Erro de compilação: retornar um valor em função void
// function wrong(): void {
//   return 10; // Type 'number' is not assignable to type 'void'.
// }

// ---------------------------------------------------------------
// Variável do tipo void: só aceita undefined
// ---------------------------------------------------------------
let useless: void = undefined;
console.log(useless);

// useless = 'texto'; // Erro: Type 'string' is not assignable to type 'void'.

// ---------------------------------------------------------------
// void em tipos de função (callbacks)
// ---------------------------------------------------------------
// Um callback tipado como void pode retornar qualquer valor, que é ignorado.
type Callback = (value: number) => void;

const print: Callback = (value) => {
  console.log(value);
};
print(42);

const lenient: Callback = (value) => value * 2; // permitido: o retorno é ignorado
lenient(2);

// Exemplo real: forEach espera um callback que retorna void
[1, 2, 3].forEach((n) => console.log(n * 2));

// ---------------------------------------------------------------
// void vs undefined
// ---------------------------------------------------------------
// Uma função cujo tipo de retorno é undefined precisa retornar explicitamente.
function returnsUndefined(): undefined {
  return undefined;
}
console.log(returnsUndefined());

// void vs never: never é para funções que nunca terminam
function fail(message: string): never {
  throw new Error(message);
}
// fail('erro'); // lança uma exceção e nunca retorna
