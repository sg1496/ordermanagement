import React, { useState, useEffect } from 'react'
import './ToppingForm.scss'
import ToppingPriceList from '../ToppingPriceTable/ToppingPriceList';
import ToppingNames from '../ToppingRequiredTable/ToppingNames';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import Buttons from '../../ProductComponent/Buttons/NewButtons';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEditTopping, fetchSaveUpdateToppings, GetAllMeasuremenType, fetchFoodTypeTopping, GetAllOrderType, resetStates } from '../../../../Store/Slice/ToppingSlices';




const ToppingForm = (props) => {

    const dispatch = useDispatch();
    dispatch(navTitle("Toppings"));
    const Navigate = useNavigate();
    const edit = useParams();

    // Send Data Api state
    const [orderType, setOrderTypeData] = useState([])

    const [data, setData] = useState({
        toppingName: "",
        toppingAbbr: "",
        isActive: true,
        isToppingAllowed: false,
        foodTypeId: "",
        loginUserID: Number(5),
        measurementTypeId: "",
        isCombination: false,
        franchiseID: 5,
        orderTypes: [],
        toppingsPrices: [],
        toppingCombinatiomQuantityList: []
    })

// useEffect Dispatch data
    useEffect(() => {
        dispatch(GetAllMeasuremenType())
        dispatch(fetchFoodTypeTopping())
        dispatch(GetAllOrderType())
    }, [])

    // useSelector
    const measurementList = useSelector((state) => state.ToppingSlices.measurementList)
    const singleEditTopping = useSelector((state) => state.ToppingSlices.singleData)
    const foodType = useSelector((state) => state.ToppingSlices.foodType)
    const orderTypeTemp = useSelector((state) => state.ToppingSlices.orderTypes)

    // useEffect function
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
            orderTypes: singleEditTopping.orderTypeList,
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

    useEffect(() => {
        if (orderTypeTemp) {
            const checkorderType = JSON.parse(JSON.stringify(orderTypeTemp));
            checkorderType.map((item) => {
                item.IsChecked = false;
                if (data.orderTypes) {
                    var tempmatch = data.orderTypes.filter(x => x.orderTypeId === item.orderTypeId);
                    if (tempmatch.length > 0 && edit.id > 0) {
                        item.IsChecked = true;
                    }
                }
            })
            setOrderTypeData(checkorderType)
        }
    }, [orderTypeTemp, data.orderTypes])

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
        const toppingPriceDatafromList = [];
        toppingPriseListData.map((topping) => {
            toppingPriceDatafromList.push(topping.seletedTopping)
        })
        setData({ ...data, toppingsPrices: toppingPriceDatafromList })
    }

    const combinationDataNameSend = (combinationdata) => {
        const combinationDataList = [];
        combinationdata && combinationdata.map((combination) => {
            combination.allTrailData.map((combinationTrail) => {
                combinationDataList.push(combinationTrail.selection)
            })
        })
        setData({ ...data, toppingCombinatiomQuantityList: combinationDataList })
    }

    const DiningChangeHandler = (checked, id, item) => {
        const updatedOrderType = orderType.map(order => {
            if (order.orderTypeId === id) {
                return {
                    ...order,
                    IsChecked: checked
                };
            }
            return order;
        });

        setOrderTypeData(updatedOrderType);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        let newArr = []
        orderType.map(obj => {
            if (obj.IsChecked) {
                newArr.push(obj.orderTypeId)
            }
        })

        let ToppingSaveUpdateData

        if (Object.keys(edit).length < 1) {
            ToppingSaveUpdateData = {
                ...data,
                loginUserID: parseInt(data.loginUserID),
                foodTypeId: parseInt(data.foodTypeId),
                measurementTypeId: parseInt(data.measurementTypeId),
                orderTypes: newArr
            }
        } else {

            ToppingSaveUpdateData = {
                ...data,
                // loginUserID: 2,
                toppingId: parseInt(edit.id),
                foodTypeId: parseInt(data.foodTypeId),
                measurementTypeId: parseInt(data.measurementTypeId),
                loginUserID: parseInt(data.loginUserID),
                orderTypes: newArr
            }
        }
        dispatch(fetchSaveUpdateToppings(ToppingSaveUpdateData))
        dispatch(resetStates())

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
            orderTypes: [],
            toppingsPrices: [],
            toppingCombinatiomQuantityList: []
        })
        Navigate(`/toppings`)
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
            orderTypes: [],
            toppingsPrices: [],
            toppingCombinatiomQuantityList: []
        })
    };

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
                                onChange={(e) => changeHandler(e)}
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
                                onChange={(e) => changeHandler(e)}
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
                                onChange={(e) => changeHandler(e)}
                            >
                                <option defaultValue>Select Category</option>
                                {foodType?.map(item => {
                                    return <option
                                        key={item.foodTypeId}
                                        value={item.foodTypeId}>
                                        {item.foodTypeName}
                                    </option>

                                })}
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
                                onChange={(e) => changeHandler(e)}
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
                            {orderType && orderType.map((item, ind) => (
                                <div className="form-check col-md-1" key={ind}>
                                    <input className="form-check-input"
                                        type="checkbox"
                                        name="toppingType"
                                        checked={item.IsChecked}
                                        onChange={(e) => DiningChangeHandler(e.target.checked, item.orderTypeId, item)}
                                    />
                                    <label className="form-check-label" htmlFor="Dining">
                                        {item.orderTypeName}
                                    </label>
                                </div>
                            ))
                            }
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