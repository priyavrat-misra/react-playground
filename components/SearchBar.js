import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const SearchBar = ({
  debounce = 0,
  placeholder = "Search",
  onSearch,
  onClear,
}) => {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);
    if (!value) onClear?.();
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query);
  }

  useEffect(() => {
    if (debounce && query) {
      const timer = setTimeout(() => {
        onSearch(query);
      }, debounce);
      return () => clearTimeout(timer);
    }
  }, [query, onSearch, debounce]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  debounce: PropTypes.number,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};
