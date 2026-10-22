// =====================================================
// Funções
// Cada exemplo está dentro de um bloco { } para que as
// funções possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Sintaxe da declaração de função
// -----------------------------------------------------
// No TypeScript, a palavra-chave function declara uma função.
// É possível anotar o tipo de cada parâmetro e o tipo de retorno.
//
// function nome(parametro: tipo, parametro: tipo, ...): tipoRetorno {
//   // faz alguma coisa
// }

// -----------------------------------------------------
// 2. Função somar() com tipos
// -----------------------------------------------------
// Recebe dois números e retorna um número
{
  function somar(a: number, b: number): number {
    return a + b;
  }

  let soma = somar(10, 20);
  console.log(soma); // 30

  // -----------------------------------------------------
  // 3. Passando strings para somar()
  // -----------------------------------------------------
  // Passar strings onde são esperados números gera erro de compilação:
  //
  // let soma2 = somar('10', '20');
  //
  // error TS2345: Argument of type '"10"' is not assignable to parameter of type 'number'
  // (O argumento do tipo '"10"' não pode ser atribuído ao parâmetro do tipo 'number')
}

// -----------------------------------------------------
// 4. Função que não retorna nada (void)
// -----------------------------------------------------
// Usar void como tipo de retorno indica que a função não produz valor
{
  function ecoar(mensagem: string): void {
    console.log(mensagem.toUpperCase());
  }

  ecoar('Olá, TypeScript!'); // OLÁ, TYPESCRIPT!
}

// -----------------------------------------------------
// 5. Tipo de retorno sem anotação
// -----------------------------------------------------
// O TypeScript infere que o tipo de retorno é number.
// Porém, se a função tiver caminhos que retornam tipos diferentes,
// o tipo inferido pode ser uma união (ex.: number | string) ou any.
// Por isso, é recomendado sempre anotar o tipo de retorno.
{
  function somar(a: number, b: number) {
    return a + b;
  }

  console.log(somar(5, 7)); // 12
}
