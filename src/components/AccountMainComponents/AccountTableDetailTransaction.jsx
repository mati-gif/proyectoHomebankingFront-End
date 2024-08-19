import React from "react";

function AccountTableDetailTransaction({ type, amount, date, description }) {
    const cardColors = {
        CREDITO: 'text-green-500',
        DEBITO: 'text-red-500',
    };

    return (
        <tr className="bg-gray-100 border-b bg-gray-700 text-white">
            <td className={`p-2 ${cardColors[type]}`}>{type}</td>
            <td className="p-2">${amount}</td>
            <td className="p-2">{date}</td>
            <td className="p-2">{description}</td>
        </tr>
    );
}

export default AccountTableDetailTransaction;
