import React, { useState, useEffect, useCallback } from 'react';
import Buttons from '../../../ProductComponent/Buttons/NewButtons';
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';
import { useNavigate, useParams } from "react-router-dom";
import { fetchSaveUpdateCategory, fetchEditCategory, resetStates, fetchApiDataCategory } from "../../../../../Store/Slice/CategorySlices";
import verifyToken from '../../../../SignIn/verifyToken';



const Categoryform = ({ setAlert }) => {
    const dispatch = useDispatch();
    dispatch(navTitle("Category"));
    const navigate = useNavigate()
    const edit = useParams()
    const loginToken = verifyToken()
    const editData = useSelector((state) => state.categorySlices.singleData)
    const categoryDatas = useSelector(state => state.categorySlices.data)

    console.log("check message cate", categoryDatas);
    

    const [categoryData, setCategoryData] = useState({
        categoryName: "",
        parentCategoryId: 0,
        isActive: false,
        franchiseID: 0,
        displayOrder: 0
    })

    useEffect(() => {
        dispatch(fetchApiDataCategory(loginToken.userID))
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
                franchiseID: 0,
                displayOrder: 0,
            })
        }
    }, [editData])

    const changeHandler = useCallback((e) => {
        setCategoryData(
            {
                ...categoryData,
                [e.target.name]: e.target.value
            }
        )
    }, [categoryData],
    )

    const cancelHandler = () => {
        navigate(`/dashboard/categorytable`)
    }

    const toppingAllowedHandler = useCallback(() => {
        setCategoryData({ ...categoryData, isActive: !categoryData.isActive })
    },
        [categoryData],
    )

    const submitHandler = async (event) => {
        event.preventDefault();

        let categorySaveUpdateData
        if (Object.keys(edit).length < 1) {
            categorySaveUpdateData = {
                ...categoryData,
                parentCategoryId: parseInt(categoryData.parentCategoryId),
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId

            }
        } else {
            categorySaveUpdateData = {
                ...categoryData,
                parentCategoryId: parseInt(categoryData.parentCategoryId),
                categoryId: parseInt(edit.id),
                franchiseID: loginToken.userID,
                parentUserId: loginToken.parentUserId
            }
        }
        const response = await dispatch(fetchSaveUpdateCategory(categorySaveUpdateData));
        dispatch(resetStates())

        if (response.payload.status === 200) {
            navigate(`/dashboard/categorytable`)
            setAlert({ type: "success", message: !edit.id ? "Category save successfully" : "Category update successfully"})
            setCategoryData({
                categoryName: "",
                parentCategoryId: "",
                isActive: false
            })
        } else {
            setAlert({ type: "error", message: response.payload.message })
        }
    }



    const { categoryName, parentCategoryId } = categoryData
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
                                value={categoryData.parentCategoryId}
                                onChange={changeHandler}
                                id="taxClass"
                            >
                                <option defaultValue>Select Category</option>
                                {categoryDatas?.map((items) => {
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