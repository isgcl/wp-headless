import React from 'react'
import { useFormik } from 'formik'
import {userRegisterValidations} from './formik-validation'
import FormikErrorLabel from './formik-error-label'
import axios from 'axios'
import { useContext, useState } from 'react'
import Processing from '../processing'
import ThereIsAnError from '../infotext/an-error'
import WPContext from '../../context/WPContext'
import ReCAPTCHA from "react-google-recaptcha";
import MessageBox from '../tool/messagebox'


const UserRegisterForm = ()=> {
   
    const {
        isMobile,
        setIsLoginBoxShow,
        darkmode
    } = useContext(WPContext)

    const [isProcessing,setIsProcessing] = useState(false)
    const [isConnectionError,setIsConnectionError] = useState(false)
    const [responseErrorMessage,setResponseErrorMessage] = useState(null)
    const [isRegisterSuccess,setIsRegisterSuccess] = useState(false)

    const [isPassTextShow,setIsPassTextShow] = useState(false)

    const recaptchaOnChange = (value) => {
      //console.log("Captcha value:", value);
      setFieldValue('recaptcha',value)
    }

    const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: '',
          password2: '',
          recaptcha :''
        },
        onSubmit: values => {
          setIsProcessing(true)
          setIsConnectionError(false)
          //reqres registered sample user
          const registerPayload = {
            username: values.username,
            password: values.password,
            email: values.email
          }
        
          axios.post(process.env.REACT_APP_WP_HEADLESS_REGISTER_URI, registerPayload)
            .then(response => {
              setIsRegisterSuccess(true)
            })
            .catch( (err) => {
              setIsConnectionError(true)
              setResponseErrorMessage(err.response.data.message)
            })
            .finally(res=>{
              setIsProcessing(false)
            })
        },
        validationSchema: userRegisterValidations
      });

      const {handleSubmit,handleChange,handleBlur,setFieldValue} = formik

    
  return (
    <>
        {
          isProcessing && <Processing message={'Please wait...'} />
        }
        {
          (isConnectionError || responseErrorMessage !== null) && <ThereIsAnError message={responseErrorMessage || 'An error occured, please try again.'} tag='div' />
        }
        {
          isRegisterSuccess ? 
          <>
          <MessageBox message="Your registration succesfull. You can log in now." />
          <p><button type='button' className="go-login" onClick={()=>setIsLoginBoxShow(true)}>Log In</button></p>
          </>
          : 
          <form className='user-register-form' onSubmit={handleSubmit} noValidate>
            <div className='form-row'>
                <p>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur} 
                      value={formik.values.username}
                      placeholder='Username'
                    />

                    {
                      formik.errors.username && formik.touched.username && <FormikErrorLabel text={formik.errors.username} />
                    }
                </p>
                <p>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur} 
                      value={formik.values.email}
                      placeholder='Email'
                    />

                    {
                      formik.errors.email && formik.touched.email && <FormikErrorLabel text={formik.errors.email} />
                    }
                </p>
                <p>
                  <input
                    id="password"
                    name="password"
                    type={isPassTextShow ? 'text': 'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formik.values.password}
                    placeholder='Password'
                  />
                  {
                    formik.errors.password && formik.touched.password && <FormikErrorLabel text={formik.errors.password} />
                  }
                  {
                      isPassTextShow ? 
                      <button className='go-pass-visible' type='button' title='Hide password' onClick={()=>setIsPassTextShow(false)}><i className='heady icon-eye-off'></i></button> : 
                      <button className='go-pass-visible' type='button' title='Show password' onClick={()=>setIsPassTextShow(true)}><i className='heady icon-eye'></i></button>
                  }
                  
              </p>
              <p>
                  <input
                    id="password2"
                    name="password2"
                    type={isPassTextShow ? 'text': 'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formik.values.password2}
                    placeholder='Password (again)'
                  />
                  {
                    formik.errors.password2 && formik.touched.password2 && <FormikErrorLabel text={formik.errors.password2} />
                  }
              </p>
            </div>  
            <div className='form-row'>
              <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                  theme={darkmode ? 'dark' : 'light'}
                  onChange={recaptchaOnChange}
                  hl='en'
                  size={isMobile ? 'compact' : 'normal'}
                />
                {
                  formik.errors.recaptcha && <FormikErrorLabel text={formik.errors.recaptcha} />
                }
            </div>
            
            <p className='t_right'><button type="submit" className='go-register'>Register</button></p>
          
          </form>
        }
        
        </>
  )
}
export default UserRegisterForm