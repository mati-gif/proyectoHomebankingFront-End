import React from 'react';

function Button({ children, className, onClick }) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <button
        onClick={onClick} // Usa la función onClick pasada como prop
        className={`text-white px-4 py-2 rounded ${className}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
