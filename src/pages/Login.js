import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

const LoginAdmin = async (data) => {
    return await axios.post("https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/adminLogin", data)
        .then(res => res.data)
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSuccess = (data) => {
        console.log("on success loggedin user ==>", data.result)
        localStorage.setItem('admin', JSON.stringify(data.result.admin))
        navigate("/")
       
        // localStorage.setItem('user-token', JSON.stringify(data?.token))
    }
    const { mutate, data } = useMutation(LoginAdmin, {
        onSuccess: onSuccess
    })

    const handleLogin = (data) => {
        console.log(data)
        mutate(data)
    }
    console.log("logged in data ===>", data?.result)

    return (
        <div className='w-96 my-24 mx-auto'>
            <form>
                <h2 className='text-3xl text-center text-black font-bold'>SignIn</h2>
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
                <button className="bg-[#403362] text-white py-3 px-5 rounded-xl font-bold" type="button" onClick={handleSubmit(handleLogin)}>Login </button>
            </form>
        </div>
    )
}

export default Login