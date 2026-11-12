// ============================================================
// CONTEÚDO DAS AULAS — Programação para Sistemas Web
// Tutorial: construindo o ts-app (React + TypeScript + Vite + React Router)
//
// Cada aula tem:
//   menu      → nome curto na barra lateral
//   tag       → subtítulo da aula
//   titulo    → título principal
//   teoria    → fundamento teórico (HTML)
//   arquivos  → código-fonte para copiar { caminho, lang, acao?, nota?, codigo }
//   perguntas → 3 perguntas; uma é sorteada para liberar a próxima aula
//               { texto, respostas: [aceitas...], dica }
// ============================================================

const AULAS = [

    // ------------------------------------------------------------------
    // AULA 01
    // ------------------------------------------------------------------
    {
        menu: 'Criando o projeto',
        tag: 'React, Vite e o template react-ts',
        titulo: 'Criando o projeto com Vite',
        teoria: `
            <p>O <strong>React</strong> é uma biblioteca JavaScript para construir interfaces a partir de <strong>componentes</strong>: pequenas funções que descrevem um pedaço da tela. Em vez de manipular o DOM manualmente, você descreve <em>como</em> a tela deve ficar e o React se encarrega de atualizá-la.</p>
            <p>Uma aplicação React costuma ser uma <strong>SPA</strong> (<em>Single Page Application</em>): o navegador carrega um único <code>index.html</code> e, a partir daí, o JavaScript troca o conteúdo da página sem recarregá-la.</p>
            <h3>Por que o Vite?</h3>
            <p>O navegador não entende TypeScript nem JSX. Precisamos de uma ferramenta que transforme esse código em JavaScript comum. O <strong>Vite</strong> faz dois papéis:</p>
            <ul>
                <li><strong>Servidor de desenvolvimento</strong>: abre o projeto no navegador e atualiza a tela a cada arquivo salvo (<em>Hot Module Replacement</em>).</li>
                <li><strong>Bundler</strong>: no final, empacota tudo em arquivos otimizados para publicação.</li>
            </ul>
            <h3>O template react-ts</h3>
            <p>O comando <code>npm create vite</code> gera um projeto pronto a partir de um modelo (<em>template</em>). Usaremos o <code>react-ts</code>: React com <strong>TypeScript</strong>, já configurado com <code>tsconfig.json</code> e verificação de tipos no build.</p>
            <p>No comando abaixo, os dois traços isolados (<code>--</code>) passam a opção <code>--template</code> adiante, para o criador de projetos do Vite.</p>
            <div class="nota">É preciso ter o <strong>Node.js</strong> instalado (versão LTS recente, 20 ou superior). Ele traz junto o <strong>npm</strong>, o gerenciador de pacotes que baixa o React, o Vite e as demais dependências.</div>
            <p>Depois do <code>npm run dev</code>, abra o endereço mostrado no terminal (<code>http://localhost:5173</code>). Para parar o servidor, use <code>Ctrl + C</code>.</p>
        `,
        arquivos: [
            {
                caminho: 'Terminal',
                lang: 'bash',
                codigo: `
# 1. Confira se o Node.js está instalado
node -v

# 2. Crie o projeto a partir do template react-ts
npm create vite@latest ts-app -- --template react-ts

# 3. Entre na pasta e instale as dependências
cd ts-app
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
`
            }
        ],
        perguntas: [
            {
                texto: 'No comando de criação do projeto, qual opção escolhe o modelo a ser usado (como em ____ react-ts)?',
                respostas: ['--template', 'template'],
                dica: 'Digite a opção...'
            },
            {
                texto: 'Qual comando inicia o servidor de desenvolvimento do Vite?',
                respostas: ['npm run dev'],
                dica: 'Digite o comando completo...'
            },
            {
                texto: 'Em qual porta o Vite sobe o servidor de desenvolvimento por padrão (http://localhost:____)?',
                respostas: ['5173'],
                dica: 'Digite o número da porta...'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 02
    // ------------------------------------------------------------------
    {
        menu: 'Anatomia e limpeza',
        tag: 'Estrutura do projeto',
        titulo: 'Anatomia do projeto e limpeza do template',
        teoria: `
            <p>Antes de escrever código, vamos entender o que o Vite gerou. Os arquivos mais importantes são:</p>
            <div class="tabela">
                <table>
                    <thead>
                        <tr><th>Arquivo</th><th>Papel</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code>index.html</code></td><td>A única página HTML da SPA. Tem uma <code>&lt;div id="root"&gt;</code> vazia, onde o React desenha a aplicação.</td></tr>
                        <tr><td><code>src/main.tsx</code></td><td>Ponto de entrada: o primeiro código executado. Conecta o React à <code>div#root</code>.</td></tr>
                        <tr><td><code>src/App.tsx</code></td><td>O componente principal da aplicação.</td></tr>
                        <tr><td><code>package.json</code></td><td>Dependências e scripts (<code>dev</code>, <code>build</code>, <code>preview</code>, <code>lint</code>).</td></tr>
                        <tr><td><code>tsconfig*.json</code></td><td>Configuração do TypeScript.</td></tr>
                        <tr><td><code>vite.config.ts</code></td><td>Configuração do Vite (com o plugin do React).</td></tr>
                    </tbody>
                </table>
            </div>
            <h3>Quem verifica os tipos?</h3>
            <p>Durante o <code>npm run dev</code>, o Vite apenas <strong>remove</strong> as anotações de tipo e executa o JavaScript que sobra: ele não acusa erros de tipo. Quem verifica é o compilador do TypeScript, o <code>tsc</code>. Por isso o script de build é:</p>
            <pre data-lang="json"><code>"build": "tsc -b &amp;&amp; vite build"</code></pre>
            <p>Primeiro o <code>tsc</code> verifica os tipos; só se tudo estiver certo o Vite gera o build. O VS Code também usa o TypeScript para sublinhar erros enquanto você digita.</p>
            <h3>O operador ! no main.tsx</h3>
            <p><code>document.getElementById('root')</code> retorna <code>HTMLElement | null</code>, pois o elemento pode não existir. O <code>!</code> no final diz ao TypeScript: "garanto que não é <code>null</code>". Use com cuidado: aqui é seguro porque o <code>#root</code> está no <code>index.html</code>.</p>
            <h3>Limpeza do template</h3>
            <ol>
                <li>Apague o arquivo <code>src/App.css</code>.</li>
                <li>Apague <strong>todo o conteúdo</strong> de <code>src/index.css</code>, mas mantenha o arquivo: ele será preenchido na próxima aula.</li>
                <li>Substitua <code>index.html</code>, <code>src/main.tsx</code> e <code>src/App.tsx</code> pelo código abaixo.</li>
            </ol>
            <p>A pasta <code>src/assets</code> pode ficar: ela não será usada.</p>
        `,
        arquivos: [
            {
                caminho: 'index.html',
                lang: 'html',
                acao: 'SUBSTITUIR',
                nota: 'Página em português (<code>lang="pt-BR"</code>) e com o título da loja.',
                codigo: `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Loja React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
            },
            {
                caminho: 'src/main.tsx',
                lang: 'tsx',
                acao: 'SUBSTITUIR',
                nota: 'Versão provisória: na aula 07 ele ganha o React Router.',
                codigo: `
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// getElementById pode retornar null (se o elemento não existir).
// O "!" diz ao TypeScript: "garanto que o #root existe no index.html".
const raiz = document.getElementById('root')!;

createRoot(raiz).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`
            },
            {
                caminho: 'src/App.tsx',
                lang: 'tsx',
                acao: 'SUBSTITUIR',
                nota: 'Versão provisória: o App vai crescer a cada aula.',
                codigo: `
function App() {
  return (
    <main className="conteudo">
      <h1>Olá, React com TypeScript!</h1>
    </main>
  );
}

export default App
`
            }
        ],
        perguntas: [
            {
                texto: 'Qual é o <code>id</code> da <code>div</code> do <code>index.html</code> onde o React monta a aplicação?',
                respostas: ['root', '#root'],
                dica: 'Digite o id...'
            },
            {
                texto: 'Qual arquivo é o ponto de entrada da aplicação, o primeiro <code>.tsx</code> a ser executado?',
                respostas: ['main.tsx', 'src/main.tsx'],
                dica: 'Digite o nome do arquivo...'
            },
            {
                texto: 'O Vite remove os tipos, mas não os verifica. Qual programa verifica os tipos quando rodamos <code>npm run build</code>?',
                respostas: ['tsc', 'tsc -b'],
                dica: 'Digite o nome do programa...'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 03
    // ------------------------------------------------------------------
    {
        menu: 'CSS global',
        tag: 'Estilo próprio, sem frameworks',
        titulo: 'Estilizando com CSS próprio',
        teoria: `
            <p>Usaremos <strong>um único arquivo CSS global</strong>, o <code>src/index.css</code>, importado no <code>main.tsx</code>. Ele vale para a aplicação inteira, e cada componente usa as classes que precisa por meio de <code>className</code>.</p>
            <h3>Variáveis CSS</h3>
            <p>Cores repetidas ficam em <strong>variáveis</strong> declaradas em <code>:root</code> (a raiz do documento). Para usar o valor, chamamos a função <code>var()</code>. Trocar a cor principal do site passa a ser uma alteração em uma linha só.</p>
            <pre data-lang="css"><code>:root {
  --cor-primaria: #2563eb;
}

.botao {
  background: var(--cor-primaria);
}</code></pre>
            <h3>Rodapé sempre embaixo (flexbox)</h3>
            <p>A classe <code>.app</code> transforma a página em uma coluna com pelo menos a altura da tela (<code>min-height: 100vh</code>). O conteúdo (<code>.conteudo</code>) recebe <code>flex: 1</code> e ocupa todo o espaço que sobrar, empurrando o rodapé para o fim da tela mesmo quando a página tem pouco conteúdo.</p>
            <h3>Grade responsiva (grid)</h3>
            <p>A classe <code>.grade</code> usa <code>repeat(auto-fill, minmax(200px, 1fr))</code>: o navegador coloca quantas colunas couberem, cada uma com no mínimo 200px. No celular fica uma coluna; no computador, várias, sem nenhuma <em>media query</em>.</p>
            <h3>Classes em português</h3>
            <p>Os nomes das classes (<code>.cabecalho</code>, <code>.rodape</code>, <code>.alerta</code>, <code>.card</code>) acompanham os componentes que vamos criar. Algumas ainda não são usadas: elas entram em cena nas próximas aulas. A classe <code>.active</code> do menu, por exemplo, é aplicada automaticamente pelo React Router na aula 09.</p>
            <p>Cole o arquivo inteiro abaixo em <code>src/index.css</code>.</p>
        `,
        arquivos: [
            {
                caminho: 'src/index.css',
                lang: 'css',
                acao: 'SUBSTITUIR',
                codigo: `
/* ========== Variáveis ========== */
:root {
  --cor-primaria: #2563eb;
  --cor-texto: #1f2937;
  --cor-fundo: #f3f4f6;
  --cor-borda: #e5e7eb;
  --cor-branco: #ffffff;
}

/* ========== Base ========== */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, Arial, sans-serif;
  color: var(--cor-texto);
  background: var(--cor-fundo);
  line-height: 1.5;
}

h1 {
  margin-top: 0;
}

/* ========== Layout ========== */
/* Coluna que ocupa a tela toda: o rodapé fica sempre embaixo */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.conteudo {
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
}

/* ========== Cabeçalho ========== */
.cabecalho {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 24px;
  background: var(--cor-primaria);
}

.logo {
  color: var(--cor-branco);
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none;
}

/* ========== Menu ========== */
.menu {
  display: flex;
  gap: 8px;
}

.menu a {
  padding: 6px 12px;
  border-radius: 6px;
  color: var(--cor-branco);
  text-decoration: none;
}

.menu a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Classe adicionada automaticamente pelo NavLink na página atual */
.menu a.active {
  background: var(--cor-branco);
  color: var(--cor-primaria);
}

/* ========== Rodapé ========== */
.rodape {
  padding: 16px;
  text-align: center;
  color: var(--cor-branco);
  background: var(--cor-texto);
}

.rodape p {
  margin: 0;
}

/* ========== UI: Alerta ========== */
.alerta {
  margin: 16px 0;
  padding: 12px 16px;
  border-left: 5px solid;
  border-radius: 6px;
}

.alerta-info {
  background: #dbeafe;
  border-color: #2563eb;
  color: #1e3a8a;
}

.alerta-sucesso {
  background: #dcfce7;
  border-color: #16a34a;
  color: #14532d;
}

.alerta-erro {
  background: #fee2e2;
  border-color: #dc2626;
  color: #7f1d1d;
}

/* ========== UI: Card ========== */
.card {
  padding: 16px;
  border: 1px solid var(--cor-borda);
  border-radius: 8px;
  background: var(--cor-branco);
}

.card-titulo {
  margin: 0 0 8px;
  color: var(--cor-primaria);
}

/* ========== Utilitários ========== */
/* Grade responsiva: quantas colunas couberem, com no mínimo 200px cada */
.grade {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 16px 0;
}

.botao {
  display: inline-block;
  padding: 10px 18px;
  border-radius: 6px;
  color: var(--cor-branco);
  background: var(--cor-primaria);
  text-decoration: none;
}

.botao:hover {
  opacity: 0.9;
}

.preco {
  font-size: 1.2rem;
  font-weight: bold;
}

.codigo {
  padding: 16px;
  overflow-x: auto;
  border-radius: 8px;
  color: #e5e7eb;
  background: #1f2937;
}
`
            }
        ],
        perguntas: [
            {
                texto: 'Em qual seletor declaramos as variáveis CSS globais, como <code>--cor-primaria</code>?',
                respostas: [':root', 'root'],
                dica: 'Digite o seletor...'
            },
            {
                texto: 'Qual função do CSS lê o valor de uma variável, como em <code>color: ____(--cor-texto)</code>?',
                respostas: ['var', 'var()'],
                dica: 'Digite o nome da função...'
            },
            {
                texto: 'Na classe <code>.conteudo</code>, qual declaração faz o conteúdo ocupar o espaço livre e empurrar o rodapé para baixo?',
                respostas: ['flex: 1', 'flex:1', 'flex'],
                dica: 'propriedade: valor'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 04
    // ------------------------------------------------------------------
    {
        menu: 'Primeiro componente',
        tag: 'Componentes e JSX',
        titulo: 'Primeiro componente: o Rodapé',
        teoria: `
            <p>Um <strong>componente</strong> React é uma <strong>função que retorna JSX</strong>. O JSX parece HTML, mas é JavaScript: cada tag vira uma chamada de função que descreve um elemento da tela.</p>
            <pre data-lang="tsx"><code>function Saudacao() {
  return &lt;h1&gt;Olá!&lt;/h1&gt;;
}</code></pre>
            <h3>Regras do JSX</h3>
            <ul>
                <li>O nome do componente começa com letra <strong>maiúscula</strong> (<em>PascalCase</em>). Com minúscula, o React trata <code>&lt;rodape /&gt;</code> como uma tag HTML.</li>
                <li>Use <code>className</code> no lugar de <code>class</code>, pois <code>class</code> é palavra reservada do JavaScript.</li>
                <li>O <code>return</code> devolve <strong>um único elemento raiz</strong>. Para vários, envolva-os em uma <code>&lt;div&gt;</code> ou em um fragmento <code>&lt;&gt;...&lt;/&gt;</code>.</li>
                <li>Entre <strong>chaves</strong> <code>{ }</code> colocamos qualquer expressão JavaScript: variáveis, contas, chamadas de função.</li>
                <li>Comentários dentro do JSX são escritos como <code>{/* ... */}</code>.</li>
            </ul>
            <h3>Exportar e importar</h3>
            <p>Cada componente fica em seu próprio arquivo, com o mesmo nome do componente. O <code>export default</code> torna a função disponível, e quem for usá-la faz o <code>import</code>. Componentes ficam na pasta <code>src/components</code>.</p>
            <h3>Componentes devem ser puros</h3>
            <p>O React pode executar a função do componente várias vezes. Por isso, ela deve ser <strong>pura</strong>: para as mesmas entradas, sempre o mesmo resultado. <code>new Date()</code> muda a cada chamada, então calculamos o ano <strong>fora</strong> da função, uma única vez. O linter do projeto (<code>npm run lint</code>) avisa quando essa regra é quebrada.</p>
            <p>Crie a pasta <code>src/components</code> e o arquivo do rodapé. Depois, atualize o <code>App.tsx</code> para usá-lo.</p>
        `,
        arquivos: [
            {
                caminho: 'src/components/Rodape.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
// Calculado uma única vez, fora do componente: o render deve ser "puro",
// ou seja, sempre produzir o mesmo resultado para as mesmas props.
const ano = new Date().getFullYear();

function Rodape() {
  return (
    <footer className="rodape">
      {/* Entre chaves, o JSX exibe o valor de uma expressão JavaScript */}
      <p>© {ano} Loja React · Programação Web</p>
    </footer>
  );
}

export default Rodape
`
            },
            {
                caminho: 'src/App.tsx',
                lang: 'tsx',
                acao: 'SUBSTITUIR',
                nota: 'A <code>div.app</code> é o elemento raiz: ela organiza o conteúdo e o rodapé em coluna.',
                codigo: `
import Rodape from './components/Rodape'

function App() {
  return (
    <div className="app">
      <main className="conteudo">
        <h1>Olá, React com TypeScript!</h1>
      </main>

      <Rodape />
    </div>
  );
}

export default App
`
            }
        ],
        perguntas: [
            {
                texto: 'Em JSX, qual atributo substitui o <code>class</code> do HTML?',
                respostas: ['className'],
                dica: 'Digite o atributo...'
            },
            {
                texto: 'Quais caracteres envolvem uma expressão JavaScript dentro do JSX, como o <code>ano</code> no rodapé?',
                respostas: ['{}', 'chaves', '{ }'],
                dica: 'Digite os caracteres ou o nome deles...'
            },
            {
                texto: 'O nome de um componente React deve começar com letra maiúscula ou minúscula?',
                respostas: ['maiúscula', 'maiuscula'],
                dica: 'maiúscula ou minúscula?'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 05
    // ------------------------------------------------------------------
    {
        menu: 'Props tipadas',
        tag: 'Props, children e TypeScript',
        titulo: 'Props tipadas: Alerta e Card',
        teoria: `
            <p><strong>Props</strong> são os parâmetros de um componente. Elas são passadas como atributos no JSX e chegam à função como um único objeto, que costumamos desestruturar:</p>
            <pre data-lang="tsx"><code>&lt;Alerta tipo="sucesso"&gt;Salvo!&lt;/Alerta&gt;

function Alerta({ tipo, children }: AlertaProps) { ... }</code></pre>
            <h3>Tipando as props</h3>
            <p>Com TypeScript, descrevemos o formato das props com um <code>type</code>. Assim o editor sugere as props disponíveis e o build falha se alguém usar o componente errado.</p>
            <ul>
                <li><code>titulo?: string</code>: o <code>?</code> torna a prop <strong>opcional</strong>.</li>
                <li><code>tipo?: 'info' | 'sucesso' | 'erro'</code>: uma <strong>união de literais</strong>, que só aceita um desses três textos. <code>&lt;Alerta tipo="aviso"&gt;</code> dá erro.</li>
                <li><code>tipo = 'info'</code> na desestruturação define um <strong>valor padrão</strong> para quando a prop não é informada.</li>
            </ul>
            <h3>children</h3>
            <p><code>children</code> é uma prop especial: recebe tudo o que é escrito <strong>entre</strong> a tag de abertura e a de fechamento. O tipo é <code>ReactNode</code>, que representa qualquer coisa que o React sabe exibir: texto, números, JSX ou listas deles.</p>
            <h3>import type</h3>
            <p>O template liga a opção <code>verbatimModuleSyntax</code>, que exige importar tipos com <code>import type</code>. Tipos existem só durante o desenvolvimento e são apagados no build; o <code>import type</code> deixa isso explícito.</p>
            <h3>Componentes de UI</h3>
            <p><code>Alerta</code> e <code>Card</code> são <strong>componentes de UI</strong>: genéricos, sem nenhuma regra de negócio, reutilizáveis em qualquer tela. Eles ficam separados em <code>src/components/ui</code>.</p>
            <div class="nota">Teste o TypeScript: escreva <code>tipo="aviso"</code> no <code>App.tsx</code> e veja o VS Code sublinhar o erro.</div>
        `,
        arquivos: [
            {
                caminho: 'src/components/ui/Alerta.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
import type { ReactNode } from 'react'

// Componente de UI: genérico, sem regra de negócio.
// As props são descritas por um tipo:
//   tipo     → opcional (?), e só aceita um destes três textos (união de literais)
//   children → o conteúdo escrito entre <Alerta> e </Alerta>
//              ReactNode = qualquer coisa que o React sabe exibir (texto, JSX, números...)
type AlertaProps = {
  tipo?: 'info' | 'sucesso' | 'erro';
  children: ReactNode;
};

function Alerta({ tipo = 'info', children }: AlertaProps) {
  return (
    <div className={\`alerta alerta-\${tipo}\`} role="alert">
      {children}
    </div>
  );
}

export default Alerta
`
            },
            {
                caminho: 'src/components/ui/Card.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                nota: '<code>{titulo &amp;&amp; ...}</code> só exibe o <code>&lt;h3&gt;</code> quando o título foi informado.',
                codigo: `
import type { ReactNode } from 'react'

// Componente de UI: uma "caixa" com título opcional.
type CardProps = {
  titulo?: string;      // opcional
  children: ReactNode;  // o conteúdo do card
};

function Card({ titulo, children }: CardProps) {
  return (
    <div className="card">
      {titulo && <h3 className="card-titulo">{titulo}</h3>}
      {children}
    </div>
  );
}

export default Card
`
            },
            {
                caminho: 'src/App.tsx',
                lang: 'tsx',
                acao: 'SUBSTITUIR',
                nota: 'Versão de teste para ver os componentes funcionando.',
                codigo: `
import Alerta from './components/ui/Alerta'
import Card from './components/ui/Card'
import Rodape from './components/Rodape'

function App() {
  return (
    <div className="app">
      <main className="conteudo">
        <h1>Olá, React com TypeScript!</h1>

        <Alerta tipo="sucesso">Meu primeiro alerta com props!</Alerta>

        <div className="grade">
          <Card titulo="Card com título">
            <p>O conteúdo entre as tags chega como children.</p>
          </Card>
          <Card>
            <p>Este card não tem título: a prop é opcional.</p>
          </Card>
        </div>
      </main>

      <Rodape />
    </div>
  );
}

export default App
`
            }
        ],
        perguntas: [
            {
                texto: 'Qual caractere torna uma prop opcional na declaração do tipo, como em <code>titulo__: string</code>?',
                respostas: ['?'],
                dica: 'Digite o caractere...'
            },
            {
                texto: 'Qual tipo do React representa "qualquer coisa que o React sabe exibir" e é usado na prop <code>children</code>?',
                respostas: ['ReactNode'],
                dica: 'Digite o nome do tipo...'
            },
            {
                texto: 'Com <code>verbatimModuleSyntax</code> ligado, qual palavra vem depois de <code>import</code> para importar apenas um tipo (<code>import ____ { ReactNode } from \'react\'</code>)?',
                respostas: ['type'],
                dica: 'Digite a palavra...'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 06
    // ------------------------------------------------------------------
    {
        menu: 'Tipos, dados e listas',
        tag: 'type, arrays e map',
        titulo: 'Tipos, dados e listas',
        teoria: `
            <p>A loja precisa exibir produtos. Começamos definindo <strong>o formato de um produto</strong> com um <code>type</code>, em um arquivo próprio na pasta <code>src/types</code>, já que ele será usado em vários lugares.</p>
            <h3>Arrays tipados</h3>
            <p><code>Produto[]</code> significa "um array de <code>Produto</code>". Ao declarar <code>const produtos: Produto[]</code>, o TypeScript confere cada item: se faltar um campo ou se o <code>preco</code> for um texto, o erro aparece na hora. Os dados ficam em <code>src/data</code>; em um sistema real, eles viriam de uma API.</p>
            <h3>Componente de aplicação</h3>
            <p>O <code>ProdutoCard</code> é um <strong>componente de aplicação</strong>: ele conhece o domínio do sistema (sabe o que é um produto). Para a parte visual, reaproveita o <code>Card</code>, um componente de UI. Isso é <strong>composição</strong>: componentes maiores montados a partir de menores.</p>
            <div class="tabela">
                <table>
                    <thead>
                        <tr><th>Pasta</th><th>Tipo de componente</th><th>Exemplos</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code>components/ui</code></td><td>Genérico, reutilizável em qualquer projeto</td><td>Alerta, Card</td></tr>
                        <tr><td><code>components</code></td><td>Específico desta aplicação</td><td>ProdutoCard, Rodape</td></tr>
                    </tbody>
                </table>
            </div>
            <h3>Listas com map e key</h3>
            <p>Para exibir uma lista, transformamos cada item do array em JSX com o método <code>map</code>:</p>
            <pre data-lang="tsx"><code>{produtos.map((produto) =&gt; (
  &lt;ProdutoCard key={produto.id} produto={produto} /&gt;
))}</code></pre>
            <p>Cada item precisa da prop especial <code>key</code>, com um valor <strong>único e estável</strong>. É por ela que o React sabe qual item mudou, entrou ou saiu da lista. Use o <code>id</code> do dado; evite o índice do array.</p>
        `,
        arquivos: [
            {
                caminho: 'src/types/Produto.ts',
                lang: 'ts',
                acao: 'CRIAR',
                codigo: `
// O "formato" de um produto. Usado nos dados e nos componentes,
// para que o TypeScript avise se algum campo faltar ou tiver o tipo errado.
export type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
};
`
            },
            {
                caminho: 'src/data/produtos.ts',
                lang: 'ts',
                acao: 'CRIAR',
                codigo: `
import type { Produto } from '../types/Produto'

// Dados fixos para a aula. Em um sistema real, viriam de uma API.
// Produto[] = um array de Produto
const produtos: Produto[] = [
  { id: 1, nome: 'Teclado', descricao: 'Teclado mecânico ABNT2.', preco: 249.9 },
  { id: 2, nome: 'Mouse', descricao: 'Mouse óptico sem fio.', preco: 89.9 },
  { id: 3, nome: 'Monitor', descricao: 'Monitor de 24 polegadas Full HD.', preco: 899 },
  { id: 4, nome: 'Headset', descricao: 'Fone com microfone e cancelamento de ruído.', preco: 199.5 },
];

export default produtos
`
            },
            {
                caminho: 'src/components/ProdutoCard.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                nota: '<code>toLocaleString</code> formata o número como moeda brasileira (R$ 249,90).',
                codigo: `
import Card from './ui/Card'
import type { Produto } from '../types/Produto'

type ProdutoCardProps = {
  produto: Produto;
};

// Componente de aplicação: conhece o que é um "produto".
// Reaproveita o Card (componente de UI) para a parte visual.
function ProdutoCard({ produto }: ProdutoCardProps) {
  // O TypeScript sabe que produto.preco é number, então
  // o editor sugere toLocaleString e outros métodos de número
  const preco = produto.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Card titulo={produto.nome}>
      <p>{produto.descricao}</p>
      <p className="preco">{preco}</p>
    </Card>
  );
}

export default ProdutoCard
`
            },
            {
                caminho: 'src/App.tsx',
                lang: 'tsx',
                acao: 'SUBSTITUIR',
                nota: 'Versão de teste: na aula 08 esta lista vai para a página de Produtos.',
                codigo: `
import Alerta from './components/ui/Alerta'
import ProdutoCard from './components/ProdutoCard'
import Rodape from './components/Rodape'
import produtos from './data/produtos'

function App() {
  return (
    <div className="app">
      <main className="conteudo">
        <h1>Produtos</h1>

        <Alerta>Preços válidos somente para compras online.</Alerta>

        <div className="grade">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </main>

      <Rodape />
    </div>
  );
}

export default App
`
            }
        ],
        perguntas: [
            {
                texto: 'Como se escreve, em TypeScript, o tipo "array de <code>Produto</code>"?',
                respostas: ['Produto[]', 'Array<Produto>'],
                dica: 'Digite o tipo...'
            },
            {
                texto: 'Qual método de array transforma cada produto em um <code>&lt;ProdutoCard&gt;</code>?',
                respostas: ['map', 'map()', '.map', '.map()'],
                dica: 'Digite o nome do método...'
            },
            {
                texto: 'Qual prop especial o React exige em cada item de uma lista para identificá-lo?',
                respostas: ['key'],
                dica: 'Digite o nome da prop...'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 07
    // ------------------------------------------------------------------
    {
        menu: 'React Router',
        tag: 'Navegação em uma SPA',
        titulo: 'Instalando o React Router',
        teoria: `
            <p>Até aqui, a aplicação tem uma tela só. Para ter várias páginas (Início, Produtos, Sobre) sem perder a característica de <strong>SPA</strong>, usamos o <strong>React Router</strong>.</p>
            <h3>Como funciona a navegação em uma SPA</h3>
            <p>Em um site tradicional, cada clique em um link pede uma nova página HTML ao servidor e o navegador recarrega tudo. Em uma SPA, o roteador:</p>
            <ol>
                <li>intercepta o clique no link;</li>
                <li>troca a URL na barra de endereço, sem recarregar (usando a <em>History API</em> do navegador);</li>
                <li>escolhe qual componente exibir para aquela URL.</li>
            </ol>
            <p>O resultado é uma navegação instantânea, e o estado da aplicação não se perde entre as páginas.</p>
            <h3>Instalação</h3>
            <p>O pacote se chama <code>react-router</code>. Em materiais antigos você verá <code>react-router-dom</code>: a partir da versão 7, os dois foram unificados e basta o <code>react-router</code>.</p>
            <h3>BrowserRouter</h3>
            <p>O componente <code>BrowserRouter</code> precisa <strong>envolver a aplicação inteira</strong>, para que qualquer componente dentro dele possa usar links e rotas. O lugar natural é o <code>main.tsx</code>, onde o <code>App</code> é renderizado.</p>
            <p>Instale o pacote (pare o servidor com <code>Ctrl + C</code>, instale e rode <code>npm run dev</code> de novo) e atualize o <code>main.tsx</code>.</p>
        `,
        arquivos: [
            {
                caminho: 'Terminal',
                lang: 'bash',
                codigo: `
npm install react-router
`
            },
            {
                caminho: 'src/main.tsx',
                lang: 'tsx',
                acao: 'SUBSTITUIR',
                nota: 'Versão final do <code>main.tsx</code>.',
                codigo: `
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App'

// getElementById pode retornar null (se o elemento não existir).
// O "!" diz ao TypeScript: "garanto que o #root existe no index.html".
const raiz = document.getElementById('root')!;

// BrowserRouter envolve a aplicação inteira para que as rotas funcionem
createRoot(raiz).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
`
            }
        ],
        perguntas: [
            {
                texto: 'Qual componente do React Router envolve a aplicação inteira no <code>main.tsx</code>?',
                respostas: ['BrowserRouter', '<BrowserRouter>'],
                dica: 'Digite o nome do componente...'
            },
            {
                texto: 'Qual comando instala o React Router no projeto?',
                respostas: ['npm install react-router', 'npm i react-router'],
                dica: 'Digite o comando completo...'
            },
            {
                texto: 'SPA é a sigla de <em>Single ____ Application</em>. Qual palavra está faltando?',
                respostas: ['Page'],
                dica: 'Digite a palavra em inglês...'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 08
    // ------------------------------------------------------------------
    {
        menu: 'Páginas',
        tag: 'Página × componente',
        titulo: 'Criando as páginas',
        teoria: `
            <p>Uma <strong>página</strong> é escrita do mesmo jeito que um componente (uma função que retorna JSX). A diferença é o <strong>papel</strong>:</p>
            <ul>
                <li>uma <strong>página</strong> corresponde a uma rota (URL) e monta a tela inteira;</li>
                <li>um <strong>componente</strong> é uma peça reutilizada dentro das páginas.</li>
            </ul>
            <p>Por isso as páginas ficam em uma pasta própria, <code>src/pages</code>, e usam os componentes de <code>src/components</code>. Note que, a partir daqui, os imports começam com <code>../</code>: a página está em <code>src/pages</code> e precisa subir uma pasta para chegar em <code>src/components</code>.</p>
            <h3>Link × &lt;a&gt;</h3>
            <p>Para navegar entre páginas, use o componente <code>Link</code> do React Router, com a prop <code>to</code>, no lugar de <code>&lt;a href&gt;</code>:</p>
            <pre data-lang="tsx"><code>&lt;Link to="/produtos"&gt;Ver produtos&lt;/Link&gt;</code></pre>
            <p>Com <code>&lt;a&gt;</code>, o navegador recarregaria a aplicação inteira, perdendo o estado. O <code>Link</code> gera um <code>&lt;a&gt;</code> no HTML, mas intercepta o clique e só troca a URL.</p>
            <h3>As quatro páginas</h3>
            <ul>
                <li><strong>Home</strong>: boas-vindas, usando <code>Alerta</code>, <code>Card</code> e um <code>Link</code>.</li>
                <li><strong>Produtos</strong>: a lista com <code>map</code> que estava no <code>App</code>.</li>
                <li><strong>Sobre</strong>: texto e a estrutura do projeto. A árvore usa uma <em>template string</em> dentro de <code>&lt;pre&gt;</code> para preservar as quebras de linha.</li>
                <li><strong>NaoEncontrada</strong>: exibida quando a URL não existe (a página 404).</li>
            </ul>
            <div class="nota">As páginas só aparecem na tela depois da próxima aula, quando criarmos as rotas. Até lá, o <code>App</code> continua mostrando a lista de teste.</div>
        `,
        arquivos: [
            {
                caminho: 'src/pages/Home.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
import { Link } from 'react-router'
import Alerta from '../components/ui/Alerta'
import Card from '../components/ui/Card'

function Home() {
  return (
    <section>
      <h1>Bem-vindo à Loja React</h1>

      <Alerta tipo="sucesso">
        Frete grátis em todas as compras desta semana!
      </Alerta>

      <div className="grade">
        <Card titulo="Páginas">
          <p>Ficam em <code>src/pages</code>. Cada uma corresponde a uma rota.</p>
        </Card>
        <Card titulo="Componentes de UI">
          <p>Ficam em <code>src/components/ui</code>. São genéricos e reutilizáveis.</p>
        </Card>
        <Card titulo="Componentes da aplicação">
          <p>Ficam em <code>src/components</code>. Conhecem o domínio do sistema.</p>
        </Card>
      </div>

      <p>
        <Link to="/produtos" className="botao">Ver produtos</Link>
      </p>
    </section>
  );
}

export default Home
`
            },
            {
                caminho: 'src/pages/Produtos.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
import Alerta from '../components/ui/Alerta'
import ProdutoCard from '../components/ProdutoCard'
import produtos from '../data/produtos'

function Produtos() {
  return (
    <section>
      <h1>Produtos</h1>

      <Alerta>Preços válidos somente para compras online.</Alerta>

      {/* map transforma cada produto em um <ProdutoCard>.
          A prop "key" ajuda o React a identificar cada item da lista. */}
      <div className="grade">
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  );
}

export default Produtos
`
            },
            {
                caminho: 'src/pages/Sobre.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
function Sobre() {
  return (
    <section>
      <h1>Sobre</h1>
      <p>
        Aplicação de exemplo da disciplina de Programação Web,
        feita com React, TypeScript, Vite e React Router.
      </p>

      <h2>Estrutura do projeto</h2>
      <pre className="codigo">{\`src/
├── components/
│   ├── ui/            → componentes genéricos (Alerta, Card)
│   ├── Cabecalho.tsx  → componentes da aplicação
│   ├── Menu.tsx
│   ├── ProdutoCard.tsx
│   └── Rodape.tsx
├── data/
│   └── produtos.ts    → dados fixos
├── types/
│   └── Produto.ts     → tipos compartilhados
├── pages/             → uma página por rota
├── App.tsx            → layout e rotas
└── main.tsx           → ponto de entrada\`}</pre>
    </section>
  );
}

export default Sobre
`
            },
            {
                caminho: 'src/pages/NaoEncontrada.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
import { Link } from 'react-router'
import Alerta from '../components/ui/Alerta'

function NaoEncontrada() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <Alerta tipo="erro">O endereço acessado não existe.</Alerta>
      <p>
        <Link to="/" className="botao">Voltar para o início</Link>
      </p>
    </section>
  );
}

export default NaoEncontrada
`
            }
        ],
        perguntas: [
            {
                texto: 'Qual componente do React Router substitui a tag <code>&lt;a&gt;</code> para navegar sem recarregar a página?',
                respostas: ['Link', '<Link>'],
                dica: 'Digite o nome do componente...'
            },
            {
                texto: 'Em qual pasta ficam os componentes que correspondem a uma rota (as telas da aplicação)?',
                respostas: ['pages', 'src/pages', 'pages/', 'src/pages/'],
                dica: 'Digite o nome da pasta...'
            },
            {
                texto: 'No componente <code>Link</code>, qual prop indica o endereço de destino (no <code>&lt;a&gt;</code> seria <code>href</code>)?',
                respostas: ['to'],
                dica: 'Digite o nome da prop...'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 09
    // ------------------------------------------------------------------
    {
        menu: 'Rotas e menu',
        tag: 'Routes, Route e NavLink',
        titulo: 'Rotas, menu e cabeçalho',
        teoria: `
            <p>Agora ligamos cada URL a uma página. No <code>App.tsx</code>, o componente <code>Routes</code> olha a URL atual e exibe a <code>Route</code> correspondente:</p>
            <pre data-lang="tsx"><code>&lt;Routes&gt;
  &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
  &lt;Route path="/produtos" element={&lt;Produtos /&gt;} /&gt;
  &lt;Route path="*" element={&lt;NaoEncontrada /&gt;} /&gt;
&lt;/Routes&gt;</code></pre>
            <ul>
                <li><code>path</code>: o endereço da rota.</li>
                <li><code>element</code>: o JSX exibido quando a URL bate com o <code>path</code>.</li>
                <li><code>path="*"</code>: captura <strong>qualquer</strong> endereço sem rota. É a nossa página 404.</li>
            </ul>
            <h3>Layout: o que fica fora do Routes</h3>
            <p>Tudo o que está <strong>fora</strong> do <code>&lt;Routes&gt;</code> aparece em <strong>todas</strong> as páginas. É o lugar do cabeçalho e do rodapé. Só o miolo, dentro do <code>&lt;main&gt;</code>, muda conforme a URL.</p>
            <h3>NavLink</h3>
            <p>No menu usamos <code>NavLink</code> no lugar de <code>Link</code>. Ele funciona igual, mas adiciona automaticamente a classe <code>active</code> ao link da página atual. A regra <code>.menu a.active</code>, que já está no <code>index.css</code> desde a aula 03, destaca esse link.</p>
            <h3>Componente dentro de componente</h3>
            <p>O <code>Cabecalho</code> usa o <code>Menu</code>, e o <code>App</code> usa o <code>Cabecalho</code>. Uma aplicação React é uma <strong>árvore de componentes</strong>: cada um cuida de uma parte e delega o resto.</p>
            <p>Depois de atualizar o <code>App.tsx</code>, navegue pelo menu e teste uma URL inexistente, como <code>/qualquer</code>.</p>
        `,
        arquivos: [
            {
                caminho: 'src/components/Menu.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
import { NavLink } from 'react-router'

// NavLink funciona como o Link, mas adiciona a classe "active"
// ao link da página atual (veja .menu a.active no index.css)
function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/">Início</NavLink>
      <NavLink to="/produtos">Produtos</NavLink>
      <NavLink to="/sobre">Sobre</NavLink>
    </nav>
  );
}

export default Menu
`
            },
            {
                caminho: 'src/components/Cabecalho.tsx',
                lang: 'tsx',
                acao: 'CRIAR',
                codigo: `
import { Link } from 'react-router'
import Menu from './Menu'

// Um componente pode usar outro componente: o Cabecalho contém o Menu
function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link to="/" className="logo">Loja React</Link>
      <Menu />
    </header>
  );
}

export default Cabecalho
`
            },
            {
                caminho: 'src/App.tsx',
                lang: 'tsx',
                acao: 'SUBSTITUIR',
                nota: 'Versão final do <code>App.tsx</code>: layout e rotas.',
                codigo: `
import { Routes, Route } from 'react-router'

import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Sobre from './pages/Sobre'
import NaoEncontrada from './pages/NaoEncontrada'

function App() {
  return (
    <div className="app">
      {/* Fora do <Routes>: aparece em todas as páginas */}
      <Cabecalho />

      <main className="conteudo">
        {/* Dentro do <Routes>: muda de acordo com a URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App
`
            }
        ],
        perguntas: [
            {
                texto: 'Qual valor de <code>path</code> captura qualquer endereço que não tenha rota, exibindo a página não encontrada?',
                respostas: ['*', '"*"'],
                dica: 'Digite o valor...'
            },
            {
                texto: 'Qual classe CSS o <code>NavLink</code> adiciona automaticamente ao link da página atual?',
                respostas: ['active', '.active'],
                dica: 'Digite o nome da classe...'
            },
            {
                texto: 'Qual componente agrupa as <code>&lt;Route&gt;</code> e escolhe qual delas exibir de acordo com a URL?',
                respostas: ['Routes', '<Routes>'],
                dica: 'Digite o nome do componente...'
            }
        ]
    },

    // ------------------------------------------------------------------
    // AULA 10
    // ------------------------------------------------------------------
    {
        menu: 'Build e publicação',
        tag: 'Verificação de tipos e deploy',
        titulo: 'Build, verificação de tipos e publicação',
        teoria: `
            <p>Com a aplicação pronta, falta gerar a <strong>versão de produção</strong>: arquivos HTML, CSS e JavaScript otimizados, que qualquer servidor estático consegue publicar.</p>
            <h3>npm run build</h3>
            <p>O script executa <code>tsc -b &amp;&amp; vite build</code>:</p>
            <ol>
                <li>o <code>tsc</code> verifica os tipos de todo o projeto. Se houver erro, o build <strong>para aqui</strong>;</li>
                <li>o Vite junta, minifica e otimiza o código na pasta <code>dist</code>.</li>
            </ol>
            <p>O <code>npm run preview</code> serve a pasta <code>dist</code> localmente (em <code>http://localhost:4173</code>), para você testar exatamente o que será publicado. O <code>npm run lint</code> roda o <strong>oxlint</strong>, que aponta problemas comuns de código.</p>
            <h3>Experimente: um erro de tipo</h3>
            <p>Em <code>src/data/produtos.ts</code>, troque o preço do Mouse por um texto, como no trecho abaixo, e rode <code>npm run build</code>. O <code>tsc</code> recusa o código, porque o tipo <code>Produto</code> exige que <code>preco</code> seja <code>number</code>. Em JavaScript puro, esse erro só apareceria com a aplicação rodando. Desfaça a alteração depois do teste.</p>
            <h3>Publicando a pasta dist</h3>
            <p>Basta enviar o <strong>conteúdo</strong> da pasta <code>dist</code> para um servidor estático (GitHub Pages, Netlify, Vercel, Apache, Nginx...).</p>
            <div class="nota">Como é uma SPA, o servidor precisa devolver o <code>index.html</code> para qualquer endereço. Sem isso, abrir <code>/produtos</code> diretamente (ou dar F5 nessa página) gera um erro 404 do servidor, pois não existe um arquivo <code>produtos.html</code>. Cada serviço tem sua forma de configurar esse redirecionamento.</div>
            <h3>Missão cumprida</h3>
            <p>Você construiu uma aplicação com componentes de UI e de aplicação, props tipadas, listas, rotas e build de produção. Os próximos passos naturais são o <strong>estado</strong> (<code>useState</code>), para telas interativas, e a busca de dados em uma API.</p>
        `,
        arquivos: [
            {
                caminho: 'Terminal',
                lang: 'bash',
                codigo: `
# Verifica os tipos e gera a versão de produção na pasta dist
npm run build

# Serve a pasta dist localmente para testar o build
npm run preview

# Analisa o código em busca de problemas comuns
npm run lint
`
            },
            {
                caminho: 'src/data/produtos.ts (teste de erro)',
                lang: 'ts',
                acao: 'SÓ PARA TESTAR',
                nota: 'Troque a linha do Mouse por esta, rode <code>npm run build</code>, veja o erro e depois desfaça a alteração.',
                codigo: `
  { id: 2, nome: 'Mouse', descricao: 'Mouse óptico sem fio.', preco: 'barato' },
`
            }
        ],
        perguntas: [
            {
                texto: 'Qual pasta o <code>npm run build</code> gera com os arquivos prontos para publicar?',
                respostas: ['dist', 'dist/'],
                dica: 'Digite o nome da pasta...'
            },
            {
                texto: 'Qual comando serve localmente a versão de produção gerada pelo build?',
                respostas: ['npm run preview'],
                dica: 'Digite o comando completo...'
            },
            {
                texto: 'Ao trocar <code>preco: 89.9</code> por <code>preco: \'barato\'</code>, o build falha. Qual tipo o <code>Produto</code> exige para <code>preco</code>?',
                respostas: ['number'],
                dica: 'Digite o tipo...'
            }
        ]
    }
];
