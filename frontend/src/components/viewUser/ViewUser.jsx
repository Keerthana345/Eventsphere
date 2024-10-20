import React, { useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import './ViewUser.css';
import { useNavigate } from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

const ViewUser = () => {
    const { currentUser } = useContext(userLoginContext);
    const navigate = useNavigate(); 

    function dashboard(){
        navigate('/managerDashboard')
    }    

    return (
      <div className="viewuser">
        <div className='image'>
        </div>
        <div className='fs-2 ms-4 mt-2 back' onClick={dashboard}>
        <IoArrowBackCircleSharp />
      </div>
        <div className="view-user-container">
            <div className="user-info-section">
                <h1><ImProfile /> Profile Overview</h1>
                <div className="user-card">
                    <p className='fs-3 mt-4'><strong>UserName:</strong> {currentUser.username}</p>
                    <p className='fs-3 mt-4'><strong>Email Address:</strong> {currentUser.email}</p>
                    <p className='fs-3 mt-4'><strong>Mobile Number:</strong> {currentUser.mobile}</p>
                </div>
            </div>
            <div className='but mt-4'>
                <button className="btn btn1 fs-5 btn-secondary" onClick={() => navigate('/editUser')}><FaRegEdit /> Edit Profile</button>
            </div>
        </div>
      </div>
    );
};

export default ViewUser;