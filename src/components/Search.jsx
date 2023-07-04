import React from "react";

const Search = ({ value, onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input className="search-input"
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Search..."
    />
  );
};

export default Search;
