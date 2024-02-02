import React, { useEffect, useState } from 'react';
import Buttons from '../ProductComponent/Buttons/NewButtons';
import plus from "../../../assets/svg/plus.svg"
import subtract from "../../../assets/svg/subtract.svg"
import "./MainCouponsform.scss";
import CouponsTable from './CategoryCouponsTable/CouponsTable';
import ProductsCoupons from './productsCouponsTable/ProductsCoupons';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../Store/Slice/NavSlices';
import verifyToken from '../../SignIn/verifyToken';
import { fetchALLDiscountTypeCoupon, fetchLimitationCoupon } from '../../../Store/Slice/CouponSlices';




const MainCouponsform = () => {
    const loginToken = verifyToken()
    const dispatch = useDispatch();
    dispatch(navTitle("Coupons"));

    useEffect(() => {
        dispatch(fetchALLDiscountTypeCoupon())
        dispatch(fetchLimitationCoupon())
    }, [])

    const discountTypeData = useSelector((discountType) => discountType.CouponSlices.discountType)
    const limitationData = useSelector((limitationstate) => limitationstate.CouponSlices.limitation)
    console.log("aaaaaaaaaaaaaaa", limitationData)

    const [couponData, setCouponData] = useState(
        {
            couponCode: "",
            couponName: "",
            isActive: true,
            franchiseId: "",
            parentUserId: "",
            minimumTotalValue: 0,
            discountTypeId: "",
            discountPercentage: "",
            discountStartDate: "",
            discountEndDate: "",
            discountLimitationId: "",
            numberTimeDiscount: "",
            isAppliedOnProducts: false,
            isAppliedOnCategories: false,
            isMinimumSubTotal: false,
            couponCategories: [],
            couponProducts: []
        }
    )

    console.log("coupon state1", couponData)

    const isAppliedOnCategories = (e) => {
        setCouponData({ ...couponData, isAppliedOnCategories: !couponData.isAppliedOnCategories })
    }

    const isAppliedOnProducts = (e) => {
        setCouponData({ ...couponData, isAppliedOnProducts: !couponData.isAppliedOnProducts })
    }

    const isMinimumSubTotal = (e) => {
        setCouponData({ ...couponData, isMinimumSubTotal: !couponData.isMinimumSubTotal })
    }

    const categoryselectedHandler = (data) => {
        console.log("check select valuedddddddddddddddddddddddddddddddddddddddddddddddd", data)
        const selection = []
        data.map((item) => {
            selection.push(item.select)
        })
        setCouponData({ ...couponData, couponCategories: selection })
    }

    const productSelectedHandler = (data) => {
        console.log("check select valuedddddddddddddddddddddddddddddddddddddddddddddddd", data)
        const selection = []
        data.map((item) => {
            selection.push(item.select)
        })
        setCouponData({ ...couponData, couponProducts: selection })
    }



    const changeHandler = (e) => {
        setCouponData({
            ...couponData,
            [e.target.name]: e.target.value
        })
    }

    const couponSubmitHandler = (e) => {
        e.preventDefault()

        let couponDatas = {
            ...couponData,
            discountLimitationId: parseInt(couponData.discountLimitationId),
            discountPercentage: parseInt(couponData.discountPercentage),
            discountTypeId: parseInt(couponData.discountTypeId),
            minimumTotalValue: parseInt(couponData.minimumTotalValue),
            numberTimeDiscount: parseInt(couponData.numberTimeDiscount),
            parentUserId: parseInt(loginToken.parentUserId),
            franchiseId: parseInt(loginToken.userID),
        }


        console.log("check my data state", couponDatas)
    }

    const cancelHandler = () => { }





    const { couponCode, couponName, discountTypeId, discountPercentage, discountStartDate, discountEndDate, discountLimitationId, minimumTotalValue, numberTimeDiscount } = couponData
    return (
        <>
            <div className="addProduct__basicTabs  ">
                <form onSubmit={couponSubmitHandler}>

                    <div className=" addProduct__basicForm d-flex mb-3">
                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Coupon Code:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Flat20coupon"
                                name='couponCode'
                                value={couponCode}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                Coupon Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Demo"
                                name='couponName'
                                value={couponName}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Discount Type:
                                <span className="formRequired">*</span>
                            </label>
                            <select
                                className="form-select "
                                id="taxClass"
                                name='discountTypeId'
                                value={discountTypeId}
                                onChange={(e) => changeHandler(e)}
                            >
                                <option defaultValue>choose the one option</option>
                                {discountTypeData?.map(discount => {
                                    return <option
                                        key={discount.discountTypeId}
                                        value={discount.discountTypeId}>
                                        {discount.discountName}
                                    </option>
                                }
                                )}

                            </select>
                        </div>

                    </div>
                    <div className=" addProduct__basicForm d-flex mb-3">
                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Discount:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="20%"
                                name='discountPercentage'
                                value={discountPercentage}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label ">
                                Start Date:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="date"
                                id="product-name"
                                className="form-control"
                                placeholder="14/02/2023"
                                name='discountStartDate'
                                value={discountStartDate}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                End Date:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="date"
                                id="product-name"
                                className="form-control"
                                placeholder="20/02/2023"
                                name='discountEndDate'
                                value={discountEndDate}
                                onChange={(e) => changeHandler(e)}
                                required
                            />
                        </div>




                    </div>
                    <div className=" addProduct__basicForm d-flex mb-5">
                        <div className="addProduct__productNames">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Discount Limitation:
                                <span className="formRequired">*</span>
                            </label>
                            <select
                                className="form-select "
                                id="taxClass"
                                name='discountLimitationId'
                                value={discountLimitationId}
                                onChange={(e) => changeHandler(e)}
                            >
                                <option defaultValue>chose the one option</option>
                                {limitationData?.map(limitation => {
                                    return <option
                                        key={limitation.discountLimitationId}
                                        value={limitation.discountLimitationId}>
                                        {limitation.discountLimitationName}
                                    </option>
                                })}

                            </select>
                        </div>

                        {couponData.discountLimitationId > 1 && <div className="addProduct__productNames">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                No of times discount Use:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
                                id="product-name"
                                className="form-control"
                                placeholder="No of times discount Use"
                                name='numberTimeDiscount'
                                value={numberTimeDiscount}
                                onChange={(e) => changeHandler(e)}

                            />
                        </div>}

                    </div>


                    <div className='tag rounded-3 mb-5 '>
                        <div className='d-flex justify-content-between align-items-center '>
                            <div className='d-flex align-items-center '>
                                <div className='tag_content'> <img src={couponData.isAppliedOnCategories ? subtract : plus} alt="plus" />  </div>
                                <div><p>Category</p></div>
                            </div>
                            <div className='d-flex align-items-center  '>
                                <div><p>Enable Category Requirement</p></div>
                                <div className=" form-check form-switch pt-1 ms-4 abc" >
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="form-check-input p-2 toggle_btn"
                                        checked={couponData && couponData.isAppliedOnCategories}
                                        onChange={isAppliedOnCategories}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    {couponData.isAppliedOnCategories &&
                        <div className='ToppingSelect_table me-5 '>
                            <CouponsTable
                                selectedHandler={categoryselectedHandler}

                            />
                        </div>}

                    <div className='tag rounded-3 mb-5'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <div className='d-flex align-items-center '>
                                <div className='tag_content'> <img src={couponData.isAppliedOnProducts ? subtract : plus} alt="plus" />  </div>
                                <div><p>Product</p></div>
                            </div>
                            <div className='d-flex align-items-center  '>
                                <div><p>Enable Product Requirement</p></div>
                                <div className=" form-check form-switch pt-1 ms-4 abc" >
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="form-check-input p-2 toggle_btn"
                                        checked={couponData && couponData.isAppliedOnProducts}
                                        onChange={isAppliedOnProducts}

                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {couponData.isAppliedOnProducts && <div className='ToppingSelect_table me-5 '>
                        <ProductsCoupons
                            productSelectedHandler={productSelectedHandler} />
                    </div>}

                    <div className='tag rounded-3 mb-5'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <div className='d-flex align-items-center '>
                                <div className='tag_content'> <img src={couponData.isMinimumSubTotal ? subtract : plus} alt="plus" />  </div>
                                <div><p>Product</p></div>
                            </div>
                            <div className='d-flex align-items-center  '>
                                <div><p>Enable minimum cart subtotal requirement</p></div>
                                <div className=" form-check form-switch pt-1 ms-4 abc" >
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="form-check-input p-2 toggle_btn"
                                        checked={couponData && couponData.isMinimumSubTotal}
                                        onChange={isMinimumSubTotal}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {couponData.isMinimumSubTotal && <div className="addProduct__productNames">
                        <label htmlFor="product-name" className="form-label inputForm__label">
                            Minimum Value:
                            <span className="formRequired">*</span>
                        </label>
                        <input
                            type="number"
                            id="product-name"
                            className="form-control"
                            placeholder="minimum value"
                            name='minimumTotalValue'
                            value={minimumTotalValue}
                            onChange={(e) => changeHandler(e)}

                        />
                    </div>}

                    <div style={{ margin: "8px" }}>

                        <Buttons fname="Save"
                            Sname="Cancel"
                            cancelHandler={cancelHandler}
                        />

                    </div>

                </form >
            </div >
        </>
    )
}
export default MainCouponsform;


