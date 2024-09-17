import React, { useState, useCallback, useMemo, useRef } from 'react'
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
    const isDataLoaded = useRef(false);
    const edit = useParams()
    const [productFormData, setProductFormData] = useState({
        productName: "",
        isActive: false,
        isTaxable: false,
        taxClassId: '',
        foodTypeId: '',
        showInKitchen: false,
        parentCategoryId: -1,
        productDescription: "",
        editProductCategory: [],
        productVariantList: [],
        productToppingsList: [],
        productExtraToppingsList: []
    })

    console.log("check productform data all", props);


    useEffect(() => {
        if (edit.id != undefined) {
            dispatch(fetchEditProduct(edit.id))
        }
    }, [edit])

    const singleEditDataProduct = useSelector((product) => product.ProductSlices.singleData)


    useEffect(() => {
        console.log("check useEffect");
        if (singleEditDataProduct && !isDataLoaded.current) {
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

            setTimeout(() => {
                isDataLoaded.current = true;               
            }, 2000);
        }

        if (!edit.id) {
            setProductFormData({
                productName: "",
                isActive: false,
                isTaxable: false,
                taxClassId: '',
                foodTypeId: '',
                showInKitchen: false,
                parentCategoryId: -1,
                productDescription: "",
                editProductCategory: [],
                productVariantList: [],
                productToppingsList: [],
                productExtraToppingsList: []
            })
        }
    }, [singleEditDataProduct])


    const previousHandler = () => {
        if (props.step > 1) {
            props.setStep(props.step - 1)
        }
    }

    const nextHandler = () => {
        if (props.step < 6) {
            props.setStep(props.step + 1)
        }
    }

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
        const categoriesList = [];
        data?.map((catagory) => {
            categoriesList.push(catagory.selectcategory)
        })
        setProductFormData({
            ...productFormData,
            editProductCategory: categoriesList
        })
    }

    const parentCategoriesDataHandler = (data) => {
        setProductFormData({
            ...productFormData,
            parentCategoryId: data.parentCategoryId
        })
    }

    const variantDataHandler = (vdata) => {
        const variants = vdata?.filter((variant) => variant.selectvariant.toppingId)

        const variantDataList = [];
        variants?.map((variant) => {
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

        console.log("check Tdata", Tdata);

        const combinationDataList = [];
        Tdata?.map((combination) => {
            combination.allTrailData.map((combinationTrail) => {
                if (combinationTrail.selection.combinationProductId === combination.toppingId && combinationTrail.selection.quantity !== 0) {
                    var newItem = { ...combinationTrail.selection, ...combination.selectionD }
                    combinationDataList.push(newItem)
                }
            })
        })
        setProductFormData({ ...productFormData, productToppingsList: combinationDataList })
    }

    const onSubmit = async(e) => {
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
       const response = await dispatch(fetchSaveUpdateProduct(finalProductData))
        dispatch(resetStates())

        if (response.payload.status === 200) {
            navigate(`/dashboard/product`)
            props.setAlert({ type: "success", message: edit.id ? "Product Update Successfully" : "Product Create Successfully" })
            setProductFormData({
                productName: "",
                isActive: false,
                isTaxable: false,
                taxClassId: '',
                foodTypeId: '',
                showInKitchen: false,
                parentCategoryId: -1,
                productDescription: "",
                editProductCategory: [],
                productVariantList: [],
                productToppingsList: [],
                productExtraToppingsList: []
            })
        } else {
            setAlert({ type: "error", message: response.payload.message })
        }
    }

    const cancelHandler = () => {
        navigate(`/dashboard/product`)
        setProductFormData({
            productName: "",
            isActive: false,
            isTaxable: false,
            taxClassId: '',
            foodTypeId: '',
            showInKitchen: false,
            parentCategoryId: -1,
            productDescription: "",
            editProductCategory: [],
            productVariantList: [],
            productToppingsList: [],
            productExtraToppingsList: []
        })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    {props.step == 1 && <Basic basicFormDataHandler={basicFormDataHandler} productFormState={productFormData} setProductFormData={setProductFormData} />}
                    {props.step == 2 && <Description descriptionDataHandler={handleDescriptionData} productFormState={productFormData} />}
                    {props.step == 3 && <Categories categoriesDataHandler={categoriesDataHandler} parentCategoriesDataHandler={parentCategoriesDataHandler} productFormState={productFormData} />}
                    {props.step == 4 && <Variants variantDataHandler={variantDataHandler} productFormState={productFormData} />}
                    {props.step == 5 && <ProductToppingsNames
                        combinationDataNameSend={combinationDataNameSend}
                        combinationHandler={productFormData}
                    />}
                    {props.step == 6 && <ExtraTopping
                        extraToppingDataHandler={extraToppingDataHandler}
                        productFormState={productFormData}
                        setProductFormData={setProductFormData}
                    />}

                </div>
                <div>
                    <div className="addproduct__submitButtons d-flex pt-4 pb-2">
                        <button type="button" className="saveButton" style={{ padding: "5px 15px", backgroundColor: "#222222" }} onClick={previousHandler} >Previous</button>
                        <button className="cancelButton" type='reset' onClick={cancelHandler}>Cancel</button>
                        {props.step <= 5 && (<button type='button' className="saveButton" style={{ backgroundColor: "#244e36" }} onClick={nextHandler} >Next</button>)}
                        {props.step  == 6 && (<button type="submit" className="saveButton" style={{ padding: "5px 20px" }} >{edit.id ? "Update" : "Submit"}</button>)}

                    </div>
                </div>
            </form>
        </>
    )
}

export default React.memo(ProductForm);