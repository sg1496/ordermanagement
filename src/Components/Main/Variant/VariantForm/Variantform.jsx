import React, { useState, useRef } from "react";
// import "./Basic.scss";
import { useDispatch, useSelector } from "react-redux";
import { navTitle } from "../../../../Store/Slice/NavSlices";
import Buttons from "../../ProductComponent/Buttons/NewButtons";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { fetchSingleApiData, saveUpdateVariant, resetStates } from "../../../../Store/Slice/VariantSlices";
import { useEffect } from "react";
import verifyToken from "../../../SignIn/verifyToken";


function Variantform({ setAlert }) {

    const selectordatas = useSelector((state) => state.variantSlices.singleData)
    const loginToken = verifyToken()
    const edit = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    dispatch(navTitle("Variant-Details"));

    const [data, setData] = useState({
        variantName: "",
        variantLevel: "",
        isActive: false,
        parentUserId: "",
        franchiseID: ""
    })


    useEffect(() => {
        if (edit.id != undefined) {
            dispatch(fetchSingleApiData(edit.id))
        }
    }, [edit])

    useEffect(() => {
        !selectordatas ? setData({
            ...data
        }) : setData({
            variantName: selectordatas.variantName,
            variantLevel: selectordatas.variantLevel,
            isActive: selectordatas.isActive
        })
        if (!edit.id) {
            setData({
                variantName: "",
                variantLevel: "",
                isActive: false,
            })
        }
    }, [selectordatas])


    const changeHandler = (e) => {
        setData(
            {
                ...data,
                [e.target.name]: e.target.value
            }
        )
    }

    const toggleChange = (e) => {
        setData({ ...data, isActive: !data.isActive })
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        let newdata
        if (Object.keys(edit).length < 1) {
            newdata = {
                ...data,
                variantLevel: parseInt(data.variantLevel),
                parentUserId: loginToken.parentUserId,
                franchiseID: loginToken.userID
            }
        } else {
            newdata = {
                ...data,
                variantLevel: parseInt(data.variantLevel),
                parentUserId: loginToken.parentUserId,
                franchiseID: loginToken.userID,
                variantId: parseInt(edit.id)
            }
        }
        const response = await dispatch(saveUpdateVariant(newdata))
        dispatch(resetStates())

        if (response.payload.status === 200) {
            setAlert({ type: "success", message: !edit.id ? 'Variant added successfully' : 'Variant updated successfully' });
            navigate(`/dashboard/variant_table`)
            setData({
                variantName: "",
                variantLevel: ""
            })
        } else {
            setAlert({ type: "error", message: response.payload.message });
        }
    }

    const cancelHandler = () => {
        setData({
            variantName: "",
            variantLevel: "",
            isActive: false,
            loginUserID: 0,
            franchiseID: 0
        })
        navigate(`/dashboard/variant_table`)
    }

    return (
        <>
            <div className="addProduct__basicTabs">
                <form onSubmit={onSubmit}>
                    <div className="addProduct__basicForm d-flex">

                        <div className="field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Variant Name
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Cheeze Burst"
                                name="variantName"
                                value={data.variantName}
                                onChange={changeHandler}
                                required
                            />
                        </div>

                        <div className="field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Variant Level:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="Cheeze Burst"
                                name="variantLevel"
                                value={data.variantLevel}
                                onChange={changeHandler}
                                required
                            />
                        </div>

                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                is Active
                                <span className="formRequired ">*</span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                                name="variantallowed"
                                checked={data && data.isActive}
                                onChange={toggleChange}
                            />
                        </div>

                    </div>
                    <div>
                        <Buttons fname={!edit.id ? "Save" : 'Update'}
                            Sname="Cancel"
                            cancelHandler={cancelHandler}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Variantform;
