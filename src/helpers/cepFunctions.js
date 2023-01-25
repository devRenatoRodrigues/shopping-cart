export const getAddress = (CEP) => {
  const awesomeCep = `https://cep.awesomeapi.com.br/json/${CEP}`;
  const brasilCep = `https://brasilapi.com.br/api/cep/v2/${CEP}`;

  const requests = [awesomeCep, brasilCep];
  const promise = requests.map((request) => fetch(request)
    .then((res) => res.json()));
  return Promise.any(promise);
};

export const searchCep = () => {
  const getInputValue = document.querySelector('.cep-input').value;
  const addressText = document.querySelector('.cart__address');
  getAddress(getInputValue)
    .then(({ address, city, district, state, cep }) => {
      if (!cep) throw new Error('CEP não encontrado');
      addressText.innerText = `${address} - ${district} - ${city} - ${state}`;
    })
    .catch((error) => {
      addressText.innerText = error.message;
    });
};
