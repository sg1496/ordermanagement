import { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings } from '../../../../Store/Slice/ToppingSlices';
import ToppingSelectionTable from "../ToppingRequiredTable/ToppingSelectionTable";



function ToppingNames(props) {
    const combinationPropsData = props.combinationHandler
    console.log("editStatus -------------------",combinationPropsData );

    const dispatch = useDispatch()

    const [checkid, setcheckid] = useState([])



    // selector
    const ToppingData = useSelector((state) => state.ToppingSlices.data)
    const message = useSelector((state) => state.ToppingSlices.message)


    useEffect(() => {
        dispatch(fetchApiDataToppings())
    }, [checkid])

    // useEffect(() => {
    //     dispatch(fetchApiDataToppings())
    // }, [])

    const toppingNameChangeHandler = (check, id, item) => {


        let itemselected = [...checkid]

        if (check) {
            itemselected.push(item)
            setcheckid(itemselected)
        }
        else {
            const filteredData = checkid.filter((item) => id != item.toppingId);
            setcheckid(filteredData);
        }

    }

    const unCheckHandler = (id) => {

        document.getElementById(id).checked = false;

        const uncheck = checkid.filter((item) => id != item.toppingId)

        setcheckid(uncheck)

    }

    const combinationHandler = (data) => {
        props.combinationHandlers(data)
    }


    return (
        <div className=' d-flex aligns-item-center w-100'>
            <div className='productSection__table mt-3' style={{ width: "30%" }}>
                <table className='table m-0 '>
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col" >Topping Names</th>
                            <th scope="col" className='text-center'>Food Type</th>

                        </tr>
                    </thead>
                    <tbody>

                        {ToppingData && ToppingData.map((item, index) => {
                            return <tr key={index}>
                                <td className='text-center'>
                                    <input className="form-check-input " id={item.toppingId} type="checkbox" onClick={(e) => toppingNameChangeHandler(e.target.checked, item.toppingId, item)} />
                                </td>
                                <td>{item.toppingName}</td>
                                <td className='text-center'>
                                    {item.foodTypeId === 1 ? "veg" : "non-veg"}
                                </td>
                            </tr>
                        }
                        )}

                    </tbody>
                </table>
            </div >
            <div className='ToppingSelect_table mx-5' style={{ width: "50%" }} >
                <ToppingSelectionTable
                    toppingNameData={checkid}
                    combinationHandler={combinationHandler}
                    unCheckHandler={unCheckHandler}
                    combinationPropsData={combinationPropsData}
                />
            </div>
        </div>
    )
}

export default ToppingNames;