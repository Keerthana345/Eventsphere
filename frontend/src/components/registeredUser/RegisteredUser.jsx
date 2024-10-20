import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp, IoChevronBackCircle, IoChevronForwardCircle } from 'react-icons/io5';
import './RegisteredUser.css';

function RegisteredUser() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [registerData, setRegistration] = useState(null); 
  const [len, setLen] = useState(0);
  const index = state.ind;
  const id = state.id;

  async function fetchRegisteredUser() {
    try {
      const res = await fetch('http://localhost:4000/user-api/users',{
        method: "GET",
        headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${sessionStorage.getItem('token')}`},
      });
      const result = await res.json();
      const data = result.payload;
      const filteredRegistrations = data.filter((registration) => registration.eventId === id);
      setLen(filteredRegistrations.length); 
      const specificRegistration = filteredRegistrations[index];
      setRegistration(specificRegistration);
    } catch (err) {
      console.error('Error fetching registered user', err);
    }
  }

  useEffect(() => {
    fetchRegisteredUser();
  }, [index , id]);

  function getTeamMembers() {
    if (!registerData) return []; 

    const members = [];
    let idx = 1;  
    while (registerData[`fullname_${idx}`] && registerData[`rollno_${idx}`]) {
      members.push({
        fullname: registerData[`fullname_${idx}`],
        rollno: registerData[`rollno_${idx}`],
      });
      idx++;
    }

    return members;
  }

  const teamMembers = getTeamMembers();

  function view() {
    navigate(`/viewRegisteredUsers/${id}`, { state: { _id: id } });
  }

  function nextUser1() {
    navigate('/registeredUser', { state: { ind: index-1, id: id } });
  }

  function nextUser2() {
    navigate('/registeredUser', { state: { ind: index+1, id: id } });
  }

  return (
    <div className='registered-user'>
      <div className='image'></div>
      <div className='fs-2 ms-4 mt-2 back' onClick={view}>
        <IoArrowBackCircleSharp />
      </div>
      <div className='user-details'>
        {registerData && (
          <>
            <h1 className='mb-3'>
              {registerData.fullname_1 ? 'Team Registration Details' : 'Registered User Details'}
            </h1>
            {registerData.fullname_1 ? (
              <>
                <h2 className='mb-4'>Team Leader Information</h2>
                <p className='fs-5'>
                  <strong>Name:</strong> {registerData.fullname}
                </p>
                <p className='fs-5'>
                  <strong>Roll Number:</strong> {registerData.rollno}
                </p>
                <p className='fs-5'>
                  <strong>Email:</strong> {registerData.email}
                </p>
                <p className='fs-5'>
                  <strong>Branch:</strong> {registerData.branch}
                </p>
                <p className='fs-5'>
                  <strong>Section:</strong> {registerData.sec}
                </p>
                <p className='fs-5'>
                  <strong>Phone Number:</strong> {registerData.mobile}
                </p>

                <h2 className='mb-4'>Team Members Information</h2>
                {teamMembers.map((member, idx) => (
                  <div key={member.rollno} className='team-member'> 
                    <p className='fs-5'>
                      <strong>Member {idx + 1} Name:</strong> {member.fullname}
                    </p>
                    <p className='fs-5'>
                      <strong>Member {idx + 1} Roll Number:</strong> {member.rollno}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p className='fs-5'>
                  <strong>Name:</strong> {registerData.fullname}
                </p>
                <p className='fs-5'>
                  <strong>Roll Number:</strong> {registerData.rollno}
                </p>
                <p className='fs-5'>
                  <strong>Email:</strong> {registerData.email}
                </p>
                <p className='fs-5'>
                  <strong>Branch:</strong> {registerData.branch}
                </p>
                <p className='fs-5'>
                  <strong>Section:</strong> {registerData.sec}
                </p>
                <p className='fs-5'>
                  <strong>Phone Number:</strong> {registerData.phone}
                </p>
              </>
            )}
          </>
        )}
        <div className='next fs-1 mt-5'>
          {index > 0 && <IoChevronBackCircle onClick={nextUser1} />}
          {index < len - 1 && <IoChevronForwardCircle onClick={nextUser2}/>}
        </div>
      </div>
    </div>
  );
}

export default RegisteredUser;
