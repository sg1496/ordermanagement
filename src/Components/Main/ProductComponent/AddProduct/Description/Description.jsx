import React from 'react';
import "./Description.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';

function Description(props) {
    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));

    const handleDescriptionChange = (e) => {
        const descriptionValue = e.target.value;
      
        // Call the parent function to send the description data
        props.descriptionDataHandler(descriptionValue);
      };

    return (
        <>
            <div className='addProduct__descriptionTab'>
                <form>
                    <div className="addProduct__descriptionFormm">
                        <div className="addProduct__description">
                            <label htmlFor="description" className='form-label inputForm__label'>Description :</label>
                            <textarea name=""
                                id="description"
                                cols="10"
                                rows="5"
                                className='form-control w-25'
                                placeholder='This product is'
                                onChange={handleDescriptionChange}
                            ></textarea>
                        </div>
                    </div>
                </form>
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