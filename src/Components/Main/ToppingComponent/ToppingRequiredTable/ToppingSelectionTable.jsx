import React, { useEffect } from 'react';
import tablebin from "../../../../assets/svg/tablebin.svg"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices";
import { fetchApiDataToppings, fetchEditTopping } from '../../../../Store/Slice/ToppingSlices';
import { useState } from 'react';


function ToppingSelectionTable(props) {
    //    "props data come" =========> toppingNameData send topping value topping name check, combinationPropsData send whole data come in main form component
    console.log("combination props", props.combinationPropsData);
    const dispatch = useDispatch();

    // useState
   
    const [data, setdata] = useState([])
    const [variantfinal, setVariantFinal] = useState([])
   console.log("bbbbbbbbccccccccc", variantfinal);

    // useEffect
      useEffect(() => {
        dispatch(fetchApiDataToppings())
        
    }, [])

    useEffect(() => {
        dispatch(fetchApiData())
    }, [])

    // useSelector
    const variantSelectionTable = useSelector((state) => state.variantSlices.data);
    const ToppingData = useSelector((state) => state.ToppingSlices.data)

    useEffect(() => {
        setVariantFinal(props.toppingNameData)
        const finalToppingData = [
           
        ]

        if (ToppingData && props.combinationPropsData.toppingCombinatiomQuantityList.length > 0) {
            ToppingData.map((item) => {
                props.combinationPropsData.toppingCombinatiomQuantityList.filter((selection) => {
                    if (selection.toppingId === item.toppingId) {
                        const newObj = { ...item, selection }
                        finalToppingData.push(newObj)
                    }
                });
            })
            setVariantFinal(finalToppingData)   
        } else if (ToppingData && props.toppingNameData.length > 0) {
            ToppingData.map((item) => {
                props.toppingNameData.filter((select) => {
                    if (select.toppingId === item.toppingId) {
                        const newAdd = { ...item, select }
                        finalToppingData.push(newAdd)
                    }
                });
            })
            setVariantFinal(finalToppingData)
        }

    }, [ToppingData, props.toppingNameData])

    // functions
    const deleteHandler = (id) => {
        const deleteddata = variantfinal.filter(item => item.toppingId !== id);
        setVariantFinal(deleteddata)
        props.unCheckHandler(id)
    }

    const handleToppingQuantity = (e, variantId, toppingId) => {
        console.log(e);
        const newObj = {
            combinationToppingId: toppingId,
            quantity: e.target.value,
            variantId: variantId
        }
        let abcArray = data

        const index = data.findIndex(item => item.combinationToppingId === toppingId && item.variantId === variantId);
        if (index !== -1) {
            const arr = data;
            arr[index] = newObj;
            abcArray = arr
            setdata(arr)
        }
        if (index === -1) {
            abcArray = [...data, newObj]
            setdata(prevData => [...prevData, newObj]);
        }

        props.combinationHandler(abcArray)
    }


    return (
        <>
            <div className='productSection__table  mt-3'>
                {variantfinal < 1 ? "" :
                    <table className='table m-0 text-center'>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "30%" }} >Topping Name</th>
                                <th scope="col" style={{ width: "45%" }} colSpan={"3"} >Required Quantity</th>
                                <th scope="col" style={{ width: "25%" }} >Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {variantfinal.map((item, index) => {
                                return <tr key={index} >
                                    <td className='pt-4'>{item.toppingName}</td>
                                    {variantSelectionTable?.map((data, ind) => {
                                        return <td key={ind} >
                                            <div className='d-flex justify-content-center aligns-item-center'>
                                                <div style={{ width: "100px" }}>
                                                    <label htmlFor="product-name" className="form-label ">
                                                        {data.variantName}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={data.variantId}
                                                        className="form-control"
                                                        placeholder="Pizza"
                                                        name='quantity'
                                                        value={data.quantity}
                                                        onChange={(e) => handleToppingQuantity(e, data.variantId, item.toppingId)}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    })
                                    }
                                    <td className='pt-4'>
                                        <img src={tablebin}
                                            alt="Delete Icon"
                                            onClick={() => deleteHandler(item.toppingId)} />
                                    </td>
                                </tr>

                            })
                            }

                        </tbody>
                    </table>
                }
            </div >
        </>
    )
}

export default ToppingSelectionTable;
