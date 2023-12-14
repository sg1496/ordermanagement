import React, { useEffect, useState } from 'react';
import "./Categories.scss";
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';
import { fetchApiDataCategory, fetchParentCategory } from '../../../../../Store/Slice/CategorySlices';

function Categories(props) {
    
    const dispatch = useDispatch();
    

    const categoryList = useSelector((category) => category.categorySlices.data)
    const parentCategories = useSelector(state => state.categorySlices.parentCategories)
    useEffect(() => {
        dispatch(fetchParentCategory())
        dispatch(fetchApiDataCategory())
    }, [])

    const [categoryData, setCategoryData] = useState([]);
    const [pCategoryData, setPCategoryData] = useState({
        parentCategoryId: ""
    });

    
    useEffect(() => {
        const newdata = []
        if (categoryList && props.productFormState.editProductCategory.length > 0) {
            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(categoryList));
            ToppingDatafinaltemp?.map((item) => {
                item.IsChecked = false;
                props.productFormState.editProductCategory.filter((selectcategory) => {
                    if ( selectcategory.parentCategoryId == item.parentCategoryId || selectcategory.categoryId == item.categoryId) {
                        item.IsChecked = true;
                        let dataas = { ...item, selectcategory }
                        newdata.push(dataas)
                    }
                })
            })
            setCategoryData(newdata)
        }
        else if (categoryList) {
            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(categoryList));
            ToppingDatafinaltemp?.map((item) => {
                item.IsChecked = false;
                let dataas = { ...item, selectcategory: { categoryId: item.categoryId, parentCategoryId: "" } }
                newdata.push(dataas)
            })
            setCategoryData(newdata)
        }
    }, [categoryList])

    const categoryChangeHandler = (check, categoryId, items) => {
        let newArr
        const itemselected = [...categoryData];
        if (check) {
            items.IsChecked = true;
            newArr = itemselected?.map((item) => {console.log("check itemselected", item)
                if ( item.categoryId == categoryId) {
                    return {
                        ...item,
                        selectcategory: {
                            parentCategoryId: pCategoryData.parentCategoryId,
                            categoryId: item.categoryId
                        }
                    };
                } else {
                    return item;
                }
            })
        } else {
            items.IsChecked = false;
            newArr = itemselected?.map((item) => {
                if (item.categoryId == categoryId) {
                    return {
                        ...item,
                        selectcategory: {
                            parentCategoryId: "",
                            categoryId: ""
                        }
                    };
                } else {
                    return item;
                }
            })
        }
        
        //  newArr.filter(x =>x.parentCategoryId != "" && x == categoryId).IsChecked = check;
        const finalcategoryData = newArr.filter(x => x.IsChecked === true)
        setCategoryData(newArr);
        // settestState(da)
        props.categoriesDataHandler(finalcategoryData)
    }

    

    const changeHandler = (e) => {
        setPCategoryData({
            ...pCategoryData,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const { parentCategoryId } = pCategoryData
    return (
        <>
            <div className="addProduct__categoryTab">
                <div className="addProduct__categoryTab">


                    <div className="field_width">
                        <label htmlFor="parentCategory" className="form-label inputForm__label" >
                            Select Parent Category:
                            <span className="formRequired">*</span>
                        </label>
                        <select
                            className="form-select "
                            name='parentCategoryId'
                            value={parentCategoryId}
                            onChange={changeHandler}
                        >
                            <option defaultValue>Select Category</option>
                            {parentCategories?.map((items) => {
                                return <option
                                    key={items.parentCategoryId}
                                    value={items.parentCategoryId}
                                >{items.parentCategoryName}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-12 mt-4 mb-4">
                        <div className="row ms-1">
                            {categoryData?.map((item, ind) => (
                                <div className="addProduct__subcategoryCheckboxes d-flex align-items-center col-md-1" key={ind}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="categoryId"
                                        checked={item.IsChecked} 
                                        onChange={(e) => categoryChangeHandler(e.target.checked, item.categoryId, item)}
                                    />
                                    <label className="inputFormCheckbox__label" htmlFor="Dining">
                                        {item.categoryName}
                                    </label>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Categories






