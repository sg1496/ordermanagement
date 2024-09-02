import React from 'react';
import "./SupplierTablesearch.scss";
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchStates } from '../../../../Store/Slice/SupplierSlices';


function SupplierTablesearch() {
    const dispatch = useDispatch()

    const searchHandler = (e) => {
        dispatch(searchStates(e.target.value))
    }

    return (
        <div className='product_searchField d-flex justify-content-between'>
            <div className="product__innerSearchInput position-relative w-100">
                <input type="search" className='w-100' onChange={searchHandler} placeholder='Search...' />
                <FontAwesomeIcon icon={faSearch} className='product__innerSearchInputIcon position-absolute' />
            </div>
            <div className="product__innerAddnewButtons">
                <Link to="/dashboard/supplierform">
                    <FontAwesomeIcon icon={faSquarePlus} />
                    <span className='ps-2'>Add New</span>
                </Link>

            </div>
        </div >
    )
}

export default SupplierTablesearch;