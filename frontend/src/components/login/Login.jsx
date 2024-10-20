import React, { useEffect } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { userLoginContext } from '../../contexts/userLoginContext'

function Login() {
  let {loginUser,userLoginStatus,err}=useContext(userLoginContext)
  const { register, handleSubmit, formState: { errors }} = useForm()
  let navigate=useNavigate()

  async function onUserLogin(userCred) {
    loginUser(userCred)
  }

  useEffect(()=>{
    if(userLoginStatus===true){
      navigate('/managerDashboard')
    }
  })
  return (
    <div className='login'>
      <div className='child1'>
      <div className='image'>
        <img src="https://static.vecteezy.com/system/resources/previews/006/405/794/original/account-login-flat-illustration-vector.jpg" alt="" />
      </div>
      <div className='flex mt-2'>
      <div className='chi1'>
        <h2 className='mb-3 '>Back to plan your next big Event? Login to your Dashboard now!</h2>
        <p className='mt-2'>Don't have an Account? <Link to='/register'>Register</Link> now!!</p>
        </div>
        <div className='chi2'>
        {err.length!=0&&<p className='text-danger fs-3'>{err}</p>}
        <form className='mx-auto mt-1 p-4 mb-5 bg-light' onSubmit={handleSubmit(onUserLogin)}>
          <div className="mb-3">
              <label htmlFor="username" className='form-label'>Username</label>
              <input type="text" id='username' className='form-control' {...register("username", { required: true })} />
              {errors.email?.type === 'required' && <p className="text-danger fs-5">*Username is required</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className='form-label'>Password</label>
              <input type="password" id='password' className='form-control' {...register("password", { required: true })} />
              {errors.password?.type === 'required' && <p className="text-danger fs-5">*Password is required</p>}
            </div>
            <div className='button'>
            <button className="b w-50">Login</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Login