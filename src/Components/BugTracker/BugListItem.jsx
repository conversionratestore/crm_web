import React from 'react'
import style from 'Styles/BugTracker/BugListItem.module.scss'
import { Link } from 'react-router-dom'


const BugListItem = ({data}) => {
    return (
        <li className={data.priority.toLowerCase() + ' ' + style.listItem}>
            <p><Link to={'/bug-tracker/'+data.id}>{data.test_name}</Link></p>
            <p>{data.client}</p>
            <p>{data.priority}</p>
            <p>{data.status}</p>
            <p>text</p>
            <p>{data.tester_name} {data.tester_surname}</p>
            <p>text</p>
        </li>
    )
}

export default BugListItem
