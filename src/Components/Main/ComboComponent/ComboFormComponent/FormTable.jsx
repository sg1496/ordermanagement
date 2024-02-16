import React, { useEffect, useState } from 'react';
import plus from "../../../../assets/svg/plus.svg"
import subtract from "../../../../assets/svg/subtract.svg"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataCategory } from '../../../../Store/Slice/CategorySlices';
import verifyToken from '../../../SignIn/verifyToken';
import { fetchApiDataProduct } from '../../../../Store/Slice/ProductSlices';
import { fetchApiData } from '../../../../Store/Slice/VariantSlices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';



function FormTable(props) {
    console.log("props", props.comboStateData.comboProductDetail)
    const loginToken = verifyToken()
    const dispatch = useDispatch()
    const comboID = useParams()
    const [firsts, setfirsts] = useState([
        {
            optionalId: "",
            categoryID: "",
            productId: "",
            variantID: "",
            quantity: "",
            isDeleted: 0,
        },
        {
            optionalId: "",
            categoryID: "",
            productId: "",
            variantID: "",
            quantity: "",
            isDeleted: 0,
        }
    ])

    useEffect(() => {


        let checkOptionid = props.comboStateData.comboProductDetail.map((item, index) => {
            if (item.categoryID) {
                return {
                    optionalId: 1,
                    categoryID: item.categoryID,
                    productId: item.productId,
                    variantID: item.variantID,
                    quantity: item.quantity,
                    isDeleted: 0,
                }
            } else {
                return item
            }
        })
        console.log("cehek state12121", checkOptionid)
        if (comboID.id) {
            setfirsts([...checkOptionid,
            ])
        }
    }, [props.comboStateData.comboProductDetail])

    console.log("cehek state", firsts)



    useEffect(() => {
        dispatch(fetchApiData(loginToken.userID))
        dispatch(fetchApiDataCategory(loginToken.userID))
        dispatch(fetchApiDataProduct(loginToken.userID))
    }, [])

    const categoryDatas = useSelector(category => category.CategorySlices.data)
    const productDatas = useSelector(category => category.ProductSlices.data)
    const variantDatas = useSelector(category => category.VariantSlices.data)

    const changeHandler = (e, i) => {
        const { name, value } = e.target;
        const onChangeValue = [...firsts]
        onChangeValue[i][name] = parseInt(value);
        setfirsts(onChangeValue)

        props.comboTableData(onChangeValue)
    }

    const addHandler = () => {
        setfirsts([...firsts, {}])
    }

    const removeHandler = (e, i) => {

        const { name, checked } = e.target;
        const onChangeValue = [...firsts]
        onChangeValue[i][name] = checked;
        console.log("check state", { name, checked })
        // setfirsts(onChangeValue)
    }






    return (
        <>
            <div className='productSection__table mt-5'>
                <div className='product_searchField d-flex justify-content-end'>
                    <button type='button' style={{ backgroundColor: "#C53705", border: "none", borderRadius: "8px", color: "white" }} className='mb-2 px-3 py-2' onClick={addHandler}>
                        <div className="product__innerAddnewButtons">
                            <FontAwesomeIcon icon={faSquarePlus} />
                            <span className='ps-2'>Add New</span>
                        </div>
                    </button>

                </div >
                <table className='table m-0 text-center'>
                    <thead >
                        <tr style={{ width: "100%" }}>
                            <th style={{ border: "Transparent", width: "20%" }} >
                            </th>
                            <th scope="col"  >
                                Category
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                                Product
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                                Variant
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                                Quantity
                            </th>
                            <th style={{ border: "Transparent", width: "20%" }}>
                                Price
                            </th>
                            <th scope="col">

                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {firsts?.map((item, index) => {
                            return <tr key={index}>
                                <td  >

                                    <div className="addProduct__productName  ">
                                        <select className=" inputForm__inputField " id="taxClass" name='optionalId' value={firsts[index].optionalId} onChange={(e) => changeHandler(e, index)} required >
                                            <option disabled selected value="">-- select an option --</option>
                                            <option value="1">And</option>
                                            <option value="2">Or</option>
                                        </select>

                                    </div>
                                </td>
                                <td  >
                                    {firsts[index].optionalId == 1 && <div className="addProduct__productName ">
                                        <select className=" inputForm__inputField" name="categoryID" id="cars" value={firsts[index].categoryID} required onChange={(e) => changeHandler(e, index)}>
                                            <option disabled selected value="">-- select a Category --</option>
                                            {categoryDatas?.map((category) => {
                                                return <option key={category.categoryId}
                                                    value={category.categoryId}>{category.categoryName}</option>
                                            })}
                                        </select>
                                    </div>}
                                </td>
                                <td className='text-center'>
                                    <div className="addProduct__productName text-center" >
                                        <select className="inputForm__inputField " name='productId' value={firsts[index].productId} onChange={(e) => changeHandler(e, index)} required>
                                            <option disabled selected value="">-- select a Product --</option>
                                            {productDatas?.map((product) => {
                                                return <option
                                                    key={product.productId}
                                                    value={product.productId}
                                                >
                                                    {product.productName}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </td>
                                <td className='text-center'>
                                    <div className="addProduct__productName text-center">
                                        <select className="inputForm__inputField" name='variantID' value={firsts[index].variantID} onChange={(e) => changeHandler(e, index)} required >
                                            <option disabled selected value="">-- select a Variant --</option>
                                            {variantDatas && variantDatas.map((variant) => {
                                                return <option
                                                    key={variant.variantId}
                                                    value={variant.variantId}
                                                >
                                                    {variant.variantName}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </td>

                                <td >
                                    <div className="addProduct__productName text-center">

                                        <input
                                            type="number"
                                            id="product-name"
                                            className=" inputForm__inputField "
                                            placeholder="0"
                                            name='quantity'
                                            value={firsts[index].quantity}
                                            onChange={(e) => changeHandler(e, index)}
                                            required
                                        />
                                    </div>
                                </td>
                                <td >
                                    255
                                </td>
                                <td>
                                    <span>
                                        <img
                                            src={subtract}
                                            alt="Delete Icon"
                                            type="checkbox"
                                            name='isDeleted'
                                            checked={true}
                                            onClick={(e) => removeHandler(e, index)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default FormTable;