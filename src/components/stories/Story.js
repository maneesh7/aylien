import React from 'react';
import './Story.scss';

const Story = ({ story }) => {
  const url = story.media[0]?.url;
  return (
    <div className="story">
      <h2>{story.title}</h2>
      <div className="section">
        <div className="content">{story.body}</div>
        {url && <img src={url} alt={story.title} />}
      </div>
      <button className="readMore">Read More</button>
      <div className="tags">
        {story.hashtags.map((tag, index) => {
          return (
            <div key={tag + index} className="tag">
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Story;
