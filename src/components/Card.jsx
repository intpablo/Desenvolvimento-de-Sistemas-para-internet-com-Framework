import React from "react"; // Importando a biblioteca React
import './Card.css'; // Importando o arquivo CSS para estilização

function Card({ weather, date }) { // Definindo o componente Card com propriedades weather (dados do clima) e date (data)
  if (!weather || !weather.main) { // Verificando se os dados do clima estão disponíveis
    return <div>Loading...</div>; // Retorna "Loading..." se os dados não estiverem disponíveis
  }

  const temperature = Math.round(weather.main.temp); // Arredonda a temperatura para um número inteiro
  const weatherDescription = weather.weather && weather.weather.length > 0 ? weather.weather[0].description : ""; // Obtém a descrição do clima

  let imageName = ""; // Variável para armazenar o nome da imagem de fundo
  let iconUrl = ""; // Variável para armazenar a URL do ícone do clima

  if (temperature <= 15) { // Verifica se a temperatura está abaixo de 15 graus Celsius
    imageName = "clima_abaixo_15.jpg"; // Define o nome da imagem de fundo para clima abaixo de 15 graus
    iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`; // Obtém a URL do ícone do clima
  } else {
    imageName = "clima_acima_15.jpg"; // Define o nome da imagem de fundo para clima acima de 15 graus
    iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`; // Obtém a URL do ícone do clima
  }

  return (
    <div className="card">
      <img
        src={`${process.env.PUBLIC_URL}/images/${imageName}`}
        alt={weatherDescription}
        className="card-background"
      />
      <div className="card-content">
        <span className="cidade">{weather.name}, {weather.sys.country}</span> {/* Exibe o nome da cidade e país */}
        <span className="data">{date}</span> {/* Exibe a data */}
        <div className="content-weather">
          <span className="temperatura">{temperature}</span> {/* Exibe a temperatura */}
          <span className="celsius">°C</span>
        </div>
        <img
          src={iconUrl}
          alt={weatherDescription}
          className="icon"
        />
        <span className="tempo">{weatherDescription}</span> {/* Exibe a descrição do clima */}
      </div>
    </div>
  );
}

export default Card; // Exporta o componente Card
