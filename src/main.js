import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = document.querySelector('.products');

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
  await fetchProductsList('computador')
    .then((response) => {
      response.forEach((element) => {
        const productElement = createProductElement(element);
        products.appendChild(productElement);
      });

      removeElement.parentNode.removeChild(removeElement);
    })
    // captura o erro e lança na tela.
    .catch(() => {
      removeElement.parentNode.removeChild(removeElement);
      return displayError();
    });
};

createElements();
