import React from 'react';
import { Link } from 'react-router-dom';
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { seachStates } from '../../../../../Store/Slice/ToppingSlices';

function ToppingSearch(e) {
    const dispatch = useDispatch();

    const searchHandler = (e) => {
        dispatch(seachStates(e.target.value))
    }


    return (
        <>
            <div className='product_searchField d-flex justify-content-between'>
                <div className="product__innerSearchInput position-relative w-100">
                    <input type="search" className='w-100' placeholder='Search...' onChange={searchHandler} />
                    <FontAwesomeIcon icon={faSearch} className='product__innerSearchInputIcon position-absolute' />
                </div>
                <div className="product__innerAddnewButtons">
                    <Link to="/dashboard/toppingform">
                        <FontAwesomeIcon icon={faSquarePlus} />
                        <span className='ps-2'>Add New</span>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default ToppingSearch
