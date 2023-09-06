import React from 'react';
import tablebin from "../../../../assets/svg/tablebin.svg"



function ToppingSelectionTable() {
    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0 text-center'>
                    <thead>
                        <tr>
                            <th scope="col" style={{width:"30%"}} >Topping Name</th>
                            <th scope="col" style={{width:"45%"}} >Required Quantity</th>
                            <th scope="col" style={{width:"25%"}} >Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td className='pt-4'>BBQ chicken</td>
                            <td >
                                <div className='d-flex justify-content-center aligns-item-center'>
                                    <div style={{width:"100px"}} className='me-2'>
                                        <label htmlFor="product-name" className="form-label ">
                                            Small
                                        </label>
                                        <input
                                            type="text"
                                            id="product-name"
                                            className="form-control"
                                            placeholder="Pizza"

                                        />
                                    </div>
                                    <div style={{width:"100px"}} className='me-2'>
                                        <label htmlFor="product-name" className="form-label ">
                                            Medium
                                        </label>
                                        <input
                                            type="text"
                                            id="product-name"
                                            className="form-control"
                                            placeholder="Pizza"

                                        />
                                    </div>

                                    <div style={{width:"100px"}} className='me-2'>
                                        <label htmlFor="product-name" className="form-label ">
                                            Large
                                        </label>
                                        <input
                                            type="text"
                                            id="product-name"
                                            className="form-control"
                                            placeholder="Pizza"

                                        />
                                    </div>
                                </div>
                            </td>
                            <td className='pt-4'>
                                <img src={tablebin} />
                            </td>

                        </tr>
                        <tr>

                            <td className='pt-4'>Black Olive</td>
                            <td>
                                <div className='d-flex justify-content-center aligns-item-center'>
                                    <div style={{width:"100px"}} className='me-2'>
                                        <label htmlFor="product-name" className="form-label ">
                                            Small
                                        </label>
                                        <input
                                            type="text"
                                            id="product-name"
                                            className="form-control"
                                            placeholder="Pizza"

                                        />
                                    </div>
                                    <div style={{width:"100px"}} className='me-2'>
                                        <label htmlFor="product-name" className="form-label ">
                                            Medium
                                        </label>
                                        <input
                                            type="text"
                                            id="product-name"
                                            className="form-control"
                                            placeholder="Pizza"

                                        />
                                    </div>

                                    <div style={{width:"100px"}} className='me-2'>
                                        <label htmlFor="product-name" className="form-label ">
                                            Large
                                        </label>
                                        <input
                                            type="text"
                                            id="product-name"
                                            className="form-control"
                                            placeholder="Pizza"

                                        />
                                    </div>
                                </div>
                            </td>
                            <td className='pt-4'>
                                <img src={tablebin} />
                            </td>

                        </tr>
                       
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ToppingSelectionTable;
