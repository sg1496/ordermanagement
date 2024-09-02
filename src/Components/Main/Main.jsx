import React, { useEffect } from 'react';
import "./Main.scss"
import { Outlet, useNavigate } from 'react-router-dom';
import Heading from './Heading/Heading';
import Navbar from '../Navbar/Navbar';
import verifyToken from '../SignIn/verifyToken';

function Main() {
    const loginToken = verifyToken()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!loginToken) {
    //         navigate('/login')
    //     }
    // }, [loginToken])

    return (
        <>
            <Navbar />
            <div className='mainSection'>
                <Heading />
                <div className="mainInner m-3">
                    <div className="mainIneerSection m-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
