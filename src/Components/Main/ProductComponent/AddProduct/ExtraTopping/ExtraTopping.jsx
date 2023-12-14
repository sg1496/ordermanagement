import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { fetchApiDataToppings } from '../../../../../Store/Slice/ToppingSlices';
import { fetchApiData } from '../../../../../Store/Slice/VariantSlices';






const ExtraTopping = (props) => {
   
    const Navigate = useNavigate()
    const dispatch = useDispatch();

    const toppingList = useSelector((topping) => topping.ToppingSlices.data)
    const variantList = useSelector((variant) => variant.variantSlices.data)


    useEffect(() => {
        dispatch(fetchApiDataToppings())
        dispatch(fetchApiData())
    }, [])


    const [extraToppingData, setExtraToppingData] = useState([]);


    useEffect(() => {
        const newdata = []
        if (toppingList && variantList && props.productFormState.productExtraToppingsList.length > 0) {
            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(variantList));
            toppingList?.map((item) => {
                
                var a = []
                var newData

                let idExist = props.productFormState.productExtraToppingsList.filter(
                    (element) => {
                        
                        if (element.combinationExtraToppingId === item.toppingId) {
                            newData = {
                                ...item
                            };
                            return newData
                        }
                    }
                );

                if (idExist.length > 0) {
                    ToppingDatafinaltemp.map((item1) => {
                        
                        item1.IsChecked = false;
                        props.productFormState.productExtraToppingsList.filter((selectedData) => {
                            
                            if (selectedData.variantId === item1.variantId && selectedData.combinationExtraToppingId === item.toppingId) {
                                item1.IsChecked = true;
                                let dataas = {
                                    ...item1,
                                    selection: {
                                        combinationToppingId: item.toppingId,
                                        variantId: item1.variantId,
                                    },
                                };
                                a.push(dataas);
                            }
                        })
                    });
                } else {
                    newData = {
                        ...item
                    };
                    ToppingDatafinaltemp.map((item1) => {
                        item1.IsChecked = false;
                        let dataas = {
                            ...item1,
                            selection: {
                                combinationToppingId: item.toppingId,
                                variantId: item1.variantId,
                            },
                        };
                        a.push(dataas);
                    });
                }
                newData = { ...newData, allTrailData: a };
                newdata.push(newData);
            });
            setExtraToppingData(newdata)
        }
        else if (toppingList && variantList) {

            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(variantList));
            toppingList?.map((item) => {
                var a = []
                var newData = {
                    ...item
                }
                ToppingDatafinaltemp.map((item1) => {
                    item1.IsChecked = false;
                    let dataas = {
                        ...item1,
                        selection: {
                            combinationToppingId: item.toppingId,
                            variantId: item1.variantId,
                        },
                    };
                    a.push(dataas);
                });
                newData = { ...newData, allTrailData: a };
                newdata.push(newData);
            });
            setExtraToppingData(newdata)
        }
    }, [toppingList, variantList])



    const categoryChangeHandler = (check, categoryId, items, id) => {
        // Update the "IsChecked" property for the clicked item
        items.IsChecked = check;

        // Create a new array based on the updated data
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
                    combinationToppingId: topping.toppingId,
                    variantId: variant.variantId,
                }));              
        });

        // Send the selected data to a handler
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

export default ExtraTopping;