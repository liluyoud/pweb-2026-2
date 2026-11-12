// Componente de UI: uma "caixa" com título opcional.
// Props:
//   titulo   → texto do título (opcional)
//   children → o conteúdo do card
function Card({ titulo, children }) {
  return (
    <div className="card">
      {titulo && <h3 className="card-titulo">{titulo}</h3>}
      {children}
    </div>
  );
}

export default Card
