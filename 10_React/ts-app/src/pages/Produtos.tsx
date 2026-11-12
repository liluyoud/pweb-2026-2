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
