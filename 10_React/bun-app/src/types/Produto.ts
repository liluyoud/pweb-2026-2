// O "formato" de um produto. Usado nos dados e nos componentes,
// para que o TypeScript avise se algum campo faltar ou tiver o tipo errado.
export type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
};
