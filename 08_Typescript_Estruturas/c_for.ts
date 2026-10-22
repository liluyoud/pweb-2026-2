// =====================================================
// Estruturas de repetição: for
// Cada exemplo está dentro de um bloco { } para que as
// variáveis possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Sintaxe do for
// -----------------------------------------------------
// O for possui três partes opcionais entre parênteses:
// inicialização, condição e expressão de atualização.
//
// for (inicializacao; condicao; expressao) {
//   // instrução
// }
//
// - inicializacao: executada uma única vez, antes do laço começar.
// - condicao: avaliada antes de cada repetição; se for falsa, o laço termina.
// - expressao: executada ao final de cada repetição (ex.: i++).

// -----------------------------------------------------
// 2. Omitindo as três partes
// -----------------------------------------------------
// Como as três partes são opcionais, o cabeçalho pode ficar vazio.
// Isso cria um laço infinito, que precisa de um break para parar.
//
// for (;;) {
//   // faz alguma coisa
// }

// -----------------------------------------------------
// 3. Omitindo o corpo do laço
// -----------------------------------------------------
// O corpo também pode ficar vazio, embora isso seja raro.
//
// for (inicializacao; condicao; expressao);

// -----------------------------------------------------
// 4. Exemplo básico
// -----------------------------------------------------
// Exibe os números de 0 a 9
{
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  // Saída: 0 1 2 3 4 5 6 7 8 9 (um por linha)
}

// -----------------------------------------------------
// 5. Inicialização opcional
// -----------------------------------------------------
// Mesma saída, mas o contador é declarado fora do laço
{
  let i = 0;
  for (; i < 10; i++) {
    console.log(i);
  }
  // Saída: 0 1 2 3 4 5 6 7 8 9 (um por linha)
}

// -----------------------------------------------------
// 6. Omitindo a condição
// -----------------------------------------------------
// Sem condição, o laço precisa de um break para parar.
// Atenção: como o console.log vem antes do teste, o 10 também é exibido.
{
  for (let i = 0; ; i++) {
    console.log(i);
    if (i > 9) break;
  }
  // Saída: 0 1 2 3 4 5 6 7 8 9 10 (um por linha)
}

// -----------------------------------------------------
// 7. Omitindo as três partes
// -----------------------------------------------------
// Usa um contador externo e um break para obter a mesma saída
{
  let i = 0;
  for (;;) {
    console.log(i);
    i++;
    if (i > 9) break;
  }
  // Saída: 0 1 2 3 4 5 6 7 8 9 (um por linha)
}
