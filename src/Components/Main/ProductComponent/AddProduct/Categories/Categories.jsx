import React, { useEffect, useState } from 'react';
import "./Categories.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataCategory } from '../../../../../Store/Slice/CategorySlices';
import verifyToken from '../../../../SignIn/verifyToken';

function Categories(props) {
    const dispatch = useDispatch();
    const loginToken = verifyToken()
    const categoryList = useSelector((category) => category.categorySlices.data)

    useEffect(() => {
        dispatch(fetchApiDataCategory(loginToken.userID))
    }, [])

    const [categoryData, setCategoryData] = useState([]);




    useEffect(() => {
        const newdata = [];

        if (categoryList && props.productFormState.editProductCategory.length > 0) {
            let subCategoryDataSort = categoryList?.filter(item => item.parentCategoryId == props?.productFormState?.parentCategoryId)

            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(subCategoryDataSort));
            console.log("check filter", ToppingDatafinaltemp);
            ToppingDatafinaltemp?.map((item) => {
                item.IsChecked = false;
                let dataas;

                props.productFormState.editProductCategory.map((selectcategory) => {
                    if (selectcategory.categoryId === item.categoryId) {
                        item.IsChecked = true;
                        dataas = { ...item, selectcategory };
                    } else {
                        dataas = { ...item, selectcategory: { categoryId: item.categoryId } };
                    }
                });
                dataas = { ...dataas };
                newdata.push(dataas);
                console.log("check newdata category", newdata);
                
            });
            setCategoryData(newdata);
        } else if (categoryList) {
            let filteredCategory = categoryList?.filter(item => item.parentCategoryId == props.productFormState.parentCategoryId)
            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(filteredCategory));
            ToppingDatafinaltemp?.map((item) => {
                item.IsChecked = false;
                let dataas = { ...item, selectcategory: { categoryId: item.categoryId } };
                newdata.push(dataas);
            });
            setCategoryData(newdata);
        }
    }, [categoryList, props.productFormState.editProductCategory, props.productFormState.parentCategoryId]);

    // chang for checkbox
    const categoryChangeHandler = (check, categoryId, items) => {
        const itemselected = [...categoryData];
        if (check) {
            items.IsChecked = true;
        }
        else {
            items.IsChecked = false;
        }
        itemselected.filter(x => x.categoryId === categoryId).IsChecked = check;
        setCategoryData(itemselected);
        let abc = []
        itemselected?.filter((check) => {
            if (check.IsChecked === true) {
                let y = { ...check }
                abc.push(y)
            }
        })
        props.categoriesDataHandler(abc)
    }

    const changeHandler = (e) => {
        let newArr = {
            ...props.productFormState,
            [e.target.name]: e.target.value
        }
        props.parentCategoriesDataHandler(newArr)
    }

    // const { parentCategoryId } = pCategoryData
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
                            value={props.productFormState.parentCategoryId}
                            onChange={changeHandler}
                        >
                            <option defaultValue>Select Category</option>
                            {categoryList?.map((items) => {
                                return <option
                                    key={items.categoryId}
                                    value={items.categoryId}
                                >{items.categoryName}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-12 mt-4 mb-4">
                        <div className="row ms-1">
                            {categoryData?.map((item, ind) => (
                                <div className="addProduct__subcategoryCheckboxes d-flex align-items-center col-md-auto" key={ind}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="categoryId"
                                        checked={item.IsChecked}
                                        onChange={(e) => categoryChangeHandler(e.target.checked, item.categoryId, item)}
                                    />
                                    <label className="inputFormCheckbox__label mx-1" htmlFor="Dining">
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






