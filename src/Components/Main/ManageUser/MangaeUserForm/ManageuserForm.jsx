import React, { useEffect, useState } from 'react';
import "./ManageuserForm.scss";
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { fetchAllDataUsers,fetchSaveUpdateDataUser, fetchSingleEditDataUser, resetStates } from '../../../../Store/Slice/ManageUsers';
import { useNavigate, useParams } from 'react-router-dom';

const ManageuserForm = () => {
    const dispatch = useDispatch();
    dispatch(navTitle("Manage User"));
    const navigate = useNavigate()
    const edit = useParams()


    const [checkPass, setcheckPass] = useState(true)
    const [manageUser, setManageUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        mobileNo: "",
        // userTypeID: 1,
        // loginUserID: 5,
        confirmPassword: "",
        passKey: ""
    })

    const singleDataManageUser = useSelector((manageUser) => manageUser.ManageUserSlices.singleData)
    

    useEffect(() => {
        if (edit.id !== undefined) {
            dispatch(fetchSingleEditDataUser(edit.id))
        }
    }, [edit])

    useEffect(() => {
        !singleDataManageUser ? setManageUser({
            ...manageUser
        }) : setManageUser({
            email: singleDataManageUser.email,
            firstName: singleDataManageUser.firstName,
            lastName: singleDataManageUser.lastName,
            mobileNo: singleDataManageUser.mobileNo,          
        })
        if (!edit.id) {
            setManageUser({
                email: "",
                firstName: '',
                lastName: "",
                mobileNo: "",
                userTypeID: "",
                loginUserID: "",
            })
        }
    }, [singleDataManageUser])


    const changeHandler = (e) => {
        setManageUser({
            ...manageUser,
            [e.target.name]: e.target.value
        })
    }

    const blurHandler = (confirmPassword) => {
        if (manageUser.passKey === confirmPassword) {
            setcheckPass(true)
        } else {
            setcheckPass(false)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        let manageUserdata
        if (checkPass) {    
            if (Object.keys(edit).length < 1) {
                manageUserdata = {
                    ...manageUser,
                    userName: manageUser.email,
                }
            }else{
                manageUserdata = {
                    ...manageUser,
                    userId: parseInt(edit.id)
                    
                }
            }
            
        } else {
            setManageUser({
                ...manageUser,
                passKey: "",
                confirmPassword: "",
            })
        }
        dispatch(fetchSaveUpdateDataUser(manageUserdata))
        dispatch(resetStates())
        navigate(`/managetable`)
        setManageUser({
            ...manageUser,
            email: "",
            userName: "",
            firstName: "",
            lastName: "",
            mobileNo: "",            
            confirmPassword: "",
            passKey: ""
        })
    }

    const cancelHandler = () => {
        navigate(`/managetable`)
        setManageUser({
            ...manageUser,
            email: "",
            userName: "",
            firstName: "",
            lastName: "",
            mobileNo: "",
            
            confirmPassword: "",
            passKey: ""
        })
    }

    const { email, firstName, lastName, mobileNo, passKey, confirmPassword } = manageUser

    return (
        <>
            {!checkPass && <div style={{ backgroundColor: 'red', color: 'white', padding: "25px", fontSize: "20px" }}>password and confirm password in not match</div>}
            <div className="addProduct__basicTabs  ">
                <form onSubmit={onSubmit}>

                    <div className=" addProduct__basicForm d-flex mb-3">
                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Email:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="email"
                                id="product-name"
                                className="form-control"
                                placeholder="Abcd@email.com"
                                name='email'
                                value={email}
                                onChange={(e) => changeHandler(e)}

                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                First Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="First Name"
                                name='firstName'
                                value={firstName}
                                onChange={(e) => changeHandler(e)}
                                required

                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Last Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Last name"
                                name='lastName'
                                value={lastName}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                    </div>
                    <div className=" addProduct__basicForm d-flex mb-3">
                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Contact Number:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="90512xxxxx"
                                name='mobileNo'
                                value={mobileNo}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                Passward:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="password"
                                id="product-name"
                                className="form-control"
                                placeholder="passward"
                                name='passKey'
                                value={passKey}
                                onChange={(e) => changeHandler(e)}
                            // required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Confirm Passward:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="password"
                                id="product-name"
                                className="form-control"
                                placeholder="Passward"
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => changeHandler(e)}
                                onBlur={(e) => blurHandler(e.target.value)}
                            // required
                            />
                        </div>

                    </div>

                    <div>

                        <Buttons fname="Save"
                            Sname="Cancel"
                            cancelHandler={cancelHandler}
                        />
                    </div>




                </form >
            </div >
        </>
    )
}
export default ManageuserForm;


