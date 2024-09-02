import React, { useEffect, useState } from 'react';
import images from '../../../../../assets/images';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleApiData, deleteSingleApiData, resetStates } from '../../../../../Store/Slice/VariantSlices';
import { fetchApiData } from '../../../../../Store/Slice/VariantSlices';
import verifyToken from '../../../../SignIn/verifyToken';
import AlertDialog from '../../../../utils/DeleteConfirmationAlert';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';


function VariantTable({ setAlert }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loginToken = verifyToken()
    const [deleteModal, setDeleteModal] = useState({ check: false, id: null });
    const [page, setPage] = useState(1)
    const pagePerItem = 10;

    const message = useSelector((state) => state.variantSlices.message)
    useEffect(() => {
        dispatch(fetchApiData(loginToken.userID));
    }, [message])

    const variantsList = useSelector(state => state.variantSlices.data)

    const changePageHandler = (event, newPage) => {
        setPage(newPage)
    }

    const closeDeleteHandler = () => {
        setDeleteModal({ check: false })
    };

    const deleteHandler = () => {
        dispatch(deleteSingleApiData(deleteModal.id))
        setDeleteModal({ check: false, id: null });
        setAlert({ type: "success", message: "Variant is deleted successfully." });
    };
    return (
        <>
            <AlertDialog
                open={deleteModal}
                onClose={closeDeleteHandler}
                title="Confirmation"
                message="Are you sure you want to delete Variant?"
                disagreeText="Disagree"
                agreeText="Agree"
                onDelete={deleteHandler}
            />

            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col">Variant Name</th>
                            <th scope="col">Variant Level</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {!variantsList ?
                            <tr>
                                <td colSpan={4}>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Stack>
                                            <CircularProgress color="secondary" />
                                        </Stack>
                                    </div>
                                </td>
                            </tr>
                            :
                            variantsList?.slice((page - 1) * pagePerItem, page * pagePerItem)?.map((item, index) => {
                                return <tr key={index}>
                                    <td scope="row">{item.variantName}</td>
                                    <td>{item.variantLevel}</td>
                                    <td>{item.isActive.toString()}</td>
                                    <td>
                                        <div className="productAction__buttons d-flex">
                                            <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchSingleApiData(item.variantId), navigate(`/dashboard/variant_form/${item.variantId}`)))} /></span>
                                            <span><img src={images.deleteIcon} alt="Delete Icon" onClick={() => (setDeleteModal({ check: true, id: item.variantId }), dispatch(resetStates()))} /></span>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className='wrapper'>
                    {pagePerItem < variantsList?.length && <Stack spacing={2}>
                        <Pagination
                            color="primary"
                            count={Math.ceil((variantsList && variantsList ? variantsList?.length : 0) / pagePerItem)}
                            page={page}
                            onChange={changePageHandler}
                        />
                    </Stack>}
                </div>
            </div >
        </>
    )
}

export default VariantTable;
