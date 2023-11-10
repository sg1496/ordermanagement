import React, { useEffect, useState } from 'react'
import './ManageRoleForm.scss'
import ManageRoleTable from './ManageRoleTable';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { fetchParentCategory } from '../../../../Store/Slice/CategorySlices';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSaveUpdateDataRole, fetchSingleEditDataRole,resetStates  } from '../../../../Store/Slice/ManageRoleSlices';



const ManageRoleForm = (props) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(navTitle("Manage Role"));
    const edit = useParams();


    const [manageRoleData, setManageRoleData] = useState({
        roleName: "",
        parentCategoryID: "",
        isAdmin:false,
        multiList: [
          
        ]
    })

    const parentCategory = useSelector((parent) => parent.categorySlices.parentCategories)
    const manageRoleSingleData = useSelector((roleSingleData) => roleSingleData.ManageRoleSlices.singleData)
    // console.log("firstddddddddddddddddddddddddddddddddddddmmmm", manageRoleSingleData)

    useEffect(() => {
        dispatch(fetchParentCategory())

    }, [])

    useEffect(() => {
        if (edit.id != undefined) {
            dispatch(fetchSingleEditDataRole(edit.id))
        }

    }, [edit])

    useEffect(() => {
        !manageRoleSingleData ? setManageRoleData({
            ...manageRoleData
        }) : setManageRoleData({
            roleName: manageRoleSingleData.roleName,
            parentCategoryID: manageRoleSingleData.parentCategoryID,
            isAdmin: manageRoleData.isAdmin,
            multiList: [{
                manageRolePrivilegeID: 5,
                pageID: 1,
                isView: true,
                isEdit: true,
                isDeleted: true
            },
            {
                manageRolePrivilegeID: 6,
                pageID: 2,
                isView: false,
                isEdit: true,
                isDeleted: true
            },
            {
                manageRolePrivilegeID: 7,
                pageID: 3,
                isView: false,
                isEdit: true,
                isDeleted: false
            },
            {
                manageRolePrivilegeID: 8,
                pageID: 4,
                isView: true,
                isEdit: false,
                isDeleted: false
            }
            ]
        })
        if (!edit.id) {
            setManageRoleData({
                roleName: "",
                parentCategoryID: "",
                isAdmin: false
            })
        }
    }, [manageRoleSingleData])





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
        const datahandel =[]
        data?.map((item)=> {
            datahandel.push(item.select)
        })
        setManageRoleData({ ...manageRoleData, multiList: datahandel })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        let roleData;
        if (Object.keys(edit).length < 1) {
            roleData = {
                ...manageRoleData,
                parentCategoryID: parseInt(manageRoleData.parentCategoryID),
                isAdmin: Number(manageRoleData.isAdmin)
            }
        }
        else {
            roleData = {
                ...manageRoleData,
                roleID: parseInt(edit.id),
                parentCategoryID: parseInt(manageRoleData.parentCategoryID),
                isAdmin: Number(manageRoleData.isAdmin)
            }
        }
        console.log("ssssset data", roleData)
        // dispatch(fetchSaveUpdateDataRole(roleData))
        // dispatch(resetStates())
        Navigate(`/manageRoleTable`)
    }

    const cancelHandler = () => {
        Navigate(`/manageRoleTable`)
    }


    const { roleName, parentCategoryID } = manageRoleData

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
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Role Level:
                                <span className="formRequired">*</span>
                            </label>
                            <select
                                className="form-select "
                                id="taxClass"
                                name='parentCategoryID'
                                value={parentCategoryID}
                                onChange={changeHandler}
                            >
                                <option defaultValue>Select Category</option>
                                {parentCategory?.map((item, ind) => {
                                    return <option key={ind}
                                        value={item.parentCategoryId}>{item.parentCategoryName}</option>
                                })
                                }
                            </select>
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
                        passManangeRoleData={manageRoleData}
                        manageRoleSendHandler={manageRoleSendHandler}
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