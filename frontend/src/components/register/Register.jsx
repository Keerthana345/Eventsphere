import React from 'react'
import './Register.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const password = watch("password")
  let navigate=useNavigate()
  let [err,setErr]=useState("")

  async function onUserRegister(newUser) {
    try{
      let res=await fetch('http://localhost:4000/manager-api/managers',
        {
          method:'POST',
          headers:{"content-type":"application/json"},
          body:JSON.stringify(newUser)
        })
      let data=await res.json()
      if(data.message==='user created'){
        navigate('/login')
      }
      else{
        setErr(data.message)
      }
    }catch(err){
      setErr(err.message)
    }
  }

  return (
    <div className='register'>
      <div className='child1'>
      <h3 className='h3 fw-bold'>Ready to make your mark? Create your account and start planning today!</h3>
      <h3 className='mt-3 fw-bold'>Register as an "Event Manager"</h3>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/003/689/228/small_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" alt="" />
      </div>
      <div className='child2'>
          <p className='mt-3 p fs-5'>Already a member? <Link to='/login'>Login</Link> and continue where you left off.</p>
          <h1>Create Account</h1>
          {err.length!==0 && <p className='text-danger'>{err}</p>}
          <form className='mx-auto mt-3 p-4 mb-5 bg-light' onSubmit={handleSubmit(onUserRegister)}>
            <div className="mb-3">
              <label htmlFor="username" className='form-label'>Username</label>
              <input type="text" id='username' className='form-control' {...register("username", { required: true})} />
              {errors.username?.type === 'required' && <p className="text-danger">*Username is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type="password" id='password' className='form-control' {...register("password", { required: true })} />
              {errors.password?.type === 'required' && <p className="text-danger">*Password is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
              <input type="password" id='confirmPassword' className='form-control' {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password || 'Passwords do not match'
              })} />
              {errors.confirmPassword?.type === 'required' && <p className="text-danger">*Password is required</p>}
              {errors.confirmPassword && <p className="text-danger">*{errors.confirmPassword.message}</p>}
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className='form-label'>Email</label>
              <input 
                type="email" 
                id='email' 
                className='form-control' 
                {...register("email", { 
                  required: true, 
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address"
                  }
                })} 
              />
              {errors.email?.type === 'required' && <p className='text-danger lead'>*Email is required</p>}
              {errors.email?.type === 'pattern' && <p className='text-danger lead'>{errors.email.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className='form-label'>Mobile Number</label>
              <input 
                type="text" 
                id='mobile' 
                className='form-control' 
                {...register("mobile", { 
                  required: true, 
                  minLength: 10, 
                  maxLength: 10, 
                  pattern: {
                    value: /^[1-9]{1}[0-9]{9}$/, 
                    message: "Invalid phone number"
                  },
                  validate: (value) => {
                    return !/^(\d)\1+$/.test(value) || "Phone number cannot be repetitive digits";
                  }
                })} 
              />
              {errors.mobile?.type === 'required' && <p className='text-danger lead'>*Mobile Number is required</p>}
              {errors.mobile?.type === 'minLength' && <p className='text-danger lead'>*Length should be 10</p>}
              {errors.mobile?.type === 'maxLength' && <p className='text-danger lead'>*Length should be 10</p>}
              {errors.mobile?.type === 'pattern' && <p className='text-danger lead'>{errors.mobile.message}</p>}
              {errors.mobile?.type === 'validate' && <p className='text-danger lead'>{errors.mobile.message}</p>}
            </div>
            
            <div className='button mt-4'>
              <button className="b w-50">Register</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Register