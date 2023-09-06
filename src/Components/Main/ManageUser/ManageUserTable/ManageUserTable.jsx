import React from 'react';

import images from "../../../../assets/images"

function ManageUserTable() {
    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead className='text-center'>
                        <tr>
                            <th scope="col" style={{width:"40%"}}>User Email</th>
                            <th scope="col" style={{width:"20%"}}>User Name</th>
                            <th scope="col" style={{width:"20%"}}>Contact Number</th>
                            <th scope="col" style={{width:"20%"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row" >Attinder@pizzastate.in</td>                            
                            <td className='text-center'>AttinderSingh </td>
                            <td className='text-center'>7888706353</td>
                            <td >
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">Sanjeev_ghavri79@yahoo.co.in</td>                           
                            <td className='text-center'>Sanjeev Kumar</td>
                            <td className='text-center'>8264818783</td>
                            <td >
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">abcd@gmail.com</td>                           
                            <td className='text-center'>Abcd</td>
                            <td className='text-center'>8284858687</td>
                            <td >
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

export default ManageUserTable;
