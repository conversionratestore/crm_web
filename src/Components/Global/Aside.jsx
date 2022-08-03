import React, { useState } from 'react'
import {NavLink, Link} from "react-router-dom"
import 'Styles/Global/Aside.scss'
import SpriteSvg from "./SpriteSvg"
import {useDispatch} from "react-redux"
import {setOverlay} from "redux/Slices/configSlice"

const Aside = () => {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)

    const activeAside = () => {
        if(active) {
            dispatch(setOverlay(''))
        } else {
            dispatch(setOverlay('mid'))
        }
        setActive(!active)
    }

    return (
        <aside className={active ? 'active' : ''}>
            <ul>
                <li><Link to='/' className="logo"><SpriteSvg id='logo_cart'/><span className="text"><SpriteSvg id='logo_text'/></span></Link></li>
                <li><NavLink to='/dashboard'><SpriteSvg  id='dashboard'/><span>Dashboard</span></NavLink></li>
                <li><NavLink to='/bug-tracker'><SpriteSvg id="bug"/><span>Bug Tracker</span></NavLink></li>
                <li><NavLink to='/profile'><SpriteSvg id='profile'/><span>Profile</span></NavLink></li>
                <li><NavLink to='/admin-panel'><SpriteSvg id='admin'/><span>Admin</span></NavLink></li>
                <li className="arrow" onClick={() => {activeAside()}}><SpriteSvg color="#ffffff" id='arrow_aside'/></li>
            </ul>
        </aside>
    )
}

export default Aside
