import React, { useEffect, useState } from 'react';
import "./TableSearch.scss";
import { faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiDataCategory, searchstates } from "../../../../Store/Slice/CategorySlices"



function Tablesearch() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchApiDataCategory())
    }, [])

    
    const [filteredData1, setFilteredData1] = useState(null);

    console.log("searched data ", filteredData1);

    const handleSearch = (text) => {
        const query = text.toLowerCase();
        if (!categoryDatas) {
            return
        }
        const newData = categoryDatas.filter((item) =>
            item.categoryName.toLowerCase().includes(query)
        );
        setFilteredData1(newData);
        // setSearchQuery(text);
    };

    return (
        <div className='product_searchField d-flex justify-content-between'>
            <div className="product__innerSearchInput position-relative w-100">
                <input type="search" className='w-100' onChange={e=>dispatch(searchstates(e.target.value))} placeholder='Search...' />
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
