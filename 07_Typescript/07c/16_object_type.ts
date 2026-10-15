// Os tipos object e Object em TypeScript
export {};

// ---------------------------------------------------------------
// Tipo de objeto com anotação de propriedades
// ---------------------------------------------------------------
let employee: {
  firstName: string;
  lastName: string;
  age: number;
  jobTitle: string;
};

employee = {
  firstName: 'João',
  lastName: 'Silva',
  age: 30,
  jobTitle: 'Desenvolvedor',
};

console.log(employee);

// Declaração e inicialização na mesma linha
let employee2: {
  firstName: string;
  lastName: string;
  age: number;
  jobTitle: string;
} = {
  firstName: 'Maria',
  lastName: 'Souza',
  age: 28,
  jobTitle: 'Analista',
};

console.log(employee2.firstName);

// Erros de compilação:
// employee.salary = 5000; // Property 'salary' does not exist.
// employee.age = '30'; // Type 'string' is not assignable to type 'number'.

// ---------------------------------------------------------------
// Propriedades opcionais (?)
// ---------------------------------------------------------------
let user: {
  name: string;
  email?: string;
} = { name: 'Ana' };

console.log(user.email); // undefined

// ---------------------------------------------------------------
// Propriedades somente leitura
// ---------------------------------------------------------------
let point: { readonly x: number; readonly y: number } = { x: 10, y: 20 };
// point.x = 5; // Erro: Cannot assign to 'x' because it is a read-only property.
console.log(point);

// ---------------------------------------------------------------
// Inferência de tipo em objetos
// ---------------------------------------------------------------
let book = { title: 'TypeScript', pages: 300 }; // { title: string; pages: number }
book.pages = 320;
// book.pages = 'muitas'; // Erro

// ---------------------------------------------------------------
// O tipo object (minúsculo): qualquer valor não primitivo
// ---------------------------------------------------------------
let obj: object;

obj = { name: 'João' };
obj = [1, 2, 3];
obj = () => 'olá';

// obj = 42; // Erro: Type 'number' is not assignable to type 'object'.
// obj = 'texto'; // Erro

// O tipo object não permite acessar propriedades específicas:
obj = { name: 'João' };
// console.log(obj.name); // Erro: Property 'name' does not exist on type 'object'.

// ---------------------------------------------------------------
// O tipo Object (maiúsculo): descreve funcionalidades comuns a todos os objetos
// ---------------------------------------------------------------
let generic: Object;

generic = { name: 'João' };
generic = 42; // permitido: primitivos também têm os métodos de Object
console.log(generic.toString());
console.log(generic.hasOwnProperty('x'));

// Prefira object ou tipos específicos em vez de Object.

// ---------------------------------------------------------------
// O tipo vazio {}
// ---------------------------------------------------------------
let empty: {} = {};

// Como não há propriedades declaradas, só os métodos de Object são acessíveis:
console.log(empty.toString());

// empty.name = 'João'; // Erro: Property 'name' does not exist on type '{}'.

// Aceita qualquer valor, exceto null e undefined
empty = 'texto';
empty = 100;
