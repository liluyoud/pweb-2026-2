# Atividade: Estruturas de controle e funções em TypeScript

São 5 exercícios baseados em situações do mundo real. Em cada um, você vai escrever um programa em **TypeScript**, transformá-lo em **JavaScript** e usar esse JavaScript numa **página HTML** que o usuário pode abrir no navegador.

No final, você vai publicar tudo no **GitHub** e enviar o link pelo Canvas.

> 📅 **Entrega:** até **29/10/2026 (quinta-feira)**
> 📤 **O que enviar:** o link do seu repositório no GitHub, pela atividade do Canvas

## Conteúdos por exercício

| Ex. | Situação | Conteúdos |
|----|----|----|
| 01 | Situação do aluno no semestre | `if`, `else if`, `else`, operadores lógicos, ternário, funções |
| 02 | Conta de luz | `switch` (com cases agrupados), parâmetro padrão, tipos literais |
| 03 | Simulador de parcelamento | `for`, `break`, `continue`, parâmetro opcional |
| 04 | Meta de economia | `while`, `break`, tipo de função, parâmetro padrão |
| 05 | Caixa do mercado (integrador) | parâmetros rest, sobrecarga de funções e **todos** os anteriores |

## Sumário

- [Parte 1: Preparando o ambiente](#parte-1-preparando-o-ambiente)
- [Parte 2: Criando o projeto no VS Code](#parte-2-criando-o-projeto-no-vs-code)
- [Parte 3: Transformando TypeScript em JavaScript](#parte-3-transformando-typescript-em-javascript)
- [Parte 4: Rodando a página no navegador](#parte-4-rodando-a-página-no-navegador)
- [Parte 5: Depurando o código](#parte-5-depurando-o-código)
- [Parte 6: Os exercícios](#parte-6-os-exercícios)
- [Parte 7: Publicando no GitHub](#parte-7-publicando-no-github)
- [Parte 8: Entregando no Canvas](#parte-8-entregando-no-canvas)

---

## Parte 1: Preparando o ambiente

Você vai precisar de 4 programas: **Node.js**, **TypeScript**, **VS Code** e **Git**. Se algum já estiver instalado, pule o passo dele e só faça a verificação.

### 1.1 Instalar o Node.js

O TypeScript é instalado pelo **npm**, o gerenciador de pacotes que vem junto com o Node.js.

1. Acesse <https://nodejs.org> e baixe a versão **LTS**.
2. Instale com as opções padrão (Avançar, Avançar, Concluir).
3. Abra um terminal novo e confira:
   ```bash
   node -v
   npm -v
   ```
   Os dois comandos devem mostrar um número de versão, como `v24.11.0` e `11.6.2`.

> 💡 No Windows, o terminal pode ser o **PowerShell** ou o **Prompt de Comando**. Se você já estava com um terminal aberto antes de instalar, **feche e abra de novo**.

### 1.2 Instalar o TypeScript

1. No terminal, rode:
   ```bash
   npm install -g typescript
   ```
   O `-g` instala o TypeScript de forma **global**, para que o comando `tsc` funcione em qualquer pasta.
2. Confira:
   ```bash
   tsc -v
   ```
   Deve aparecer algo como `Version 7.0.2`.

> ⚠️ **Erro comum no Windows:** se aparecer a mensagem *"tsc.ps1 não pode ser carregado porque a execução de scripts foi desabilitada neste sistema"*, rode este comando **uma vez** no PowerShell e tente de novo:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

### 1.3 Instalar o VS Code e as extensões

1. Baixe e instale o VS Code em <https://code.visualstudio.com>.
   - No Windows, durante a instalação, marque as opções **"Adicionar a ação 'Abrir com Code'"** e **"Adicionar ao PATH"**.
2. Abra o VS Code, clique no ícone de **Extensões** na barra lateral (ou `Ctrl+Shift+X`) e instale:
   - **Live Server** (autor: Ritwick Dey): abre a página HTML num servidor local e recarrega sozinha quando você salva.

> 💡 O VS Code já vem com suporte a TypeScript e com o depurador de navegador. Não é preciso instalar mais nada para isso.

### 1.4 Instalar o Git

1. Baixe e instale o Git em <https://git-scm.com>, com as opções padrão.
2. Confira num terminal novo:
   ```bash
   git --version
   ```

---

## Parte 2: Criando o projeto no VS Code

### 2.1 Criar e abrir a pasta

1. Crie uma pasta chamada **`pweb-ts-estruturas`** num lugar fácil de achar, como `Documentos`.
2. Abra essa pasta no VS Code de uma das formas:
   - No VS Code: **Arquivo → Abrir Pasta...** (`File → Open Folder...`) e escolha a pasta; ou
   - No Windows Explorer: clique com o botão direito na pasta → **Abrir com Code**; ou
   - Num terminal, dentro da pasta: `code .`
3. Se o VS Code perguntar *"Você confia nos autores dos arquivos desta pasta?"*, clique em **Sim, confio**.
4. Abra o **terminal integrado**: menu **Terminal → Novo Terminal** (ou `` Ctrl+` ``). Ele já abre dentro da pasta do projeto.

### 2.2 Estrutura do projeto

No final da atividade, o projeto deve ficar assim:

```
pweb-ts-estruturas/
├── .vscode/
│   └── launch.json      ← configuração do depurador (Parte 5)
├── ex01/
│   ├── index.html       ← página do exercício
│   ├── ex01.ts          ← o código que VOCÊ escreve
│   ├── ex01.js          ← gerado pelo tsc (não edite!)
│   └── ex01.js.map      ← gerado pelo tsc (usado na depuração)
├── ex02/ ...
├── ex03/ ...
├── ex04/ ...
├── ex05/ ...
├── index.html           ← página inicial com links para os exercícios
├── style.css            ← estilo compartilhado por todas as páginas
├── tsconfig.json        ← configuração do TypeScript
└── README.md            ← seu nome e os links da atividade
```

Para criar uma pasta ou um arquivo, use os ícones que aparecem ao passar o mouse sobre o nome do projeto, no **Explorador** do VS Code (`Ctrl+Shift+E`).

### 2.3 Criar o `tsconfig.json`

O `tsconfig.json` diz ao compilador **como** transformar o TypeScript em JavaScript. Crie esse arquivo na raiz do projeto com o conteúdo:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleDetection": "force",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "sourceMap": true
  },
  "include": ["**/*.ts"]
}
```

O que cada opção faz:

| Opção | Para que serve |
|----|----|
| `target` | Versão do JavaScript gerado. O ES2020 roda em qualquer navegador atual. |
| `module` e `moduleDetection` | Tratam cada arquivo `.ts` como um **módulo** separado. Assim, uma função `formatar()` no ex01 não entra em conflito com outra `formatar()` no ex04. |
| `lib` | Inclui os tipos do **DOM** (`document`, `HTMLInputElement`...), para usar o TypeScript numa página web. |
| `strict` | Liga todas as verificações de tipo. **Obrigatório nesta atividade.** |
| `sourceMap` | Gera os arquivos `.js.map`, que permitem **depurar o `.ts`** em vez do `.js`. |
| `include` | Compila todos os `.ts` de todas as pastas do projeto. |

### 2.4 Criar o `style.css` e o `index.html` da raiz

Esses dois arquivos são compartilhados por todos os exercícios. Copie-os como estão.

**`style.css`**

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
  line-height: 1.5;
}

label {
  display: block;
  margin-top: 0.75rem;
  font-weight: 600;
}

input,
select,
textarea,
button {
  font: inherit;
  padding: 0.4rem 0.6rem;
  margin-top: 0.25rem;
}

button {
  margin-top: 1rem;
  cursor: pointer;
}

#resultado {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f1f3f5;
  white-space: pre-line;
}

.sucesso { background: #d3f9d8 !important; }
.alerta  { background: #fff3bf !important; }
.erro    { background: #ffe3e3 !important; }

table { border-collapse: collapse; margin-top: 1rem; }
th, td { border: 1px solid #ccc; padding: 0.3rem 0.8rem; text-align: right; }
```

**`index.html`** (troque `Seu Nome` pelo seu nome)

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atividade: Estruturas em TypeScript</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Estruturas em TypeScript</h1>
  <p>Aluno(a): Seu Nome</p>
  <ul>
    <li><a href="ex01/index.html">Ex. 01: Situação do aluno</a></li>
    <li><a href="ex02/index.html">Ex. 02: Conta de luz</a></li>
    <li><a href="ex03/index.html">Ex. 03: Simulador de parcelamento</a></li>
    <li><a href="ex04/index.html">Ex. 04: Meta de economia</a></li>
    <li><a href="ex05/index.html">Ex. 05: Caixa do mercado</a></li>
  </ul>
</body>
</html>
```

---

## Parte 3: Transformando TypeScript em JavaScript

O navegador **não entende TypeScript**, só JavaScript. O compilador `tsc` faz duas coisas:

1. **verifica os tipos** e mostra os erros;
2. **gera o arquivo `.js`** correspondente, removendo os tipos.

### 3.1 Compilar uma vez

No terminal integrado, na raiz do projeto, rode:

```bash
tsc
```

Sem nenhum argumento, o `tsc` lê o `tsconfig.json` e compila **todos** os `.ts` do projeto. Depois disso, aparece um `.js` e um `.js.map` ao lado de cada `.ts`.

> ⚠️ Não rode `tsc ex01.ts` (com o nome do arquivo). Quando você informa um arquivo, o `tsc` **ignora o `tsconfig.json`** e usa as configurações padrão.

### 3.2 Compilar automaticamente (modo watch)

É mais prático deixar o compilador observando os arquivos:

```bash
tsc --watch
```

A cada vez que você salvar um `.ts`, ele recompila sozinho e mostra:

```
Found 0 errors. Watching for file changes.
```

Deixe esse terminal aberto enquanto trabalha. Para parar, pressione `Ctrl+C`. Para usar outro terminal ao mesmo tempo, clique no **+** do painel de terminais.

### 3.3 Entendendo os erros

Se houver um erro de tipo, o `tsc` mostra o arquivo, a linha, a coluna e a mensagem:

```
ex01/ex01.ts:12:7 - error TS2322: Type 'string' is not assignable to type 'number'.
```

O VS Code também sublinha o erro em vermelho e o lista no painel **Problemas** (`Ctrl+Shift+M`).

> ⚠️ Por padrão, o `tsc` **gera o `.js` mesmo com erros**. Não se engane: a atividade só é considerada correta se compilar com **0 erros**.

### 3.4 Ligando o TypeScript ao HTML

Cada página HTML carrega o **`.js`** gerado (nunca o `.ts`):

```html
<script type="module" src="ex01.js"></script>
```

O `type="module"` é necessário porque o `tsconfig.json` trata cada arquivo como módulo.

Para ler e escrever na página, use `document.getElementById` com uma **asserção de tipo** (`as`), que informa ao TypeScript qual é o tipo do elemento:

```ts
const campoNome = document.getElementById('nome') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', () => {
  const nome = campoNome.value;   // .value sempre é string
  saida.textContent = `Olá, ${nome}!`;
});
```

| Elemento HTML | Tipo no TypeScript | Como ler o valor |
|----|----|----|
| `<input type="text">` | `HTMLInputElement` | `campo.value` (string) |
| `<input type="number">` | `HTMLInputElement` | `Number(campo.value)` ou `campo.valueAsNumber` |
| `<input type="checkbox">` | `HTMLInputElement` | `campo.checked` (boolean) |
| `<select>` | `HTMLSelectElement` | `campo.value` (string) |
| `<textarea>` | `HTMLTextAreaElement` | `campo.value` (string) |
| `<button>` | `HTMLButtonElement` | (use `addEventListener('click', ...)`) |
| `<div>`, `<p>`... | `HTMLElement` | `textContent`, `innerHTML`, `className` |

> ⚠️ **Não use `onclick="..."` no HTML.** Como o código é um módulo, as funções dele não ficam visíveis para o HTML. Use sempre `addEventListener` no `.ts`.

> 💡 **Separe a lógica da página.** Escreva as regras do exercício (cálculos e decisões) em funções que recebem e devolvem valores, sem tocar no `document`. Deixe para o evento do botão só a leitura dos campos, a chamada dessas funções e a exibição do resultado. Assim, fica fácil testar as funções no console.

---

## Parte 4: Rodando a página no navegador

1. Deixe o `tsc --watch` rodando (Parte 3.2).
2. No Explorador do VS Code, clique com o botão direito no `index.html` da raiz → **Open with Live Server**. Outra opção é clicar em **Go Live**, no canto inferior direito.
3. O navegador abre em `http://127.0.0.1:5500/index.html`. Clique no link do exercício.
4. Ao salvar um `.ts`, o `tsc` gera o novo `.js` e o Live Server **recarrega a página sozinho**.

> ⚠️ **Não abra o HTML com dois cliques** (endereço `file:///...`). Páginas com `type="module"` não funcionam assim. Use sempre o Live Server.

> 💡 Para ver os `console.log` e os erros de execução, abra as **Ferramentas do Desenvolvedor** do navegador com `F12` e vá na aba **Console**.

---

## Parte 5: Depurando o código

Depurar é **pausar** o programa numa linha e executá-lo **passo a passo**, olhando o valor das variáveis. Graças aos arquivos `.js.map`, você pausa e avança **direto no `.ts`**.

### 5.1 Configurar o depurador do VS Code

1. Crie a pasta `.vscode` na raiz do projeto (com o ponto no início) e, dentro dela, o arquivo `launch.json`:

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "chrome",
         "request": "launch",
         "name": "Depurar exercício",
         "url": "http://127.0.0.1:5500/ex01/index.html",
         "webRoot": "${workspaceFolder}"
       }
     ]
   }
   ```

2. Se você usa o **Edge** em vez do Chrome, troque `"chrome"` por `"msedge"`.
3. Para depurar outro exercício, troque `ex01` na `url` pelo exercício desejado.

### 5.2 Depurar passo a passo

1. Confira se o `tsc --watch` e o **Live Server** estão rodando.
2. Abra o `ex01.ts` e clique **à esquerda do número de uma linha** dentro da função do botão. Aparece uma bolinha vermelha, que é o **ponto de interrupção** (*breakpoint*).
3. Pressione **`F5`** (ou vá no ícone **Executar e Depurar**, `Ctrl+Shift+D`, e clique em ▶ **Depurar exercício**). Uma janela nova do navegador se abre.
4. Preencha os campos e clique no botão. O VS Code **pausa na linha marcada**.
5. Agora você pode:

| Tecla | Ação |
|----|----|
| `F10` | Executa a linha atual e vai para a próxima (*step over*) |
| `F11` | Entra na função chamada na linha atual (*step into*) |
| `Shift+F11` | Sai da função atual (*step out*) |
| `F5` | Continua até o próximo breakpoint |
| `Shift+F5` | Para a depuração |

6. Enquanto o programa está pausado:
   - passe o mouse sobre uma variável para ver o valor dela;
   - veja todas as variáveis no painel **Variáveis**, à esquerda;
   - adicione expressões no painel **Inspecionar** (*Watch*), como `media >= 7`;
   - digite expressões no **Console de Depuração**.

### 5.3 Alternativa: depurar no próprio navegador

1. Abra a página pelo Live Server e pressione `F12`.
2. Vá na aba **Sources** (Fontes) e procure o arquivo **`ex01.ts`** na lista à esquerda.
3. Clique no número de uma linha para criar o breakpoint, e use os botões de passo no painel à direita.

> 💡 Você também pode escrever a instrução `debugger;` numa linha do `.ts`. Com as ferramentas do desenvolvedor abertas, o navegador pausa ali. **Remova essa linha antes de entregar.**

---

## Parte 6: Os exercícios

### Regras gerais

1. Cada exercício fica na sua pasta (`ex01/`, `ex02/`...), com `index.html` e `exNN.ts`.
2. O HTML de cada exercício é dado abaixo. **Copie-o como está**, porque o seu código depende dos `id`s dos elementos. Só troque `Seu Nome` pelo seu nome.
3. O projeto deve compilar com **0 erros** (`tsc`).
4. **Não use `any`.**
5. Todas as funções devem ter os **tipos dos parâmetros e do retorno anotados**.
6. Mostre os valores em reais com duas casas decimais: `` `R$ ${valor.toFixed(2)}` ``.
7. Teste cada exercício com **todos os casos da tabela "Casos de teste"**.

---

### Exercício 01: Situação do aluno no semestre

**Contexto:** a coordenação quer uma página onde o aluno digita as notas e a frequência e descobre na hora a sua situação no semestre.

**Regras de negócio:**

- As notas `n1` e `n2` vão de 0 a 10, e a frequência vai de 0 a 100 (%). Fora disso, os dados são **inválidos**.
- A média é `(n1 + n2) / 2`.
- Frequência abaixo de 75% → **Reprovado por falta**, qualquer que seja a média.
- Média maior ou igual a 7 → **Aprovado**.
- Média maior ou igual a 4 → **Exame final**. Mostre quanto o aluno precisa tirar no exame: `10 - media`.
- Média abaixo de 4 → **Reprovado por nota**.

**Tarefas:**

1. Crie `calcularMedia(n1: number, n2: number): number`.
2. Crie `dadosValidos(n1: number, n2: number, frequencia: number): boolean`. Use os operadores `||` ou `&&` numa única condição.
3. Crie `situacao(media: number, frequencia: number): string` usando `if`, `else if` e `else`. A ordem das condições importa: **pense em qual regra deve ser testada primeiro**.
4. No clique do botão:
   - se os dados forem inválidos, mostre `Dados inválidos` e **saia da função** com `return` (retorno antecipado);
   - caso contrário, mostre o nome, a média com uma casa decimal e a situação.
5. Use o **operador ternário** para escolher a classe CSS do resultado: `'sucesso'` se aprovado, `'erro'` nos outros casos.

**`ex01/index.html`**

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ex. 01: Situação do aluno</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <h1>Situação do aluno</h1>
  <p><a href="../index.html">← Voltar</a> · Seu Nome</p>

  <label for="nome">Nome do aluno</label>
  <input type="text" id="nome">

  <label for="n1">Nota 1 (0 a 10)</label>
  <input type="number" id="n1" step="0.1">

  <label for="n2">Nota 2 (0 a 10)</label>
  <input type="number" id="n2" step="0.1">

  <label for="frequencia">Frequência (%)</label>
  <input type="number" id="frequencia">

  <button id="calcular">Ver situação</button>

  <div id="resultado"></div>

  <script type="module" src="ex01.js"></script>
</body>
</html>
```

**Casos de teste:**

| Nome | N1 | N2 | Frequência | Resultado esperado |
|----|----|----|----|----|
| Ana | 8 | 7 | 90 | Ana: média 7.5. Aprovado |
| Bruno | 5 | 6 | 80 | Bruno: média 5.5. Exame final (precisa tirar 4.5) |
| Carla | 9 | 10 | 70 | Carla: média 9.5. Reprovado por falta |
| Diego | 2 | 3 | 95 | Diego: média 2.5. Reprovado por nota |
| Eva | 11 | 5 | 80 | Dados inválidos |

---

### Exercício 02: Conta de luz

**Contexto:** a distribuidora de energia quer que o cliente simule o valor da conta de acordo com o consumo, o tipo de cliente e a **bandeira tarifária** do mês. *(Os valores abaixo são fictícios.)*

**Regras de negócio:**

| Tipo de cliente | Tarifa por kWh |
|----|----|
| Residencial ou Rural | R$ 0,80 |
| Comercial ou Industrial | R$ 0,95 |

| Bandeira | Adicional por kWh | Mensagem |
|----|----|----|
| Verde | R$ 0,00 | Condições favoráveis de geração de energia. |
| Amarela | R$ 0,02 | Condições de geração menos favoráveis. |
| Vermelha patamar 1 | R$ 0,04 | Condições mais caras de geração. Economize! |
| Vermelha patamar 2 | R$ 0,08 | Condições mais caras de geração. Economize! |

**Tarefas:**

1. Crie os tipos literais:
   ```ts
   type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
   type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';
   ```
2. Crie `tarifaPorKwh(tipo: TipoCliente): number` com um `switch` que **agrupa** os cases (dois `case` seguidos para o mesmo bloco, sem `break` entre eles).
3. Crie `adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number` com um `switch`. O parâmetro `bandeira` tem **valor padrão**.
4. Crie `mensagemBandeira(bandeira: Bandeira): string` com um `switch` que agrupa as duas bandeiras vermelhas. Inclua um `default`.
5. No clique do botão, leia os `<select>` e converta com `as TipoCliente` e `as Bandeira`. Mostre o valor da energia, o adicional da bandeira, o total e a mensagem.
6. Se o consumo for menor ou igual a zero, mostre `Informe um consumo válido` e saia da função.
7. Use a classe `'alerta'` no resultado quando a bandeira **não** for verde.
8. **Teste do parâmetro padrão:** num `console.log`, chame `adicionalBandeira(100)` sem a bandeira e anote num comentário o resultado e o motivo.

**`ex02/index.html`**

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ex. 02: Conta de luz</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <h1>Simulador de conta de luz</h1>
  <p><a href="../index.html">← Voltar</a> · Seu Nome</p>

  <label for="consumo">Consumo do mês (kWh)</label>
  <input type="number" id="consumo">

  <label for="tipo">Tipo de cliente</label>
  <select id="tipo">
    <option value="residencial">Residencial</option>
    <option value="rural">Rural</option>
    <option value="comercial">Comercial</option>
    <option value="industrial">Industrial</option>
  </select>

  <label for="bandeira">Bandeira tarifária</label>
  <select id="bandeira">
    <option value="verde">Verde</option>
    <option value="amarela">Amarela</option>
    <option value="vermelha1">Vermelha (patamar 1)</option>
    <option value="vermelha2">Vermelha (patamar 2)</option>
  </select>

  <button id="calcular">Calcular conta</button>

  <div id="resultado"></div>

  <script type="module" src="ex02.js"></script>
</body>
</html>
```

**Casos de teste:**

| Consumo | Tipo | Bandeira | Energia | Bandeira | Total |
|----|----|----|----|----|----|
| 200 | Residencial | Amarela | R$ 160.00 | R$ 4.00 | R$ 164.00 |
| 500 | Comercial | Vermelha 2 | R$ 475.00 | R$ 40.00 | R$ 515.00 |
| 150 | Rural | Verde | R$ 120.00 | R$ 0.00 | R$ 120.00 |
| 0 | qualquer | qualquer | Informe um consumo válido | | |

**Exemplo de saída (1º caso):**

```
Energia: R$ 160.00
Bandeira amarela: R$ 4.00
Total: R$ 164.00
Condições de geração menos favoráveis.
```

---

### Exercício 03: Simulador de parcelamento

**Contexto:** uma loja de eletrônicos quer mostrar ao cliente, na página do produto, todas as opções de parcelamento.

**Regras de negócio:**

- O cliente pode dar uma **entrada** (campo opcional). O valor financiado é `preço - entrada`.
- A loja oferece de 1 a 12 parcelas, mas **não oferece 7, 8, 9 e 11 parcelas**.
- Até 3 parcelas, **sem juros**.
- A partir de 4 parcelas, juros compostos de **2% ao mês**: `total = financiado * 1.02 ** parcelas`.
- A parcela mínima é de **R$ 50,00**. Quando a parcela ficar abaixo disso, as opções acabam.

**Tarefas:**

1. Crie `calcularTotal(valor: number, parcelas: number): number`, que aplica ou não os juros.
2. Crie `simularParcelamento(preco: number, entrada?: number): string`. A função recebe a **entrada como parâmetro opcional** e devolve as linhas `<tr>...</tr>` da tabela. Dentro dela:
   - verifique se a entrada foi informada com `typeof entrada !== 'undefined'`;
   - use um laço **`for`** de 1 a 12;
   - use **`continue`** para pular as quantidades de parcelas que a loja não oferece;
   - use **`break`** para encerrar o laço quando a parcela ficar abaixo de R$ 50,00.
3. No clique do botão:
   - se o campo de entrada estiver **vazio**, chame `simularParcelamento(preco)` **sem** o segundo argumento;
   - se a entrada for maior ou igual ao preço, mostre `A entrada cobre o valor total. Não há parcelas.`;
   - caso contrário, mostre o valor financiado e preencha o `<tbody id="parcelas">` usando `innerHTML`.

**`ex03/index.html`**

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ex. 03: Simulador de parcelamento</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <h1>Simulador de parcelamento</h1>
  <p><a href="../index.html">← Voltar</a> · Seu Nome</p>

  <label for="preco">Preço do produto (R$)</label>
  <input type="number" id="preco" step="0.01">

  <label for="entrada">Entrada (R$, opcional)</label>
  <input type="number" id="entrada" step="0.01">

  <button id="simular">Simular</button>

  <div id="resultado"></div>

  <table>
    <thead>
      <tr><th>Parcelas</th><th>Valor da parcela</th><th>Total</th><th>Juros</th></tr>
    </thead>
    <tbody id="parcelas"></tbody>
  </table>

  <script type="module" src="ex03.js"></script>
</body>
</html>
```

**Casos de teste:**

Preço **R$ 1200,00**, sem entrada (valor financiado: R$ 1200.00):

| Parcelas | Valor da parcela | Total | Juros |
|----|----|----|----|
| 1x | R$ 1200.00 | R$ 1200.00 | sem juros |
| 2x | R$ 600.00 | R$ 1200.00 | sem juros |
| 3x | R$ 400.00 | R$ 1200.00 | sem juros |
| 4x | R$ 324.73 | R$ 1298.92 | 2% a.m. |
| 5x | R$ 264.98 | R$ 1324.90 | 2% a.m. |
| 6x | R$ 225.23 | R$ 1351.39 | 2% a.m. |
| 10x | R$ 146.28 | R$ 1462.79 | 2% a.m. |
| 12x | R$ 126.82 | R$ 1521.89 | 2% a.m. |

Preço **R$ 300,00** com entrada de **R$ 100,00** (valor financiado: R$ 200.00). O laço para no 5x porque a parcela seria de R$ 44.16:

| Parcelas | Valor da parcela | Total | Juros |
|----|----|----|----|
| 1x | R$ 200.00 | R$ 200.00 | sem juros |
| 2x | R$ 100.00 | R$ 200.00 | sem juros |
| 3x | R$ 66.67 | R$ 200.00 | sem juros |
| 4x | R$ 54.12 | R$ 216.49 | 2% a.m. |

Preço **R$ 500,00** com entrada de **R$ 500,00**: `A entrada cobre o valor total. Não há parcelas.`

---

### Exercício 04: Meta de economia

**Contexto:** um banco digital quer uma calculadora que diga ao cliente **em quanto tempo** ele junta o dinheiro de um objetivo, como uma viagem ou a entrada de um carro.

**Regras de negócio:**

- O cliente começa com saldo zero e informa a **meta**, o **depósito mensal** e o **rendimento ao mês** (%). Se o rendimento ficar em branco, use **0,5%**.
- A cada mês, primeiro o saldo rende e depois entra o depósito: `saldo = saldo * (1 + taxa / 100) + deposito`.
- Em todo **mês 12, 24, 36...** (dezembro), o cliente recebe o 13º salário e deposita **o dobro** (um depósito extra).
- Se a meta não for atingida em **600 meses** (50 anos), o cálculo para e a meta é considerada inalcançável.

**Tarefas:**

1. Crie o **tipo de função** e duas funções que seguem esse tipo:
   ```ts
   type Formatador = (valor: number) => string;
   ```
   - `formatarReal: Formatador`, que devolve `R$ 1234.50`;
   - `formatarMeses: (meses: number) => string`, que devolve `1 ano e 7 meses`, `2 anos e 1 mês`, `8 meses` etc. Use o **ternário** para o singular e o plural.
2. Crie `calcularMeses(meta: number, deposito: number, taxa: number = 0.5): number`, com **parâmetro padrão** para a taxa. Use um laço **`while (saldo < meta)`** e um **`break`** quando chegar a 600 meses.
3. Para mostrar também o saldo final, o total depositado e o rendimento, você pode fazer a função devolver um objeto, como `{ meses: number; saldo: number; depositado: number }`.
4. Crie `exibirValor(rotulo: string, valor: number, formatar: Formatador): string`, que recebe a função de formatação como **parâmetro**. Use essa função para montar todas as linhas de valores do resultado.
5. No clique do botão:
   - se a meta ou o depósito forem menores ou iguais a zero, mostre `Informe valores positivos` e saia da função;
   - se o campo de rendimento estiver vazio, chame `calcularMeses` **sem** o terceiro argumento;
   - use a classe `'sucesso'` quando a meta for atingida e `'erro'` quando for inalcançável.

**`ex04/index.html`**

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ex. 04: Meta de economia</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <h1>Meta de economia</h1>
  <p><a href="../index.html">← Voltar</a> · Seu Nome</p>

  <label for="meta">Quanto você quer juntar? (R$)</label>
  <input type="number" id="meta" step="0.01">

  <label for="deposito">Quanto vai guardar por mês? (R$)</label>
  <input type="number" id="deposito" step="0.01">

  <label for="taxa">Rendimento ao mês (%, opcional, padrão 0,5)</label>
  <input type="number" id="taxa" step="0.01">

  <button id="calcular">Calcular</button>

  <div id="resultado"></div>

  <script type="module" src="ex04.js"></script>
</body>
</html>
```

**Casos de teste:**

| Meta | Depósito | Rendimento | Resultado esperado |
|----|----|----|----|
| 10000 | 500 | (vazio) | 19 meses (1 ano e 7 meses). Saldo: R$ 10457.62. Depositado: R$ 10000.00. Rendimento: R$ 457.62 |
| 5000 | 300 | 0 | 16 meses (1 ano e 4 meses). Saldo: R$ 5100.00. Depositado: R$ 5100.00. Rendimento: R$ 0.00 |
| 1000000 | 10 | 0 | Meta inalcançável em 50 anos. Saldo após 600 meses: R$ 6500.00 |
| 0 | 100 | 1 | Informe valores positivos |

**Exemplo de saída (1º caso):**

```
Você atinge a meta em 19 meses (1 ano e 7 meses).
Saldo final: R$ 10457.62
Total depositado: R$ 10000.00
Rendimento: R$ 457.62
```

---

### Exercício 05: Caixa do mercado (projeto integrador)

**Contexto:** um mercado de bairro quer uma página de caixa. O operador digita os preços dos produtos, um por linha, informa o cupom de desconto e diz se o cliente participa do clube de fidelidade. Este exercício usa **todos** os conteúdos da unidade.

**Regras de negócio:**

- Cada linha da caixa de texto é o preço de um item. O preço pode usar ponto ou vírgula (`12.50` ou `12,50`).
- Linhas **vazias** são ignoradas. Linhas **inválidas** (que não são número, ou têm valor ≤ 0) também são ignoradas, mas devem ser contadas e mostradas no resultado.
- No máximo **20 itens** por compra. Ao chegar a 20, os itens seguintes são desconsiderados.
- Cupons (o operador pode digitar em minúsculas):

  | Cupom | Desconto |
  |----|----|
  | `BEMVINDO` | 10% do subtotal |
  | `PROMO20` | 20% do subtotal |
  | `MENOS15` | R$ 15,00, apenas para compras a partir de R$ 100,00 |
  | qualquer outro | nenhum (mostrar `Cupom inválido ou não aplicável`) |

- Clientes do **clube de fidelidade** ganham mais **5%** sobre o valor **já com o cupom**.

**Tarefas:**

1. Crie `lerPrecos(texto: string): { precos: number[]; ignorados: number }`. Use `split('\n')` e um laço **`for`** com:
   - **`continue`** para pular linhas vazias e inválidas;
   - **`break`** quando chegar a 20 itens.
2. Crie `somarItens(...precos: number[]): number`, com **parâmetro rest**. Chame essa função com o operador spread: `somarItens(...precos)`.
3. Crie a função **sobrecarregada** `calcularDesconto`:
   ```ts
   function calcularDesconto(total: number, percentual: number): number;
   function calcularDesconto(total: number, cupom: string): number;
   ```
   A implementação usa `typeof` para descobrir qual forma foi chamada:
   - com **`number`**, devolve `total * percentual / 100` (usada para a fidelidade);
   - com **`string`**, usa um **`switch`** com o código do cupom em maiúsculas (`toUpperCase()`) e devolve o valor do desconto (ou `0`).
4. Crie o tipo de função `type Formatador = (valor: number) => string;` e use-o para formatar os valores, como no ex. 04.
5. No clique do botão:
   - se nenhum preço válido for informado, mostre `Nenhum item válido` e saia da função;
   - calcule o subtotal, o desconto do cupom (se o campo não estiver vazio), o desconto de fidelidade (se a caixa estiver marcada) e o total;
   - mostre a quantidade de itens e, quando houver, a quantidade de linhas ignoradas.

**`ex05/index.html`**

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ex. 05: Caixa do mercado</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <h1>Caixa do mercado</h1>
  <p><a href="../index.html">← Voltar</a> · Seu Nome</p>

  <label for="itens">Preços dos itens (um por linha)</label>
  <textarea id="itens" rows="8" cols="20"></textarea>

  <label for="cupom">Cupom de desconto</label>
  <input type="text" id="cupom">

  <label>
    <input type="checkbox" id="fidelidade">
    Cliente do clube de fidelidade (5%)
  </label>

  <button id="fechar">Fechar compra</button>

  <div id="resultado"></div>

  <script type="module" src="ex05.js"></script>
</body>
</html>
```

**Casos de teste:**

| Itens (um por linha) | Cupom | Fidelidade | Resultado esperado |
|----|----|----|----|
| `12.50` `8,90` *(vazia)* `abc` `32` `46.60` | `promo20` | sim | 4 itens (1 linha ignorada). Subtotal R$ 100.00. Cupom −R$ 20.00. Fidelidade −R$ 4.00. **Total R$ 76.00** |
| `45` `70` | `MENOS15` | não | 2 itens. Subtotal R$ 115.00. Cupom −R$ 15.00. **Total R$ 100.00** |
| `10` `20` `30.50` | `MENOS15` | não | 3 itens. Subtotal R$ 60.50. Cupom inválido ou não aplicável. **Total R$ 60.50** |
| `abc` *(vazia)* | | | Nenhum item válido |

**Exemplo de saída (1º caso):**

```
Itens: 4 (1 linha ignorada)
Subtotal: R$ 100.00
Cupom PROMO20: - R$ 20.00
Fidelidade (5%): - R$ 4.00
Total a pagar: R$ 76.00
```

---

## Parte 7: Publicando no GitHub

### 7.1 Criar a conta e configurar o Git

1. Se ainda não tiver, crie uma conta em <https://github.com>. Prefira um nome de usuário profissional, porque ele vai aparecer nos links do seu portfólio.
2. No terminal, informe ao Git o seu nome e e-mail. Faça isso **uma vez por computador** e use o mesmo e-mail da conta do GitHub:
   ```bash
   git config --global user.name "Seu Nome Completo"
   git config --global user.email "seu-email@exemplo.com"
   ```

### 7.2 Criar o `README.md`

Na raiz do projeto, crie o `README.md`. Você vai completar o link do site no passo 7.5:

```markdown
# Atividade: Estruturas em TypeScript

Aluno(a): Seu Nome Completo
Disciplina: Programação Web

## Exercícios

1. Situação do aluno no semestre
2. Conta de luz
3. Simulador de parcelamento
4. Meta de economia
5. Caixa do mercado

## Site publicado

https://SEU-USUARIO.github.io/pweb-ts-estruturas/
```

### 7.3 Criar o repositório no GitHub

1. Entre no GitHub e clique em **+ → New repository** (canto superior direito).
2. Preencha:
   - **Repository name:** `pweb-ts-estruturas`
   - **Visibility:** **Public** (o professor precisa conseguir acessar)
   - **Não** marque *Add a README file*, *.gitignore* nem *license*. O repositório precisa começar **vazio**.
3. Clique em **Create repository**. Deixe essa página aberta, porque ela mostra o endereço do repositório.

### 7.4 Enviar o projeto

1. Antes de enviar, rode `tsc` uma última vez e confira que aparecem **0 erros** e que cada pasta tem o seu `.js`.

   > ⚠️ **Os arquivos `.js` precisam ir para o GitHub**, porque são eles que as páginas HTML carregam.

2. No terminal integrado, na raiz do projeto, rode um comando por vez (troque `SEU-USUARIO` pelo seu usuário):
   ```bash
   git init
   git add .
   git commit -m "Atividade: estruturas e funções em TypeScript"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/pweb-ts-estruturas.git
   git push -u origin main
   ```

   | Comando | O que faz |
   |----|----|
   | `git init` | Transforma a pasta num repositório Git (só na primeira vez) |
   | `git add .` | Separa todos os arquivos para o próximo commit |
   | `git commit -m "..."` | Grava uma "foto" dos arquivos com uma mensagem |
   | `git branch -M main` | Dá o nome `main` ao ramo principal |
   | `git remote add origin ...` | Liga a pasta ao repositório do GitHub (só na primeira vez) |
   | `git push -u origin main` | Envia os commits para o GitHub |

3. No primeiro `push`, abre uma janela pedindo login no GitHub. Escolha **Sign in with your browser** e autorize.
4. Atualize a página do repositório no GitHub. Os seus arquivos devem aparecer.

> 💡 **Alternativa pelo VS Code:** no painel **Controle do Código-Fonte** (`Ctrl+Shift+G`), clique em **Publicar no GitHub** (*Publish to GitHub*), escolha **repositório público** e confirme. O VS Code faz o `init`, o `commit` e o `push` por você.

**Enviando alterações depois:** sempre que mudar algo, rode:

```bash
git add .
git commit -m "Descreva o que mudou"
git push
```

> 💡 Faça commits ao longo da atividade, por exemplo um a cada exercício concluído (`"Exercício 01 concluído"`). O histórico de commits também é avaliado.

### 7.5 Publicar as páginas com o GitHub Pages

O GitHub Pages hospeda as páginas HTML de graça, para qualquer pessoa usar pelo navegador.

1. No repositório, vá em **Settings → Pages** (menu à esquerda).
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Em **Branch**, escolha **`main`** e a pasta **`/ (root)`**. Clique em **Save**.
4. Aguarde 1 ou 2 minutos e atualize a página. O endereço do site aparece no topo:
   ```
   https://SEU-USUARIO.github.io/pweb-ts-estruturas/
   ```
5. Abra o endereço e **teste os 5 exercícios pelo site publicado**.
6. Coloque esse endereço no `README.md` e envie a alteração (`add`, `commit`, `push`).

> ⚠️ **A página abriu, mas o botão não faz nada?** Aperte `F12` e veja a aba **Console**. Normalmente o problema é um `.js` que não foi enviado ao GitHub, ou um nome de arquivo com maiúscula diferente. No GitHub Pages, `Ex01.js` e `ex01.js` são arquivos diferentes.

---

## Parte 8: Entregando no Canvas

1. Confira o **checklist**:
   - [ ] `tsc` compila o projeto com **0 erros**
   - [ ] Os 5 exercícios funcionam com **todos os casos de teste**
   - [ ] Não há `any` nem `debugger;` no código
   - [ ] O repositório é **público** e tem os arquivos `.ts`, `.js`, `.html`, `style.css` e `tsconfig.json`
   - [ ] O `README.md` tem o seu nome e o link do site
   - [ ] O site no GitHub Pages abre e os 5 exercícios funcionam
2. Na atividade do Canvas, clique em **Enviar tarefa**, escolha **URL do site** e cole o link do seu **repositório**:
   ```
   https://github.com/SEU-USUARIO/pweb-ts-estruturas
   ```
3. Envie até **29/10/2026**.

---

## Critérios de avaliação

| Critério | Peso |
|----|----|
| Os 5 exercícios funcionam e conferem com os casos de teste | 30% |
| Uso correto das estruturas pedidas em cada exercício (`if`, `switch`, `for`, `while`, `break`, `continue`, parâmetros opcionais, padrão e rest, tipos de função e sobrecarga) | 25% |
| O projeto compila com `strict` e 0 erros, com tipos corretos e sem `any` | 20% |
| Publicação: repositório público, README, GitHub Pages funcionando e histórico de commits | 15% |
| Organização e legibilidade (nomes claros, funções pequenas, código comentado) | 10% |
