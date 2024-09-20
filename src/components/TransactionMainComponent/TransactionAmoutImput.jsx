import React from 'react';

function TransactionAmoutImput({ value, onChange, name }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-lg font-bold mb-2">
                Amount
            </label>
            <input
                id={name}
                name={name}
                type="number"
                className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2"
                value={value}
                onChange={onChange}

            />
        </div>
    );
}

export default TransactionAmoutImput;
