import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const getUsers = async () => {
  return await axios.get("https://dev145961.service-now.com/api/x_1139630_agile_de/v1/agile_demo1/users")
    .then(res => res.data)
}

const Dashboard = () => {
  const { isLoading, isError, isFetching, data } = useQuery(['users'], getUsers, {
    refetchOnWindowFocus: false
  })

  console.log("users ===>", data?.result?.users)
  //const users = data?.result?.users

  return (
    <div className='h-[82vh]'>
      <h1 className='text-2xl font-bold text-center my-10 dark:text-white'>Dashboard</h1>
      <div className='grid grid-cols-4 gap-5'>
        <div className=' dark:bg-slate-800 bg-[#403362] text-white  font-bold dark:text-white rounded-3xl h-[200px]'>
          <div className='p-12'>
            <div className='text-center'>Users</div>
            <div className='text-center'>{data?.result?.users?.length}</div>
          </div>
        </div>
        <div className=' dark:bg-slate-800 bg-[#403362] text-white  font-bold dark:text-white rounded-3xl h-[200px]'>
          <div className='p-12'>
            <div className='text-center'>Users</div>
            <div className='text-center'>{data?.result?.users?.length}</div>
          </div>
        </div>
        <div className=' dark:bg-slate-800 bg-[#403362] text-white  font-bold dark:text-white rounded-3xl h-[200px]'>
          <div className='p-12'>
            <div className='text-center'>Users</div>
            <div className='text-center'>{data?.result?.users?.length}</div>
          </div>
        </div>
        <div className=' dark:bg-slate-800 bg-[#403362] text-white  font-bold dark:text-white rounded-3xl h-[200px]'>
          <div className='p-12'>
            <div className='text-center'>Users</div>
            <div className='text-center'>{data?.result?.users?.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard