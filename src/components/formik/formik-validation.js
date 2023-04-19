import * as yup from 'yup'

const validations = yup.object({ // yup eklentisi burada validasyonları Formik eklentisine gönderiyor.
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
  })

const replyValidations = yup.object({ 
    firstName: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    comment: yup.string().required('Required').max(1000, 'Comment has a maximum limit of 1000 characters.')
  })

const userLoginValidations = yup.object({ 
    username: yup.string().required('Required'),
    password: yup.string().required('Required'),
})
const userForgotPasswordValidations = yup.object({ 
    username: yup.string().required('Required'),
})

export {
        replyValidations,
        userLoginValidations,
        userForgotPasswordValidations
      }
export default validations