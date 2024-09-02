import React from 'react';
import "./UserTableAddbtn.scss";
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


function UserTableAddbtn() {
    return (
        <div className='product_searchField d-flex justify-content-end'>
            
            <div className="product__innerAddnewButtons">
                <Link to="/dashboard/manageuserform">
                    <FontAwesomeIcon icon={faSquarePlus} />
                    <span className='ps-2'>Add New</span>
                </Link>
               
            </div>
        </div >
    )
}

export default UserTableAddbtn