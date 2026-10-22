// =====================================================
// Estruturas de decisão: switch...case
// Cada exemplo está dentro de um bloco { } para que as
// variáveis possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Sintaxe básica
// -----------------------------------------------------
// A expressão é avaliada, o primeiro case que corresponder
// ao valor é executado e o default trata quando nenhum corresponde.
//
// switch (expressao) {
//   case valor1:
//     // instrução 1
//     break;
//   case valor2:
//     // instrução 2
//     break;
//   case valorN:
//     // instrução N
//     break;
//   default:
//     // executa se nenhum case corresponder
//     break;
// }

// -----------------------------------------------------
// 2. Exemplo simples de switch case
// -----------------------------------------------------
// Exibe uma mensagem de acordo com o id do botão clicado
{
  let idAlvo = 'btnExcluir';

  switch (idAlvo) {
    case 'btnAtualizar':
      console.log('Atualizar');
      break;
    case 'btnExcluir':
      console.log('Excluir');
      break;
    case 'btnNovo':
      console.log('Novo');
      break;
  }
  // Saída: Excluir
}

// -----------------------------------------------------
// 3. Agrupando cases
// -----------------------------------------------------
// Vários cases podem compartilhar o mesmo bloco de código.
// Este exemplo retorna a quantidade de dias de um mês,
// levando em conta os anos bissextos.
{
  // altere o mês e o ano
  let mes = 2,
    ano = 2020;

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

  console.log(`O mês ${mes} de ${ano} tem ${dias} dias`);
  // Saída: O mês 2 de 2020 tem 29 dias
}
