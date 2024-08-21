import AccountTableDetailTransaction from "./AccountTableDetailTransaction";

function TableMainDetailsAccount({ transacciones = [] }) {
  return (
    <div className="border-4 border-blue-500 p-4 w-full">
      <h2 className="font-bold text-2xl mb-5">Transactions resume:</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 text-left min-w-[80px]">Type</th>
              <th className="p-2 text-left min-w-[80px]">Amount</th>
              <th className="p-2 text-left min-w-[100px]">Date</th>
              <th className="p-2 text-left min-w-[100px]">time</th>
              <th className="p-2 text-left min-w-[150px]">Description</th>
            </tr>
          </thead>
          <tbody className="bg-blue-900">
            {transacciones.length > 0 ? (
              transacciones.map((item) => (
                <AccountTableDetailTransaction 
                  key={item.id} 
                  type={item.type} 
                  amount={item.amount} 
                  date={item.date} 
                  description={item.description} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">No transactions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableMainDetailsAccount;
