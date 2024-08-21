import React, { useState, useEffect } from 'react';
import axios from "axios";

function TransactionSelectAccountDestiny({ className, selectedAccount, onChange, excludedAccount, label }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const traerCuentasForm = () => {
            axios.get("http://localhost:8080/api/clients/1")
                .then((response) => {
                    setAccounts(response.data.cuentas);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        traerCuentasForm();
    }, []);

    // Filtrar cuentas: Excluir la cuenta seleccionada en el otro campo (excludedAccount)
    const filteredAccounts = accounts.filter(account => account.number !== excludedAccount);

    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor="account" className="block text-gray-700 text-lg font-bold mb-4">
                {label}
            </label>
            <select
                id="account"
                name="account"
                className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none"
                onChange={onChange}
                value={selectedAccount}
            >
                <option value="">Select an Option</option>
                {filteredAccounts.map(item => (
                    <option key={item.id} value={item.number}>
                        {item.number}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TransactionSelectAccountDestiny;
