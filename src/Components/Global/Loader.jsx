import React from 'react'
import loader from 'Styles/Global/Loader.module.scss'

const Loader = ({height = '50px'}) => {
    return (
        <div className={loader.center} style={{height: height}}>
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
            <div className={loader.wave} />
        </div>
    )
}

export default Loader
