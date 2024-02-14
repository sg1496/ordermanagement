import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../Store/Slice/NavSlices';
import Buttons from '../ProductComponent/Buttons/NewButtons';

const RewardProgram = () => {
    const [checked, setchecked] = useState(false)
    const dispatch = useDispatch()
    dispatch(navTitle("Settings"))
    return (
        <>
            <div className="addProduct__basicTab">
                <form>

                    <div className="addProduct__basicForm d-flex mb-5">


                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Reward Programs:
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                                onChange={(e) => setchecked(!checked)}

                            />
                        </div>
                    </div>

                    <div>
                        <ul className='mb-3' >
                            <li className='mb-3'>
                                <p>
                                    On each
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field' disabled={!checked} />
                                    spent user will get
                                    <input type='number' style={{ width: "80px" }} placeholder='100' disabled={!checked} className='input_field' />
                                </p>
                            </li>
                            <li className='mb-3'>
                                <p>
                                    1 Point is equall to Rs
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field' disabled={!checked} />
                                </p>
                            </li>
                            <li className='mb-3'>
                                <p>
                                    Minimum points for redemption
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field' disabled={!checked} />
                                </p>
                            </li>
                            <li className='mb-3'>
                                <p>
                                    User can reedem points in multiple of
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field' disabled={!checked} />
                                </p>
                            </li>
                            <li className='mb-3'>
                                <p>
                                    On birthday user will get
                                    <input type='number' placeholder='100' style={{ width: "80px" }} className='input_field' disabled={!checked} />
                                    Points extra if minimum order value is
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field' disabled={!checked} />
                                </p>
                            </li>
                            <li className='mb-3'>
                                <p>
                                    On anniversary user will get
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field ' disabled={!checked} />
                                    Points extra if minimum order value is
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field' disabled={!checked} />
                                </p>
                            </li>
                            <li className='mb-3'>
                                <p>
                                    Points will expire after
                                    <input type='number' style={{ width: "80px" }} placeholder='100' className='input_field' disabled={!checked} />
                                    days
                                </p>
                            </li>

                        </ul>

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
export default RewardProgram;