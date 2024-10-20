import React, { useContext, useState, useEffect } from 'react';
import './EditEvent.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { userLoginContext } from '../../contexts/userLoginContext';
import { IoArrowBackCircleSharp } from "react-icons/io5";

function EditEvent() {
  const { currentUser } = useContext(userLoginContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isTeamEvent, setIsTeamEvent] = useState(false);
  const [showTeamSize, setShowTeamSize] = useState(false);
  const { state } = useLocation();
  const eventId = state?._id;
  let filtered;

  async function editEvents() {
    try {
      const res = await fetch('http://localhost:4000/event-api/events', {
        method: "GET",
        headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${sessionStorage.getItem('token')}`},
      });
      const data = await res.json();
      const events = data.payload;
      filterEvents(events, eventId);
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  }

  function filterEvents(events, eventId) {
    filtered = events.filter(event => event._id === eventId);
    if (filtered.length > 0) {
      setInitialValues(filtered[0]);
    }
  }

  function setInitialValues(event) {
    setValue('title', event.title);
    setValue('date', event.date);
    setValue('fromTime', event.fromTime);
    setValue('toTime', event.toTime);
    setValue('location', event.location);
    setValue('description', event.description);
    setValue('conInfo', event.conInfo);

    if (event.teamSize) {
      setIsTeamEvent(true);  
      setShowTeamSize(true); 
      setValue('teamSize', event.teamSize);
    } else {
      setIsTeamEvent(false);
      setShowTeamSize(false); 
    }
  }

  useEffect(() => {
    if (eventId) {
      editEvents();
    }
  }, [eventId]);

  async function onSave(modifiedEvent) {
    const updatedEvent = { ...modifiedEvent, username: currentUser.username };
    if (!isTeamEvent) {
      updatedEvent.teamSize=null; 
    }
    try {
      const res = await fetch(`http://localhost:4000/event-api/event/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json', "Authorization": `Bearer ${sessionStorage.getItem('token')}`},
        body: JSON.stringify(updatedEvent),
      });
      let data=await res.json();
      if (data.message==='Event modified successfully') {
        setShowModal(true);
      }
    } catch (error) {
      console.log('Error updating event:', error);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  function dashboard() {
    closeModal();
    navigate('/managerDashboard');
  }
  
  function View() {
    navigate(-1);
  }

  function view() {
    closeModal();
    navigate('/viewEvents');
  }
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='editEvent'>
      <div className='fs-2 ms-4 mt-2 back' onClick={View}>
        <IoArrowBackCircleSharp />
      </div>
      <div className='child'>
        <div className="main">
          <h2>Update Your Event Details!</h2>
          <form className='mx-auto mt-3 p-3 mb-5' onSubmit={handleSubmit(onSave)}>
            <div className='flex'>
              <div className="mb-3">
                <label htmlFor="title" className='form-label'>Event Title</label>
                <input type="text" id='title' className='form-control' {...register("title", { required: true })} />
                {errors.title && <p className="text-danger fs-5">*Title is required</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="date" className='form-label'>Event Organization Date</label>
                <input type="date" id='date' className='form-control' {...register("date", { required: true })} min={today} />
                {errors.date && <p className="text-danger fs-5">*Date is required</p>}
              </div>
            </div>

            <div className='flex'>
              <div className="mb-3">
                <label htmlFor="fromTime" className='form-label'>From Time</label>
                <input type="time" id='fromTime' className='form-control' {...register("fromTime", { required: true })} />
                {errors.fromTime && <p className="text-danger fs-5">*From Time is required</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="toTime" className='form-label'>To Time</label>
                <input type="time" id='toTime' className='form-control' {...register("toTime", { required: true })} />
                {errors.toTime && <p className="text-danger fs-5">*To Time is required</p>}
              </div>
            </div>

            <div className='flex'>
              <div className="mb-3">
                <label htmlFor="location" className='form-label'>Event Location</label>
                <input type="text" id='location' className='form-control' {...register("location", { required: true })} />
                {errors.location && <p className="text-danger fs-5">*Location is required</p>}
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
                  onChange={() => {
                    setIsTeamEvent(true);
                    setShowTeamSize(true); 
                  }}
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
                  onChange={() => {
                    setIsTeamEvent(false);
                    setShowTeamSize(false);
                  }}
                />
                <label htmlFor="teamEventNo" className="form-check-label">No</label>
              </div>
            </div>

            {showTeamSize && (
              <div className="mb-3">
                <label htmlFor="teamSize" className="form-label">Team Size</label>
                <input 
                  type="number" 
                  id="teamSize" 
                  className="form-control" 
                  {...register("teamSize", { required: showTeamSize, min: 1 })} 
                />
                {errors.teamSize && <p className="text-danger fs-5">*Team Size is required for team events</p>}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Event Description</label>
              <textarea className="form-control" id="description" name="description" rows="6" {...register("description", { required: true })}></textarea>
              {errors.description && <p className='text-danger fs-5'>*Description is required</p>}
            </div>

            <div className='button mt-4'>
              <button className="btn btn-secondary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay m1">
          <div className="modal-dialog">
            <div className="modal-content">
              <h5>Your event has been updated successfully!</h5>
              <button className='btn btn-secondary mt-3' onClick={dashboard}><MdDashboard /> Back to Dashboard</button>
              <button className='btn btn-secondary mt-3' onClick={view}> <MdOutlineRemoveRedEye/> Back to View Events</button>
              <button className="btn btn-primary mt-3" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditEvent
