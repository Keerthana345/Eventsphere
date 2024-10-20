import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import './EventRegister.css';

function EventRegister() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const isTeamEvent = state.event.teamSize;

  async function checkEmailAndPhone(data) {
    try {
      const emailResponse = await fetch(`http://localhost:4000/user-api/check-email?email=${data.email}`);
      const emailResult = await emailResponse.json();
      if (emailResult.exists) {
        throw new Error('Email already exists');
      }

      const phoneResponse = await fetch(`http://localhost:4000/user-api/check-phone?phone=${data.phone}`);
      const phoneResult = await phoneResponse.json();
      if (phoneResult.exists) {
        throw new Error('Phone number already exists');
      }
    } catch (error) {
      setErr(error.message);
      throw error;
    }
  }

  async function onSubmit(data) {
    try {
      await checkEmailAndPhone(data);
      
      const submissionData = { ...data, eventId: state.event._id };
      const res = await fetch('http://localhost:4000/user-api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      const result = await res.json();

      if (result.message === "User registered") {
        setShowModal(true);
      }
    } catch (err) {
      setErr(err.message);
    }
  }
  
  function closeModal() {
    setShowModal(false);
  }

  function eventListing() {
    closeModal();
    navigate('/eventListing', { state: { date: state.event.date } });
  }

  function renderTeamFields() {
    const teamFields = [];
    for (let i = 1; i <= Number(state.event.teamSize) - 1; i++) {
      teamFields.push(
        <div key={i} className="form-group">
          <label htmlFor={`fullname_${i}`} className="form-label mt-3">
            Full Name (Team Member {i})
          </label>
          <input
            type="text"
            id={`fullname_${i}`}
            className="form-control"
            {...register(`fullname_${i}`, { required: true })}
          />
          {errors[`fullname_${i}`] && (
            <p className="text-danger fs-6">*Full Name is required</p>
          )}
  
          <label htmlFor={`rollno_${i}`} className="form-label mt-3">
            Roll Number (Team Member {i})
          </label>
          <input
            type="text"
            id={`rollno_${i}`}
            className="form-control"
            {...register(`rollno_${i}`, {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Only letters and numbers are allowed",
              },
            })}
          />
          {errors[`rollno_${i}`] && (
            <p className="text-danger fs-6">{errors[`rollno_${i}`].message}</p>
          )}
        </div>
      );
    }
    return teamFields;
  }
  

  return (
    <div className='register-page'>
        <div className='fs-2 ms-4 mt-2 back' onClick={eventListing}>
        <IoArrowBackCircleSharp />
        </div>
      <div className='register-container'>
        <div className='register-info'>
          <h1 className='register-title'>Register for <span>"{state.event.title}"</span></h1> 
          <h2>Provide your details below to complete your registration.</h2>
        </div>
        <div className='register-form-container mt-2'>
          {err.length !== 0 && <p className='text-danger fs-2'>*{err}</p>}
          <form className='register-form mt-4 p-4 mb-3' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="fullname" className='form-label mt-3'>Full Name {isTeamEvent ? "(Team Leader)" : ""}</label>
              <input type="text" id="fullname" className='form-control' {...register("fullname", { required: true })} />
              {errors.fullname && <p className="text-danger fs-6">*Full Name is required</p>}
            </div>

            <div className="form-group">
              <label htmlFor="rollno" className='form-label mt-3'>Roll Number {isTeamEvent ? "(Team Leader)" : ""}</label>
              <input 
                type="text" 
                id="rollno" 
                className='form-control' 
                {...register("rollno", { 
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Only letters and numbers are allowed"
                  }
                })} 
              />
              {errors.rollno && <p className="text-danger fs-6">{errors.rollno.message}</p>}
            </div>

            {isTeamEvent && renderTeamFields()}

            <div className="form-group">
              <label htmlFor="email" className='form-label mt-3'>Email {isTeamEvent ? "(Team Leader)" : ""}</label>
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

            <div className="form-group">
              <label htmlFor="branch" className='form-label mt-3'>Branch</label>
              <input type="text" id="branch" className='form-control' {...register("branch", { required: true })} />
              {errors.branch && <p className="text-danger fs-6">*Branch is required</p>}
            </div>

            <div className="form-group">
              <label htmlFor="sec" className='form-label mt-3'>Section</label>
              <input type="text" id="sec" className='form-control' {...register("sec", { required: true })} />
              {errors.sec && <p className="text-danger fs-6">*Section is required</p>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile" className='form-label mt-3'>Phone Number</label>
              <input 
                type="tel" 
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

            <div className='button'>
              <button className="btn btn-secondary mt-4">Register Now</button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay m5-3">
          <div className="modal-content">
            <h3>Registration Successful!</h3>
            <p>You have been successfully registered for the event.</p>
            <button onClick={eventListing} className="btn btn-primary">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventRegister;