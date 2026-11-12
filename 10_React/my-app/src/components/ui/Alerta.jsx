// Componente de UI: genérico, sem regra de negócio.
// Props:
//   tipo     → "info" (padrão), "sucesso" ou "erro"
//   children → o conteúdo escrito entre <Alerta> e </Alerta>
function Alerta({ tipo = 'info', children }) {
  return (
    <div className={`alerta alerta-${tipo}`} role="alert">
      {children}
    </div>
  );
}

export default Alerta
