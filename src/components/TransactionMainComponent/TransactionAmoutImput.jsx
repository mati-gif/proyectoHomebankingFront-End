
import React, { useState, useEffect } from 'react';


function TransactionAmoutImput({ value, onChange, name }) {

// Estado para manejar el valor formateado
const [formattedValue, setFormattedValue] = useState(value);

// Función para formatear el número con comas
const formatNumberWithCommas = (num) => {
    if (!num) return '';
    const parts = num.toString().split('.');
    // Formatear la parte entera con comas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

// Función para limpiar el número (quitar comas y espacios)
const cleanNumber = (num) => {
    return num.replace(/,/g, '').replace(/ /g, '');
};

// Manejar el cambio en el campo de entrada
const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Limpiar el valor para quitar comas y espacios
    const cleanValue = cleanNumber(inputValue);

    // Actualizar el valor formateado en el input
    setFormattedValue(formatNumberWithCommas(cleanValue));

    // Llamar a la función onChange del componente padre con el valor limpio
    onChange({
        target: {
            name: name,
            value: cleanValue
        }
    });
};

// Usamos useEffect para formatear el valor si este cambia externamente
useEffect(() => {
    setFormattedValue(formatNumberWithCommas(value));
}, [value]);

    return (
        <div className="mb-4 ">
            <label htmlFor={name} className="block text-gray-700 text-lg font-bold mb-2">
                Amount
            </label>
            <div className='flex'>
                <span className="px-2 text-gray-700 font-bold text-3xl ">$</span>
                <input
                    id={name}
                    name={name}
                    type="text"
                    className="border-none text-right rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2"
                    value={formattedValue}
                    onChange={handleInputChange}
                    placeholder="0.00"
                />
            </div>
        </div>
    );
}

export default TransactionAmoutImput;
