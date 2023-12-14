import React, { useState } from 'react';
import "./Description.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';

const Description = (props) =>{
    
    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));
    

    const handleDescriptionChange = (e) => {
        let newArr ={
            ...props.productFormState,
            [e.target.name ]: e.target.value
        }
        props.descriptionDataHandler(newArr);
      };

   

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
                                value={props.productFormState.productDescription}
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