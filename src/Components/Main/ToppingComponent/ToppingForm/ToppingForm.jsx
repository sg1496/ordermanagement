import React, { useState, useEffect } from 'react'
import './ToppingForm.scss'
import ToppingPriceList from '../ToppingPriceTable/ToppingPriceList';
import ToppingNames from '../ToppingRequiredTable/ToppingNames';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEditTopping, fetchSaveUpdateToppings, GetAllMeasuremenType, resetStates } from '../../../../Store/Slice/ToppingSlices';




const ToppingForm = (props) => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const edit = useParams();
let isSaveCliked=false;
    // Send Data Api
    const [data, setData] = useState({
        toppingName: "",
        toppingAbbr: "",
        isActive: false,
        isToppingAllowed: false,
        foodTypeId: "",
        loginUserID: Number(5),
        measurementTypeId: "",
        isCombination: false,
        categoryId: 9,
        franchiseID: 0,
        orderTypes: [
        ],
        toppingsPrices: [
        ],
        toppingCombinatiomQuantityList: [
        ],
    }
    )




    // useSelector
    const measurementList = useSelector((state) => state.ToppingSlices.measurementList)
    const singleEditTopping = useSelector((state) => state.ToppingSlices.singleData)
    console.log("bbcc",singleEditTopping)



    useEffect(() => {
        dispatch(GetAllMeasuremenType())
    }, [])

    useEffect(() => {
        if (edit.id) {
            dispatch(fetchEditTopping(edit.id))
        }
    }, [edit]);

    useEffect(() => {
        !singleEditTopping ? setData({
            ...data
        }) : setData({
            toppingName: singleEditTopping.singleTopping[0].toppingName,
            toppingAbbr: singleEditTopping.singleTopping[0].toppingAbbr,
            foodTypeId: singleEditTopping.singleTopping[0].foodTypeId,
            isCombination: singleEditTopping.singleTopping[0].isCombination,
            isToppingAllowed: singleEditTopping.singleTopping[0].isToppingAllowed,
            measurementTypeId: singleEditTopping.singleTopping[0].measurementTypeId,
            orderTypes: [
            ],
            toppingsPrices: singleEditTopping.toppingsPrices,
            toppingCombinatiomQuantityList: singleEditTopping.toppingCombinatiomQuantityList,
        })
        if (!edit.id) {
            setData({
                toppingName: "",
                toppingAbbr: "",
                measurementTypeId: "",
                isToppingAllowed: false,
                isCombination: false,
                foodTypeId: "",
                orderTypes: [
                ],
                toppingsPrices: [
                ],
                toppingCombinatiomQuantityList: [
                ]

            })
        }
    }, [singleEditTopping])

    // Events Handler
    const isToppingAllowed = (e) => {
        setData({ ...data, isToppingAllowed: !data.isToppingAllowed })
    }

    const isCombination = (e) => {
        setData({ ...data, isCombination: !data.isCombination })
    }

    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const toppingPriceHandler = (toppingPriseListData) => {
        const toppingPriceDatafromList = []

        toppingPriseListData.map((topping) => {
            toppingPriceDatafromList.push(topping.seletedTopping)
        })
        setData({ ...data, toppingsPrices: toppingPriceDatafromList })
    }

    const combinationDataNameSend = (combinationdata) => {   
       
        const combinationDataList = []        
        combinationdata && combinationdata.map((combination)=>{ 
            combinationDataList.push(combination.selection)        
            console.log("ajdljdljaljldjfld",combinationdata);    
        })
        console.log("varinder combinationDataNameSend",data);  
        setData({ ...data, toppingCombinatiomQuantityList: combinationDataList })
        console.log("varinder after combinationDataNameSend",data);  
    }

    // const combinationDataNameSend = (combinationdata) => {
    //     if (!combinationdata) return; 

    //     const combinationDataList = combinationdata.map(combination => combination.selection);
     
    //     // setData({ ...data, toppingCombinatiomQuantityList: combinationDataList })
    // };

    const DiningChangeHandler = (value, checked) => {
        if (checked) {
            setData({ ...data, orderTypes: [...data.orderTypes, value] })
        } else {
            setData({ ...data, orderTypes: data.orderTypes.filter((item) => item !== value) })
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        isSaveCliked=true;
        //shivam comment start
        let ToppingSaveUpdateData

        if (Object.keys(edit).length < 1) {
            ToppingSaveUpdateData = {
                ...data,
                loginUserID: parseInt(data.loginUserID),
                foodTypeId: parseInt(data.foodTypeId),
                measurementTypeId: parseInt(data.measurementTypeId),
                // variantId: parseInt(data.variantId),
                // combinationToppingId: parseInt(data.combinationToppingId),

            }
        } else {

            ToppingSaveUpdateData = {
                ...data,
                // loginUserID: 2,
                toppingId: parseInt(edit.id),
                foodTypeId: parseInt(data.foodTypeId),
                measurementTypeId: parseInt(data.measurementTypeId),
                loginUserID: parseInt(data.loginUserID),

            }
        }
        dispatch(fetchSaveUpdateToppings(ToppingSaveUpdateData))
        dispatch(resetStates())

        Navigate(`/toppings`)
        //shivam comment end
        setData({
            toppingName: "",
            toppingAbbr: "",
            isActive: false,
            isToppingAllowed: false,
            foodTypeId: "",
            loginUserID: 2,
            measurementTypeId: "",
            isCombination: false,
            categoryId: 9,
            franchiseID: 0,
            orderTypes: [

            ],
            toppingsPrices: [
                {
                    price: "",
                    variantId: "",
                    quantity: "",
                }
            ],
            toppingCombinatiomQuantityList: [
              
            ]

        })


    }

    const cancelHandler = () => {
        Navigate(`/toppings`)
        setData({
            toppingName: "",
            toppingAbbr: "",
            isActive: false,
            isToppingAllowed: false,
            foodTypeId: "",
            loginUserID: 2,
            measurementTypeId: "",
            isCombination: false,
            categoryId: 9,
            franchiseID: 0,
            orderTypes: [

            ],
            toppingsPrices: [
                {
                    price: "",
                    variantId: "",
                    quantity: "",
                }
            ],
            toppingCombinatiomQuantityList: [
               
            ]

        })

    }



    const { toppingName, toppingAbbr, foodTypeId, measurementTypeId } = data

    return (
        <>
            <div className="addProduct__basicTabs">
                <form onSubmit={submitHandler}>

                    <div className="addProduct__basicForm mb-4 d-flex">
                        <div className="field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Topping Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='toppingName'
                                value={toppingName}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Topping Short Code:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='toppingAbbr'
                                value={toppingAbbr}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="field_width">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Food Type:
                                <span className="formRequired">*</span>
                            </label>
                            <select className="form-select "
                                id="taxClass"
                                name='foodTypeId'
                                value={foodTypeId}
                                onChange={changeHandler}
                            >
                                <option defaultValue>Select Category</option>
                                <option value="1">Veg</option>
                                <option value="2">Non-Veg</option>
                            </select>
                        </div>

                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Is Topping Allowed?: *
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                                checked={data && data.isToppingAllowed}
                                onChange={isToppingAllowed}
                            />
                        </div>
                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Is Combination?: *
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                                checked={data && data.isCombination}
                                onChange={isCombination}
                            />
                        </div>

                    </div>

                    <div className="addProduct__basicForm mb-4 d-flex">
                        <div className="field_width">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Measurement Type:
                                <span className="formRequired">*</span>
                            </label>
                            <select className="form-select "
                                id="taxClass"
                                name='measurementTypeId'
                                value={measurementTypeId}
                                onChange={changeHandler}
                            >
                                <option defaultValue>Select Category</option>
                                {measurementList && measurementList.map(item => {
                                    return <option
                                        key={item.measurementTypeId}
                                        value={item.measurementTypeId}>
                                        {item.name}
                                    </option>

                                })}
                            </select>
                        </div>
                    </div>

                    {data.isToppingAllowed && <div className='w-50'><ToppingPriceList
                        toppingPriceHandler={toppingPriceHandler} allToppingData={data}
                    /></div>}

                    <div className="col-12 mt-4 mb-4">
                        <h3>Topping Type</h3>
                        <div className="row ms-1">
                            <div className="form-check col-md-1">
                                <input className="form-check-input"
                                    type="checkbox"
                                    name="Dining"
                                    value={1}
                                    onChange={(e) => DiningChangeHandler(e.target.value, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="Dining">
                                    Dining
                                </label>
                            </div>
                            <div className="form-check col-md-1" >
                                <input className="form-check-input"
                                    type="checkbox"
                                    name="takeAway"
                                    value={2}
                                    onChange={(e) => DiningChangeHandler(e.target.value, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="Dining">
                                    TakeAway
                                </label>
                            </div>
                            <div className="form-check col-md-1" >
                                <input className="form-check-input"
                                    type="checkbox"
                                    name="Delivery"
                                    value={3}
                                    onChange={(e) => DiningChangeHandler(e.target.value, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="Dining">
                                    Delivery
                                </label>
                            </div>


                        </div>

                    </div>

                    {data.isCombination && <div >
                        <div>
                            <h3>Select Toppings: *</h3>
                        </div>
                        <div className='ToppingName_table me-5 ' >
                            <ToppingNames
                                combinationDataNameSend={combinationDataNameSend}
                                editStatus={Boolean(edit.id)}
                                combinationHandler={data}
                                isSaveClicked={isSaveCliked}
                            />
                        </div>
                    </div>}

                    <div>
                        <Buttons fname="Save"
                            Sname="Cancel"
                            cancelHandler={cancelHandler}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
export default ToppingForm;