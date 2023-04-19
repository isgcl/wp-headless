import { useFormik } from 'formik'
import {userForgotPasswordValidations} from './formik-validation'
import FormikErrorLabel from './formik-error-label'

const UserForgotPasswordForm = () => {

  
    const formik = useFormik({
        initialValues: {
          username: ''
        },
        onSubmit: values => {
          
          // console.log(values)
        },
        validationSchema: userForgotPasswordValidations // yup componenti ile hata algoritması için şema oluşturuyoruz
      });

      const {handleSubmit,handleChange,handleBlur} = formik

      return (
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
          </div>  
          
          <p className='t_right'><button type="submit" className='go-login'>Reset my Password</button></p>
          
        </form>
      );
  }

  export default UserForgotPasswordForm
