import React from 'react';
import "./AddProduct.scss"
import { NavLink, Outlet } from 'react-router-dom';

import ProductForm from './ProductForm/ProductForm';




function AddProduct({setAlert}) {
    const [step, setStep] = React.useState(1)
    

    return (
        <>

            <div className='addProduct__navtab d-flex'>
                <NavLink  className={`"tab-links" ${step == 1 ? "active-new": ""}`} onClick={() => setStep(1)}>Basic</NavLink>
                <NavLink className={`"tab-links" ${step == 2 ? "active-new": ""}`} onClick={() => setStep(2)}>Description</NavLink>
                <NavLink className={`"tab-links" ${step == 3 ? "active-new": ""}`} onClick={() => setStep(3)}>Categories</NavLink>
                <NavLink className={`"tab-links" ${step == 4 ? "active-new": ""}`} onClick={() => setStep(4)}>Variants</NavLink>
                <NavLink className={`"tab-links" ${step == 5 ? "active-new": ""}`} onClick={() =>setStep(5)}>Toppings</NavLink>
                <NavLink className={`"tab-links" ${step == 6 ? "active-new": ""}`} onClick={() => setStep(6)}> Extra Toppings</NavLink>
            </div>
            <div className='navTabs__content p-3'>
                <ProductForm step={step} setStep = {setStep} setAlert = {setAlert} />

            </div>
        </>
    )
}

export default AddProduct
