import React, { useEffect, useState } from 'react';
import images from '../../../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import verifyToken from '../../../../SignIn/verifyToken';
import { GetAllDataByIDCombo } from '../../../../../Store/Slice/ComboSlices';

const ComboMainTable = () => {
    const dispatch = useDispatch()
    const loginToken = verifyToken()

    useEffect(() => {
        dispatch(GetAllDataByIDCombo(loginToken.userID))
    }, [])

    const ComboData = useSelector(combo => combo.ComboSlices.data)


    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0 text-center'>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "20%" }}>Combo Name</th>
                            <th scope="col" style={{ width: "30%" }}>No. of Products</th>
                            <th scope="col" style={{ width: "30%" }}>Price</th>
                            <th scope="col" style={{ width: "20%" }}>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {ComboData?.map((combo,index) => {
                           return <tr key={index}>
                            <td scope="row">{combo.comboName}</td>
                            <td>AT</td>
                            <td>{combo.comboPrice}</td>

                            <td>
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ComboMainTable;
