import React from "react"
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Layout from 'Components/Global/Layout'
import Login from 'Pages/Login'
import Register from "Pages/Register"
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import NotFound from "./Pages/NotFound"
import { CheckAuth } from "./Hoc/CheckAuth"
import BugTracker from "./Pages/BugTracker"
import Profile from "./Pages/Profile"
import {CheckAdmin} from "./Hoc/CheckAdmin"
import Admin from "./Pages/Admin"
import NewBug from "./Pages/NewBug"


function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={ <Home />} />
                <Route path="login" element={ <Login />} />
                <Route path="sign-up" element={ <Register />} />
                <Route element={ <CheckAuth /> }>
                    <Route path="dashboard" element={ <Dashboard /> } />
                    <Route path="bug-tracker" element={ <BugTracker /> } />
                    <Route path="profile" element={ <Profile /> } />
                    <Route path="bug-tracker/new" element={ <NewBug /> } />
                </Route>
                <Route element={ <CheckAdmin /> }>
                    <Route path="admin-panel" element={ <Admin /> } />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
      </>
  )
}

export default App
