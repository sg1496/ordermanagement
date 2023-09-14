import React, { useEffect } from 'react';
import tablebin from "../../../../assets/svg/tablebin.svg"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices"
import { useState } from 'react';

function ToppingSelectionTable(props) {
    console.log("combination props", props.combinationPropsData);

    const dispatch = useDispatch();

    // useState
    const [toppingNameDataState, setToppingNameDataState] = useState("")

    const [data, setdata] = useState([])
    const [trialdata, setTrialdata] = useState([])
    console.log("aaaaaaaaaaaaaaaaaa",trialdata);

    // useSelector
    const variantSelectionTable = useSelector((state) => state.variantSlices.data);
    console.log("anldljsdfal;jlsdafjl;av", variantSelectionTable);

    // useEffect
    useEffect(() => {
        setToppingNameDataState(props.toppingNameData);
    }, [props.toppingNameData]);

    useEffect(() => {
        dispatch(fetchApiData())
    }, [])

    // functions
    const deleteHandler = (id) => {
        const deleteddata = toppingNameDataState.filter(item => item.toppingId !== id);
        setToppingNameDataState(deleteddata)
        props.unCheckHandler(id)
    }

    useEffect(() => {
        setToppingNameDataState(props.toppingNameData);
    }, [props.toppingNameData]);

    




    const handleToppingQuantity = (e, variantId, toppingId) => {
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
                {toppingNameDataState < 1 ? "" :
                    <table className='table m-0 text-center'>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "30%" }} >Topping Name</th>
                                <th scope="col" style={{ width: "45%" }} colSpan={"3"} >Required Quantity</th>
                                <th scope="col" style={{ width: "25%" }} >Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {toppingNameDataState.map((item, index) => {
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
