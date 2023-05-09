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

const userRegisterValidations = yup.object({ 
    username: yup.string().required('Required').min(3, 'Min 3 character').max(50, 'Max 50 character'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required').min(8, 'Min 8 character').max(50, 'Max 50 character'),
    password2: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords does not match').min(8, 'Min 8 character').max(50, 'Max 50 character'),
    recaptcha: yup.string().required('Required')
})

const userFormikResetPassValidation = yup.object({ 
    password: yup.string().required('Required').min(8, 'Min 8 character').max(50, 'Max 50 character'),
    password2: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords does not match').min(8, 'Min 8 character').max(50, 'Max 50 character')
})

const userForgotPasswordValidations = yup.object({ 
    email: yup.string().email('Invalid email').required('Required'),
})

const userFormikCodeValidation = yup.object({ 
    code: yup.string().required('Required').min(4, 'Min 4 character').max(4, 'Max 4 character')
})

export {
        replyValidations,
        userLoginValidations,
        userForgotPasswordValidations,
        userRegisterValidations,
        userFormikCodeValidation,
        userFormikResetPassValidation
      }
export default validations