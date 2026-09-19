import React from 'react'

const NavBar = () => {
  return (
   <div>
      <div className="bg-slate-800 items-center text-slate-900 flex justify-between p-4 text-white">
        <div className="font-bold">Logo</div>
        <div className="flex gap-2">
          <span>Home</span>
          <span>About</span>
          <span>Contact Us</span>
        </div>
        <div>
          <button className="rounded-full bg-gradient-to-b from-white to-gray-500 p-2 font-semibold text-slate-800">Sign Up</button>
        </div>
    </div>
    </div>

  )
    }

export default NavBar