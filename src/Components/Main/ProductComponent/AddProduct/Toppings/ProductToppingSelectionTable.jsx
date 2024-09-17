
import React, { useEffect } from "react";
import tablebin from '../../../../../assets/svg/tablebin.svg';
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../../../../Store/Slice/VariantSlices";
import { fetchApiDataToppings } from "../../../../../Store/Slice/ToppingSlices";
import { useParams } from "react-router-dom";
import { useState } from "react";
import verifyToken from "../../../../SignIn/verifyToken";

function ProductToppingSelectionTable(props) {

    const loginToken = verifyToken()
    const dispatch = useDispatch();
    const { id } = useParams();

    // useState
    const [toppingCheckName, setToppingCheckName] = useState("");
    const [trial, setTrial] = useState([]);


    // useEffect
    useEffect(() => {
        setToppingCheckName(props.toppingNameData);
    }, [props.toppingNameData]);

    useEffect(() => {
        dispatch(fetchApiData(loginToken.userID));
        dispatch(fetchApiDataToppings(loginToken.userID));
    }, []);

    const variantSelectionTable = useSelector((state) => state.variantSlices.data);


    useEffect(() => {
        if (!variantSelectionTable || !toppingCheckName) return;
    
        const updatedToppings = toppingCheckName.map(topping => {
            let isToppingSelected = props.selectedToppingName.some(
                selected => selected.combinationProductId === topping.toppingId
            );
    
            let toppingData = {
                ...topping,
                isRemoved: false,
                isDeleted: 0,
                selectionD: {
                    toppingId: topping.toppingId,
                    isRemoved: isToppingSelected ? props.selectedToppingName.find(
                        selected => selected.combinationProductId === topping.toppingId
                    ).isRemoved : false,
                    isDeleted: isToppingSelected ? props.selectedToppingName.find(
                        selected => selected.combinationProductId === topping.toppingId
                    ).isDeleted : 0,
                },
            };
    
            let variants = variantSelectionTable.map(variant => {
                let selectedTopping = props.selectedToppingName.find(
                    selected => selected.variantId === variant.variantId &&
                        selected.combinationProductId === topping.toppingId
                );
    
                return {
                    ...variant,
                    selection: {
                        productCombinationId: selectedTopping ? selectedTopping.productCombinationId : 0,
                        combinationProductId: topping.toppingId,
                        quantity: selectedTopping ? selectedTopping.quantity : 0,
                        variantId: variant.variantId,
                        isRemoved: selectedTopping ? selectedTopping.isRemoved : false,
                    },
                };
            });
    
            return { ...toppingData, allTrailData: variants };
        });
    
        setTrial(updatedToppings);
    }, [variantSelectionTable, toppingCheckName, props.selectedToppingName]);

    const combinationChangeHandler = (e, variantId, toppingId) => {
        let newArr = trial.map((item, i) => {
            if (item.toppingId === toppingId) {
                var c = [];
                item.allTrailData.map((traildata, ind) => {

                    if (traildata.variantId === variantId) {
                        var t = {
                            ...traildata,
                            selection: {
                                productCombinationId: traildata.selection.productCombinationId,
                                combinationProductId: toppingId,
                                quantity: parseInt(e.target.value),
                                variantId: traildata.variantId,
                            },
                        };
                        c.push(t);
                    } else {
                        var t = {
                            ...traildata,
                            selection: {
                                productCombinationId: traildata.selection.productCombinationId,
                                combinationProductId: toppingId,
                                quantity: traildata.selection.quantity,
                                variantId: traildata.variantId,

                            },
                        };
                        c.push(t);
                    }
                });
                return { ...item, allTrailData: c };
            } else if (item.toppingId === toppingId) {
                var c = [];
                item.allTrailData.map((traildata, ind) => {
                    if (traildata.variantId === variantId) {
                        var t = {
                            ...traildata,
                            selection: {
                                productCombinationId: 0,
                                combinationProductId: toppingId,
                                quantity: parseInt(e.target.value),
                                variantId: traildata.variantId,

                            },
                        };
                        c.push(t);
                    }
                });
                return { ...item, allTrailData: c };
            }
            else {
                return item;
            }
        });
        setTrial(newArr);
        props.combinationDataSendParent(newArr);
    };


    const toppingNameChangeHandler = (id, e, item) => {
        let newArr = trial.map((topping) => {
            if (topping.toppingId === id) {
                return {
                    ...topping,
                    selectionD: {
                        ...topping.selectionD,
                        isRemoved: e.target.name === 'isRemoved' ? e.target.checked : topping.selectionD.isRemoved,
                        isDeleted: 1 // Not sure if this property is necessary for your case
                    }
                };
            }
            return topping;
        });


        setTrial(newArr);
        props.combinationDataSendParent(newArr);
    };



    return (
        <>
            <div className="productSection__table  mt-3">
                {toppingCheckName < 1 ? (
                    ""
                ) : (
                    <table className="table m-0 text-center">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "30%" }}>
                                    Topping Name
                                </th>
                                <th scope="col" style={{ width: "45%" }} colSpan={"3"}>
                                    Required Quantity
                                </th>
                                <th scope="col">
                                    isRemoved
                                </th>
                                <th scope="col" style={{ width: "25%" }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {trial?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="pt-4">
                                            {item.toppingName}
                                        </td>

                                        {item?.allTrailData.map((data, ind) => {
                                            return (
                                                <td key={ind}>
                                                    <div className="d-flex justify-content-center aligns-item-center">
                                                        <div style={{ width: "100px" }}>
                                                            <label
                                                                htmlFor="product-name"
                                                                className="form-label "
                                                            >
                                                                {data.variantName}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id={data.variantId}
                                                                className="form-control"
                                                                placeholder="Pizza"
                                                                name="quantity"
                                                                value={data.selection.quantity}
                                                                onChange={(e) =>
                                                                    combinationChangeHandler(
                                                                        e,
                                                                        data.variantId,
                                                                        item.toppingId
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        })}

                                        <td className="pt-4">
                                            <div className="form-check form-switchs pt-1 ms-4 abc">
                                                <input
                                                    type="checkbox"
                                                    id={`isActive${index}`}
                                                    className="form-check-input p-2 toggle_btn"
                                                    name="isRemoved"
                                                    checked={item.selectionD.isRemoved}
                                                    onChange={(e) => toppingNameChangeHandler(item.toppingId, e, item)}
                                                />
                                            </div>
                                        </td>
                                        <td className="pt-4">
                                            <img
                                                src={tablebin}
                                                alt="Delete Icon"
                                                onClick={(e) => (toppingNameChangeHandler(item.toppingId, e, null,), props.unCheckHandler(item.toppingId))}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default ProductToppingSelectionTable;