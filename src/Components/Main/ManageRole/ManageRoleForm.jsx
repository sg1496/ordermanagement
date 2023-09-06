import React from 'react'
import './ManageRoleForm.scss'
import ManageRoleTable from './ManageRoleTable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../Store/Slice/NavSlices';
import Buttons from '../ProductComponent/Buttons/NewButtons';



const ManageRoleForm = () => {
    const dispatch = useDispatch();
    dispatch(navTitle("Manage Role"));
    return (
        <>
            <div className="addProduct__basicTabs">
                <form>

                    <div className="addProduct__basic   d-flex">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Role Name:
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
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Role Level:
                                <span className="formRequired">*</span>
                            </label>
                            <select className="form-select " id="taxClass" >
                                <option defaultValue>Select Category</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                                <option value="Three">three</option>
                            </select>
                        </div>

                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Is Admin?: *
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                            />
                        </div>

                    </div>
                    <ManageRoleTable/>
                    <div>

                        <Buttons fname="Save"
                            Sname="Cancel" />

                    </div>
                </form>
            </div>
        </>
    )
}
export default ManageRoleForm;