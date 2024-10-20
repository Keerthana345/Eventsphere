import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EventListing.css';
import { IoArrowBackCircleSharp } from "react-icons/io5";

function EventListing() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { state } = useLocation();
  const date = state.date; 
  async function fetchEvents() {
    try {
      const response = await fetch('http://localhost:4000/event-api/eventlistings');        
      const data = await response.json();
      const eventlistings = data.payload;
      setEvents(eventlistings);
      if (date) {
        filterEvents(eventlistings, date);
      }
    } catch (error) {
      setError('Error fetching events: ' + error.message);
    }
  }
  useEffect(() => {
    fetchEvents();
  }, [date]);

  function filterEvents(events, date) {
    const filtered = events.filter(event => event.date === date);
    setFilteredEvents(filtered);
  }

  function handleButtonClick(event) {
    navigate(`/eventDetails/${event.id}`,{state:{event:event}});
  }
  function View() {
    navigate('/eventParticipants');
  }

  return (
    <div className='main6'>
        <div className='fs-2 ms-4 mt-2 back' onClick={View}>
        <IoArrowBackCircleSharp />
      </div>
      <div className='event-listing'>
      <h1>Events Happening on <span>"{date}"</span></h1>
      <h2>Discover what's happening on your choosen date</h2>
      {error && <p className='text-danger'>{error}</p>}
      {filteredEvents.length === 0 ? (
        <h5 className='text-danger fs-3'>No events available for the selected date.</h5>
      ) : (
        <div>
          <h5>Here are all the events scheduled for {date}. Click on "View Details" to learn more!</h5>
          <table className='event-table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Event Title</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>
                  <button className='btn btn-info' onClick={() => handleButtonClick(event)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
    </div>
  );
}

export default EventListing;
