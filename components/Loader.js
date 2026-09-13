import React from "react";
import PropTypes from "prop-types";

export const Loader = ({ text = "Loading..." }) => {
  return <p>{text}</p>;
};

Loader.propTypes = {
  text: PropTypes.string,
};
