import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { DisabledRupeesIcon, ErrorIcon, LoadingIcon, RupeesIcon } from '../svg'

const getUsers = async () => {
    return await axios.get("https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/users")
        .then(res => res.data)
}

const deleteUser = async (userId) => {
    return await axios.delete(`https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/users/delete/${userId}`)
        .then(res => res.data)
}

const editUser = async (userId, title) => {
    return await axios.patch(`https://dummyjson.com/users/${userId}`, title)
        .then(res => res.data)
}

const Users = () => {
    const {updatedList, setUpdatedList} = useState([])

    const navigate = useNavigate()

    const { isLoading, isError, isFetching, data } = useQuery(['users'], getUsers, {
        refetchOnWindowFocus: false
    })

    const { mutate } = useMutation(deleteUser)
    const { mutate: edit } = useMutation(editUser)

    if (isLoading) {
        return (
            <div>
                <div className='w-full h-[80vh] flex justify-center items-center'>
                    <LoadingIcon />
                </div>
            </div>
        )
    }

    if (isError) {
        return <div >
            <div className='w-full h-[80vh] flex justify-center items-center'>
                <ErrorIcon />
            </div>
        </div>
    }

    console.log("users ===>", data.result.users)
    const users = data.result.users

    const View = (user) => {
        console.log(user)
        navigate(`/users/${user?._id}`)
    }

    const Delete = (user) => {
        console.log(user)
        mutate(user?._id)
    }
    const Create = (data) => {
        navigate('/users/create')
    }
    return (
        <div >
            <div className='flex justify-between my-2'>
                <h1 className='text-2xl mb-2 font-bold dark:text-white'>Users</h1>
                <button className='bg-[#403362] dark:bg-slate-600 w-60 my-2 p-2 text-white font-bold rounded-lg' onClick={() => Create(data)}>Create</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                {users?.map((user) => {
                    return (
                        // background based on light and dark ui
                        <div className="rounded-xl shadow-lg bg-white dark:bg-[#253247]">
                            <div className="p-4 rounded-xl overflow-hidden max-w-sm">
                                <div className='grid grid-cols-2 items-center gap-4'>
                                    <img src="./images/profile.jpg" alt="images" className="rounded-xl" />
                                    <div className='font-bold dark:text-white'>{user?.number}</div>
                                </div>
                                <div className="p-2">
                                    <div className='font-bold dark:text-white'>{user?.username}</div>
                                    <div className="font-bold text-slate-600 dark:text-white text-xl">firstname: {user?.firstname}</div>
                                    <div className="font-bold text-slate-800 dark:text-white text-xl">lastname: {user?.lastname}</div>
                                    <div className="font-bold text-slate-600 dark:text-white text-xl">{user?.email}</div>
                                    {/* <div className='grid grid-cols-2 gap-2 items-center text-xl my-2'>
                                        <div className="font-bold text-black dark:text-white text-xl">gender: {user?.gender}</div>
                                        <div className="font-bold text-black dark:text-white text-xl">weight: {user?.weight}</div>
                                    </div> */}
                                    <div className='grid grid-cols-3 gap-2'>
                                        <button className='bg-[#403362] dark:bg-slate-600 mx-auto my-0 p-2 text-white font-bold rounded-lg w-full' onClick={() => View(user)}>View</button>
                                        <button className='bg-[#403362] dark:bg-slate-600 mx-auto my-0 p-2 text-white font-bold rounded-lg w-full' onClick={() => Delete(user)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Users