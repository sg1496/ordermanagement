import React, { useEffect, useState } from 'react';
import images from '../../../../../assets/images';
import { useNavigate } from "react-router-dom"
import Spinner from '../../../../Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleApiData, deleteSingleApiData, resetStates } from '../../../../../Store/Slice/VariantSlices';
import { fetchApiData } from '../../../../../Store/Slice/VariantSlices';
import verifyToken from '../../../../SignIn/verifyToken';


const PromotionalTable = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loginToken = verifyToken()

    const message = useSelector((state) => state.VariantSlices.message)
    useEffect(() => {
        dispatch(fetchApiData(loginToken.userID));
    }, [message])

    const variantsList = useSelector(state => state.VariantSlices.data)
    const variantsLists = useSelector(state => state)

    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col">Activity Name</th>
                            <th scope="col">Promotional Type</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Display Order</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td scope="row">pizza+clc@45</td>
                            <td>buy 1 get Some Complimentary item(s)</td>
                            <td>yes</td>
                            <td>2</td>
                            <td>
                                <div className="productAction__buttons d-flex">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">pizza+clc@45</td>
                            <td>buy 1 get Some Complimentary item(s)</td>
                            <td>yes</td>
                            <td>2</td>
                            <td>
                                <div className="productAction__buttons d-flex">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">pizza+clc@45</td>
                            <td>buy 1 get Some Complimentary item(s)</td>
                            <td>yes</td>
                            <td>2</td>
                            <td>
                                <div className="productAction__buttons d-flex">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default PromotionalTable
