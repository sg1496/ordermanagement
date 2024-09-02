import React from 'react';
import "./manageRoleAddBtn.scss";
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const ManageRoleAddBtn = () => {
    return (
        <div className='product_searchField d-flex justify-content-end'>
            
            <div className="product__innerAddnewButtons">
                <Link to="/dashboard/manageroleform">
                    <FontAwesomeIcon icon={faSquarePlus} />
                    <span className='ps-2'>Add New</span>
                </Link>
               
            </div>
        </div >
    )
}

export default ManageRoleAddBtn