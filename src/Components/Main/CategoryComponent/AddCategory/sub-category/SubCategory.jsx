import React from 'react';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';
import Buttons from '../../../ProductComponent/Buttons/NewButtons';

const  SubCategory = () => {
  const dispatch = useDispatch();
  dispatch(navTitle("Category"));

  return (
    <>
      
      <div className='productSection__table mt-3'>
        <table className='table m-0'>
          <thead>
            <tr>
              <th scope="col" style={{width:"50%"}}>sub Category Name</th>
              <th scope="col">Display Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">non-veg</td>
              <td>1</td>
              
            </tr>
            <tr>
              <td scope="row">veg</td>
              <td>3</td>
              
            </tr>
            <tr>
              <td scope="row">veg</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
        <Buttons fname = "Update Display Order"
        Sname="Cancel"/>
      </div >
    </>
  )
}

export default SubCategory;
