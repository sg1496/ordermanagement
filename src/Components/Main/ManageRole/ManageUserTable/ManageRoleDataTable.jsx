import React, { useEffect, useState } from 'react';
import images from "../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import verifyToken from '../../../SignIn/verifyToken';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDelDataRole, fetchLoginDataRolepage, fetchSingleEditDataRole, resetStates } from '../../../../Store/Slice/ManageRoleSlices';
import AlertDialog from '../../../utils/DeleteConfirmationAlert';

const ManageRoleDataTable = ({ setAlert }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginToken = verifyToken();
    const [page, setpage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({ check: false, id: null });
    const pagePerItem = 10;

    const manageLoginRoleData = useSelector((manageRole) => manageRole.ManageRoleSlices.loginData);
    const manageRoleMessage = useSelector((manageRole) => manageRole.ManageRoleSlices.message);

    useEffect(() => {
        dispatch(fetchLoginDataRolepage(loginToken.userID))
    }, [manageRoleMessage])

    const changePageHandler = (event, newPage) => {
        setpage(newPage)
    }

    const closeDeleteHandler = () => {
        setDeleteModal({ check: false })
    }

    const deleteHandler = () => {
        dispatch(fetchDelDataRole(deleteModal.id))
        setDeleteModal({ check: false, id: null });
        setAlert({ type: "success", message: "ManageRole Delete Successfully" })
    }

    return (
        <>
            <AlertDialog
                open={deleteModal}
                onClose={closeDeleteHandler}
                title="Confirmation"
                message="Are you sure you want to delete User Role"
                disagreeText="Disagree"
                agreeText="Agree"
                onDelete={deleteHandler}
            />
            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead >
                        <tr>
                            <th scope="col" style={{ width: "50%", textAlign: 'left' }}>User Email</th>
                            <th scope="col" style={{ width: "50%", textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manageLoginRoleData?.length > 0 ? (
                            manageLoginRoleData?.slice((page - 1) * pagePerItem, page * pagePerItem)?.map((item, index) => {
                                return <tr key={index}>
                                    <td scope="row" >{item.roleName}</td>
                                    <td >
                                        <div className="productAction__buttons d-flex justify-content-center">
                                            <span>
                                                <img
                                                    src={images.editIcon}
                                                    alt="Edit Icon"
                                                    onClick={() => (dispatch(fetchSingleEditDataRole(item.roleID), navigate(`/dashboard/manageroleform/${item.roleID}`)))}

                                                />
                                            </span>
                                            <span>
                                                <img
                                                    src={images.deleteIcon}
                                                    alt="Delete Icon"
                                                    onClick={() => (setDeleteModal({ check: true, id: item.roleID }), dispatch(resetStates()))}
                                                />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })) : (
                            <tr>
                                <td colSpan={2}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        {manageLoginRoleData?.length >= 0 ? (
                                            <p className='empty_message'>Your Role list is currently empty</p>
                                        ) : (
                                            <Stack>
                                                <CircularProgress color="secondary" />
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
                    {pagePerItem < manageLoginRoleData?.length &&
                        <Stack spacing={2}>
                            <Pagination
                                color="primary"
                                count={Math.ceil((manageLoginRoleData && manageLoginRoleData ? manageLoginRoleData?.length : 0) / pagePerItem)}
                                page={page}
                                onChange={changePageHandler}
                            />

                        </Stack>}
                </div >
            </div >
        </>
    )
}

export default ManageRoleDataTable;