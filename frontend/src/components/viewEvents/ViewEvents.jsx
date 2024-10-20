import { useEffect, useState, useContext } from 'react';
import './ViewEvents.css';
import { useNavigate } from 'react-router-dom';
import { userLoginContext } from '../../contexts/userLoginContext';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function ViewEvents() {
  const { currentUser } = useContext(userLoginContext);
  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();

  async function addedEvents() {
    try {
      const res = await fetch(`http://localhost:4000/event-api/events/${currentUser.username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${sessionStorage.getItem('token')}`},
      });
      const data = await res.json();
      const userEvents = data.payload;
      setEvents(userEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  function view(event) {
    navigate('/viewEvent',{state:{event:event}});
  }

  function confirmDelete(eventId) {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  }

  async function handleDeleteEvent() {
    if (eventToDelete) {
      try {
        await fetch(`http://localhost:4000/event-api/events/${eventToDelete}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${sessionStorage.getItem('token')}`},
        });
        addedEvents(); 
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  }

  function closeDeleteModal() {
    setShowDeleteModal(false);
  }
  function dashboard(){
    navigate('/managerDashboard')
  }

  useEffect(() => {
    addedEvents();
  }, []);

  return (
    <div className='view'>
      <div className='fs-2 ms-4 mt-2 back' onClick={dashboard}>
        <IoArrowBackCircleSharp />
      </div>
      <div className='v1'>
        <h1 className='mb-4'>Your Events at a Glance!</h1>
        <h2>View, Manage or Delete your Events with ease!</h2>
      </div>
      <div className='v2'>
        {events.length === 0 ? (
          <div>
            <p className='text-danger fs-1 d-block'>No Events Added</p>
          </div>
        ) : (
          events.map(event => (
            <div className='v3 mb-5' key={event._id}>
              <h2 className='mb-3'><span>Event Title:</span> {event.title}</h2>
              <p><span>Date:</span> {event.date}</p>
              <p><span>Location:</span> {event.location}</p>
              <button className='btn btn-secondary mx-auto fs-5' onClick={() => view(event)}>
                <MdOutlineRemoveRedEye /> View Details
              </button>
              <button className='btn btn-secondary mx-auto mt-3 fs-5' onClick={() => confirmDelete(event._id)}>
                <MdDeleteOutline /> Delete Event
              </button>
            </div>
          ))
        )}
      </div>
      <div>
        <button className='btn btn-secondary fs-5 mt-3 mb-3' onClick={() => navigate('/addEvent')}><IoMdAddCircleOutline /> Add Event</button>
      </div>
      {showDeleteModal && (
        <div className="modal-overlay m2">
          <div className="modal-dialog">
            <div className="modal-content">
              <h3>Are you sure you want to delete this event?</h3>
              <button className='btn btn-danger mt-3 w-50 mx-auto' onClick={handleDeleteEvent}>Yes, Delete</button>
              <button className='btn btn-secondary mt-3 w-50 mx-auto' onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEvents;