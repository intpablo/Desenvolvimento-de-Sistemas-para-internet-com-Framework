import React, { useState, useEffect } from 'react'; // Importando as bibliotecas React, useState e useEffect
import './App.css'; // Importando o arquivo CSS para estilização
import Card from './components/Card'; // Importando o componente Card

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6", // Chave da API de previsão do tempo
  base: "https://api.openweathermap.org/data/2.5/" // URL base da API de previsão do tempo
}

function App() {
  const [query, setQuery] = useState(""); // Definindo um estado para a consulta do usuário
  const [weather, setWeather] = useState(null); // Definindo um estado para os dados do clima
  const [date, setDate] = useState(""); // Definindo um estado para a data formatada

  const search = evt => { // Função para lidar com a pesquisa
    evt.preventDefault(); // Evita que o formulário seja enviado

    if (query.trim() === "") { // Verifica se a consulta está vazia ou contém apenas espaços em branco
      alert("Por favor, insira o nome de alguma cidade antes de pesquisar"); // Exibe um alerta se a consulta estiver vazia
      return; // Retorna sem continuar a execução
    }

    fetchData(query); // Chama a função fetchData para buscar os dados do clima com a consulta fornecida
  }

  const fetchData = async (city) => { // Função para buscar os dados do clima com base na cidade
    try {
      const response = await fetch(`${api.base}weather?q=${city}&lang=pt_br&units=metric&APPID=${api.key}`); // Faz uma solicitação à API de previsão do tempo
      const result = await response.json(); // Converte a resposta em formato JSON

      // Extrair a data da resposta e formatá-la (se necessário)
      const timestamp = result.dt; // Obtém o timestamp da previsão do tempo
      const date = new Date(timestamp * 1000); // Converte o timestamp em milissegundos
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('pt-BR', options); // Formata a data para exibição
      const { coord } = result;

      const countryResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coord.lat}&lon=${coord.lon}&format=json`); // Faz uma solicitação para obter o nome do país com base nas coordenadas
      const countryResult = await countryResponse.json(); // Converte a resposta em formato JSON

      result.countryName = countryResult.address.country; // Adiciona o nome do país aos dados de clima

      setWeather(result); // Define os dados do clima no estado
      setDate(formattedDate); // Define a data formatada no estado
    } catch (error) {
      console.error("Error fetching weather data:", error); // Registra erros de busca de dados de clima
    }
  };

  useEffect(() => {
    fetchData("Sao Paulo"); // Como padrao o app inicia com a busca feita em São Paulo
  }, []);

  let isHot = false;
  if (weather && weather.main.temp > 15) {
    isHot = true;
  }

  return (
    <div className="form">
      <form className='center-form' onSubmit={search}>
        <input 
          type='text'
          placeholder='Cidade'
          className='pesquisa sombra'
          value={query}
          onChange={e => setQuery(e.target.value)}
        ></input>
        <button 
          type='submit'
          className='buttom sombra'>
          Pesquisar
        </button>
      </form>
      {weather && <Card weather={weather} date={date} isHot={isHot} />}
    </div>
  );//Vai redenrizar o card 
}

export default App; // Exporta o componente App
