import React, { createContext, useState, useEffect } from "react"
import 'moment/locale/tr'
import axios from "axios"

const WPContext = createContext()

export const WPThemeProvider = ({children})=> {
 
  const [isUserLogedIn,setUserLogedIn] = useState(false)
  const [logedUserData,setLogedUserData] = useState({
    'token':null,
    'user_email': null,
    'user_nicename' : null,
    'user_display_name' : null
  })
  const [isUserMenuVisible,setUserMenuVisible] = useState(false)
  const [logedUserExtentedData,setLogedUserExtentedData] = useState(JSON.parse(localStorage.getItem('logedUserExtentedData')))
  const [isHamburgerActive, setHamburgerActive] = useState(false)
  const [isSharePopupActive, setSharePopupActive] = useState(false)
  const [mobileRefDimension, setMobileRefDimension] = useState(969)
  const [isMobile, setIsMobile] = useState(false)
  const [popupZindex,setPopupZindex] = useState(1001)
  const [isNewsPopupOpen,setNewsPopupOpen] = useState(false)
  const [newsPopupData,setNewsPopupData] = useState({})
  const [darkmode, setDarkmode] = useState(false)
  const [isStartPointHome,setIsStartPointHome] = useState(false)
  const [isLoginBoxShow,setIsLoginBoxShow] = useState(false)

  
  const [notifies,setNotifies] = useState([
    /* {
      'id':0,
      'notify':'Bu bir örnek bildirim.',
      'status':1,
      'type' : 'permanent' || 'temporary' ,
      'cssclass':'green' 
    },
    {
      'id':1,
      'notify':'Bu bir örnek bildirim. Ama daha uzun bir bildirim hacılarrrrrrr.....',
      'status':1,
      'type' : 'permanent' || 'temporary',
      'cssclass':'red' 
    },
    {
      'id':2,
      'notify':'Bu bir örnek bildirim. Ama daha uzun bir bildirim hacılarrrrrrr.....',
      'status':1,
      'type' : 'permanent' || 'temporary',
      'cssclass':'' 
    }   */ 
  ])

  const createNotify = ({message,type,cssclass})=>{
    let newNotify = {
      'id': Math.floor(Math.random()*777373469482199*Math.random()),
      'notify':message,
      'status':1,
      'type':type,
      'cssclass':cssclass
    }
    setNotifies((prev)=> [...prev,newNotify])
    //console.log('notify message.length',message.length,message)
    /* if want to auto hide notify */
    if (type === 'temporary') {
      setTimeout(()=>{closeNotify(newNotify.id)},message.length*300)
    }
  }

  const closeNotify = (id)=>{
      const newState = notifies.map(obj => {
          // 👇️ if id equals 2, update country property
          if (obj.id === id) {
            return {...obj, status: 0};
          }
          // 👇️ otherwise return the object as is
          return obj;
        })
    
        setNotifies(newState);
  }
  
  useEffect(() => {

    const checkMobile = ()=> {
      if (window.innerWidth < mobileRefDimension) {
          // console.log('mobildeyiz',window.innerWidth,mobileRefDimension)
        setIsMobile(true)
      } else {
        //console.log('masaüstündeyiz',window.innerWidth,mobileRefDimension)
        setIsMobile(false)
      }
    }

    const checkLocalDarkMode = ()=> {
      let localDarkModeStatus = localStorage.getItem('darkmode');
      if (localDarkModeStatus !== null) setDarkmode(true)
    }

    checkMobile() // check small screen devices
    checkLocalDarkMode() // check local dark mode settings
    
    window.addEventListener('resize', checkMobile)

    /* user remember */

    let localUserSavedToken = localStorage.getItem('token')

    if (localUserSavedToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localUserSavedToken}`;
        setLogedUserData({
          'token':localStorage.getItem('token'),
          'user_email': localStorage.getItem('user_email'),
          'user_nicename' : localStorage.getItem('user_nicename'),
          'user_display_name' : localStorage.getItem('user_display_name')
        })
        setUserLogedIn(true)
      }
      // eslint-disable-next-line
  }, [])
  
  useEffect(()=>{
    isHamburgerActive || isSharePopupActive ? document.body.classList.add('freeze') : document.body.classList.remove('freeze')
    if (isHamburgerActive || isSharePopupActive) setUserMenuVisible(false) 
  },[isHamburgerActive,isSharePopupActive])

  useEffect(()=>{
    isNewsPopupOpen ? document.body.classList.add('news-popup-active') : document.body.classList.remove('news-popup-active')
    if (isNewsPopupOpen) setUserMenuVisible(false) 
  },[isNewsPopupOpen])

  useEffect(()=>{
    darkmode ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode')
  },[darkmode])

  const values = {
    isUserLogedIn,
    setUserLogedIn,
    isUserMenuVisible,
    setUserMenuVisible,
    logedUserExtentedData,
    setLogedUserExtentedData,
    logedUserData,
    setLogedUserData,
    isHamburgerActive,
    setHamburgerActive,
    isSharePopupActive,
    setSharePopupActive,
    isMobile,
    setIsMobile,
    mobileRefDimension,
    setMobileRefDimension,
    popupZindex,
    setPopupZindex,
    isNewsPopupOpen,
    setNewsPopupOpen,
    newsPopupData,
    setNewsPopupData,
    darkmode,
    setDarkmode,
    isStartPointHome,
    setIsStartPointHome,
    isLoginBoxShow,
    setIsLoginBoxShow,
    notifies,
    setNotifies,
    createNotify,
    closeNotify
  }


 return <WPContext.Provider value={values}>{children}</WPContext.Provider>
}

export default WPContext