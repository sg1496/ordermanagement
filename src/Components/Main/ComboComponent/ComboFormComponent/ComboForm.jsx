import React from 'react'

import FormTable from './FormTable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';






const ComboForm = () => {
    const dispatch = useDispatch();
    dispatch(navTitle("Combo Products"))
    
    return (
        <>
            <div className="addProduct__basicTabs">
                <form>

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
                                required
                            />
                        </div>
                       

                      

                    </div>
                    <FormTable/>
                    {/* <Buttons 
                    fname="Save"
                    Sname="Cancel"/> */}
                    
                    <div>

                        <Buttons 
                    fname="Save"
                    Sname="Cancel"/>

                    </div>
                </form>
            </div>
        </>
    )
}
export default ComboForm;