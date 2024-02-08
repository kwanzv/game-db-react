import "./App.css";
import Card from "./card.jsx";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";

const currentDate = new Date().toISOString().split("T")[0];
const currentYear = new Date().getFullYear();

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
      `https://api.rawg.io/api/games?key=${API_KEY}&dates=${currentDate}&platforms=187,1`
    );
    const data = await response.json();
    setGames(data.results);
  };

  function handleChange(event) {
    setSearchTerm(event.currentTarget.value);
  }

  const searchGames = async (e) => {
    const response = await fetch(
      `https://api.rawg.io/api/games/${searchTerm}?key=${API_KEY}`
    );
    const data = await response.json();
    setGames(data);
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
      return <Card game={games} key={games.id} />;
    }
  }

  const fetchGames = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&dates=${currentYear}-01-01,${currentDate}&platforms=187,1`
    );
    const gamesData = await response.json();
    setGames(gamesData.results);
  };

  const handleWorstReviewed = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=1,60`
    );
    const gamesData = await response.json();
    setGames(gamesData.results);
  };

  return (
    <>
      <Sidebar
        handleBestReviewed={loadGames}
        handleNewlyReleased={fetchGames}
        handleWorstReviewed={handleWorstReviewed}
      />
      <h1 className="text-5xl p-4 font-mono ">Games Library</h1>
      <form className="form flex justify-center gap-x-4" onSubmit={searchGames}>
        <input
          className="input p-4 border-r-2 outline-none border-none "
          placeholder="Click here"
          type="text"
          name="search"
          onChange={handleChange}
          value={searchTerm}
        ></input>
        <button
          onClick={searchGames}
          className="p-4 bg-white text-black hover:bg-slate-400"
        >
          Search
        </button>
      </form>
      <div className="cards-container">
        <ShowGames />
      </div>
    </>
  );
}

export default App;
