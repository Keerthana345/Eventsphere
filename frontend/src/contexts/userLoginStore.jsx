import React from 'react'
import { userLoginContext } from './userLoginContext'
import { useState } from 'react'
function userLoginStore({children}) {
    //login user state
    let [currentUser,setCurrentUser]=useState(null)
    let [userLoginStatus,setUserLoginStatus]=useState(false)
    let [err,setErr]=useState('')

    //make login req
    async function loginUser(userCred){
        try{
            let res=await fetch('http://localhost:4000/manager-api/login',{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(userCred)
            })
            let result=await res.json()
            if(result.message==='login success'){
                setCurrentUser(result.user)
                setUserLoginStatus(true)
                setErr('')
                sessionStorage.setItem('token',result.token)
            }
            else{
                setUserLoginStatus(false)
                setErr(result.message)
                setCurrentUser({})
            }
    }catch(error){
        setErr(error.message)
    }
}

    //logout user
    function logoutUser(){
        setCurrentUser()
        setUserLoginStatus(false)
        setErr('')
        
        sessionStorage.removeItem('token')
    }
  return (
    <userLoginContext.Provider value={{loginUser,logoutUser,userLoginStatus,err,currentUser,setCurrentUser}}>
        {children}
    </userLoginContext.Provider>
  )
}

export default userLoginStore