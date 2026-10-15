// Type inference em TypeScript
export {}; 

// ---------------------------------------------------------------
// Inferência básica
// ---------------------------------------------------------------
let counter1: number; // anotação explícita
counter1 = 0;

let counter2 = 0; // TypeScript infere: number

let counter3: number = 0; // anotação redundante

// Parâmetro com valor padrão: max é inferido como number
function setCounter(max = 100) {
  // ...
  return max;
}

// Tipo de retorno inferido: number
function increment1(counter: number) {
  return counter++;
}

// Mesmo código com o tipo de retorno anotado
function increment2(counter: number): number {
  return counter++;
}

// ---------------------------------------------------------------
// Algoritmo do "melhor tipo comum"
// ---------------------------------------------------------------
let items1 = [1, 2, 3, null]; // (number | null)[]

let items2 = [1, 2, 3, 'Cheese']; // (string | number)[]

// ---------------------------------------------------------------
// Tipagem contextual
// ---------------------------------------------------------------
// event é inferido como MouseEvent pelo contexto do 'click'
document.addEventListener('click', function (event) {
  console.log(event.button);
});

// event é inferido como Event no 'scroll'
document.addEventListener('scroll', function (event) {
  // Erro de compilação:
  // Property 'button' does not exist on type 'Event'.(2339)
  // console.log(event.button);
  console.log(event.type);
});

console.log(counter1, counter2, counter3, setCounter(), increment1(1), increment2(1), items1, items2);
