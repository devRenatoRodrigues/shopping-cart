import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('testa se fetch product e uma função', () => {
    const expected = typeof fetchProduct;
    expect(expected).toBe('function');
  });
  it('testa se a função `fecthProduct` foi chamada', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  it('testa se a fetch foi chamada com o endpoint correto ao passar o argumento `MLB1405519561`', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  it('testa se fetch product e uma função', async () => {
    const expected = await fetchProduct('computador')
    expect(expected).toEqual(product);
  });
  it('testa se fetch product e uma função', async () => {
    const emptyProduct = '';

    await expect(fetchProduct(emptyProduct)).rejects.toThrow(new Error('ID não informado'));
  });
});
