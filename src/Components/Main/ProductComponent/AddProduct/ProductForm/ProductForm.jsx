import React, { useState, useCallback } from 'react'
import Description from '../Description/Description'
import Categories from '../Categories/Categories'
import Variants from '../Variants/Variants'
import Basic from '../Basic/Basic'
import Buttons from '../../Buttons/NewButtons'
import ProductToppingsNames from '../Toppings/ProductToppingsNames'
import ExtraTopping from '../ExtraTopping/ExtraTopping'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditProduct, fetchSaveUpdateProduct } from '../../../../../Store/Slice/ProductSlices'
import verifyToken from '../../../../SignIn/verifyToken'
import { resetStates } from '../../../../../Store/Slice/CategorySlices'

const ProductForm = (props) => {
    const loginToken = verifyToken()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const edit = useParams()

    const [productFormData, setProductFormData] = useState({

        productName: "",
        isActive: false,
        isTaxable: false,
        taxClassId: '',
        foodTypeId: '',
        showInKitchen: false,
        parentCategoryId: 0,
        productDescription: "",
        editProductCategory: [],
        productVariantList: [],
        productToppingsList: [],
        productExtraToppingsList: []

    })

    console.log("finalstate", productFormData)

    useEffect(() => {
        if (edit.id != undefined) {
            dispatch(fetchEditProduct(edit.id))
        }
    }, [edit])

    const singleEditDataProduct = useSelector((product) => product.ProductSlices.singleData)
    

    useEffect(() => {
        !singleEditDataProduct ? setProductFormData({
            ...productFormData
        }) : setProductFormData({
            productName: singleEditDataProduct.singleProductList[0].productName,
            isActive: singleEditDataProduct.singleProductList[0].isActive,
            isTaxable: singleEditDataProduct.singleProductList[0].isTaxable,
            taxClassId: singleEditDataProduct.singleProductList[0].taxClassId,
            foodTypeId: singleEditDataProduct.singleProductList[0].foodTypeId,
            parentCategoryId: singleEditDataProduct.singleProductList[0].parentCategoryId,
            showInKitchen: singleEditDataProduct.singleProductList[0].showInKitchen,
            productDescription: singleEditDataProduct.productDescriptsionList[0].productDescription,
            editProductCategory: singleEditDataProduct.editProductCategory,
            productVariantList: singleEditDataProduct.productVariantList,
            productToppingsList: singleEditDataProduct.productToppingsList,
            productExtraToppingsList: singleEditDataProduct.productExtraToppingsList,

        })

    }, [singleEditDataProduct])





    const basicFormDataHandler = (data) => {
        setProductFormData({
            ...productFormData,
            productName: data.productName,
            isActive: data.isActive,
            isTaxable: data.isTaxable,
            foodTypeId: data.foodTypeId,
            taxClassId: data.taxClassId,
            showInKitchen: data.showInKitchen
        })

    }

    const handleDescriptionData = (data) => {
        setProductFormData({ ...productFormData, productDescription: data.productDescription })
    }

    const categoriesDataHandler = (data) => {
        // console.log("check semi final data", data)
        const categoriesList = [];
        data?.map((catagory) => {
            categoriesList.push(catagory.selectcategory)
        })
        setProductFormData({ ...productFormData,
             editProductCategory: categoriesList
             })
    }

    const parentCategoriesDataHandler = (data) => {        
        setProductFormData({ ...productFormData,
             parentCategoryId: data.parentCategoryId
             })
    }

    const variantDataHandler = (vdata) => {
        const variantDataList = [];
        vdata?.map((variant) => {
            variantDataList.push(variant.selectvariant)
        })
        setProductFormData({ ...productFormData, productVariantList: variantDataList })
    }

    const extraToppingDataHandler = (Edata) => {
        const extratoppingDataList = [];
        Edata?.map((extra) => {
            extratoppingDataList.push(extra)
        })
        setProductFormData({ ...productFormData, productExtraToppingsList: extratoppingDataList })
    }

    const combinationDataNameSend = (Tdata) => {
        const combinationDataList = [];
        Tdata?.map((combination) => {
            combination.allTrailData.map((combinationTrail) => {
                if (combinationTrail.selection.combinationProductId === combination.toppingId) {
                    var newItem = { ...combinationTrail.selection, ...combination.selectionD }
                    combinationDataList.push(newItem)
                }
            })
        })
        setProductFormData({ ...productFormData, productToppingsList: combinationDataList })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let finalProductData
        if (Object.keys(edit).length < 1) {
            finalProductData = {
                ...productFormData,     
                parentCategoryId: parseInt(productFormData.parentCategoryId),          
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId

            }
        } else {
            finalProductData = {
                ...productFormData,                
                productId: parseInt(edit.id),
                parentCategoryId: parseInt(productFormData.parentCategoryId),
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId
            }
        }
        dispatch(fetchSaveUpdateProduct(finalProductData))
        dispatch(resetStates())
    }

    const cancelHandler = () => {
        navigate(`/product`)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    {/* <Basic basicFormDataHandler={basicFormDataHandler} productFormState = {productFormData} />
                    <Description descriptionDataHandler={handleDescriptionData} />
                    <Categories categoriesDataHandler={categoriesDataHandler} />
                    <Variants variantDataHandler={variantDataHandler} />
                    <ProductToppingsNames
                        combinationDataNameSend={combinationDataNameSend}
                        combinationHandler={productFormData}
                    />
                    <ExtraTopping extraToppingDataHandler={extraToppingDataHandler} /> */}
                    {props.step === 1 && <Basic basicFormDataHandler={basicFormDataHandler} productFormState={productFormData} setProductFormData={setProductFormData} />}
                    {props.step === 2 && <Description descriptionDataHandler={handleDescriptionData} productFormState={productFormData} />}
                    {props.step === 3 && <Categories categoriesDataHandler={categoriesDataHandler} parentCategoriesDataHandler={parentCategoriesDataHandler}  productFormState={productFormData} />}
                    {props.step === 4 && <Variants variantDataHandler={variantDataHandler} productFormState={productFormData} />}
                    {props.step === 5 && <ProductToppingsNames
                        combinationDataNameSend={combinationDataNameSend}
                        combinationHandler={productFormData}
                    />}
                    {props.step === 6 && <ExtraTopping
                        extraToppingDataHandler={extraToppingDataHandler}
                        productFormState={productFormData}
                        setProductFormData={setProductFormData}
                    />}

                </div>
                <div>

                    <Buttons fname="Save"
                        Sname="Cancel"
                        cancelHandler={cancelHandler}
                    />
                </div>
            </form>
        </>
    )
}

export default ProductForm