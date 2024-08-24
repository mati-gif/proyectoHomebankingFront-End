import React, { useEffect, useState } from "react"
import axios from "axios"
import Swal from 'sweetalert2'; // Importa SweetAlert2

function PaymentSelectLoan() {
  return (
    <div className="mb-4 ">
      <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
        Payments
      </label>
      <select id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
        <option value="">Select an Option</option>
        <option value=""> 6</option>
        <option value=""> 10</option>
        <option value=""> 12</option>
        <option value=""> 24</option>
        <option value=""> 36</option>
      </select>
    </div>
  )
}

export default PaymentSelectLoan