// =====================================================
// Estruturas de repetição: break
// Cada exemplo está dentro de um bloco { } para que as
// variáveis possam ser redeclaradas sem conflito.
// =====================================================

// O break encerra imediatamente um laço (for, while, do...while)
// ou um switch, e a execução continua na instrução seguinte.

// -----------------------------------------------------
// 1. Usando break dentro de um for
// -----------------------------------------------------
// Procura o primeiro produto com preço 900 e para o laço ao encontrá-lo
{
  let produtos = [
    { nome: 'celular', preco: 700 },
    { nome: 'tablet', preco: 900 },
    { nome: 'notebook', preco: 1200 },
  ];

  // var (em vez de let) para que o i continue acessível depois do laço
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].preco == 900)
      break;
  }

  // exibe o produto encontrado
  console.log(produtos[i]);
  // Saída: { nome: 'tablet', preco: 900 }
}

// -----------------------------------------------------
// 2. Usando break dentro de um switch
// -----------------------------------------------------
// Retorna o desconto de um produto; o break sai do switch
// para que os cases seguintes não sejam executados
{
  let produtos = [
    { nome: 'celular', preco: 700 },
    { nome: 'tablet', preco: 900 },
    { nome: 'notebook', preco: 1200 },
  ];

  let desconto = 0;
  let produto = produtos[1];

  switch (produto.nome) {
    case 'celular':
      desconto = 5;
      break;
    case 'tablet':
      desconto = 10;
      break;
    case 'notebook':
      desconto = 15;
      break;
  }

  console.log(`Há ${desconto}% de desconto no ${produto.nome}.`);
  // Saída: Há 10% de desconto no tablet.
}
