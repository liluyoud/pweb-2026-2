// =====================================================
// Tipos de função
// Cada exemplo está dentro de um bloco { } para que as
// variáveis possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Sintaxe do tipo de função
// -----------------------------------------------------
// Um tipo de função é formado por duas partes:
// os tipos dos parâmetros e o tipo de retorno.
//
// (parametro: tipo, parametro: tipo, ...) => tipo

// -----------------------------------------------------
// 2. Declarando uma variável com tipo de função
// -----------------------------------------------------
// A variável somar só aceita funções que recebem dois números
// e retornam um número
{
  let somar: (x: number, y: number) => number;

  // -----------------------------------------------------
  // 3. Atribuindo uma função à variável
  // -----------------------------------------------------
  // A função atribuída precisa ter a mesma assinatura do tipo
  somar = function (x: number, y: number) {
    return x + y;
  };

  console.log(somar(10, 20)); // 30

  // -----------------------------------------------------
  // 5. Atribuindo uma função incompatível (erro)
  // -----------------------------------------------------
  // Os parâmetros são string, mas o tipo exige number,
  // então o TypeScript acusa erro de compilação:
  //
  // somar = function (x: string, y: string): number {
  //   return x.concat(y).length;
  // };
  //
  // error TS2322: Type '(x: string, y: string) => number' is not assignable to type '(x: number, y: number) => number'.
  //   Types of parameters 'x' and 'x' are incompatible.
  //     Type 'number' is not assignable to type 'string'.
}

// -----------------------------------------------------
// 4. Declarando e atribuindo em uma única instrução
// -----------------------------------------------------
// Os nomes dos parâmetros no tipo (a, b) não precisam ser iguais
// aos da função (x, y); o que importa são os tipos
{
  let somar: (a: number, b: number) => number = function (x: number, y: number) {
    return x + y;
  };

  console.log(somar(5, 7)); // 12
}

// -----------------------------------------------------
// 6. Inferência de tipos de função (tipagem contextual)
// -----------------------------------------------------
// Quando a variável já tem um tipo de função, o TypeScript
// infere os tipos dos parâmetros da função atribuída.
// Aqui x e y são inferidos como number, mesmo sem anotação.
{
  let somar: (x: number, y: number) => number;

  somar = function (x, y) {
    return x + y;
  };

  console.log(somar(2, 3)); // 5
}
