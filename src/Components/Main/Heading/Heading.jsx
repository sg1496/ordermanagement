import React from 'react';
import "./Heading.scss";
import { useSelector } from 'react-redux';

function Heading() {
    const heading = useSelector(state => state.navheader.navTitle)
    return (
        <div className='mainHeader mt-3 mx-3'>
            {/* Add Product */}
            {heading}
        </div>
    )
}

export default Heading
