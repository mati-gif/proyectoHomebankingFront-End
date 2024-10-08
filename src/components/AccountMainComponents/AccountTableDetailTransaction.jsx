import React from "react";





function AccountTableDetailTransaction({ type, amount, date, description }) {

    // Función para formatear números con separadores de miles y dos decimales
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            currency: 'USD',
            minimumFractionDigits: 2, // Asegura que siempre se muestren dos decimales
            maximumFractionDigits: 2, // Asegura que no se muestren más de dos decimales
        }).format(amount);
    };
    // Función para separar fecha y hora
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        console.log("Parsed Date object:", date); // Verifica el objeto de fecha

        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});

        console.log("Formatted Date:", formattedDate); // Debugging
        console.log("Formatted Time:", formattedTime); // Debugging
        return { date: formattedDate, time: formattedTime };
    };
    const cardColors = {
        CREDIT: 'text-green-500',
        DEBIT: 'text-red-500',
    };

    // Separar la fecha y la hora
    const { date: formattedDate, time: formattedTime } = formatDateTime(date);


    console.log("Current local time:", new Date().toString());
    console.log("Current UTC time:", new Date().toUTCString());
    return (
        <tr className="bg-gray-100 border-b bg-gray-700 text-white">
            <td className={`p-2 ${cardColors[type]}`}>{type}</td>
            <td className={`p-2 ${cardColors[type]} text-left`}>${formatAmount(amount)}</td>
            <td className="p-2">{formattedDate}</td>
            <td className="p-2">{formattedTime}</td>
            <td className="p-2">{description}</td>
        </tr>
    );
}

export default AccountTableDetailTransaction;
