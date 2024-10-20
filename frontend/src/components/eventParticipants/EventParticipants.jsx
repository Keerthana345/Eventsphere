import React, { useState, useEffect } from 'react';
import './EventParticipants.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function EventParticipants() {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const [today, setToday] = useState('');

    useEffect(() => {
      const currentDate = new Date().toISOString().split('T')[0];
      setToday(currentDate);
    }, []);

    function onSearch(data) {
      navigate('/eventListing', { state: { date: data.date } });
    }

    return (
      <div className='eventparticipants'>
        <div className='image'>
        </div>
        <div className='main'>
          <h1 className='mb-3 fs-3 mt-5'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1n_gl-KXNNkQcAuuSE3L4q5yZLcMDQAnJVg&s" alt="" style={{ width: '70px', height: '70px' }} />
            Find the perfect event for your next adventure
          </h1>
          <form className='form mx-auto' onSubmit={handleSubmit(onSearch)}>
            <div className='mt-3 mb-3'>
              <input
                type="date"
                id='date'
                className='form-control'
                {...register('date', { required: true })}
                min={today}  
              />
              {errors.date?.type === 'required' && <p className='text-danger'>*Date is required</p>}
              <div className='but'>
                <button className="btn fs-5 btn-secondary mt-3">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default EventParticipants;