// =====================================================
// Parâmetros padrão (default)
// Cada exemplo está dentro de um bloco { } para que as
// funções possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Parâmetros padrão no JavaScript
// -----------------------------------------------------
// O JavaScript aceita parâmetros padrão desde o ES2015.
// Se o argumento for omitido ou passado como undefined,
// o parâmetro recebe o valor padrão.
//
// function nome(parametro1 = valorPadrao1, ...) {
//   // faz alguma coisa
// }
//
// Exemplo em JavaScript (comentado porque, em um arquivo .ts no modo
// strict, os parâmetros sem tipo geram o erro TS7006):
//
// function aplicarDesconto(preco, desconto = 0.05) {
//   return preco * (1 - desconto);
// }
//
// console.log(aplicarDesconto(100)); // 95

// -----------------------------------------------------
// 2. Parâmetros padrão no TypeScript
// -----------------------------------------------------
// O TypeScript usa a mesma sintaxe, acrescentando as anotações de tipo.
//
// function nome(parametro1: tipo = valorPadrao1, parametro2: tipo = valorPadrao2, ...) {
//   //
// }
{
  function aplicarDesconto(preco: number, desconto: number = 0.05): number {
    return preco * (1 - desconto);
  }

  console.log(aplicarDesconto(100)); // 95
}

// -----------------------------------------------------
// 3. Parâmetros padrão não são permitidos em tipos de função
// -----------------------------------------------------
// Um tipo de função não pode ter valor padrão. O código abaixo não compila:
//
// let promocao: (preco: number, desconto: number = 0.05) => number;
//
// error TS2371: A parameter initializer is only allowed in a function or constructor implementation.
// (Um valor inicial de parâmetro só é permitido na implementação de uma função ou construtor)

// -----------------------------------------------------
// 4. Parâmetros padrão e parâmetros opcionais
// -----------------------------------------------------
// Parâmetros padrão também são opcionais: quem chama pode omiti-los.
// Por isso, as duas funções abaixo têm o mesmo tipo:
// (preco: number, desconto?: number) => number
//
// function aplicarDesconto(preco: number, desconto: number = 0.05): number {
//   // ...
// }
//
// function aplicarDesconto(preco: number, desconto?: number): number {
//   // ...
// }

// -----------------------------------------------------
// 5. Parâmetro padrão antes de um parâmetro obrigatório
// -----------------------------------------------------
// Parâmetros opcionais precisam vir depois dos obrigatórios,
// mas os parâmetros padrão não. Porém, se o parâmetro padrão vier
// antes de um obrigatório, é preciso passar undefined explicitamente
// para usar o valor padrão.
// A função abaixo retorna a quantidade de dias de um mês.
{
  function obterDias(ano: number = new Date().getFullYear(), mes: number): number {
    let dias = 0;
    switch (mes) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dias = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        dias = 30;
        break;
      case 2:
        // ano bissexto
        if ((ano % 4 == 0 && !(ano % 100 == 0)) || ano % 400 == 0) dias = 29;
        else dias = 28;
        break;
      default:
        throw Error('Mês inválido');
    }
    return dias;
  }

  // dias de fevereiro de 2019
  let dias = obterDias(2019, 2);
  console.log(dias); // 28

  // passando undefined para usar o ano atual
  let diasAnoAtual = obterDias(undefined, 2);
  console.log(diasAnoAtual); // 28 ou 29, dependendo do ano atual
}
