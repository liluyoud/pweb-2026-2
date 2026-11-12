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
