import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';
import { useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
function Header() {
    let {logoutUser,userLoginStatus,currentUser}=useContext(userLoginContext)
    const [showModal, setShowModal] = useState(false);

    function modalDisplay(){
        setShowModal(!showModal);
    }
    function closeModal(){
        setShowModal(false);
    }
    function handleLogout(){
        logoutUser();
        closeModal();
    }
  return (
    <div className='header'>
        <Link to='' className='nav-link'><h1 className='p-2'> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpl5o_urnUyT9JZYJzcW1146hpvtXrDfAo0N0U7oOAfw&s" alt="" style={{width:'50px',height:'50px'}}/>    EventSphere</h1></Link>
        <ul className='nav p-2'>
            <li className='nav-item'>
                <Link to='' className='nav-link text-dark a'>
                <IoHome className='icon'/>Home</Link>
            </li>
            <li className='nav-item'>
                <Link to='register' className='nav-link text-dark a'>
                <SiGnuprivacyguard className='icon'/>Register</Link>
            </li>
            {userLoginStatus===false?(
                 <li className='nav-item'>
                 <Link to='login' className='nav-link text-dark a'>
                 <FaSignInAlt className='icon'/>Login</Link>
             </li>
            ):(
                <li className='nav-item'>
                    <button className='nav-link btn' onClick={modalDisplay}>
                        <CgProfile className='profile' />
                    </button>
                </li>
            )}
        </ul>
        {showModal && (
                <div className='modal-overlay'>
                    <div className="modal-dialog">
                        <div className='modal-content'>
                                <h2><CgProfile /> {currentUser.username}</h2>
                                <Link to='viewUser' className='mt-2 nav-link' onClick={closeModal}><h5><MdOutlineRemoveRedEye />   View Details</h5></Link>
                                <Link to='editUser' className='mt-2 nav-link' onClick={closeModal}><h5><FaRegEdit />   Edit Details</h5></Link>
                                <Link to='login' className='mt-2 nav-link' onClick={handleLogout}><h5><TbLogout2 className='icon' />   Logout</h5></Link>
                                <button onClick={closeModal} className='btn btn-secondary fs-5'>Close</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Header