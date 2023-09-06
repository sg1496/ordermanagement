import React from 'react';
import images from '../../../../../assets/images';

const ComboMainTable = () =>{
    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0 text-center'>
                    <thead>
                        <tr>
                            <th scope="col" style={{width:"20%"}}>Combo Name</th>
                            <th scope="col" style={{width:"30%"}}>No. of Products</th>
                            <th scope="col" style={{width:"30%"}}>Price</th>
                            <th scope="col"style={{width:"20%"}}>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">Allo Tikki</td>
                            <td>AT</td>
                            <td>Yes</td>
                            
                            <td>
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">BBQ Chikken</td>
                            <td>BQC</td>
                            <td>Yes</td>
                            
                            <td>
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">Black Olive</td>
                            <td>BO</td>
                            <td>Yes</td>
                            
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

export default ComboMainTable;
