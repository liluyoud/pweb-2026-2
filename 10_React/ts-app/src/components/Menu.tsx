import { NavLink } from 'react-router'

// NavLink funciona como o Link, mas adiciona a classe "active"
// ao link da página atual (veja .menu a.active no index.css)
function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/">Início</NavLink>
      <NavLink to="/produtos">Produtos</NavLink>
      <NavLink to="/sobre">Sobre</NavLink>
    </nav>
  );
}

export default Menu
