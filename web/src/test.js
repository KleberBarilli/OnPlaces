var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://spott.p.rapidapi.com/places',
  params: {q: 'Lagoa Vermelha', limit: '10', country: 'BR', skip: '0', type: 'CITY'},
  headers: {
    'x-rapidapi-host': 'spott.p.rapidapi.com',
    'x-rapidapi-key': '6f211d1099mshc0d9c08b26bcb3ap16f3c9jsn60b39726be64'
  }
};

axios.request(options).then(function (response) {
	console.log(process.env.REACT_APP_BASE_RAPIDAPI_HOST)
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
