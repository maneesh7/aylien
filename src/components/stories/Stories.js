import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Story from './Story';
import './Stories.scss';
import SearchBar from '../searchBar/SearchBar';

const Stories = () => {
  const [stories, setStories] = useState([]);

  const handleSearch = (searchTerm) => {
    axios
      .get('news/stories', {
        headers: {
          'Content-Type': 'application/json',
          'X-AYLIEN-NewsAPI-Application-ID': '5f29b3de',
          'X-AYLIEN-NewsAPI-Application-Key': '5e0511c688ff7a9b9d4305567a0329ba'
        },
        params: {
          language: ['en'],
          perPage: 25,
          cursor: '*',
          'entities.surface_forms.text': [searchTerm]
        }
      })
      .then(function (response) {
        setStories(response.data.stories);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="stories">
      <SearchBar handleSearch={handleSearch} />

      {stories.length === 0 && (
        <>
          <h2>No Data Found!! </h2>
          <span> Please change search criteria</span>
        </>
      )}
      {stories.length !== 0 && <h2 className="title">Stories</h2>}
      {stories.map((story, index) => {
        return (
          <div key={story.id + index}>
            <Story story={story} />
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
