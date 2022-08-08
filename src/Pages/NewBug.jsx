import React, {useRef, useState} from 'react'
import Input from "Components/Global/Form/Input"
import 'Styles/Pages/NewBug.scss'
import {useDispatch, useSelector} from 'react-redux'
import {setParams} from 'redux/Slices/configSlice'
import {useCreateBugMutation} from 'redux/Api/bugTrackerApi'
import {useCheckForm} from 'Hooks/useCheckForm'
import Select from "Components/Global/Form/Select"
import {useGetClientsQuery} from "redux/Api/dashboardApi"

const NewBug = () => {
    const {data, isFetching} = useGetClientsQuery()
    const dispatch = useDispatch()
    const formBugReport = useRef()
    const {id} = useSelector(state => state.auth)
    const [createBug] = useCreateBugMutation()

    const createReport = async (e) => {
        let form = true
        e.preventDefault()
        const data = {}
        formBugReport.current.querySelectorAll('[data-required="true"]').forEach(item => {
            if(item.value.length === 0) {
                form = false
            }
        })
        if(form) {
            formBugReport.current.querySelectorAll('input, textarea').forEach(item => {
                if(item.dataset.value) {
                    data[item.id] = item.dataset.value
                } else {
                    data[item.id] = item.value
                }
            })
            data.created_by = id
            try {
                const result = await createBug(data).unwrap()
                dispatch(setParams(result))
            } catch (err) {
                dispatch(setParams({status: 'error', message: err.data.message || err.error}))
            }
        } else {
            dispatch(setParams({status: 'error', message: 'Fill in all fields'}))
        }


    }

    return (
        <>
            <h1>Create bug report</h1>
            <div className="block">

                <form ref={formBugReport} onSubmit={createReport} className="new_bug_report">
                    <Input type="text" id="test_name" label="Test name" required={true}/>
                    <Select id="client_id" label="Client" required={true}>
                        {isFetching ? <option value="null">No data</option>:
                        data?.map(item => <option key={item.id} value={item.id}>{item.name}</option>) }
                    </Select>
                    <Input type="textarea" id="summary" label="Summary" required={true}/>
                    <Select id="priority" label="Priority" required={true}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </Select>
                    <Select id="device" label="Device type" required={true}>
                        <option value="Desktop">Desktop</option>
                        <option value="Mobile">Mobile</option>
                    </Select>
                    <Select id="os" label="OS" required={true}>
                        <option value="Android">Android</option>
                        <option value="IOS">IOS</option>
                        <option value="Windows">Windows</option>
                        <option value="MacOS">MacOS</option>
                    </Select>
                    <Select id="browser" label="Browser" required={true}>
                        <option value="Chrome">Chrome</option>
                        <option value="Safari">Safari</option>
                        <option value="Firefox">Firefox</option>
                    </Select>
                    <Input type="textarea" id="steps" label="Steps to reproduce" />
                    <Input type="textarea" id="actual_result" label="Actual result" />
                    <Input type="textarea" id="expected_result" label="Expected result" />
                    <Input type="textarea" id="links" label="Links to ads" />
                    <button className="btn" type="submit">Create</button>
                </form>
            </div>
        </>
    )
}

export default NewBug
