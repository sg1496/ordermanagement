import React, { useState } from "react";
import "./Basic.scss";
import { useDispatch } from "react-redux";
import { navTitle } from "../../../../../Store/Slice/NavSlices";
import { fetchSaveUpdateProduct } from "../../../../../Store/Slice/ProductSlices"
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../Buttons/NewButtons";

const Basic = (props) => {
    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));
    const Navigate = useNavigate();
    const basicEdit = useParams()

    
    const [data, setData] = useState({
        productName: "",
        isActive: false,
        isTaxable: false,
        foodTypeId: "",
        showInKitchen: false,
        taxClassId: ""

    })
    console.log(data);

    const changeHandler = (e) => {
        
          let newArr =  {
                ...data,
                [e.target.name]: e.target.value
            }
        setData(newArr)

        props.basicFormDataHandler(newArr)
    }

    
    const toggleChange = (e) => {
        let newArr ={ ...data, isActive: !data.isActive }
        setData(newArr)
        props.basicFormDataHandler(newArr)
    }


    const taxableChange = (e) => {
        let newArr = { ...data, isTaxable: !data.isTaxable }
            setData(newArr)
            props.basicFormDataHandler(newArr)
    }

    const showInKitchenHandler = (e) => {
        let newArr = { ...data, showInKitchen: !data.showInKitchen }
        setData(newArr)
            props.basicFormDataHandler(newArr)

    }

  
    
    const { productName, foodTypeId, taxClassId } = data

    return (
        <>
            <div className="addProduct__basicTab">
                {/* <form > */}
                   <div className="addProduct__basicForm d-flex ">
                        <div className="field_width">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Product Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Cheeze Burst"
                                onChange={changeHandler}
                                name="productName"
                                value={productName}
                                required
                            />
                        </div>
                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                is Active
                                <span className="formRequired ">*</span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                                checked={data && data.isActive}
                                onChange={toggleChange}
                            />
                        </div>

                        <div className="addProduct__isTaxable form-check form-switch">

                            <label htmlFor="isTaxable" className="form-label inputForm__label" >
                                is Taxable:
                                <span className="formRequired ">*</span>
                            </label>

                            <input
                                type="checkbox"
                                id="isTaxable"
                                className="form-check-input"
                                // onClick={handleisTaxable}
                                checked={data && data.isTaxable}
                                onChange={taxableChange}
                            />
                        </div>

                        {data.isTaxable && (
                            <div className="field_width">
                                <label htmlFor="taxClass" className="form-label inputForm__label" >
                                    Tax Class:
                                    <span className="formRequired">*</span>
                                </label>
                                <select className="form-select " id="taxClass" name="taxClassId" value={taxClassId} onChange={changeHandler} >
                                    <option defaultValue>Select Class</option>
                                    <option value="1">GST 0%</option>
                                    <option value="2">GST 5%</option>
                                    <option value="3">GST 18%</option>
                                </select>
                            </div>
                        )}
                        <div className="field_width">
                            <label htmlFor="foodtype" className="form-label inputForm__label">
                                Food Type:
                            </label>
                            <select className="form-select"
                                id="foodtype"
                                name="foodTypeId"
                                value={foodTypeId}
                                onChange={changeHandler}
                            >

                                <option defaultValue>Select</option>
                                <option value="1">Veg</option>
                                <option value="2">Non-Veg</option>
                            </select>
                        </div>
                        <div className="addProduct__kitchenScreen form-check form-switch">
                            <label htmlFor="showInKitchen" className="form-label inputForm__label" >
                                Kitchen Screen:
                                <span className="formRequired ">*</span>
                            </label>
                            <input
                                type="checkbox"
                                id="showInKitchen"
                                className="form-check-input"
                                checked={data && data.showInKitchen}
                                onChange={showInKitchenHandler}
                            />
                        </div>
                    </div>        
                   
                {/* </form> */}
            </div>
        </>
    );
}

export default Basic;
