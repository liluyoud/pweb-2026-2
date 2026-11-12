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
