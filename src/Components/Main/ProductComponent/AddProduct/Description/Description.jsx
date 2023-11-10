import React, { useState } from 'react';
import "./Description.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';

const Description = (props) =>{
    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));
    

    const [discriptionData, setDiscriptionData] = useState({
        productDescription: ""
    })

    const handleDescriptionChange = (e) => {
        let newArr ={
            ...discriptionData,
            [e.target.name ]: e.target.value
        }
        setDiscriptionData(newArr)
      
        // Call the parent function to send the description data
        props.descriptionDataHandler(newArr);
      };

      const {productDescription} = discriptionData

    return (
        <>
            <div className='addProduct__descriptionTab'>
                {/* <form> */}
                    <div className="addProduct__descriptionFormm">
                        <div className="addProduct__description">
                            <label htmlFor="description" className='form-label inputForm__label'>Description :</label>
                            <textarea
                                id="description"
                                cols="10"
                                rows="5"
                                className='form-control w-25'
                                placeholder='This product is'
                                name="productDescription"
                                value={productDescription}
                                onChange={handleDescriptionChange}
                            ></textarea>
                        </div>
                    </div>
                {/* </form> */}
            </div>
        </>
    )
}

export default Description



// const onSubmit = (event) => {
//     event.preventDefault();

//     let newProductData

//     if (Object.keys(basicEdit).length < 1) {
//         newProductData = {
//             ...data,
//             foodTypeId: parseInt(data.foodTypeId),
//             taxClassId: parseInt(data.taxClassId)
//         }
//     } else {
//         newProductData = {
//             ...data,
//             foodTypeId: parseInt(data.foodTypeId),
//             taxClassId: parseInt(data.taxClassId),
//             productId: parseInt(basicEdit.id)
//         }
//     }
//     dispatch(fetchSaveUpdateProduct(newProductData))



//     Navigate(`/product`)
//     setData({
//         productName: "",
//         isActive: false,
//         isTaxable: false,
//         foodTypeId: "",
//         showInKitchen: false,
//         taxClassId: ""
//     })

// }