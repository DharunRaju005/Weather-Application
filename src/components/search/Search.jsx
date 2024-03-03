import React from "react";
import styled from "styled-components";

const Search = ({ search, setSearch, handleSearch, handleKeyDown }) => {
  return (
    <SearchEngine>
      <CitySearch type="text" placeholder="Enter the City Name" name="Search" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={handleKeyDown} />
      <button onClick={handleSearch}>Search</button>
    </SearchEngine>
  );
};

const SearchEngine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 10px;

  & button {
    border: none;
    border-radius: 8px;
    background-color: #000000;
    color: #fff;
    font-size: 20px;
    outline: none;
    cursor: pointer;
    padding: 12px 15px;
  }
`;

const CitySearch = styled.input`
  width: 70%;
  height: 45px;
  border: 1px solid;
  border-radius: 8px;
  padding: 2px 15px;
  font-size: 15px;
  outline: none;
  background-color: #ffffff;
  color: #589555;
`;

export default Search;
