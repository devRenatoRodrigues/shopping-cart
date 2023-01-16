import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = document.querySelector('.products');

const createElements = async () => {
  const productsArr = await fetchProductsList('computador');

  productsArr.forEach((element) => {
    const productElement = createProductElement(element);
    products.appendChild(productElement);
  });
  // for (const product of productsArr) {
  //     return console.log(product);
  // }
};

console.log(createElements());
