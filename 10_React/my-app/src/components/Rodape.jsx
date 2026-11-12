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
