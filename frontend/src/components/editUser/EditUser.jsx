import React, { useContext, useEffect, useState } from 'react';
import './EditUser.css';
import { useForm } from 'react-hook-form';
import { userLoginContext } from '../../contexts/userLoginContext';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function EditUser() {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const { currentUser, setCurrentUser } = useContext(userLoginContext);
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const password = watch("password");

    useEffect(() => {
        setValue('username', currentUser.username);
        setValue('email', currentUser.email);
        setValue('mobile', currentUser.mobile);
    }, [currentUser, setValue]);

    async function onSave(modifiedUser) {
        let res = await fetch(`http://localhost:4000/manager-api/manager/${currentUser._id}`, {
            method: 'PUT',
            headers: { "content-type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem('token')}` },
            body: JSON.stringify(modifiedUser)
        });
        let data = await res.json();
        if (data.message === 'Manager modified successfully') {
            modifiedUser._id = currentUser._id;
            setCurrentUser(modifiedUser);
            setIsModalOpen(true);
        }
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function dashboard() {
        closeModal();
        navigate('/managerDashboard');
    }

    function view() {
        closeModal();
        navigate('/viewUser');
    }

    return (
        <div className='edit pb-3'>
            <div className='img'></div>
            <div className='fs-2 ms-4 mt-2 back' onClick={dashboard}>
                <IoArrowBackCircleSharp />
            </div>
            <div className='edit1'>
                <h1><FaRegEdit /> Update your Profile, Perfect Your Experience!</h1>
                <form className='mx-auto mt-5 mb-5 fs-5 bg-light' onSubmit={handleSubmit(onSave)}>
                    {err.length > 0 && <p className="text-danger">{err}</p>}
                    
                    <div className="mb-3">
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input type="text" id='username' className='form-control' {...register("username", { required: true })} disabled />
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
                        {errors.confirmPassword?.type === 'required' && <p className="text-danger">*Confirm Password is required</p>}
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
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
                            placeholder='Email'
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
                            placeholder='Mobile number' 
                        />
                        {errors.mobile?.type === 'required' && <p className='text-danger lead'>*Mobile Number is required</p>}
                        {errors.mobile?.type === 'minLength' && <p className='text-danger lead'>*Length should be 10</p>}
                        {errors.mobile?.type === 'maxLength' && <p className='text-danger lead'>*Length should be 10</p>}
                        {errors.mobile?.type === 'pattern' && <p className='text-danger lead'>{errors.mobile.message}</p>}
                        {errors.mobile?.type === 'validate' && <p className='text-danger lead'>{errors.mobile.message}</p>}
                    </div>
                    
                    <div className='but'>
                        <button type='submit' className="btn btn-secondary b fs-5 mt-2">Save Changes</button>
                    </div>
                </form>
            </div>

            {isModalOpen && (
                <div className="modal-overlay m2">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <h5>Profile updated Successfully! Changes have been saved.</h5>
                            <button className='btn btn-secondary mt-3' onClick={dashboard}><MdDashboard /> Back to Dashboard</button>
                            <button className='btn btn-secondary mt-3' onClick={view}><MdOutlineRemoveRedEye /> View Details</button>
                            <button className="btn btn-primary mt-3" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditUser;