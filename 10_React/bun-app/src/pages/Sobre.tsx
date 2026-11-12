function Sobre() {
  return (
    <section>
      <h1>Sobre</h1>
      <p>
        Aplicação de exemplo da disciplina de Programação Web,
        feita com React, TypeScript, Vite, React Router e Bun.
      </p>

      <h2>Estrutura do projeto</h2>
      <pre className="codigo">{`src/
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
└── main.tsx           → ponto de entrada`}</pre>
    </section>
  );
}

export default Sobre
