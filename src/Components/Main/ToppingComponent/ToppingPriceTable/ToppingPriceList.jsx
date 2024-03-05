import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices"
import { useState } from 'react';
import verifyToken from '../../../SignIn/verifyToken';

function ToppingPriceList(props) {

    const loginToken = verifyToken()
    const toppingPrice = useSelector((state) => state.VariantSlices.data)
    const [toppingData, setToppingData] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchApiData(loginToken.userID))
    }, [])


    const [first, setfirst] = useState([])
    useEffect(() => {
        if (!toppingPrice || !props.allToppingData.toppingsPrices) return;
    
        const mergedArray = toppingPrice.map(obj1 => {
            const obj2 = props.allToppingData.toppingsPrices.find(obj2 => obj2.variantId === obj1.variantId) || { price: 0, quantity: 0 };
            return { ...obj1, ...obj2 };

        });      
    
        setfirst(mergedArray);
    }, [toppingPrice, props.allToppingData.toppingsPrices]);
    
    useEffect(() => {
        if (!toppingPrice) return;
    
        const finalToppingData = toppingPrice.map(item => {
            const seletedTopping = first.find(selected => selected.variantId === item.variantId) || { price: 0, quantity: 0 };
            return { ...item, seletedTopping };
        });
    
        setToppingData(finalToppingData);
    }, [toppingPrice, first]);

    const toppingPriceQuantityHandler = (e, variantId) => {
        const { name, value } = e.target;
    
        const newArr = toppingData.map(item => {
            if (item.variantId === variantId) {
                const price = name === 'price' ? parseInt(value) : item.seletedTopping.price;
                const quantity = name === 'quantity' ? parseInt(value) : item.seletedTopping.quantity;
                return { ...item, seletedTopping: { price, variantId, quantity } };
            } else {
                return item;
            }
        });
    
        setToppingData(newArr);
        props.toppingPriceHandler(newArr);
    };

    return (
        <>
            <div className='productSection__tables mt-3'>
                <table className='table common-design m-0 '>
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
                                        placeholder='0'
                                        name='price'
                                        value={item.seletedTopping.price}
                                        onChange={(e) => toppingPriceQuantityHandler(e, item.variantId)} />
                                </td>
                                <td>
                                    <input type='number'
                                        placeholder='0'
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








