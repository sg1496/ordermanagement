import React from 'react'
import Description from '../Description/Description'
import Categories from '../Categories/Categories'
import Variants from '../Variants/Variants'
import Basic from '../Basic/Basic'
import Buttons from '../../Buttons/NewButtons'
import ProductToppingsNames from '../Toppings/ProductToppingsNames'
import ExtraTopping from '../ExtraTopping/ExtraTopping'

const ProductForm = (props) => {

    const basicFormDataHandler = ( data) => {
console.log("first", data)
    }

    const handleDescriptionData = (data) => {
        console.log(" description", data)
    }

    return (
        <>
            <div>
                {props.step === 1 && <Basic basicFormDataHandler={basicFormDataHandler} />}
                {props.step === 2 && <Description  descriptionDataHandler={handleDescriptionData}/>}
                {props.step === 3 && <Categories />}
                {props.step === 4 && <Variants />}
                {props.step === 5 && <ProductToppingsNames />}
                {props.step === 6 && <ExtraTopping />}

            </div>
            <div>

                <Buttons fname="Save"
                    Sname="Cancel"

                />
            </div>
        </>
    )
}

export default ProductForm