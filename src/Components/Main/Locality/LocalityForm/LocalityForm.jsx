import React, { useState, useEffect } from "react";
// import "./Basic.scss";
import { useDispatch, useSelector } from "react-redux";
import { navTitle } from "../../../../Store/Slice/NavSlices";
import Buttons from "../../ProductComponent/Buttons/NewButtons";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import verifyToken from "../../../SignIn/verifyToken";
import { fetchSaveUpdateLocality, fetchSingleDataLocality, resetStates } from "../../../../Store/Slice/LocalitySlices";



function LocalityForm({ setAlert }) {
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    dispatch(navTitle("Locality"));
    const edit = useParams();

    const [locatitySetData, setLocatitySetData] = useState({
        localityName: '',
        franchiseID: "",
    })

    useEffect(() => {
        if (edit.id !== undefined) {
            dispatch(fetchSingleDataLocality(edit.id))
        }
    }, [edit])

    const localitySingleData = useSelector((locality) => locality.LocalitySlices.singleData);

    useEffect(() => {
        !localitySingleData ? setLocatitySetData({
            ...locatitySetData
        }) : setLocatitySetData({
            localityName: localitySingleData.localityName
        })
        if (!edit.id) {
            setLocatitySetData({
                localityName: ''
            })
        }
    }, [localitySingleData]);

    const changeHandler = (e) => {
        setLocatitySetData({
            ...locatitySetData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginToken = verifyToken()

        let localityData
        if (Object.keys(edit).length < 1) {
            localityData = {
                ...locatitySetData,
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId
            }
        } else {
            localityData = {
                ...locatitySetData,
                localityID: parseInt(edit.id),
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId
            }
        }

        const response = await dispatch(fetchSaveUpdateLocality(localityData));
        dispatch(resetStates())

        console.log("check response locality", response);
        

        if (response.payload.status === 200) {
            setLocatitySetData({
                localityName: ""
            })
            Navigate(`/dashboard/localityTable`)
            setAlert({ type: "success", message: !edit.id ? response.payload.message : response.payload.message });
        } else {
            setAlert({ type: "error", message: response.payload.message })
        };
    }


    const cancelHandler = () => {
        setLocatitySetData({
            localityName: ""
        })
        Navigate(`/dashboard/localityTable`)
    }

    const { localityName } = locatitySetData

    return (
        <>
            <div className="addProduct__basicTabs">
                <form onSubmit={onSubmit}>
                    <div className="addProduct__basicForm d-flex">

                        <div className="field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Locality Name
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Cheeze Burst"
                                name="localityName"
                                value={localityName}
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
    );
}

export default LocalityForm;
