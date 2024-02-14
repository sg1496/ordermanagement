import React, { useState } from 'react'
import FormTable from './FormTable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { SaveUpdataCombo } from '../../../../Store/Slice/ComboSlices';
import verifyToken from '../../../SignIn/verifyToken';

const ComboForm = (props) => {
    const dispatch = useDispatch();
    dispatch(navTitle("Combo Products"))
    const loginToken = verifyToken()

    const [comboData, setComboData] = useState({
        comboName: "",
        comboPrice: 0,
        comboProductDetail: []

    })

    const comboTableData = (data) => {
        setComboData({ ...comboData, comboProductDetail: data })
    }

    const changeHandler = (e) => {
        setComboData({
            ...comboData,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        let ComboDatafulfield = {
            ...comboData,
            franchiseId: loginToken.userID,
            parentUserId: loginToken.parentUserId,
        }

        console.log("findal", ComboDatafulfield)

        // dispatch(SaveUpdataCombo(ComboDatafulfield ))
    }






    return (
        <>
            <div className="addProduct__basicTabs">
                <form onSubmit={submitHandler} >

                    <div className="addProduct__basic   d-flex">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Combo Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='comboName'
                                onChange={changeHandler}
                                required
                            />
                        </div>

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Price:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='comboPrice'
                                onChange={changeHandler}
                                required
                            />
                        </div>




                    </div>
                    <FormTable
                        comboTableData={comboTableData}
                    />
                    {/* <Buttons 
                    fname="Save"
                    Sname="Cancel"/> */}

                    <div>

                        <Buttons
                            fname="Save"
                            Sname="Cancel" />

                    </div>
                </form>
            </div>
        </>
    )
}
export default ComboForm;