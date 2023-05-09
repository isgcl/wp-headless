import { useFormik } from 'formik'
import {userLoginValidations} from './formik-validation'
import FormikErrorLabel from './formik-error-label'
import axios from 'axios'
import { useContext, useState } from 'react'
import Processing from '../processing'
import ThereIsAnError from '../infotext/an-error'
import WPContext from '../../context/WPContext'

export const setAuthToken = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else 
  delete axios.defaults.headers.common["Authorization"];
}

const UserLoginForm = () => {

    const {
      setUserLogedIn,
      setLogedUserData
    } = useContext(WPContext)
    const [isProcessing,setIsProcessing] = useState(false)
    const [isConnectionError,setIsConnectionError] = useState(false)
    const [responseErrorMessage,setResponseErrorMessage] = useState(null)
    const [isPassTextShow,setIsPassTextShow] = useState(false)
    
  
    const formik = useFormik({
        initialValues: {
          username: '',
          password: ''
        },
        onSubmit: values => {
          setIsProcessing(true)
          setIsConnectionError(false)
          //reqres registered sample user
          const loginPayload = {
            username: values.username,
            password: values.password
          }
        
          axios.post(process.env.REACT_APP_WP_HEADLESS_LOGIN_URI, loginPayload)
            .then(response => {
              //get token from response
              const token  =  response.data.token;
        
              //set JWT token to local
              localStorage.setItem('token', token);
              localStorage.setItem('user_email', response.data.user_email);
              localStorage.setItem('user_nicename', response.data.user_nicename);
              localStorage.setItem('user_display_name', response.data.user_display_name);

              setUserLogedIn(true)

              setLogedUserData({
                'token': token,
                'user_email': response.data.user_email,
                'user_nicename': response.data.user_nicename,
                'user_display_name' :response.data.user_display_name
              })
        
              //set token to axios common header
              setAuthToken(token);
              // console.log('login Başarılı')
              setIsProcessing(false)
            })
            .catch( (err) => {
              
              setResponseErrorMessage(JSON.stringify(err.response.data.message)) 
              //console.log(responseErrorMessage)
              setIsProcessing(false)
              setIsConnectionError(true)
            })
        },
        validationSchema: userLoginValidations // yup componenti ile hata algoritması için şema oluşturuyoruz
      });

      const {handleSubmit,handleChange,handleBlur} = formik

      const autoLoginTestUser = ()=>{
        formik.values.username = 'sipatestuser'
        formik.values.password = 'sipassword'
        formik.submitForm()
      }

      return (
        <>
        {
          isProcessing && <Processing message={'Please wait...'} />
        }
        {
          isConnectionError && responseErrorMessage !== null && <ThereIsAnError message={responseErrorMessage} tag={'div'} />
        }
        <form className='user-login-form' onSubmit={handleSubmit} noValidate>
          <div className='form-row'>
              <p>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur} // tüm hataları aynı anda göstermesin diye onblur ekleniyor. touched kısmı da olmalı, hemen aşağıda.
                    value={formik.values.username}
                    placeholder='Username or email'
                  />

                  {
                    formik.errors.username && formik.touched.username && <FormikErrorLabel text={formik.errors.username} />
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
          </div>  
          
          <p className='t_right'><button type="submit" className='go-login'>Log in</button></p>
          <p><button type='button' className='go-test-user-login' onClick={()=>autoLoginTestUser()}><i className='heady icon-child'></i> Auto login for Test user.</button></p>
            {/*JSON.stringify(formik.values)*/}
        
        </form>
        </>
      );
  }

  export default UserLoginForm
