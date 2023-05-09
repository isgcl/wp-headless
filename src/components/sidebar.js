import React , {useContext} from 'react'
import {
    NavLink,
  } from "react-router-dom";

import WPContext from '../context/WPContext';


const Sidebar = () => {

  const {
    isHamburgerActive,
    setHamburgerActive,
    setNewsPopupOpen,
    isUserLogedIn,
    darkmode,
    setDarkmode
  } = useContext(WPContext)

  const setSomeDisable = () => {
    setHamburgerActive(false)
    setNewsPopupOpen(false)
  }

  const changeDarkMode = (ev)=> {
    if (ev.target.checked) {
      setDarkmode(true)
      localStorage.setItem('darkmode',true)
    } else {
      setDarkmode(false)
      localStorage.removeItem('darkmode')
    }
  }

  return (
    <aside className={isHamburgerActive ? 'active': ''}>
      
    <button type='button' className='close-hamburger' onClick={()=> setHamburgerActive(false)}><i className='heady icon-cancel'></i></button>
    <nav id='main-nav'>
        <ul>
            <li>
                <NavLink onClick={()=>setSomeDisable()} to="/">Home</NavLink>
            </li>
            <li>
                <NavLink onClick={()=>setSomeDisable()} to="/page/about">About</NavLink>
            </li>
            <li>
                <NavLink onClick={()=>setSomeDisable()} to="/news">News Stream</NavLink>
            </li>
            <li>
                <NavLink onClick={()=>setSomeDisable()} to="/categories">Categories</NavLink>
            </li>
            {
              !isUserLogedIn && 
              <li>
                <NavLink onClick={()=>setSomeDisable()} to="/register">Register</NavLink>
            </li>
            }
        </ul>
    </nav>
    <p className='dark-mode-options'>
      <input type='checkbox' onChange={changeDarkMode} value={undefined} id='darkmode' name='darkmode' checked={darkmode ? 'checked': false } /> <label htmlFor='darkmode'>{ darkmode ? 'Dark Mode' : 'Dark Mode'}</label>
    </p>
    <p className='rocket'>
      <i className='heady icon-sipa'></i>
      <strong>WordPress Headless CMS</strong>
      <a href='https://sipa.web.tr' target='_blank' rel='noopener noreferrer'>Coded by SIPA Agency</a>
    </p>
  </aside>
  )
}


export default Sidebar