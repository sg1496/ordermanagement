import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import verifyToken from './Components/SignIn/verifyToken';


const ProtectedRoute = () => {
    const loginToken = verifyToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginToken) {
            navigate(`/login`)
        }
    }, [loginToken])

    return <Outlet/>
}

export default ProtectedRoute