import React, { useEffect } from 'react';

import images from "../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDataUsers, fetchDelDataUser, fetchSingleEditDataUser, resetStates } from '../../../../Store/Slice/ManageUsers';
import { useNavigate } from 'react-router-dom';

function ManageUserTable() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const manageUserData = useSelector((manageuser) => manageuser.ManageUserSlices.data);
    const manageUserMessage = useSelector((manageuser) => manageuser.ManageUserSlices.message);

    console.log("save/edit", manageUserMessage)


    useEffect(() => {
        dispatch(fetchAllDataUsers())
    }, [manageUserMessage])

    console.log("first", manageUserData)

    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead >
                        <tr>
                            <th scope="col" style={{ width: "35%", textAlign: 'left' }}>User Email</th>

                            <th scope="col" style={{ width: "35%", textAlign: 'center' }}>Contact Number</th>
                            <th scope="col" style={{ width: "30%", textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manageUserData?.map((item, index) => {
                            return <tr key={index}>
                                <td scope="row" >{item.email}</td>
                                <td className='text-center'>{item.mobileNo}</td>
                                <td >
                                    <div className="productAction__buttons d-flex justify-content-center">
                                        <span>
                                            <img
                                                src={images.editIcon}
                                                alt="Edit Icon"
                                                onClick={()=>(dispatch(fetchSingleEditDataUser(item.userId), navigate(`/manageuserform/${item.userId}`)))}

                                            />
                                        </span>
                                        <span>
                                            <img
                                                src={images.deleteIcon}
                                                alt="Delete Icon"
                                                onClick={() => (dispatch(fetchDelDataUser(item.userId)), dispatch(resetStates()))}
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

export default ManageUserTable;
