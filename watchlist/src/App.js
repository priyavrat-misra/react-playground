import { SearchBar, Loader, Alert } from "@react-playground/components";
import { useCallback, useState } from "react";
import { Media } from "./components/Media";
import { MediaList } from "./components/MediaList";

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
        <MediaList>
          {state.media.map((m) => (
            <Media media={m} />
          ))}
        </MediaList>
      )}
    </>
  );
}

export default App;
