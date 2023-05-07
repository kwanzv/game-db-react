import "./App.css";
import Card from "./card.jsx";
import { useState, useEffect } from "react";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    searchGames();
  }, []);

  const API_KEY = `95080834b5254574a4a989fb96a90eec`;

  const searchGames = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-12-01,2023-04-30&platforms=18,1,7`
    );
    const data = await response.json();
    setGames(data.results);
    console.log(games);
  };

  return (
    <>
      <h1>Vidya Games</h1>

      <div className="cards-container">
        {games.length > 0 ? (
          games.map((game) => {
            return <Card game={game} key={game.id} />;
          })
        ) : (
          <h2>No movies found</h2>
        )}
      </div>
    </>
  );
}

export default App;
