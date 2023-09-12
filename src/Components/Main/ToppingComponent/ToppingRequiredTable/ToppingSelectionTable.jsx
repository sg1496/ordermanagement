import React, { useEffect } from 'react';
import tablebin from "../../../../assets/svg/tablebin.svg"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices"
import { useState } from 'react';

function ToppingSelectionTable(props) {
const dispatch = useDispatch();

    // useState
    const [toppingNameDataState, setToppingNameDataState] = useState(props.toppingNameData)

    // useSelector
    const variantSelectionTable = useSelector((state) => state.variantSlices.data);

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

    const ToppingSelectionTable = (e, id) => { 
        console.log(e, id);
        let newArr = toppingNameDataState.map((item, i) => {
            if (item.variantId == id) {
                return { ...item, seletedTopping:{ variantId: item.variantId, quantity: e.target.name == 'quantity' ? parseInt(e.target.value) : item.seletedTopping.quantity}};
            } else {
                return item;
            }
            });

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
                            {toppingNameDataState?.map((item, index) => {
                                return <tr key={index} >
                                    <td className='pt-4'>{item.toppingName}</td>
                                    {variantSelectionTable?.map((data, ind) => {
                                        return <td key={ind}>
                                            <div className='d-flex justify-content-center aligns-item-center'>
                                                <div style={{ width: "100px" }}>
                                                    <label htmlFor="product-name" className="form-label ">
                                                        {data.variantName}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Pizza"
                                                        name='quantity'
                                                        value={item.quantity}
                                                        onChange={(e)=>ToppingSelectionTable(e,data.variantId)}
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
