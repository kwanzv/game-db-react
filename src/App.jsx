import "./App.css";
import Card from "./card.jsx";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";

const currentDate = new Date().toISOString().split("T")[0];
const currentYear = new Date().getFullYear();

function App() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
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

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games/${searchTerm}?key=${API_KEY}`
    );

    if (!response.ok) {
      // Handle the case where the request fails
      console.error("Failed to fetch data");
      setGames([]); // Set games to an empty array
      return; // Exit the function
    }

    const data = await response.json();

    if (data.detail === "Not found") {
      // Handle the case where the game is not found
      console.error("Game not found");
      setGames([]); // Set games to an empty array
      return;
    }
    if (data.redirect && data.slug) {
      // Handle the case where the API returns a redirect
      console.log(`Redirecting to: ${data.slug}`);
      handleRedirect(data.slug);
      return;
    }

    setGames(Array.isArray(data) ? data : [data]); // Ensure games is an array
  };

  const handleRedirect = async (redirectSlug) => {
    const response = await fetch(
      `https://api.rawg.io/api/games/${redirectSlug}?key=${API_KEY}`
    );

    if (!response.ok) {
      // Handle the case where the redirect request fails
      console.error("Failed to fetch redirected data");
      setGames([]); // Set games to an empty array
      return;
    }

    const data = await response.json();
    setGames(Array.isArray(data) ? data : [data]); // Ensure games is an array
  };

  function ShowGames() {
    if (Array.isArray(games)) {
      if (games.length > 0) {
        return games.map((game) => <Card game={game} key={game.id} />);
      }
      return <h2>No games found :( </h2>;
    }
    // If games is not an array, assume it's a single game object
    return games ? <Card game={games} key={games.id} /> : null;
  }

  const handleNewlyReleased = async () => {
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
        handleNewlyReleased={handleNewlyReleased}
        handleWorstReviewed={handleWorstReviewed}
      />
      <h1 className="text-5xl p-4 font-mono ">Games Library</h1>
      <form
        className="form flex justify-center gap-x-4"
        onSubmit={(event) => {
          event.preventDefault(); // Prevent default form submission
          const formattedSearchTerm = document
            .querySelector("input")
            .value.replaceAll(" ", "-"); // Replace blank spaces with hyphens
          setSearchTerm(formattedSearchTerm);
          handleSearch();
          // Add your additional logic here, such as submitting the form data
        }}
      >
        <input
          className="input p-4 border-r-2 outline-none border-none"
          placeholder="Enter search term"
          type="text"
          name="search"
        ></input>
        <button className="p-4 bg-white text-black hover:bg-slate-400">
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
