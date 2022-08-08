import React, {useState} from 'react'
import 'Styles/Global/Form/Select.scss'

const Select = ({children, id, label, required, errorMessage}) => {
    let initValue = ''
    let initInput = ''
    if(!children.length) {
        children = [children]
    }
    children.forEach(item => {
        if (item.props.selected) {
            initValue = item.props.value
            initInput = item.props.children
        }
    })
    const [value, setValue] = useState(initValue)
    const [input, setInput] = useState(initInput)
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')



    const handleSelect = (e) => {
        const value = e.target.dataset.value
        const input = e.target.innerText
        setValue(value)
        setInput(input)
        e.target.closest('ul').querySelector('.selected')?.classList.remove('selected')
        e.target.classList.add('selected')
    }

    const checkSelect = (e) => {
        setTimeout( () => {
                if (required && e.target.value.length < 1) {
                    setError(true)
                    setErrMsg(errorMessage || 'Field is required')
                } else {
                    setError(false)
                    setErrMsg('')
                }
            }, 100)
    }

    return (
        <div className="input_field select_type">
            <div className="select_wrapper">
                <input className={error ? 'error' : ''} id={id} type="text" readOnly placeholder="Choice the option" data-value={value} value={input} onBlur={checkSelect} data-required={required? 'true' : 'false'}/>
                <label className="active" htmlFor={id}>{label}</label>
                <ul>
                    {children.map(li => <li className={li.props.selected ? 'selected' : ''} key={li.props.value} data-value={li.props.value} onClick={handleSelect}>{li.props.children}</li>)}
                </ul>
            </div>
            {error ? <span className="err_msg">{errMsg}</span> : ''}
        </div>
    )
}

export default Select
