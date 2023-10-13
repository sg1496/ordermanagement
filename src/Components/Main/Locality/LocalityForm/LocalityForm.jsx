import React, { useState, useRef } from "react";
// import "./Basic.scss";
import { useDispatch, useSelector } from "react-redux";
import { navTitle } from "../../../../Store/Slice/NavSlices";
import Buttons from "../../ProductComponent/Buttons/NewButtons";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"



function LocalityForm(props) {

    

    const edit = useParams()
    const Navigate = useNavigate()
    const dispatch = useDispatch();

    dispatch(navTitle("Locality-Form"));

   
    const cancelHandler = () => {
       
        Navigate(`/localityTable`)

    }

    return (
        <>
            <div className="addProduct__basicTabs">
                <form >
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
                                name="variantName"
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
