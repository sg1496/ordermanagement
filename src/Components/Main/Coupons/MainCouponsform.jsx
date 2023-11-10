import React,{useEffect, useState} from 'react';
import Buttons from '../ProductComponent/Buttons/NewButtons';
import plus from "../../../assets/svg/plus.svg"
import subtract from "../../../assets/svg/subtract.svg"
import "./MainCouponsform.scss";
import CouponsTable from './CategoryCouponsTable/CouponsTable';
import SelectedCoupns from './CategoryCouponsTable/SelectedCoupns';
import ProductsCoupons from './productsCouponsTable/ProductsCoupons';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../Store/Slice/NavSlices';



const MainCouponsform = () => {
    const[Shows , setShows]= useState(false);
    const[show , setShow]= useState(false);
    const [couponData, setCouponData] = useState({
        couponCode:"",
        couponName:"",
        discountValue:"",
        discountStartDate:"",
    })

    const changeHandler = ()=>{

    }

    const dispatch = useDispatch();
    dispatch(navTitle("Coupons"));
    console.log(show)

    const {couponCode,couponName,discountValue,discountStartDate} = couponData
    return (
        <>
            <div className="addProduct__basicTabs  ">
                <form>

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
                                onChange={(e)=> changeHandler(e)}
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
                                onChange={(e)=> changeHandler(e)}
                                required
                            />
                        </div>

                        <div className="addProduct__productNames">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Discount Type:
                                <span className="formRequired">*</span>
                            </label>
                            <select className="form-select " id="taxClass" >
                                <option defaultValue>demo</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                                <option value="Three">three</option>
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
                                name='discountValue'
                                value={discountValue}
                                onChange={(e)=> changeHandler(e)}
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
                                onChange={(e)=> changeHandler(e)}
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
                                name='discountStartDate'
                                value={discountStartDate}
                                onChange={(e)=> changeHandler(e)}
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
                            <select className="form-select " id="taxClass" >
                                <option defaultValue>demo</option>
                                <option value="one">one</option>
                                <option value="two">two</option>
                                <option value="Three">three</option>
                            </select>
                        </div>

                        <div style={{margin:"8px"}}>

                            <Buttons fname="Save"
                                Sname="Cancel" />

                        </div>

                    </div>


                    <div className='tag rounded-3 mb-5 '>
                        <div className='d-flex justify-content-between align-items-center '>
                            <div className='d-flex align-items-center '>
                                <div className='tag_content'> <img src={plus} alt="plus" />  </div>
                                <div><p>Category</p></div>
                            </div>
                            <div className='d-flex align-items-center  '>
                                <div><p>Enable Category Requirement</p></div>
                                <div className=" form-check form-switch pt-1 ms-4 abc" >
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="form-check-input p-2 toggle_btn"
                                        onClick={(e)=> setShow(!show)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    {show &&<div className='row d-flex '>
                     <div className='col-6'><CouponsTable/></div>
                    <div className='col-6'><SelectedCoupns/></div>
                    </div>}

                    <div className='tag rounded-3 mb-5'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <div className='d-flex align-items-center '>
                                <div className='tag_content'> <img src={subtract} alt="plus" />  </div>
                                <div><p>Product</p></div>
                            </div>
                            <div className='d-flex align-items-center  '>
                                <div><p>Enable Category Requirement</p></div>
                                <div className=" form-check form-switch pt-1 ms-4 abc" >
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="form-check-input p-2 toggle_btn"
                                        onClick={(e)=>setShows(!Shows)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {Shows &&<div className='row d-flex '>
                     <div className='col-6'><ProductsCoupons/></div>
                    <div className='col-6'><SelectedCoupns/></div>
                    </div>}

                    <div className='tag rounded-3 mb-5'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <div className='d-flex align-items-center '>
                                <div className='tag_content'> <img src={plus} alt="plus" />  </div>
                                <div><p>Product</p></div>
                            </div>
                            <div className='d-flex align-items-center  '>
                                <div><p>Enable minimum cart subtotal requirement</p></div>
                                <div className=" form-check form-switch pt-1 ms-4 abc" >
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        className="form-check-input p-2 toggle_btn"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                </form >
            </div >
        </>
    )
}
export default MainCouponsform;


