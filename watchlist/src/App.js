import { SearchBar } from "@react-playground/components";
import { useEffect, useState } from "react";

function App() {
  const [media, setMedia] = useState([]);

  useEffect(() => handleSearch("star wars"), []);

  function handleSearch(searchTerm) {
    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}`,
    )
      .then((res) => res.json())
      .then((data) => setMedia(data.Search));
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ul style={{ padding: 0 }}>
        {media.map(
          ({
            Title: title,
            Year: year,
            imdbID,
            Type: type,
            Poster: poster,
          }) => (
            <li
              key={imdbID}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "8px 16px",
              }}
            >
              <img
                src={poster}
                alt={`${title}'s poster`}
                style={{
                  height: 128,
                }}
              />
              <div style={{ marginRight: "auto" }}>
                <p>{title}</p>
                <p>{year}</p>
              </div>
            </li>
          ),
        )}
      </ul>
    </>
  );
}

export default App;
