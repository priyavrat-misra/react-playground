import { SearchBar, Loader, Alert } from "@react-playground/components";
import { useCallback, useState } from "react";

function App() {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = useCallback((searchTerm) => {
    setIsLoading(true);
    setError("");
    fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong.");
        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") throw new Error(data.Error);
        setMedia(data.Search || []);
      })
      .catch((reason) => {
        setError(reason.message);
        setMedia([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SearchBar
        debounce={500}
        placeholder="star wars"
        onSearch={handleSearch}
        onClear={() => {
          setMedia([]);
          setError("");
        }}
      />
      {isLoading && <Loader text="Please wait..." />}
      {error && <Alert message={error} />}
      {!isLoading && !error && (
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
      )}
    </>
  );
}

export default App;
