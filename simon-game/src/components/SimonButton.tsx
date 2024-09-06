import React from 'react';

interface SimonButtonProps {
  color:string;
  onClick: () => void;
  active: boolean;
}

const SimonButton: React.FC<SimonButtonProps> = ({ color, onClick, active }) => {
  return (
    <button
      style={{
        backgroundColor: active ? 'white' : color,
        width: '100px',
        height: '100px',
        margin: '10px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        opacity: active ? 1 : 0.9,
       transition: 'background-color 0.5s ease, opacity 0.5s ease',
      }}
      onClick={onClick}
    />
  );
};

export default SimonButton;
