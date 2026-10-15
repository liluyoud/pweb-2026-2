// Enums em TypeScript
export {};

// ---------------------------------------------------------------
// Problema: usar números "mágicos" para representar meses
// ---------------------------------------------------------------
function isItSummer(month: number) {
  switch (month) {
    case 6:
    case 7:
    case 8:
      return true;
    default:
      return false;
  }
}
console.log(isItSummer(6)); // true

// ---------------------------------------------------------------
// Solução: enum (conjunto de constantes nomeadas)
// ---------------------------------------------------------------
enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

function isSummer(month: Month): boolean {
  switch (month) {
    case Month.Jun:
    case Month.Jul:
    case Month.Aug:
      return true;
    default:
      return false;
  }
}

console.log(isSummer(Month.Jul)); // true
console.log(isSummer(Month.Jan)); // false

// ---------------------------------------------------------------
// Valores numéricos automáticos (começam em 0)
// ---------------------------------------------------------------
console.log(Month.Jan); // 0
console.log(Month.Dec); // 11

// Mapeamento reverso: número -> nome
console.log(Month[0]); // Jan
console.log(Month[5]); // Jun

// ---------------------------------------------------------------
// Valores iniciais personalizados
// ---------------------------------------------------------------
enum Weekday {
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}
console.log(Weekday.Mon); // 1
console.log(Weekday.Sun); // 7

// ---------------------------------------------------------------
// Valores explícitos
// ---------------------------------------------------------------
enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}
console.log(HttpStatus.NotFound); // 404

// ---------------------------------------------------------------
// Enums de string
// ---------------------------------------------------------------
enum Direction {
  Up = 'CIMA',
  Down = 'BAIXO',
  Left = 'ESQUERDA',
  Right = 'DIREITA',
}
console.log(Direction.Up); // CIMA

// Enums de string não têm mapeamento reverso

// ---------------------------------------------------------------
// Enum como tipo
// ---------------------------------------------------------------
let current: Direction = Direction.Left;
console.log(current);

// current = 'CIMA'; // Erro: Type '"CIMA"' is not assignable to type 'Direction'.

// ---------------------------------------------------------------
// Valores calculados
// ---------------------------------------------------------------
enum Permission {
  Read = 1 << 0, // 1
  Write = 1 << 1, // 2
  Execute = 1 << 2, // 4
  All = Read | Write | Execute, // 7
}
console.log(Permission.All); // 7

let myPermission = Permission.Read | Permission.Write;
console.log((myPermission & Permission.Write) !== 0); // true

// ---------------------------------------------------------------
// Iterando sobre os valores do enum
// ---------------------------------------------------------------
for (const key of Object.keys(Direction)) {
  console.log(key, Direction[key as keyof typeof Direction]);
}

// ---------------------------------------------------------------
// const enum: removido na compilação (valores inseridos diretamente)
// ---------------------------------------------------------------
const enum Color {
  Red,
  Green,
  Blue,
}
console.log(Color.Green); // 1
