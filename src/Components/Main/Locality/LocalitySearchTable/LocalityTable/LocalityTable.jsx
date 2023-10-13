import React from 'react';
import "./LocalityTable.scss";
import images from "../../../../../assets/images"
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';

const LocalityTable = () => {
    const dispatch = useDispatch();
    dispatch(navTitle("Manage Locality"));
    return (
        <>
            <div className='productSection__table mt-3'>
                <table className=' table'>
                    <thead className='text-center' >
                        <tr>
                            <th scope="col" style={{width:"50%"}} >Locality Names</th>                         
                            <th scope="col">Actions</th>
                           
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td scope="row" >Ravindra Enclave PH2</td>   
                                                   
                            <td scope="row"> <div className="productAction__buttons d-flex justify-content-center" >
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div></td>
                            
                        </tr>
                        <tr>
                            <td scope="row">Ambala Road</td>
                         
                            <td scope="row">
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">DHAKOLI Krishna Enclave</td>
                          
                            <td>
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                    
                    <tr>
                            <td scope="row">Ekta Vihar</td>
                          
                            <td>
                                <div className="productAction__buttons d-flex justify-content-center">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">Hello Majra</td>
                          
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

export default LocalityTable;