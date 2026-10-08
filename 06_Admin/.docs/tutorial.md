# Tutorial — Construindo um Dashboard Admin com Blazor WebAssembly + MudBlazor

Neste tutorial você vai construir, do zero, a página **Dashboard** do painel administrativo "Afya Pedagógico". Ao final você terá:

- um **sidebar** com o logo e o menu de navegação;
- uma **barra superior** (AppBar) com breadcrumb, busca, alternância de tema claro/escuro, notificações e menu do usuário;
- **4 cards de indicadores (KPIs)**, cada um com um mini gráfico de tendência;
- um **gráfico de linha** (Receita x Meta) e um **gráfico de rosca** (Distribuição de Clientes);
- uma lista de **Performance dos Projetos** com barras de progresso;
- um feed de **Atividades Recentes**;
- uma **tabela de Projetos Recentes**.

Tudo isso com **dados fictícios (fake)** e **sem escrever uma linha de CSS próprio**: todo o visual vem dos componentes do MudBlazor, do tema e das classes utilitárias que o próprio MudBlazor já traz.

> A especificação técnica completa da página está em [page_specification.md](page_specification.md). Este tutorial é o caminho **passo a passo** para chegar até ela.

---

## Sumário

1. [Preparando o ambiente](#1-preparando-o-ambiente)
2. [Escolhendo o diretório e criando o projeto](#2-escolhendo-o-diretório-e-criando-o-projeto)
3. [Executando e depurando com `dotnet watch`](#3-executando-e-depurando-com-dotnet-watch)
4. [Limpando o projeto: removendo o que não vamos usar](#4-limpando-o-projeto-removendo-o-que-não-vamos-usar)
5. [A regra de ouro: estilizar sem CSS próprio](#5-a-regra-de-ouro-estilizar-sem-css-próprio)
6. [O tema da aplicação](#6-o-tema-da-aplicação)
7. [O layout: sidebar e AppBar](#7-o-layout-sidebar-e-appbar)
8. [Organizando o código: pastas `Data` e `Components`](#8-organizando-o-código-pastas-data-e-components)
9. [Cabeçalho da página e seletor de período](#9-cabeçalho-da-página-e-seletor-de-período)
10. [O card base reutilizável: `DashboardCard`](#10-o-card-base-reutilizável-dashboardcard)
11. [Cards de KPI com sparkline](#11-cards-de-kpi-com-sparkline)
12. [Gráfico de linha: Receita e Crescimento](#12-gráfico-de-linha-receita-e-crescimento)
13. [Gráfico de rosca: Distribuição de Clientes](#13-gráfico-de-rosca-distribuição-de-clientes)
14. [Performance dos Projetos](#14-performance-dos-projetos)
15. [Atividades Recentes](#15-atividades-recentes)
16. [Tabela de Projetos Recentes](#16-tabela-de-projetos-recentes)
17. [Montagem final da página](#17-montagem-final-da-página)
18. [Checklist de testes](#18-checklist-de-testes)
19. [Problemas comuns e soluções](#19-problemas-comuns-e-soluções)
20. [Desafios para ir além](#20-desafios-para-ir-além)

---

## 1. Preparando o ambiente

### 1.1 O que você precisa instalar

| Ferramenta | Para quê | Como verificar |
|---|---|---|
| **.NET SDK 10** | compilar e executar o projeto | `dotnet --version` (deve começar com `10.`) |
| **VS Code** + extensão **C# Dev Kit** | editar o código com autocompletar e ver erros | abrir o VS Code |
| **Chrome** ou **Edge** | executar e depurar a aplicação | — |

Abra um terminal e confira a versão do SDK:

```bash
dotnet --version
```

### 1.2 Instalando os templates do MudBlazor

O .NET cria projetos a partir de **templates** (modelos). O MudBlazor publica os seus próprios templates, que já vêm com a biblioteca instalada e configurada. Instale-os uma única vez na sua máquina:

```bash
dotnet new install MudBlazor.Templates
```

Depois, confira se eles foram instalados:

```bash
dotnet new list mud
```

Você deve ver algo como:

```
Nome do modelo                                    Nome Curto     Tags
------------------------------------------------  -------------  ------------------------------------
Aplicativo Web MudBlazor                          mudblazor      Web/Blazor/WebAssembly/MudBlazor
MudBlazor Aplicativo Autônomo Blazor WebAssembly  mudblazorwasm  Web/Blazor/WebAssembly/PWA/MudBlazor
```

Vamos usar o **`mudblazorwasm`**.

> **Aprofundando — `mudblazor` x `mudblazorwasm`**
>
> - `mudblazor` cria um **Blazor Web App**: existe um servidor ASP.NET Core que pode renderizar as páginas no servidor (SSR) e/ou no navegador.
> - `mudblazorwasm` cria um **Blazor WebAssembly autônomo (standalone)**: o resultado final é um conjunto de **arquivos estáticos** (HTML, CSS, JS e as DLLs .NET compiladas). O navegador baixa tudo e executa o seu código C# **dentro do próprio navegador**, graças ao WebAssembly. Não existe servidor de aplicação: você poderia hospedar o resultado no GitHub Pages, por exemplo.
>
> Para um painel com dados fake, o WebAssembly autônomo é o mais simples: não há backend.

---

## 2. Escolhendo o diretório e criando o projeto

### 2.1 Escolha onde o projeto vai morar

Crie (ou escolha) uma pasta para os seus projetos da disciplina e entre nela pelo terminal. Por exemplo:

```bash
# Windows (PowerShell)
mkdir D:\projetos
cd D:\projetos

# Linux / macOS
mkdir -p ~/projetos
cd ~/projetos
```

> **Dica — evite caminhos problemáticos.** Prefira caminhos **curtos, sem espaços e sem acentos** (por exemplo, `D:\projetos` em vez de `C:\Users\João\Meus Documentos\Programação Web`). Algumas ferramentas de build se confundem com espaços e acentos, e caminhos muito longos podem estourar o limite do Windows.
>
> Evite também pastas sincronizadas (OneDrive, Google Drive, Dropbox): as pastas `bin/` e `obj/` mudam o tempo todo durante o build, e a sincronização pode travar arquivos e causar erros estranhos.

### 2.2 Criando o projeto a partir do template

```bash
dotnet new mudblazorwasm -o afya-admin
```

- `mudblazorwasm` é o nome curto do template;
- `-o afya-admin` (de *output*) cria a pasta `afya-admin` e usa esse nome para o projeto.

O template tem algumas opções úteis. Veja todas com:

```bash
dotnet new mudblazorwasm --help
```

| Opção | O que faz |
|---|---|
| `--empty` / `-e` | cria o projeto **sem** as páginas de exemplo (Counter, Weather) |
| `--pwa` / `-p` | transforma a aplicação num **PWA** (instalável e com uso offline) |
| `--no-https` | não configura HTTPS |

Neste tutorial usamos o template **completo** de propósito: assim você vê o que ele gera e aprende o que pode ser removido (seção 4).

> **Aprofundando — por que o namespace vira `afya_admin`?**
>
> O .NET usa o nome do projeto como **namespace** raiz. Só que o hífen (`-`) **não é permitido** em identificadores C#: `afya-admin` seria lido como a subtração "`afya` menos `admin`". Por isso o SDK troca os caracteres inválidos por sublinhado, e o namespace vira **`afya_admin`**. O mesmo aconteceria com um nome que começasse com número: `06_Admin` viraria `_06_Admin`.
>
> Repare na diferença:
>
> | Onde | Nome usado |
> |---|---|
> | pasta, arquivo `.csproj`, bundle `afya-admin.styles.css` | `afya-admin` (com hífen) |
> | código C# e Razor: `using`, `@using`, `namespace` | `afya_admin` (com sublinhado) |
>
> Você vai ver isso no `Program.cs` (`using afya_admin;`) e no `_Imports.razor` (`@using afya_admin.Layout`). Lembre disso quando criar novas pastas: o namespace da pasta `Components` será `afya_admin.Components`.

### 2.3 Entrando na pasta e criando o `.gitignore`

```bash
cd afya-admin
dotnet new gitignore
```

O `dotnet new gitignore` cria um `.gitignore` padrão do .NET, que impede que as pastas geradas pelo build (`bin/` e `obj/`) sejam enviadas para o Git. Elas são recriadas a cada build e não devem ser versionadas.

### 2.4 Abrindo no VS Code

```bash
code .
```

### 2.5 Entendendo a estrutura gerada

```
afya-admin/
├── afya-admin.csproj           ← definição do projeto (SDK, framework, pacotes NuGet)
├── Program.cs                ← ponto de entrada: configura e inicia a aplicação
├── App.razor                 ← roteador: decide qual página mostrar para cada URL
├── _Imports.razor            ← @using globais, válidos para todos os .razor
├── Layout/
│   ├── MainLayout.razor      ← "moldura" da aplicação (barra superior, menu lateral...)
│   ├── MainLayout.razor.css  ← CSS isolado do layout (vamos apagar)
│   └── NavMenu.razor         ← links do menu lateral
├── Pages/
│   ├── Home.razor            ← página "/" de exemplo (vamos apagar)
│   ├── Counter.razor         ← exemplo de contador (vamos apagar)
│   ├── Weather.razor         ← exemplo de tabela com dados de JSON (vamos apagar)
│   └── NotFound.razor        ← página de erro 404 (vamos manter)
├── Properties/
│   └── launchSettings.json   ← URLs e perfis de execução (a porta HTTP, etc.)
└── wwwroot/                  ← arquivos estáticos servidos ao navegador
    ├── index.html            ← a ÚNICA página HTML real da aplicação
    ├── css/app.css           ← CSS global do template (tela de carregamento e de erro)
    ├── favicon.png, icon-192.png
    └── sample-data/weather.json  ← dados do exemplo Weather (vamos apagar)
```

Abra o **`afya-admin.csproj`**:

```xml
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <OverrideHtmlAssetPlaceholders>true</OverrideHtmlAssetPlaceholders>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="10.*" />
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.DevServer" Version="10.*" PrivateAssets="all" />
    <PackageReference Include="MudBlazor" Version="9.*" />
  </ItemGroup>
</Project>
```

Repare em `MudBlazor Version="9.*"`: o projeto usa a **versão 9** do MudBlazor. Isso é importante, porque a API de gráficos mudou bastante nessa versão (veremos na seção 11), e muitos exemplos antigos da internet não funcionam mais.

Agora o **`Program.cs`**:

```csharp
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using afya_admin;
using MudBlazor.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddMudServices();
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();
```

> **Aprofundando — como uma aplicação Blazor WebAssembly inicia**
>
> 1. O navegador abre o `wwwroot/index.html`. Ele tem uma `<div id="app">` com uma animação de carregamento.
> 2. O script `_framework/blazor.webassembly.js` baixa o **runtime .NET** (compilado para WebAssembly) e as **DLLs** do seu projeto.
> 3. O runtime executa o `Program.cs`. A linha `RootComponents.Add<App>("#app")` diz: "renderize o componente `App` dentro do elemento `#app`", o que substitui a animação de carregamento.
> 4. O `App.razor` contém o **roteador**, que olha a URL e escolhe a página (o componente com `@page` correspondente), renderizando-a dentro do layout padrão (`MainLayout`).
>
> Já a linha `builder.Services.AddMudServices()` registra os serviços que os componentes do MudBlazor precisam (popovers, diálogos, snackbars, detecção de tamanho de tela...). **Sem ela, os componentes MudBlazor falham.**

---

## 3. Executando e depurando com `dotnet watch`

### 3.1 Rodando com recarga automática

Dentro da pasta `afya-admin`, execute:

```bash
dotnet watch
```

O `dotnet watch` compila o projeto, inicia a aplicação, abre o navegador e **fica vigiando os arquivos**. Quando você salva uma alteração, ele aplica a mudança na aplicação que já está rodando. Isso se chama **Hot Reload**.

A URL aparece no terminal, algo como **http://localhost:5147**.

> **Dica — a porta é sorteada.** O template escolhe uma porta **aleatória** ao criar o projeto e a grava em `Properties/launchSettings.json` (propriedade `applicationUrl`). Por isso a sua porta provavelmente será diferente da deste tutorial e da dos colegas. Sempre use a URL que o terminal mostrar. Se quiser uma porta fixa e fácil de lembrar, edite o `applicationUrl` do perfil `http` no `launchSettings.json`.

Faça um teste: abra `Pages/Home.razor`, troque o texto "Hello, world!" e salve. A página no navegador é atualizada sozinha.

### 3.2 Hot Reload tem limites ("rude edits")

Algumas alterações **não podem** ser aplicadas com a aplicação rodando. São as chamadas *rude edits*, por exemplo:

- mudar a assinatura de um método ou o tipo de uma propriedade;
- adicionar ou alterar um `record` ou uma classe de forma estrutural;
- alterar inicializadores de campos que já foram criados (como o `_theme` do layout).

Quando isso acontece, o `dotnet watch` pergunta no terminal:

```
Do you want to restart your app? Yes (y) / No (n) / Always (a) / Never (v)
```

Responda **`a` (Always)** para ele reiniciar sozinho sempre que precisar.

> **Dica — atalhos do terminal do `dotnet watch`**
>
> - **Ctrl + R**: força a reinicialização completa da aplicação;
> - **Ctrl + C**: encerra o `dotnet watch`.
>
> Se uma alteração "não aparece", tente primeiro **F5** no navegador e depois **Ctrl + R** no terminal. Muitas vezes o Hot Reload aplicou o código, mas o componente não foi recriado.

### 3.3 Depurando

**No navegador (F12)**

- aba **Console**: exceções .NET aparecem aqui, com a *stack trace* em C#. Quando algo quebra, a página mostra uma faixa "An unhandled error has occurred". Olhe o Console para ver o motivo.
- aba **Elements**: inspecione o HTML gerado pelos componentes. É assim que você descobre quais classes CSS o MudBlazor aplicou.
- aba **Network**: mostra arquivos que deram erro 404 (por exemplo, uma imagem com caminho errado).
- **Toggle device toolbar** (Ctrl + Shift + M): simula celular e tablet para testar a responsividade.

**No VS Code (breakpoints)**

Com o C# Dev Kit instalado, pressione **F5** e escolha o depurador **C#**. Ele inicia a aplicação e abre um navegador conectado ao depurador. Aí é possível parar em *breakpoints* dentro dos blocos `@code`. Isso só funciona com navegadores baseados em Chromium (Chrome e Edge).

> **Aprofundando — `dotnet watch` x `dotnet run` x `dotnet build`**
>
> | Comando | O que faz |
> |---|---|
> | `dotnet build` | apenas compila. Ótimo para ver erros rapidamente. |
> | `dotnet run` | compila e executa, sem vigiar arquivos. |
> | `dotnet watch` | compila, executa e reaplica alterações ao salvar. **Use este no dia a dia.** |
>
> Um hábito útil: se o `dotnet watch` estiver mostrando muitos erros, pare-o e rode `dotnet build`. A saída fica mais limpa, com o arquivo e a linha de cada erro.

---

## 4. Limpando o projeto: removendo o que não vamos usar

O template traz exemplos que não fazem parte do nosso dashboard. Vamos removê-los para deixar o projeto enxuto.

### 4.1 Apague os arquivos de exemplo

Apague:

| Arquivo | Motivo |
|---|---|
| `Pages/Home.razor` | será substituída pela nossa `Pages/Dashboard.razor` |
| `Pages/Counter.razor` | exemplo do template |
| `Pages/Weather.razor` | exemplo do template |
| `wwwroot/sample-data/` (pasta inteira) | dados usados só pelo `Weather.razor` |
| `Layout/MainLayout.razor.css` | CSS de um layout antigo (classes `.page`, `.sidebar`, `.top-row`) que o layout MudBlazor nem usa |

**Mantenha** o `Pages/NotFound.razor`: o `App.razor` faz referência a ele (`NotFoundPage="typeof(Pages.NotFound)"`) para mostrar a página de erro 404.

### 4.2 Remova a referência ao bundle de CSS isolado

Abra `wwwroot/index.html` e **apague** esta linha:

```html
<link href="afya-admin.styles.css" rel="stylesheet" />
```

> **Aprofundando — CSS isolado (CSS isolation)**
>
> No Blazor, um arquivo `Componente.razor.css` ao lado de `Componente.razor` vira um **CSS isolado**: as regras valem **só** para aquele componente. No build, o .NET junta todos esses arquivos num único "bundle" chamado `NomeDoProjeto.styles.css`, que o `index.html` carrega.
>
> Como apagamos o único `.razor.css` do projeto, esse bundle **deixa de ser gerado**, e o navegador passaria a receber um **erro 404** ao tentar carregá-lo (você veria isso no Console). Por isso removemos o `<link>`.
>
> Se no futuro você criar algum `.razor.css`, lembre-se de **recolocar** essa linha.

### 4.3 Crie a página Dashboard (versão inicial)

Crie `Pages/Dashboard.razor`:

```razor
@page "/"

<PageTitle>Dashboard | Afya Pedagógico</PageTitle>

<MudText Typo="Typo.h4">Dashboard</MudText>
```

- `@page "/"` é a **rota**: esta página responde pela raiz do site;
- `<PageTitle>` define o texto da aba do navegador.

### 4.4 Ajuste o título da aplicação

No `wwwroot/index.html`, troque o `<title>`:

```html
<title>Afya Pedagógico | Admin</title>
```

### 4.5 Confira

Salve tudo e confira se o `dotnet watch` recompilou sem erros e se a página mostra "Dashboard". Os links "Counter" e "Weather" do menu agora levam à página 404, e vamos refazer o menu na seção 7.

> **Dica — faça commits pequenos.** Este é um ótimo momento para o primeiro commit: `git add . && git commit -m "Projeto base MudBlazor limpo"`. Se algo der errado mais adiante, você pode voltar a um ponto que funcionava.

---

## 5. A regra de ouro: estilizar sem CSS próprio

Neste projeto **não escrevemos CSS**. Parece limitante, mas é uma ótima disciplina: você aprende a usar a fundo a biblioteca de componentes, e o visual fica consistente (e o modo escuro funciona "de graça").

Temos **três ferramentas** para estilizar:

### 5.1 Parâmetros dos componentes

Quase todo o visual é controlado por parâmetros:

```razor
<MudPaper Elevation="1" Height="100%">          <!-- sombra e altura -->
<MudButton Variant="Variant.Filled" Color="Color.Primary" Size="Size.Large">
<MudAvatar Size="Size.Small" Rounded="true">
<MudChip Variant="Variant.Text" Color="Color.Success">
```

### 5.2 O tema (`MudTheme`)

Cores, fontes, tamanhos de título, arredondamento dos cantos, altura da AppBar... tudo isso vai no **tema**, num lugar só (seção 6).

### 5.3 Classes utilitárias nativas do MudBlazor

O arquivo `MudBlazor.min.css` já traz dezenas de **classes utilitárias** prontas. As que vamos usar:

| Classe | Efeito |
|---|---|
| `pa-4`, `px-3`, `py-6`, `mt-2`, `mb-4`, `mx-3`, `ma-0`... | *padding* (`p`) e *margin* (`m`) — `a` = todos os lados, `x` = horizontal, `y` = vertical, `t/b/l/r` = um lado. Cada unidade vale **4px** (`pa-4` = 16px). |
| `d-flex`, `d-none`, `d-md-flex` | `display`. `d-none d-md-flex` = **oculto** em telas pequenas e visível (flex) a partir de `md` |
| `flex-column`, `flex-grow-1` | direção do flex e "ocupar o espaço que sobrar" |
| `align-center`, `justify-center`, `justify-end`, `justify-space-evenly` | alinhamento no flex |
| `mud-width-full` | largura 100% |
| `rounded-lg` | cantos arredondados |
| `border-b`, `border-solid`, `mud-border-lines-default` | borda inferior de 1px na cor de linhas do tema |
| `cursor-pointer` | cursor de "mãozinha" |
| `mud-text-secondary` | texto na **cor secundária de texto** (cinza) do tema |
| `mud-background-gray` | fundo cinza do tema |
| `mud-primary-hover`, `mud-success-hover`... | fundo **suave** (quase transparente) na cor indicada da paleta |

> **Armadilha clássica — `Color.Secondary` NÃO é "texto cinza"**
>
> Em `<MudText Color="Color.Secondary">`, `Secondary` é a **cor secundária da paleta** (no MudBlazor padrão, um rosa; no nosso tema, roxo). Para texto cinza "de apoio", use a classe **`Class="mud-text-secondary"`**, que usa a cor `TextSecondary` do tema.

> **Aprofundando — como descobrir as classes disponíveis**
>
> 1. A documentação em **mudblazor.com** tem uma seção de utilitários (*Utilities*: spacing, display, flexbox, borders...).
> 2. Você pode abrir o próprio arquivo: com a aplicação rodando, acesse `http://localhost:<sua-porta>/_content/MudBlazor/MudBlazor.min.css` e procure (Ctrl + F) por um nome, por exemplo `.mud-success-hover`.
> 3. Use a aba **Elements** do DevTools (F12) para ver quais classes um componente gera.
>
> Um nome de classe **inexistente não dá erro de compilação**: ele simplesmente não tem efeito. Se um utilitário "não funcionou", confira se a classe realmente existe.

---

## 6. O tema da aplicação

O tema fica no `MainLayout.razor`, dentro do componente `<MudThemeProvider>`. Nesta seção vamos apenas definir o tema; o restante do layout vem na seção 7.

### 6.1 A fonte Inter

O visual do projeto usa a fonte **Inter**. No `wwwroot/index.html`, troque a linha da fonte Roboto por:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
```

(Carregar uma fonte é incluir um recurso, não escrever CSS próprio: quem aplica a fonte é o tema.)

### 6.2 O objeto `MudTheme`

No `@code` do `MainLayout.razor`, o tema é um objeto `MudTheme` com quatro partes:

```csharp
private readonly MudTheme _theme = new()
{
    PaletteLight = new PaletteLight { /* cores do modo claro */ },
    PaletteDark  = new PaletteDark  { /* cores do modo escuro */ },
    LayoutProperties = new LayoutProperties { /* medidas do layout */ },
    Typography = new Typography { /* fontes e tamanhos */ },
};
```

**Paleta do modo claro**, com o papel de cada cor:

| Propriedade | Valor | Onde aparece |
|---|---|---|
| `Primary` | `#2563EB` (azul) | botões, item ativo do menu, linha "Receita" |
| `Secondary` | `#7C3AED` (roxo) | "Usuários Ativos", "Business", "App Mobile" |
| `Tertiary` | `#60A5FA` (azul claro) | linha "Meta" |
| `Info` | `#3B82F6` | "Novos Clientes", status "Em andamento" |
| `Success` | `#10B981` (verde) | "Receita", "Startup", status "Concluído" |
| `Warning` | `#F97316` (laranja) | "Projetos Ativos", "Outros", "Sistema ERP" |
| `Error` | `#EF4444` (vermelho) | tendência negativa, badge de notificações, logo |
| `Background` | `#F4F6FB` | fundo da página (cinza-azulado) |
| `Surface`, `AppbarBackground`, `DrawerBackground` | `#FFFFFF` | cards, AppBar e sidebar brancos |
| `TextPrimary` / `TextSecondary` | `#111827` / `#6B7280` | texto principal / texto de apoio |

**`LayoutProperties`**:

- `DefaultBorderRadius = "12px"`: arredonda os cantos de **todos** os componentes;
- `AppbarHeight = "72px"`: AppBar mais alta que o padrão.

**`Typography`**:

- `Default`: fonte Inter para toda a aplicação;
- `H4`, `H5`, `H6`: títulos em **negrito (700)**;
- `Subtitle2`: semi-negrito (600), que usamos para nomes e percentuais;
- `Button`: `TextTransform = "none"` tira o CAIXA ALTA padrão dos botões do Material Design.

> **Armadilha — não altere o `Subtitle1`**
>
> Os campos de texto do MudBlazor (`MudTextField`) usam a tipografia `Subtitle1`. Se você deixar o `Subtitle1` em negrito, o texto digitado e o *placeholder* da busca também ficam em negrito.

> **Aprofundando — por que um tema em vez de CSS?**
>
> Os componentes do MudBlazor leem as cores de **variáveis CSS** geradas a partir do tema (por exemplo, `--mud-palette-primary`). Mudando o tema, **todos** os componentes mudam juntos, inclusive no modo escuro: basta definir a `PaletteDark` e alternar o `IsDarkMode`. Com CSS espalhado pelos arquivos, você teria que refazer cada regra para o modo escuro.

O código completo do tema está na seção 7.4, junto com o restante do `MainLayout.razor`.

---

## 7. O layout: sidebar e AppBar

O `MainLayout.razor` é a "moldura" que aparece em todas as páginas. A estrutura dele é esta:

```
MudLayout
├── MudAppBar          ← barra superior (começa à direita do sidebar)
├── MudDrawer          ← sidebar (logo + NavMenu)
└── MudMainContent     ← área onde as páginas (@Body) são renderizadas
```

### 7.1 O sidebar (`MudDrawer`)

```razor
<MudDrawer @bind-Open="_drawerOpen" Width="280px" Elevation="0"
           ClipMode="DrawerClipMode.Never" Variant="DrawerVariant.Responsive">
    <MudDrawerHeader Class="align-center py-6">
        <MudStack Row="true" AlignItems="AlignItems.Center" Spacing="2">
            <MudIcon Icon="@Icons.Material.Outlined.ChangeHistory" Color="Color.Error" Size="Size.Large" />
            <MudText Typo="Typo.h5">Afya Pedagógico</MudText>
        </MudStack>
    </MudDrawerHeader>
    <NavMenu />
</MudDrawer>
```

Entendendo os parâmetros:

- **`@bind-Open="_drawerOpen"`**: liga o estado aberto/fechado a uma variável. O botão "hambúrguer" da AppBar inverte essa variável.
- **`ClipMode="DrawerClipMode.Never"`**: o sidebar ocupa **a altura inteira** da tela, e a AppBar começa **à direita** dele. Por isso o logo e o título ficam no topo do sidebar, e não na AppBar.
- **`Variant="DrawerVariant.Responsive"`**: em telas médias ou maiores o sidebar fica fixo e empurra o conteúdo; em telas pequenas ele vira uma gaveta que abre **por cima** do conteúdo.
- **`Width="280px"`**: largura do sidebar.

> **Armadilha — defina a largura no `MudDrawer`, e não no tema**
>
> O tema também tem `LayoutProperties.DrawerWidthLeft`, mas, se você mudar a largura só por ali, a AppBar e o conteúdo **não acompanham**, e o sidebar fica **por cima** do conteúdo. Use o parâmetro `Width` do próprio `MudDrawer`: o `MudLayout` lê esse valor e desloca a AppBar e o conteúdo corretamente.

### 7.2 O menu (`Layout/NavMenu.razor`)

O menu é **plano**: nada de submenus (`MudNavGroup`). Os grupos são separados por `MudDivider`. Substitua todo o conteúdo do `NavMenu.razor`:

```razor
<MudNavMenu Color="Color.Primary" Rounded="true" Class="px-3">
    <MudNavLink Href="" Match="NavLinkMatch.All" Icon="@Icons.Material.Filled.GridView">Dashboard</MudNavLink>
    <MudNavLink Href="analytics" Icon="@Icons.Material.Outlined.BarChart">Analytics</MudNavLink>
    <MudNavLink Href="clientes" Icon="@Icons.Material.Outlined.People">Clientes</MudNavLink>
    <MudNavLink Href="projetos" Icon="@Icons.Material.Outlined.Folder">
        <MudStack Row="true" Justify="Justify.SpaceBetween" AlignItems="AlignItems.Center" Class="mud-width-full">
            <span>Projetos</span>
            <MudChip T="string" Size="Size.Small" Color="Color.Primary" Variant="Variant.Filled" Class="ma-0">8</MudChip>
        </MudStack>
    </MudNavLink>
    <MudNavLink Href="financeiro" Icon="@Icons.Material.Outlined.MonetizationOn">Financeiro</MudNavLink>
    <MudNavLink Href="relatorios" Icon="@Icons.Material.Outlined.Description">Relatórios</MudNavLink>

    <MudDivider Class="my-3 mx-4" />

    <MudNavLink Href="administracao" Icon="@Icons.Material.Outlined.Settings">Administração</MudNavLink>
    <MudNavLink Href="usuarios" Icon="@Icons.Material.Outlined.Group">Usuários</MudNavLink>
    <MudNavLink Href="permissoes" Icon="@Icons.Material.Outlined.Lock">Permissões</MudNavLink>
    <MudNavLink Href="integracoes" Icon="@Icons.Material.Outlined.Hub">
        <MudStack Row="true" Justify="Justify.SpaceBetween" AlignItems="AlignItems.Center" Class="mud-width-full">
            <span>Integrações</span>
            <MudChip T="string" Size="Size.Small" Color="Color.Primary" Variant="Variant.Filled" Class="ma-0">Novo</MudChip>
        </MudStack>
    </MudNavLink>

    <MudDivider Class="my-3 mx-4" />

    <MudNavLink Href="configuracoes" Icon="@Icons.Material.Outlined.Settings">Configurações</MudNavLink>
    <MudNavLink Href="ajuda" Icon="@Icons.Material.Outlined.HelpOutline">Ajuda</MudNavLink>
</MudNavMenu>
```

Pontos importantes:

- **`Color="Color.Primary"` + `Rounded="true"`**: o item da página atual fica com fundo azul suave e cantos arredondados.
- **`Match="NavLinkMatch.All"`** no Dashboard: o link `""` (raiz) só fica ativo se a URL for **exatamente** a raiz. Sem isso, ele ficaria ativo em todas as páginas, porque toda URL "começa" com `/`.
- **Badge à direita** ("8", "Novo"): o conteúdo do link é um `MudStack` em linha com `Justify.SpaceBetween` e `mud-width-full`, o que empurra o chip para a ponta direita.
- **`MudChip T="string"`**: no MudBlazor 9, o `MudChip` é **genérico** (`MudChip<T>`), então é obrigatório informar o `T`.
- Os links para outras páginas levam ao 404 por enquanto, porque essas páginas ainda não existem (veja os desafios na seção 20).

> **Aprofundando — ícones do Material Design**
>
> `Icons.Material` tem várias "famílias" do mesmo ícone: `Filled` (preenchido), `Outlined` (contorno), `Rounded`, `Sharp` e `TwoTone`. Usamos `Outlined` no menu para um visual mais leve. Para encontrar ícones, pesquise em **fonts.google.com/icons**: o nome `monetization_on` vira `Icons.Material.Outlined.MonetizationOn`.

### 7.3 A AppBar

Da esquerda para a direita:

1. **botão de menu** (hambúrguer), que abre e fecha o sidebar;
2. **divisor vertical**;
3. **breadcrumb** "Home / Dashboard";
4. **busca** centralizada (um `MudSpacer` de cada lado);
5. um grupo com **tema**, **notificações**, **divisor** e **usuário**.

```razor
<MudAppBar Elevation="0">
    <MudIconButton Icon="@Icons.Material.Filled.Menu" Color="Color.Inherit" Edge="Edge.Start" OnClick="@DrawerToggle" />
    <MudDivider Vertical="true" FlexItem="true" Class="mx-3 my-3" />
    <MudBreadcrumbs Items="_breadcrumbs" Class="d-none d-md-flex" />

    <MudSpacer />
    <MudPaper Elevation="0" Width="440px" Class="mud-background-gray rounded-lg px-3 d-none d-md-flex">
        <MudTextField T="string" @bind-Value="_busca" Placeholder="Pesquisar..." Underline="false"
                      Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Search" Margin="Margin.Dense" />
    </MudPaper>
    <MudSpacer />

    <MudStack Row="true" Spacing="1" AlignItems="AlignItems.Center">
        <!-- tema, notificações, divisor e usuário (a seguir) -->
    </MudStack>
</MudAppBar>
```

> **Dica — a busca "em pílula" sem CSS.** O `MudTextField` não tem parâmetro de largura nem de fundo. O truque é envolvê-lo num `MudPaper`, que tem o parâmetro `Width`, e usar as classes `mud-background-gray` + `rounded-lg`. O `Underline="false"` remove o sublinhado do campo.

**Alternância de tema.** É um `MudIconButton` simples (sem contorno), cujo ícone muda conforme o modo:

```razor
<MudIconButton Icon="@DarkLightModeButtonIcon" Color="Color.Inherit" OnClick="@DarkModeToggle" />
```

**Notificações.** Um `MudMenu` cujo **ativador** (o que você clica para abrir) é um sino com badge:

```razor
<MudMenu AnchorOrigin="Origin.BottomRight" TransformOrigin="Origin.TopRight">
    <ActivatorContent>
        @* padding no wrapper (e não no MudBadge) para o badge continuar colado no ícone *@
        <div class="d-flex pa-3 cursor-pointer">
            <MudBadge Content="@_notificacoes.Count" Color="Color.Error">
                <MudIcon Icon="@Icons.Material.Outlined.Notifications" Size="Size.Medium" />
            </MudBadge>
        </div>
    </ActivatorContent>
    <ChildContent>
        <MudText Typo="Typo.subtitle2" Class="px-4 pt-2 pb-1">Notificações</MudText>
        <MudDivider Class="mb-1" />
        @foreach (var notificacao in _notificacoes)
        {
            <MudMenuItem>
                <MudText Typo="Typo.body2">@notificacao.Titulo</MudText>
                <MudText Typo="Typo.caption" Class="mud-text-secondary">@notificacao.Tempo</MudText>
            </MudMenuItem>
        }
    </ChildContent>
</MudMenu>
```

> **Aprofundando — por que não um `MudIconButton` dentro do badge?**
>
> O `MudBadge` posiciona o número em relação à **caixa do seu conteúdo**. Um `MudIconButton` tem 12px de *padding* em volta do ícone, e o badge acaba ficando longe do sino. Colocando um `MudIcon` "puro" dentro do badge, o número fica colado no canto do ícone. O `div.pa-3` **em volta** do badge devolve a mesma área de clique (48px) de um botão e alinha o espaçamento com o ícone de tema.

**Divisor + menu do usuário.** A foto do usuário é um arquivo estático. Crie a pasta `wwwroot/img` e coloque nela uma foto quadrada chamada `alex-morgan.jpg`. Uma fonte de retratos fictícios é o site randomuser.me (por exemplo, `https://randomuser.me/api/portraits/men/32.jpg`).

```razor
<MudDivider Vertical="true" FlexItem="true" Class="mx-3 my-4" />

<MudMenu AnchorOrigin="Origin.BottomRight" TransformOrigin="Origin.TopRight">
    <ActivatorContent>
        <MudStack Row="true" AlignItems="AlignItems.Center" Spacing="2">
            <MudAvatar Size="Size.Large">
                <MudImage Src="img/alex-morgan.jpg" Alt="Alex Morgan" />
            </MudAvatar>
            <MudStack Spacing="0" Class="d-none d-md-flex">
                <MudStack Row="true" Spacing="2" AlignItems="AlignItems.Center">
                    <MudText Typo="Typo.subtitle2">Alex Morgan</MudText>
                    <MudChip T="string" Size="Size.Small" Color="Color.Success" Variant="Variant.Text" Class="ma-0">Online</MudChip>
                </MudStack>
                <MudText Typo="Typo.caption" Class="mud-text-secondary">alex.morgan@afya.com.br</MudText>
            </MudStack>
            <MudIcon Icon="@Icons.Material.Filled.KeyboardArrowDown" Size="Size.Small" />
        </MudStack>
    </ActivatorContent>
    <ChildContent>
        <MudMenuItem Icon="@Icons.Material.Outlined.Person">Perfil</MudMenuItem>
        <MudMenuItem Icon="@Icons.Material.Outlined.Settings">Configurações</MudMenuItem>
        <MudDivider />
        <MudMenuItem Icon="@Icons.Material.Outlined.Logout">Sair</MudMenuItem>
    </ChildContent>
</MudMenu>
```

> **Dica — caminhos de arquivos estáticos.** Tudo o que está em `wwwroot` é servido a partir da raiz do site. Assim, `wwwroot/img/alex-morgan.jpg` é acessado como `img/alex-morgan.jpg`, **sem** o `wwwroot`. Se a foto não aparecer, olhe a aba Network do DevTools: um 404 indica caminho ou nome de arquivo errado (atenção a maiúsculas e minúsculas).

### 7.4 O `MainLayout.razor` completo

Substitua **todo** o conteúdo do `Layout/MainLayout.razor`:

```razor
@inherits LayoutComponentBase

<MudThemeProvider Theme="@_theme" IsDarkMode="_isDarkMode" />
<MudPopoverProvider />
<MudDialogProvider />
<MudSnackbarProvider />

<MudLayout>
    <MudAppBar Elevation="0">
        <MudIconButton Icon="@Icons.Material.Filled.Menu" Color="Color.Inherit" Edge="Edge.Start" OnClick="@DrawerToggle" />
        <MudDivider Vertical="true" FlexItem="true" Class="mx-3 my-3" />
        <MudBreadcrumbs Items="_breadcrumbs" Class="d-none d-md-flex" />

        <MudSpacer />
        <MudPaper Elevation="0" Width="440px" Class="mud-background-gray rounded-lg px-3 d-none d-md-flex">
            <MudTextField T="string" @bind-Value="_busca" Placeholder="Pesquisar..." Underline="false"
                          Adornment="Adornment.Start" AdornmentIcon="@Icons.Material.Filled.Search" Margin="Margin.Dense" />
        </MudPaper>
        <MudSpacer />

        <MudStack Row="true" Spacing="1" AlignItems="AlignItems.Center">
            <MudIconButton Icon="@DarkLightModeButtonIcon" Color="Color.Inherit" OnClick="@DarkModeToggle" />

            <MudMenu AnchorOrigin="Origin.BottomRight" TransformOrigin="Origin.TopRight">
                <ActivatorContent>
                    @* padding no wrapper (e não no MudBadge) para o badge continuar colado no ícone *@
                    <div class="d-flex pa-3 cursor-pointer">
                        <MudBadge Content="@_notificacoes.Count" Color="Color.Error">
                            <MudIcon Icon="@Icons.Material.Outlined.Notifications" Size="Size.Medium" />
                        </MudBadge>
                    </div>
                </ActivatorContent>
                <ChildContent>
                    <MudText Typo="Typo.subtitle2" Class="px-4 pt-2 pb-1">Notificações</MudText>
                    <MudDivider Class="mb-1" />
                    @foreach (var notificacao in _notificacoes)
                    {
                        <MudMenuItem>
                            <MudText Typo="Typo.body2">@notificacao.Titulo</MudText>
                            <MudText Typo="Typo.caption" Class="mud-text-secondary">@notificacao.Tempo</MudText>
                        </MudMenuItem>
                    }
                </ChildContent>
            </MudMenu>

            <MudDivider Vertical="true" FlexItem="true" Class="mx-3 my-4" />

            <MudMenu AnchorOrigin="Origin.BottomRight" TransformOrigin="Origin.TopRight">
                <ActivatorContent>
                    <MudStack Row="true" AlignItems="AlignItems.Center" Spacing="2">
                        <MudAvatar Size="Size.Large">
                            <MudImage Src="img/alex-morgan.jpg" Alt="Alex Morgan" />
                        </MudAvatar>
                        <MudStack Spacing="0" Class="d-none d-md-flex">
                            <MudStack Row="true" Spacing="2" AlignItems="AlignItems.Center">
                                <MudText Typo="Typo.subtitle2">Alex Morgan</MudText>
                                <MudChip T="string" Size="Size.Small" Color="Color.Success" Variant="Variant.Text" Class="ma-0">Online</MudChip>
                            </MudStack>
                            <MudText Typo="Typo.caption" Class="mud-text-secondary">alex.morgan@afya.com.br</MudText>
                        </MudStack>
                        <MudIcon Icon="@Icons.Material.Filled.KeyboardArrowDown" Size="Size.Small" />
                    </MudStack>
                </ActivatorContent>
                <ChildContent>
                    <MudMenuItem Icon="@Icons.Material.Outlined.Person">Perfil</MudMenuItem>
                    <MudMenuItem Icon="@Icons.Material.Outlined.Settings">Configurações</MudMenuItem>
                    <MudDivider />
                    <MudMenuItem Icon="@Icons.Material.Outlined.Logout">Sair</MudMenuItem>
                </ChildContent>
            </MudMenu>
        </MudStack>
    </MudAppBar>

    <MudDrawer @bind-Open="_drawerOpen" Width="280px" Elevation="0" ClipMode="DrawerClipMode.Never" Variant="DrawerVariant.Responsive">
        <MudDrawerHeader Class="align-center py-6">
            <MudStack Row="true" AlignItems="AlignItems.Center" Spacing="2">
                <MudIcon Icon="@Icons.Material.Outlined.ChangeHistory" Color="Color.Error" Size="Size.Large" />
                <MudText Typo="Typo.h5">Afya Pedagógico</MudText>
            </MudStack>
        </MudDrawerHeader>
        <NavMenu />
    </MudDrawer>

    <MudMainContent>
        <MudContainer MaxWidth="MaxWidth.False" Class="py-6">
            @Body
        </MudContainer>
    </MudMainContent>
</MudLayout>

@code {
    private bool _drawerOpen = true;
    private bool _isDarkMode;
    private string? _busca;

    private readonly List<BreadcrumbItem> _breadcrumbs = new()
    {
        new BreadcrumbItem("Home", "/", false, null),
        new BreadcrumbItem("Dashboard", null, true, null),
    };

    private record Notificacao(string Titulo, string Tempo);

    private readonly List<Notificacao> _notificacoes = new()
    {
        new("Mariana Souza adicionou um novo cliente", "há 5 minutos"),
        new("Ana Martins publicou um novo relatório", "há 45 minutos"),
        new("João Silva atualizou as permissões do sistema", "há 1 hora"),
    };

    private void DrawerToggle() => _drawerOpen = !_drawerOpen;

    private void DarkModeToggle() => _isDarkMode = !_isDarkMode;

    private string DarkLightModeButtonIcon => _isDarkMode ? Icons.Material.Outlined.DarkMode : Icons.Material.Outlined.LightMode;

    private readonly MudTheme _theme = new()
    {
        PaletteLight = new PaletteLight
        {
            Primary = "#2563EB",
            Secondary = "#7C3AED",
            Tertiary = "#60A5FA",
            Info = "#3B82F6",
            Success = "#10B981",
            Warning = "#F97316",
            Error = "#EF4444",
            Background = "#F4F6FB",
            BackgroundGray = "#F1F3F7",
            Surface = "#FFFFFF",
            AppbarBackground = "#FFFFFF",
            AppbarText = "#1F2937",
            DrawerBackground = "#FFFFFF",
            DrawerText = "#374151",
            DrawerIcon = "#4B5563",
            TextPrimary = "#111827",
            TextSecondary = "#6B7280",
            LinesDefault = "#E5E7EB",
            TableLines = "#EEF0F4",
            Divider = "#E5E7EB",
        },
        PaletteDark = new PaletteDark
        {
            Primary = "#3B82F6",
            Secondary = "#8B5CF6",
            Tertiary = "#93C5FD",
            Info = "#60A5FA",
            Success = "#34D399",
            Warning = "#FB923C",
            Error = "#F87171",
            Background = "#111827",
            BackgroundGray = "#1F2937",
            Surface = "#1A2233",
            AppbarBackground = "#1A2233",
            AppbarText = "#E5E7EB",
            DrawerBackground = "#1A2233",
            DrawerText = "#D1D5DB",
            DrawerIcon = "#9CA3AF",
            TextPrimary = "#F3F4F6",
            TextSecondary = "#9CA3AF",
            LinesDefault = "#2D3748",
            TableLines = "#2D3748",
            Divider = "#2D3748",
        },
        LayoutProperties = new LayoutProperties
        {
            DefaultBorderRadius = "12px",
            AppbarHeight = "72px",
        },
        Typography = new Typography
        {
            Default = new DefaultTypography { FontFamily = new[] { "Inter", "Roboto", "Helvetica", "Arial", "sans-serif" } },
            H4 = new H4Typography { FontWeight = "700", FontSize = "2rem" },
            H5 = new H5Typography { FontWeight = "700", FontSize = "1.375rem" },
            H6 = new H6Typography { FontWeight = "700", FontSize = "1.125rem" },
            Subtitle2 = new Subtitle2Typography { FontWeight = "600" },
            Button = new ButtonTypography { TextTransform = "none", FontWeight = "600" },
        },
    };
}
```

> **Aprofundando — os "providers" no topo do layout**
>
> `MudThemeProvider`, `MudPopoverProvider`, `MudDialogProvider` e `MudSnackbarProvider` são componentes "de infraestrutura":
>
> - o **ThemeProvider** gera as variáveis CSS do tema;
> - o **PopoverProvider** é o lugar onde menus e *dropdowns* são desenhados, por cima de tudo. **Sem ele, os `MudMenu` não abrem**;
> - o **DialogProvider** e o **SnackbarProvider** servem para diálogos e notificações *toast*.
>
> Eles precisam aparecer **uma vez**, no layout.

> **Aprofundando — `record`**
>
> `private record Notificacao(string Titulo, string Tempo);` declara, numa linha, uma classe **imutável** com duas propriedades e um construtor. Records são ideais para **dados**: comparação por valor, `ToString()` legível e nenhum código repetitivo. Vamos usá-los bastante na seção 8.

**Checkpoint:** salve e confira o sidebar com o logo, o menu com os separadores, a AppBar com a busca centralizada e o botão de tema alternando entre claro e escuro. Se o `dotnet watch` pedir, reinicie a aplicação (alterações no `_theme` exigem isso).

---

## 8. Organizando o código: pastas `Data` e `Components`

Poderíamos escrever o dashboard inteiro num único arquivo `Dashboard.razor`, mas ele teria mais de 400 linhas e seria difícil de manter. Vamos separar:

```
afya-admin/
├── Data/
│   └── DashboardData.cs        ← modelos (records) e dados fake
├── Components/
│   ├── Ui.cs                   ← funções auxiliares de apresentação
│   ├── DashboardCard.razor     ← card base reutilizável
│   ├── CabecalhoPagina.razor
│   ├── SeletorPeriodo.razor
│   ├── KpiCard.razor
│   ├── GraficoReceita.razor
│   ├── GraficoDistribuicaoClientes.razor
│   ├── PerformanceProjetos.razor
│   ├── AtividadesRecentes.razor
│   └── ProjetosRecentes.razor
└── Pages/
    └── Dashboard.razor         ← só "monta" os componentes
```

> **Aprofundando — separar dados de apresentação**
>
> - **`Data`** responde "**o quê**" mostrar: números, nomes, cores de cada item.
> - **`Components`** responde "**como**" mostrar: layout, gráficos, tipografia.
>
> Quando os dados vierem de uma API de verdade, você troca apenas a origem dos dados. Os componentes continuam iguais, porque recebem os dados por **parâmetros**.

### 8.1 Registrando os namespaces

Para usar `DashboardCard`, `Kpi`, etc. sem precisar escrever `@using` em cada arquivo, adicione duas linhas ao **`_Imports.razor`** (logo após `@using afya_admin.Layout`):

```razor
@using afya_admin.Components
@using afya_admin.Data
```

Tudo o que está no `_Imports.razor` vale para **todos** os `.razor` da pasta e das subpastas.

### 8.2 Os dados fake: `Data/DashboardData.cs`

Crie a pasta `Data` e o arquivo `DashboardData.cs`:

```csharp
using MudBlazor;

namespace afya_admin.Data;

public record Kpi(string Titulo, string Valor, string Variacao, bool Positivo, string Icone, Color Cor, string CorHex, double[] Tendencia);

public record SegmentoCliente(string Nome, int Percentual, Color Cor, string CorHex);

public record ProjetoPerformance(string Nome, string Icone, Color Cor, int Percentual, int TarefasConcluidas, int TarefasTotal);

public record Atividade(string Nome, string Acao, string Tempo, string Icone, Color Cor);

public record ProjetoRecente(string Nome, string Icone, Color Cor, string Cliente, string Responsavel,
                             string Status, Color StatusCor, int Progresso, string Prazo);

public static class DashboardData
{
    public static readonly string[] Periodos = { "Últimos 7 dias", "Últimos 30 dias", "Últimos 90 dias", "Personalizado" };

    public static readonly List<Kpi> Kpis = new()
    {
        new("Receita", "R$ 248.500", "+12,5%", true, Icons.Material.Filled.AttachMoney, Color.Success, "#10B981",
            new double[] { 10, 14, 12, 18, 16, 21, 19, 24, 23, 29 }),
        new("Usuários Ativos", "12.842", "+8,2%", true, Icons.Material.Filled.Groups, Color.Secondary, "#7C3AED",
            new double[] { 8, 11, 9, 14, 12, 17, 15, 21, 18, 16 }),
        new("Novos Clientes", "384", "+16,6%", true, Icons.Material.Filled.PeopleAlt, Color.Info, "#3B82F6",
            new double[] { 6, 9, 8, 12, 14, 13, 17, 16, 19, 18 }),
        new("Projetos Ativos", "27", "-2,4%", false, Icons.Material.Filled.Folder, Color.Warning, "#F97316",
            new double[] { 12, 15, 19, 16, 18, 15, 17, 14, 15, 12 }),
    };

    public static readonly string[] Meses = { "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set" };
    public static readonly double[] ReceitaMensal = { 70000, 117000, 112000, 135000, 165000, 168000, 182000, 212000, 248500 };
    public static readonly double[] MetaMensal = { 25000, 45000, 52000, 68000, 95000, 97000, 118000, 152000, 185000 };

    public const int TotalClientes = 1842;

    public static readonly List<SegmentoCliente> SegmentosClientes = new()
    {
        new("Empresas", 42, Color.Primary, "#2563EB"),
        new("Business", 31, Color.Secondary, "#7C3AED"),
        new("Startup", 18, Color.Success, "#10B981"),
        new("Outros", 9, Color.Warning, "#F97316"),
    };

    public static readonly List<ProjetoPerformance> Performance = new()
    {
        new("Website Corporativo", Icons.Material.Outlined.DesktopWindows, Color.Primary, 83, 34, 41),
        new("App Mobile", Icons.Material.Outlined.PhoneIphone, Color.Secondary, 68, 27, 41),
        new("Migração Cloud", Icons.Material.Outlined.Cloud, Color.Success, 92, 46, 50),
        new("Sistema ERP", Icons.Material.Outlined.Storage, Color.Warning, 54, 27, 50),
    };

    public static readonly List<Atividade> Atividades = new()
    {
        new("Mariana Souza", "adicionou um novo cliente", "há 5 minutos", Icons.Material.Filled.ArrowUpward, Color.Primary),
        new("Carlos Lima", "finalizou a revisão Website Corporativo", "há 18 minutos", Icons.Material.Filled.Check, Color.Success),
        new("Ana Martins", "publicou um novo relatório", "há 45 minutos", Icons.Material.Filled.Description, Color.Secondary),
        new("João Silva", "atualizou as permissões do sistema", "há 1 hora", Icons.Material.Filled.Settings, Color.Warning),
    };

    public static readonly List<ProjetoRecente> ProjetosRecentes = new()
    {
        new("Portal Institucional", Icons.Material.Outlined.DesktopWindows, Color.Primary, "TechCorp", "Mariana Souza", "Em andamento", Color.Info, 72, "25 Set"),
        new("Aplicativo Mobile", Icons.Material.Outlined.PhoneIphone, Color.Secondary, "Nova Digital", "Carlos Lima", "Em revisão", Color.Warning, 90, "28 Set"),
        new("Migração Cloud", Icons.Material.Outlined.Cloud, Color.Success, "CloudSystems", "Ana Martins", "Concluído", Color.Success, 100, "20 Set"),
        new("Sistema ERP", Icons.Material.Outlined.Storage, Color.Warning, "Alpha Group", "João Silva", "Em andamento", Color.Info, 48, "15 Out"),
    };
}
```

> **Aprofundando — por que `Cor` **e** `CorHex`?**
>
> Os componentes MudBlazor (`MudAvatar`, `MudIcon`, `MudProgressLinear`...) recebem cores do tipo **`Color`** (um `enum`: `Color.Primary`, `Color.Success`...), que apontam para a paleta do tema. Já os **gráficos** (`ChartPalette`) recebem cores em **hexadecimal** (`"#10B981"`). Por isso guardamos as duas formas. Repare que os hexadecimais são **os mesmos** da paleta clara do tema, para o gráfico e o restante da página "combinarem".

> **Aprofundando — `namespace afya_admin.Data;`**
>
> Essa é a sintaxe de **namespace de arquivo** (*file-scoped namespace*, C# 10+): vale para o arquivo inteiro, sem precisar de chaves nem de um nível extra de indentação.

### 8.3 Funções auxiliares: `Components/Ui.cs`

Duas funções pequenas que vários componentes usam. Crie a pasta `Components` e o arquivo `Ui.cs`:

```csharp
using MudBlazor;

namespace afya_admin.Components;

public static class Ui
{
    // mud-{cor}-hover é uma classe utilitária do MudBlazor que aplica o fundo suave da cor da paleta
    public static string FundoSuave(Color cor) => $"mud-{cor.ToString().ToLowerInvariant()}-hover";

    public static string Iniciais(string nome)
    {
        var partes = nome.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        return partes.Length switch
        {
            0 => "?",
            1 => partes[0][..1].ToUpperInvariant(),
            _ => $"{partes[0][0]}{partes[^1][0]}".ToUpperInvariant(),
        };
    }
}
```

- **`FundoSuave(Color.Success)`** devolve `"mud-success-hover"`: o fundo verde bem clarinho que aparece atrás dos ícones dos KPIs. É assim que conseguimos "ícone colorido sobre um círculo pastel" **sem CSS**.
- **`Iniciais("Mariana Souza")`** devolve `"MS"`, usado nos avatares sem foto.

> **Aprofundando — índices e intervalos do C#**
>
> `partes[^1]` significa "o **último** elemento" (o `^` conta a partir do fim) e `partes[0][..1]` significa "da posição 0 **até** a 1", ou seja, o primeiro caractere como `string`. O `switch` com `=>` é uma **switch expression**, uma forma compacta de escolher um valor.

---

## 9. Cabeçalho da página e seletor de período

### 9.1 `Components/CabecalhoPagina.razor`

O título "Dashboard" com o subtítulo à esquerda e os botões à direita:

```razor
<MudStack Row="true" Justify="Justify.SpaceBetween" AlignItems="AlignItems.Center" Wrap="Wrap.Wrap" Class="mb-4">
    <div>
        <MudText Typo="Typo.h4">@Titulo</MudText>
        <MudText Typo="Typo.body1" Class="mud-text-secondary">@Subtitulo</MudText>
    </div>
    <MudStack Row="true" Spacing="3" AlignItems="AlignItems.Center">
        @Acoes
    </MudStack>
</MudStack>

@code {
    [Parameter, EditorRequired] public string Titulo { get; set; } = "";
    [Parameter] public string? Subtitulo { get; set; }
    [Parameter] public RenderFragment? Acoes { get; set; }
}
```

> **Aprofundando — `[Parameter]`, `EditorRequired` e `RenderFragment`**
>
> - **`[Parameter]`** transforma uma propriedade em um "atributo" do componente: `<CabecalhoPagina Titulo="Dashboard" />`.
> - **`EditorRequired`** faz o compilador **avisar** se alguém usar o componente sem informar aquele parâmetro.
> - **`RenderFragment`** é um parâmetro que recebe **um pedaço de marcação** (HTML e componentes). É assim que criamos "buracos" (*slots*) que quem usa o componente preenche:
>
> ```razor
> <CabecalhoPagina Titulo="Dashboard">
>     <Acoes>
>         <MudButton>...</MudButton>   <!-- isto vira o RenderFragment "Acoes" -->
>     </Acoes>
> </CabecalhoPagina>
> ```
>
> O `Wrap="Wrap.Wrap"` faz os botões "descerem" para a linha de baixo em telas estreitas, em vez de espremer o título.

### 9.2 `Components/SeletorPeriodo.razor`

Um menu com cara de botão ("Últimos 30 dias ⌄") que permite escolher o período:

```razor
<MudMenu Label="@Valor" Variant="Variant.Outlined" Color="Color.Default" Size="Size.Large"
         StartIcon="@Icons.Material.Outlined.CalendarToday" EndIcon="@Icons.Material.Filled.KeyboardArrowDown"
         AnchorOrigin="Origin.BottomRight" TransformOrigin="Origin.TopRight">
    @foreach (var opcao in Opcoes)
    {
        <MudMenuItem OnClick="@(() => SelecionarAsync(opcao))">@opcao</MudMenuItem>
    }
</MudMenu>

@code {
    [Parameter, EditorRequired] public IReadOnlyList<string> Opcoes { get; set; } = Array.Empty<string>();
    [Parameter] public string Valor { get; set; } = "";
    [Parameter] public EventCallback<string> ValorChanged { get; set; }

    private Task SelecionarAsync(string opcao) => ValorChanged.InvokeAsync(opcao);
}
```

> **Aprofundando — como criar um componente com `@bind-`**
>
> O Blazor segue uma **convenção**: se um componente tem um parâmetro `X` e um `EventCallback<T>` chamado **`XChanged`**, então quem o usa pode escrever **`@bind-X="variavel"`**. O Blazor passa o valor para dentro (`Valor`) e, quando o componente dispara `ValorChanged`, atualiza a variável de quem o usa. Aqui usaremos `<SeletorPeriodo @bind-Valor="_periodo" />`.
>
> Repare que o componente **não altera** o próprio `Valor`: ele apenas **avisa** quem o usa (`ValorChanged.InvokeAsync`). O "dono" do estado é a página.

> **Dica — `MudMenu` com `Label`.** Quando você informa `Label` (e opcionalmente `Variant`, `StartIcon` e `EndIcon`), o `MudMenu` cria **sozinho** um botão para abrir o menu. Quando precisa de um ativador personalizado (como o sino com badge), use `<ActivatorContent>`.

### 9.3 Usando na página

Atualize o `Pages/Dashboard.razor`:

```razor
@page "/"

<PageTitle>Dashboard | Afya Pedagógico</PageTitle>

<CabecalhoPagina Titulo="Dashboard" Subtitulo="Visão geral da plataforma e indicadores de desempenho.">
    <Acoes>
        <SeletorPeriodo Opcoes="DashboardData.Periodos" @bind-Valor="_periodo" />
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Size="Size.Large" StartIcon="@Icons.Material.Filled.Add">Novo Projeto</MudButton>
    </Acoes>
</CabecalhoPagina>

@code {
    private string _periodo = "Últimos 30 dias";
}
```

**Checkpoint:** escolha outro período no menu e veja o texto do botão mudar.

---

## 10. O card base reutilizável: `DashboardCard`

Cinco blocos do dashboard têm a **mesma estrutura**: um card branco com título, subtítulo opcional, algo à direita (legenda ou botão), um menu "⋮" e o conteúdo. Em vez de repetir essa marcação cinco vezes, criamos um componente base.

Crie `Components/DashboardCard.razor`:

```razor
<MudPaper Elevation="1" Class="pa-4 d-flex flex-column" Height="100%">
    <MudStack Row="true" AlignItems="AlignItems.Start" Class="mb-2">
        <div class="flex-grow-1">
            <MudText Typo="Typo.h6">@Titulo</MudText>
            @if (!string.IsNullOrEmpty(Subtitulo))
            {
                <MudText Typo="Typo.body2" Class="mud-text-secondary">@Subtitulo</MudText>
            }
        </div>
        @Acoes
        @if (Menu is not null)
        {
            <MudMenu Icon="@Icons.Material.Filled.MoreVert" Size="Size.Small" Dense="true">
                @Menu
            </MudMenu>
        }
    </MudStack>
    @* ocupa a altura restante do card, para o conteúdo poder se distribuir verticalmente *@
    <div class="flex-grow-1 d-flex flex-column">
        @ChildContent
    </div>
</MudPaper>

@code {
    [Parameter, EditorRequired] public string Titulo { get; set; } = "";
    [Parameter] public string? Subtitulo { get; set; }
    [Parameter] public RenderFragment? Acoes { get; set; }
    [Parameter] public RenderFragment? Menu { get; set; }
    [Parameter] public RenderFragment? ChildContent { get; set; }
}
```

Pontos importantes:

- **`Height="100%"`**: os cards lado a lado na mesma linha ficam com **a mesma altura** (a do mais alto).
- **`div.flex-grow-1`** no título: empurra as ações e o menu para a direita.
- **O menu "⋮" só aparece se o slot `Menu` for informado** (`@if (Menu is not null)`).
- **`ChildContent`** tem um nome especial: é o que fica **entre** as tags do componente quando não se usa nenhum outro slot.
- **O card é uma coluna flex** (`d-flex flex-column`) e o conteúdo fica num `div.flex-grow-1`. Assim, o conteúdo ocupa **toda a altura que sobra** no card, e isso vai ser essencial na seção 14.

> **Aprofundando — por que `d-flex flex-column` + `flex-grow-1`?**
>
> Num container flex em coluna, um filho com `flex-grow: 1` "estica" para ocupar o espaço vertical livre. Sem isso, o conteúdo teria só a altura necessária, e um espaço vazio sobraria embaixo. Com isso, os componentes internos podem **distribuir** as linhas pelo card inteiro.

---

## 11. Cards de KPI com sparkline

Cada KPI tem um ícone num círculo suave, o título, o valor, a variação (verde ou vermelha) e um mini gráfico de tendência, chamado **sparkline**.

### 11.1 A nova API de gráficos do MudBlazor 9

Antes de escrever o componente, entenda como os gráficos funcionam **nesta versão**:

```razor
<MudChart T="double"
          ChartType="ChartType.Line"
          ChartSeries="_series"
          ChartLabels="_rotulos"
          ChartOptions="_opcoes"
          Width="110px" Height="50px" />
```

| Parâmetro | Tipo | Significado |
|---|---|---|
| `T` | tipo dos valores | `double` |
| `ChartType` | `ChartType` | `Line`, `Donut`, `Pie`, `Bar`, `StackedBar`... |
| `ChartSeries` | `List<ChartSeries<double>>` | as séries de dados (cada linha do gráfico) |
| `ChartLabels` | `string[]` | rótulos do eixo X (ou das fatias, no donut) |
| `ChartOptions` | `LineChartOptions`, `DonutChartOptions`... | opções **específicas de cada tipo** de gráfico |

Cada série é um `ChartSeries<double>`:

```csharp
new ChartSeries<double> { Name = "Receita", Data = new double[] { 70000, 117000, 112000 } }
```

A propriedade `Data` é do tipo `ChartData<double>`, mas aceita um `double[]` diretamente graças a uma **conversão implícita**.

> **Atenção — exemplos antigos da internet**
>
> Em versões anteriores do MudBlazor, os gráficos usavam `XAxisLabels`, `InputData`, `InputLabels` e `ChartSeries` não genérico. **Nada disso existe na versão 9.** Se você copiar um exemplo antigo, vai receber erros de compilação. Quando estiver em dúvida, consulte a documentação da **versão que você está usando**.

### 11.2 `Components/KpiCard.razor`

```razor
<MudPaper Elevation="1" Class="pa-4" Height="100%">
    <MudStack Row="true" Spacing="3" AlignItems="AlignItems.Center">
        <MudAvatar Size="Size.Large" Class="@Ui.FundoSuave(Kpi.Cor)">
            <MudIcon Icon="@Kpi.Icone" Color="@Kpi.Cor" />
        </MudAvatar>
        <div>
            <MudText Typo="Typo.body2" Class="mud-text-secondary">@Kpi.Titulo</MudText>
            <MudText Typo="Typo.h5">@Kpi.Valor</MudText>
        </div>
    </MudStack>
    <MudStack Row="true" Justify="Justify.SpaceBetween" AlignItems="AlignItems.End" Class="mt-2">
        <div>
            <MudStack Row="true" Spacing="1" AlignItems="AlignItems.Center">
                <MudIcon Icon="@(Kpi.Positivo ? Icons.Material.Filled.TrendingUp : Icons.Material.Filled.TrendingDown)"
                         Color="@CorTendencia" Size="Size.Small" />
                <MudText Typo="Typo.h6" Color="@CorTendencia">@Kpi.Variacao</MudText>
            </MudStack>
            <MudText Typo="Typo.caption" Class="mud-text-secondary">comparado ao mês anterior.</MudText>
        </div>
        <MudChart T="double" ChartType="ChartType.Line" Width="110px" Height="50px"
                  ChartSeries="_series" ChartLabels="_rotulos" ChartOptions="_opcoes" />
    </MudStack>
</MudPaper>

@code {
    [Parameter, EditorRequired] public Kpi Kpi { get; set; } = default!;

    private List<ChartSeries<double>> _series = new();
    private string[] _rotulos = Array.Empty<string>();
    private LineChartOptions _opcoes = new();

    private Color CorTendencia => Kpi.Positivo ? Color.Success : Color.Error;

    protected override void OnParametersSet()
    {
        var serie = new ChartSeries<double> { Name = Kpi.Titulo, Data = Kpi.Tendencia };
        _series = new() { serie };
        _rotulos = Enumerable.Repeat("", Kpi.Tendencia.Length).ToArray();
        _opcoes = new LineChartOptions
        {
            ChartPalette = new[] { Kpi.CorHex },
            ShowLegend = false,
            ShowToolTips = false,
            YAxisLines = false,
            XAxisLines = false,
            YAxisToStringFunc = _ => "",
            YAxisRequireZeroPoint = false,
            // o SVG do sparkline é reduzido ~6x para caber em 110px; traço 12 resulta em ~2px na tela
            LineStrokeWidth = 12,
            SeriesDisplayOverrides = new Dictionary<IChartSeries, MudBlazor.Charts.SeriesDisplayOverride>
            {
                [serie] = new() { LineDisplayType = LineDisplayType.Area, FillOpacity = 0.15, StrokeOpacity = 1 },
            },
        };
    }
}
```

**O ícone "pastel".** Um `MudAvatar` com a classe `mud-success-hover` (via `Ui.FundoSuave`) ganha um **fundo claro** na cor da paleta; o `MudIcon` dentro dele recebe a cor "cheia". O resultado é o círculo suave com o ícone colorido, sem nenhum CSS.

**Transformando o gráfico num sparkline.** Um sparkline é um gráfico de linha **sem nada em volta**:

| Opção | Efeito |
|---|---|
| `ShowLegend = false`, `ShowToolTips = false` | sem legenda e sem balão ao passar o mouse |
| `YAxisLines = false`, `XAxisLines = false` | sem linhas de grade |
| `YAxisToStringFunc = _ => ""` | rótulos do eixo Y vazios |
| `_rotulos` com strings vazias | rótulos do eixo X vazios (a quantidade precisa ser igual à de pontos) |
| `YAxisRequireZeroPoint = false` | o eixo Y **não** começa no zero, e a curva ocupa toda a altura em vez de ficar achatada |
| `SeriesDisplayOverrides` com `LineDisplayType.Area` | preenche a área sob a linha (`FillOpacity = 0.15`), mantendo o traço visível (`StrokeOpacity = 1`) |

> **Aprofundando — por que `LineStrokeWidth = 12`?**
>
> O `MudChart` desenha num sistema de coordenadas interno (o `viewBox` do SVG) bem maior que 110×50px e depois **reduz** o desenho para caber no tamanho pedido. Com o traço padrão de 3, a linha reduzida ficaria com menos de 1px, quase invisível. Com 12, ela fica com cerca de 2px na tela.
>
> Existe o parâmetro `MatchBoundsToSize="true"`, que faz o SVG usar o tamanho real (sem redução). Ele é ótimo para gráficos grandes (seção 12), mas num sparkline de 50px de altura o espaço reservado para os eixos "come" quase toda a área útil.

> **Aprofundando — `OnParametersSet`**
>
> É um método do **ciclo de vida** do componente, executado sempre que ele recebe parâmetros (na primeira renderização e quando o pai passa valores novos). Montamos a série e as opções **aqui**, e não na declaração do campo, porque elas **dependem** do parâmetro `Kpi`, que ainda não existe quando os campos são inicializados.

### 11.3 Usando na página

No `Dashboard.razor`, após o `</CabecalhoPagina>`, adicione um `MudGrid`:

```razor
<MudGrid Spacing="3">
    @foreach (var kpi in DashboardData.Kpis)
    {
        <MudItem xs="12" sm="6" lg="3">
            <KpiCard Kpi="kpi" />
        </MudItem>
    }
</MudGrid>
```

> **Aprofundando — o grid responsivo de 12 colunas**
>
> O `MudGrid` divide a largura em **12 colunas**. Cada `MudItem` diz quantas colunas ocupa **em cada tamanho de tela**:
>
> | Breakpoint | Largura da tela | `xs="12" sm="6" lg="3"` |
> |---|---|---|
> | `xs` | < 600px (celular) | 12/12: **1 card por linha** |
> | `sm` | ≥ 600px (tablet) | 6/12: **2 cards por linha** |
> | `lg` | ≥ 1280px (desktop) | 3/12: **4 cards por linha** |
>
> O valor vale "daquele tamanho para cima", até ser sobrescrito. `Spacing="3"` define o espaço entre os itens (3 × 4px = 12px).

**Checkpoint:** os 4 KPIs aparecem lado a lado. Diminua a janela e veja-os passarem para 2 e depois para 1 por linha.

---

## 12. Gráfico de linha: Receita e Crescimento

Crie `Components/GraficoReceita.razor`:

```razor
<DashboardCard Titulo="Receita e Crescimento" Subtitulo="Desempenho financeiro nos últimos meses">
    <Acoes>
        <MudStack Row="true" Spacing="4" AlignItems="AlignItems.Center" Class="mt-2">
            <MudStack Row="true" Spacing="1" AlignItems="AlignItems.Center">
                <MudIcon Icon="@Icons.Material.Filled.Circle" Color="Color.Primary" Size="Size.Small" />
                <MudText Typo="Typo.body2">Receita</MudText>
            </MudStack>
            <MudStack Row="true" Spacing="1" AlignItems="AlignItems.Center">
                <MudIcon Icon="@Icons.Material.Filled.Remove" Color="Color.Tertiary" Size="Size.Small" />
                <MudText Typo="Typo.body2">Meta</MudText>
            </MudStack>
        </MudStack>
    </Acoes>
    <Menu>
        <MudMenuItem>Exportar dados</MudMenuItem>
        <MudMenuItem>Ver relatório completo</MudMenuItem>
    </Menu>
    <ChildContent>
        @* os rótulos do eixo X são desenhados abaixo da área do SVG; o pb-6 reserva esse espaço dentro do card *@
        <div class="pb-6">
            <MudChart T="double" ChartType="ChartType.Line" Width="100%" Height="260px" MatchBoundsToSize="true"
                      ChartSeries="_series" ChartLabels="Meses" ChartOptions="_opcoes" />
        </div>
    </ChildContent>
</DashboardCard>

@code {
    [Parameter, EditorRequired] public string[] Meses { get; set; } = Array.Empty<string>();
    [Parameter, EditorRequired] public double[] Receita { get; set; } = Array.Empty<double>();
    [Parameter, EditorRequired] public double[] Meta { get; set; } = Array.Empty<double>();

    private List<ChartSeries<double>> _series = new();
    private LineChartOptions _opcoes = new();

    protected override void OnParametersSet()
    {
        var receita = new ChartSeries<double> { Name = "Receita", Data = Receita };
        var meta = new ChartSeries<double> { Name = "Meta", Data = Meta };
        _series = new() { receita, meta };
        _opcoes = new LineChartOptions
        {
            ChartPalette = new[] { "#2563EB", "#60A5FA" },
            ShowLegend = false,
            ShowDataMarkers = true,
            LineStrokeWidth = 3,
            YAxisTicks = 50000,
            MaxNumYAxisTicks = 7,
            YAxisSuggestedMax = 300000,
            YAxisRequireZeroPoint = true,
            XAxisLines = true,
            YAxisToStringFunc = v => v == 0 ? "0" : $"{v / 1000:0}K",
            SeriesDisplayOverrides = new Dictionary<IChartSeries, MudBlazor.Charts.SeriesDisplayOverride>
            {
                [receita] = new() { LineDisplayType = LineDisplayType.Area, FillOpacity = 0.15, StrokeOpacity = 1 },
                [meta] = new() { StrokeOpacity = 0.8 },
            },
        };
    }
}
```

Aqui aparece pela primeira vez o **uso do `DashboardCard`**: repare como cada slot é preenchido com `<Acoes>`, `<Menu>` e `<ChildContent>`.

Entendendo as opções do gráfico:

| Opção | Efeito |
|---|---|
| `ChartPalette` | cor de cada série, **na ordem** das séries |
| `ShowDataMarkers` | bolinhas em cada ponto |
| `YAxisTicks = 50000` | uma linha de grade a cada 50 mil |
| `YAxisSuggestedMax = 300000` e `YAxisRequireZeroPoint` | eixo Y de 0 a 300K |
| `YAxisToStringFunc` | formata os rótulos do eixo Y: `150000` vira `"150K"` |
| `SeriesDisplayOverrides` | configurações **por série**: a Receita vira área preenchida e a Meta fica levemente transparente |

> **Aprofundando — `MatchBoundsToSize` e o espaço dos rótulos**
>
> Com `MatchBoundsToSize="true"`, o SVG é desenhado no **tamanho real** do componente, de modo que textos e traços não encolhem e os rótulos ficam legíveis. Porém, os rótulos do eixo X (os meses) são desenhados **abaixo** da área declarada do SVG e vazariam para fora do card. O `div.pb-6` em volta do gráfico reserva 24px embaixo para eles.

> **Limitação — linha tracejada.** No mockup, a "Meta" é tracejada. O MudBlazor 9 não tem essa opção (o `LineDisplayType` só tem `Line` e `Area`). A solução foi diferenciar a Meta pela **cor mais clara**. A legenda manual usa o ícone `Remove` (um traço) para representá-la.

---

## 13. Gráfico de rosca: Distribuição de Clientes

Crie `Components/GraficoDistribuicaoClientes.razor`:

```razor
<DashboardCard Titulo="Distribuição de Clientes">
    <Menu>
        <MudMenuItem>Exportar dados</MudMenuItem>
    </Menu>
    <ChildContent>
        <MudGrid Spacing="2" Class="align-center mt-1">
            <MudItem xs="12" sm="8">
                <MudChart T="double" ChartType="ChartType.Donut" Width="100%" Height="290px"
                          ChartSeries="_series" ChartLabels="_rotulos" ChartOptions="_opcoes">
                    <CustomGraphics>
                        <text x="50%" y="46%" text-anchor="middle" dominant-baseline="middle" font-size="28" font-weight="700" fill="currentColor">
                            @Total.ToString("N0", CulturaBr)
                        </text>
                        <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="currentColor" opacity="0.6">
                            clientes
                        </text>
                    </CustomGraphics>
                </MudChart>
            </MudItem>
            <MudItem xs="12" sm="4">
                <MudStack Spacing="3">
                    @foreach (var segmento in Segmentos)
                    {
                        <MudStack Row="true" Justify="Justify.SpaceBetween" AlignItems="AlignItems.Center">
                            <MudStack Row="true" Spacing="2" AlignItems="AlignItems.Center">
                                <MudIcon Icon="@Icons.Material.Filled.Circle" Color="@segmento.Cor" Size="Size.Small" />
                                <MudText Typo="Typo.body1">@segmento.Nome</MudText>
                            </MudStack>
                            <MudText Typo="Typo.subtitle2">@segmento.Percentual%</MudText>
                        </MudStack>
                    }
                </MudStack>
            </MudItem>
        </MudGrid>
    </ChildContent>
</DashboardCard>

@code {
    private static readonly System.Globalization.CultureInfo CulturaBr = new("pt-BR");

    [Parameter, EditorRequired] public int Total { get; set; }
    [Parameter, EditorRequired] public IReadOnlyList<SegmentoCliente> Segmentos { get; set; } = Array.Empty<SegmentoCliente>();

    private List<ChartSeries<double>> _series = new();
    private string[] _rotulos = Array.Empty<string>();
    private DonutChartOptions _opcoes = new();

    protected override void OnParametersSet()
    {
        _series = new() { new ChartSeries<double> { Name = "Clientes", Data = Segmentos.Select(s => (double)s.Percentual).ToArray() } };
        _rotulos = Segmentos.Select(s => s.Nome).ToArray();
        _opcoes = new DonutChartOptions
        {
            ChartPalette = Segmentos.Select(s => s.CorHex).ToArray(),
            ShowLegend = false,
            DonutRingRatio = 0.35,
        };
    }
}
```

O que há de novo aqui:

- **Donut = uma série só.** No gráfico de rosca, **cada valor** da série é uma fatia, e os `ChartLabels` são os nomes das fatias.
- **LINQ para transformar dados.** `Segmentos.Select(s => s.CorHex).ToArray()` monta a paleta **na mesma ordem** das fatias. Se alguém mudar a ordem dos segmentos em `DashboardData`, cores, fatias e legenda continuam batendo.
- **`DonutRingRatio = 0.35`**: espessura do anel (o padrão é 0,25, mais fino).
- **Legenda própria** (`ShowLegend = false`): a legenda embutida do MudBlazor não mostra percentuais. Por isso montamos a nossa com `MudIcon Circle` + nome + percentual.
- **Proporção 8/4 no `MudGrid` interno**: a rosca ocupa 2/3 da largura e a legenda 1/3.

> **Aprofundando — `CustomGraphics`: desenhando dentro do gráfico**
>
> O `MudChart` é um **SVG**. O slot `CustomGraphics` permite inserir **elementos SVG próprios** dentro dele. Usamos dois `<text>` para escrever o total no centro da rosca:
>
> - `x="50%" y="46%"` posiciona em relação ao próprio SVG, ou seja, no centro;
> - `text-anchor="middle"` centraliza o texto horizontalmente no ponto `x`;
> - `fill="currentColor"` usa a cor de texto atual, então o total fica escuro no tema claro e claro no tema escuro, automaticamente.
>
> Esses são **atributos de apresentação do SVG**, e não CSS.

> **Aprofundando — formatação com cultura**
>
> `1842.ToString("N0")` usaria a cultura do navegador/sistema e poderia gerar `"1,842"` (padrão americano). Com `ToString("N0", new CultureInfo("pt-BR"))` o resultado é sempre **`"1.842"`**. Sempre que formatar números ou datas para o usuário, informe a cultura explicitamente.

---

## 14. Performance dos Projetos

Crie `Components/PerformanceProjetos.razor`:

```razor
<DashboardCard Titulo="Performance dos Projetos">
    <Menu>
        <MudMenuItem>Ver todos os projetos</MudMenuItem>
    </Menu>
    <ChildContent>
        @* cada projeto ocupa uma faixa de mesma altura; a borda inferior da faixa é o separador *@
        <div class="flex-grow-1 d-flex flex-column">
            @for (var i = 0; i < Projetos.Count; i++)
            {
                var projeto = Projetos[i];
                var separador = i < Projetos.Count - 1 ? "border-b border-solid mud-border-lines-default" : "";
                <div class="@($"flex-grow-1 d-flex flex-column justify-center {separador}")">
                    <MudGrid Spacing="2" Class="align-center py-1">
                        <MudItem xs="7" md="4">
                            <MudStack Row="true" Spacing="3" AlignItems="AlignItems.Center">
                                <MudAvatar Size="Size.Small" Rounded="true" Class="@Ui.FundoSuave(projeto.Cor)">
                                    <MudIcon Icon="@projeto.Icone" Color="@projeto.Cor" Size="Size.Small" />
                                </MudAvatar>
                                <MudText Typo="Typo.body1">@projeto.Nome</MudText>
                            </MudStack>
                        </MudItem>
                        <MudItem xs="5" md="4">
                            <MudProgressLinear Value="@projeto.Percentual" Color="@projeto.Cor" Rounded="true" Size="Size.Medium" />
                        </MudItem>
                        <MudItem xs="4" md="1">
                            <MudText Typo="Typo.subtitle2">@projeto.Percentual%</MudText>
                        </MudItem>
                        <MudItem xs="8" md="3" Class="d-flex justify-end">
                            <MudText Typo="Typo.body2" Class="mud-text-secondary">@projeto.TarefasConcluidas de @projeto.TarefasTotal tarefas</MudText>
                        </MudItem>
                    </MudGrid>
                </div>
            }
        </div>
    </ChildContent>
</DashboardCard>

@code {
    [Parameter, EditorRequired] public IReadOnlyList<ProjetoPerformance> Projetos { get; set; } = Array.Empty<ProjetoPerformance>();
}
```

**Colunas alinhadas.** Cada projeto é um `MudGrid` com as mesmas proporções (4 + 4 + 1 + 3 = 12 colunas em `md`). Como todas as linhas usam as mesmas medidas, as barras e os percentuais ficam alinhados verticalmente, como numa tabela.

**Preenchendo o card inteiro.** Este card fica ao lado de "Atividades Recentes", que é mais alto. Queremos que as 4 linhas se **espalhem** pela altura toda, com os separadores **no meio** entre elas:

1. o `DashboardCard` já entrega um conteúdo que ocupa toda a altura livre (seção 10);
2. o `div.flex-grow-1 d-flex flex-column` externo repassa essa altura;
3. cada projeto é uma **faixa** `flex-grow-1`: todas crescem igualmente e ficam com **a mesma altura**;
4. `justify-center` centraliza o conteúdo verticalmente dentro da faixa;
5. a faixa (exceto a última) tem **borda inferior** (`border-b border-solid mud-border-lines-default`), que funciona como separador exatamente entre duas linhas.

> **Aprofundando — por que não usar `MudDivider` entre as linhas?**
>
> Se os divisores fossem itens soltos na coluna flex, o espaço livre seria dividido também entre eles, e cada divisor ficaria colado na linha de cima, com o espaço vazio embaixo. Usando a **borda da própria faixa**, o separador fica sempre na fronteira entre duas faixas de mesma altura, ou seja, no meio.
>
> Um detalhe: `border-solid` define o estilo das **quatro** bordas, mas só a de baixo aparece. Isso porque o MudBlazor tem um *reset* global com `border-width: 0` para todos os elementos, e só a classe `border-b` define uma largura (1px) para a borda inferior.

> **Dica — `@for` com variável local.** Usamos `@for` (em vez de `@foreach`) porque precisamos do **índice** `i` para saber se a linha é a última. Repare também em `var projeto = Projetos[i];`: dentro de blocos Razor, capture o item numa variável local antes de usá-lo em expressões, o que evita surpresas com *closures* (lambdas) que capturam o `i`.

---

## 15. Atividades Recentes

Crie `Components/AtividadesRecentes.razor`:

```razor
<DashboardCard Titulo="Atividades Recentes">
    <Menu>
        <MudMenuItem>Ver histórico completo</MudMenuItem>
    </Menu>
    <ChildContent>
        <MudStack Spacing="3">
            @foreach (var atividade in Atividades)
            {
                <MudStack Row="true" Spacing="3" AlignItems="AlignItems.Center">
                    <MudAvatar Size="Size.Small" Color="@atividade.Cor">
                        <MudIcon Icon="@atividade.Icone" Size="Size.Small" />
                    </MudAvatar>
                    <MudAvatar Size="Size.Medium" Color="Color.Default">@Ui.Iniciais(atividade.Nome)</MudAvatar>
                    <div class="flex-grow-1">
                        <MudText Typo="Typo.subtitle2">@atividade.Nome</MudText>
                        <MudText Typo="Typo.body2" Class="mud-text-secondary">@atividade.Acao</MudText>
                    </div>
                    <MudText Typo="Typo.body2" Class="mud-text-secondary">@atividade.Tempo</MudText>
                </MudStack>
            }
        </MudStack>
    </ChildContent>
</DashboardCard>

@code {
    [Parameter, EditorRequired] public IReadOnlyList<Atividade> Atividades { get; set; } = Array.Empty<Atividade>();
}
```

Cada linha tem quatro partes:

1. **ícone da ação** num avatar colorido e preenchido (a cor "cheia" da paleta, com ícone branco);
2. **avatar da pessoa** com as iniciais (`Ui.Iniciais`);
3. **nome + descrição**, num `div.flex-grow-1` que ocupa o espaço do meio;
4. **tempo**, que o `flex-grow-1` anterior empurra para a direita.

> **Aprofundando — `MudStack`**
>
> O `MudStack` é o componente de layout mais usado neste projeto. Ele é um container flex:
>
> - `Row="true"` coloca os filhos **lado a lado** (sem ele, um embaixo do outro);
> - `Spacing="3"` define o espaço entre os filhos (3 × 4px);
> - `AlignItems` alinha no eixo **cruzado** (na vertical, quando `Row`);
> - `Justify` distribui no eixo **principal** (`SpaceBetween` = um em cada ponta).
>
> Para um layout "linha com coisas espalhadas", `MudStack` resolve; para "colunas alinhadas entre várias linhas", use `MudGrid` (como na seção 14).

---

## 16. Tabela de Projetos Recentes

Crie `Components/ProjetosRecentes.razor`:

```razor
<DashboardCard Titulo="Projetos Recentes">
    <Acoes>
        <MudButton Href="projetos" Variant="Variant.Text" Color="Color.Primary" EndIcon="@Icons.Material.Filled.ArrowForward">Ver todos</MudButton>
    </Acoes>
    <ChildContent>
        <MudTable Items="Projetos" Dense="true" Hover="true" Elevation="0" Breakpoint="Breakpoint.Sm" HeaderClass="mud-background-gray">
            <HeaderContent>
                <MudTh>Projeto</MudTh>
                <MudTh>Cliente</MudTh>
                <MudTh>Responsável</MudTh>
                <MudTh>Status</MudTh>
                <MudTh>Progresso</MudTh>
                <MudTh>Prazo</MudTh>
                <MudTh>Ações</MudTh>
            </HeaderContent>
            <RowTemplate>
                <MudTd DataLabel="Projeto">
                    <MudStack Row="true" Spacing="2" AlignItems="AlignItems.Center">
                        <MudAvatar Size="Size.Small" Rounded="true" Class="@Ui.FundoSuave(context.Cor)">
                            <MudIcon Icon="@context.Icone" Color="@context.Cor" Size="Size.Small" />
                        </MudAvatar>
                        <MudText Typo="Typo.body2">@context.Nome</MudText>
                    </MudStack>
                </MudTd>
                <MudTd DataLabel="Cliente">@context.Cliente</MudTd>
                <MudTd DataLabel="Responsável">
                    <MudStack Row="true" Spacing="2" AlignItems="AlignItems.Center">
                        <MudAvatar Size="Size.Small" Color="Color.Default">@Ui.Iniciais(context.Responsavel)</MudAvatar>
                        <MudText Typo="Typo.body2">@context.Responsavel</MudText>
                    </MudStack>
                </MudTd>
                <MudTd DataLabel="Status">
                    <MudChip T="string" Size="Size.Small" Variant="Variant.Text" Color="@context.StatusCor">@context.Status</MudChip>
                </MudTd>
                <MudTd DataLabel="Progresso">
                    <MudGrid Spacing="1" Class="align-center">
                        <MudItem xs="9">
                            <MudProgressLinear Value="@context.Progresso" Color="@(context.Progresso == 100 ? Color.Success : Color.Primary)" Rounded="true" Size="Size.Medium" />
                        </MudItem>
                        <MudItem xs="3">
                            <MudText Typo="Typo.body2">@context.Progresso%</MudText>
                        </MudItem>
                    </MudGrid>
                </MudTd>
                <MudTd DataLabel="Prazo">@context.Prazo</MudTd>
                <MudTd DataLabel="Ações">
                    <MudMenu Icon="@Icons.Material.Filled.MoreVert" Size="Size.Small" Dense="true">
                        <MudMenuItem>Ver detalhes</MudMenuItem>
                        <MudMenuItem>Editar</MudMenuItem>
                        <MudMenuItem>Excluir</MudMenuItem>
                    </MudMenu>
                </MudTd>
            </RowTemplate>
        </MudTable>
    </ChildContent>
</DashboardCard>

@code {
    [Parameter, EditorRequired] public IReadOnlyList<ProjetoRecente> Projetos { get; set; } = Array.Empty<ProjetoRecente>();
}
```

> **Aprofundando — como o `MudTable` funciona**
>
> - **`Items`** recebe a lista. O tipo da tabela (`MudTable<ProjetoRecente>`) é **inferido** a partir dela, por isso não precisamos escrever `T`.
> - **`HeaderContent`** define o cabeçalho (`MudTh`), que é renderizado uma vez.
> - **`RowTemplate`** é repetido **para cada item**. Dentro dele, a variável especial **`context`** é o item da linha atual (`context.Nome`, `context.Cliente`...).
> - **`DataLabel`** é o rótulo usado no modo celular: abaixo do `Breakpoint.Sm`, a tabela vira uma **lista de cards**, e cada célula aparece como "Projeto: Portal Institucional".
> - **`Dense`**: linhas mais baixas. **`Hover`**: destaca a linha sob o mouse.
> - **`HeaderClass="mud-background-gray"`**: fundo cinza no cabeçalho, com a classe utilitária aplicada direto no parâmetro.

> **Dica — chips de status.** `Variant.Text` num `MudChip` gera exatamente o estilo "texto colorido sobre fundo claro da mesma cor". A cor vem do dado (`StatusCor`): **Info** = em andamento, **Warning** = em revisão, **Success** = concluído.

---

## 17. Montagem final da página

Com todos os componentes prontos, o `Pages/Dashboard.razor` fica curto e fácil de ler. Substitua o conteúdo inteiro:

```razor
@page "/"

<PageTitle>Dashboard | Afya Pedagógico</PageTitle>

<CabecalhoPagina Titulo="Dashboard" Subtitulo="Visão geral da plataforma e indicadores de desempenho.">
    <Acoes>
        <SeletorPeriodo Opcoes="DashboardData.Periodos" @bind-Valor="_periodo" />
        <MudButton Variant="Variant.Filled" Color="Color.Primary" Size="Size.Large" StartIcon="@Icons.Material.Filled.Add">Novo Projeto</MudButton>
    </Acoes>
</CabecalhoPagina>

<MudGrid Spacing="3">
    @foreach (var kpi in DashboardData.Kpis)
    {
        <MudItem xs="12" sm="6" lg="3">
            <KpiCard Kpi="kpi" />
        </MudItem>
    }

    <MudItem xs="12" lg="7">
        <GraficoReceita Meses="DashboardData.Meses" Receita="DashboardData.ReceitaMensal" Meta="DashboardData.MetaMensal" />
    </MudItem>
    <MudItem xs="12" lg="5">
        <GraficoDistribuicaoClientes Total="DashboardData.TotalClientes" Segmentos="DashboardData.SegmentosClientes" />
    </MudItem>

    <MudItem xs="12" lg="7">
        <PerformanceProjetos Projetos="DashboardData.Performance" />
    </MudItem>
    <MudItem xs="12" lg="5">
        <AtividadesRecentes Atividades="DashboardData.Atividades" />
    </MudItem>

    <MudItem xs="12">
        <ProjetosRecentes Projetos="DashboardData.ProjetosRecentes" />
    </MudItem>
</MudGrid>

@code {
    private string _periodo = "Últimos 30 dias";
}
```

Repare como a página agora **descreve** o layout: "4 KPIs; linha com receita (7/12) e distribuição (5/12); linha com performance e atividades; tabela no fim". Os detalhes de cada bloco ficam escondidos nos componentes.

> **Aprofundando — um único `MudGrid` para tudo**
>
> Todos os blocos estão no **mesmo** `MudGrid`. Como a soma das colunas de cada "linha" dá 12 (`3+3+3+3`, `7+5`, `7+5`, `12`), o grid quebra a linha naturalmente, e o `Spacing="3"` fica uniforme entre todos os blocos, na horizontal e na vertical.

### Estrutura final do projeto

```
afya-admin/
├── .docs/
│   ├── page_specification.md
│   └── tutorial.md
├── Components/
│   ├── AtividadesRecentes.razor
│   ├── CabecalhoPagina.razor
│   ├── DashboardCard.razor
│   ├── GraficoDistribuicaoClientes.razor
│   ├── GraficoReceita.razor
│   ├── KpiCard.razor
│   ├── PerformanceProjetos.razor
│   ├── ProjetosRecentes.razor
│   ├── SeletorPeriodo.razor
│   └── Ui.cs
├── Data/
│   └── DashboardData.cs
├── Layout/
│   ├── MainLayout.razor
│   └── NavMenu.razor
├── Pages/
│   ├── Dashboard.razor
│   └── NotFound.razor
├── Properties/launchSettings.json
├── wwwroot/
│   ├── css/app.css
│   ├── img/alex-morgan.jpg
│   ├── favicon.png, icon-192.png
│   └── index.html
├── _Imports.razor
├── afya-admin.csproj
├── App.razor
└── Program.cs
```

---

## 18. Checklist de testes

Antes de considerar a página pronta, teste:

- [ ] `dotnet build` termina com **0 erros e 0 avisos**;
- [ ] o **Console** do navegador (F12) não mostra erros **nem 404** na aba Network;
- [ ] o botão **hambúrguer** abre e fecha o sidebar;
- [ ] o **tema escuro** funciona: textos legíveis, cards escuros, total da rosca visível;
- [ ] os **menus** abrem: período, notificações, usuário, "⋮" dos cards e ações da tabela;
- [ ] trocar o **período** muda o texto do botão;
- [ ] **responsividade** (Ctrl + Shift + M no DevTools):
  - [ ] celular: KPIs em 1 coluna, busca e nome do usuário ocultos, tabela em formato de cards;
  - [ ] tablet: KPIs em 2 colunas;
  - [ ] desktop: layout completo;
- [ ] os meses do gráfico de receita ficam **dentro** do card;
- [ ] as linhas de Performance dos Projetos **preenchem** o card.

---

## 19. Problemas comuns e soluções

| Sintoma | Causa provável | Solução |
|---|---|---|
| `error RZ10001: The type of component 'MudChip' cannot be inferred... using the following attributes: 'T'` | `MudChip` é genérico no MudBlazor 9 e o tipo não pôde ser deduzido | informe o tipo: `<MudChip T="string" ...>` |
| Erro de compilação com `XAxisLabels`, `InputData` ou `InputLabels` | exemplo de uma versão antiga do MudBlazor | use `ChartLabels`, `ChartSeries<double>` e `LineChartOptions`/`DonutChartOptions` (seção 11.1) |
| Aviso `MUD0002: Illegal Attribute 'X' on 'MudY'` | o parâmetro não existe naquele componente | o analisador do MudBlazor avisa. Remova o atributo ou procure o nome correto na documentação |
| `The type or namespace name 'DashboardCard' could not be found` | faltou o `@using` | confira o `_Imports.razor` (seção 8.1) e o namespace `afya_admin.Components` |
| Menus (`MudMenu`) não abrem | falta o `<MudPopoverProvider />` | confira o topo do `MainLayout.razor` |
| Texto "cinza" aparece roxo ou rosa | usou `Color="Color.Secondary"` | use `Class="mud-text-secondary"` |
| Placeholder da busca em negrito | alterou a tipografia `Subtitle1` | não altere o `Subtitle1` (seção 6) |
| Sidebar cobre o conteúdo | largura definida só no tema | use `Width` no `MudDrawer` (seção 7.1) |
| 404 em `afya-admin.styles.css` | não há mais nenhum `.razor.css` | remova o `<link>` do `index.html` (seção 4.2) |
| 404 em `_framework/dotnet.xxxx.js` ou página branca após muitas alterações | arquivos de build desatualizados ou cache do navegador | pare o `dotnet watch`, rode `dotnet clean`, inicie de novo e recarregue com **Ctrl + F5** |
| A alteração não aparece | Hot Reload não recriou o componente | **F5** no navegador; se não resolver, **Ctrl + R** no terminal do `dotnet watch` |
| Foto do usuário não aparece | caminho errado | o arquivo deve estar em `wwwroot/img/alex-morgan.jpg` e ser referenciado como `img/alex-morgan.jpg` |
| Sparkline "achatado" | eixo Y começando no zero | `YAxisRequireZeroPoint = false` |
| Sparkline sem linha visível | traço reduzido pelo `viewBox` | `LineStrokeWidth = 12` e `StrokeOpacity = 1` no override (seção 11.2) |

---

## 20. Desafios para ir além

Agora que a página está pronta, tente estas evoluções. Elas estão em ordem crescente de dificuldade:

1. **Nova cor de destaque.** Troque o `Primary` do tema por outra cor e observe quantos elementos mudam juntos. Depois ajuste os hexadecimais correspondentes em `DashboardData` para os gráficos acompanharem.
2. **Páginas do menu.** Crie `Pages/Clientes.razor` com `@page "/clientes"` e reutilize o `CabecalhoPagina` e o `DashboardCard`. Repare que o breadcrumb continua dizendo "Dashboard": faça o breadcrumb depender da página atual (dica: `NavigationManager`).
3. **Período funcional.** Faça a troca de período no `SeletorPeriodo` alterar os valores dos KPIs (por exemplo, com um dicionário de dados por período em `DashboardData`).
4. **Dados vindos de JSON.** Mova os dados fake para `wwwroot/data/dashboard.json` e carregue-os com o `HttpClient` já registrado no `Program.cs` (`await Http.GetFromJsonAsync<...>("data/dashboard.json")`). Mostre um `MudSkeleton` ou `MudProgressCircular` enquanto os dados carregam.
5. **Serviço de dados.** Crie uma interface `IDashboardService` com uma implementação fake, registre-a com `builder.Services.AddScoped<IDashboardService, DashboardFakeService>()` e injete-a na página com `@inject`. Esse é o caminho para, no futuro, trocar os dados fake por uma API real sem mexer nos componentes.
6. **Busca funcional.** Faça o campo "Pesquisar..." filtrar a tabela de Projetos Recentes (dica: o `MudTable` tem o parâmetro `Filter`).
7. **Lembrar o tema.** Salve a preferência claro/escuro no `localStorage` do navegador (dica: `IJSRuntime`) e detecte o tema do sistema operacional na primeira visita (o `MudThemeProvider` tem o método `GetSystemDarkModeAsync()`).

Bons estudos!
