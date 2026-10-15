// O tipo array em TypeScript
export {};

// ---------------------------------------------------------------
// Sintaxe: let arrayName: type[];
// ---------------------------------------------------------------
let skills: string[];
skills = ['Resolução de problemas', 'Pensamento crítico'];

// Declaração com inicialização
let numbers: number[] = [1, 2, 3];

// Adicionando elementos
skills.push('Comunicação');
console.log(skills);

// Erro de compilação:
// skills.push(100); // Argument of type 'number' is not assignable to parameter of type 'string'.

// ---------------------------------------------------------------
// Acessando elementos
// ---------------------------------------------------------------
console.log(skills[0]); // Resolução de problemas
console.log(skills.length); // 3

skills[0] = skills[0].toUpperCase();
console.log(skills[0]); // RESOLUÇÃO DE PROBLEMAS

// ---------------------------------------------------------------
// Inferência de tipo
// ---------------------------------------------------------------
let scores = [80, 90, 75]; // number[]
// scores.push('cem'); // Erro

// ---------------------------------------------------------------
// Métodos úteis
// ---------------------------------------------------------------
// Transformar elementos
let upper = skills.map((skill) => skill.toUpperCase());
console.log(upper);

// Filtrar elementos
let approved = scores.filter((score) => score >= 80);
console.log(approved); // [80, 90]

// Somar elementos
let total = scores.reduce((sum, score) => sum + score, 0);
console.log(total); // 245

// Remover elementos
scores.pop(); // remove o último
scores.shift(); // remove o primeiro
console.log(scores); // [90]

// ---------------------------------------------------------------
// Arrays de tipos mistos (union types)
// ---------------------------------------------------------------
let mixed: (string | number)[] = ['João', 25, 'Maria', 30];
console.log(mixed);

// Sem anotação, o tipo é inferido pela união dos elementos
let items = [1, 'dois', 3]; // (string | number)[]

// ---------------------------------------------------------------
// Array de objetos
// ---------------------------------------------------------------
let people: { name: string; age: number }[] = [
  { name: 'João', age: 30 },
  { name: 'Maria', age: 28 },
];

for (const person of people) {
  console.log(`${person.name} tem ${person.age} anos`);
}

// ---------------------------------------------------------------
// Arrays multidimensionais
// ---------------------------------------------------------------
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(matrix[1][2]); // 6

// ---------------------------------------------------------------
// Array somente leitura
// ---------------------------------------------------------------
let fixed: readonly number[] = [1, 2, 3];
// fixed.push(4); // Erro: Property 'push' does not exist on type 'readonly number[]'.

// ---------------------------------------------------------------
// Sintaxe alternativa: Array<tipo>
// ---------------------------------------------------------------
let names: Array<string> = ['Ana', 'Bruno'];
console.log(names);

// ---------------------------------------------------------------
// Desestruturação e spread
// ---------------------------------------------------------------
let [first, second] = names;
console.log(first, second); // Ana Bruno

let allNames = [...names, 'Carla'];
console.log(allNames);

// ---------------------------------------------------------------
// Array vazio
// ---------------------------------------------------------------
let emptyList: string[] = [];
emptyList.push('primeiro');
console.log(emptyList);
