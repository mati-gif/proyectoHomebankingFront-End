import React, { useState } from 'react';
import TransactionSelectAccountDestiny from './TransactionSelectAccountDestiny';

function ImputMainTransaction() {
    const [destinationType, setDestinationType] = useState('Otros');//Controla si el tipo de destino es "Propio" o "Otros", y se inicializa en "Otros".
    const [selectedSourceAccount, setSelectedSourceAccount] = useState('');// Almacena la cuenta de origen seleccionada.
    const [selectedDestinationAccount, setSelectedDestinationAccount] = useState('');// Almacena la cuenta de destino seleccionada.

    const handleDestinationTypeChange = (event) => { //se ejecuta cuando el usuario cambia el tipo de destino (Propio u Otros)
        setDestinationType(event.target.value); //Actualiza el estado destinationType con el nuevo valor.
        setSelectedSourceAccount(''); // Resetear para limpiar las cuentas seleccionadas cuando se cambia el tipo de destino.
        setSelectedDestinationAccount('');
    };

    const handleSourceAccountChange = (event) => {//se ejecuta cuando el usuario selecciona una cuenta de origen. 
        setSelectedSourceAccount(event.target.value);//Actualiza el estado selectedSourceAccount con la cuenta seleccionada.
        // Si se selecciona la cuenta de origen, resetear la cuenta destino si es la misma
        if (event.target.value === selectedDestinationAccount) {
            setSelectedDestinationAccount('');////Si la cuenta seleccionada es la misma que la cuenta de destino, resetea selectedDestinationAccount para evitar que ambas cuentas sean iguales.
        }
    };

    const handleDestinationAccountChange = (event) => {//se ejecuta cuando el usuario selecciona una cuenta de destino.
        setSelectedDestinationAccount(event.target.value);//Actualiza el estado selectedDestinationAccount con la cuenta seleccionada.

        if (event.target.value === selectedSourceAccount) { //Si la cuenta seleccionada es la misma que la cuenta de origen, resetea selectedSourceAccount para evitar que ambas cuentas sean iguales.
            setSelectedSourceAccount('');
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
                Type of destination:
            </label>
            <div className="flex space-x-4">
                <label className='ml-10'> Owns
                    <input className='ml-5' type="radio" name="destinationType" value="Propio" checked={destinationType === 'Propio'}
                        onChange={handleDestinationTypeChange} />
                </label>
                <label className='ml-10'>Others
                    <input className='ml-5' type="radio" name="destinationType" value="Otros" checked={destinationType === 'Otros'}
                        onChange={handleDestinationTypeChange} />
                </label>
            </div>

            {destinationType === 'Propio' && (
                <div className="mb-4 mt-14">
                    <TransactionSelectAccountDestiny
                        label="Source Account:"
                        selectedAccount={selectedSourceAccount}
                        onChange={handleSourceAccountChange}
                        excludedAccount={selectedDestinationAccount}  // Excluir la cuenta destino.
                    />

                    <TransactionSelectAccountDestiny
                        label="Destination Account:"
                        selectedAccount={selectedDestinationAccount}
                        onChange={handleDestinationAccountChange}
                        excludedAccount={selectedSourceAccount}  // Excluir la cuenta origen
                    />
                </div>
            )}

            {destinationType === 'Otros' && (
                <div className="mb-4 mt-14">
                    <TransactionSelectAccountDestiny
                        label="Source Account:"
                        selectedAccount={selectedSourceAccount}
                        onChange={handleSourceAccountChange}
                    />

                    <div className="mb-4  mt-14">
                        <label htmlFor="destinationAccount" className="block text-gray-700 text-lg font-bold mb-4">
                            Destination Account:
                        </label>
                        <input
                            id="destinationAccount"
                            className="mt-2 border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none"
                            type="text"
                            value={selectedDestinationAccount}
                            onChange={handleDestinationAccountChange}
                            required
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImputMainTransaction;
