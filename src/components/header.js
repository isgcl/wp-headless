import React, { useContext,useEffect,useState } from 'react'
import GoHomeLink from './backlink/home'
import UserLoginBox from './userarea/userloginbox'
import UserLogedMenu from './userarea/user-loged-menu'
import WPContext from '../context/WPContext'


const Header = ()=> {
  
  const {isUserLogedIn,isHamburgerActive,setHamburgerActive,isLoginBoxShow} = useContext(WPContext)

  const [scrollTop, setScrollTop] = useState(0);
  
  let inPopupClassName = ''
  if (isLoginBoxShow) inPopupClassName = 'popup-inside'

  useEffect(()=>{
    const handleScroll = event => {
      setScrollTop(window.scrollY)
    }
  
    window.addEventListener('scroll', handleScroll)
  },[])

  return (
    <header className={scrollTop > 50 ? 'fixme '+inPopupClassName : inPopupClassName}>
      <div className='pg'>
        <h1 className='logo'><a href='https://sipa.web.tr' target='_blank' rel='noopener noreferrer'><i className='heady icon-sipa' title="SIPA Agency | sipa.web.tr"></i></a> <GoHomeLink cssclass='go-back' message='<em>WordPress</em> <em>Headless React CMS</em>' /></h1>
        <div className='user-login-box'>
          {
            isUserLogedIn ? 
            <UserLogedMenu />
            :
            <UserLoginBox inpopup={true} />
          }
        </div>
        <div className='hamburger-box'><button className={isHamburgerActive ? 'hamburger active' : 'hamburger'} type='button' onClick={()=> setHamburgerActive(!isHamburgerActive)}><i className='heady icon-menu'></i></button></div>
      </div>
    </header>
  )
}




export default React.memo(Header)