import { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings } from '../../../../Store/Slice/ToppingSlices';



function ToppingNames(props) {
    const dispatch = useDispatch()

    const [checkid, setcheckid] = useState([])
    console.log("checkiiiiiiiid",checkid);

    // selector
    const ToppingData = useSelector((state) => state.ToppingSlices.data)
    console.log("ToppingNames", ToppingData);

    useEffect(() => {
        dispatch(fetchApiDataToppings())
    }, [])

    const toppingNameChangeHandler = (e, check,id, index) => {
        console.log( id);
        if(check){
            checkid.push( id)
        }

        

        props.showcheck(index)
    }



    return (
        <>
            <div className='productSection__table mt-3'>
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
                                    <input className="form-check-input " type="checkbox"  onClick={(e) =>toppingNameChangeHandler(e,e.target.checked, item.toppingId,index)} />
                                </td>
                                <td>{item.toppingName}</td>
                                <td className='text-center'>
                                    {item.foodTypeId === 1?"veg":"non-veg"}
                                </td>
                            </tr>
                        }
                        )}

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ToppingNames;