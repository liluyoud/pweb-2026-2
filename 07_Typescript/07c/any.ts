// O tipo any em TypeScript
export {};

// ---------------------------------------------------------------
// any: desativa a verificação de tipos para a variável
// ---------------------------------------------------------------
let result: any;

result = 1;
result = 'olá';
result = true;
result = { name: 'João' };
result = [1, 2, 3];

console.log(result);

// ---------------------------------------------------------------
// Qualquer operação é aceita em tempo de compilação
// ---------------------------------------------------------------
let value: any = 'texto';

console.log(value.toUpperCase()); // TEXTO

// O TypeScript não reclama, mas falha em tempo de execução:
// value.metodoInexistente(); // TypeError: value.metodoInexistente is not a function
// value = 10;
// value.toUpperCase(); // TypeError: value.toUpperCase is not a function

// ---------------------------------------------------------------
// any implícito: variável declarada sem tipo nem valor inicial
// ---------------------------------------------------------------
let data; // tipo any implícito
data = 100;
data = 'cem';
data = [100];

// Com "noImplicitAny": true (parte do "strict"), o any implícito em
// parâmetros gera erro:
// function double(n) { // Parameter 'n' implicitly has an 'any' type.
//   return n * 2;
// }

// Solução: anotar o tipo (ou any, de forma explícita)
function double(n: number) {
  return n * 2;
}
console.log(double(4));

// ---------------------------------------------------------------
// any em arrays e objetos
// ---------------------------------------------------------------
let things: any[] = [1, 'dois', true, { three: 3 }];
console.log(things);

let json: any = JSON.parse('{"name":"Maria","age":28}');
console.log(json.name, json.age); // Maria 28

// ---------------------------------------------------------------
// Quando usar: migrar código JavaScript e dados dinâmicos
// ---------------------------------------------------------------
// Prefira tipos específicos, unknown ou genéricos sempre que possível.

// any vs unknown: unknown exige verificação antes do uso
let safe: unknown = 'texto';
// safe.toUpperCase(); // Erro: 'safe' is of type 'unknown'.
if (typeof safe === 'string') {
  console.log(safe.toUpperCase()); // TEXTO
}

// ---------------------------------------------------------------
// any vs Object
// ---------------------------------------------------------------
let anyValue: any = 'abc';
let objValue: Object = 'abc';

anyValue.toUpperCase(); // permitido
// objValue.toUpperCase(); // Erro: Property 'toUpperCase' does not exist on type 'Object'.
console.log(objValue.toString());
