// =====================================================
// Parâmetros rest (...)
// Cada exemplo está dentro de um bloco { } para que as
// funções e variáveis possam ser redeclaradas sem conflito.
// =====================================================

// Um parâmetro rest permite que a função receba uma quantidade
// variável de argumentos (zero ou mais), que chegam como um array.

// -----------------------------------------------------
// 1. Parâmetro rest com um único tipo
// -----------------------------------------------------
// Coloque três pontos antes do nome do parâmetro e anote-o
// com um tipo de array:
//
// function fn(...resto: tipo[]) {
//   // ...
// }
//
// A função obterTotal() soma todos os números recebidos
{
  function obterTotal(...numeros: number[]): number {
    let total = 0;
    numeros.forEach((num) => (total += num));
    return total;
  }

  // como numeros é um parâmetro rest, a função pode ser
  // chamada com zero, dois ou três argumentos
  console.log(obterTotal()); // 0
  console.log(obterTotal(10, 20)); // 30
  console.log(obterTotal(10, 20, 30)); // 60
}

// -----------------------------------------------------
// 2. Parâmetro rest com vários tipos
// -----------------------------------------------------
// Usando um tipo união, o parâmetro rest aceita números e strings.
// A função combinar() soma os números e concatena as strings.
{
  function combinar(...args: (number | string)[]): [number, string] {
    let total = 0;
    let texto = '';
    args.forEach((arg) => {
      if (typeof arg === 'number') {
        total += arg;
      } else if (typeof arg === 'string') {
        texto += arg;
      }
    });

    return [total, texto];
  }

  const [total, texto] = combinar(3, 'Feliz', 2, 1, ' Ano Novo');

  console.log({ total }); // { total: 6 }
  console.log({ texto }); // { texto: 'Feliz Ano Novo' }

  // O tipo do parâmetro é um array de tipo união:
  // ...args: (number | string)[]
}

// -----------------------------------------------------
// Resumo
// -----------------------------------------------------
// Um único tipo:  ...args: tipo[]
// Vários tipos:   ...args: (tipo1 | tipo2)[]
