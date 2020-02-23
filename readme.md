# Weather Playlist

API que retorna as faixas de uma playlist do Spotify, selecionando o genêro de acordo com a temperatura da cidade. A cidade poderá ser informada pelo nome ou pelas coordenadas geográficas do local.

### Rotas

- **[GET]** localhost:3000/city?name={cidade}
- **[GET]** localhost:3000/coord?lat={latitude}&lon={longitude}

####Execução
Para executar API:

`$ npm install `

`$ npm run start`
