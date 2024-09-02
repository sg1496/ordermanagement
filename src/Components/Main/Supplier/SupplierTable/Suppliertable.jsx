import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import images from "../../../../assets/images";
import { useNavigate } from 'react-router-dom';
import verifyToken from '../../../SignIn/verifyToken';
import { Stack, CircularProgress, Pagination } from '@mui/material';
import { fetchAllDataSupplier, fetchDeleteDataSupplier, fetchSingleDataSupplier, resetStates } from '../../../../Store/Slice/SupplierSlices';
import AlertDialog from '../../../utils/DeleteConfirmationAlert';


function SupplierTable({ setAlert }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginToken = verifyToken();

  const [supplierData, setSupplierData] = useState(null)
  const [deleteModel, setDeleteModel] = useState({ check: false, id: null })
  const [page, setPage] = useState(1)
  const pagePerItem = 10;

  const message = useSelector((supplierdata) => supplierdata.SupplierSlices.message);
  const AllDataSupplier = useSelector((supplierdata) => supplierdata.SupplierSlices.data);
  const searchText = useSelector((state) => state.SupplierSlices.search)



  useEffect(() => {
    dispatch(fetchAllDataSupplier(loginToken.userID))
  }, [message])

  useEffect(() => {
    if (AllDataSupplier && AllDataSupplier) {
      const filteredData = AllDataSupplier?.filter((item) => {
        return (
          item.suppilerName.toLowerCase().includes(searchText.toLowerCase())
        )
      })
      setSupplierData(filteredData)
      setPage(1)
    }
  }, [AllDataSupplier, searchText])

  const changePageHandler = (event, newPage) => {
    setPage(newPage)
  }

  const closeHandler = () => {
    setDeleteModel({ check: false })
  }

  const deleteHandler = () => {
    dispatch(fetchDeleteDataSupplier(deleteModel.id))
    setDeleteModel({ check: false, id: null })
    setAlert({ type: "success", message: "Supplier delete successfully" })
  }

  return (
    <>
      <AlertDialog
        open={deleteModel}
        onClose={closeHandler}
        title="Confirmation"
        message="Are you sure you want to delete Supplier"
        onDelete={deleteHandler}
      />

      <div className='productSection__table mt-3'>
        <table className='table m-0'>
          <thead>
            <tr>
              <th scope="col" style={{ width: "50%" }}>Supplier Name</th>
              <th className='text-center' scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {!supplierData ?
              <tr>
                <td colSpan={2}>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Stack>
                      <CircularProgress color="secondary" />
                    </Stack>
                  </div>
                </td>
              </tr>
              :
              supplierData?.slice((page - 1) * pagePerItem, page * pagePerItem)?.map((item, index) => {
                return <tr key={index}>
                  <td scope="row">{item.suppilerName}</td>
                  <td >
                    <div className="productAction__buttons d-flex justify-content-center">
                      <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchSingleDataSupplier(item.suppilerID)), navigate(`/dashboard/supplierform/${item.suppilerID}`))} /></span>
                      <span><img src={images.deleteIcon} alt="Delete Icon" onClick={() => (setDeleteModel({ check: true, id: item.suppilerID }), dispatch(resetStates()))} /></span>
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
        <div className='wrapper'>
          {pagePerItem < supplierData?.length && <Stack>
            <Pagination
              color="primary"
              count={Math.ceil(supplierData && supplierData ? supplierData?.length : 0) / pagePerItem}
              page={page}
              onChange={changePageHandler}
            />
          </Stack>}
        </div>
      </div >
    </>
  )
}

export default SupplierTable;