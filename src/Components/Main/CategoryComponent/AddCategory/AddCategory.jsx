import React, { useState } from 'react'
import "./Category.scss"


import { NavLink, Outlet } from 'react-router-dom';

// import CategoryTableData from './CategoryTableData';


const Category = () => {
    const [showform, setshowform] = useState(true)

    const clickfn = () => {
        setshowform(!showform)
    }
    return (
        <div>

            <div className='addProduct__navtab d-flex'>
                <NavLink active to="category">Category</NavLink>
                <NavLink to="products">Products</NavLink>
            </div>
            <div className='navTabs__content p-3'>
                <Outlet />
            </div>
        </div>


    )
}
export default Category  