import axios from 'axios'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "./header.css"

const Header = ({ onClick }) => {

    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState("")

    const getParseItems = (key) => {
        const parsed_value = localStorage.getItem(key);
        if (
            parsed_value !== null &&
            parsed_value !== "" &&
            parsed_value !== undefined
        ) {
            return parsed_value;
        } else {
            return null;
        }
    };

    const Logout = () => {
        localStorage.removeItem('user-token')
        const updatedIsLoggedIn = getParseItems('user-token');
        setIsLoggedIn(updatedIsLoggedIn);
        navigate("/login")
    }
    console.log(isLoggedIn)


    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode)
    //     // Call the function provided by app.js
    //     onClick(!darkMode);
    // };

    // const dark = JSON.parse(localStorage.getItem('darkMode'))

    return (
        <div className="fixed z-10 w-full top-0 bg-[#403362] dark:bg-slate-800">
            {/* Show navigation links on mobile when isCollapsed is true */}
            <div className='mx-auto w-11/12 flex justify-between'>
                <div className="m-5">
                    <h1 className="text-center text-white text-3xl font-bold uppercase">
                        Agile Demo
                    </h1>
                </div>
                <div className="flex items-center text-black font-bold text-xl list-none">
                    <div className="px-3 hover:bg-[#4c3e75] hover:rounded-lg text-white py-2">
                        <button onClick={Logout}>Logout</button>
                    </div>
                    {/* <div className="flex justify-center items-center mx-4 w-1/4 text-black text-lg list-none my-1">
                        {dark ? (
                            <div className="w-10 p-2">
                                <button
                                    onClick={toggleDarkMode}
                                >
                                    <img src="./images/white-balance.png" alt="daymode" />
                                </button>
                            </div>
                        ) : (
                            <div className="dark:text-white w-10 p-2">
                                <button
                                    onClick={toggleDarkMode}
                                >
                                    <img src="./images/night-mode.png" alt="daymode" />
                                </button>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Header