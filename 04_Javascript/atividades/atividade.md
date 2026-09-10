# Atividade de JavaScript — Manipulação do DOM e Eventos

**Valor:** 4,0 pontos
**Prazo de entrega:** 14/09/2026, até às 23h59
**Modalidade:** individual

---

## Objetivo

Praticar os conceitos de **manipulação do DOM** e **tratamento de eventos** em JavaScript vistos em
sala de aula, completando 10 pequenos exercícios práticos.

---

## O que você vai receber

Os arquivos iniciais da atividade estão no repositório da disciplina, na pasta:

```
04_Javascript/atividades/
```

São 10 arquivos HTML, um para cada exercício. **Cada arquivo já vem pronto**, com:

- Um **enunciado no topo da página**, explicando exatamente o que deve ser feito;
- O HTML da página já montado (botões, caixas, listas, campos etc.);
- Um bloco `<script>` no final, com comentários `// TODO` marcando **onde** você deve escrever o
  seu código.

> Você **não precisa criar páginas do zero**. Sua tarefa é completar os trechos marcados com `TODO`.

---

## Exercícios

| # | Arquivo | Conteúdo praticado |
|---|---|---|
| 1 | `atv_01_dom.html` | `document.getElementById()`: alterar texto, cor e imagem |
| 2 | `atv_02_selecting.html` | Os 5 métodos de seleção de elementos |
| 3 | `atv_03_attributes.html` | `element.attribute`, `element.style`, `setAttribute()` |
| 4 | `atv_04_structure.html` | `createElement()`, `appendChild()`, `removeChild()`, `replaceChild()` |
| 5 | `atv_05_events.html` | Adicionar eventos via JavaScript (`elemento.onclick = ...`) |
| 6 | `atv_06_form.html` | Validação de formulário: atributos HTML + `checkValidity()` |
| 7 | `atv_07_mouse.html` | Eventos de mouse: `click`, `mouseenter`, `mouseleave` |
| 8 | `atv_08_keyboards.html` | Eventos de teclado: `keydown`, `event.key` e `event.code` |
| 9 | `atv_09_load.html` | `DOMContentLoaded` e `window.load` |
| 10 | `atv_10_manage.html` | `addEventListener()` e `removeEventListener()` |

---

## Como fazer a atividade

1. **Baixe** a pasta `atividades` do repositório da disciplina.
2. **Abra um arquivo por vez** no seu editor de código (VS Code, por exemplo).
3. **Leia o enunciado** que aparece no topo da página.
4. **Escreva o código JavaScript** nos pontos marcados com `// TODO`.
5. **Teste no navegador**: abra o arquivo `.html` e verifique se o comportamento pedido acontece.
6. Se algo não funcionar, pressione **F12** e abra a aba **Console** — as mensagens de erro
   indicam a linha do problema.
7. Repita para os 10 arquivos.

> **Dica:** consulte o `README.md` da pasta `04_Javascript/` e os exemplos vistos em aula
> (`01_dom.html` a `10_manage.html`). Todos os comandos necessários estão lá.

---

## Como entregar

Escolha **uma** das duas opções abaixo. Você não precisa fazer as duas.

### Opção 1 — Enviar um arquivo ZIP pelo Canvas

**Passo 1.** Coloque os 10 arquivos HTML dentro de uma única pasta, nomeada assim:

```
atividades-js-SeuNome
```

**Passo 2.** Compacte a pasta:

- **Windows:** clique com o botão direito sobre a pasta → *Enviar para* → *Pasta compactada (zipada)*.
- **macOS:** clique com o botão direito sobre a pasta → *Comprimir*.

Isso vai gerar um arquivo `atividades-js-SeuNome.zip`.

**Passo 3.** No Canvas:

1. Abra esta atividade;
2. Clique em **Enviar atividade** (*Submit Assignment*);
3. Selecione a aba **Carregar arquivo** (*File Upload*);
4. Clique em **Escolher arquivo** e selecione o `.zip`;
5. Clique em **Enviar atividade**.

**Passo 4.** Confirme que a entrega foi registrada: após o envio, o Canvas exibe o nome do arquivo e
a data/hora do envio na lateral direita da tela.

---

### Opção 2 — Publicar no GitHub

**Passo 1.** Crie uma conta em [github.com](https://github.com), caso ainda não tenha.

**Passo 2.** Crie um repositório **público**:

1. Clique no botão **+** (canto superior direito) → **New repository**;
2. Em *Repository name*, use: `pweb-atividades-js`;
3. Marque a opção **Public**;
4. Clique em **Create repository**.

**Passo 3.** Envie os arquivos. Você pode fazer isso de duas formas:

*Pela interface do site (mais simples):*

1. No repositório, clique em **Add file** → **Upload files**;
2. Arraste os 10 arquivos HTML para a área indicada;
3. Clique em **Commit changes**.

*Pelo Git, no terminal (se preferir):*

```bash
git init
git add .
git commit -m "Atividades de JavaScript"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/pweb-atividades-js.git
git push -u origin main
```

**Passo 4 (recomendado).** Publique as páginas com o GitHub Pages, para que elas possam ser abertas
direto no navegador:

1. No repositório, vá em **Settings** → **Pages**;
2. Em *Source*, selecione **Deploy from a branch**;
3. Em *Branch*, escolha **main** e a pasta **/(root)**;
4. Clique em **Save** e aguarde cerca de 1 minuto;
5. O endereço gerado será parecido com:
   `https://SEU-USUARIO.github.io/pweb-atividades-js/atv_01_dom.html`

**Passo 5.** No Canvas:

1. Abra esta atividade;
2. Clique em **Enviar atividade** (*Submit Assignment*);
3. Selecione a aba **URL do site** (*Website URL*);
4. Cole o link do seu repositório (e, se você ativou o GitHub Pages, informe também o link das
   páginas publicadas);
5. Clique em **Enviar atividade**.

> **Importante:** o repositório precisa estar **público**. Se estiver privado, o professor não
> conseguirá abrir os arquivos e a atividade não poderá ser avaliada.

---

## Critérios de avaliação

Cada exercício vale **0,4 ponto**, totalizando **4,0 pontos**.

| Critério | Pontuação por exercício |
|---|---|
| O comportamento pedido no enunciado funciona corretamente no navegador | 0,3 |
| O código usa o método/evento indicado no enunciado (e não outro caminho) | 0,1 |

Observações sobre a correção:

- Exercícios entregues **em branco** (apenas com os `// TODO`) não recebem pontuação.
- Pequenos erros de estilo ou de formatação do código não descontam pontos.
- O que será avaliado é o **JavaScript**; não é necessário alterar o CSS ou o layout das páginas.

---

## Regras e observações

- **Não altere os nomes dos arquivos.** Eles devem continuar como `atv_01_dom.html`,
  `atv_02_selecting.html`, e assim por diante.
- **Entregue os 10 arquivos**, mesmo que algum exercício não tenha ficado completo.
- **Teste antes de enviar.** Abra cada página no navegador e confirme que o comportamento acontece.
- A atividade é **individual**. Discutir dúvidas com colegas é permitido e incentivado; copiar o
  arquivo de outra pessoa, não.
- Entregas após o prazo estarão sujeitas às regras de atraso da disciplina.

---

## Dúvidas

Traga suas dúvidas na próxima aula ou envie mensagem pelo canal da disciplina. Se o seu código não
estiver funcionando, informe **qual exercício** e **qual mensagem aparece no Console (F12)** — isso
agiliza muito o atendimento.

**Bom trabalho!**
