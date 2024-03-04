import React, { useEffect, useState, useRef } from 'react'
import Buttons from '../../ProductComponent/Buttons/NewButtons'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllDays, resetStates } from '../../../../Store/Slice/CommonSlices';
import { fetchApiDataCategory } from '../../../../Store/Slice/CategorySlices';
import verifyToken from '../../../SignIn/verifyToken';
import { GetPromotionalActivityProducts, GetPromotionalActivityVariants, Promotionaltype, SaveupdatePromotionalActivity } from '../../../../Store/Slice/PromotionalSlices';
import { useNavigate, useParams } from 'react-router-dom';

const PromotionalForm = () => {
    const dispatch = useDispatch();
    const loginToken = verifyToken()
    const isDataLoaded = useRef(false)
    const navigate = useNavigate()
    const id = useParams()


    const days = useSelector(state => state.CommonSlices.days)
    const Catagory = useSelector(state => state.CategorySlices.data)
    const promotionaltype = useSelector(state => state.PromotionalSlices.promotionalType)
    const varinatselect = useSelector(item => item.PromotionalSlices.variantList)
    const productListselect = useSelector(item => item.PromotionalSlices.productList)
    const singlePromotion = useSelector(item => item.PromotionalSlices.singleData)



    const [procede, setProcede] = useState(true);
    const [categoryData, setCategoryIdData] = useState([]);
    const [categoryMerge, setCategoryMerge] = useState([])
    const [variantListData, setVariantListData] = useState([]);
    const [variantMerge, setVariantMerge] = useState([])

    const [productListData, setProductListData] = useState([]);
    const [promotionalData, setPromotionalData] = useState({
        activityName: "",
        promotionalTypeId: 1,
        isActive: true,
        promotionalActivityDaysTable: [

        ],
        promotionalActivityCategories: [

        ],
        promotionalActivityProducts: [

        ],
        promotionalActivityVariants: [

        ]
    })
    console.log("check state data", promotionalData)

    useEffect(() => {
        dispatch(GetAllDays())
        dispatch(fetchApiDataCategory(loginToken.userID))
        dispatch(Promotionaltype())
 

    }, []);

    useEffect(() => {
         
        if (id.id !== undefined) {
            dispatch(GetPromotionalActivityVariants({ categoryId: promotionalData.promotionalActivityCategories }))
        }
    }, [promotionalData?.promotionalActivityCategories])

    useEffect(() => {
        !singlePromotion ? setPromotionalData({
            ...promotionalData
        }) : setPromotionalData({
            activityName: singlePromotion.singlePromotionalActivity[0].activityName,
            promotionalTypeId: singlePromotion.singlePromotionalActivity[0].promotionalTypeId,
            isActive: singlePromotion.singlePromotionalActivity[0].isActive,
            promotionalActivityDaysTable: singlePromotion.promotionalActivityDaysTable.filter(days => days.dayId).map(days => days.dayId),
            promotionalActivityCategories: singlePromotion.promotionalActivityCategories.filter(category => category.categoryId).map(category => category.categoryId),
            promotionalActivityProducts: singlePromotion.promotionalActivityProducts.filter(product => product.productId).map(product => product.productId),
            promotionalActivityVariants: singlePromotion.promotionalActivityVariants.filter(variant => variant.variantId).map(variant => variant.variantId),
        })

    }, [singlePromotion])

    useEffect(() => {
        const product = []
        categoryData.map((category) => (
            variantListData.map((variant) => {
                if (category.select.IsChecked == true && variant.select.IsChecked == true) {


                    const da = {
                        categoryId: category.categoryId,
                        variantId: variant.variantId,
                        type: "string"
                    }
                    product.push(da)

                }
            })
        ))
        dispatch(GetPromotionalActivityProducts({ promotinalProductList: product }))
    }, [categoryData, variantListData])

    useEffect(() => {
        console.log(varinatselect && varinatselect)
        if (!varinatselect || !singlePromotion?.promotionalActivityVariants) return
        const variantsData = singlePromotion?.promotionalActivityVariants.map(item => ({ IsChecked: true, variantId: item.variantId }))

        const mergedArray = varinatselect?.map(item => {
            const singleData = variantsData?.find(variant => variant.variantId === item.variantId) || { IsChecked: false, variantId: item.variantId }
            return { ...item, ...singleData }
        })
        setVariantMerge(mergedArray)
    }, [varinatselect, singlePromotion?.promotionalActivityVariants])

    useEffect(() => {
        if (!varinatselect) return
        const finalvarinats = varinatselect.map(item => {
            const select = variantMerge?.find(select => select.variantId === item.variantId) || { IsChecked: false, variantId: item.variantId }
            return { ...item, select }
        });
        console.log("check variant", finalvarinats)
        setVariantListData(finalvarinats);

    }, [varinatselect, variantMerge]);

    const [productsMerge, setProductsMerge] = useState([])
    useEffect(() => {
        if (!productListselect || !singlePromotion?.promotionalActivityProducts) return
        const productsdata = singlePromotion?.promotionalActivityProducts.map(item => ({ IsChecked: true, productId: item.productId }));

        const productmerge = productListselect?.map(item => {
            const productmer = productsdata?.find(product => product.productId === item.productId) || { IsChecked: false, productId: item.productId }
            return { ...item, ...productmer }
        })

        setProductsMerge(productmerge);
    }, [productListselect, singlePromotion?.promotionalActivityProducts]);

    useEffect(() => {
        if (!productListselect) return
        const products = productListselect.map(item => {
            const select = productsMerge.find(selected => selected.productId === item.productId) || { IsChecked: false, productId: item.productId }
            return { ...item, select }
        });
        setProductListData(products);

    }, [productListselect, productsMerge]);

    const [daysData, setdaysData] = useState([]);
    const [daysMerge, setDaysMerge] = useState([])
    useEffect(() => {
        if (!days || !singlePromotion?.promotionalActivityDaysTable) return

        const dayKeyAdd = singlePromotion?.promotionalActivityDaysTable.map(item => ({ IsChecked: true, daysID: item.dayId }))

        const daysMergeData = days.map(item => {
            const mergedata = dayKeyAdd.find(selected => selected.daysID === item.daysID) || { IsChecked: false, daysID: item.daysID }
            return { ...item, ...mergedata }
        })
        setDaysMerge(daysMergeData)

    }, [days, singlePromotion?.promotionalActivityDaysTable])

    useEffect(() => {
        if (!days) return

        const daysAllData = days.map(item => {
            const select = daysMerge.find(selected => selected.daysID === item.daysID) || { IsChecked: false, daysID: item.daysID }
            return { ...item, select }
        })

        setdaysData(daysAllData)
    }, [days, daysMerge])

    useEffect(() => {
        if (!Catagory || !singlePromotion?.promotionalActivityCategories) return;
        const categoriesdata = singlePromotion?.promotionalActivityCategories.map(item => ({ IsChecked: true, categoryId: item.categoryId }));

        const mergedArray = Catagory.map(obj1 => {
            const obj2 = categoriesdata.find(obj2 => obj2.categoryId === obj1.categoryId) || { IsChecked: false, categoryId: obj1.categoryId };
            return { ...obj1, ...obj2 };
        });

        setCategoryMerge(mergedArray);
    }, [Catagory, singlePromotion?.promotionalActivityCategories]);

    useEffect(() => {
        if (!Catagory) return;

        const finalCategory = Catagory.map(item => {
            const select = categoryMerge.find(selected => selected.categoryId === item.categoryId) || { IsChecked: false, categoryId: item.categoryId };
            return { ...item, select };
        });
        setCategoryIdData(finalCategory);

    }, [Catagory, categoryMerge]);

    const promotionalTypeHandler = (e) => {
        setPromotionalData({
            ...promotionalData,
            [e.target.name]: e.target.value
        })
    }

    const daysHandler = (e, id) => {
        const newArr = daysData?.map(days => {
            if (days.daysID === id) {
                return {
                    ...days,
                    select: {
                        daysID: days.daysID,
                        IsChecked: e.target.name === 'days' ? e.target.checked : days.select.IsChecked,
                    }
                };
            }
            return days;
        });

        setdaysData(newArr);

        const daysDatas = newArr.filter(days => days.select.IsChecked).map(days => days.select.daysID);
        setPromotionalData({ ...promotionalData, promotionalActivityDaysTable: daysDatas });
    };

    const categoryChangeHandler = (e, id, item) => {
        const isChecked = e.target.checked;
        const isAllCategory = e.target.name === "allCategory";

        const newArr = categoryData?.map(category => {
            if (isAllCategory || category.categoryId === id) {
                return {
                    ...category,
                    select: {
                        IsChecked: isAllCategory ? isChecked : (category.categoryId === id ? isChecked : category.select.IsChecked),
                        categoryId: category.categoryId
                    }
                };
            }
            return category;
        });

        setCategoryIdData(newArr);

        const categoryDatas = newArr.filter(category => category.select.IsChecked).map(category => category.select.categoryId);
        setPromotionalData({ ...promotionalData, promotionalActivityCategories: categoryDatas });
    };

    const variantChangeHandler = (e, id, item) => {
        const isChecked = e.target.checked;
        const isAllVariant = e.target.name === "allVariant";

        const newArr = variantListData?.map(variant => {
            if (isAllVariant || variant.variantId === id) {
                return {
                    ...variant,
                    select: {
                        IsChecked: isAllVariant ? isChecked : (variant.variantId === id ? isChecked : variant.select.IsChecked),
                        variantId: variant.variantId
                    }
                };
            }
            return variant;
        });

        setVariantListData(newArr);

        const variantDatas = newArr.filter(variant => variant.select.IsChecked).map(variant => variant.select.variantId);
        setPromotionalData({ ...promotionalData, promotionalActivityVariants: variantDatas })
    };

    const productChangeHandler = (e, id, item) => {
        const isChecked = e.target.checked;
        const isAllProduct = e.target.name === "allProduct";

        const newArr = productListData?.map(product => {
            if (isAllProduct || product.productId === id) {
                return {
                    ...product,
                    select: {
                        IsChecked: isAllProduct ? isChecked : (product.productId === id ? isChecked : product.select.IsChecked),
                        productId: product.productId
                    }
                };
            }
            return product;
        });

        setProductListData(newArr);

        const productDatas = newArr.filter(product => product.select.IsChecked).map(product => product.select.productId);
        setPromotionalData({ ...promotionalData, promotionalActivityProducts: productDatas })
    };

    const ProcedeHandler = () => {
        setProcede(!procede)
        dispatch(GetPromotionalActivityVariants({ categoryId: promotionalData.promotionalActivityCategories }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let promotionalActivity
        if (Object.keys(id).length < 1) {
            promotionalActivity = {
                ...promotionalData,
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId
            }
        }else{
            promotionalActivity = {
                ...promotionalData,
                promotionalActivityId: parseInt(id.id),
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId
            }
        }
        dispatch(SaveupdatePromotionalActivity(promotionalActivity))
        dispatch(resetStates())
        navigate('/promotional_Table')
    }



    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="addProduct__basicTabs">

                    <div className="addProduct__basic d-flex mb-4">

                        <div className="addProduct__productNamed">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Select Type:
                            </label>
                            <select
                                className="form-select "
                                name='promotionalTypeId'
                                id="taxClass"
                                value={promotionalData.promotionalTypeId}
                                onChange={promotionalTypeHandler}

                            >
                                {promotionaltype?.map((item, index) => (<option
                                    key={item.promotionalTypeId}
                                    value={item.promotionalTypeId}>{item.typeName}</option>))}

                            </select>
                        </div>

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Activity Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='activityName'
                                value={promotionalData.activityName}
                                onChange={promotionalTypeHandler}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mt-5 mb-4">
                        <div className='d-flex align-items-center'>
                            <h3 >Days :</h3>
                            {daysData?.map((item, ind) => (
                                <div className="addProduct__subcategoryCheckboxes d-flex align-items-center col-md-1 " key={ind}>
                                    <input className="form-check-input mx-2 "
                                        type="checkbox"
                                        name="days"
                                        checked={item.select.IsChecked}
                                        onChange={(e) => daysHandler(e, item.daysID, item)}
                                    />
                                    <label className="inputFormCheckbox__label " htmlFor="Dining">
                                        {item.daysAbbr}
                                    </label>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                    <h1 style={{ color: "#C53705", borderWidth: "1px", borderStyle: "solid" }} />

                    <div className="mt-5 mb-4">
                        <div className='col-12'>
                            <div className='addProduct__subcategoryCheckboxes d-flex align-items-center'>
                                <h3>Category :</h3>
                                <input className="form-check-input mx-2 px-2 py-2 "
                                    type="checkbox"
                                    name="allCategory"
                                    checked={categoryData?.filter(item => item.select.IsChecked !== true).length < 1}
                                    onChange={(e) => categoryChangeHandler(e)}


                                />
                                <label className="inputFormCheckbox__label " htmlFor="Dining">
                                    select All
                                </label>
                            </div>
                            <div className="row ms-1">
                                {categoryData?.map((item, ind) => (
                                    <div className="addProduct__subcategoryCheckboxes d-flex align-items-center col-md-2 " key={ind}>
                                        <input className="form-check-input mx-2"
                                            type="checkbox"
                                            name="category"
                                            checked={item.select.IsChecked}
                                            onChange={(e) => categoryChangeHandler(e, item.categoryId, item)}

                                        />
                                        <label className="inputFormCheckbox__label col-sm " htmlFor="Dining">
                                            {item.categoryName}
                                        </label>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Buttons Ename="procede"
                            nextHandler={ProcedeHandler}

                        />
                    </div>
                    {variantListData && variantListData.length > 0 ? <div>

                        <div className="mt-5 mb-4">
                            <div className='col-12'>
                                <div className='addProduct__subcategoryCheckboxes d-flex align-items-center'>
                                    <h3>variant :</h3>
                                    <input className="form-check-input mx-2 px-2 py-2 "
                                        type="checkbox"
                                        name="allVariant"
                                        checked={variantListData?.filter(item => item.select.IsChecked !== true).length < 1}
                                        onChange={(e) => variantChangeHandler(e)}

                                    />
                                    <label className="inputFormCheckbox__label " htmlFor="Dining">
                                        select All
                                    </label>
                                </div>
                                <div className="row ms-1">
                                    {variantListData?.map((item, ind) => (
                                        <div className="addProduct__subcategoryCheckboxes d-flex align-items-center col-md-2 " key={ind}>
                                            <input className="form-check-input mx-2"
                                                type="checkbox"
                                                name="variant"
                                                checked={item.select.IsChecked}
                                                onChange={(e) => variantChangeHandler(e, item.variantId, item)}
                                            />
                                            <label className="inputFormCheckbox__label col-sm " htmlFor="Dining">
                                                {item.variantName}
                                            </label>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div> : ""
                    }

                    {productListData && productListData.length > 0 && <div className="mt-5 mb-4">
                        <div className='col-12'>
                            <div className='addProduct__subcategoryCheckboxes d-flex align-items-center'>
                                <h3>product :</h3>
                                <input className="form-check-input mx-2 px-2 py-2 "
                                    type="checkbox"
                                    name="allProduct"
                                    checked={productListData?.filter(item => item.select.IsChecked !== true).length < 1}
                                    onChange={(e) => productChangeHandler(e)}
                                />
                                <label className="inputFormCheckbox__label " htmlFor="Dining">
                                    select All
                                </label>
                            </div>
                            <div className="row ms-1">
                                {productListData?.map((item, ind) => (
                                    <div className="addProduct__subcategoryCheckboxes d-flex align-items-center col-md-2 " key={ind}>
                                        <input className="form-check-input mx-2"
                                            type="checkbox"
                                            name="product"
                                            checked={item.select.IsChecked}
                                            onChange={(e) => productChangeHandler(e, item.productId, item)}
                                        />
                                        <label className="inputFormCheckbox__label col-sm " htmlFor="Dining">
                                            {item.productName}
                                        </label>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>}

                    <Buttons fname="Save"
                        Sname="Cancel"

                    />

                </div>
            </form>
        </>
    )
}

export default PromotionalForm