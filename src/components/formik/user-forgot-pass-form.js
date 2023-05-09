import { useFormik } from 'formik'
import {userForgotPasswordValidations, userFormikCodeValidation, userFormikResetPassValidation} from './formik-validation'
import FormikErrorLabel from './formik-error-label'
import { useContext, useEffect, useState } from 'react'
import Processing from '../processing'
import axios from 'axios'
import WPContext from '../../context/WPContext'
import MessageBox from '../tool/messagebox'

const UserForgotPasswordForm = () => {

    const [isProcessing,setIsProcessing] = useState(false)
    const [isEmailFormVisible,setIsEmailFormVisible] = useState(true)
    const [isCodeValidationFormVisible,setIsCodeValidationFormVisible] = useState(false)
    const [isPassResetFormVisible,setIsPassResetFormVisible] = useState(false)
    const [isPassTextShow,setIsPassTextShow] = useState(false)
    const [processSuccess,setProcessSuccess] = useState(false)

    const {
      createNotify
    } = useContext(WPContext)

    useEffect(()=>{
      setIsEmailFormVisible(true)
      setIsCodeValidationFormVisible(false)
      setIsPassResetFormVisible(false)
      setProcessSuccess(false)
      setIsPassTextShow(false)
    },[])

    // password reset request form
    const formik = useFormik({
        initialValues: {
          email: ''
        },
        onSubmit: values => {

          setIsProcessing(true)

          const resetPayload = {
            email: values.email
          }
        
          axios.post(process.env.REACT_APP_FORGOT_PASS_URI+'reset-password', resetPayload)
            .then(response => {
              //get token from response
              // const token  =  response.data.token;
              console.log(response.data)
              setIsEmailFormVisible(false)
              setIsCodeValidationFormVisible(true)
              setFieldValue2('email',values.email)
            })
            .catch( (err) => {

              createNotify({
                message: err.response.data.message,
                cssclass: 'red',
                type: 'temporary'
              })

            }).finally(()=>{
              setIsProcessing(false)
            })
        },
        validationSchema: userForgotPasswordValidations 
      });

    const {handleSubmit,handleChange,handleBlur} = formik

    // reset code validation form
    const formikCodeValidation = useFormik({
      initialValues: {
        code: '',
        email: ''
      },
      onSubmit: values => {

        setIsProcessing(true)

        const codePayload = {
          code: values.code,
          email: values.email
        }
      
        axios.post(process.env.REACT_APP_FORGOT_PASS_URI+'validate-code', codePayload)
          .then(response => {
            //get token from response
            // const token  =  response.data.token;
            console.log(response.data)
            setIsCodeValidationFormVisible(false)
            setIsPassResetFormVisible(true)
            setFieldValue3('email',values.email)
            setFieldValue3('code',values.code)
          })
          .catch( (err) => {

            createNotify({
              message: err.response.data.message,
              cssclass: 'red',
              type: 'temporary'
            })

          }).finally(()=>{
            setIsProcessing(false)
          })
      },
      validationSchema: userFormikCodeValidation 
    });

    const setFieldValue2 = formikCodeValidation.setFieldValue
    const handleSubmit2 = formikCodeValidation.handleSubmit
    const handleChange2 = formikCodeValidation.handleChange
    const handleBlur2 = formikCodeValidation.handleBlur

    // set new password form
    const formikResetPassValidation = useFormik({
      initialValues: {
        password: '',
        password2: '',
        code: '',
        email: ''
      },
      onSubmit: values => {

        setIsProcessing(true)

        const setPassPayload = {
          code: values.code,
          email: values.email,
          password: values.password
        }
      
        axios.post(process.env.REACT_APP_FORGOT_PASS_URI+'set-password', setPassPayload)
          .then(response => {
            //get token from response
            console.log(response.data)
            setIsPassResetFormVisible(false)
            setProcessSuccess(true)
          })
          .catch( (err) => {

            createNotify({
              message: err.response.data.message,
              cssclass: 'red',
              type: 'temporary'
            })

          }).finally(()=>{
            setIsProcessing(false)
          })
      },
      validationSchema: userFormikResetPassValidation 
    });

    const setFieldValue3 = formikResetPassValidation.setFieldValue
    const handleSubmit3 = formikResetPassValidation.handleSubmit
    const handleChange3 = formikResetPassValidation.handleChange
    const handleBlur3 = formikResetPassValidation.handleBlur


      return (
        <>
        {
          isProcessing && <Processing message={'Please wait...'} />
        }
        { isEmailFormVisible &&
          <form className='user-login-form' onSubmit={handleSubmit} noValidate>
            <div className='form-row'>
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
            </div>  
            
            <p className='t_right'><button type="submit" className='go-login'>Reset my Password</button></p>
          </form>
        }
        { isCodeValidationFormVisible &&
          <form className='code-validation-form' onSubmit={handleSubmit2} noValidate>
            <div className='form-row'><p>Please enter to validation code which sent to email address</p></div>
            <div className='form-row'>
                <p>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      onChange={handleChange2}
                      onBlur={handleBlur2}
                      value={formikCodeValidation.values.code}
                      placeholder='Enter the code'
                    />
                    {
                      formikCodeValidation.errors.code && formikCodeValidation.touched.code && <FormikErrorLabel text={formikCodeValidation.errors.code} />
                    }
                </p>
            </div>  
            
            <p className='t_right'><button type="submit" className='go-valid-code'>Valid Code</button></p>
          </form>
        }

        { isPassResetFormVisible &&
           <form className='set-new-password-form' onSubmit={handleSubmit3} noValidate>
           <div className='form-row'><p>Please enter your new password</p></div>
           <div className='form-row'>
              <p>
                  <input
                    id="password"
                    name="password"
                    type={isPassTextShow ? 'text': 'password'}
                    onChange={handleChange3}
                    onBlur={handleBlur3}
                    value={formikResetPassValidation.values.password}
                    placeholder='Enter new password'
                  />
                  {
                    formikResetPassValidation.errors.password && formikResetPassValidation.touched.password && <FormikErrorLabel text={formikResetPassValidation.errors.password} />
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
                  onChange={handleChange3}
                  onBlur={handleBlur3}
                  value={formikResetPassValidation.values.password2}
                  placeholder='Enter new password (again)'
                />
                {
                  formikResetPassValidation.errors.password2 && formikResetPassValidation.touched.password2 && <FormikErrorLabel text={formikResetPassValidation.errors.password2} />
                }
            </p>
          </div>  
           
           <p className='t_right'><button type="submit" className='go-set-new-pass'>Set New Password</button></p>
           </form>
        }
        {
          processSuccess && <MessageBox message='Your password has been updated. You can login now'></MessageBox>
        }

        </>
      );
  }

  export default UserForgotPasswordForm
