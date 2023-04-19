import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import {replyValidations} from './formik-validation'
import FormikErrorLabel from './formik-error-label'
import WPContext from '../../context/WPContext'
import axios from 'axios'
import Processing from '../processing'

const CommentReplyForm = ({replyid,setShowReplyForm,postid}) => {

    
    const {isUserLogedIn,setIsLoginBoxShow,logedUserData,logedUserExtentedData,createNotify} = useContext(WPContext)
    const [isProcessing,setIsProcessing] = useState()

    const { user_email,
      user_nicename,
      user_display_name
    } = logedUserData

    
    const author_id = (logedUserExtentedData !== null && logedUserExtentedData.id) || null
  
    const formik = useFormik({
        initialValues: {
          firstName: user_display_name || user_nicename || '',
          email: user_email || '',
          comment: '',
          parent: replyid || 0,
          post: postid
        },
        onSubmit: values => {
          /* submit comment */
          let fetchUri = process.env.REACT_APP_WP_COMMENTS_URI

          let commentData = {
            author: author_id || null ,
            author_email: values.email,
            author_name : values.firstName,
            content : values.comment,
            post : values.post,
            parent : values.parent
          }

          axios.post(fetchUri,commentData)
          .then(res => {
              //setComments( (prev)=> [...prev,res.data] )
              createNotify({message:'Your comment has been sent succesfully.',type:'temporary',cssclass:'green'})
              // console.log('Res data',res.data)
          }).catch(err => {
              //console.log('errol',err)
              //console.log('errol',err.response.data.message)
              createNotify({message:'An error occured. Please try again. Server response message: '+err.response.data.message,type:'temporary',cssclass:'red'})
          }).finally(()=>{
             setIsProcessing(false)
             setShowReplyForm(false)
          })
          
          // console.log('Reply sent to server...',replyid)
          
          console.log(values)
        },
        validationSchema: replyValidations // yup componenti ile hata algoritması için şema oluşturuyoruz
      });

      return (
        <> {
          isUserLogedIn ?
            <form className='comment-reply-form' onSubmit={formik.handleSubmit} noValidate>
            {
              isProcessing && <Processing message={'Processing...'} />
            }
            <div className='form-row two'>
                <p>
                  
                  {
                    isUserLogedIn ? 
                    <>
                    <strong>{user_display_name}</strong> <em>@{user_nicename}</em>
                    </>
                    :
                    <>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} // tüm hataları aynı anda göstermesin diye onblur ekleniyor. touched kısmı da olmalı, hemen aşağıda.
                        value={formik.values.firstName}
                        placeholder='Name Surname'
                      />

                      {
                        formik.errors.firstName && formik.touched.firstName && <FormikErrorLabel text={formik.errors.firstName} />
                      }
                      </>
                  }
                    
                </p>
                  {
                  !isUserLogedIn &&
                  <p>
                      <input
                          id="email"
                          name="email"
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          placeholder='Email'
                        />
                        {
                          formik.errors.email && formik.touched.email && <FormikErrorLabel text={formik.errors.email} />
                        }
                  </p> 
                }
            </div>  
            <div className='form-row'>
              <p>
                  <textarea
                    id="comment"
                    name="comment"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment}
                    placeholder='Your comment'
                    rows={4}
                  />
                  {
                    formik.errors.comment && formik.touched.comment && <FormikErrorLabel text={formik.errors.comment} />
                  }
              </p>
            </div>
            <p className='t_right'><button type="submit" className='go-submit'>Submit</button></p>
            
              {/*JSON.stringify(formik.values)*/}
          
          </form> 
          :
          <div className='login-needed'>
            <p>Please login for write a comment.</p>
            <p><button type='button' className='go-login-popup' onClick={()=>setIsLoginBoxShow(true)}>Log In</button></p>
          </div>
        } 
        
        </>

       
      );
  }

  export default CommentReplyForm;
