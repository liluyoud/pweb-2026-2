# JavaScript: Manipulação do DOM e Eventos

Material de apoio da aula de **Programação Web**. Este documento explica, de forma didática, todo o
conteúdo demonstrado nos exemplos da pasta `04_Javascript/`.

---

## Sumário

1. [Antes de começar: o que é o DOM?](#1-antes-de-começar-o-que-é-o-dom)
2. [Manipulação básica do DOM](#2-manipulação-básica-do-dom-01_domhtml)
3. [Selecionando elementos](#3-selecionando-elementos-02_selectinghtml)
4. [Atributos e estilos](#4-atributos-e-estilos-03_attributeshtml)
5. [Alterando a estrutura da página](#5-alterando-a-estrutura-da-página-04_structurehtml)
6. [Event Handlers](#6-event-handlers-05_eventshtml)
7. [Validação de formulários](#7-validação-de-formulários-06_formhtml)
8. [Eventos de mouse](#8-eventos-de-mouse-07_mousehtml)
9. [Eventos de teclado](#9-eventos-de-teclado-08_keyboardshtml)
10. [Eventos de carregamento](#10-eventos-de-carregamento-09_loadhtml)
11. [Gerenciamento de eventos](#11-gerenciamento-de-eventos-10_managehtml)
12. [Atividades](#12-atividades)
13. [Referência rápida](#13-referência-rápida)

---

## 1. Antes de começar: o que é o DOM?

**DOM** significa *Document Object Model* (Modelo de Objetos do Documento).

Quando o navegador carrega uma página HTML, ele não guarda o arquivo como texto. Ele lê o HTML e
constrói na memória uma **árvore de objetos**, onde cada tag vira um objeto que o JavaScript pode ler
e modificar.

Um HTML como este:

```html
<body>
  <h1 id="titulo">Olá</h1>
  <p>Texto</p>
</body>
```

vira, na memória, uma árvore parecida com:

```
document
 └── html
      └── body
           ├── h1 (id="titulo")
           └── p
```

Por isso conseguimos fazer coisas como:

```javascript
document.getElementById("titulo").innerHTML = "Novo texto";
```

Ou seja: **o DOM é a ponte entre o HTML e o JavaScript.** Sem ele, o JavaScript não teria como
"enxergar" nem alterar a página.

> **Objeto `document`**: é o ponto de partida. Ele representa a página inteira e é a partir dele que
> chegamos a qualquer elemento.

### Onde colocar o JavaScript

Existem duas formas usadas nos exemplos:

**1. Script dentro do próprio HTML** (usado na maioria dos exemplos):

```html
<body>
  <!-- conteúdo da página -->

  <script>
    // código JavaScript aqui
  </script>
</body>
```

**2. Script em arquivo separado** (usado no exemplo 05):

```html
<head>
  <link rel="stylesheet" href="05_events.css">
</head>
<body>
  <!-- conteúdo -->
  <script src="05_events.js"></script>
</body>
```

> **Regra importante:** o `<script>` deve ficar **no final do `<body>`**, logo antes do `</body>`.
> Se ele vier antes dos elementos HTML, o JavaScript tenta acessar elementos que ainda não existem
> e recebe `null` — um dos erros mais comuns de quem está começando.

---

## 2. Manipulação básica do DOM (`01_dom.html`)

O primeiro passo é aprender a **encontrar** um elemento e **modificá-lo**.

### `document.getElementById(id)`

Busca **um único elemento** pelo seu atributo `id`. Como o `id` é único na página, este método
devolve exatamente um elemento (ou `null`, se não encontrar).

```html
<h1 id="titulo">Título original</h1>
```

```javascript
document.getElementById("titulo").innerHTML = "Título alterado!";
```

### O que podemos alterar

| O que muda | Como se escreve | Exemplo |
|---|---|---|
| Conteúdo HTML | `elemento.innerHTML` | `el.innerHTML = "<b>Oi</b>"` |
| Cor do texto | `elemento.style.color` | `el.style.color = "blue"` |
| Cor de fundo | `elemento.style.backgroundColor` | `el.style.backgroundColor = "yellow"` |
| Imagem exibida | `elemento.src` | `img.src = "foto.png"` |

### Exemplo comentado

```javascript
function mudarTitulo() {
  // 1. encontra o elemento pelo id
  // 2. altera o conteúdo dele
  document.getElementById("titulo").innerHTML = "Título alterado via JavaScript!";
  document.getElementById("titulo").style.color = "blue";
}
```

E no HTML, o botão que chama a função:

```html
<button onclick="mudarTitulo()">Mudar título</button>
```

> **Atenção ao CSS no JavaScript:** propriedades CSS com hífen viram **camelCase** no JavaScript.
> `background-color` → `backgroundColor`, `font-size` → `fontSize`, `border-radius` → `borderRadius`.

---

## 3. Selecionando elementos (`02_selecting.html`)

Nem sempre queremos um único elemento. O JavaScript oferece cinco métodos principais de seleção.

| Método | O que faz | O que devolve |
|---|---|---|
| `document.getElementById(id)` | Busca pelo id | **Um** elemento |
| `document.getElementsByTagName(nome)` | Busca pela tag (`p`, `li`, `div`…) | **Vários** (HTMLCollection) |
| `document.getElementsByClassName(nome)` | Busca pela classe CSS | **Vários** (HTMLCollection) |
| `document.querySelector(seletor)` | Busca pelo **seletor CSS**, o **primeiro** que casar | **Um** elemento |
| `document.querySelectorAll(seletor)` | Busca pelo seletor CSS, **todos** que casarem | **Vários** (NodeList) |

### Métodos que devolvem vários elementos

Quando o método devolve vários elementos, **não dá para alterar todos de uma vez** — é preciso
percorrer a coleção com um laço:

```javascript
const itens = document.getElementsByTagName("li");

for (let i = 0; i < itens.length; i++) {
  itens[i].style.fontWeight = "bold";
}
```

Com `querySelectorAll` também podemos usar `forEach`, que é mais moderno e legível:

```javascript
const elementos = document.querySelectorAll(".item");

elementos.forEach(function (el) {
  el.classList.add("destaque");
});
```

### `querySelector` usa seletores de CSS

Esta é a grande vantagem dos métodos `query`: eles aceitam a **mesma sintaxe do CSS**.

| Seletor | Significado |
|---|---|
| `"#titulo"` | elemento com `id="titulo"` |
| `".item"` | elementos com `class="item"` |
| `"p"` | todas as tags `<p>` |
| `"ul li"` | todos os `<li>` dentro de uma `<ul>` |
| `"input[type='email']"` | inputs do tipo email |

```javascript
// pega apenas o PRIMEIRO elemento com classe "item"
const primeiro = document.querySelector(".item");

// pega TODOS os elementos com classe "item"
const todos = document.querySelectorAll(".item");
```

### `innerHTML` x `textContent`

Ambos leem/escrevem o conteúdo de um elemento, mas de formas diferentes:

```html
<p id="conteudo"><strong>Texto</strong> com <em>formatação HTML</em>.</p>
```

```javascript
document.getElementById("conteudo").innerHTML;
// "<strong>Texto</strong> com <em>formatação HTML</em>."  → inclui as tags

document.getElementById("conteudo").textContent;
// "Texto com formatação HTML."                            → apenas o texto puro
```

| Propriedade | Lê/escreve | Quando usar |
|---|---|---|
| `innerHTML` | O HTML interno, **com tags** | Quando você quer inserir HTML (`<b>`, `<li>`…) |
| `textContent` | Apenas o texto, **sem tags** | Quando você quer apenas texto (mais seguro e rápido) |

> **Dica de segurança:** se o conteúdo vier do usuário, prefira `textContent`. Usar `innerHTML` com
> texto digitado por terceiros pode permitir a injeção de código malicioso na página.

---

## 4. Atributos e estilos (`03_attributes.html`)

Além do conteúdo, podemos ler e alterar **atributos** (`href`, `src`, `title`, `type`…).

### Forma 1: acesso direto pela propriedade

Atributos comuns viram propriedades do objeto:

```javascript
const link = document.getElementById("link");

link.href;                                 // lê o valor atual
link.href = "https://developer.mozilla.org";  // altera o valor
```

### Forma 2: `setAttribute()` e `getAttribute()`

```javascript
const imagem = document.getElementById("imagem");

imagem.setAttribute("src", "https://placehold.co/120/orange/ffffff"); // altera
imagem.setAttribute("title", "Imagem criada com setAttribute!");      // cria um novo atributo

const max = campo.getAttribute("maxlength");  // lê o valor de um atributo
```

| Método | O que faz |
|---|---|
| `getAttribute("nome")` | Lê o valor de um atributo |
| `setAttribute("nome", "valor")` | Cria **ou** altera um atributo |

> **Qual usar?** Para atributos padrão (`href`, `src`, `id`), o acesso direto é mais curto e
> legível. `setAttribute()` é indispensável quando o atributo **ainda não existe** no elemento ou
> quando é um atributo personalizado (ex.: `data-codigo`).

### Alterando o estilo: `element.style.property`

```javascript
const paragrafo = document.getElementById("paragrafo");

paragrafo.style.color = "white";
paragrafo.style.backgroundColor = "purple";
paragrafo.style.fontSize = "20px";
paragrafo.style.padding = "10px";
```

Cada linha equivale a escrever um estilo inline no HTML. Lembre-se do **camelCase**.

---

## 5. Alterando a estrutura da página (`04_structure.html`)

Até aqui só modificamos elementos que **já existiam**. Agora vamos criar, remover e substituir
elementos — ou seja, mudar a própria árvore do DOM.

| Método | O que faz |
|---|---|
| `document.createElement(tag)` | Cria um novo elemento (ainda **fora** da página) |
| `pai.appendChild(filho)` | Adiciona o elemento como último filho |
| `pai.removeChild(filho)` | Remove um elemento filho |
| `pai.replaceChild(novo, antigo)` | Substitui um filho por outro |

### Criando e adicionando: `createElement` + `appendChild`

Criar um elemento é um processo de **duas etapas**: primeiro cria, depois insere.

```javascript
const lista = document.getElementById("lista");

const novoItem = document.createElement("li");   // 1. cria o <li> (ainda invisível)
novoItem.textContent = "Item novo";              // 2. define o conteúdo

lista.appendChild(novoItem);                     // 3. insere na página
```

> Enquanto o elemento não for inserido com `appendChild()`, ele existe apenas na memória e **não
> aparece na tela**. Esse é um erro clássico: criar o elemento e esquecer de adicioná-lo.

### Removendo: `removeChild`

O método é chamado **no elemento pai**, passando o filho que será removido:

```javascript
const lista = document.getElementById("lista");

if (lista.lastElementChild) {          // verifica se ainda existe algum item
  lista.removeChild(lista.lastElementChild);
}
```

### Substituindo: `replaceChild`

A ordem dos argumentos é **(novo, antigo)**:

```javascript
const novoItem = document.createElement("li");
novoItem.textContent = "Item substituído!";

lista.replaceChild(novoItem, lista.firstElementChild);
```

### Propriedades úteis de navegação

| Propriedade | Retorna |
|---|---|
| `elemento.firstElementChild` | O primeiro elemento filho |
| `elemento.lastElementChild` | O último elemento filho |
| `elemento.children` | Todos os elementos filhos |
| `elemento.parentElement` | O elemento pai |

---

## 6. Event Handlers (`05_events.html`)

Um **evento** é algo que acontece na página: um clique, o mouse passando por cima, uma tecla
pressionada. Um **event handler** (tratador de evento) é a função que responde a esse evento.

### Adicionando um evento pela propriedade

O formato básico é:

```javascript
document.getElementById("botao1").onclick = function () {
  // código que roda quando o botão for clicado
};
```

Repare que o botão no HTML **não precisa** de nenhum atributo `onclick`:

```html
<button type="button" id="botao1">Clique em mim</button>
```

> **Por que isso é melhor que `onclick` no HTML?** Porque separa responsabilidades: o HTML cuida da
> estrutura e o JavaScript cuida do comportamento. Fica mais fácil de manter.

### Principais eventos usados no exemplo

| Evento | Quando dispara |
|---|---|
| `onclick` | Ao clicar no elemento |
| `onmouseover` | Quando o mouse entra no elemento |
| `onmouseout` | Quando o mouse sai do elemento |
| `onchange` | Quando o valor de um campo muda (ex.: `<select>`) |
| `onkeyup` | Quando uma tecla é solta |

### A palavra-chave `this`

Dentro de um event handler, `this` se refere ao **elemento que disparou o evento**:

```javascript
document.getElementById("caixaHover").onmouseover = function () {
  this.style.backgroundColor = "lightblue";   // "this" é a própria caixa
};

document.getElementById("campoTexto").onkeyup = function () {
  console.log(this.value);                     // "this" é o input
};
```

### Separando HTML, CSS e JavaScript

Este exemplo está dividido em três arquivos, que é a boa prática profissional:

| Arquivo | Responsabilidade |
|---|---|
| `05_events.html` | Estrutura (o que existe na página) |
| `05_events.css` | Apresentação (como as coisas aparecem) |
| `05_events.js` | Comportamento (o que acontece quando o usuário interage) |

Ligação entre eles:

```html
<head>
  <link rel="stylesheet" href="05_events.css">
</head>
<body>
  <!-- ... conteúdo ... -->
  <script src="05_events.js"></script>
</body>
```

---

## 7. Validação de formulários (`06_form.html`)

**Validação de dados** é o processo de garantir que a informação digitada pelo usuário está
completa, correta e utilizável. Perguntas típicas:

- O usuário preencheu todos os campos obrigatórios?
- A data informada é válida?
- Ele digitou texto num campo que deveria ser numérico?

O HTML5 introduziu a **constraint validation** (validação por restrições), que se apoia em três
pilares: **atributos HTML**, **pseudo-seletores CSS** e a **API de validação em JavaScript**.

### 7.1 Atributos HTML de validação

| Atributo | O que faz |
|---|---|
| `required` | Torna o campo obrigatório |
| `type` | Define o tipo esperado (`email`, `number`, `url`, `date`…) |
| `min` / `max` | Valor mínimo e máximo |
| `minlength` / `maxlength` | Quantidade mínima e máxima de caracteres |
| `pattern` | Expressão regular que o valor deve seguir |
| `disabled` | Desabilita o campo (não é enviado nem validado) |

```html
<input type="text"   id="nome"    required minlength="3">
<input type="email"  id="email"   required>
<input type="number" id="idade"   min="1" max="120" required>
<input type="text"   id="usuario" pattern="[A-Za-z0-9]{4,10}" required
       title="Use de 4 a 10 letras ou números.">
<input type="text"   id="codigo"  value="Campo desabilitado" disabled>
```

Só com esses atributos, **o próprio navegador já bloqueia o envio** de um formulário inválido e
mostra uma mensagem padrão.

### 7.2 Pseudo-seletores CSS

O CSS consegue estilizar os campos de acordo com o estado da validação:

| Seletor | Seleciona campos… |
|---|---|
| `:required` | que têm o atributo `required` |
| `:optional` | que **não** têm `required` |
| `:valid` | cujo valor está válido |
| `:invalid` | cujo valor está inválido |
| `:disabled` | que têm o atributo `disabled` |

```css
input:required { border-left: 4px solid orange; }
input:optional { border-left: 4px solid gray; }
input:valid    { border-color: green; background-color: #eaffea; }
input:invalid  { border-color: red;   background-color: #ffeaea; }
input:disabled { background-color: #eee; color: #999; }
```

Resultado: o usuário recebe **feedback visual imediato** enquanto digita, sem escrever uma linha de
JavaScript.

### 7.3 Validação por JavaScript

Quando queremos mensagens personalizadas, usamos a *Constraint Validation API*.

Primeiro desativamos a validação automática do navegador com `novalidate`, para assumir o controle:

```html
<form id="formulario" novalidate>
```

E então validamos manualmente:

```javascript
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();          // impede o envio para conferir os dados

  const campos = formulario.querySelectorAll("input");

  campos.forEach(function (campo) {
    if (!campo.checkValidity()) {   // o campo está inválido?

      // o objeto "validity" diz QUAL regra falhou:
      if (campo.validity.valueMissing) {
        // campo obrigatório vazio
      } else if (campo.validity.typeMismatch) {
        // formato errado (ex.: e-mail inválido)
      } else if (campo.validity.patternMismatch) {
        // não obedeceu ao pattern
      } else if (campo.validity.rangeUnderflow || campo.validity.rangeOverflow) {
        // fora do intervalo min/max
      }
    }
  });
});
```

#### Métodos e propriedades principais

| Recurso | O que faz |
|---|---|
| `campo.checkValidity()` | Retorna `true`/`false` indicando se o campo é válido |
| `campo.validity` | Objeto com o detalhe de qual regra falhou |
| `campo.setCustomValidity("msg")` | Define uma mensagem de erro personalizada |
| `formulario.checkValidity()` | Valida o formulário inteiro de uma vez |

#### Propriedades do objeto `validity`

| Propriedade | Verdadeira quando… |
|---|---|
| `valueMissing` | campo `required` está vazio |
| `typeMismatch` | valor não corresponde ao `type` |
| `patternMismatch` | valor não corresponde ao `pattern` |
| `tooShort` / `tooLong` | texto menor/maior que `minlength`/`maxlength` |
| `rangeUnderflow` / `rangeOverflow` | valor abaixo de `min` / acima de `max` |

---

## 8. Eventos de mouse (`07_mouse.html`)

Eventos de mouse acontecem quando o usuário interage com o ponteiro.

| Evento | Quando dispara |
|---|---|
| `click` | Após `mousedown` + `mouseup` no mesmo elemento (botão principal) |
| `dblclick` | Após dois cliques rápidos no mesmo elemento |
| `mousedown` | Quando o botão do mouse é **pressionado** |
| `mouseup` | Quando o botão do mouse é **solto** |
| `mousemove` | Continuamente, enquanto o mouse se move sobre o elemento |
| `mouseover` | Quando o ponteiro entra no elemento **ou em um filho dele** |
| `mouseout` | Quando o ponteiro sai do elemento **ou de um filho dele** |
| `mouseenter` | Quando o ponteiro entra no elemento (ignora os filhos) |
| `mouseleave` | Quando o ponteiro sai do elemento (ignora os filhos) |
| `contextmenu` | Ao tentar abrir o menu de contexto (botão direito) |
| `wheel` | Ao girar a roda do mouse |
| eventos de *drag* | `dragstart`, `dragover`, `drop`, `dragend`… (arrastar e soltar) |

### `mouseover`/`mouseout` **x** `mouseenter`/`mouseleave`

Essa é a diferença que mais confunde. Considere:

```html
<div id="caixa">
  Texto
  <strong>elemento filho</strong>
</div>
```

- Com `mouseover`/`mouseout`: ao passar o mouse do texto para o `<strong>`, os eventos **disparam de
  novo**, porque eles também reagem aos elementos filhos.
- Com `mouseenter`/`mouseleave`: nada acontece nessa transição interna. Eles só disparam quando o
  mouse realmente **entra ou sai** da caixa.

> **Conclusão prática:** para efeitos parecidos com o `:hover` do CSS, prefira
> `mouseenter`/`mouseleave` — o comportamento é mais previsível.

### Coordenadas do mouse (`mousemove`)

```javascript
areaMovimento.addEventListener("mousemove", function (evento) {
  console.log("X=" + evento.offsetX + ", Y=" + evento.offsetY);
});
```

| Propriedade | Coordenada em relação a… |
|---|---|
| `offsetX` / `offsetY` | o próprio elemento |
| `clientX` / `clientY` | a área visível da janela |
| `pageX` / `pageY` | a página inteira (considera a rolagem) |

### `contextmenu` e `wheel`

```javascript
// bloqueia o menu do botão direito
caixa.addEventListener("contextmenu", function (evento) {
  evento.preventDefault();
});

// detecta a direção da rolagem
area.addEventListener("wheel", function (evento) {
  const direcao = evento.deltaY > 0 ? "para baixo" : "para cima";
});
```

### Drag and Drop

O arrastar-e-soltar exige três coisas: o atributo `draggable="true"` no item, os eventos no item
arrastado e os eventos na zona de destino.

```html
<div id="itemArrastavel" draggable="true">Arraste-me</div>
<div id="dropZone">Solte o item aqui</div>
```

```javascript
itemArrastavel.addEventListener("dragstart", function (evento) {
  evento.dataTransfer.setData("text/plain", "itemArrastavel");
});

dropZone.addEventListener("dragover", function (evento) {
  evento.preventDefault();   // OBRIGATÓRIO: sem isso o "drop" nunca acontece
});

dropZone.addEventListener("drop", function (evento) {
  evento.preventDefault();
  dropZone.textContent = "Item solto aqui!";
});
```

> **Pegadinha:** por padrão o navegador não permite soltar nada em lugar nenhum. É preciso chamar
> `evento.preventDefault()` no `dragover` para "liberar" a área de destino.

---

## 9. Eventos de teclado (`08_keyboards.html`)

Eventos de teclado disparam quando o usuário pressiona uma tecla.

| Evento | Quando dispara |
|---|---|
| `keydown` | A tecla foi **pressionada** |
| `keyup` | A tecla foi **solta** |

### `event.key` x `event.code`

O objeto `KeyboardEvent` traz duas propriedades muito parecidas, mas com propósitos diferentes:

| Propriedade | O que retorna | Ao pressionar a tecla Z |
|---|---|---|
| `event.key` | O **valor** produzido pela tecla. Muda conforme idioma e modificadores | `"z"` (ou `"Z"` com Shift) |
| `event.code` | O **código físico** da tecla no teclado. É constante | Sempre `"KeyZ"` |

```javascript
campo.addEventListener("keydown", function (evento) {
  console.log("key:  " + evento.key);    // o que foi digitado
  console.log("code: " + evento.code);   // qual tecla física foi apertada
});
```

> **Quando usar cada um?**
> - `event.key` → quando importa **o caractere** digitado (ex.: montar um texto, aceitar só números).
> - `event.code` → quando importa **a posição física** da tecla (ex.: controles de jogo com WASD,
>   que devem funcionar igual em qualquer layout de teclado).

### Teclas modificadoras

O evento também informa se Shift, Ctrl ou Alt estavam pressionados:

```javascript
evento.shiftKey   // true ou false
evento.ctrlKey    // true ou false
evento.altKey     // true ou false
```

### Log de eventos

O exemplo mantém uma lista dos eventos disparados, com o mais recente sempre no topo. O truque é
inserir o novo item **antes** do primeiro filho da lista:

```javascript
function adicionarAoLog(evento) {
  const item = document.createElement("li");
  item.textContent = evento.type + " -> key: '" + evento.key + "'";

  log.insertBefore(item, log.firstChild);   // insere no TOPO
  // log.appendChild(item);                 // inseriria no FIM
}
```

---

## 10. Eventos de carregamento (`09_load.html`)

Nem tudo na página fica pronto ao mesmo tempo. O HTML costuma ser lido rápido, mas imagens, vídeos e
folhas de estilo podem demorar. Por isso existem eventos diferentes para cada momento.

### `DOMContentLoaded`

Dispara quando o navegador terminou de ler todo o HTML e **montou a árvore do DOM** — sem esperar
imagens, CSS ou outros recursos externos.

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // o DOM já pode ser manipulado com segurança
});
```

**Use para:** inicializar a interface, registrar event handlers, e qualquer ação que só precise que
os elementos existam.

### `load` da `window`

Dispara quando a página inteira terminou de carregar, **incluindo todos os recursos**: imagens,
folhas de estilo, scripts e sub-frames.

```javascript
window.addEventListener("load", function () {
  const imagem = document.getElementById("imagem");
  console.log(imagem.naturalWidth + "x" + imagem.naturalHeight);
});
```

**Use para:** ações que dependem dos recursos já disponíveis, como obter as dimensões reais de uma
imagem ou fazer cálculos de layout.

### Comparação

| | `DOMContentLoaded` | `window.load` |
|---|---|---|
| Espera o HTML ser lido | Sim | Sim |
| Espera imagens/CSS/vídeos | **Não** | **Sim** |
| Dispara | Mais cedo | Mais tarde |
| Ideal para | Preparar a interface | Medir/usar recursos carregados |

> No exemplo, o log mostra o tempo de cada evento em milissegundos — assim fica visível que o
> `DOMContentLoaded` **sempre** acontece antes do `load`.

### `load` em outros elementos

O evento `load` não é exclusivo da página. Elementos que buscam recursos também o disparam:

| Tag | Dispara `load` quando… |
|---|---|
| `<img>` | a imagem terminou de baixar |
| `<script>` | o script foi carregado e executado |
| `<link>` | a folha de estilo foi carregada e interpretada |
| `<video>` | (vários eventos de mídia: `loadedmetadata`, `canplay`…) |

```javascript
imagem.addEventListener("load", function () {
  console.log("Imagem terminou de baixar.");
});

video.addEventListener("loadedmetadata", function () {
  console.log("Duração do vídeo: " + video.duration + "s");
});

video.addEventListener("canplay", function () {
  console.log("Já é possível iniciar a reprodução.");
});
```

---

## 11. Gerenciamento de eventos (`10_manage.html`)

Gerenciar eventos é **adicionar**, **remover**, **bloquear** e **controlar** o comportamento deles.

### 11.1 Adicionar: `addEventListener()`

Diferente de `elemento.onclick = ...`, o `addEventListener()` permite **vários listeners** no mesmo
elemento para o mesmo evento, sem que um sobrescreva o outro:

```javascript
botao.addEventListener("click", function () {
  console.log("Listener 1");
});

botao.addEventListener("click", function () {
  console.log("Listener 2");   // este TAMBÉM roda no mesmo clique
});
```

| Forma | Vários listeners? | Pode remover? |
|---|---|---|
| `elemento.onclick = fn` | Não (o novo substitui o antigo) | Sim (`elemento.onclick = null`) |
| `elemento.addEventListener(...)` | **Sim** | Sim (com `removeEventListener`) |

### 11.2 Remover: `removeEventListener()`

Para remover um listener, é preciso passar **exatamente a mesma função** usada ao adicionar. Por
isso ela precisa ser uma **função nomeada** — funções anônimas não podem ser removidas:

```javascript
function listenerCaixa() {
  console.log("Caixa clicada!");
}

caixa.addEventListener("click", listenerCaixa);      // adiciona
caixa.removeEventListener("click", listenerCaixa);   // remove
```

```javascript
// ISTO NÃO FUNCIONA: são duas funções diferentes na memória
caixa.addEventListener("click", function () { /* ... */ });
caixa.removeEventListener("click", function () { /* ... */ });
```

### 11.3 Bloquear: `preventDefault()`

Impede o **comportamento padrão** do navegador para aquele evento:

```javascript
link.addEventListener("click", function (evento) {
  evento.preventDefault();   // o link NÃO navega para outra página
});
```

Usos comuns:

| Situação | O que é bloqueado |
|---|---|
| Clique em `<a>` | A navegação para o link |
| `submit` de formulário | O envio e o recarregamento da página |
| `contextmenu` | O menu do botão direito |
| `dragover` | A recusa padrão em aceitar o item arrastado |

### 11.4 Controlar a propagação: `stopPropagation()`

Quando você clica num elemento dentro de outro, o evento **"borbulha"** (*bubbling*): dispara
primeiro no elemento clicado, depois no pai, depois no avô, e assim por diante até o `document`.

```
Clique na caixa MAIS INTERNA
        ↓
  MAIS INTERNA  → dispara
        ↓
     INTERNA    → dispara (bubbling)
        ↓
     EXTERNA    → dispara (bubbling)
```

Para interromper essa subida:

```javascript
maisInterna.addEventListener("click", function (evento) {
  evento.stopPropagation();   // o evento para aqui e não chega aos pais
});
```

### 11.5 Executar só uma vez: `{ once: true }`

O terceiro parâmetro do `addEventListener()` aceita opções. Com `once`, o listener roda uma única
vez e se remove sozinho:

```javascript
botao.addEventListener("click", function () {
  console.log("Isto só acontece uma vez.");
}, { once: true });
```

### Resumo do gerenciamento

| Ação | Recurso |
|---|---|
| Adicionar | `addEventListener(evento, funcao)` |
| Remover | `removeEventListener(evento, funcao)` |
| Bloquear o padrão | `evento.preventDefault()` |
| Parar a propagação | `evento.stopPropagation()` |
| Rodar apenas uma vez | `addEventListener(..., { once: true })` |

---

## 12. Atividades

A pasta `atividades/` contém um exercício para cada exemplo. Cada arquivo traz um **enunciado no
topo da página**, o HTML já montado e comentários `// TODO` indicando exatamente onde o código deve
ser escrito.

| Atividade | Conteúdo cobrado |
|---|---|
| `atv_01_dom.html` | `getElementById`, alterar texto, cor e imagem |
| `atv_02_selecting.html` | Os cinco métodos de seleção |
| `atv_03_attributes.html` | `element.attribute`, `style`, `setAttribute` |
| `atv_04_structure.html` | `createElement`, `appendChild`, `removeChild`, `replaceChild` |
| `atv_05_events.html` | Atribuir `onclick` via JavaScript |
| `atv_06_form.html` | Atributos de validação + `checkValidity()` |
| `atv_07_mouse.html` | `click`, `mouseenter`, `mouseleave` |
| `atv_08_keyboards.html` | `keydown`, `event.key` x `event.code` |
| `atv_09_load.html` | `DOMContentLoaded` x `window.load` |
| `atv_10_manage.html` | `addEventListener` e `removeEventListener` |

---

## 13. Referência rápida

### Selecionar elementos

```javascript
document.getElementById("meuId");            // um elemento
document.getElementsByTagName("p");          // vários (por tag)
document.getElementsByClassName("minha");    // vários (por classe)
document.querySelector(".minha");            // o primeiro que casar com o seletor CSS
document.querySelectorAll(".minha");         // todos que casarem com o seletor CSS
```

### Ler e alterar conteúdo

```javascript
el.innerHTML = "<b>com tags</b>";
el.textContent = "somente texto";
```

### Atributos e estilos

```javascript
el.src = "foto.png";
el.getAttribute("href");
el.setAttribute("title", "Meu título");
el.style.backgroundColor = "yellow";
el.classList.add("destaque");
el.classList.remove("destaque");
```

### Criar, adicionar, remover e substituir

```javascript
const novo = document.createElement("li");
novo.textContent = "Item";

pai.appendChild(novo);
pai.removeChild(pai.lastElementChild);
pai.replaceChild(novo, pai.firstElementChild);
```

### Eventos

```javascript
el.onclick = function () { /* ... */ };            // forma simples
el.addEventListener("click", minhaFuncao);          // forma recomendada
el.removeEventListener("click", minhaFuncao);
el.addEventListener("click", fn, { once: true });

// dentro do handler:
evento.preventDefault();     // bloqueia o comportamento padrão
evento.stopPropagation();    // impede o bubbling
evento.target;               // elemento que originou o evento
this;                        // elemento que possui o listener
```

### Erros mais comuns

| Erro | Causa | Solução |
|---|---|---|
| `Cannot read properties of null` | O elemento não existia quando o script rodou | Colocar o `<script>` no fim do `<body>` ou usar `DOMContentLoaded` |
| Estilo não muda | Propriedade CSS escrita com hífen | Usar camelCase: `backgroundColor`, `fontSize` |
| Elemento criado não aparece | Faltou inseri-lo na página | Chamar `appendChild()` |
| `removeEventListener` não funciona | O listener era uma função anônima | Usar função nomeada |
| O `drop` nunca acontece | Falta liberar a zona de destino | Chamar `preventDefault()` no `dragover` |
| Só o primeiro elemento muda | `querySelector` retorna apenas um | Usar `querySelectorAll` + `forEach` |
