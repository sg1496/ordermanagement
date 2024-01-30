import React, { useEffect } from 'react';
import './ToppingPriceList.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices"
import { fetchEditTopping } from '../../../../Store/Slice/ToppingSlices';
import { useState } from 'react';
import { useParams } from "react-router-dom"
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import verifyToken from '../../../SignIn/verifyToken';

function ToppingPriceList(props) {

    const loginToken = verifyToken()
    const { id } = useParams()
    const singleEditTopping = useSelector((state) => state.ToppingSlices.singleData)
    const toppingPrice = useSelector((state) => state.variantSlices.data)
    const [toppingData, setToppingData] = useState([])
    
console.log("ddddddddddddddddddddddddd45", toppingData)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchApiData(loginToken.userID))
    }, [])

    useEffect(() => {
        dispatch(fetchEditTopping())
    }, [])



    useEffect(() => {
        const finalToppingData = []
        console.log('props.allToppingData.toppingsPrices88888888888888888888888888888888888888888888888',props.allToppingData.toppingsPrices)
        if (toppingPrice && props.allToppingData.toppingsPrices.length > 0) {

            toppingPrice.map((item) => {
                props.allToppingData.toppingsPrices.filter((seletedTopping) => {
                    if (seletedTopping.variantId == item.variantId) {
                        const newItem = { ...item, seletedTopping }
                        finalToppingData.push(newItem)
                        
                        
                    }

                })
            })
            setToppingData(finalToppingData)
        } else if (toppingPrice) {
            toppingPrice.map((item) => {
                const newItem = { ...item, seletedTopping: { price: 0, variantId: item.variantId, quantity: 0 }}
                finalToppingData.push(newItem)
            })
            setToppingData(finalToppingData)
            
        }
    }, [toppingPrice])


    const toppingPriceQuantityHandler = (e, variantId) => {
        let newArr = toppingData.map((item, i) => {
            if (item.variantId == variantId) {
                return { ...item, seletedTopping: { price: e.target.name == 'price' ? parseInt(e.target.value) : item.seletedTopping.price, variantId: item.variantId, quantity: e.target.name == 'quantity' ? parseInt(e.target.value) : item.seletedTopping.quantity } };
            } 
            else {
                return item;
            }
        });
       
        setToppingData(newArr)
        console.log(toppingData);
        props.toppingPriceHandler(newArr);
    }
    console.log("aaaaaaaaaaabb4",toppingData);




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
                        {toppingData && toppingData?.map((item, index) => {

                            return <tr key={index} >
                                <td>{item.variantName}</td>
                                <td>
                                    <input type='number'
                                        placeholder='50'
                                        name='price'
                                        value={item.seletedTopping.price}
                                        onChange={(e) => toppingPriceQuantityHandler(e, item.variantId)} />
                                </td>
                                <td>
                                    <input type='number'
                                        placeholder='50'
                                        name='quantity'
                                        value={item.seletedTopping.quantity}
                                        onChange={(e) => toppingPriceQuantityHandler(e, item.variantId)} />
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








