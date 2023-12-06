import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {

  const navigate = useNavigate()
  //const dispatch = useDispatch()
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  // useEffect(() =>{
  //     let data = localStorage.getItem("userToken")
  //     if (data) {
  //         dispatch(login(data))
  //     }else{
  //         dispatch(logout())
  //     }
  //     if(!isLoggedIn) navigate('/signin', {replace: true})
  // },[isLoggedIn, navigate])

  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const userToken = localStorage.getItem('user-token');
  //     setIsLoggedIn(Boolean(userToken));
  //   };

  //   checkLoginStatus(); // Check once when the component mounts

  //   const handleStorageChange = (e) => {
  //     if (e.key === 'user-token') {
  //       checkLoginStatus();
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

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
  const isLoggedIn = getParseItems("user-token");
  console.log(isLoggedIn)


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>{children}</>
  )
}

export default AuthGuard