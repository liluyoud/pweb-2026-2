import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App'

// getElementById pode retornar null (se o elemento não existir).
// O "!" diz ao TypeScript: "garanto que o #root existe no index.html".
const raiz = document.getElementById('root')!;

// BrowserRouter envolve a aplicação inteira para que as rotas funcionem
createRoot(raiz).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
