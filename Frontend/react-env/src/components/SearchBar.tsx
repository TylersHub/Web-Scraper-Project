import React, { useState } from "react";

interface Props {
  inputLabel: string;
  inputPlaceholder: string;
  onSearch: (query: string) => void; // pass search term back to parent
}

const SearchBar = ({ inputLabel, inputPlaceholder, onSearch }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <label htmlFor="searchInput" className="form-label">
        {inputLabel}
      </label>
      <input
        type="text"
        className="form-control"
        id="searchInput"
        placeholder={inputPlaceholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
