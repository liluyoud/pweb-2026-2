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
