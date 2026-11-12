import type { ReactNode } from 'react'

// Componente de UI: genérico, sem regra de negócio.
// As props são descritas por um tipo:
//   tipo     → opcional (?), e só aceita um destes três textos (união de literais)
//   children → o conteúdo escrito entre <Alerta> e </Alerta>
//              ReactNode = qualquer coisa que o React sabe exibir (texto, JSX, números...)
type AlertaProps = {
  tipo?: 'info' | 'sucesso' | 'erro';
  children: ReactNode;
};

function Alerta({ tipo = 'info', children }: AlertaProps) {
  return (
    <div className={`alerta alerta-${tipo}`} role="alert">
      {children}
    </div>
  );
}

export default Alerta
