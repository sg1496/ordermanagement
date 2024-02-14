import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import images from "../../../../assets/images";
import { useNavigate } from 'react-router-dom';
import verifyToken from '../../../SignIn/verifyToken';
import { fetchAllDataSupplier, fetchDeleteDataSupplier,fetchSingleDataSupplier,resetStates } from '../../../../Store/Slice/SupplierSlices';
import { useSearchData } from '../../CustomHook/useSearchData';


function SupplierTable() {
  const navigate = useNavigate()
const dispatch = useDispatch()
const loginToken = verifyToken()

const message = useSelector((supplierdata)=>supplierdata.SupplierSlices.message)
const AllDataSupplier = useSelector((supplierdata) => supplierdata.SupplierSlices.data)

const search = useSearchData(AllDataSupplier, "suppilerName")

useEffect(() => {
  dispatch(fetchAllDataSupplier(loginToken.userID))
   }, [message])



  
  return (
    <>
      
      <div className='productSection__table mt-3'>
        <table className='table m-0'>
          <thead>
            <tr>
              <th scope="col" style={{width:"50%"}}>Supplier Name</th>
              <th className='text-center' scope="col">Action</th>
            </tr>
          </thead>
          <tbody> 
           {search?.map((item, index)=>{
            return <tr key={index}>
              <td scope="row">{item.suppilerName}</td>
              <td >
                <div className="productAction__buttons d-flex justify-content-center">
                  <span><img src={images.editIcon} alt="Edit Icon" onClick={()=>(dispatch(fetchSingleDataSupplier(item.suppilerID)),  navigate(`/supplierform/${item.suppilerID}`))} /></span>
                  <span><img src={images.deleteIcon} alt="Delete Icon" onClick={()=>(dispatch(fetchDeleteDataSupplier(item.suppilerID)),dispatch(resetStates()))} /></span>
                </div>
              </td>
            </tr>
            })
            }
          </tbody>
        </table>
      </div >
    </>
  )
}

export default SupplierTable;