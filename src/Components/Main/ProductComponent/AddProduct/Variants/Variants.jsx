import React, { useState, useEffect } from 'react';
import "./Variants.scss";
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';
import { fetchApiData } from '../../../../../Store/Slice/VariantSlices';
import { fetchApiDataToppings } from '../../../../../Store/Slice/ToppingSlices';
import verifyToken from '../../../../SignIn/verifyToken';

function Variants(props) {

    const loginToken = verifyToken()
    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));

    const [variantData, setVariantData] = useState([])
    const [mergedVariants, setMergedVariants] = useState([])


    const variantList = useSelector((variant) => variant.VariantSlices.data)
    const toppingList = useSelector((topping) => topping.ToppingSlices.data)

    useEffect(() => {
        dispatch(fetchApiData(loginToken.userID))
        dispatch(fetchApiDataToppings(loginToken.userID))
    }, [])

    useEffect(() => {
        if (!variantList || !props.productFormState.productVariantList) return;
    
        const mergedVariants = variantList.map(variant => {
            const selectvariant = props.productFormState.productVariantList.find(item => item.variantId === variant.variantId) || { price: 0, salePrice: 0, toppingId: "", isActive: false };
            return { ...variant, ...selectvariant };
        });
        setMergedVariants(mergedVariants);
    
    }, [variantList, props.productFormState.productVariantList]);
    
    console.log("Merged variants:", mergedVariants);
    
    useEffect(() => {
        if (!variantList || !mergedVariants) return;
    
        const variantData = variantList.map(variantItem => {
            const selectvariant = mergedVariants.find(item => item.variantId === variantItem.variantId) || { price: 0, salePrice: 0, toppingId: "", isActive: false };
            return { ...variantItem, selectvariant };
        });
    
        setVariantData(variantData);
    
    }, [variantList, mergedVariants]);

    const changeHandler = (e, id) => {
        let newArr = variantData?.map((item) => {

            if (item.variantId === id) {
                return {
                    ...item,
                    selectvariant: {
                        price: e.target.name == 'price' ? parseInt(e.target.value) : item.selectvariant.price,
                        variantId: item.variantId,
                        salePrice: e.target.name == 'salePrice' ? parseInt(e.target.value) : item.selectvariant.salePrice,
                        toppingId: e.target.name == 'toppingId' ? parseInt(e.target.value) : item.selectvariant.toppingId,
                        isActive: e.target.name === 'isActive' ? e.target.checked : item.selectvariant.isActive,
                    }
                };
            } else {
                return item;
            }
        })
        setVariantData(newArr)

        props.variantDataHandler(newArr)
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
                                    {variantData?.map((item, index) => {console.log("check avtive", item)

                                        return <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.variantName}</td>
                                            <td>
                                                <div className="addProduct__Variant isActive form-check form-switch">
                                                    <input type="checkbox"
                                                        name='isActive'
                                                        className="form-check-input d-inline-block"
                                                        checked={item.selectvariant.isActive}
                                                        onChange={(e) => { changeHandler(e, item.variantId) }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="addProduct__Variant">
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="0"
                                                        name='price'
                                                        value={item.selectvariant.price}
                                                        onChange={(e) => { changeHandler(e, item.variantId) }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="addProduct__Variant">
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="0"
                                                        name='salePrice'
                                                        value={item.selectvariant.salePrice}
                                                        onChange={(e) => { changeHandler(e, item.variantId) }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="addProduct__selecttopping">
                                                    <select
                                                        className="form-select inputForm__inputField d-inline-block"
                                                        name='toppingId'
                                                        value={item.selectvariant.toppingId}
                                                        onChange={(e) => changeHandler(e, item.variantId)}
                                                    >
                                                        <option defaultValue>Select Toppings</option>
                                                        {toppingList?.map((item, index) => {
                                                            return <option
                                                                key={index}
                                                                value={item.toppingId}
                                                            >
                                                                {item.toppingName}
                                                            </option>
                                                        })
                                                        }

                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                    }
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