import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsCoupons.scss'
import verifyToken from '../../../SignIn/verifyToken';
import { fetchApiDataProduct } from '../../../../Store/Slice/ProductSlices';

function ProductsCoupons(props) {
    const dispatch = useDispatch()
    const loginToken = verifyToken()

    useEffect(() => {
        dispatch(fetchApiDataProduct(loginToken.userID))
    }, [])


    const productData = useSelector((product) => product.ProductSlices.data)

    const [selectProduct, setselectProduct] = useState([])

    console.log("check my state 5555555555", selectProduct)

    useEffect(() => {
        const allda = []

         if (productData){
            const selection = JSON.parse(JSON.stringify(productData));
            selection.map((item) => {
                item.IsChecked = false;
                const newdata = { ...item, select: { productId: item.productId} }
                allda.push(newdata)
            })
        }
        setselectProduct(allda)
    }, [productData])



    const productSelectionHandler = (id, item) => {

        const itemselected = [...selectProduct];
        console.log(itemselected)
        if (id) {
            item.IsChecked = true;
        }
        else {
            item.IsChecked = false;
        }
        
        setselectProduct(itemselected);
        const newSelect = itemselected.filter((item)=>item.IsChecked)

        props.productSelectedHandler(newSelect)


    }
    const productSelectionHandlers = (id, item) => {

        const itemselected = [...selectProduct];
        console.log(itemselected)
        if (id) {
            item.IsChecked = false;
        }
        else {
            item.IsChecked = true;
        }
        setselectProduct(itemselected);
        const newSelect = itemselected.filter((item)=>item.IsChecked)

        props.productSelectedHandler(newSelect)

    }






    return (
        <>

            <div className=' d-flex aligns-item-center' style={{ width: "100%" }}>
                {selectProduct?.filter((item) => !item.IsChecked) < 1 ? (
                    ""
                ) : (<div className='coupons_table mt-3 mb-5 mx-2' style={{ width: "50%" }}>
                    <table className='table '>
                        <thead>
                            <tr>

                                <th scope="col">All Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectProduct?.filter((item) => !item.IsChecked).map((product, index) => {
                                return <tr key={index}>
                                    <td scope="row" onClick={() => productSelectionHandler(product.productId, product)}>{product.productName}</td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div >
                )}
                <div className='ToppingSelect_table  ' style={{ width: "50%" }} >
                    {selectProduct?.filter(item => item.IsChecked) < 1 ? (
                        ""
                    ) : (<div className='coupons_table mt-3 mb-5 '>

                        <table className='table m-0'>
                            <thead>

                                <tr>
                                    <th scope="col" >selected product(s)</th>
                                </tr>

                            </thead>
                            <tbody>
                                {selectProduct?.filter(item => item.IsChecked).map((selectedCat, index) => {
                                    return <tr key={index}>
                                        <td scope="row" onClick={() => productSelectionHandlers(selectedCat.productId, selectedCat)}>{selectedCat.productName}</td>
                                    </tr>

                                })
                                }
                            </tbody>
                        </table>

                    </div >
                    )}
                </div>

            </div>

        </>
    )
}

export default ProductsCoupons;