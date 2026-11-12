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
