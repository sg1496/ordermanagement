import React, { useEffect, useState } from 'react'
import './ManageRoleForm.scss'
import ManageRoleTable from './ManageRoleTable';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
// import { fetchParentCategory } from '../../../../Store/Slice/CategorySlices';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSaveUpdateDataRole, fetchSingleEditDataRole,resetStates  } from '../../../../Store/Slice/ManageRoleSlices';
import verifyToken from '../../../SignIn/verifyToken';

const ManageRoleForm = (props) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(navTitle("Manage Role Form"));
    const edit = useParams();
    const loginToken = verifyToken()
 
    const loginUser = useSelector(login=>login.LoginSlices.data)
    // console.log(" first ddddddddddddddddddta", loginUser)
 
    const [manageRoleData, setManageRoleData] = useState({
        roleName: "",
        roleLevel: "",
        franchiseId:"",
        isAdmin:false,
        multiList: [],
    })

    // const parentCategory = useSelector((parent) => parent.categorySlices.parentCategories)
    const manageRoleSingleData = useSelector((roleSingleData) => roleSingleData.ManageRoleSlices.singleData)
    // console.log("firstddddddddddddddddddddddddddddddddddddmmmm", manageRoleSingleData)

    // useEffect(() => {
    //     dispatch(fetchParentCategory(loginToken.userID))

    // }, [])

    useEffect(() => {
        if (edit.id != undefined) {
            dispatch(fetchSingleEditDataRole(edit.id))
        }

    }, [edit])

    useEffect(() => {
        !manageRoleSingleData ? setManageRoleData({
            ...manageRoleData
        }) : setManageRoleData({
            roleName: manageRoleSingleData.roleSingleList[0].roleName,
            roleLevel: manageRoleSingleData.roleSingleList[0].roleLevel,
            isAdmin:  manageRoleSingleData.roleSingleList[0].isAdmin,
            multiList:  manageRoleSingleData.multiList,
        })
        if (!edit.id) {
            setManageRoleData({
                roleName: "",
                roleLevel: "",
                isAdmin: false,
                multiList:[]
            })
        }
    }, [manageRoleSingleData])


// console.log("check the state code in role function", manageRoleData )


    const changeHandler = (e) => {
        setManageRoleData({
            ...manageRoleData,
            [e.target.name]: e.target.value
        })
    }

    const isAdminAllowedHandler = () => {
        setManageRoleData({ ...manageRoleData, isAdmin: !manageRoleData.isAdmin })
    }

    const manageRoleSendHandler =(data)=>{ 
        // console.log( "dddddddddddddata role", data)
        const datahandel =[]
        data?.map((item)=> { 
            datahandel.push(item.select)
        })
        setManageRoleData({ ...manageRoleData, multiList: datahandel })
    }

// -----------------------------------------------------Submit---------------------------------------------------------------

    const onSubmit = (e) => {
        e.preventDefault()                  
        
        let roleData;
        if (Object.keys(edit).length < 1) {
            roleData = {
                ...manageRoleData,
                isAdmin: Number(manageRoleData.isAdmin),
                franchiseId:loginUser?.userDetails?.userID || loginToken.userID,
                parentUserId: loginToken.parentUserId,
            }
        }
        else {
            roleData = {
                ...manageRoleData,
                roleID: parseInt(edit.id),
                isAdmin: Number(manageRoleData.isAdmin),
                franchiseId:loginUser?.userDetails?.userID || loginToken.userID,
                parentUserId:loginToken.parentUserId,
            }
        }
        // console.log("ssssset data", roleData)
        dispatch(fetchSaveUpdateDataRole(roleData))
        dispatch(resetStates())
        Navigate(`/manageRoleTable`)
    }

    const cancelHandler = () => {
        Navigate(`/manageRoleTable`)
    }


    const { roleName, roleLevel } = manageRoleData

    return (
        <>
            <div className="addProduct__basicTabs">
                <form onSubmit={onSubmit}>

                    <div className="addProduct__basic   d-flex">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Role Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='roleName'
                                value={roleName}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Role Level:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Level"
                                name='roleLevel'
                                value={roleLevel}
                                onChange={changeHandler}
                                required
                            />
                        </div>

                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Is Admin: *
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                                checked={manageRoleData.isAdmin}
                                onChange={isAdminAllowedHandler}
                            />
                        </div>

                    </div>
                    <ManageRoleTable                    
                        manageRoleSendHandler={manageRoleSendHandler}
                        passManangeRoleData={manageRoleData}
                    />
                    <div>

                        <Buttons fname="Save"
                            Sname="Cancel"
                            cancelHandler={cancelHandler}
                        />

                    </div>
                </form>
            </div>
        </>
    )
}
export default ManageRoleForm;