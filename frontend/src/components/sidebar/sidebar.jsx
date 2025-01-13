import React, { useState, useEffect } from 'react'
import userImage from '../../assets/images/icons/user.png'
import { Button, Dropdown } from 'react-bootstrap';
import { BadgeAd, BuildingFillUp, CashStack, ChevronDown, GearWide, GridFill, HourglassSplit, People, PersonWorkspace, Record2, Stack, ThreeDots } from 'react-bootstrap-icons';
import './sidebar.css'; // Create this CSS file to style the sidebar
import { useLocation, Link, useNavigate } from 'react-router-dom';
import UserService from '../../services/auth-service';
import {authStore} from '../../store/authStore'
import spinnerStore from '../../store/spinnerStore'

export default function Sidebar({expanded}) {
  const navigate = useNavigate();
  const setIsLoading = spinnerStore((state) => state.setIsLoading);
  const user = authStore((state) => state.user);
  // const logoutState = authStore((state) => state.logout);
  const location = useLocation();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const setTokenAndUser = authStore((state) => state.setTokenAndUser);

  //Check if any link in the submenu is active
  useEffect(() => {
    // Check if any link in the submenu is active
    const submenuLinks = document.querySelectorAll('.pha-nav .submenu a');
    const isActive = Array.from(submenuLinks).some(link => link.classList.contains('active'));
    setActiveSubMenu(isActive);
  }, [location.pathname]);

  const handleSubmenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const handleLogout = () => {
    setIsLoading(true);
    UserService.logout(user).then(response => {
      
        setTokenAndUser(null, {}, false);
        // logoutState();
        setIsLoading(false);
        navigate('/login')
        
    }).catch(error => {
        setIsLoading(false);
        console.log(error)
  })
};
  
  // Check if any link in the submenu is active
  // const isSubmenuActive = () => {
  //   const submenuLinks = document.querySelectorAll('.pha-nav .submenu a');
  //   for (const link of submenuLinks) {
  //     if (link.classList.contains('active')) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };
  
  
  return (
    <>
      <div className="sidebar">
        <div className='sidebar-header'>
          
          <h4>Bidding System</h4>
          
        </div>

        <nav>
        <ul className='pha-nav'>
            
            
            <li>
              <Link to="/item/listing" className={`${location.pathname === '/item/listing' ? ' active' : ''}`}><BuildingFillUp className="nav-icon" /> Items</Link>
            </li>
           
          </ul>
        </nav>
        <div className="sidebar-footer">
        <p>Profile</p>
          <div className='d-flex align-items-center mb-3'>
            <div className='flex-shrink-0'>
              <div className='user-img'>
                <img src={userImage} alt="userImage" className='img-fluid'/>
              </div>
            </div>
            <div className='flex-grow-1 ms-2'>
              <div className='user-info'>
                <h5>{user.username}</h5>
                
              </div>
            </div>
            
          </div>
          <div className='d-grid'>
            <Button variant='success' onClick={handleLogout}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.57422 19.6914H8.85938C11.6719 19.6914 13.4297 17.9336 13.4297 15.1211V11.5615L7.93652 11.5615C7.57617 11.5615 7.27734 11.2627 7.27734 10.9023C7.27734 10.542 7.57617 10.2432 7.93652 10.2432L13.4297 10.2432L13.4297 6.68359C13.4297 3.87109 11.6719 2.11328 8.85937 2.11328H6.58301C3.77051 2.11328 2.0127 3.87109 2.0127 6.68359L2.0127 15.1211C2.00391 17.9336 3.76172 19.6914 6.57422 19.6914Z" fill="white"/>
                <path d="M17.3313 11.5615L15.512 13.3809C15.3801 13.5127 15.3186 13.6797 15.3186 13.8467C15.3186 14.0137 15.3801 14.1895 15.512 14.3125C15.7668 14.5674 16.1887 14.5674 16.4436 14.3125L19.3879 11.3682C19.6428 11.1133 19.6428 10.6914 19.3879 10.4365L16.4436 7.49219C16.1887 7.2373 15.7668 7.2373 15.512 7.49219C15.2571 7.74707 15.2571 8.16895 15.512 8.42383L17.3313 10.2432L13.429 10.2432V11.5615L17.3313 11.5615Z" fill="white"/>
              </svg> Logout
            </Button>
          </div>
      </div>
    </div>
    </>
  )
}
