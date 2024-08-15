import React from 'react'

function ImputMainTransaction() {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
                Tipo de destino:
            </label>
            <div className="flex space-x-4 ">
                    <label className='ml-10'> Propio
                    <input className='ml-5' type="radio" name="destinationType" value="Propio" />
                </label>
                <label className='ml-10'>Otros
                    <input className='ml-5' type="radio" name="destinationType" value="Otros" />
                </label>
            </div>
        </div>
    )
}

export default ImputMainTransaction