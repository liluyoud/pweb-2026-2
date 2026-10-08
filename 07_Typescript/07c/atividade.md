# Atividade: Tipos em TypeScript

São 10 exercícios baseados em situações do dia a dia. Cada um é um pouco mais difícil que o anterior. No final, você terá praticado todos os tipos vistos nesta unidade.

## Como fazer

1. Crie um arquivo por exercício: `ex01.ts`, `ex02.ts`, …, `ex10.ts`.
2. Comece cada arquivo com `export {};`, igual aos exemplos da aula.
3. Compile com a verificação estrita ligada:
   ```bash
   tsc --strict ex01.ts
   node ex01.js
   ```
4. **Não use `any`**, a não ser quando o enunciado pedir.
5. Quando o enunciado pedir para "provocar um erro", escreva a linha, confira a mensagem do compilador e depois **comente a linha**, colando a mensagem ao lado.

## Conteúdos por exercício

| Ex. | Tema do dia a dia | Conteúdos |
|----|----|----|
| 01 | Padaria | anotações, inferência, `number`, `string`, `boolean` |
| 02 | Cupom fiscal | template strings, métodos de `string`, conversões |
| 03 | Ficha de paciente | tipos de objeto, `?`, `readonly`, `object` × `Object` × `{}` |
| 04 | Lista de compras | arrays, `map`/`filter`/`reduce`, `readonly`, matrizes |
| 05 | Boletim do clima | tuplas, elementos opcionais e rest, tuplas nomeadas |
| 06 | App de delivery | `enum` numérico, `enum` de string, mapeamento reverso |
| 07 | Central de notificações | `void`, callbacks, `return` antecipado |
| 08 | Formulário de cadastro | union types, tipos literais, `null` |
| 09 | Resposta de uma API | `any` × `unknown`, estreitamento, `never` |
| 10 | Estacionamento (projeto integrador) | type aliases e **todos** os anteriores |

---

## Exercício 01: Caixa da padaria

**Contexto:** a padaria do bairro quer um programa simples para calcular o valor de uma venda.

**Tarefas:**

1. Declare com **anotação de tipo** explícita:
   - `nomeProduto1` (`string`) = `'Pão francês'`, `precoUnitario1` (`number`) = `0.75`, `quantidade1` (`number`) = `12`
   - `nomeProduto2` = `'Bolo de cenoura'`, `precoUnitario2` = `18.5`, `quantidade2` = `2`
2. Declare **sem anotação** a variável `aberta = true`. Passe o mouse sobre ela no VS Code e escreva num comentário qual tipo foi **inferido**.
3. Calcule `subtotal1`, `subtotal2` e `total`.
4. A padaria vendeu `1_250_000` pães no ano. Declare esse número usando **separadores numéricos**.
5. O sistema antigo guarda o código da categoria "Panificação" em hexadecimal: `0x1A`. Mostre o valor em decimal.
6. Provoque um erro: atribua `'doze'` a `quantidade1`.

**Saída esperada:**

```
Pão francês: 12 x R$ 0.75 = R$ 9.00
Bolo de cenoura: 2 x R$ 18.50 = R$ 37.00
Total: R$ 46.00
Padaria aberta? true
Pães vendidos no ano: 1250000
Categoria: 26
```

---

## Exercício 02: Cupom fiscal

**Contexto:** o caixa digita o nome do cliente de qualquer jeito, e o preço chega como texto vindo de um leitor de código de barras.

**Tarefas:**

1. Receba `nomeDigitado: string = '   maria   da silva  '`.
2. Crie a função `formatarNome(nome: string): string`, que:
   - remove os espaços nas pontas (`trim`) e os espaços duplicados (`split` + `filter` + `join`);
   - deixa a primeira letra de cada palavra maiúscula, exceto em "da", "de" e "do".
3. Converta `precoLido = '12.40'` para `number` com `Number()`, e `quantidadeLida = '3un'` com `parseInt()`.
4. Declare `clienteFidelidade: boolean = true`. Clientes fiéis ganham 5% de desconto.
5. Monte o cupom com **uma única template string de várias linhas**. Use `padStart` para que o número do cupom tenha 6 dígitos (`42` vira `000042`).

**Saída esperada:**

```
CUPOM Nº 000042
Cliente: Maria da Silva
Item: 3 x R$ 12.40
Subtotal: R$ 37.20
Desconto fidelidade: R$ 1.86
TOTAL: R$ 35.34
```

---

## Exercício 03: Ficha de paciente

**Contexto:** uma clínica precisa cadastrar pacientes. Alguns dados são obrigatórios, outros opcionais, e o CPF nunca pode mudar.

**Tarefas:**

1. Declare a variável `paciente` com um **tipo de objeto escrito diretamente na anotação**, sem usar `type` ou `interface`:
   - `cpf` (somente leitura), `nome`, `idade`, `plano` (`boolean`, indica se tem plano de saúde)
   - `alergias` (opcional, `string[]`)
   - `contatoEmergencia` (opcional), um objeto com `nome` e `telefone`
2. Crie dois pacientes: um com todos os campos e outro só com os obrigatórios.
3. Escreva a função `resumo(p: { nome: string; idade: number; alergias?: string[] }): string`, que mostra `"Sem alergias registradas"` quando `alergias` não existir.
4. Provoque dois erros e comente as linhas:
   - alterar o `cpf`;
   - adicionar uma propriedade `peso`, que não existe no tipo.
5. **Reflexão:** declare `let dados: object = paciente;` e tente acessar `dados.nome`. Explique num comentário por que isso dá erro. Explique também por que `let x: {} = 10;` é aceito e `let y: object = 10;` não é.

**Saída esperada (exemplo):**

```
Ana Souza, 34 anos. Alergias: dipirona, lactose
Carlos Lima, 61 anos. Sem alergias registradas
```

---

## Exercício 04: Lista de compras do mês

**Contexto:** uma família quer controlar a lista de compras do mês.

**Tarefas:**

1. Crie `itens: { nome: string; preco: number; quantidade: number }[]` com:

   | nome | preço | quantidade |
   |----|----|----|
   | Arroz 5kg | 28.90 | 1 |
   | Feijão 1kg | 8.49 | 2 |
   | Leite 1L | 4.99 | 6 |
   | Café 500g | 17.90 | 1 |
   | Sabão em pó | 12.50 | 1 |

2. Usando **somente** `map`, `filter` e `reduce` (sem `for`):
   - `nomes: string[]`, com os nomes de todos os itens;
   - `caros`, com os itens cujo preço unitário é maior que R$ 10,00;
   - `total: number`, com o valor total da compra.
3. Crie `categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza']` e tente usar `push`. Comente o erro.
4. A despensa tem 3 prateleiras. Represente a quantidade de itens em cada posição com uma **matriz** `number[][]`, por exemplo `[[2, 0, 1], [4, 4], [1]]`, e calcule o total de itens guardados.
5. Use **desestruturação** para pegar o primeiro e o segundo item da lista, e **spread** para criar uma nova lista com um item extra, sem alterar a original.

**Saída esperada:**

```
Itens: Arroz 5kg, Feijão 1kg, Leite 1L, Café 500g, Sabão em pó
Acima de R$ 10: Arroz 5kg, Café 500g, Sabão em pó
Total da compra: R$ 106.22
Itens na despensa: 12
```

---

## Exercício 05: Boletim do clima

**Contexto:** um site de notícias publica a temperatura de várias capitais e um resumo do dia.

**Tarefas:**

1. Represente cada leitura como a tupla **nomeada** `[cidade: string, temperatura: number]` e crie um array delas:
   `Porto Velho 34`, `Curitiba 12`, `Manaus 31`, `Porto Alegre 9`, `Natal 29`.
2. Crie `extremos(temps: number[]): [number, number]`, que devolve `[mínima, máxima]`. Use desestruturação para receber o resultado.
3. Percorra as leituras com `for (const [cidade, temp] of leituras)` e mostre cada uma.
4. Os contatos de imprensa usam a tupla `[nome: string, telefone: string, email?: string]`, com o e-mail **opcional**. Crie um contato com e-mail e outro sem.
5. O histórico semanal de uma cidade usa um elemento **rest**: `[string, ...number[]]` (cidade seguida de qualquer quantidade de temperaturas). Calcule a média.
6. Crie `const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];` e tente alterar uma posição. Comente o erro.

**Saída esperada:**

```
Porto Velho: 34°C
Curitiba: 12°C
Manaus: 31°C
Porto Alegre: 9°C
Natal: 29°C
Mínima: 9°C | Máxima: 34°C | Média: 23.0°C
```

---

## Exercício 06: Status do pedido no app de delivery

**Contexto:** um app de delivery mostra ao cliente em que etapa está o pedido.

**Tarefas:**

1. Crie um `enum` **numérico** `StatusPedido` com: `Recebido`, `EmPreparo`, `SaiuParaEntrega`, `Entregue`, `Cancelado`, começando em **1**.
2. Crie um `enum` **de string** `FormaPagamento` com os valores `'PIX'`, `'CARTAO'` e `'DINHEIRO'`.
3. Escreva `mensagem(status: StatusPedido): string` usando `switch`. Por exemplo, `EmPreparo` vira `"Seu pedido está sendo preparado 🍳"`.
4. Escreva `avancar(status: StatusPedido): StatusPedido`, que vai para a próxima etapa. Um pedido `Entregue` ou `Cancelado` não muda.
5. Use o **mapeamento reverso** para mostrar o nome da etapa a partir do número (`StatusPedido[2]` dá `'EmPreparo'`).
6. Simule um pedido do início ao fim com um laço que chama `avancar` até chegar em `Entregue`.
7. Tente atribuir a string `'PIX'` diretamente a uma variável do tipo `FormaPagamento`. Comente o erro e explique por quê.

**Saída esperada:**

```
[1 - Recebido] Recebemos seu pedido!
[2 - EmPreparo] Seu pedido está sendo preparado 🍳
[3 - SaiuParaEntrega] O entregador está a caminho 🛵
[4 - Entregue] Pedido entregue. Bom apetite!
Pagamento: PIX
```

---

## Exercício 07: Central de notificações

**Contexto:** um sistema escolar avisa os responsáveis por e-mail, SMS e notificação no app.

**Tarefas:**

1. Crie o tipo de função `type Notificador = (destinatario: string, mensagem: string) => void;`
2. Implemente três notificadores, `porEmail`, `porSms` e `porApp`. Cada um só mostra no console algo como `[SMS] para (69) 99999-0000: ...`.
3. Crie `notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void`, que usa `forEach`.
4. Em `porSms`, faça um `return` antecipado (vazio) quando a mensagem tiver mais de 160 caracteres, mostrando `"SMS ignorado: mensagem longa"`.
5. Tente escrever `function teste(): void { return 10; }`. Comente o erro.
6. **Reflexão:** um notificador que retorna um número, como `const contar: Notificador = (d, m) => m.length;`, é aceito. Explique num comentário por que o retorno é ignorado quando o tipo de função é `void`.

**Saída esperada (exemplo):**

```
[E-MAIL] para ana@escola.com: Reunião de pais sexta às 19h
[APP] para joao.resp: Reunião de pais sexta às 19h
SMS ignorado: mensagem longa
```

---

## Exercício 08: Formulário de cadastro

**Contexto:** uma loja on-line recebe dados de formulários que nem sempre chegam no mesmo formato.

**Tarefas:**

1. O código do cliente pode ser número (sistema novo) ou texto (sistema antigo, como `'CLI-0042'`). Declare `codigo: number | string` e crie `formatarCodigo(c: number | string): string`, que sempre devolve no formato `CLI-0042`. Use `typeof` para estreitar o tipo.
2. O tamanho da camiseta só pode ser `'P' | 'M' | 'G' | 'GG'`. Crie esse **tipo literal** e uma variável com ele. Tente atribuir `'XG'` e comente o erro.
3. Crie `calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number`, com os valores 25, 20, 18, 12 e 15.
4. O campo complemento do endereço é `string | null`. Mostre `"(sem complemento)"` quando ele for `null`.
5. Crie `limparTelefone(tel: string | number): string`, que devolve só os dígitos. `'(69) 99999-0000'` vira `'69999990000'`, e o número `69999990000` vira o mesmo texto.
6. **Inferência de literais:** explique num comentário por que `const r = 'sul'` pode ser passado para `calcularFrete`, mas `let r2 = 'sul'` não pode. Corrija o caso do `let` com `as const`.

**Saída esperada (exemplo):**

```
Cliente: CLI-0042 | Camiseta: M
Entrega: Rua das Flores, 100 - (sem complemento)
Frete para o sul: R$ 15.00
Telefone: 69999990000
```

---

## Exercício 09: Lendo a resposta de uma API de clima

**Contexto:** o app recebe dados de uma API externa em formato JSON. Não dá para confiar que eles chegam no formato certo.

Use estas respostas simuladas:

```ts
const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';
```

**Tarefas:**

1. **Versão com `any` (para ver o problema):** escreva `lerComAny(json: string)` usando `JSON.parse` com o tipo `any` e mostre `dados.temperatura.toFixed(1)`. Rode com `respostaQuebrada` e anote num comentário o erro que **só aparece na execução**.
2. **Versão segura com `unknown`:** escreva `lerClima(json: string)`, que:
   - guarda o resultado de `JSON.parse` numa variável `unknown`;
   - verifica com `typeof`, `!== null` e `in` se o objeto tem `cidade` (string) e `temperatura` (number);
   - devolve `{ cidade: string; temperatura: number }` quando os dados forem válidos.
3. Crie `falhar(mensagem: string): never`, que lança um `Error`. Use essa função em `lerClima` quando os dados forem inválidos.
4. Envolva as chamadas em `try/catch` usando `catch (erro: unknown)` e verifique `erro instanceof Error` antes de ler `erro.message`.
5. Teste as três respostas.

**Saída esperada:**

```
Porto Velho: 34.0°C
Erro: campo "temperatura" inválido
Erro: JSON malformado
```

> **Dica:** `JSON.parse` lança um `SyntaxError` para JSON malformado. Capture esse erro e use `falhar('JSON malformado')`.

---

## Exercício 10: Sistema de estacionamento (projeto integrador)

**Contexto:** um shopping precisa de um sistema para controlar a entrada e a saída de veículos e cobrar a tarifa correta. Este exercício usa **todos** os tipos estudados.

### Regras de negócio

| Veículo | 1ª hora | Hora adicional |
|----|----|----|
| Carro | R$ 8,00 | R$ 5,00 |
| Moto | R$ 4,00 | R$ 2,00 |
| Caminhão | R$ 15,00 | R$ 10,00 |

- Todo veículo paga pelo menos 1 hora.
- Clientes com selo do shopping têm **50% de desconto** no valor final.

### Tarefas

1. **Type aliases e literais:**
   ```ts
   type Placa = string;
   type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]
   ```
2. **União discriminada:** crie os tipos `Carro`, `Moto` e `Caminhao`. Todos têm `readonly placa: Placa` e o campo literal `tipo: 'carro' | 'moto' | 'caminhao'`. Além disso:
   - `Carro` tem `portas: 2 | 4`;
   - `Moto` tem `cilindradas: number`;
   - `Caminhao` tem `eixos: number`.

   Depois crie `type Veiculo = Carro | Moto | Caminhao;`
3. **Enum:** crie `enum SituacaoTicket { Aberto = 'ABERTO', Pago = 'PAGO' }`.
4. **Objeto do ticket:** `type Ticket = { veiculo: Veiculo; periodo: Periodo; selo: boolean; situacao: SituacaoTicket; valor?: number }`.
5. **`calcularTarifa(v: Veiculo, horas: number): number`**, com um `switch (v.tipo)` e uma **verificação exaustiva** no `default`:
   ```ts
   default: {
     const _naoTratado: never = v;
     return _naoTratado;
   }
   ```
   Depois de terminar, acrescente um tipo `Van` à união, **sem** tratá-lo no `switch`. Veja o erro aparecer e comente o que o `never` garantiu.
6. **`fecharTicket(t: Ticket): Ticket`**, que calcula as horas (`saida - entrada`, mínimo 1), aplica o desconto do selo, preenche `valor` e muda `situacao` para `Pago`. Devolva um **novo objeto** com spread, sem alterar o original.
7. **`registrar(msg: string): void`**, que mostra no console cada ticket fechado.
8. **Entrada externa com `unknown`:** os veículos chegam da cancela como JSON. Crie `lerVeiculo(json: string): Veiculo`, que valida os dados com estreitamento e usa uma função `never` para os erros, como no exercício 09.
9. **Relatório:** dado um array de tickets, use `map`, `filter` e `reduce` para mostrar:
   - cada ticket fechado;
   - o faturamento total;
   - quantos veículos de cada tipo entraram (o resultado pode ser um objeto `{ carro: number; moto: number; caminhao: number }`).

### Dados de teste

| Placa | Tipo | Período | Selo |
|----|----|----|----|
| ABC1D23 | carro (4 portas) | [8, 11] | não |
| MOT0A12 | moto (160 cc) | [9, 10] | não |
| CAM9Z99 | caminhão (3 eixos) | [7, 12] | não |
| XYZ4E56 | carro (2 portas) | [14, 16] | sim |

### Saída esperada

```
[PAGO] ABC1D23 (carro) - 3h - R$ 18.00
[PAGO] MOT0A12 (moto) - 1h - R$ 4.00
[PAGO] CAM9Z99 (caminhao) - 5h - R$ 55.00
[PAGO] XYZ4E56 (carro) - 2h - R$ 6.50 (selo -50%)
Faturamento: R$ 83.50
Entradas: carro=2, moto=1, caminhao=1
Erro ao ler veículo: tipo "bicicleta" desconhecido
```

---

## Critérios de avaliação

| Critério | Peso |
|----|----|
| O código compila com `tsc --strict` sem erros | 30% |
| Os tipos estão corretos e são específicos (sem `any` desnecessário) | 25% |
| A saída confere com a esperada | 20% |
| Os erros provocados estão comentados e as reflexões foram respondidas | 15% |
| Organização e legibilidade (nomes claros, seções comentadas) | 10% |
