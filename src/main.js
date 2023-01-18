import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const cartProducts = document.querySelector('.cart__products');

// função para criar um elemento e o texto 'carregando...'.
const loading = () => {
  const newElement = document.createElement('h1');
  newElement.innerText = 'Carregando...';
  newElement.classList.add('loading');
  products.appendChild(newElement);
};

// função para criar um elemento e o texto de 'erro'.
const displayError = () => {
  const errorElement = document.createElement('h1');
  errorElement.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorElement.classList.add('error');
  products.appendChild(errorElement);
};

// função que cria os elementos na tela, exibe o 'carregando...' e lança um erro caso ocorra.
const createElements = async () => {
  loading();
  const removeElement = document.querySelector('.loading');
  await fetchProductsList('computador')// pega os dados da API
    .then((response) => {
      response.forEach((element) => { // percorre todos os itens do array
        const productElement = createProductElement(element);// pega cada elemento do array e exibi na tela
        products.appendChild(productElement);
      });

      removeElement.parentNode.removeChild(removeElement);// remove o elemento carregando
    })

    .catch(() => { // captura o erro e lança na tela.
      removeElement.parentNode.removeChild(removeElement);// remove o elemento carregando
      return displayError();
    });
};

// Função que resgasta os itens do LocalStorage da ultima sessão
const cartItens = () => {
  const itens = getSavedCartIDs();//resgata o array do localstorage
  const request = itens.map(async (element) => {// percorre todos os itens do array
    const product = await fetchProduct(element);// faz a requisição para API com id dos produtos
    const createOnCart = createCartProductElement(product);
    cartProducts.appendChild(createOnCart);// adiciona os itens ao carrinho
  });
  return Promise.all(request);// espera todas as promessas ser cumprida e retorna elas na mesma ordem.
};

document.onload = cartItens();// inicia a função ao recarregar a pagina.

getSavedCartIDs();

createElements();
