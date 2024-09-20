import React from 'react';
import TransactionSelectAccountDestiny from './TransactionSelectAccountDestiny';

function ImputMainTransaction({ value, onChange }) {
    const [destinationType, setDestinationType] = React.useState('Otros');
    const [selectedSourceAccount, setSelectedSourceAccount] = React.useState('');
    const [selectedDestinationAccount, setSelectedDestinationAccount] = React.useState('');

    const handleDestinationTypeChange = (event) => {
        setDestinationType(event.target.value);
        setSelectedSourceAccount('');
        setSelectedDestinationAccount('');
        // Actualizar el formData en el componente padre
        onChange({ target: { name: 'sourceAccountNumber', value: '' } });
        onChange({ target: { name: 'destinationAccountNumber', value: '' } });
    };

    const handleSourceAccountChange = (event) => {
        setSelectedSourceAccount(event.target.value);
        // Actualizar el formData en el componente padre
        onChange({ target: { name: 'sourceAccountNumber', value: event.target.value } });
        if (event.target.value === selectedDestinationAccount) {
            setSelectedDestinationAccount('');
            onChange({ target: { name: 'destinationAccountNumber', value: '' } });
        }
    };

    const handleDestinationAccountChange = (event) => {
        setSelectedDestinationAccount(event.target.value);
        // Actualizar el formData en el componente padre
        onChange({ target: { name: 'destinationAccountNumber', value: event.target.value } });
        if (event.target.value === selectedSourceAccount) {
            setSelectedSourceAccount('');
            onChange({ target: { name: 'sourceAccountNumber', value: '' } });
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
                Type of destination:
            </label>
            <div className="flex space-x-4">
                <label className='ml-10'> Owns
                    <input
                        className='ml-5'
                        type="radio"
                        name="destinationType"
                        value="Propio"
                        checked={destinationType === 'Propio'}
                        onChange={handleDestinationTypeChange}
                    />
                </label>
                <label className='ml-10'> Others
                    <input
                        className='ml-5'
                        type="radio"
                        name="destinationType"
                        value="Otros"
                        checked={destinationType === 'Otros'}
                        onChange={handleDestinationTypeChange}
                    />
                </label>
            </div>

            {destinationType === 'Propio' && (
                <div className="mb-4 mt-14">
                    <TransactionSelectAccountDestiny
                        label="Source Account:"
                        selectedAccount={selectedSourceAccount}
                        onChange={handleSourceAccountChange}
                        excludedAccount={selectedDestinationAccount}
                    />

                    <TransactionSelectAccountDestiny
                        label="Destination Account:"
                        selectedAccount={selectedDestinationAccount}
                        onChange={handleDestinationAccountChange}
                        excludedAccount={selectedSourceAccount}
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

                    <div className="mb-4 mt-14">
                        <label htmlFor="destinationAccount" className="block text-gray-700 text-lg font-bold mb-4">
                            Destination Account:
                        </label>
                        <input
                            id="destinationAccount"
                            className="mt-2 border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none"
                            type="text"
                            value={selectedDestinationAccount}
                            onChange={handleDestinationAccountChange}

                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImputMainTransaction;
