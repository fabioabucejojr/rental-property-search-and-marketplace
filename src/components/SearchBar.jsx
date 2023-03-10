import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({data, setSearchResults}) {
    const handleSubmit = (e) => {
        e.preventDefault();

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(data);

        const resultsArray = data.filter((data) => data.title.includes(e.target.value) || data.body.includes(e.target.value));

        setSearchResults(resultsArray);

    }
  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search--input"
          type="text"
          id="text"
          onChange={handleSearchChange}
        />
        <button className="search--button" type="submit">
          <FaSearch />
        </button>
      </form>
    </header>
  )
}};
