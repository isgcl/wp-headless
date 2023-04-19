const FormikErrorLabel = (props)=> {
    const {text,cssclass} = props
    return <span className={`error ${cssclass}`}>{text}</span>
}

export default FormikErrorLabel