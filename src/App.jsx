import { Routes, Route } from 'react-router-dom'
import './App.css';
import Layout from 'Components/Layout'
import Login from 'Pages/Login'
import Register from "Pages/Register";
import React from "react";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import { CheckAuth } from "./Hoc/CheckAuth";
import BugTracker from "./Pages/BugTracker";

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
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
      </>
  );
}

export default App;
