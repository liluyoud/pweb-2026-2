// =====================================================
// Estruturas de repetição: while
// Cada exemplo está dentro de um bloco { } para que as
// variáveis possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Sintaxe do while
// -----------------------------------------------------
// O corpo do laço é executado enquanto a condição for verdadeira.
// A condição é verificada ANTES de cada repetição, então, se ela
// começar falsa, o corpo nunca é executado.
//
// while (condicao) {
//   // faz alguma coisa
// }

// -----------------------------------------------------
// 2. Saindo do laço antes da hora
// -----------------------------------------------------
// Use um if com break para sair antes de a condição ficar falsa.
//
// while (condicao) {
//   // faz alguma coisa
//   // ...
//
//   if (outraCondicao)
//     break;
// }

// -----------------------------------------------------
// 3. Exemplo simples
// -----------------------------------------------------
// Exibe o contador enquanto ele for menor que 5
{
  let contador = 0;

  while (contador < 5) {
    console.log(contador);
    contador++;
  }
  // Saída: 0 1 2 3 4 (um por linha)
}

// -----------------------------------------------------
// 4. Exemplo prático: removendo itens de uma lista HTML
// -----------------------------------------------------
// Este exemplo usa o DOM, então só funciona no navegador
// (por isso está comentado aqui, já que o arquivo roda no Node).
//
// Suponha que o documento HTML tenha esta lista:
//
// <ul id="lista">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
//   <li>Item 4</li>
// </ul>
//
// O laço remove o primeiro filho da lista enquanto ele existir,
// até que a lista fique vazia:
//
// let lista = document.querySelector('#lista');
//
// while (lista?.firstChild) {
//   lista.removeChild(lista.firstChild);
// }
//
// Obs.: o ?. é necessário porque querySelector pode retornar null.
