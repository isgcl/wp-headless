import React, { useContext } from 'react'
import GoHomeLink from './backlink/home'
import WPContext from '../context/WPContext'


const Header = ()=> {
  
  const {isHamburgerActive,setHamburgerActive,scrollTop} = useContext(WPContext)

  return (
    <header className={scrollTop > 50 ? 'fixme': ''}>
      <div className='pg'>
        <h1 className='logo'><GoHomeLink cssclass='go-back' message='WordPress Headless React CMS' /></h1>
        <button className={isHamburgerActive ? 'active' : ''} type='button' onClick={()=> setHamburgerActive(!isHamburgerActive)}>Menu</button>
      </div>
    </header>
  )
}




export default React.memo(Header)