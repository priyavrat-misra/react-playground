import { SearchBar, Loader, Alert } from "@react-playground/components";
import { useCallback, useState } from "react";

function App() {
  const [state, setState] = useState({
    status: "idle",
    media: [],
    error: null,
  });

  const handleSearch = useCallback((searchTerm) => {
    setState({ status: "loading", media: [], error: null });
    fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong.");
        return res.json();
      })
      .then((data) => {
        if (data.Response === "False") throw new Error(data.Error);
        setState({ status: "success", media: data.Search || [], error: null });
      })
      .catch((reason) => {
        setState({ status: "error", media: [], error: reason.message });
      });
  }, []);

  return (
    <>
      <SearchBar
        debounce={500}
        placeholder="star wars"
        onSearch={handleSearch}
        onClear={() => {
          setState({ status: "error", media: [], error: null });
        }}
      />
      {state.status === "loading" && <Loader text="Please wait..." />}
      {state.status === "error" && <Alert message={state.error} />}
      {state.status === "success" && (
        <ul style={{ padding: 0 }}>
          {state.media.map(
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
