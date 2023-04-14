import React, { createContext, useState, useEffect } from "react";

const WPContext = createContext()

export const WPThemeProvider = ({children})=> {
 
  const [isHamburgerActive, setHamburgerActive] = useState(false)
  const [scrollTop, setScrollTop] = useState(0);
  const [isSharePopupActive, setSharePopupActive] = useState(false)
  const [mobileRefDimension, setMobileRefDimension] = useState(969)
  const [isMobile, setIsMobile] = useState(false)
  const [popupZindex,setPopupZindex] = useState(1001)
  const [isNewsPopupOpen,setNewsPopupOpen] = useState(false)
  const [newsPopupData,setNewsPopupData] = useState({})
  const [darkmode, setDarkmode] = useState(false)
  const [isStartPointHome,setIsStartPointHome] = useState(false)

  const checkMobile = ()=> {
    if (window.innerWidth < mobileRefDimension) {
      // console.log('mobildeyiz',window.innerWidth,mobileRefDimension)
      setIsMobile(true)
    } else {
      // console.log('masaüstündeyiz',window.innerWidth,mobileRefDimension)
      setIsMobile(false)
    }
  }

  const checkLocalDarkMode = ()=> {
    let localDarkModeStatus = localStorage.getItem('darkmode');
    if (localDarkModeStatus !== null) setDarkmode(true)
  }

  useEffect(() => {
    
    checkMobile() // check small screen devices
    checkLocalDarkMode() // check local dark mode settings

    const handleScroll = event => {
      setScrollTop(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.addEventListener('resize', checkMobile)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    isHamburgerActive || isSharePopupActive ? document.body.classList.add('freeze') : document.body.classList.remove('freeze')
  },[isHamburgerActive,isSharePopupActive])

  useEffect(()=>{
    isNewsPopupOpen ? document.body.classList.add('news-popup-active') : document.body.classList.remove('news-popup-active')
  },[isNewsPopupOpen])

  useEffect(()=>{
    darkmode ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode')
  },[darkmode])

  const values = {
    isHamburgerActive,
    setHamburgerActive,
    scrollTop,
    setScrollTop,
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
    setIsStartPointHome
  }


 return <WPContext.Provider value={values}>{children}</WPContext.Provider>
}

export default WPContext