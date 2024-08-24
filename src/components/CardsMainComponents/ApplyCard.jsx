import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CardTypeSelector from './CardTypeSelector';
import CardMembershipSelector from './CardMembershipSelector';
import CardActionsButtons from './CardActionsButtons';

function ApplyCard() {
  const navigate = useNavigate();

  return (
    <div className="p-8 rounded-lg bg-gray-100 min-h-screen border-4 border-green-200">
      <h1 className="text-3xl font-bold text-center mb-8 mt-4">Apply for a Card</h1>
      <div className="flex flex-col  md:flex md:flex-row ">
        <form className="md:w-6/12 md:bg-gray-200 md:flex md:flex-col md:gap-10  md:p-6 md:rounded-lg">
          <CardTypeSelector />
          <CardMembershipSelector />
          <CardActionsButtons navigate={navigate} />
        </form>
        <div className="mt-10  flex flex-col justify-center gap-10  p-6 rounded-lg md:w-6/12 md:mt-0">
          <img src="https://www.canal26.com/media/image/2018/07/15/394053.jpg" className="h-4/5" alt="Card Image" />
        </div>
      </div>
    </div>
  );
}


export default ApplyCard;
