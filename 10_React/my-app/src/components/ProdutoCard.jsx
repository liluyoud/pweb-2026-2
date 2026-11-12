import Card from './ui/Card'

// Componente de aplicação: conhece o que é um "produto".
// Reaproveita o Card (componente de UI) para a parte visual.
function ProdutoCard({ produto }) {
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
