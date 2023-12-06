import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import { DashboardIcon, ProductsIcon, UsersIcon, FbIcon, TwitterIcon, LinkedInIcon } from "../../../svg";
import './sidebar.css'

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('');

    const admin = JSON.parse(localStorage.getItem("admin"))
    console.log(admin)


    return (
        <div className="h-screen fixed bg-slate-50 dark:bg-slate-800 text-[#403362] w-1/5" >
            <div className="w-full mx-auto my-14">
                <div className="p-2 flex items-center flex-col">
                    <div className=" w-20 h-20 rounded-full border-blue-500 border-2 bg-[#403362] dark:bg-white">
                        <img className="w-20 rounded-full" src="./images/user.png" alt="profile-img" />
                    </div>
                    <div className="mt-5">
                        <span className="text-center dark:text-white flex font-bold font-mono capitalize">{admin?.email}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                        <Link to="https://facebook.com"><FbIcon /></Link>
                        <Link to="https://twitter.com"><TwitterIcon /></Link>
                        <Link to="https://linkedin.com"><LinkedInIcon /></Link>
                    </div>
                </div>
            </div>
            <div className="font-bold">
                <NavLink
                    to="/"
                    isActive={() => activeLink === 'dashboard'}
                    onClick={() => setActiveLink('dashboard')}
                    className="flex my-2 items-center w-full py-4 px-6 text-left hover:bg-[#403362] hover:rounded-xl dark:hover:bg-slate-700 hover:text-white dark:text-white  active:bg-slate-600">
                    <span className="mr-2"><DashboardIcon /></span>Dashboard</NavLink>
                <NavLink
                    to="/users"
                    isActive={() => activeLink === 'products'}
                    onClick={() => setActiveLink('products')}
                    className="flex my-2 items-center w-full py-4 px-6 text-left hover:bg-[#403362] hover:rounded-xl dark:hover:bg-slate-700 hover:text-white dark:text-white active:bg-slate-600">
                    <span className="mr-2"><UsersIcon /></span>Users</NavLink>
            </div>
        </div>
    )
}
export default Sidebar;