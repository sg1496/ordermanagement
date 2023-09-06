import React from 'react';
import './ProductsCoupons.scss'
const ProductsCoupons=()=> {
    return (
        <>

            <div className='coupons_table mt-3 mb-5 '>
                <table className='table m-0'>
                    <thead>

                        <tr>                           
                                <th scope="col">All Categories</th>                            
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">non-veg</td>
                        </tr>
                        <tr>
                            <td scope="row">veg</td>
                        </tr>
                        <tr>
                            <td scope="row">veg</td>
                        </tr>
                        <tr>
                            <td scope="row">non-veg</td>
                        </tr>
                        <tr>
                            <td scope="row">veg</td>
                        </tr>
                        <tr>
                            <td scope="row">veg</td>
                        </tr>
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ProductsCoupons;