import React, { useEffect, useRef, useState } from 'react';
import './SearchBar.scss';
import { GoSearch } from 'react-icons/go';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import AutoComplete from './AutoComplete';

const SearchBar = ({ handleSearch }) => {
  const searchRef = useRef(null);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const handleClick = (searchTerm) => {
    searchRef.current.value = searchTerm;
    handleSearch(searchTerm);
    setAutoCompleteData([]);
  };

  const handleButtonClick = () => {
    handleSearch(searchRef.current.value);
  };

  const clearSearch = () => {
    searchRef.current.value = '';
    setShowDeleteIcon(false);
  };

  const handleChange = () => {
    if (searchRef.current.value !== '' && !showDeleteIcon) {
      setShowDeleteIcon(true);
    }
    setAutoCompleteData([]);
    if (searchRef.current.value === '') return;
    axios
      .get('news/autocompletes', {
        headers: {
          'Content-Type': 'application/json',
          'X-AYLIEN-NewsAPI-Application-ID': 'f562734b',
          'X-AYLIEN-NewsAPI-Application-Key': '242d78e610884df2e931d0d94a99446a'
        },
        params: {
          type: 'dbpedia_resources',
          term: searchRef.current.value,
          language: 'en',
          perPage: 3
        }
      })
      .then(function (response) {
        setAutoCompleteData(response.data.autocompletes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="searchBox">
      <div className="search">
        <GoSearch />
        <input
          ref={searchRef}
          type="text"
          placeholder="Companies, Organisations, People or Places..."
          onChange={handleChange}
        />
        {showDeleteIcon && (
          <IoCloseOutline className="clearSearch" onClick={clearSearch} />
        )}
        <button onClick={handleButtonClick}>SEARCH</button>
      </div>
      {autoCompleteData.length > 0 && (
        <AutoComplete data={autoCompleteData} handleClick={handleClick} />
      )}
    </div>
  );
};

export default SearchBar;
