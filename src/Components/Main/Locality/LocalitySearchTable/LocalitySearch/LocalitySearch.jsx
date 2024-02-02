import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { searchStates } from '../../../../../Store/Slice/LocalitySlices';

function LocalitySearch() {
    const dispatch = useDispatch()    

    const searchHandler = (e)=> {
        dispatch(searchStates(e.target.value))
    }

    const searchdata = useSelector((ser)=>ser.LocalitySlices.search)

    console.log("searcha",searchdata)



    return (
        <>
            <div className='product_searchField d-flex justify-content-end'>                
                <div className="product__innerSearchInput position-relative w-100">
                    <input type="search" className='w-100' placeholder='Search...' onChange={searchHandler} />
                    <FontAwesomeIcon icon={faSearch} className='product__innerSearchInputIcon position-absolute' />
                </div>


                <div className="product__innerAddnewButtons">
                    <Link to="/locality_form">
                        <FontAwesomeIcon icon={faSquarePlus} />
                        <span className='ps-2'>Add New</span>
                    </Link>
                </div>

            </div >
        </>
    )
}

export default LocalitySearch;