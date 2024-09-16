import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { fetchApiDataToppings } from '../../../../../Store/Slice/ToppingSlices';
import { fetchApiData } from '../../../../../Store/Slice/VariantSlices';
import verifyToken from '../../../../SignIn/verifyToken';

const ExtraTopping = (props) => {
    const loginToken = verifyToken()
    const Navigate = useNavigate()
    const dispatch = useDispatch();

    const toppingList = useSelector((topping) => topping.ToppingSlices.data)
    const variantList = useSelector((variant) => variant.variantSlices.data)

    useEffect(() => {
        dispatch(fetchApiDataToppings(loginToken.userID))
        dispatch(fetchApiData(loginToken.userID))
    }, [])

    const [extraToppingData, setExtraToppingData] = useState([]);

    useEffect(() => {
        if (!toppingList || !variantList) return;
    
        const newData = toppingList.map((topping) => {
            const a = variantList.map((variant) => {
                const isChecked = props.productFormState.productExtraToppingsList.some(
                    (selectedData) =>
                        selectedData.variantId === variant.variantId &&
                        selectedData.combinationExtraToppingId === topping.toppingId
                );
    
                return {
                    ...variant,
                    IsChecked: isChecked,
                    selection: {
                        combinationExtraToppingId: topping.toppingId,
                        variantId: variant.variantId,
                    },
                };
            });
    
            return {
                ...topping,
                allTrailData: a,
            };
        });
    
        setExtraToppingData(newData);
    }, [toppingList, variantList, props.productFormState.productExtraToppingsList]);



    const categoryChangeHandler = (check, categoryId, items, id) => {
        items.IsChecked = check;

        const updatedExtraToppingData = extraToppingData.map((topping) => {
            if (topping.toppingId === id) {
                return {
                    ...topping,
                    allTrailData: topping.allTrailData.map((variant) => {
                        if (variant.variantId === categoryId) {
                            return {
                                ...variant,
                                IsChecked: check,
                            };
                        }
                        return variant;
                    }),
                };
            }
            return topping;
        });

        setExtraToppingData(updatedExtraToppingData);

        // Extract selected data
        const selectedData = updatedExtraToppingData.flatMap((topping) => {
            return topping.allTrailData.filter((variant) => variant.IsChecked)
                .map((variant) => ({
                    combinationExtraToppingId: topping.toppingId,
                    variantId: variant.variantId,
                }));
        });
        props.extraToppingDataHandler(selectedData);
    };

    return (
        <>

            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "25%" }}>Topping Name</th>
                            <th scope="col" className='text-center' style={{ width: "25%" }}>Food Type</th>
                            <th scope="col" className='text-center' style={{ width: "50%" }} colSpan={"3"}>Variants</th>
                        </tr>
                    </thead>
                    <tbody>


                        {extraToppingData?.map((topping, index) => {
                            return <tr key={index} >
                                <td>{topping.toppingName}</td>
                                <td className='text-center'>{topping.foodTypeId === 1 ? "veg" : "non-veg"}</td>
                                {topping.allTrailData?.map((variant, ind) => {
                                    return <td className='text-center' key={ind}>
                                        <div className='d-flex justify-content-center '  >
                                            <div className='addProduct__subcategoryCheckboxes  mx-2'>
                                                <input className="form-check-input "
                                                    type="checkbox"
                                                    name="toppingType"
                                                    checked={variant.IsChecked}
                                                    onChange={(e) => categoryChangeHandler(e.target.checked, variant.variantId, variant, topping.toppingId)}
                                                />
                                            </div>
                                            <label
                                                htmlFor="product-name"
                                                className="form-label "
                                            >
                                                {variant.variantName}
                                            </label>

                                        </div>
                                    </td>
                                })
                                }
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default React.memo(ExtraTopping);