import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {useGetBugsQuery} from "redux/Api/bugTrackerApi"
import BugListItem from "Components/BugTracker/BugListItem"
import Loader from "Components/Global/Loader"
import 'Styles/Pages/BugTracker.scss'
import {setParams} from "../redux/Slices/configSlice"
import {useDispatch} from "react-redux"


const BugTracker = () => {
    const dispatch = useDispatch()
    const [reportStatus, setReportStatus] = useState('new')
    const {data, isFetching, error} = useGetBugsQuery(reportStatus ,{
        refetchOnMountOrArgChange: true
    })

    if(error) {
        dispatch(setParams({status: 'error', message: error.error}))
    }

    const tabClick = (e) => {
        e.target.closest('.tabs').querySelector('.active').classList.remove('active')
        e.target.classList.add('active')
        setReportStatus(e.target.innerText)
    }
    return (
        <>
            <h1>Bug Tracker</h1>
            <div>
                <div className="flx">
                    <ul className="tabs flx">
                        <li className="active" onClick={tabClick}>New</li>
                        <li onClick={tabClick}>In progress</li>
                        <li onClick={tabClick}>Recheck</li>
                    </ul>
                    <div className="new_bug">
                        <Link className="btn" to="/bug-tracker/new">+ Add New</Link>
                    </div>
                </div>
                <div className="block bug_list">
                <div className="flx title">
                    <p>Test</p>
                    <p>Client</p>
                    <p>Priority</p>
                    <p>Status</p>
                    <p>Developer</p>
                    <p>Tester</p>
                    <p>Deadline</p>
                </div>
                <ul>
                    {isFetching ? <Loader /> : data?.map((item) => <BugListItem key={item.id} data={item} />)}
                </ul>
                </div>
            </div>
        </>
    )
}

export default BugTracker
