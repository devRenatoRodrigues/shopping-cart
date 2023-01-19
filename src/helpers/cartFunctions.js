import { fetchProduct } from './fetchFunctions';

/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */

// função criada para calcular os preços dos produtos dentro do carrinho
export const cartPriceCalculator = async () => {
  const getId = getSavedCartIDs(); // captura os produtos através do localStorage

  const getPrices = getId.map(async (element) => { // retorna o preço dos produtos
    const getProduct = await fetchProduct(element);
    return getProduct.price;
  });

  const price = getPrices.reduce(async (acc, curr) => await acc + await curr, 0); // Soma o valor dos produtos
  const getElementTotalPrice = document.querySelector('.total-price'); // captura o elemento Total Price
  getElementTotalPrice.innerText = await price; // retorna a soma dos produtos
};

export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  cartProducts.splice(indexProduct, 1);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  cartPriceCalculator(); // função que calcula preço total no carrinho
};
