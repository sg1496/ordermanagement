import React, { useEffect } from 'react';
import tablebin from "../../../../assets/svg/tablebin.svg"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices";
import { fetchApiDataToppings, fetchEditTopping } from '../../../../Store/Slice/ToppingSlices';

import { useState } from 'react';


function ToppingSelectionTable(props) {
    //    "props data come" =========> toppingNameData send topping value topping name check, combinationPropsData send whole data come in main form component
    // console.log("combination props", props.combinationPropsData);
    const dispatch = useDispatch();

    // useState
    const [toppingCheckName, setToppingCheckName] = useState("")
    const [data, setdata] = useState([])
    const [trial, setTrial] = useState([])
    // console.log("mmmmmmmmmmmnnnnnnn", trial);



    // useEffect

    useEffect(() => {
        setToppingCheckName(props.toppingNameData)
    }, [props.toppingNameData])

    useEffect(() => {
        dispatch(fetchApiData())
        dispatch(fetchApiDataToppings())

    }, [])





    // useSelector
    const variantSelectionTable = useSelector((state) => state.variantSlices.data);
    const dummydata =  useSelector((state)=> state.ToppingSlices.dummy.toppingCombinatiomQuantityList)
    // console.log("variantSelectionTable----------------------",dummydata);
    console.log("variantSelectionTable----------------------",variantSelectionTable);
    
    

    useEffect(() => {
        const allda = [];
        if (variantSelectionTable && toppingCheckName && props.combinationPropsData.toppingCombinatiomQuantityList.length > 0) {
            toppingCheckName.map((item2) => {
            variantSelectionTable.map((item1) => {
                    dummydata.filter((selection) => {
                        if (selection.combinationToppingId === item2.toppingId && selection.variantId === item1.variantId) {
                           
                            const newItem = { ...item1, selection }
                           
                            allda.push(newItem)
                           
                        }
                        
                    })
                })
            })
            setTrial(allda)
        } else if (variantSelectionTable && toppingCheckName) {
            
             toppingCheckName.map((item1) => {
             variantSelectionTable.map((item) => {
                let dataas = { ...item, selection: { combinationToppingId: item1.toppingId, quantity: "", variantId: item.variantId } }
                allda.push(dataas)
            })
            
            
           return 
        })
        setTrial(allda)
        }
    }, [variantSelectionTable, toppingCheckName])

    const combinationChangeHandler = (e,  variantId,toppingId,data) => {
        // console.log("44444444444",data);
        
        let newArr = trial.map((item , i) => {            
            if ( variantId == item.variantId  ) {
                // console.log("true");
                return {
                    ...item,
                    selection: {    
                        ToppingCombinationId: 85,
                        combinationToppingId: item.selection.combinationToppingId,           
                        quantity: e.target.name == 'quantity' ? parseInt(e.target.value) : item.selection.quantity,
                        variantId:item.variantId                        
                    }
                };
            } else {
                // console.log("false");
                return item;
            }

        });
        setTrial(newArr)
        props.combinationDataSendParent(newArr)
    }

    // functions
    const deleteHandler = (id) => {
        const deleteddata = toppingCheckName.filter(item => item.toppingId !== id);
        setToppingCheckName(deleteddata)
        props.unCheckHandler(id)
    }

    // const handleToppingQuantity = (e, variantId, toppingId) => {
   
    //     const newObj = {
    //         combinationToppingId: toppingId,
    //         quantity: e.target.value,
    //         variantId: variantId
    //     }
    //     let abcArray = data

    //     const index = data.findIndex(item => item.combinationToppingId === toppingId && item.variantId === variantId);
    //     if (index !== -1) {
    //         const arr = data;
    //         arr[index] = newObj; x
    //         abcArray = arr
    //         setdata(arr)
    //     }
    //     if (index === -1) {
    //         abcArray = [...data, newObj]
    //         setdata(prevData => [...prevData, newObj]);
    //     }

    //     props.combinationHandler(abcArray)
    // }


    return (
        <>
            <div className='productSection__table  mt-3'>
                {toppingCheckName < 1 ? "" :
                    <table className='table m-0 text-center'>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "30%" }} >Topping Name</th>
                                <th scope="col" style={{ width: "45%" }} colSpan={"3"} >Required Quantity</th>
                                <th scope="col" style={{ width: "25%" }} >Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {toppingCheckName.map((item, index) => {
                                return <tr key={index} >
                                    <td className='pt-4'>{item.toppingName}</td>
                                    {trial?.map((data, ind) => {
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
                                                        value={data.selection.quantity}
                                                        onChange={(e) => combinationChangeHandler(e, data.variantId, item.toppingId,data)}
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
