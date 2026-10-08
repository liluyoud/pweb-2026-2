# Projeto Prático — Dashboard Admin com Blazor WebAssembly e MudBlazor

| | |
|---|---|
| **Tipo** | Projeto prático individual |
| **Valor** | [preencher] pontos — **a atividade de maior peso da disciplina** |
| **Entrega** | [preencher: data e hora limite] |
| **Formato de envio** | link do repositório no GitHub |
| **Material base** | [Tutorial passo a passo — preencher com o link do tutorial.md] |

---

## Por que esta atividade é importante

Esta é a atividade **mais importante da disciplina**. Nela você vai juntar, num único projeto real, tudo o que estudamos até aqui: HTML, organização de layout, componentes visuais, C# e a estrutura de uma aplicação web moderna.

O objetivo **não é apenas ter a tela pronta**. É você **entender** como cada parte funciona: por que um componente foi separado dos outros, o que é um parâmetro, como o layout se adapta ao celular, qual HTML o Blazor gera a partir do código que você escreveu. Por isso, a avaliação olha tanto para o **código** quanto para as **explicações** que você vai escrever no README.

---

## O que você vai construir

Um **painel administrativo (dashboard)** para a plataforma fictícia "Afya Pedagógico", com:

- **sidebar** com logo e menu de navegação;
- **barra superior** com breadcrumb, busca, alternância de tema claro/escuro, notificações e menu do usuário;
- **4 cards de indicadores (KPIs)** com mini gráficos de tendência;
- **gráfico de linha** (Receita x Meta) e **gráfico de rosca** (Distribuição de Clientes);
- lista de **Performance dos Projetos** com barras de progresso;
- feed de **Atividades Recentes**;
- **tabela** de Projetos Recentes.

Tudo com **dados fictícios** e **sem CSS próprio**: todo o visual deve vir dos componentes MudBlazor, do tema e das classes utilitárias do MudBlazor.

---

## O que fazer

### Etapa 1 — Siga o tutorial

Siga o tutorial **na ordem**, seção por seção. Não copie o projeto pronto: **digite** o código e, a cada seção, pare para ler os quadros **"Aprofundando"**. São eles que explicam o porquê de cada decisão e caem nas perguntas do README.

| Seções do tutorial | O que você aprende |
|---|---|
| 1 a 4 | criar o projeto com `dotnet new mudblazorwasm`, executar com `dotnet watch` e limpar os arquivos de exemplo |
| 5 e 6 | estilizar sem CSS: parâmetros, tema e classes utilitárias |
| 7 | layout da aplicação: sidebar, menu e AppBar |
| 8 | organização do código em `Data` e `Components` |
| 9 a 16 | cada componente visual do dashboard |
| 17 e 18 | montagem final e testes |

### Etapa 2 — Versione com Git desde o início

1. Crie um **repositório público** no GitHub chamado `afya-admin`.
2. Faça **commits ao longo do trabalho**, e não um único commit no final. Sugestão: um commit ao concluir cada seção do tutorial, com mensagens descritivas. Por exemplo:
   - `Cria projeto base MudBlazor e remove exemplos`
   - `Adiciona tema e layout com sidebar e AppBar`
   - `Cria componente KpiCard com sparkline`
3. Garanta que o `.gitignore` está funcionando: as pastas `bin/` e `obj/` **não** podem estar no repositório.

> O histórico de commits faz parte da avaliação. Ele mostra a evolução do seu trabalho. Um repositório com um único commit contendo o projeto inteiro perde a pontuação desse critério.

### Etapa 3 — Explore o HTML gerado

Com a aplicação rodando, abra o **DevTools** do navegador (F12) e use a aba **Elements** para inspecionar pelo menos **um card de KPI** e **um botão**. Observe:

- quais **tags HTML** o Blazor gerou a partir de `<MudPaper>`, `<MudStack>` e `<MudButton>`;
- quais **classes CSS** foram aplicadas (por exemplo, `mud-paper`, `mud-elevation-1`, `pa-4`, `d-flex`);
- como uma classe utilitária que você escreveu no código (`Class="pa-4"`) aparece no HTML final.

Tire um print dessa inspeção: ele vai no README.

### Etapa 4 — Escreva o README.md

Crie um arquivo **`README.md` na raiz do repositório** seguindo o modelo mais abaixo. Ele é obrigatório e é avaliado.

### Etapa 5 — Envie o link

Nesta tarefa do Canvas, envie **apenas o link** do repositório, por exemplo `https://github.com/seu-usuario/afya-admin`.

> Antes de enviar, abra o link numa **janela anônima** do navegador para confirmar que o repositório é **público** e que o README aparece com as imagens.

---

## Requisitos obrigatórios do projeto

- [ ] O projeto **compila sem erros** (`dotnet build`) e executa (`dotnet watch`).
- [ ] O nome do projeto é **`afya-admin`**.
- [ ] Os arquivos de exemplo do template foram **removidos**: `Home`, `Counter`, `Weather`, `sample-data` e `MainLayout.razor.css`.
- [ ] Existem as pastas **`Data`** (dados fake) e **`Components`** (componentes), como no tutorial.
- [ ] A página `Dashboard.razor` apenas **monta os componentes**, sem concentrar todo o código.
- [ ] **Não há CSS próprio**: nenhum arquivo `.razor.css` e nenhuma regra nova no `app.css`.
- [ ] O **tema escuro** funciona.
- [ ] A página é **responsiva**: funciona no celular, no tablet e no desktop.
- [ ] O repositório tem **histórico de commits** ao longo do desenvolvimento.
- [ ] O repositório **não** contém as pastas `bin/` e `obj/`.
- [ ] Existe um **`README.md`** completo na raiz, com os prints.

---

## Modelo de README.md

Copie o modelo abaixo para o seu `README.md` e preencha **todas** as seções. Salve os prints numa pasta `docs/prints/` do repositório e referencie-os com o caminho relativo, como no modelo.

````markdown
# Afya Admin — Dashboard com Blazor WebAssembly e MudBlazor

## Identificação

| | |
|---|---|
| **Aluno(a)** | Seu nome completo |
| **Matrícula** | 000000 |
| **Faculdade** | Nome da faculdade |
| **Curso** | Nome do curso |
| **Disciplina** | Nome da disciplina |
| **Professor(a)** | Nome do professor(a) |
| **Semestre** | 2026.2 |

## Objetivo do projeto

Explique com suas palavras o objetivo do projeto e o que a página faz (2 a 4 parágrafos).

## Tecnologias utilizadas

- .NET 10 / Blazor WebAssembly
- MudBlazor 9
- (outras que você usou)

## Como executar

Passo a passo para outra pessoa clonar e rodar o projeto:

```bash
git clone https://github.com/seu-usuario/afya-admin.git
cd afya-admin
dotnet watch
```

Informe também a versão do .NET SDK necessária.

## Telas

### Tema claro
![Dashboard — tema claro](docs/prints/tema-claro.png)

### Tema escuro
![Dashboard — tema escuro](docs/prints/tema-escuro.png)

### Versão mobile
![Dashboard — celular](docs/prints/mobile.png)

### HTML gerado (DevTools)
![Inspeção do HTML no DevTools](docs/prints/devtools.png)

Explique em poucas linhas o que o print do DevTools mostra: qual componente você inspecionou, qual HTML ele gerou e quais classes apareceram.

## Estrutura do projeto

Mostre a árvore de pastas e arquivos e explique em uma linha o papel de cada pasta (`Components`, `Data`, `Layout`, `Pages`, `wwwroot`).

## Componentes criados

| Componente | Responsabilidade | Parâmetros que recebe |
|---|---|---|
| `DashboardCard` | ... | ... |
| `KpiCard` | ... | ... |
| (liste todos) | | |

## O que aprendi

Responda **com suas próprias palavras** (um parágrafo curto por pergunta):

1. Como uma aplicação Blazor WebAssembly inicia no navegador? Qual é o papel do `index.html`, da `<div id="app">` e do `Program.cs`?
2. Qual é a diferença entre um **Layout**, uma **Page** e um **Component** neste projeto? Dê um exemplo de cada.
3. O que é um `RenderFragment` e como o `DashboardCard` usa esse recurso para ser reutilizado por vários cards?
4. Como funciona o `@bind-Valor` no `SeletorPeriodo`? Qual é o papel do `ValorChanged`?
5. Por que os dados ficam na pasta `Data`, separados dos componentes? Que vantagem isso traz se, no futuro, os dados vierem de uma API?
6. Como o `MudGrid` com `xs`, `sm` e `lg` faz os cards de KPI se reorganizarem em telas de tamanhos diferentes?
7. Como foi possível estilizar a página inteira sem escrever CSS? Explique o papel do tema (`MudTheme`) e das classes utilitárias.
8. Por que o namespace do projeto é `afya_admin` e não `afya-admin`?

## Dificuldades e soluções

Descreva pelo menos **dois problemas** que você enfrentou durante o desenvolvimento e como resolveu cada um.

## Melhorias futuras (opcional)

O que você implementaria a seguir? Se fez algum dos desafios da seção 20 do tutorial, descreva aqui.
````

---

## Como será a avaliação

A avaliação será feita **diretamente no GitHub**, lendo o **código** e o **README.md**. O estado considerado é o **último commit feito até o prazo de entrega**; commits posteriores serão ignorados.

| Critério | O que será observado | Peso |
|---|---|---|
| **1. Projeto base e organização** | nome `afya-admin`, arquivos de exemplo removidos, pastas `Data` e `Components`, `.gitignore` correto (sem `bin/` e `obj/`) | 10% |
| **2. Layout da aplicação** | sidebar com logo e menu com separadores, AppBar completa (breadcrumb, busca, tema, notificações, usuário), tema claro e escuro | 15% |
| **3. Componentes do dashboard** | KPIs com sparkline, gráfico de linha, gráfico de rosca com total no centro, Performance dos Projetos, Atividades Recentes e tabela, fiéis ao tutorial | 25% |
| **4. Qualidade do código** | componentização correta, uso de parâmetros, `Dashboard.razor` enxuto, **nenhum CSS próprio**, código organizado e legível | 15% |
| **5. Histórico de commits** | commits frequentes, ao longo do desenvolvimento, com mensagens descritivas | 10% |
| **6. README: identificação e documentação** | identificação completa, objetivo, tecnologias, como executar, os 4 prints, estrutura e tabela de componentes | 10% |
| **7. README: "O que aprendi" e dificuldades** | respostas corretas, completas e **escritas com suas palavras**; dificuldades reais e bem descritas | 15% |
| **Total** | | **100%** |

**Pontuação extra (opcional):** implementar um ou mais **desafios da seção 20 do tutorial** e documentá-los no README pode render até [preencher] pontos extras.

### Situações que zeram critérios

- Repositório **privado** ou link quebrado: a atividade não pode ser avaliada.
- Projeto que **não compila**: o critério 3 é zerado.
- Uso de **CSS próprio**: o critério 4 é zerado.
- **Um único commit** com o projeto inteiro: o critério 5 é zerado.
- Respostas do "O que aprendi" **copiadas** (de colegas, da internet ou geradas por IA sem compreensão), ou idênticas às de outro aluno: o critério 7 é zerado para todos os envolvidos.

---

## Sobre o uso de IA e de consultas

Você **pode** usar a documentação do MudBlazor, pesquisar na internet e tirar dúvidas com colegas e com ferramentas de IA para **entender** um conceito ou resolver um erro. Porém:

- o **código deve ser digitado e entendido por você**. Se não souber explicar uma linha, volte ao tutorial;
- as respostas do README precisam refletir **o seu entendimento**. Respostas genéricas, que não mencionam o seu próprio projeto, recebem nota baixa.

---

## Checklist final antes de enviar

- [ ] `dotnet build` sem erros.
- [ ] Testei o tema escuro e a versão mobile (Ctrl + Shift + M no DevTools).
- [ ] Repositório **público**, sem `bin/` e `obj/`.
- [ ] README na raiz, com **todas** as seções preenchidas.
- [ ] Os **4 prints** aparecem no README do GitHub (e não só no meu computador).
- [ ] Respondi às **8 perguntas** do "O que aprendi" com minhas palavras.
- [ ] Abri o link numa janela anônima e está tudo visível.
- [ ] Enviei o link do repositório nesta tarefa do Canvas.

---

## Dúvidas

Traga suas dúvidas para as aulas ou use o fórum de discussão da disciplina no Canvas. **Não deixe para a última semana**: o tutorial é longo, e o ideal é avançar algumas seções por aula.

Bom trabalho!
