import type { Produto } from '../types/Produto'

// Dados fixos para a aula. Em um sistema real, viriam de uma API.
// Produto[] = um array de Produto
const produtos: Produto[] = [
  { id: 1, nome: 'Teclado', descricao: 'Teclado mecânico ABNT2.', preco: 249.9 },
  { id: 2, nome: 'Mouse', descricao: 'Mouse óptico sem fio.', preco: 89.9 },
  { id: 3, nome: 'Monitor', descricao: 'Monitor de 24 polegadas Full HD.', preco: 899 },
  { id: 4, nome: 'Headset', descricao: 'Fone com microfone e cancelamento de ruído.', preco: 199.5 },
];

export default produtos
