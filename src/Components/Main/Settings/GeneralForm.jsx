import React from 'react';
import './GeneralForm.scss';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../Store/Slice/NavSlices';
import Buttons from '../ProductComponent/Buttons/NewButtons';
const GeneralForm = () => {
const dispatch = useDispatch()
dispatch(navTitle("Settings"))
    return (
        <>
            <div className="addProduct__basicTab">
                <form>

                    <div className="addProduct__basic d-flex mb-4">
                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Day Close Required:
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                            />
                        </div>

                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Reset Invoice Number Everyday: *
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                            />
                        </div>

                        <div className="addProduct__productName ">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                Store Timing:
                                <span className="formRequired ">*</span>
                            </label>
                            <div className='d-flex '>
                                <input
                                    type="time"
                                    id="product-name"
                                    className="form-control me-2 "
                                    placeholder="from"
                                    required
                                />
                                <input
                                    type="time"
                                    id="product-name2"
                                    className="form-control"
                                    placeholder="from"
                                    required
                                />
                            </div>
                        </div>
                        <div className="addProduct__productName field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                Invoice Number suffix:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control "
                                placeholder="1234"
                                required
                            />
                        </div>
                    </div>

                    <div className="addProduct__basicForm d-flex mb-3">
                        <div className="addProduct__productName field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Invoice Number suffix:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="1234"
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
export default GeneralForm;