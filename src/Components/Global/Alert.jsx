import React, {useEffect, useState} from 'react'
import alert from 'Styles/Global/Alert.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {setParams} from "redux/Slices/configSlice"


const Alert = () => {
    const dispatch = useDispatch()
    const {message, status} = useSelector(state => state.config)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if(status) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
                dispatch(setParams({message: null, status: null}))
            }, 4000)
        }
    }, [message, status, dispatch])

    const alertClose = () => {
        setShow(false)
        dispatch(setParams({message: null, status: null}))
    }

    return ( show ?
        <div className={alert.alert} data-status={status} >
            <span>{message}</span>
            <span className={alert.close} onClick={alertClose}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/>
                </svg>
            </span>
            <span className={alert.loader}></span>
        </div> : ''
    )
}

export default Alert
