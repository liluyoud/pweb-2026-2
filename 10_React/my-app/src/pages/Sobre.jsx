function Sobre() {
  return (
    <section>
      <h1>Sobre</h1>
      <p>
        Aplicação de exemplo da disciplina de Programação Web,
        feita com React, Vite e React Router.
      </p>

      <h2>Estrutura do projeto</h2>
      <pre className="codigo">{`src/
├── components/
│   ├── ui/            → componentes genéricos (Alerta, Card)
│   ├── Cabecalho.jsx  → componentes da aplicação
│   ├── Menu.jsx
│   ├── ProdutoCard.jsx
│   └── Rodape.jsx
├── data/
│   └── produtos.js    → dados fixos
├── pages/             → uma página por rota
├── App.jsx            → layout e rotas
└── main.jsx           → ponto de entrada`}</pre>
    </section>
  );
}

export default Sobre
