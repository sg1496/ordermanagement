import React, { useEffect } from 'react';
import './ToppingPriceList.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices"
import { fetchEditTopping } from '../../../../Store/Slice/ToppingSlices';
import { useState } from 'react';
import { useParams } from "react-router-dom"


function ToppingPriceList(props) {

    const { id } = useParams()
    const singleEditTopping = useSelector((state) => state.ToppingSlices.singleData)
    const toppingPrice = useSelector((state) => state.variantSlices.data)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchApiData())
    }, [])

    useEffect(() => {
        dispatch(fetchEditTopping())
    }, [])


    const updateObjectAtIndex = (index, newObject) => {
        let newArray = [...editData];
        newArray[index] = newObject;
        seteditData(newArray);
    };

    const toppingPriceHandler = (e, index) => {
       
          return  props.toppingPriceHandler(e, index)
        }


    return (
        <>
            <div className='productSection__tables mt-3'>
                <table className='table m-0 '>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "30%" }}>Type</th>
                            <th scope="col" style={{ width: "30%" }}>Price</th>
                            <th scope="col" style={{ width: "30%" }}>Quantity</th>

                        </tr>
                    </thead>
                    <tbody>
                        {toppingPrice && toppingPrice.map((item, index) => {

                            return <tr key={index} >
                                <td>{item.variantName}</td>
                                <td>
                                    <input type='number'
                                        placeholder='50'
                                        name='price'
                                        
                                        value={item.price}
                                        onChange={(e, id) => toppingPriceHandler(e, index, item.variantId)} />
                                </td>
                                <td>
                                    <input type='number'
                                        placeholder='50'
                                        name='quantity'
                                        value={item.price}
                                        onChange={(e, id) => toppingPriceHandler(e, index, item.variantId)} />
                                </td>
                            </tr>
                        }
                        )}

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ToppingPriceList;








