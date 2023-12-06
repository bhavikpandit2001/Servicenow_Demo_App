import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { BackIcon, DisabledRupeesIcon, ErrorIcon, LoadingIcon } from '../svg'
const getUserById = async (userId) => {
    return await axios.get(`https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/users/${userId}`)
        .then(res => res.data)
}
const UserDetails = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    console.log(userId)

    const { isLoading, isError, isFetching, data } = useQuery(['product', userId], () => getUserById(userId), {
        enabled: !!userId
    })

    if (isLoading) {
        return (
            <div className=''>
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

    const Edit = (user) => {
        console.log(user)
        navigate(`/users/edit/${user?._id}`)
        //edit(user?._id)
    }
    console.log(data?.result?.user)
    const user = data?.result?.user

    return (
        <div className='w-11/12 bg-slate-50 dark:bg-slate-800 mx-auto mt-28 mb-32 rounded-3xl'>
            <div className='p-5 roun'>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <div className='flex justify-between'>
                            <Link className='w-40 text-[#5e469c] font-bold flex items-center  dark:text-[#9a7fdd] hover:font-bold' to="/users"><span className='mr-4 '><BackIcon /></span>Back to home</Link>
                        </div>
                        <div className='my-5'>
                            <h1 className='text-3xl my-2 font-bold font-sans'>{user?.number}</h1>
                            <h2 className='text-3xl my-2 font-bold font-sans'>{user?.email}</h2>
                            <p className='text-2xl my-2 text-slate-400 font-sans'>{user?.username}</p>
                            <p className='text-xl my-2'> firstname : {user?.firstname} </p>
                            <p className='text-xl my-2'> lastname : {user?.lastname} </p>
                            {/* <div className='flex items-center text-xl my-2'>
                                <p className='mr-2 flex items-center text-gray-400'><DisabledRupeesIcon /> {data?.price}</p>
                                <p className='mx-2 flex items-center'><RupeesIcon /> {total}</p>
                            </div> */}
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <button title='click here to edit user' className='bg-[#403362] dark:bg-slate-600 mx-auto my-0 p-2 text-white font-bold rounded-lg w-full' onClick={() => Edit(user)}>Edit User</button>                                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails