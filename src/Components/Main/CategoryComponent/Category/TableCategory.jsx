import React, { useEffect, useState } from 'react';
import "./Category.scss";
import images from "../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import verifyToken from '../../../SignIn/verifyToken';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { fetchApiDataCategory, fetchDelApiDataCategory, fetchEditCategory, resetStates } from "../../../../Store/Slice/CategorySlices";
import AlertDialog from '../../../utils/DeleteConfirmationAlert';

const TableCategory = ({ setAlert }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const loginToken = verifyToken();
  const [categoryData, setCategoryData] = useState(null);
  const [deleteModel, setDeleteModel] = useState({ check: false, id: null })
  const [page, setPage] = useState(1);
  const pagePerItem = 10;

  const deleteMessage = useSelector((state) => state.categorySlices.message);
  const search = useSelector((state) => state.categorySlices.search);
  const categoryDatas = useSelector(state => state.categorySlices.data);

  useEffect(() => {
    dispatch(fetchApiDataCategory(loginToken.userID))
  }, [deleteMessage]);

  useEffect(() => {
    if (categoryDatas && categoryDatas) {
      const filteredData = categoryDatas?.filter((item) => {
        return (
          item.categoryName.toLowerCase().includes(search.toLowerCase())
        )
      })
      setCategoryData(filteredData)
    }
  }, [search, categoryDatas])


  const changePageHandler = (event, newPage) => {
    setPage(newPage)
  }

  const closehandler = () => {
    setDeleteModel({ check: false })
  }

  const deletehandler = () => {
    dispatch(fetchDelApiDataCategory(deleteModel.id))
    setDeleteModel({ check: false, id: null })
    setAlert({ type: "success", message: "Category deleted successfully" })
  }

  console.log("check category", categoryDatas);
  

  return (
    <>
      <AlertDialog
        open={deleteModel}
        onClose={closehandler}
        title="Confirmation"
        message="Are you sure you want to delete category"
        onDelete={deletehandler}
      />

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

            {categoryData?.length > 0 ?
              (
                categoryData?.slice((page - 1) * pagePerItem, page * pagePerItem)?.map((category, index) => (
                  <tr key={index}>
                    <td>{category.categoryName}</td>
                    <td>{category.displayOrder}</td>
                    <td> <div className="productAction__buttons d-flex">
                      <span>
                        <img src={images.editIcon} alt="Edit Icon"
                          onClick={() => (dispatch(fetchEditCategory(category.categoryId)), navigate(`/dashboard/add-category/category/${category.categoryId}`))}
                        />
                      </span>
                      <span ><img src={images.deleteIcon} alt="Delete Icon" onClick={() => (setDeleteModel({ check: true, id: category.categoryId }), dispatch(resetStates()))} /></span>
                    </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <div className='d-flex justify-content-center align-items-center'>
                      {categoryData?.length >= 0 ? (
                        <p className='empty_message'>Your Category list is currently empty</p>
                      ) : (<Stack>
                        <CircularProgress color="secondary" />
                      </Stack>)}
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <div className='wrapper'>
          {pagePerItem < categoryData?.length &&
            <Stack>
              <Pagination
                color='primary'
                count={Math.ceil((categoryData && categoryData ? categoryData?.length : 0) / pagePerItem)}
                page={page}
                onChange={changePageHandler}
              />
            </Stack>
          }
        </div>
      </div >
    </>
  )
}

export default TableCategory;