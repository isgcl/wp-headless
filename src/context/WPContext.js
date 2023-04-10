import React, { createContext, useState, useEffect } from "react";

const WPContext = createContext()

export const WPThemeProvider = ({children})=> {
 
  const [isHamburgerActive, setHamburgerActive] = useState(false)
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = event => {
      setScrollTop(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(()=>{
    isHamburgerActive ? document.body.classList.add('freeze') : document.body.classList.remove('freeze')
  },[isHamburgerActive])

  const values = {
    isHamburgerActive,
    setHamburgerActive,
    scrollTop,
    setScrollTop
  }


 return <WPContext.Provider value={values}>{children}</WPContext.Provider>
}

export default WPContext