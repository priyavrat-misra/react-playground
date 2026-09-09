import { SearchBar } from "@react-playground/components";

function App() {
  function handleSearch(searchTerm) {
    console.log(searchTerm);
  }

  return <SearchBar onSearch={handleSearch} />;
}

export default App;
