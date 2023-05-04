import React, { useContext } from 'react'
import UserRegisterForm from '../formik/user-register'
import WPContext from '../../context/WPContext'
import { Link } from 'react-router-dom'

export default function RegisterPage() {

  const {isUserLogedIn} = useContext(WPContext)

  return (
    <>  
        {
            isUserLogedIn ? 
            <>
            <h1 className='t_center'>Wait a minute! You are already logged in. 🤗</h1>
            <p className='t_center'><Link to='/'><i className='heady icon-left-big'></i> Take me to Home</Link></p>
            </>
             :
            <>
            <h1 className='t_center'><i className='heady icon-sipa'></i> Register to SIPA Agency Network</h1>
            <section className='register-box'>
                <div className='left'>
                    <p>Please enter your username and password for SIPA Headless CMS System.</p>
                    <p>
                        <i className='heady icon-user-maskot'></i>
                    </p>
                </div>
                <div className='right'>
                    <UserRegisterForm />
                </div>
            </section>
            </>
        }
    </>
  )
}
