import React, { useEffect, useState } from 'react';
import images from "../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelDataUser, fetchLoginDataUsers, fetchSingleEditDataUser, resetStates } from '../../../../Store/Slice/ManageUsers';
import { useNavigate } from 'react-router-dom';
import verifyToken from '../../../SignIn/verifyToken';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from '../../../utils/DeleteConfirmationAlert';

function ManageUserTable({ setAlert }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginToken = verifyToken()
    const [page, setPage] = useState(1)
    const [deleteModel, setDeleteModal] = useState({ check: false, id: null })
    const pagePerItem = 10;

    const manageLoginUserData = useSelector((manageuser) => manageuser.ManageUserSlices.loginData);
    const manageUserMessage = useSelector((manageuser) => manageuser.ManageUserSlices.message);

    useEffect(() => {
        dispatch(fetchLoginDataUsers({ id: loginToken.userID, pid: loginToken.parentUserId }))
    }, [manageUserMessage])

    const changePageHandler = (event, newPage) => {
        setPage(newPage)
    }

    const closeHandler = () => {
        setDeleteModal({ check: false })
    }

    const deleteHandler = () => {
        dispatch(fetchDelDataUser(deleteModel.id))
        setDeleteModal({ check: false, id: null })
        setAlert({ type: "success", message: "User delete successfully " })
    }


    return (
        <>
            <AlertDialog
                open={deleteModel}
                onClose={closeHandler}
                title="Confirmation"
                message="Are you sure you want to delete User"
                onDelete={deleteHandler}
            />

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
                        {manageLoginUserData?.length > 0 ? (
                            manageLoginUserData?.slice((page - 1) * pagePerItem, page * pagePerItem)?.map((item, index) => {
                                return <tr key={index}>
                                    <td scope="row" >{item.email}</td>
                                    <td className='text-center'>{item.mobileNo}</td>
                                    <td >
                                        <div className="productAction__buttons d-flex justify-content-center">
                                            <span>
                                                <img
                                                    src={images.editIcon}
                                                    alt="Edit Icon"
                                                    onClick={() => (dispatch(fetchSingleEditDataUser(item.userId), navigate(`/dashboard/manageuserform/${item.userId}`)))}
                                                />
                                            </span>
                                            <span>
                                                <img
                                                    src={images.deleteIcon}
                                                    alt="Delete Icon"
                                                    onClick={() => (setDeleteModal({ check: true, id: item.userId }), dispatch(resetStates()))}
                                                />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })) : (
                            <tr>
                                <td colSpan={3}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        {manageLoginUserData?.length ? (
                                            <p className='empty_message'>Your User list is currently empty</p>
                                        ) : (
                                            <Stack>
                                                <CircularProgress />
                                            </Stack>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                <div className='wrapper'>
                    {pagePerItem < manageLoginUserData?.length && <Stack>
                        <Pagination
                            color='primary'
                            count={Math.ceil((manageLoginUserData && manageLoginUserData ? manageLoginUserData?.length : 0) / pagePerItem)}
                            page={page}
                            onChange={changePageHandler}
                        />
                    </Stack>}
                </div>
            </div >
        </>
    )
}

export default ManageUserTable;
