import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewRegisteredUsers.css';
import { IoArrowBackCircleSharp } from "react-icons/io5";

function ViewRegisteredUsers() {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [isTeamEvent, setIsTeamEvent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { state } = useLocation();
  const eventId = state._id;

  async function fetchRegistrations() {
    try {
      const response = await fetch('http://localhost:4000/user-api/users',{
        method: "GET",
        headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${sessionStorage.getItem('token')}`},
      });
      const data = await response.json();
      const array = data.payload;
      setRegistrations(array);
      filterRegistrations(array, eventId);
    } catch (error) {
      setError('Error fetching registrations: ' + error.message);
    }
  }

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  function filterRegistrations(registrations, eventId) {
    const filtered = registrations.filter(registration => registration.eventId === eventId);
    setFilteredRegistrations(filtered);

    const isTeam = filtered.some(registration => registration.fullname_1);
    setIsTeamEvent(isTeam);
  }

  function handleViewDetails(index) {
    navigate('/registeredUser', { state: { ind:index , id:eventId} });
  }

  return (
    <div className='main7'>
      <div className='fs-2 ms-4 mt-2 back' onClick={() => navigate('/viewEvents')}>
        <IoArrowBackCircleSharp />
      </div>
      <div className='registration-listing'>
        <h1>Registered Participants</h1>
        {error && <p className='text-danger'>{error}</p>}
        {filteredRegistrations.length === 0 ? (
          <h5 className='text-danger fs-3'>No registrations available for the selected event.</h5>
        ) : (
          <div>
            <h2>Here are all the registrations. Click on "View Details" to learn more!</h2>
            <table className='registration-table'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>{isTeamEvent ? 'Team Leader' : 'Student Name'}</th>
                  <th>Roll No</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration, index) => (
                  <tr key={registration._id}>
                    <td>{index + 1}</td>
                    <td>{registration.fullname_1 ? registration.fullname : registration.fullname}</td>
                    <td>{registration.rollno}</td>
                    <td>
                      <button className='btn btn-info' onClick={() => handleViewDetails(index)}>
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

export default ViewRegisteredUsers;
