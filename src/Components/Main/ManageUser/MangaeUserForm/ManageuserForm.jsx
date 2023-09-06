import React, { useState } from 'react';
import "./ManageuserForm.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';






const ManageuserForm = () => {
    const dispatch = useDispatch();
    dispatch(navTitle("Manage User"));
    
    return (
        <>
        
        
        
            <div className="addProduct__basicTabs  ">
                <form>

                    <div className=" addProduct__basicForm d-flex mb-3">
                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Email:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="email"
                                id="product-name"
                                className="form-control"
                                placeholder="Abcd@email.com"
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                First Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="First Name"
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Last Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Last name"
                                required
                            />
                        </div>




                    </div>
                    <div className=" addProduct__basicForm d-flex mb-3">
                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Contact Number:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="90512xxxxx"
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                Passward:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="passwards"
                                id="product-name"
                                className="form-control"
                                placeholder="passward"
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Confirm Passward:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="Passward"
                                id="product-name"
                                className="form-control"
                                placeholder="Passward"
                                required
                            />
                        </div>




                    </div>
                   
                    <div>

                        <Buttons fname="Save"
                            Sname="Cancel" />

                    </div>




                </form >
            </div >
        </>
    )
}
export default ManageuserForm;


