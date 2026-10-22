// =====================================================
// Estruturas de decisão: if / else
// Cada exemplo está dentro de um bloco { } para que as
// variáveis possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Instrução if
// -----------------------------------------------------
// Sintaxe:
// if (condicao) {
//   // instruções executadas se a condição for verdadeira
// }

// Exemplo 1: a condição é verdadeira, então o contador é incrementado
{
  const maximo = 100;
  let contador = 0;

  if (contador < maximo) {
    contador++;
  }

  console.log(contador); // 1
}

// Exemplo 2: a condição é falsa, então o contador não muda
{
  const maximo = 100;
  let contador = 100;

  if (contador < maximo) {
    contador++;
  }

  console.log(contador); // 100
}

// -----------------------------------------------------
// 2. Instrução if...else
// -----------------------------------------------------
// Sintaxe:
// if (condicao) {
//   // executa se a condição for verdadeira
// } else {
//   // executa se a condição for falsa
// }

// Exemplo 3: como a condição é falsa, o bloco else reinicia o contador
{
  const maximo = 100;
  let contador = 100;

  if (contador < maximo) {
    contador++;
  } else {
    contador = 1;
  }

  console.log(contador); // 1
}

// -----------------------------------------------------
// 3. Operador ternário ?: (forma curta do if...else)
// -----------------------------------------------------
// Sintaxe:
// condicao ? expressaoSeVerdadeira : expressaoSeFalsa

// Exemplo 4: mesma lógica do exemplo 3, usando o operador ternário
{
  const maximo = 100;
  let contador = 100;

  contador < maximo ? contador++ : (contador = 1);

  console.log(contador); // 1
}

// Exemplo 5: forma mais legível, atribuindo o resultado do ternário
{
  const maximo = 100;
  let contador = 100;

  contador = contador < maximo ? contador + 1 : 1;

  console.log(contador); // 1
}

// -----------------------------------------------------
// 4. Instrução if...else if...else
// -----------------------------------------------------
// Sintaxe:
// if (condicao1) {
//   // executa se a condicao1 for verdadeira
// } else if (condicao2) {
//   // executa se a condicao2 for verdadeira
// } else {
//   // executa se nenhuma condição for verdadeira
// }

// Exemplo 6: calcula o desconto de acordo com a quantidade de itens
{
  let desconto: number;
  let quantidadeItens = 11;

  if (quantidadeItens > 0 && quantidadeItens <= 5) {
    desconto = 5; // 5% de desconto
  } else if (quantidadeItens > 5 && quantidadeItens <= 10) {
    desconto = 10; // 10% de desconto
  } else {
    desconto = 15; // 15% de desconto
  }

  console.log(`Você ganhou ${desconto}% de desconto.`); // Você ganhou 15% de desconto.
}

// Exemplo 7: trata também o caso de quantidade inválida (zero ou negativa)
{
  let desconto: number;
  let quantidadeItens = 11;

  if (quantidadeItens > 0 && quantidadeItens <= 5) {
    desconto = 5; // 5% de desconto
  } else if (quantidadeItens > 5 && quantidadeItens <= 10) {
    desconto = 10; // 10% de desconto
  } else if (quantidadeItens > 10) {
    desconto = 15; // 15% de desconto
  } else {
    throw new Error('A quantidade de itens não pode ser zero ou negativa!');
  }

  console.log(`Você ganhou ${desconto}% de desconto.`); // Você ganhou 15% de desconto.
}

// -----------------------------------------------------
// Exemplos do slide
// -----------------------------------------------------
{
  const idade = 18;

  if (idade >= 18) {
    console.log('Você é maior de idade.');
  } else {
    console.log('Você é menor de idade.');
  }

  // Outro exemplo
  const euSouEstudante = true;

  if (euSouEstudante) {
    console.log('Você é estudante!');
  } else {
    console.log('Você não é estudante.');
  }
}
