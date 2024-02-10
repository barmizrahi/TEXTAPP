import React from 'react';

export const TaskButton = ({ title, onClickFunc }) => {
  const handleClick = () => {
    // Execute the custom onClickFunc if provided
      onClickFunc();
  };

  return (
    <button
      style={{
        background: 'none',
        color: 'inherit',
        border: 'solid 1px black',
        padding: '0',
        font: 'inherit',
        cursor: 'pointer',
        outline: 'inherit'
      }}
      onClick={handleClick} // Attach click event handler
    >
      <h1>{title}</h1>
    </button>
  );
};
