import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import CardAccount from './CardAccount';
import TableMainDetailsAccount from './TableMainDetailsAccount';
import { loadUser } from '../../redux/actions/authActions';

function MainDetailAccount() {
  const { id } = useParams();
  const [detailsAccount, setDetailAccount] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // Estado para manejar el filtro de orden
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, accounts } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && token) {
      if (accounts.length > 0) {
        const account = accounts.find(acc => acc.id === parseInt(id, 10));
        if (account) {
          setDetailAccount(account);
          sortTransactions(account.transactions, sortOrder);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cuenta no encontrada',
            text: 'La cuenta seleccionada no existe.',
          });
          navigate('/');
        }
      } else {
        dispatch(loadUser(token))
          .unwrap()
          .then((user) => {
            const account = user.accounts.find(acc => acc.id === parseInt(id, 10));
            if (account) {
              setDetailAccount(account);
              sortTransactions(account.transactions, sortOrder);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Cuenta no encontrada',
                text: 'La cuenta seleccionada no existe.',
              });
              navigate('/');
            }
          })
          .catch((error) => {
            console.error('Error al cargar el usuario:', error);
            navigate('/login');
          });
      }
    } else {
      navigate('/login');
    }
  }, [isLoggedIn, dispatch, navigate, token, id, accounts]);

  const sortTransactions = (transactions, order) => {
    const sorted = [...transactions].sort((a, b) => {
      const dateA = a.date ? new Date(a.date.replace(' ', 'T')) : 0; // Reemplazar para formatear correctamente
      const dateB = b.date ? new Date(b.date.replace(' ', 'T')) : 0; // Reemplazar para formatear correctamente
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFilteredTransactions(sorted);
  };
  

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    if (detailsAccount) {
      sortTransactions(detailsAccount.transactions, newSortOrder);
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">Your selected account!</h1>
      <div className="flex justify-center mb-20">
        <img src="https://us.123rf.com/450wm/boy8888/boy88882305/boy8888230500015/205500967-businessman-using-mobile-online-banking-and-payments-digital-marketing-financial-and-banking.jpg?ver=6" alt="" className="rounded-lg shadow-md w-full h-96 object-cover md:w-2/3" />
      </div>

      {detailsAccount ? (
        <>
          <div className='mb-3 flex justify-center'>
            <CardAccount number={detailsAccount.number} creationDate={detailsAccount.creationDate} balance={detailsAccount.balance} />
          </div>

          {/* Filtro de ordenamiento */}
          <div className="mb-4 flex justify-center gap-4">
            <label htmlFor="sort-order" className="block text-gray-700 text-sm font-bold mb-2">
              Sort by date:
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={handleSortChange}
              className="border rounded px-3 py-2">
              <option value="">Select an option</option>
              <option value="desc">Most recent first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>
          <div className='flex justify-around'>
            <TableMainDetailsAccount transactions={filteredTransactions} />
          </div>
        </>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
}

export default MainDetailAccount;
