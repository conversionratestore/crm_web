import React, {useState} from 'react'
import 'Styles/Global/Form/Input.scss'

const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w]{2,6}$/

const Input = ({id, type, label, value, errorMessage, required, ...other}) => {
    const [active, setActive] = useState(false)
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const checkField = (e) => {
        if(e.target.value === '') {
            setActive(false)
        } else {
            setActive(true)
        }

        switch (type) {
            case 'password':
                if(e.target.value.length < 8 && e.target.value.length > 0) {
                    setError(true)
                    setErrMsg(errorMessage || 'Min length 8 characters')
                }
                break
            case 'email':
                if(!EMAIL_REGEX.test(e.target.value) && e.target.value.length > 0) {
                    setError(true)
                    setErrMsg(errorMessage || 'Invalid email address')
                }
                break
            default :
                if(required && e.target.value.length < 1) {
                    setError(true)
                    setErrMsg(errorMessage || 'Field is required')
                }
        }
    }

    const textAreaInput = (e) => {
        setError(false)
        e.target.style.height ='30px'
        if(e.target.scrollHeight < 30) {
            e.target.style.height ='30px'
        } else {
            e.target.style.height = (e.target.scrollHeight)+"px";
        }
    }

    return (
        <div className="input_field">
            {type === 'textarea' ?
                <textarea {...other} onInput={textAreaInput} className={error ? 'error' : ''} id={id} onBlur={checkField} value={value} data-required={required ? 'true' : 'false'} rows="1"/>
                :
                <input {...other} onInput={() => setError(false)} className={error ? 'error' : ''} id={id} type={type} onBlur={checkField} value={value} data-required={required ? 'true' : 'false'}/>
            }
            <label htmlFor={id} className={active ? 'active' : ''}>{label}</label>
            {error ? <span className="err_msg">{errMsg}</span> : ''}
        </div>
    )
}

export default Input
