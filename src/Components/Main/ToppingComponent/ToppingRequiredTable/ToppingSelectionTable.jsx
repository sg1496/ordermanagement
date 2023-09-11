import React, { useEffect } from 'react';
import tablebin from "../../../../assets/svg/tablebin.svg"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from "../../../../Store/Slice/VariantSlices"
import { useState } from 'react';



function ToppingSelectionTable(props) {
    const dispatch =  useDispatch()
    let ToppingNameProps = props;

    // useSelector
    const variantSelectionTable = useSelector((state)=> state.variantSlices.data);

    const [propsVariantCombine, setPropsVariantCombine] = useState([])
    console.log("staaaaaaaaaaaaaaaaate1", variantSelectionTable)
    


    
    
    

    useEffect(() => {
      dispatch(fetchApiData())
     
    }, [])
    
    

    return (
        <>
            <div className='productSection__table mt-3'>
            {ToppingNameProps.toppingNameData<1?"" :<table className='table m-0 text-center'>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: "30%" }} >Topping Name</th>
                            <th scope="col" style={{ width: "45%" }} >Required Quantity</th>
                            <th scope="col" style={{ width: "25%" }} >Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        { ToppingNameProps.toppingNameData?.map((item, index)=>{
                           return <tr key={index} >
                                <td className='pt-4'>{item.toppingName}</td>
                                <td >
                                    <div className='d-flex justify-content-center aligns-item-center'>
                                        <div style={{ width: "100px" }} className='me-2'>
                                            <label htmlFor="product-name" className="form-label ">
                                                Small
                                            </label>
                                            <input
                                                type="text"
                                                id="product-name"
                                                className="form-control"
                                                placeholder="Pizza"

                                            />
                                        </div>
                                        <div style={{ width: "100px" }} className='me-2'>
                                            <label htmlFor="product-name" className="form-label ">
                                                Medium
                                            </label>
                                            <input
                                                type="text"
                                                id="product-name"
                                                className="form-control"
                                                placeholder="Pizza"

                                            />
                                        </div>

                                        <div style={{ width: "100px" }} className='me-2'>
                                            <label htmlFor="product-name" className="form-label ">
                                                Large
                                            </label>
                                            <input
                                                type="text"
                                                id="product-name"
                                                className="form-control"
                                                placeholder="Pizza"

                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className='pt-4'>
                                    <img src={tablebin} />
                                </td>

                            </tr>
                           
                         })    
                        } 

                    </tbody>
                </table> }
            </div >
        </>
    )
}

export default ToppingSelectionTable;
