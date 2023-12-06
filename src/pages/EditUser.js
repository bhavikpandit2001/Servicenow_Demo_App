import axios from 'axios'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BackIcon, ErrorIcon, LoadingIcon } from '../svg'
import { useForm } from 'react-hook-form'
const getUserById = async (userId) => {
    return await axios.get(`https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/users/${userId}`)
        .then(res => res.data)
}

const updateUser = async (userId, userData) => {
    return await axios.patch(`https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/users/update/${userId}`, userData)
      .then(res => res.data);
  };

const EditUser = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    console.log(userId)

    const { isLoading, isError, isFetching, data } = useQuery(['user', userId], () => getUserById(userId), {
        enabled: !!userId,
        onSuccess: (data) => {
            setValue('firstname', data?.result?.user?.firstname || '');
            setValue('lastname', data?.result?.user?.lastname || '');
            setValue('email', data?.result?.user?.email || '');
            setValue('username', data?.result?.user?.username || '');
            setValue('password', data?.result?.user?.password || '');
          },
    })

    const { mutate, userData } = useMutation((updatedData) => updateUser(userId, updatedData))
      
    const handleEdit = (data) => {
        console.log("edit", data)
        mutate(data);
        navigate(`/users/${userId}`)
    }

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

    console.log(data?.result?.user)
    const user = data?.result?.user

    return (
        <div className='w-11/12 bg-slate-50 dark:bg-slate-800 mx-auto mt-8 mb-32 rounded-3xl'>
            <div className='p-5 roun'>
                <div className='grid grid-cols-2 gap-10'>
                    <div>
                        <div className='flex justify-between'>
                            <Link className='w-40 text-[#5e469c] font-bold flex items-center  dark:text-[#9a7fdd] hover:font-bold' to={`/users/${userId}`}><span className='mr-4 '><BackIcon /></span>Back to home</Link>
                        </div>
                        <form>
                            <div className='my-5'>

                                <div className='flex items-center'>
                                    <div>firstname:   </div>
                                    <input
                                        className='h-10 my-1 border w-80 px-3 py-2 bg-white focus:outline-none'
                                        type="firstname"
                                        placeholder="firstname"
                                        {...register("firstname", { required: "firstname is required" })}
                                    />
                                </div>

                                <div className='flex items-center'>
                                    <div>lastname:   </div>
                                    <input
                                        className='h-10 my-1 border w-80 px-3 py-2 bg-white focus:outline-none'
                                        type="lastname"
                                        placeholder="lastname"
                                        {...register("lastname", { required: "lastname is required" })}

                                    />
                                </div>

                                <div className='flex items-center'>
                                    <div>email:   </div>
                                    <input
                                        className='h-10 my-1 border w-80 px-3 py-2 bg-white focus:outline-none'
                                        type="email"
                                        placeholder="email"
                                        {...register("email", { required: "email is required" })} />
                                </div>

                                <div className='flex items-center'>
                                    <div>username:   </div>
                                    <input
                                        className='h-10 my-1 border w-80 px-3 py-2 bg-white focus:outline-none'
                                        type="username"
                                        placeholder="username"
                                        {...register("username", { required: "username is required" })} />
                                </div>

                                <div className='flex items-center'>
                                    <div>password:   </div>
                                    <input
                                        className='h-10 my-1 border w-80 px-3 py-2 bg-white focus:outline-none'
                                        type="password"
                                        placeholder="password"
                                        {...register("password", { required: "password is required" })} />
                                </div>
                                <div className='flex items-center text-xl my-2'>
                                    <button className="bg-[#403362] text-white py-3 px-5 rounded-xl font-bold" type="button" onClick={handleSubmit(handleEdit)}>Edit </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser;