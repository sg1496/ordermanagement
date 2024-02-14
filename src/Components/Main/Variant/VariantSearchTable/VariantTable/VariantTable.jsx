import React, { useEffect, useState } from 'react';
import images from '../../../../../assets/images';
import { useNavigate } from "react-router-dom"
import Spinner from '../../../../Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleApiData, deleteSingleApiData, resetStates } from '../../../../../Store/Slice/VariantSlices';
import { fetchApiData } from '../../../../../Store/Slice/VariantSlices';
import verifyToken from '../../../../SignIn/verifyToken';


function VariantTable(props) {
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
                            <th scope="col">Variant Name</th>
                            <th scope="col">Variant Level</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {variantsList && variantsList.map((item, index) => {
                            return <tr key={index}>
                                <td scope="row">{item.variantName}</td>
                                <td>{item.variantLevel}</td>
                                <td>{item.isActive.toString()}</td>
                                <td>
                                    <div className="productAction__buttons d-flex">
                                        <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchSingleApiData(item.variantId), navigate(`/variant_form/${item.variantId}`)))} /></span>
                                        <span><img src={images.deleteIcon} alt="Delete Icon" onClick={() => (dispatch(deleteSingleApiData(item.variantId)), dispatch(resetStates()))} /></span>
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

export default VariantTable;
