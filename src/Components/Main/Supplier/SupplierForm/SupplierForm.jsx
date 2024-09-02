import { React, useEffect, useState } from 'react';
import './SupplierForm.scss'
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { useNavigate, useParams } from "react-router-dom"
import { fetchAllDataState, fetchSaveUpdateSupplier, fetchSingleDataSupplier, resetStates } from '../../../../Store/Slice/SupplierSlices';
import verifyToken from '../../../SignIn/verifyToken';

const SupplierForm = ({ setAlert }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    dispatch(navTitle("Supplier"))
    const edit = useParams()
    const loginToken = verifyToken()

    const [supplierData, setSupplierData] = useState({
        suppilerName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateID: "",
        pinCode: "",
        mobileNumber: "",
        phoneNumber: "",
        gstin: "",
        franchiseId: "",
        parentUserId: "",
    })
    const stateListData = useSelector((stateLiData) => stateLiData.SupplierSlices.statelistdata)
    const supplierSingleData = useSelector((singleData) => singleData.SupplierSlices.singleData)

    useEffect(() => {
        if (edit.id !== undefined) {
            dispatch(fetchSingleDataSupplier(edit.id))
        }
    }, [edit]);

    useEffect(() => {
        dispatch(fetchAllDataState())
    }, [])

    useEffect(() => {

        !supplierSingleData ? setSupplierData({
            ...supplierData
        }) : setSupplierData({
            suppilerName: supplierSingleData.suppilerName,
            addressLine1: supplierSingleData.addressLine1,
            addressLine2: supplierSingleData.addressLine2,
            city: supplierSingleData.city,
            stateID: supplierSingleData.stateID,
            pinCode: supplierSingleData.pinCode,
            mobileNumber: supplierSingleData.mobileNumber,
            phoneNumber: supplierSingleData.phoneNumber,
            gstin: supplierSingleData.gstin,
        })
        if (!edit.id) {
            setSupplierData({
                suppilerName: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                stateID: "",
                pinCode: "",
                mobileNumber: "",
                phoneNumber: "",
                gstin: "",
            })
        }
    }, [supplierSingleData])

    const changeHandler = (e) => {
        setSupplierData({
            ...supplierData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        let SupplierSetData
        if (Object.keys(edit).length < 1) {
            SupplierSetData = {
                ...supplierData,
                franchiseId: parseInt(loginToken.userID),
                parentUserId: parseInt(loginToken.parentUserId),
            }
        }
        else {
            SupplierSetData = {
                ...supplierData,
                suppilerID: parseInt(edit.id),
                franchiseId: parseInt(loginToken.userID),
                parentUserId: parseInt(loginToken.parentUserId),
            }
        }
        const response = await dispatch(fetchSaveUpdateSupplier(SupplierSetData))
        dispatch(resetStates())

        if (response.payload.status === 200) {
            navigate(`/dashboard/mainsuppliertable`)
            setAlert({ type: "success", message: edit.id ? "Supplier Update Successfully" : "Supplier Create Successfully" })
            setSupplierData({
                suppilerName: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                stateID: "",
                pinCode: "",
                mobileNumber: "",
                phoneNumber: "",
                gstin: "",

            })
        }

    }


    const cancelHandler = () => {
        setSupplierData({
            suppilerName: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            stateID: "",
            pinCode: "",
            mobileNumber: "",
            phoneNumber: "",
            gstin: "",
        })
        navigate(`/dashboard/mainsuppliertable`)

    }



    const { suppilerName, addressLine1, addressLine2, city, stateID, pinCode, mobileNumber, phoneNumber, gstin } = supplierData
    return (
        <>

            <div className="addProduct__basicTabs">
                <form onSubmit={onSubmit}>

                    <div className="addProduct__basic mb-4  d-flex">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Store Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="xyz pizza"
                                name='suppilerName'
                                value={suppilerName}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Address Line 1:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="XYZ Road"
                                name='addressLine1'
                                value={addressLine1}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Address Line 2:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="XYZ Road"
                                name='addressLine2'
                                value={addressLine2}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>


                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                City:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="panchkula"
                                name='city'
                                value={city}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                    </div>
                    <div className="addProduct__basic mb-4 d-flex">

                        <div className="addProduct__productNamed">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                State:
                                <span className="formRequired">*</span>
                            </label>
                            <select className="form-select "
                                id="taxClass"
                                name='stateID'
                                value={stateID}
                                onChange={(e) => changeHandler(e)}

                            >
                                <option defaultValue>Select Category</option>
                                {stateListData?.map(item => {
                                    return <option
                                        key={item.stateID}
                                        value={item.stateID}>
                                        {item.stateName}
                                    </option>

                                })}
                            </select>
                        </div>



                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Pincode:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="000000"
                                name='pinCode'
                                value={pinCode}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Mobile Number:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="98153xxxxx"
                                name='mobileNumber'
                                value={mobileNumber}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Phone Number:
                                <span className="formRequired">*</span>
                            </label>
                            <input

                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="0172xxxxxx"
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>


                    </div>
                    <div className="addProduct__basic mb-4 d-flex">

                        <div className="addProduct__productName">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                GSTIN:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="0000000000"
                                name='gstin'
                                value={gstin}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Buttons fname={!edit.id ? "Save" : "Update"}
                            Sname="Cancel"
                            cancelHandler={cancelHandler}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
export default SupplierForm;