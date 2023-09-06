import React, { useState, useEffect } from 'react';
import Buttons from '../../../ProductComponent/Buttons/NewButtons';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';
import axios, { all } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSaveUpdateCategory, fetchEditCategory, fetchDropDown, resetStates } from "../../../../../Store/Slice/CategorySlices";


const Categoryform = () => {
    const Navigate = useNavigate()
    let url = import.meta.env.VITE_APP_FOODS_API
    const editData = useSelector((state) => state.categorySlices.singleData)
    const categoryDatas = useSelector(state => state.categorySlices.data)
    console.log("categoryDatas", categoryDatas);



    const [dropDownvlu, setDropDownVlu] = useState([])
    const [categoryData, setCategoryData] = useState({
        categoryName: "",
        parentCategoryId: 0,
        isActive: false,
        loginUserID: 0,
        displayOrder: 0,
        franchiseID: 0
    })

    
    const edit = useParams()
    console.log("iiiiiiiiiiiiiiiiiiiiiiid",edit);
    

    useEffect(() => {

        dispatch(fetchDropDown())
        // dropdowndata()
        if (edit.id != undefined) {
            dispatch(fetchEditCategory(edit.id))
        }
    }, [edit]);

    useEffect(() => {
        !editData ? setCategoryData({
            ...categoryData
        }) : setCategoryData({
            categoryName: editData.categoryName,
            parentCategoryId: editData.parentCategoryId,
            isActive: editData.isActive
        })
        if (!edit.id) {
            setCategoryData({
                categoryName: "",
                parentCategoryId: 0,
                isActive: false,
                loginUserID: 0,
                displayOrder: 0,
                franchiseID: 0
            })
        }
    }, [editData])


    const dropdowndata = async () => {
        const response = await axios.get(`${url}/category/GetAllCategories`)
        setDropDownVlu(response.data.categorylst)
    }

    const changeHandler = (e) => {
        setCategoryData(
            {
                ...categoryData,
                [e.target.name]: e.target.value
            }
        )
    }

    const cancelHandler = () => {
        Navigate(`/categorytable`)
    }

    const toppingAllowedHandler = () => {
        setCategoryData({ ...categoryData, isActive: !categoryData.isActive })
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        let categorySaveUpdateData
        if (Object.keys(edit).length < 1) {
            categorySaveUpdateData = {
                ...categoryData,
                parentCategoryId: parseInt(categoryData.parentCategoryId),

            }
        } else {
            categorySaveUpdateData = {
                ...categoryData,
                parentCategoryId: parseInt(categoryData.parentCategoryId),
                categoryId: parseInt(edit.id)
            }
        }
        dispatch(fetchSaveUpdateCategory(categorySaveUpdateData))
        dispatch(resetStates())

        Navigate(`/categorytable`)

        setCategoryData({
            categoryName: "",
            parentCategoryId: "",
            isActive: false
        })


    }


    const dispatch = useDispatch();
    dispatch(navTitle("Category"));

    const { categoryName, parentCategoryId, } = categoryData
    return (
        <>
            <div className="addProduct__basicTabs">
                <form onSubmit={submitHandler}>

                    <div className="addProduct__basic d-flex mb-4">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Category Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='categoryName'
                                value={categoryData.categoryName}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="addProduct__productNamed">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Parent Category:
                            </label>
                            <select
                                className="form-select "
                                name='parentCategoryId'
                                value={parentCategoryId}
                                onChange={changeHandler}
                                id="taxClass"
                            >
                                <option defaultValue>Select Category</option>
                                {categoryDatas && categoryDatas.map(items => {
                                    return <option
                                        key={items.categoryId}
                                        value={items.categoryId}
                                    >{items.categoryName}</option>;
                                })}

                            </select>
                        </div>

                        <div className="addProduct__isActive form-check form-switch">
                            <label htmlFor="isActive" className="form-label inputForm__label">
                                Is Topping Allowed ?: *
                                <span className="formRequired "></span>
                            </label>
                            <input
                                type="checkbox"
                                id="isActive"
                                className="form-check-input"
                                name='toppingallowed'
                                checked={categoryData.isActive}
                                onChange={toppingAllowedHandler}
                            />
                        </div>

                    </div>
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
export default Categoryform;
















// const submitHandler = async (event) => {
//     event.preventDefault();
    // const categoryiesdata = { ...categoryData };
    // console.log("cllllickkkkkkkk");

    // url = `${url}/category/SaveupdateCategory`
    // const datas = {
    //     categoryName: categoryiesdata.categoryName,
    //     parentCategoryId: parseInt(categoryiesdata.parentCategoryId),
    //     isActive: categoryiesdata.isActive,
    //     categoryId: Object.keys(edit).length < 1 ? 0 : parseInt(categoryiesdata.categoryId),
    //     loginUserID: 0,
    //     displayOrder: 0,
    //     franchiseID: 0
    // }

    // console.log("data ", datas);
    // const result = await axios.post(url, datas)
    // console.log(result);
    // Navigate(`/categorytable`)

    // setCategoryData({
    //     categoryName: "",
    //     parentCategoryId
    //         : "",
    //     isActive: false
    // })