import React, { useEffect, useState } from 'react';
import "./TableSearch.scss";
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { searchStates } from '../../../../Store/Slice/LocalitySlices';



function Tablesearch() { 
    const dispatch = useDispatch()

    const useBut = useSelector((aa)=>aa.CategorySlices.XyzPro)
    

    return (
        <div className='product_searchField d-flex justify-content-between'>
            <div className="product__innerSearchInput position-relative w-100">
                <input type="search" className='w-100'  placeholder='Search...' onChange={(e)=>dispatch(searchStates(e.target.value))} />
                <FontAwesomeIcon icon={faSearch} className='product__innerSearchInputIcon position-absolute' />
            </div>
            <div className="product__innerAddnewButtons">
                <Link to="/add-category/category">
                    <FontAwesomeIcon icon={faSquarePlus} />
                    <span className='ps-2'>Add New</span>
                </Link>

            </div>
        </div >
    )
}

export default Tablesearch;
