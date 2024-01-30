import React, { useEffect, useState } from 'react';
import "./Category.scss";
import images from "../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import verifyToken from '../../../SignIn/verifyToken';
import { fetchApiDataCategory, fetchDelApiDataCategory, fetchEditCategory, resetStates } from "../../../../Store/Slice/CategorySlices";




const TableCategory = () => {
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const loginToken = verifyToken()

  const deleteMessage = useSelector((state) => state.categorySlices.message)


  useEffect(() => {
    dispatch(fetchApiDataCategory(loginToken.userID))
  }, [deleteMessage]);
  const categoryDatas1 = useSelector(state => state)
  console.log("///////////////////////////",categoryDatas1);

  // const [categoryDatas, setCategoryDatas]= useState(useSelector(state => state.categorySlices.data))
  const categoryDatas = useSelector(state => state.categorySlices.data)
  console.log(categoryDatas);

  return (
    <>

      <div className='productSection__table mt-3'>
        <table className='table m-0'>
          <thead>
            <tr>
              <th scope="col">Category Name</th>
              <th scope="col">Display Order</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {categoryDatas && categoryDatas.map((category, index) => (
              <tr key={index}>
                <td>{category.categoryName}</td>
                <td>{category.displayOrder}</td>
                <td> <div className="productAction__buttons d-flex">
                  <span>
                    <img src={images.editIcon} alt="Edit Icon"
                      onClick={() => (dispatch(fetchEditCategory(category.categoryId)), Navigate(`/add-category/category/${category.categoryId}`))}
                    />
                  </span>

                  <span ><img src={images.deleteIcon} alt="Delete Icon" onClick={() => (dispatch(fetchDelApiDataCategory(category.categoryId)), dispatch(resetStates()))} /></span>

                </div></td>

              </tr>
            ))
            }
          </tbody>
        </table>
      </div >
    </>
  )
}

export default TableCategory;