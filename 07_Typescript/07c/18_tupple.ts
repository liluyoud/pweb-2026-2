// Tuplas (tuples) em TypeScript
export {};

// ---------------------------------------------------------------
// Uma tupla é um array com tamanho fixo e tipos conhecidos por posição
// ---------------------------------------------------------------
let skill: [string, number];
skill = ['Programação', 5];

console.log(skill); // [ 'Programação', 5 ]

// Erros de compilação: ordem dos tipos incorreta
// skill = [5, 'Programação'];
// Type 'number' is not assignable to type 'string'.

// ---------------------------------------------------------------
// Acessando elementos
// ---------------------------------------------------------------
console.log(skill[0]); // Programação
console.log(skill[1]); // 5

// Os tipos são conhecidos por posição:
console.log(skill[0].toUpperCase()); // PROGRAMAÇÃO
console.log(skill[1].toFixed(1)); // 5.0

// Erro: acessar índice fora do tamanho da tupla
// console.log(skill[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'.

// ---------------------------------------------------------------
// Desestruturação
// ---------------------------------------------------------------
let [skillName, skillLevel] = skill;
console.log(skillName, skillLevel);

// ---------------------------------------------------------------
// Elementos opcionais
// ---------------------------------------------------------------
let bgColor: [number, number, number, number?];
bgColor = [0, 255, 255, 0.5];
bgColor = [0, 255, 255]; // o alfa é opcional

console.log(bgColor);

// ---------------------------------------------------------------
// Elementos rest (quantidade variável)
// ---------------------------------------------------------------
let scores: [string, ...number[]];
scores = ['João', 80, 90, 75];
scores = ['Maria'];

console.log(scores);

// ---------------------------------------------------------------
// Tuplas nomeadas (rótulos documentam cada posição)
// ---------------------------------------------------------------
let point: [x: number, y: number] = [10, 20];
console.log(point);

// ---------------------------------------------------------------
// Tuplas somente leitura
// ---------------------------------------------------------------
let rgb: readonly [number, number, number] = [255, 0, 128];
// rgb[0] = 0; // Erro: Cannot assign to '0' because it is a read-only property.
console.log(rgb);

// ---------------------------------------------------------------
// Uso comum: retornar múltiplos valores de uma função
// ---------------------------------------------------------------
function minMax(values: number[]): [number, number] {
  return [Math.min(...values), Math.max(...values)];
}

let [min, max] = minMax([4, 8, 1, 9, 3]);
console.log(`Mínimo: ${min}, Máximo: ${max}`); // Mínimo: 1, Máximo: 9

// ---------------------------------------------------------------
// Array de tuplas
// ---------------------------------------------------------------
let employees: [number, string][] = [
  [1, 'João'],
  [2, 'Maria'],
];

for (const [id, name] of employees) {
  console.log(`${id}: ${name}`);
}

// ---------------------------------------------------------------
// Cuidado: push contorna a verificação de tamanho
// ---------------------------------------------------------------
let pair: [string, number] = ['a', 1];
pair.push(2); // permitido pelo TypeScript (o tipo adicionado deve estar na união)
console.log(pair); // [ 'a', 1, 2 ]
