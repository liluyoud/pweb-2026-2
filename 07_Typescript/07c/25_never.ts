// O tipo never em TypeScript
export {};

// ---------------------------------------------------------------
// never: representa valores que nunca ocorrem
// ---------------------------------------------------------------

// Função que sempre lança uma exceção: nunca retorna
function raiseError(message: string): never {
  throw new Error(message);
}

// Uso:
// raiseError('Algo deu errado'); // lança Error e encerra a execução

// Função com laço infinito: nunca termina
function forever(): never {
  while (true) {
    // processamento contínuo (ex.: servidor aguardando requisições)
  }
}

// ---------------------------------------------------------------
// never vs void
// ---------------------------------------------------------------
// void: a função termina, mas não retorna valor.
// never: a função nunca termina normalmente.
function logMessage(message: string): void {
  console.log(message);
}
logMessage('termina normalmente');

// ---------------------------------------------------------------
// Inferência: função que só lança erro tem retorno inferido como never
// ---------------------------------------------------------------
const fail = (message: string) => {
  throw new Error(message);
};
// Retorno inferido: never (para function expressions/arrow functions)

// ---------------------------------------------------------------
// never em union types: é removido da união
// ---------------------------------------------------------------
type Result = string | never; // equivale a string
let r: Result = 'texto';
console.log(r);

// ---------------------------------------------------------------
// Estreitamento exaustivo (exhaustive checks)
// ---------------------------------------------------------------
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    default: {
      // Aqui shape é never. Se um novo tipo for adicionado a Shape
      // e não for tratado, o TypeScript acusa erro nesta atribuição.
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}

console.log(area({ kind: 'circle', radius: 2 })); // 12.566...
console.log(area({ kind: 'square', side: 3 })); // 9

// ---------------------------------------------------------------
// Atribuição: nada pode ser atribuído a never (exceto never)
// ---------------------------------------------------------------
let impossible: never;
// impossible = 1; // Erro: Type 'number' is not assignable to type 'never'.
// impossible = undefined; // Erro

// never é atribuível a qualquer tipo:
function neverReturns(): never {
  throw new Error('erro');
}
// let n: number = neverReturns(); // OK em tempo de compilação

// ---------------------------------------------------------------
// Estreitamento que resulta em never
// ---------------------------------------------------------------
function check(value: string | number) {
  if (typeof value === 'string') {
    return 'string';
  } else if (typeof value === 'number') {
    return 'number';
  } else {
    // value é never aqui: todos os casos já foram tratados
    return value;
  }
}
console.log(check('a'), check(1));
