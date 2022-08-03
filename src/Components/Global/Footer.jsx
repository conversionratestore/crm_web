import React, {useEffect, useState} from 'react'
import 'Styles/Global/Footer.scss'
import Alert from "./Alert"
import { useSelector } from "react-redux"

const Footer = () => {
    const {overlayPos} = useSelector(state => state.config)
    const [overlay, setOverlay] = useState(false)
    useEffect(() => {
        if(overlayPos !== '') {
            setOverlay(true)
        } else {
            setTimeout(()=> {
                setOverlay(false)
            },500)
        }
    }, [overlayPos])

    return (
        <>
        <footer>
            <p className="content">
                <span>CRM_CRS</span>
                <span>2022</span>
            </p>
        </footer>
        <Alert />
            {overlay ? <div className="overlay" data-pos={overlayPos}/> : ''}
        </>
    )
}

export default Footer
