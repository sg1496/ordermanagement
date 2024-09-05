import React, { useEffect, useState } from 'react';
import "./LocalityTable.scss";
import images from "../../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDeleteDataLocality, fetchLoginDataLocality, fetchSingleDataLocality, resetStates, searchStates } from '../../../../../Store/Slice/LocalitySlices';
import verifyToken from '../../../../SignIn/verifyToken';
import { navTitle } from '../../../../../Store/Slice/NavSlices';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import AlertDialog from '../../../../utils/DeleteConfirmationAlert';

const LocalityTable = ({ setAlert }) => {
    const dispatch = useDispatch();
    dispatch(navTitle("Locality"))
    const navigate = useNavigate()
    const loginToken = verifyToken()
    const pagePerItem = 10;


    const localityMessage = useSelector((locality) => locality.LocalitySlices.message);
    const localityAllData = useSelector((locality) => locality.LocalitySlices.loginData);
    const searchdata = useSelector((ser) => ser.LocalitySlices.search)



    const [localityData, setLocalityData] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ check: false, id: null });
    const [page, setPage] = useState(1);

    const closeDeleteHandler = () => {
        setDeleteModal({ check: false })
    };

    const deleteHandler = () => {
        dispatch(fetchDeleteDataLocality(deleteModal.id))
        setDeleteModal({ check: false, id: null });
        setAlert({ type: "success", message: "Locality is deleted successfully." });
    };

    useEffect(() => {
        if (!loginToken?.userID) return
        dispatch(fetchLoginDataLocality(loginToken?.userID))
    }, [localityMessage]);


    useEffect(() => {
        if (localityAllData && localityAllData) {
            const filteredData = localityAllData?.filter((item) => {
                return (
                    item.localityName.toLowerCase().includes(searchdata.toLowerCase())
                )
            })
            setLocalityData(filteredData)
            setPage(1)
        }
    }, [searchdata, localityAllData]);

    const changePageHandler = (event, newPage) => {
        setPage(newPage)
    }

    return (
        <>
            <AlertDialog
                open={deleteModal}
                onClose={closeDeleteHandler}
                title="Confirmation"
                message="Are you sure you want to delete Location?"
                disagreeText="Disagree"
                agreeText="Agree"
                onDelete={deleteHandler}
            />

            <div className='productSection__table mt-3'>
                <table className=' table'>
                    <thead className='text-center' >
                        <tr>
                            <th scope="col" style={{ width: "50%" }} >Locality Names</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {localityData?.length > 0 ? (
                            localityData?.slice((page - 1) * pagePerItem, page * pagePerItem)?.map((item, index) => {
                                return <tr key={index}>
                                    <td scope="row" >{item.localityName}</td>
                                    <td scope="row"> <div className="productAction__buttons d-flex justify-content-center" >
                                        <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchSingleDataLocality(item.localityID)), navigate(`/dashboard/locality_form/${item.localityID}`))} /></span>
                                        <span><img src={images.deleteIcon} alt="Delete Icon" onClick={() => (setDeleteModal({ check: true, id: item.localityID }), dispatch(resetStates()))} /></span>
                                    </div></td>

                                </tr>
                            })) : (
                            <tr>
                                <td colSpan={2}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        {localityData?.length >= 0 ? (
                                            <p className='empty_message'>Your Locality list is currently empty</p>
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
                    {pagePerItem < localityAllData?.length && <Stack spacing={2}>
                        <Pagination
                            color="primary"
                            count={Math.ceil((localityAllData && localityAllData ? localityAllData.length : 0) / pagePerItem)}
                            page={page}
                            onChange={changePageHandler}
                        />
                    </Stack>}
                </div>
            </div >
        </>
    )
}

export default LocalityTable;