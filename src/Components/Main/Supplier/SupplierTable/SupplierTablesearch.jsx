import React from 'react';
import "./SupplierTablesearch.scss";
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


function SupplierTablesearch() {
    return (
        <div className='product_searchField d-flex justify-content-between'>
            <div className="product__innerSearchInput position-relative w-100">
                <input type="search" className='w-100' placeholder='Search...' />
                <FontAwesomeIcon icon={faSearch} className='product__innerSearchInputIcon position-absolute' />
            </div>
            <div className="product__innerAddnewButtons">
                <Link to="/supplierform">
                    <FontAwesomeIcon icon={faSquarePlus} />
                    <span className='ps-2'>Add New</span>
                </Link>
               
            </div>
        </div >
    )
}

export default SupplierTablesearch;