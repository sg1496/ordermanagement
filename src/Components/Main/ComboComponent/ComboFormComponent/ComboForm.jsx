import React, { useEffect, useState } from 'react'
import FormTable from './FormTable';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { ComboGetById, SaveUpdataCombo } from '../../../../Store/Slice/ComboSlices';
import verifyToken from '../../../SignIn/verifyToken';
import { useNavigate, useParams } from 'react-router-dom';

const ComboForm = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    dispatch(navTitle("Combo Products"))
    const loginToken = verifyToken()
    const comboID = useParams()

    const [comboData, setComboData] = useState({
        comboName: "",
        comboPrice: 0,
        comboProductDetail: []
    })

    useEffect(() => {
        if (comboID.id !== undefined) {
            dispatch(ComboGetById(comboID.id))
        }
    }, [comboID])

    const comboDatabyID = useSelector((item) => item.ComboSlices.singleData)

    useEffect(() => {

        !comboDatabyID ? setComboData({
            ...comboData
        }) : setComboData({
            comboName: comboDatabyID.singleComboProduct[0].comboName,
            comboPrice: comboDatabyID.singleComboProduct[0].comboPrice,
            comboProductDetail: comboDatabyID.comboProductVariantList
        })
        if (!comboID.id) {
            setComboData({
                comboName: "",
                comboPrice: 0,
                comboProductDetail: []
            })
        }
    }, [comboDatabyID])

    console.log("check kro data", comboDatabyID)

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

        let ComboDatafulfield
        if (Object.keys(comboID).length < 1) {
            ComboDatafulfield = {
                ...comboData,
                isActive: true,
                franchiseId: loginToken.userID,
                parentUserId: loginToken.parentUserId,
            }
        } else {
            ComboDatafulfield = {
                ...comboData,
                comboProductID: parseInt(comboID.id),
                isActive: true,
                franchiseId: loginToken.userID,
                parentUserId: loginToken.parentUserId,
            }
        }

        console.log("findal", ComboDatafulfield)

        dispatch(SaveUpdataCombo(ComboDatafulfield))
        navigate(`/combotable`)

        setComboData({
            comboName: "",
            comboPrice: 0,
            comboProductDetail: []
        })
    }

    const cancelHandler = () => {
        setComboData({
            comboName: "",
            comboPrice: 0,
            comboProductDetail: []
        })
        navigate(`/combotable`)
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
                                value={comboData.comboName}
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
                                value={comboData.comboPrice}
                                onChange={changeHandler}
                                required
                            />
                        </div>




                    </div>
                    <FormTable
                        comboTableData={comboTableData}
                        comboStateData={comboData}
                    />
                    <div>

                        <Buttons
                            fname="Save"
                            Sname="Cancel"
                            cancelHandler={cancelHandler}
                        />

                    </div>
                </form>
            </div>
        </>
    )
}
export default ComboForm;