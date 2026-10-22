// =====================================================
// Sobrecarga de funções (function overloading)
// Cada exemplo está dentro de um bloco { } para que as
// funções e classes possam ser redeclaradas sem conflito.
// =====================================================

// A sobrecarga permite descrever várias assinaturas (formas de chamar)
// para uma mesma função, com uma única implementação.

// -----------------------------------------------------
// 1. Função somar() sobrecarregada
// -----------------------------------------------------
{
  // Duas assinaturas: uma para números e outra para strings
  function somar(a: number, b: number): number;
  function somar(a: string, b: string): string;

  // Uma única implementação que trata os dois casos
  function somar(a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
      return a + b;
    }
    throw new Error('Argumentos inválidos');
  }

  // Chamando a função sobrecarregada
  console.log(somar(10, 20)); // 30
  console.log(somar('Olá, ', 'mundo!')); // 'Olá, mundo!'
}

// -----------------------------------------------------
// 2. Sobrecarga com parâmetro opcional
// -----------------------------------------------------
// Quando as assinaturas têm quantidades diferentes de parâmetros,
// os parâmetros extras precisam ser opcionais na implementação.
// A função total() aceita dois ou três números.
{
  function total(a: number, b: number): number;
  function total(a: number, b: number, c: number): number;
  function total(a: number, b: number, c?: number): number {
    if (c) return a + b + c;
    return a + b;
  }

  console.log(total(1, 2)); // 3
  console.log(total(1, 2, 3)); // 6
}

// -----------------------------------------------------
// 3. Sobrecarga de métodos em uma classe
// -----------------------------------------------------
// Métodos também podem ser sobrecarregados. O método contar()
// retorna um número quando chamado sem argumentos e um array
// quando recebe um alvo.
{
  class Contador {
    private atual = 0;
    contar(): number;
    contar(alvo: number): number[];
    contar(alvo?: number): number | number[] {
      if (alvo) {
        let valores: number[] = [];
        for (let inicio = this.atual; inicio <= alvo; inicio++) {
          valores.push(inicio);
        }
        // define o valor atual como o alvo
        this.atual = alvo;
        return valores;
      }
      return ++this.atual;
    }
  }

  let contador = new Contador();

  console.log(contador.contar()); // retorna um número: 1
  console.log(contador.contar(5)); // retorna um array: [ 1, 2, 3, 4, 5 ]
}
