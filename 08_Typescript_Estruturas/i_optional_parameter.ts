// =====================================================
// Parâmetros opcionais
// Cada exemplo está dentro de um bloco { } para que as
// funções possam ser redeclaradas sem conflito.
// =====================================================

// -----------------------------------------------------
// 1. Declarando um parâmetro opcional
// -----------------------------------------------------
// Para tornar um parâmetro opcional, coloque ? depois do nome dele.
// Dentro da função, verifique se ele foi informado usando typeof,
// e não apenas if (c), pois 0 e '' também seriam tratados como ausentes.
//
// function multiplicar(a: number, b: number, c?: number): number {
//   if (typeof c !== 'undefined') {
//     return a * b * c;
//   }
//   return a * b;
// }

// -----------------------------------------------------
// 2. Chamando a função com e sem o argumento opcional
// -----------------------------------------------------
// A função pode ser chamada com três ou com dois argumentos
{
  function multiplicar(a: number, b: number, c?: number): number {
    if (typeof c !== 'undefined') {
      return a * b * c;
    }
    return a * b;
  }

  let d = multiplicar(10, 20, 30);
  console.log(d); // 6000

  let e = multiplicar(10, 20);
  console.log(e); // 200
}

// -----------------------------------------------------
// 3. Parâmetro opcional antes de um obrigatório (erro)
// -----------------------------------------------------
// Os parâmetros opcionais devem vir DEPOIS dos obrigatórios.
// Tornar b opcional enquanto c continua obrigatório gera erro:
//
// function multiplicar(a: number, b?: number, c: number): number {
//   if (typeof c !== 'undefined') {
//     return a * b * c;
//   }
//   return a * b;
// }
//
// error TS1016: A required parameter cannot follow an optional parameter.
// (Um parâmetro obrigatório não pode vir depois de um parâmetro opcional)
