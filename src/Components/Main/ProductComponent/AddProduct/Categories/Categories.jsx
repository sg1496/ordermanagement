import React, { useState } from 'react';
import "./Categories.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';

function Categories() {

    const [showSubParentCategory, setshowSubParentCategory] = useState(false);
    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));

    const handleparentCategory = (event) => {
        if (event.target.value == 1) {
            setshowSubParentCategory(true);
        } else {
            setshowSubParentCategory(false);
        }
    }

    return (
        <>
            <div className="addProduct__categoryTab">
                <form>
                    <div className="addProduct__categoryTab d-flex">
                        <div className="field_width">
                            <label htmlFor="parentCategory" className="form-label inputForm__label" >
                                Select Parent Category:
                                <span className="formRequired">*</span>
                            </label>
                            <select className="form-select " id="parentCategory"
                                onChange={handleparentCategory}>
                                <option defaultValue>Select Class</option>
                                <option value="1">Pizza</option>
                                <option value="2">Burger</option>
                                <option value="3">Wrap</option>
                                <option value="4">Sandwich</option>
                                <option value="5">Side Order</option>
                                <option value="6">Beverages</option>
                                <option value="7">Chinese</option>
                                <option value="8">Dessert</option>
                            </select>
                        </div>
                    </div>
                    {showSubParentCategory &&
                        (
                            <div className="addProduct__subcatgeoryTab py-3 d-flex">

                                <div className="addProduct__subcategoryCheckboxes d-flex align-items-center">
                                    <input type="checkbox" className='form-check-input' id='Non veg' />
                                    <label htmlFor="Non veg" className='inputFormCheckbox__label'>Non veg</label>
                                </div>
                                <div className="addProduct__subcategoryCheckboxes d-flex align-items-center">
                                    <input type="checkbox" className='form-check-input' id='veg' />
                                    <label htmlFor="veg" className='inputFormCheckbox__label'>Veg</label>
                                </div>
                            </div>
                        )}
                </form >
            </div >
        </>
    )
}

export default Categories