import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import "./layout.css"
import Header from './Header/Header'


const Layout = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" ? true : false);

  const handleNavbarClick = (darkmode) => {
    console.log(darkmode)
    setDarkMode(darkmode)
    localStorage.setItem("darkMode", darkmode);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <Header onClick={handleNavbarClick} />

      <main className={`mt-[71px] flex ${darkMode ? 'dark bg-slate-900' : 'bg-gray-100'}`}>
        <Sidebar/>
        <div className='w-4/5 ml-[20%]'>
          <div className='my-8 mx-8'>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default Layout