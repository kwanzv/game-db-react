import "./App.css";
import Card from "./card.jsx";
import { useState, useEffect } from "react";

function App() {
  
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = `95080834b5254574a4a989fb96a90eec`;

  useEffect(() => {
    loadGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadGames = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-12-01,2023-04-30&platforms=18,1,7`
    );
    const data = await response.json();
    setGames(data.results);
  };

  function handleChange(event) {
    setSearchTerm(event.currentTarget.value);
  }

  const searchGames = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.rawg.io/api/games/${searchTerm}?key=${API_KEY}`
    );
    const data = await response.json();
    setGames(data);
    console.log(games);
  };

  function ShowGames() {
    if (Array.isArray(games) === true) {
      if (games.length > 0) {
        return games.map((game) => {
          return <Card game={game} key={game.id} />;
        });
      } else if (games.length === 0) {
        return <h2>No games found :( </h2>;
      }
    } else if (Array.isArray(games) === false) {
      return  <Card game={games} key={games.id} />
    }
  }

  return (
    <>
      <h1>Vidya Games</h1>

      <form className="form" onSubmit={searchGames}>
        <label> Game title</label>

        <input
          className="input"
          placeholder="Click here"
          type="text"
          name="search"
          onChange={handleChange}
          value={searchTerm}
        ></input>
        <button onClick={searchGames}>Search</button>
      </form>

      <div className="cards-container">
        <ShowGames />
      </div>
    </>
  );
}

export default App;
