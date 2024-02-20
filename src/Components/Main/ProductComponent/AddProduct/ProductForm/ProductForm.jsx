import React, { useState, createContext, useRef } from 'react'
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


const productData = createContext();

const ProductForm = (props) => {
    console.log("ppppppppppprops.step", props.step)
    const isDataLoaded = useRef(false)
    const loginToken = verifyToken()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const edit = useParams()


    const [ToppingDatafinal, setToppingDatafinal] = useState([])
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

    const singleEditDataProduct = useSelector((product) => product.ProductSlices.singleData)

    useEffect(() => {
        if (edit.id != undefined) {
            dispatch(fetchEditProduct(edit.id))
        }
    }, [edit])

    useEffect(() => {

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
            isDataLoaded.current = true;
            if (!edit.id) {
                setProductFormData({
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
            }
        }

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

    const toppingnameData = (data) => {
        setToppingDatafinal([...data])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let variantFilterData = []
        productFormData.productVariantList.filter((variant) => {
            if (variant.toppingId) {
                const newArr = { isActive: variant.isActive, price: variant.price, salePrice: variant.salePrice, toppingId: variant.toppingId, variantId: variant.variantId }
                variantFilterData.push(newArr)
            }
        })

        let finalProductData
        if (Object.keys(edit).length < 1) {
            finalProductData = {
                ...productFormData,
                parentCategoryId: parseInt(productFormData.parentCategoryId),
                productVariantList: variantFilterData,
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId

            }
        } else {
            finalProductData = {
                ...productFormData,
                productId: parseInt(edit.id),
                parentCategoryId: parseInt(productFormData.parentCategoryId),
                productVariantList: variantFilterData,
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId
            }
        }
        dispatch(fetchSaveUpdateProduct(finalProductData))
        dispatch(resetStates())
        navigate(`/product`)

        setProductFormData({
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

    }

    const cancelHandler = () => {
        setProductFormData({
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
        navigate(`/product`)
    }

    const [nextBtn, setNextBtn] = useState(props.step)
    const nextHandler = () => {

        if (nextBtn < 6) {
            setNextBtn(nextBtn + 1);
        }
    };

    const prevHandler = () => {

        if (nextBtn > 1) {
            setNextBtn(nextBtn - 1)
        }
    }




    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <productData.Provider value={productFormData}>
                        {nextBtn === 1 && <Basic basicFormDataHandler={basicFormDataHandler} productFormState={productFormData} setProductFormData={setProductFormData} />}
                        {nextBtn === 2 && <Description descriptionDataHandler={handleDescriptionData} productFormState={productFormData} />}
                        {nextBtn === 3 && <Categories categoriesDataHandler={categoriesDataHandler} parentCategoriesDataHandler={parentCategoriesDataHandler} productFormState={productFormData} />}
                        {nextBtn === 4 && <Variants variantDataHandler={variantDataHandler} productFormState={productFormData} />}
                        {nextBtn === 5 && <ProductToppingsNames
                            combinationDataNameSend={combinationDataNameSend}
                            combinationHandler={productFormData}
                            toppingnameData={toppingnameData}
                            topingname={ToppingDatafinal}
                        />}
                        {nextBtn === 6 && <ExtraTopping
                            extraToppingDataHandler={extraToppingDataHandler}
                            productFormState={productFormData}
                            setProductFormData={setProductFormData}

                        />}
                    </productData.Provider>

                </div>
                <div>
                    <Buttons

                        Pname="prev"
                        Sname="Cancel"
                        Ename={nextBtn < 6 && "Next"}
                        fname={nextBtn == 6 && "Save"}
                        prevHandler={prevHandler}
                        nextHandler={nextHandler}
                        cancelHandler={cancelHandler}
                    />
                </div>
            </form>
        </>
    )
}

export default ProductForm
export { productData }