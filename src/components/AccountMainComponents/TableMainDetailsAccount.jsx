import React from "react";

function TableMainDetailsAccount() {
  return (
    <div className="border-4 border-blue-500 p-4 w-9/12 ">
      <h2 className="font-bold text-2xl mb-5">Transactions resume:</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-700 text-white">
            <td className="p-3 text-green-500">CREDIT</td>
            <td className="p-3">$25,000.0</td>
            <td className="p-3">24/04/23</td>
            <td className="p-3">Test credit</td>
          </tr>
          <tr className="bg-gray-700 text-white">
            <td className="p-3 text-red-500">DEBIT</td>
            <td className="p-3">$5,000.0</td>
            <td className="p-3">24/04/23</td>
            <td className="p-3">Test debit</td>
          </tr>
          <tr className="bg-gray-700 text-white">
            <td className="p-3 text-green-500">CREDIT</td>
            <td className="p-3">$200.0</td>
            <td className="p-3">24/04/23</td>
            <td className="p-3">Coffe. VIN:083895</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableMainDetailsAccount;
