import React, { useEffect, useRef, useState } from 'react';
import './AutoComplete.scss';
import useClickOutside from '../../hooks/useClickOutside';

const AutoComplete = ({ data, handleClick }) => {
  const [autoComplete, setAutoComplete] = useState(data);
  const [selectedItem, setSelectedItem] = useState(0);
  const autoCompleteRef = useRef();

  useClickOutside(autoCompleteRef, () => {
    setAutoComplete([]);
  });

  const handleDown = (key) => {
    if (key.code === 'Enter') {
      autoComplete.forEach((item, index) => {
        if (selectedItem === index) {
          handleClick(item.text);
        }
      });
    }

    if (key.code === 'ArrowDown') {
      let newIndex = selectedItem + 1;
      if (newIndex <= autoComplete.length) {
        setSelectedItem(newIndex);
      }
    }
    if (key.code === 'ArrowUp') {
      console.log('Down Up');
      const index = selectedItem - 1;
      if (index >= 0) {
        setSelectedItem(index);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleDown);
    window.addEventListener('enter', handleDown);
    return () => {
      window.removeEventListener('keydown', handleDown);
    };
  }, [selectedItem]);

  return (
    <>
      {autoComplete.length > 0 && (
        <div className="autoComplete" ref={autoCompleteRef}>
          <ul>
            {autoComplete.map((result, index) => {
              return (
                <li
                  key={result.id + index}
                  className={selectedItem === index ? 'active' : ''}
                  onClick={() => {
                    handleClick(result.text);
                  }}
                >
                  {result.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default React.memo(AutoComplete);
