import React, { useContext, useState } from 'react';
import './AddEvent.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userLoginContext } from '../../contexts/userLoginContext';
import { MdDashboard } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function AddEvent() {
  let { currentUser } = useContext(userLoginContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isTeamEvent, setIsTeamEvent] = useState(false);

  function modalDisplay() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function onEventAdd(event) {
    const eventData = { ...event, username: currentUser.username };
    try {
      let res = await fetch('http://localhost:4000/event-api/event', {
        method: "POST",
        headers: { "Content-type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem('token')}` },
        body: JSON.stringify(eventData)
      });
      let data = await res.json();
      if (data.message === 'event created') {
        modalDisplay();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function dashboard() {
    closeModal();
    navigate('/managerDashboard');
  }

  function view() {
    closeModal();
    navigate('/viewEvents');
  }

  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className='addEvent'>
      <div className='fs-2 ms-4 mt-2 back' onClick={dashboard}>
        <IoArrowBackCircleSharp />
      </div>
      <div className='child'>
        <div className="main">
          <h2>Start Building Your Event Today!</h2>
          <form className='mx-auto mt-3 p-3 mb-5' onSubmit={handleSubmit(onEventAdd)}>
            <div className='flex'>
              <div className="mb-3">
                <label htmlFor="title" className='form-label'>Event Title</label>
                <input type="text" id='title' className='form-control' {...register("title", { required: true })} />
                {errors.title?.type === 'required' && <p className="text-danger fs-5">*Title is required</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="date" className='form-label'>Event Organization Date</label>
                <input type="date" id='date' className='form-control' {...register("date", { required: true })} min={today} />
                {errors.date?.type === 'required' && <p className="text-danger fs-5">*Date is required</p>}
              </div>
            </div>
            <div className="flex">
              <div className="mb-3">
                <label htmlFor="fromTime" className='form-label'>From Time</label>
                <input type="time" id='fromTime' className='form-control' {...register("fromTime", { required: true })} min={today === new Date().toISOString().split('T')[0] ? currentTime : ''} />
                {errors.fromTime?.type === 'required' && <p className="text-danger fs-5">*From Time is required</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="toTime" className='form-label'>To Time</label>
                <input type="time" id='toTime' className='form-control' {...register("toTime", { required: true })} min={today === new Date().toISOString().split('T')[0] ? currentTime : ''} />
                {errors.toTime?.type === 'required' && <p className="text-danger fs-5">*To Time is required</p>}
              </div>
            </div>
            <div className="flex">
              <div className="mb-3">
                <label htmlFor="location" className='form-label'>Event Location</label>
                <input type="text" id='location' className='form-control' {...register("location", { required: true })} />
                {errors.location?.type === 'required' && <p className="text-danger fs-5">*Location is required</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="conInfo" className='form-label'>Contact Information</label>
                <input 
                  type="text" 
                  id='conInfo' 
                  className='form-control' 
                  {...register("conInfo", { 
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
                {errors.conInfo?.type === 'required' && <p className='text-danger lead'>*Mobile Number is required</p>}
                {errors.conInfo?.type === 'minLength' && <p className='text-danger lead'>*Length should be 10</p>}
                {errors.conInfo?.type === 'maxLength' && <p className='text-danger lead'>*Length should be 10</p>}
                {errors.conInfo?.type === 'pattern' && <p className='text-danger lead'>{errors.conInfo.message}</p>}
                {errors.conInfo?.type === 'validate' && <p className='text-danger lead'>{errors.conInfo.message}</p>}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="teamEvent" className="form-label">Is this a team event?</label>
              <div>
                <input
                  type="radio"
                  id="teamEventYes"
                  value="yes"
                  className="form-check-input"
                  checked={isTeamEvent}
                  onChange={() => setIsTeamEvent(true)}
                />
                <label htmlFor="teamEventYes" className="form-check-label">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="teamEventNo"
                  value="no"
                  className="form-check-input"
                  checked={!isTeamEvent}
                  onChange={() => setIsTeamEvent(false)}
                />
                <label htmlFor="teamEventNo" className="form-check-label">No</label>
              </div>
            </div>
            {isTeamEvent && (
              <div className="mb-3">
                <label htmlFor="teamSize" className="form-label">Team Size</label>
                <input 
                  type="number" 
                  id="teamSize" 
                  className="form-control" 
                  {...register("teamSize", { required: isTeamEvent, min: 2 })} 
                />
                {errors.teamSize?.type === 'required' && <p className="text-danger fs-5">*Team Size is required for team events</p>}
                {errors.teamSize?.type === 'min' && <p className="text-danger fs-5">*Team Size must be at least 2</p>}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Event Description</label>
              <textarea className="form-control" id="description" name="description" rows="6" {...register("description", { required: true })}></textarea>
              {errors.description?.type === 'required' && <p className='text-danger fs-5'>*Description is required</p>}
            </div>
            <div className='button mt-4'>
              <button type='submit' className="btn btn-secondary">Add Event</button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay m1">
          <div className="modal-dialog m">
            <div className="modal-content">
              <h5>Your event has been created and successfully added to your Dashboard.</h5>
              <button className='btn btn-secondary mt-3' onClick={dashboard}><MdDashboard /> Back to Dashboard</button>
              <button className='btn btn-secondary mt-3' onClick={view}><MdOutlineRemoveRedEye /> View added Events</button>
              <button className="btn btn-primary mt-3" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEvent;