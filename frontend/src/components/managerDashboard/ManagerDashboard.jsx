import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ManagerDashboard.css'
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
function ManagerDashboard() {
    let navigate=useNavigate();
    function addevent(){
      navigate('/addEvent');
    }
    function viewevent(){
      navigate('/viewEvents');
    }
  return (
    <div className='managerDashboard'>
        <div className='image'>
            <div className='child1'>
            <h1>Welcome to your Event Control Center!</h1>
            <h2 className='mt-3'>Effortlessly Manage and Create Memorable Events.</h2>
            <p className='fs-4 mt-3'>From this Dashboard, you can add new Events, review your existing ones, and make sure everything is perfect for your attendees. Take charge of your Event with just a few clicks...</p>
            </div>
            <img className='child2' src="https://static.vecteezy.com/system/resources/previews/026/994/668/non_2x/event-management-wedding-planner-professional-organizer-manager-planning-event-conference-or-party-schedule-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg" alt="" />
        </div>
        <div className='body'>
            <div className='flex'>
                <div className='flex1'>
                  <h2><IoMdAddCircleOutline /> Add a New Event:</h2>
                  <p className='fs-5'>Bring your next big idea to life! Start creating an Event that your attendees will love. Fill in the details.</p>
                  <button className='btn btn-secondary fs-5' onClick={addevent}>Add Event</button>
                </div>
                <div className='flex2'>
                  <h2><IoIosSettings /> Your Events at a Glance:</h2>
                  <p className='fs-5'>Stay on top of your Events. Review,Edit,or Delete your previously added Events, and make sure everything is set for Success..!</p>
                  <button className='btn btn-secondary fs-5' onClick={viewevent}>View and Manage Events</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManagerDashboard