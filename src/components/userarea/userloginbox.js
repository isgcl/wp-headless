import React, { useContext, useState } from 'react'
import UserLoginForm from '../formik/user-login-form'
import UserForgotPasswordForm from '../formik/user-forgot-pass-form'
import { Link } from 'react-router-dom'
import WPContext from '../../context/WPContext'

const UserLoginBox = ({className,inpopup})=> {
  
  if (className === undefined ) className = 'default'

  const {isLoginBoxShow,setIsLoginBoxShow,isMobile} = useContext(WPContext)
  const [isForgotFormVisible,setIsForgotFormVisible] = useState()

  let permaClass = 'sipa-popup login-popup'

  return (
    <>
    <button title='Login or Register' type='button' className={isLoginBoxShow ? 'go-user-box active' : 'go-user-box' }  onClick={()=> setIsLoginBoxShow(!isLoginBoxShow)}><i className='heady icon-user-3'></i> </button>
    {
        inpopup && isLoginBoxShow &&
        <div className={isLoginBoxShow ? permaClass+' active' : permaClass+' passive'}>
            <div className='in-box'>
                {
                    isForgotFormVisible ?
                    <>
                    <h2><i className='heady icon-user-maskot-2'></i> Reset my password</h2>
                    <div className='plase-login forgot-pass'>
                        <div className='left'>
                            
                            <p><strong>Please enter username. Then a reset link will send to your email adress.</strong></p>
                            {
                                !isMobile && <p><button type='button' onClick={()=> setIsForgotFormVisible(false)}><i className='heady icon-left-big'></i> Back</button></p>
                            }
                        </div>
                        <div className='right'>
                            <UserForgotPasswordForm />
                            {
                                isMobile && <p><button type='button' onClick={()=> setIsForgotFormVisible(false)}><i className='heady icon-left-big'></i> Back</button></p>
                            }
                        </div>
                    </div>
                    </>
                    : 
                    <>
                    <h2><i className='heady icon-user-happy'></i> Login</h2>
                    <div className='plase-login'>
                        <div className='left'>
                            <p><strong>Please enter username and password</strong></p>
                            {
                                !isMobile && 
                                <>
                                <p><button type='button' onClick={()=> setIsForgotFormVisible(true)}><i className='heady icon-lifebuoy'></i> Forgot your password?</button></p>
                                <p className='register-call'> Do you wanna join us?  <Link to='/register' onClick={()=>setIsLoginBoxShow(false)}><i className='heady icon-bicycle'></i> Register Now</Link></p>
                                </>
                            }
                        </div>
                        <div className='right'>
                            <UserLoginForm />
                            {
                                isMobile && 
                                <>
                                <p><button type='button' onClick={()=> setIsForgotFormVisible(true)}><i className='heady icon-lifebuoy'></i> Forgot your password?</button></p>
                                <p className='register-call'> Do you wanna join us?  <Link to='/register' onClick={()=>setIsLoginBoxShow(false)}><i className='heady icon-bicycle'></i> Register Now</Link></p>
                                </>
                            }
                        </div>
                    </div>
                    </>
                }
                <button className='closeme' type='button' onClick={()=>setIsLoginBoxShow(false)}><i className='heady icon-cancel'></i></button>
            </div>
        </div>
    }
    {
        isLoginBoxShow && !inpopup &&
        
        <div className={`user-login ${className}`}>
            <UserLoginForm />
        </div>
    }
    
    </>
  )
}

export default UserLoginBox