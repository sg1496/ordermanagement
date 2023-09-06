import React from 'react';
import "./StoreDetails.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../Store/Slice/NavSlices';
import Buttons from '../ProductComponent/Buttons/NewButtons';

const StoreDetails = () => {
    const dispatch = useDispatch()
    dispatch(navTitle("Settings"))
    return (
        <>
            <div className="addProduct__basicTab">
                <form>

                    <div className="addProduct__basic d-flex mb-4">
                        <div className="addProduct__productNamed ">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Logo:

                            </label>
                            <div className="input-group mb-3">

                                <input type="file" className="form-control" id="inputGroupFile02" />

                            </div>

                        </div>

                    </div>

                    <div className="addProduct__basic d-flex mb-4">


                        <div className="addProduct__productNamed ">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Store Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="xyz pizza"
                                required
                            />
                        </div>

                        <div className="addProduct__productNamed ">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Address Line 1:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="XYZ Road"
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
                                required
                            />
                        </div>

                    </div>
                    <div className="addProduct__basic d-flex mb-4">

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                State:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Haryana"
                                required
                            />
                        </div>



                        <div className="addProduct__productNamed ">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Pincode:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="000000"
                                required
                            />
                        </div>

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Mobile Number:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="98153xxxxx"
                                required
                            />
                        </div>
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Phone Number:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="0172xxxxxx"
                                required
                            />
                        </div>


                    </div>
                    <div className="addProduct__basic d-flex mb-4 ">

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                GSTIN:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="0000000000"
                                required
                            />
                        </div>



                    </div>

                    <div>

                        <Buttons fname="Save"
                            Sname="Cancel" />

                    </div>
                </form>
            </div>
        </>
    )
}
export default StoreDetails;