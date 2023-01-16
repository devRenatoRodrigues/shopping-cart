export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async () => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`)
    const data = await response.json()
    console.log(data);
  }

};
