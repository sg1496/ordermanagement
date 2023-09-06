import React from 'react';
import images from "../../../../assets/images"



function SupplierTable() {
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
            <tr>
              <td scope="row">Achari Mix</td>
              <td >
                <div className="productAction__buttons d-flex justify-content-center">
                  <span><img src={images.editIcon} alt="Edit Icon" /></span>
                  <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                </div>
              </td>
            </tr>
            <tr>
              <td scope="row">Achari Mix</td>
              <td>
                <div className="productAction__buttons d-flex justify-content-center">
                  <span><img src={images.editIcon} alt="Edit Icon" /></span>
                  <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                </div>
              </td>
            </tr>
            <tr >
              <td scope="row">Achari Mix</td>
              <td>
                <div className="productAction__buttons d-flex justify-content-center">
                  <span><img src={images.editIcon} alt="Edit Icon" /></span>
                  <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div >
    </>
  )
}

export default SupplierTable;