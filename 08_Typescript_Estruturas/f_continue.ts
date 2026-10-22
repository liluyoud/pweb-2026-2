// =====================================================
// Estruturas de repetição: continue
// Cada exemplo está dentro de um bloco { } para que as
// variáveis possam ser redeclaradas sem conflito.
// =====================================================

// O continue interrompe apenas a repetição atual do laço
// (for, while, do...while) e pula direto para a próxima.
// Diferente do break, ele NÃO encerra o laço.

// -----------------------------------------------------
// 1. Usando continue dentro de um for
// -----------------------------------------------------
// Percorre os números de 0 a 8, pula os ímpares e exibe só os pares
{
  for (let indice = 0; indice < 9; indice++) {
    // se o índice for ímpar, pula para a próxima repetição
    if (indice % 2)
      continue;

    // o código abaixo não é executado para os números ímpares
    console.log(indice);
  }
  // Saída: 0 2 4 6 8 (um por linha)
}

// -----------------------------------------------------
// 2. Usando continue dentro de um while
// -----------------------------------------------------
// Mesma saída do exemplo com for
{
  let indice = -1;

  while (indice < 9) {
    indice = indice + 1;
    if (indice % 2)
      continue;
    console.log(indice);
  }
  // Saída: 0 2 4 6 8 (um por linha)
}

// -----------------------------------------------------
// 3. Usando continue dentro de um do...while
// -----------------------------------------------------
// Conta quantos números pares existem entre 9 e 99
{
  let indice = 9;
  let contador = 0;

  do {
    indice += 1;
    if (indice % 2)
      continue;
    contador += 1;
  } while (indice < 99);

  console.log(contador); // 45
}
