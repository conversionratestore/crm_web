import React from 'react'
import {useGetClientsQuery} from "redux/Api/dashboardApi"
import Loader from "Components/Global/Loader"
import {useDispatch} from "react-redux"
import {setParams} from "../redux/Slices/configSlice"


const Dashboard = () => {
    const dispatch = useDispatch()
    const {data, isLoading, error} = useGetClientsQuery({}, {
        refetchOnMountOrArgChange: true
    })

    if(error) {
        dispatch(setParams({status: 'error', message: error.error}))
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="block clients_list">
                { isLoading ? <Loader /> : data?.map((item) => <li key={item.name}>{item.name}</li>)}
            </div>
        </div>
    )
}

export default Dashboard
