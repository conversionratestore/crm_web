import React from 'react'
import {useGetClientsQuery} from "redux/Api/dashboardApi"
import Loader from "Components/Global/Loader"


const Dashboard = () => {
    const {data, isLoading} = useGetClientsQuery( {} ,{
        refetchOnMountOrArgChange: true
    })

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="block clients_list">
                { isLoading ? <Loader /> : data.map((item) => <li key={item.name}>{item.name}</li>)}
            </div>
        </div>
    )
}

export default Dashboard
