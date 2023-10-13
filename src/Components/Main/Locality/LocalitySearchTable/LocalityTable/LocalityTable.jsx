import React, { useEffect } from 'react';
import "./LocalityTable.scss";
import images from "../../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';
import { useNavigate } from 'react-router-dom';
import { fetchAllDataLocality, fetchDeleteDataLocality, fetchSingleDataLocality, resetStates } from '../../../../../Store/Slice/LocalitySlices';

const LocalityTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    dispatch(navTitle("Manage Locality"));

    const LocalityMessage = useSelector((locality) => locality.LocalitySlices.message);
    const LocalityAllData = useSelector((locality) => locality.LocalitySlices.data);  

    useEffect(() => {
        dispatch(fetchAllDataLocality())
    }, [LocalityMessage])   
    

    return (
        <>
            <div className='productSection__table mt-3'>
                <table className=' table'>
                    <thead className='text-center' >
                        <tr>
                            <th scope="col" style={{ width: "50%" }} >Locality Names</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {LocalityAllData?.map((item, index) => {
                            return <tr key={index}>
                                <td scope="row" >{item.localityName}</td>

                                <td scope="row"> <div className="productAction__buttons d-flex justify-content-center" >
                                    <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchSingleDataLocality(item.localityID)), navigate(`/locality_form/${item.localityID}`))} /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" onClick={()=>(dispatch(fetchDeleteDataLocality(item.localityID)), dispatch(resetStates()))} /></span>
                                </div></td>

                            </tr>
                        })
                        }

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default LocalityTable;