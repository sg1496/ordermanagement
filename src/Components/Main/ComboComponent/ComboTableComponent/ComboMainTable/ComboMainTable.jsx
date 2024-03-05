import React, { useEffect, useState } from 'react';
import images from '../../../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import verifyToken from '../../../../SignIn/verifyToken';
import { ComboGetById, DeleteCombo, GetAllDataByIDCombo, resetStates } from '../../../../../Store/Slice/ComboSlices';
import { useNavigate } from 'react-router-dom';

const ComboMainTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginToken = verifyToken()

    const comboData = useSelector(combo => combo.ComboSlices.data)
    const comboMessage = useSelector(combo => combo.ComboSlices.message)

    console.log("check message", comboMessage)

    useEffect(() => {
        dispatch(GetAllDataByIDCombo(loginToken.userID))
    }, [comboMessage])

    
console.log("combo", comboData)

    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table common-design m-0 text-center'>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "20%" }}>Combo Name</th>
                            <th scope="col" style={{ width: "30%" }}>No. of Products</th>
                            <th scope="col" style={{ width: "30%" }}>Price</th>
                            <th scope="col" style={{ width: "20%" }}>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {comboData && comboData.map((combo, index) => {
                            return <tr key={index}>
                                <td scope="row">{combo.comboName}</td>
                                <td>{combo.comboName}</td>
                                <td>{combo.comboPrice}</td>

                                <td>
                                    <div className="productAction__buttons d-flex justify-content-center">
                                        <span>
                                            <img 
                                            src={images.editIcon} 
                                            alt="Edit Icon"
                                            onClick={()=>(dispatch(ComboGetById(combo.comboProductID)), navigate(`/combo_form/${combo.comboProductID}`))}
                                            /></span>
                                        <span>
                                            <img
                                                src={images.deleteIcon}
                                                alt="Delete Icon"
                                                onClick={() => (dispatch(DeleteCombo({ id: combo.comboProductID, fid: loginToken.userID })), dispatch(resetStates()))}
                                            />
                                        </span>
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
