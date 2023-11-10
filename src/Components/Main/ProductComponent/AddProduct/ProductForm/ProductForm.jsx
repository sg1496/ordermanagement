import React, { useState, useCallback } from 'react'
import Description from '../Description/Description'
import Categories from '../Categories/Categories'
import Variants from '../Variants/Variants'
import Basic from '../Basic/Basic'
import Buttons from '../../Buttons/NewButtons'
import ProductToppingsNames from '../Toppings/ProductToppingsNames'
import ExtraTopping from '../ExtraTopping/ExtraTopping'
import { useParams } from 'react-router-dom'

const ProductForm = (props) => {
    const edit = useParams()

    const [productFormData, setProductFormData] = useState({

        productName: "",
        isActive: false,
        isTaxable: false,
        taxClassId: '',
        foodTypeId: '',
        loginUserID: 5,
        showInKitchen: false,
        productDescription: "",
        parentCategoryId: '',
        editProductCategory: [],
        productVariantList: [],
        productToppingsList: [],
        productExtraToppingsList: []

    })
    console.log("finalstate", productFormData)


    const basicFormDataHandler = useCallback((data) => {
        setProductFormData(data)

    }, [])

    const handleDescriptionData = useCallback((data) => {
        setProductFormData(data)

    }, [])

    const categoriesDataHandler = useCallback((data) => {

        const categoriesList = [];
        data?.map((catagory) => {
            categoriesList.push(catagory.selectcategory)
        })
        setProductFormData({ ...productFormData, productCategoryList: categoriesList })
    }, [])

    const variantDataHandler = useCallback((vdata) => {

        const variantDataList = [];
        vdata?.map((variant) => {
            variantDataList.push(variant.selectvariant)
        })
        setProductFormData({ ...productFormData, productVariantList: variantDataList })
    }, [])

    const extraToppingDataHandler = useCallback((Edata) => {

        console.log("aaaab", Edata)
        const extratoppingDataList = [];
        Edata?.map((extra) => {
            extratoppingDataList.push(extra)
        })
        setProductFormData({ ...productFormData, productExtraToppingsList: extratoppingDataList })
    }, [])

    const combinationDataNameSend = useCallback((Tdata) => {
        console.log("page no 5558", Tdata)
        const combinationDataList = [];
        Tdata?.map((combination) => {
            console.log("page12", combination)
            combination.allTrailData.map((combinationTrail) => {
                console.log("page15", combinationTrail.selection)
                // if (combinationTrail.selection.combinationProductId === combination.toppingId) {
                    var newItem = { ...combinationTrail.selection, ...combination.selectionD }
                    combinationDataList.push(newItem)
                // }
            })

        })
        console.log("page447", combinationDataList)
        setProductFormData({ ...productFormData, productToppingsList: combinationDataList })

    }, [])

    const onSubmit = (e) => {
        e.PreventDefault()
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    {/* <Basic basicFormDataHandler={basicFormDataHandler} />
                  <Description descriptionDataHandler={handleDescriptionData} />
                 <Categories  categoriesDataHandler = {categoriesDataHandler}/>
                  <Variants variantDataHandler = {variantDataHandler} />
                <ProductToppingsNames />
                 <ExtraTopping /> */}
                    {props.step === 1 && <Basic basicFormDataHandler={basicFormDataHandler} />}
                    {props.step === 2 && <Description descriptionDataHandler={handleDescriptionData} />}
                    {props.step === 3 && <Categories categoriesDataHandler={categoriesDataHandler} />}
                    {props.step === 4 && <Variants variantDataHandler={variantDataHandler} />}
                    {props.step === 5 && <ProductToppingsNames
                        combinationDataNameSend={combinationDataNameSend}
                        combinationHandler={productFormData}
                    />}
                    {props.step === 6 && <ExtraTopping extraToppingDataHandler={extraToppingDataHandler} />}

                </div>
                <div>

                    <Buttons fname="Save"
                        Sname="Cancel"



                    />
                </div>
            </form>
        </>
    )
}

export default ProductForm