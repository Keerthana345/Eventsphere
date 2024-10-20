import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
function Home() {
    let navigate=useNavigate();
    function eventparticipants(){
        navigate('/eventParticipants');
    }
    function register(){
        navigate('/register');
    }
  return (
    <div className='Home'>
        <div className='image'>
            <div className='child1'>
                <h1 className='mb-3'>Where Events Come to Life—Join Us.</h1>
                <h3 className='mb-3 mt-4'>Effortlessly find the events that matter to you or host one of your own.</h3>
                <h4 className='mt-4'>Get started by clicking on either <span>"Event Participants"</span> or <span>"Event Managers"</span></h4>
            </div>
            <img className='child2' src="https://static.vecteezy.com/system/resources/previews/000/274/556/non_2x/vector-time-management-planning-events-organization.jpg" alt="" />
        </div>
        <div className='body'>
            <div className='flex'>
                <div className='flex1' onClick={eventparticipants}>
                    <img src="https://media.istockphoto.com/id/1394089097/vector/group-of-people-with-empty-banner-concept.jpg?s=612x612&w=0&k=20&c=QSmLZiG9NALSgtlPT-qqi0uqaIeZ9zLMvCJJDEL6ZHE=" alt="" />
                    <h2 className='mt-2'>Event Participants</h2>
                    <p className='fs-4 mt-2'>Browse through vareity of events and Join Events that Excite you</p>
                </div>
                <div className='flex2' onClick={register}>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/event-management-illustration-download-in-svg-png-gif-file-formats--service-entertainment-catering-pack-people-illustrations-4620530.png?f=webp" alt="" />
                    <h2 className='mt-2'>Event Managers</h2>
                    <p className='fs-4 mt-2'>Create Events with Ease. Register as an event Manager..</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home