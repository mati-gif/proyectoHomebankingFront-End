
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoanSelectAccountOrigen() {

  // Estado para almacenar las cuentas
  const [accounts, setAccounts] = useState([]);

  const traerCuentas = () => {
    axios.get("http://localhost:8080/api/clients/1")
      .then((response) => {
        setAccounts(response.data.cuentas)
      })
      .catch((error) => {
        console.log(error);
      });

  }


  useEffect(() => {


    traerCuentas();
  }, []);


  return (
    <div className="mb-4 ">
      <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
        Source Account:
      </label>
      <select id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
        <option value="">Select an Option</option>
        {accounts.map((item) => (
          <option key={item.id} value={item.number}>
            {item.number}
          </option>
        ))}




      </select>
    </div>
  )
}

export default LoanSelectAccountOrigen