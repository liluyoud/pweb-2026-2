import type { ReactNode } from 'react'

// Componente de UI: uma "caixa" com título opcional.
type CardProps = {
  titulo?: string;      // opcional
  children: ReactNode;  // o conteúdo do card
};

function Card({ titulo, children }: CardProps) {
  return (
    <div className="card">
      {titulo && <h3 className="card-titulo">{titulo}</h3>}
      {children}
    </div>
  );
}

export default Card
