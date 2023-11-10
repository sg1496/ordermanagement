import React, { useEffect } from 'react';

import images from "../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllDataRole, fetchDelDataRole, fetchSingleEditDataRole,resetStates } from '../../../../Store/Slice/ManageRoleSlices';

const ManageRoleDataTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const manageRoleData = useSelector((manageRole) => manageRole.ManageRoleSlices.data);
    const manageRoleMessage = useSelector((manageRole) => manageRole.ManageRoleSlices.message);

    console.log("save/edit", manageRoleData, manageRoleMessage)


    useEffect(() => {
        dispatch(fetchAllDataRole())
    }, [manageRoleMessage])

    // console.log("first", manageUserData)

    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead >
                        <tr>
                            <th scope="col" style={{ width: "50%", textAlign: 'left' }}>User Email</th>
                            <th scope="col" style={{ width: "50%", textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manageRoleData?.map((item, index) => {
                            return <tr key={index}>
                                <td scope="row" >{item.roleName}</td>
                                <td >
                                    <div className="productAction__buttons d-flex justify-content-center">
                                        <span>
                                            <img
                                                src={images.editIcon}
                                                alt="Edit Icon"
                                                onClick={() => (dispatch(fetchSingleEditDataRole(item.roleID), navigate(`/manageroleform/${item.roleID}`)))}

                                            />
                                        </span>
                                        <span>
                                            <img
                                                src={images.deleteIcon}
                                                alt="Delete Icon"
                                                onClick={() => (dispatch(fetchDelDataRole(item.roleID)), dispatch(resetStates()))}
                                            />
                                        </span>
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

export default ManageRoleDataTable;
