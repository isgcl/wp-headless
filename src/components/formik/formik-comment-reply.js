import { useContext } from 'react'
import { useFormik } from 'formik'
import {replyValidations} from './formik-validation'
import FormikErrorLabel from './formik-error-label'
import WPContext from '../../context/WPContext'

const CommentReplyForm = ({replyid,setShowReplyForm,postid}) => {

    const {isUserLogedIn,logedUserData} = useContext(WPContext)

    const { user_email,
      user_nicename,
      user_display_name
    } = logedUserData
  
    const formik = useFormik({
        initialValues: {
          firstName: user_display_name || user_nicename || '',
          email: user_email || '',
          comment: '',
          parent: replyid,
          post: postid
        },
        onSubmit: values => {
          /* dummy content
          setComments((prev)=> [...prev,{ // ana yorumlara yaz
            id : ()=> replyid*Math.floor(Math.random()*10000),
            post: postid,
            parent: replyid,
            author: 1,
            author_name : values.firstName,
            content : { rendered : values.comment},
            status : 'approved',
            type : 'comment',
            author_avatar_urls : {
              "24" : "https://secure.gravatar.com/avatar/12a36cb4b25035c582d8ed0a3c64f869?s=24&d=mm&r=g",
              "48" : "https://secure.gravatar.com/avatar/12a36cb4b25035c582d8ed0a3c64f869?s=48&d=mm&r=g",
              "96" : "https://secure.gravatar.com/avatar/12a36cb4b25035c582d8ed0a3c64f869?s=96&d=mm&r=g"
              },
            meta :[ ],
            acf :[ ],
            author_url : "https://headless-api.sipa.web.tr",
            date : "2023-04-13T15:54:18",
            date_gmt : "2023-04-13T12:54:18"
          }])
             // dummy id     */  
          
          
          // console.log('Reply sent to server...',replyid)
          setShowReplyForm(false)
          console.log(values)
        },
        validationSchema: replyValidations // yup componenti ile hata algoritması için şema oluşturuyoruz
      });

      return (
        <form className='comment-reply-form' onSubmit={formik.handleSubmit} noValidate>
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
      );
  }

  export default CommentReplyForm;
