import React, { useEffect, useState } from 'react';
import "./ToppingTable.scss";
import images from '../../../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings, fetchEditTopping, fetchDelApiDataToppings,resetStates } from '../../../../../Store/Slice/ToppingSlices';
import { useNavigate } from 'react-router-dom';


function ToppingTable() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    // useSelector
    const message = useSelector((state)=> state.ToppingSlices.message)
    const toppings = useSelector((state) => state.ToppingSlices.data)
    

// dispatch useEffect
    useEffect(() => {
        dispatch(fetchApiDataToppings())
    }, [message])



    return (
        <>
            <div className='productSection__table mt-3 '>


                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col">Topping Name</th>
                            <th scope="col">Short Code</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Topping Allowed</th>
                            <th scope="col">Food Type</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            toppings && toppings.map((item, id) => {
                                return <tr key={id}>
                                    <td scope="row">{item.toppingName}</td>
                                    <td>{item.toppingAbbr}</td>
                                    <td>{item.isActive.toString()}</td>
                                    <td>{item.isToppingAllowed.toString()}</td>
                                    <td>{item.foodTypeId === 1 ? "veg" : "non-veg"}</td>
                                    <td>
                                        <div className="productAction__buttons d-flex">
                                            <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchEditTopping(item.toppingId), navigate(`/toppingform/${item.toppingId}`)))} /></span>
                                            <span>
                                                <img src={images.deleteIcon}
                                                    alt="Delete Icon"
                                                    onClick={() => (dispatch(fetchDelApiDataToppings(item.toppingId)), dispatch(resetStates()))} />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }


                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ToppingTable
