import React from 'react';
import "./AddProduct.scss"
import { NavLink, Outlet } from 'react-router-dom';

import ProductForm from './ProductForm/ProductForm';




function AddProduct() {
    const [first, setfirst] = React.useState(1)
    return (
        <>
        
            <div className='addProduct__navtab d-flex'>
                <NavLink onClick={()=>setfirst(1)}>Basic</NavLink>
                <NavLink onClick={()=>setfirst(2)}>Description</NavLink>
                <NavLink onClick={()=>setfirst(3)}>Categories</NavLink>
                <NavLink onClick={()=>setfirst(4)}>Variants</NavLink>
                <NavLink onClick={()=>setfirst(5)}>Toppings</NavLink>
                <NavLink onClick={()=>setfirst(6)}> Extra Toppings</NavLink>


            </div>
            <div className='navTabs__content p-3'>
                <ProductForm step={first} />
              
            </div>
        </>
    )
}

export default AddProduct
