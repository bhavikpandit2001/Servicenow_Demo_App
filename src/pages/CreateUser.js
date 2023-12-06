import axios from 'axios'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { BackIcon, DisabledRupeesIcon, ErrorIcon, LoadingIcon } from '../svg'
import { useForm } from 'react-hook-form'
const createUser = async (data) => {
    return await axios.post(`https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/users/user-register`, data)
        .then(res => res.data)
}
const CreateUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onSuccess = (data) => {
        console.log("on success loggedin user ==>", data.result)
        navigate("/users")
    }
    const { mutate, data } = useMutation(createUser, {
        onSuccess: onSuccess
    })

    const handleCreate = (data) => {
        console.log(data)
        mutate(data)
    }

    // if (isLoading) {
    //     return (
    //         <div className=''>
    //             <div className='w-full h-[80vh] flex justify-center items-center'>
    //                 <LoadingIcon />
    //             </div>
    //         </div>
    //     )
    // }
    // if (isError) {
    //     return <div >
    //     <div className='w-full h-[80vh] flex justify-center items-center'>
    //         <ErrorIcon />
    //     </div>
    // </div>
    // }

    console.log(data?.result?.user)

    return (
        <div>
            <Link className='w-40 text-[#5e469c] font-bold flex items-center  dark:text-[#9a7fdd] hover:font-bold' to="/users"><span className='mr-4 '><BackIcon /></span>Back to home</Link>
            <div className='w-96 my-1 mx-auto'>

                <form>
                    <h2 className='text-3xl text-center text-black font-bold'>create user</h2>
                    <div className='flex my-5'>
                        <div className='w-40 text-xl font-bold mr-2'>Number:</div>
                        <input className='h-10 w-80 px-3 py-2 focus:outline-none bg-white' type="text" placeholder="number" {...register("number", { required: "number is required", })} />
                        {/* {errors.email && <div severity="warning" >{errors.email.message}</div>} */}
                    </div>
                    <div className='flex my-5'>
                        <div className='w-40 text-xl font-bold mr-2'>Firstname:</div>
                        <input className='h-10 w-80 px-3 py-2 focus:outline-none bg-white' type="text" placeholder="Firstname" {...register("firstname", { required: "firstname is required", })} />
                        {/* {errors.email && <div severity="warning" >{errors.email.message}</div>} */}
                    </div>
                    <div className='flex my-5'>
                        <div className='w-40 text-xl font-bold mr-2'>Lastname:</div>
                        <input className='h-10 w-80 px-3 py-2 focus:outline-none bg-white' type="text" placeholder="lastname" {...register("lastname", { required: "lastname is required", })} />
                        {/* {errors.email && <div severity="warning" >{errors.email.message}</div>} */}
                    </div>
                    <div className='flex my-5'>
                        <div className='w-40 text-xl font-bold mr-2'>Username:</div>
                        <input className='h-10 w-80 px-3 py-2 focus:outline-none bg-white' type="text" placeholder="username" {...register("username", { required: "username is required", })} />
                        {/* {errors.email && <div severity="warning" >{errors.email.message}</div>} */}
                    </div>
                    <div className='flex my-5'>
                        <div className='w-40 text-xl font-bold mr-2'>Email:</div>
                        <input className='h-10 w-80 px-3 py-2 focus:outline-none bg-white' type="text" placeholder="email" {...register("email", { required: "email is required", })} />
                        {/* {errors.email && <div severity="warning" >{errors.email.message}</div>} */}
                    </div>
                    <div className='flex my-5'>
                        <div className='w-40 text-xl font-bold mr-2'>Password:</div>
                        <input
                            className='h-10 w-80 px-3 py-2 bg-white focus:outline-none'
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "password is required" })}
                        />
                        {errors.password && <div severity="warning" >{errors.password.message}</div>}
                    </div>
                    <button className="bg-[#403362] text-white py-3 px-5 rounded-xl font-bold" type="button" onClick={handleSubmit(handleCreate)}>Create </button>
                </form>
            </div>
        </div>

    )
}

export default CreateUser