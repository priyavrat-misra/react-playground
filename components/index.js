import PropTypes from "prop-types";
import React, { useState } from "react";

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

export const Loader = ({ text = "Loading..." }) => {
  return <p>{text}</p>;
};

Loader.propTypes = {
  text: PropTypes.string,
};

export const Alert = ({ message }) => {
  return <p>{message}</p>;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
