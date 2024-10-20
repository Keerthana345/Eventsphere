import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewEvent.css';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

function ViewEvent() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const { title, date, fromTime, toTime, location, description, conInfo, _id, teamSize } = state.event;
  const isTeamEvent = teamSize > 0;

  function edit() {
    navigate(`/editEvent/${_id}`, { state: { _id } });
  }

  function registered() {
    navigate(`/viewRegisteredUsers/${_id}`, { state: { _id } });
  }

  function View() {
    navigate('/viewEvents');
  }

  return (
    <div className='viewevent'>
      <div className='fs-2 ms-4 mt-2 back' onClick={View}>
        <IoArrowBackCircleSharp />
      </div>
      <div className='des'>
        <h1>Event Details</h1>
        <p className='fs-5 mt-4'><strong>Event Title: </strong>{title}</p>
        <p className='fs-5 mt-2'><strong>Event Date:</strong> {date}</p>
        <p className='fs-5 mt-2'><strong>Event Time:</strong> From: {fromTime}, To: {toTime}</p>
        <p className='fs-5 mt-2'><strong>Event Location:</strong> {location}</p>
        <p className='fs-5 mt-2'><strong>Event Contact: </strong>{conInfo}</p>
        <p className='fs-5 mt-2'><strong>Is this a team event?: </strong>{isTeamEvent ? 'Yes' : 'No'}</p>
        {isTeamEvent && <p className='fs-5 mt-2'><strong>Team Size: </strong>{teamSize}</p>}
        <p className='fs-5 mt-2'><strong>Event Description: </strong>{description}</p>
        <div className='but'>
          <button className='btn btn-secondary mt-3 fs-5' onClick={edit}><FaRegEdit /> Edit Event</button>
          <button className='btn btn-secondary mt-3 fs-5' onClick={registered}><MdOutlineRemoveRedEye /> View Registered Users</button>
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;
