import React, { useState } from "react";
import PropTypes from "prop-types";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch?.(query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="star wars"
      />
      <button type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
