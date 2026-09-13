import React from "react";
import PropTypes from "prop-types";

export const Alert = ({ message }) => {
  return <p>{message}</p>;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};
