import React from 'react';
import "./Product.scss";
import ProductSearch from './ProductSearch/ProductSearch';
import ProductTable from './ProductTable/ProductTable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';

function Product({setAlert}) {
    const dispatch = useDispatch();
    dispatch(navTitle("Products"));
    return (
        <>
            <div className="productOuter p-3">
                <ProductSearch />
                <ProductTable setAlert={setAlert} />
            </div>
        </>
    )
}

export default Product
