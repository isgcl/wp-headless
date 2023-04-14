import React, { useContext } from 'react'
import GoHomeLink from './backlink/home'
import WPContext from '../context/WPContext'


const Header = ()=> {
  
  const {isHamburgerActive,setHamburgerActive,scrollTop} = useContext(WPContext)

  return (
    <header className={scrollTop > 50 ? 'fixme': ''}>
      <div className='pg'>
        <h1 className='logo'><a href='https://sipa.web.tr' target='_blank' rel='noopener noreferrer'><i className='heady icon-sipa' title="SIPA Agency | sipa.web.tr"></i></a> <GoHomeLink cssclass='go-back' message='<em>WordPress</em> <em>Headless React CMS</em>' /></h1>
        <button className={isHamburgerActive ? 'hamburger active' : 'hamburger'} type='button' onClick={()=> setHamburgerActive(!isHamburgerActive)}><i className='heady icon-menu'></i></button>
      </div>
    </header>
  )
}




export default React.memo(Header)