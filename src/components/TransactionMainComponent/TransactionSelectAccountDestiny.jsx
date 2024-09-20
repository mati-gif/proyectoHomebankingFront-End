import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loadUser } from '../../redux/actions/authActions';


function  TransactionSelectAccountDestiny({ className, selectedAccount, onChange, excludedAccount, label }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [arrayAccounts, setArrayAccounts] = useState([]);
    const { isLoggedIn, token, accounts } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn && token) {
            // Solo si las cuentas están vacías, llamamos a loadUser
            if (accounts.length === 0) {
                dispatch(loadUser(token))
                    .unwrap()
                    .catch((error) => {
                        console.error('Error al cargar usuario:', error);
                        navigate('/login');
                    });
            }
        } else {
            // Redirigir al usuario si no está autenticado
            navigate('/login');
        }
    }, [isLoggedIn, dispatch, navigate, token, accounts]);
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
                    <option key={item.id} value={item.number}> {/* Pasa los datos de la cuenta filtrada  a la etiqueta option para que se muestren. */}
                        {item.number}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TransactionSelectAccountDestiny;
