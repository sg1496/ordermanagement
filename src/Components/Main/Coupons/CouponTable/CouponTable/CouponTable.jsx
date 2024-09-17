import React, { useEffect, useState } from 'react';
import images from '../../../../../assets/images';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import verifyToken from '../../../../SignIn/verifyToken';
import AlertDialog from '../../../../utils/DeleteConfirmationAlert';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { fetchDeleteDataCoupon, fetchLoginAllDataCoupon, fetchSingleDataCoupon } from '../../../../../Store/Slice/CouponSlices';


function CouponTable({ setAlert }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loginToken = verifyToken()
    const [deleteModal, setDeleteModal] = useState({ check: false, id: null });
    const [page, setPage] = useState(1)
    const pagePerItem = 10;

    const message = useSelector((state) => state.variantSlices.message)
    const couponList = useSelector(state => state.CouponSlices.data)

    console.log("check coupon data", couponList);
    

    useEffect(() => {
        dispatch(fetchLoginAllDataCoupon(loginToken.userID));
    }, [message])

    

    const changePageHandler = (event, newPage) => {
        setPage(newPage)
    }

    const closeDeleteHandler = () => {
        setDeleteModal({ check: false })
    };

    const deleteHandler = () => {
        dispatch(fetchDeleteDataCoupon(deleteModal.id))
        setDeleteModal({ check: false, id: null });
        setAlert({ type: "success", message: "Coupon is deleted successfully." });
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
                            <th scope="col">Coupon Name</th>
                            <th scope="col">Coupon Code</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {couponList?.length > 0 ? (
                            couponList?.slice((page - 1) * pagePerItem, page * pagePerItem)?.map((item, index) => {
                                return <tr key={index}>
                                    <td scope="row">{item.couponName}</td>
                                    <td>{item.couponCode}</td>
                                    <td>
                                        <div className="productAction__buttons d-flex">
                                            <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchSingleDataCoupon(item.couponID), navigate(`/dashboard/maincouponsform/${item.couponID}`)))} /></span>
                                            <span><img src={images.deleteIcon} alt="Delete Icon" onClick={() => (setDeleteModal({ check: true, id: item.couponID }), dispatch(resetStates()))} /></span>
                                        </div>
                                    </td>
                                </tr>
                            })) : (
                            <tr>
                                <td colSpan={4}>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {couponList?.length >= 0 ? (
                                            <p className='empty_message'>Your variant list is currently empty</p>
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
                    {pagePerItem < couponList?.length && <Stack spacing={2}>
                        <Pagination
                            color="primary"
                            count={Math.ceil((couponList && couponList ? couponList?.length : 0) / pagePerItem)}
                            page={page}
                            onChange={changePageHandler}
                        />
                    </Stack>}
                </div>
            </div >
        </>
    )
}

export default CouponTable;
