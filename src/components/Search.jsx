import React from "react";

const Search = ({ value, onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Search..."
    />
  );
};

export default Search;
