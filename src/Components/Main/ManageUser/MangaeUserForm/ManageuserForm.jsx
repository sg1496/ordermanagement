import React, { useEffect, useState } from 'react';
import "./ManageuserForm.scss";
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { fetchAllDataUsers, fetchSaveUpdateDataUser, fetchSingleEditDataUser, resetStates } from '../../../../Store/Slice/ManageUsers';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLoginDataRolepage } from '../../../../Store/Slice/ManageRoleSlices';
import verifyToken from '../../../SignIn/verifyToken';

const ManageuserForm = ({ setAlert }) => {
    const dispatch = useDispatch();
    dispatch(navTitle("Manage User"));
    const navigate = useNavigate()
    const edit = useParams()
    const loginToken = verifyToken()

    const [checkPass, setcheckPass] = useState(true)
    const [manageUser, setManageUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        mobileNo: "",
        roleId: "",
        // userTypeID: 1,
        franchiseId: "",
        confirmPassword: "",
        passKey: "",
        parentUserId: ""
    })
    const singleDataManageUser = useSelector((manageUser) => manageUser.ManageUserSlices.singleData)
    const roleData = useSelector((role) => role.ManageRoleSlices.loginData)

    useEffect(() => {
        dispatch(fetchLoginDataRolepage(loginToken.userID))
    }, [])

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
            roleId: singleDataManageUser.roleId,
            mobileNo: singleDataManageUser.mobileNo,
        })
        if (!edit.id) {
            setManageUser({
                email: "",
                firstName: '',
                lastName: "",
                mobileNo: "",
                roleId: "",
                userTypeID: "",
                franchiseId: "",
                passKey: "",
                confirmPassword: ""
            })
        }
    }, [singleDataManageUser])


    const changeHandler = (e) => {
        setManageUser({
            ...manageUser,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const blurHandler = () => {
            if (manageUser.passKey && manageUser.confirmPassword) {
                if (manageUser.passKey   === manageUser.confirmPassword) {
                    setcheckPass(false);
                } else {
                    setcheckPass(true);
                }
            } else {
                setcheckPass(false); 
            }
        };
    
        blurHandler();
    }, [manageUser.passKey, manageUser.confirmPassword]);

    const parentUserIDHandler = (loginTokenValue) => {

        let parentUserIdCheck = 0
        if (loginTokenValue == 0) {
            return parentUserIdCheck = 1;
        } else if (loginTokenValue == 1) {
            parentUserIdCheck = 2;
        } else if (loginTokenValue == 2) {
            parentUserIdCheck = 3;
        } else if (loginTokenValue == 3) {
            parentUserIdCheck = 4;
        }
        return parentUserIdCheck;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let parentUserIdCheck = parentUserIDHandler(loginToken.parentUserId);
        let manageUserdata;
        if (checkPass) {
            if (Object.keys(edit).length < 1) {
                manageUserdata = {
                    ...manageUser,
                    roleId: parseInt(manageUser.roleId),
                    franchiseId: parseInt(loginToken.userID),
                    parentUserId: parentUserIdCheck,
                };
            } else {
                manageUserdata = {
                    ...manageUser,
                    userId: parseInt(edit.id),
                    roleId: parseInt(manageUser.roleId),
                    franchiseId: parseInt(loginToken.userID),
                    parentUserId: parentUserIdCheck,
                };
            }

            const response = await dispatch(fetchSaveUpdateDataUser(manageUserdata));
            if (response.payload.status === 200) {
                dispatch(resetStates());
                navigate(`/dashboard/managetable`);
                setManageUser({
                    email: "",
                    userName: "",
                    firstName: "",
                    lastName: "",
                    mobileNo: "",
                    confirmPassword: "",
                    passKey: "",
                });
            } else {
                setAlert({ type: "error", message: response.payload.message });
                setManageUser({
                    ...manageUser,
                    passKey: "",
                    confirmPassword: "",
                });
            }
        } else {
            setManageUser({
                ...manageUser,
                passKey: "",
                confirmPassword: "",
            });
        }

    };

    const cancelHandler = () => {
        navigate(`/dashboard/managetable`)
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

    const { email, firstName, lastName, mobileNo, roleId, passKey, confirmPassword } = manageUser

    return (
        <>
            {checkPass && <div style={{ backgroundColor: '#d32f2f96', color: 'white', padding: "10px", fontSize: "20px" }}>password and confirm password in not match</div>}
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
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Manage Role:
                                <span className="formRequired">*</span>
                            </label>
                            <select className="form-select "
                                id="taxClass"
                                name='roleId'
                                value={roleId}
                                onChange={(e) => changeHandler(e)}
                            >
                                <option defaultValue>Select Role</option>
                                {roleData?.map(item => {
                                    return <option
                                        key={item.roleID}
                                        value={item.roleID}>
                                        {item.roleName}
                                    </option>

                                })}
                            </select>
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



                    </div>

                    <div className=" addProduct__basicForm d-flex mb-5">
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
                            // onBlur={(e) => blurHandler(e.target.value)}
                            // required
                            />
                        </div>
                    </div>

                    <div>

                        <Buttons fname={!edit.id ? "Save": "Update"}
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


