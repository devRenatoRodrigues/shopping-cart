import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = document.querySelector('.products');

const loading = () => {
  const newElement = document.createElement('h1');
  newElement.innerText = 'Carregando...';
  newElement.classList.add('loading');
  products.appendChild(newElement);
};

const createElements = async () => {
  loading();
  const productsArr = await fetchProductsList('computador');
  productsArr.forEach((element) => {
    const productElement = createProductElement(element);
    products.appendChild(productElement);
  });
  const removeElement = document.querySelector('.loading');
  removeElement.parentNode.removeChild(removeElement);
};

createElements();
