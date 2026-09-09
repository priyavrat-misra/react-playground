import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search OMDb"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default App;
