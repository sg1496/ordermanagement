import React, { useEffect } from 'react';
import './ManageRoleTable.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDataRolepage } from '../../../../Store/Slice/ManageRoleSlices';
import { useState } from 'react';
import { useParams } from 'react-router-dom';



const ManageRoleTable = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const managePageRole = useSelector((manageRole) => manageRole.ManageRoleSlices.pageData)
    const [manageRoleData, setManageRoleData] = useState([])

    useEffect(() => {
        dispatch(fetchAllDataRolepage())
    }, [])


    useEffect(() => {
        const finalRole = []
        if (managePageRole && props.passManangeRoleData.multiList.length > 0) {
            managePageRole.map((item) => {
                props.passManangeRoleData.multiList.filter((select) => {
                    if (item.pageID === select.pageID) {
                        const newItem = { ...item, select }
                        finalRole.push(newItem)
                    }
                })
            })
            setManageRoleData(finalRole)
        } else if (managePageRole) {
            const managekeyEdit = JSON.parse(JSON.stringify(managePageRole));
            managekeyEdit.map((item) => {
                item.isView = 0;
                item.isEdit = 0;
                item.isDeleted = 0;
                item.allselectView = 0;
                item.allselectedit = 0;
                item.allselectdel = 0;

                const newItem = { ...item, select: { pageID: item.pageID, isView: item.isView, isEdit: item.isEdit, isDeleted: item.isDeleted } }
                finalRole.push(newItem)
            })
            setManageRoleData(finalRole)
        }
    }, [managePageRole, props.passManangeRoleData])

    const toppingNameChangeHandler = (e, id, item) => {
        var newArr

        if (e.target.name === "allselectView" || e.target.name === "allselectedit" || e.target.name === "allselectdel") {
            newArr = manageRoleData.map((item) => {

                return {
                    ...item,
                    select: {
                        pageID: item.pageID,
                        manageRolePrivilegeID: item.select.manageRolePrivilegeID,
                        isView: e.target.name === 'allselectView' ? Number(e.target.checked) : item.select.isView,
                        isEdit: e.target.name === 'allselectedit' ? Number(e.target.checked) : item.select.isEdit,
                        isDeleted: e.target.name === 'allselectdel' ? Number(e.target.checked) : item.select.isDeleted,

                    }
                };

            })

        } else {
            newArr = manageRoleData.map((item) => {
                if (item.pageID == id) {
                    return {
                        ...item,
                        select: {
                            pageID: item.pageID,
                            manageRolePrivilegeID: id ? item.select.manageRolePrivilegeID : 0,
                            isView: e.target.name === 'isView' ? Number(e.target.checked) : item.select.isView,
                            isEdit: e.target.name === 'isEdit' ? Number(e.target.checked) : item.select.isEdit,
                            isDeleted: e.target.name === 'isDeleted' ? Number(e.target.checked) : item.select.isDeleted,

                        }
                    };
                }
                else {
                    return item;
                }
            })
        }
        setManageRoleData(newArr)
        props.manageRoleSendHandler(newArr)
    }




    return (
        <>
            <div className='productSection__table mt-5'>
                <table className='table m-0'>
                    <thead className='text-center'>
                        <tr>
                            <th scope="col" style={{ width: "25%" }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>Page Name</div>
                                    <div className=" form-check form-switchs pt-1 ms-4 abc" >
                                    </div>
                                </div>
                            </th>
                            <th scope="col" style={{ width: "25%" }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>Is View</div>
                                    <div className=" form-check form-switchs pt-1 ms-4 abc" >
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            className="form-check-input p-2 toggle_btn"
                                            name='allselectView'
                                            checked={manageRoleData?.filter(item => item.select.isView !== 1).length < 1}
                                            onChange={(e) => toppingNameChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </th>
                            <th scope="col" style={{ width: "25%" }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>Is Edit</div>
                                    <div className=" form-check form-switchs pt-1 ms-4 abc" >
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            className="form-check-input p-2 toggle_btn"
                                            name='allselectedit'
                                            checked={manageRoleData?.filter(item => item.select.isEdit !== 1).length < 1}
                                            onChange={(e) => toppingNameChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </th>
                            <th scope="col" style={{ width: "25%" }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>Is Deleted</div>
                                    <div className=" form-check form-switchs pt-1 ms-4 abc" >
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            className="form-check-input p-2 toggle_btn"
                                            name='allselectdel'
                                            checked={manageRoleData?.filter(item => item.select.isDeleted !== 1).length < 1}
                                            onChange={(e) => toppingNameChangeHandler(e)}
                                        />
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            manageRoleData?.map((item, index) => {
                                return <tr key={index}>
                                    <td scope="row" >{item.pageName}</td>
                                    <td className='text-center'>
                                        <div className=" form-check form-switchs pt-1 ms-4 abc" >
                                            <input
                                                type="checkbox"
                                                id="isActive"
                                                className="form-check-input p-2 toggle_btn"
                                                name="isView"
                                                checked={item.select.isView}
                                                onChange={(e) => toppingNameChangeHandler(e, item.pageID, item)}
                                            />
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <div className=" form-check form-switchs pt-1 ms-4 abc" >
                                            <input
                                                type="checkbox"
                                                id="isActive"
                                                className="form-check-input p-2 toggle_btn"
                                                name="isEdit"
                                                checked={item.select.isEdit}
                                                onChange={(e) => toppingNameChangeHandler(e, item.pageID, item)}
                                            />
                                        </div>
                                    </td>

                                    <td className='text-center'>
                                        <div className=" form-check form-switchs pt-1 ms-4 abc" >
                                            <input
                                                type="checkbox"
                                                id="isActive"
                                                className="form-check-input p-2 toggle_btn"
                                                name="isDeleted"
                                                checked={item.select.isDeleted}
                                                onChange={(e) => toppingNameChangeHandler(e, item.pageID, item)}
                                            />
                                        </div>
                                    </td>

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ManageRoleTable;


