import React, { useState } from 'react';
import "./Variants.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';

function Variants() {

    const [enableInput, setenableInput] = useState(true);
    const [enableInput1, setenableInput1] = useState(true);
    const [enableInput2, setenableInput2] = useState(true);

    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));

    const handleonClickToggle = (event) => {
        if (event.target.checked) {
            setenableInput(false);
        } else {
            setenableInput(true);
        }
    }

    const handleonClickToggle1 = (event) => {
        if (event.target.checked) {
            setenableInput1(false);
        } else {
            setenableInput1(true);
        }
    }

    const handleonClickToggle2 = (event) => {
        if (event.target.checked) {
            setenableInput2(false);
        } else {
            setenableInput2(true);
        }
    }


    return (
        <>
            <div className='addProduct__variantsTab'>
                <form>
                    <div className="addProduct__variantsFormm">
                        <div className="addProduct__variants">
                            <table className="table m-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr.No.</th>
                                        <th scope="col">Variant Name</th>
                                        <th scope="col">Is Active?</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Sale Price</th>
                                        <th scope="col">Select Topping</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Regular</td>
                                        <td>
                                            <div className="addProduct__Variant isActive form-check form-switch">
                                                <input type="checkbox" className="form-check-input d-inline-block" onClick={handleonClickToggle} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__Variant">
                                                <input type="text" className="form-control" placeholder="0"
                                                    disabled={enableInput}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__Variant">
                                                <input type="text" className="form-control" placeholder="0"
                                                    disabled={enableInput} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__selecttopping">
                                                <select className="form-select inputForm__inputField d-inline-block" >
                                                    <option defaultValue>Select Toppings</option>
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
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Medium</td>
                                        <td>
                                            <div className="addProduct__Variant isActive form-check form-switch">
                                                <input type="checkbox" id="isActive" className="form-check-input d-inline-block"
                                                    onClick={handleonClickToggle1} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__Variant">
                                                <input type="text" className="form-control" placeholder="0"
                                                    disabled={enableInput1} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__Variant">
                                                <input type="text" className="form-control" placeholder="0"
                                                    disabled={enableInput1} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__selecttopping">
                                                <select className="form-select inputForm__inputField d-inline-block" >
                                                    <option defaultValue>Select Toppings</option>
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
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td scope="2">Large</td>
                                        <td>
                                            <div className="addProduct__Variant isActive form-check form-switch">
                                                <input type="checkbox" id="isActive" className="form-check-input d-inline-block"
                                                    onClick={handleonClickToggle2} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__Variant">
                                                <input type="text" className="form-control" placeholder="0"
                                                    disabled={enableInput2} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__Variant">
                                                <input type="text" className="form-control" placeholder="0"
                                                    disabled={enableInput2} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addProduct__selecttopping">
                                                <select className="form-select inputForm__inputField d-inline-block" >
                                                    <option defaultValue>Select Toppings</option>
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
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}

export default Variants