import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import CheckBox from "../../../CheckBox/CheckBox"






const ExtraTopping = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch();


    return (
        <>

            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col" style={{width:"25%"}}>Topping Name</th>
                            <th scope="col" className='text-center' style={{width:"25%"}}>Food Type</th>
                            <th scope="col" className='text-center' style={{width:"50%"}}>Variants</th>
                        </tr>
                    </thead>
                    <tbody>


                        <tr >
                            <td>BBQ chicken</td>
                            <td className='text-center'>Non-Veg</td>
                            <td className='text-center'>
                                <div className='d-flex justify-content-center '  >
                                    <div className='d-flex mx-5 '>
                                        <div className='text-center mx-2'>
                                            <CheckBox/>
                                        </div>
                                        <div>Variant 1</div>

                                    </div>
                                    <div className='d-flex mx-5' >
                                        <div className='text-center mx-2'>
                                          <CheckBox/>
                                        </div>
                                        <div>Variant 2</div>

                                    </div>
                                    <div className='d-flex mx-5'>
                                        <div className='text-center mx-2'>
                                           <CheckBox/>
                                        </div>
                                        <div>Variant 3</div>

                                    </div>
                                </div>
                            </td>

                        </tr>

                        <tr >
                            <td>Olive</td>
                            <td className='text-center'>Veg</td>
                            <td className='text-center'>
                                <div className='d-flex justify-content-center '  >
                                    <div className='d-flex mx-5 '>
                                        <div className='text-center mx-2'>
                                            <CheckBox/>
                                        </div>
                                        <div>Variant 1</div>

                                    </div>
                                    <div className='d-flex mx-5' >
                                        <div className='text-center mx-2'>
                                          <CheckBox/>
                                        </div>
                                        <div>Variant 2</div>

                                    </div>
                                    <div className='d-flex mx-5'>
                                        <div className='text-center mx-2'>
                                           <CheckBox/>
                                        </div>
                                        <div>Variant 3</div>

                                    </div>
                                </div>
                            </td>

                        </tr>

                        <tr >
                            <td>Cucumber</td>
                            <td className='text-center'>Veg</td>
                            <td className='text-center'>
                                <div className='d-flex justify-content-center '  >
                                    <div className='d-flex mx-5 '>
                                        <div className='text-center mx-2'>
                                            <CheckBox/>
                                        </div>
                                        <div>Variant 1</div>

                                    </div>
                                    <div className='d-flex mx-5' >
                                        <div className='text-center mx-2'>
                                          <CheckBox/>
                                        </div>
                                        <div>Variant 2</div>

                                    </div>
                                    <div className='d-flex mx-5'>
                                        <div className='text-center mx-2'>
                                           <CheckBox/>
                                        </div>
                                        <div>Variant 3</div>

                                    </div>
                                </div>
                            </td>

                        </tr>
                        

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ExtraTopping;