import React , {useContext} from 'react'
import {
    NavLink,
  } from "react-router-dom";

import WPContext from '../context/WPContext';


const Sidebar = () => {

  const {isHamburgerActive,setHamburgerActive} = useContext(WPContext)

  return (
    <aside className={isHamburgerActive ? 'active': ''}>
    <button type='button' href='/' className='close-hamburger' onClick={()=> setHamburgerActive(!isHamburgerActive)}>Close</button>
    <nav id='main-nav'>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/news">News</NavLink>
            </li>
            <li>
                <NavLink to="/slick-slide">Slick Slider</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
                <NavLink to="/users">Users</NavLink>
            </li>
            <li>
                <NavLink to="/formik">Formik</NavLink>
            </li>
            
        </ul>
    </nav>
  </aside>
  )
}


export default Sidebar