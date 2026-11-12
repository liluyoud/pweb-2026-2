import { Routes, Route } from 'react-router'

import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Sobre from './pages/Sobre'
import NaoEncontrada from './pages/NaoEncontrada'

function App() {
  return (
    <div className="app">
      {/* Fora do <Routes>: aparece em todas as páginas */}
      <Cabecalho />

      <main className="conteudo">
        {/* Dentro do <Routes>: muda de acordo com a URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}

export default App
