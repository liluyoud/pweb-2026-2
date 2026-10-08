// String literal types em TypeScript
export {};

// ---------------------------------------------------------------
// Tipo literal de string: aceita apenas um valor específico
// ---------------------------------------------------------------
let click: 'click';
click = 'click';
// click = 'dblclick'; // Erro: Type '"dblclick"' is not assignable to type '"click"'.

// ---------------------------------------------------------------
// Combinando com union types: conjunto fixo de valores
// ---------------------------------------------------------------
let mouseEvent: 'click' | 'dblclick' | 'mouseup' | 'mousedown';

mouseEvent = 'click';
mouseEvent = 'dblclick';
mouseEvent = 'mouseup';
mouseEvent = 'mousedown';

// mouseEvent = 'mouseover'; // Erro: Type '"mouseover"' is not assignable to type ...

console.log(mouseEvent);

// ---------------------------------------------------------------
// Alias de tipo para reutilização
// ---------------------------------------------------------------
type MouseEventType = 'click' | 'dblclick' | 'mouseup' | 'mousedown';

let event1: MouseEventType = 'click';
let event2: MouseEventType = 'mouseup';

console.log(event1, event2);

// ---------------------------------------------------------------
// Uso em parâmetros de função
// ---------------------------------------------------------------
function handleEvent(type: MouseEventType): void {
  switch (type) {
    case 'click':
      console.log('Clique simples');
      break;
    case 'dblclick':
      console.log('Clique duplo');
      break;
    case 'mouseup':
      console.log('Botão solto');
      break;
    case 'mousedown':
      console.log('Botão pressionado');
      break;
  }
}

handleEvent('click');
// handleEvent('keydown'); // Erro: Argument of type '"keydown"' is not assignable ...

// ---------------------------------------------------------------
// Exemplo: o tipo de DOM addEventListener usa literais de string
// ---------------------------------------------------------------
// document.addEventListener('click', (e) => {}); // e é MouseEvent
// document.addEventListener('keydown', (e) => {}); // e é KeyboardEvent

// ---------------------------------------------------------------
// Inferência: const preserva o literal, let amplia para string
// ---------------------------------------------------------------
const fixed = 'click'; // tipo: "click"
let wide = 'click'; // tipo: string

let typed: MouseEventType = fixed; // OK
// typed = wide; // Erro: Type 'string' is not assignable to type 'MouseEventType'.

// Com "as const" ou anotação, o literal é preservado
let narrow = 'click' as const; // tipo: "click"
typed = narrow;

console.log(typed, wide);

// ---------------------------------------------------------------
// Tipos literais em propriedades de objetos
// ---------------------------------------------------------------
type Button = {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
};

const save: Button = { label: 'Salvar', variant: 'primary' };
// const bad: Button = { label: 'X', variant: 'success' }; // Erro

console.log(save);

// ---------------------------------------------------------------
// Outros tipos literais: número e boolean
// ---------------------------------------------------------------
type Level = 1 | 2 | 3;
let level: Level = 2;

type Yes = true;
let confirmed: Yes = true;

console.log(level, confirmed);
