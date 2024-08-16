import React from 'react'

function ImputEmailPassword() {
  return (
    <div className="mb-4  w-96 flex flex-col justify-center gap-3">
        <label htmlFor="Email:" className="block text-gray-700 text-lg font-bold mb-2">
                Email:
            </label>
            <input id="Email:" name="Email:" required placeholder='Email' className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="email" />

            <label htmlFor="Password" className="block text-gray-700 text-lg font-bold mb-2">
                Password:
            </label>
            <input id="Password" name="Password" required placeholder='Password' className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="password" />
    </div>
  )
}

export default ImputEmailPassword