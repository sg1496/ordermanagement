import React, { useState, useEffect } from "react";
// import "./Basic.scss";
import { useDispatch, useSelector } from "react-redux";
import { navTitle } from "../../../../Store/Slice/NavSlices";
import Buttons from "../../ProductComponent/Buttons/NewButtons";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import verifyToken from "../../../SignIn/VerifyToken";
import { fetchSaveUpdateLocality, fetchSingleDataLocality, resetStates } from "../../../../Store/Slice/LocalitySlices";



function LocalityForm(props) {
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    dispatch(navTitle("Locality-Form"));
    const edit = useParams();

    const loginUserId = useSelector(login => login.LoginSlices)
    console.log("loginUserId", loginUserId)

    const [locatitySetData, setLocatitySetData] = useState({
        localityName: '',
        loginUserID: "",
    })

    useEffect(() => {
        if (edit.id !== undefined) {
            dispatch(fetchSingleDataLocality(edit.id))
        }
    }, [edit])

    const localitySingleData = useSelector((locality) => locality.LocalitySlices.singleData)
    console.log("first", localitySingleData)

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

    }, [localitySingleData])




    const changeHandler = (e) => {
        setLocatitySetData({
            ...locatitySetData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const loginToken = verifyToken()

        let localityData
        if (Object.keys(edit).length < 1) {
            localityData = {
                ...locatitySetData,
                loginUserID: loginToken.userID
            }
        } else {
            localityData = {
                ...locatitySetData,
                localityID: parseInt(edit.id),
                loginUserID: loginToken.userID
            }
        }

        dispatch(fetchSaveUpdateLocality(localityData))
        dispatch(resetStates())

        setLocatitySetData({
            localityName: ""
        })
        Navigate(`/localityTable`)
    }


    const cancelHandler = () => {
        setLocatitySetData({
            localityName: ""
        })
        Navigate(`/localityTable`)

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
                        <Buttons fname="Save"
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
