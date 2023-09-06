import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings } from '../../../../Store/Slice/ToppingSlices';



function ToppingNames(props) {
    const dispatch = useDispatch()

    const ToppingData = useSelector((state) => state.ToppingSlices.data)
    console.log("ToppingNames", ToppingData);

    useEffect(() => {
        dispatch(fetchApiDataToppings())
    }, [])



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
                                    <input className="form-check-input " type="checkbox"  onClick={() =>(props.showcheck(index))} />
                                    {/* <input className="form-check-input " type="checkbox"  onClick={() =>console.log(index)} /> */}
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