import React, { useEffect } from 'react';
import tablebin from "../../../../assets/svg/tablebin.svg"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices";
import { fetchApiDataToppings } from '../../../../Store/Slice/ToppingSlices';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


function ToppingSelectionTable(props) {
    let isSaveCliked=props.isSaveClicked
    console.log('isSaveCliked',isSaveCliked)
    isSaveClicked(props.isSaveClicked)
    const dispatch = useDispatch()
    const { id } = useParams();
  
    // useState
    const [toppingCheckName, setToppingCheckName] = useState("")
    const [trial, setTrial] = useState([])


    // useEffect
    useEffect(() => {
        setToppingCheckName(props.toppingNameData)
    }, [props.toppingNameData])

    useEffect(() => {
        dispatch(fetchApiData())
        dispatch(fetchApiDataToppings())
       
    }, [])
    useEffect(() =>{ },[])
    // useSelector
    const variantSelectionTable = useSelector((state) => state.variantSlices.data);
    const dummydata = useSelector((state) => state.ToppingSlices.dummy.toppingCombinatiomQuantityList)
    // console.log("variantSelectionTable----------------------", variantSelectionTable);


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
                    let dataas = { ...item, selection: { combinationToppingId: item1.toppingId, quantity: 0, variantId: item.variantId } }
                    allda.push(dataas)
                })
            })
            setTrial(allda)
        }
    }, [variantSelectionTable, toppingCheckName]);


    const combinationChangeHandler = (e, variantId, toppingId) => {
        console.log(e.target, variantId, toppingId, trial);

        let newArr = trial.map((item, i) => {
            // {editdata combinationtime}         
            if (id && variantId == item.selection.variantId && toppingId == item.selection.combinationToppingId) {
                console.log("edit");
                return {
                    ...item,
                    selection: {
                        ToppingCombinationId: item.selection.toppingCombinationId,
                        combinationToppingId: item.selection.combinationToppingId,
                        quantity: e.target.name == 'quantity' ? parseInt(e.target.value) : item.selection.quantity,
                        variantId: item.variantId
                    }
                };
            }
            // {savedata combinationttime}
            else if (variantId == item.selection.variantId && toppingId == item.selection.combinationToppingId) {
                console.log("save");
                return ({
                    ...item,
                    selection: {

                        combinationToppingId: item.selection.combinationToppingId,
                        quantity: e.target.name == 'quantity' ? parseInt(e.target.value) : item.selection.quantity,
                        variantId: item.variantId
                    }
                });
            } else {
                return item;
            }
        });
        setTrial(newArr)
        console.log("trial before varinder   ", trial);
console.log("varinder:",newArr);
sessionStorage.setItem('tempSave',newArr)
console.log("toppingCheckName before:",toppingCheckName);
      //  
        console.log("trial    ", trial);
        console.log("toppingCheckName after:",toppingCheckName);
    }

    // functions
    const deleteHandler = (id) => {
        const deleteddata = toppingCheckName.filter(item => item.toppingId !== id);
        setToppingCheckName(deleteddata)
        props.unCheckHandler(id)
    }
    function isSaveClicked(isSaveClicked){
        if(isSaveClicked){
            alert('isSaveClicked called')
            props.combinationDataSendParent(newArr)
        }
    }

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
                                    <td className='pt-4'>{item.toppingName}--{item.toppingId}</td>
                                   
                                    {trial?.map((data, ind) => {
                                      
                                        if (item.toppingId === data.selection.combinationToppingId) {
                                            console.log("item loop: ",data);
                                            return <td key={ind}   >
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
                                                            onChange={(e) => combinationChangeHandler(e, data.variantId, item.toppingId)}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        }
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

