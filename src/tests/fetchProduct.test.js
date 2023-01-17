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
  it('testa se o retorno da função é uma estrutura de dados igual a que se encontra em `product`', async () => {
    const expected = await fetchProduct('MLB1405519561')
    expect(expected).toEqual(product);
  });
  it('testa se retorna um error quando não passa nenhum argumento na função', async () => {
    const emptyProduct = '';

    try{
      await fetchProduct(emptyProduct)
    } catch (error){
      console.log(error.message)
      expect(error.message).toBe('ID não informado')
      expect(error).toEqual(new Error('ID não informado'))
    }

  });
});
