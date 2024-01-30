import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CouponsTable.scss'
import verifyToken from '../../../SignIn/verifyToken';
import { fetchApiDataCategory } from '../../../../Store/Slice/CategorySlices';
// import SelectedCoupns from './SelectedCoupns';


function CouponsTable(props) {
    const dispatch = useDispatch()
    const loginToken = verifyToken()

    useEffect(() => {
        dispatch(fetchApiDataCategory(loginToken.userID))
    }, [])

    const categorData = useSelector((category) => category.categorySlices.data)
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", categorData)

    const [categoryCoupons, setCategoryCoupons] = useState([])

    console.log("check my state 5555555555", categoryCoupons)

    useEffect(() => {
        const allda = []

         if (categorData){
            const selection = JSON.parse(JSON.stringify(categorData));
            selection.map((item) => {
                item.IsChecked = false;
                const newdata = { ...item, select: { categoryId: item.categoryId} }
                allda.push(newdata)
            })
        }
        // if (categorData) {
        //     const ToppingDatafinaltemp = JSON.parse(JSON.stringify(categorData));
        //     ToppingDatafinaltemp.map((e) => {
        //         e.IsChecked = false;
        //     }
        //     )
            setCategoryCoupons(allda)
        // }
    }, [categorData])



    const categorySelectionHandler = (id, item) => {

        const itemselected = [...categoryCoupons];
        console.log(itemselected)
        if (id) {
            item.IsChecked = true;
        }
        else {
            item.IsChecked = false;
        }
        
        setCategoryCoupons(itemselected);
        const newSelect = itemselected.filter((item)=>item.IsChecked)

        props.selectedHandler(newSelect)


    }
    const categorySelectionHandlers = (id, item) => {

        const itemselected = [...categoryCoupons];
        console.log(itemselected)
        if (id) {
            item.IsChecked = false;
        }
        else {
            item.IsChecked = true;
        }
        setCategoryCoupons(itemselected);
        const newSelect = itemselected.filter((item)=>item.IsChecked)

        props.selectedHandler(newSelect)

    }






    return (
        <>

            <div className=' d-flex aligns-item-center' style={{ width: "100%" }}>
                {categoryCoupons?.filter((item) => !item.IsChecked) < 1 ? (
                    ""
                ) : (<div className='coupons_table mt-3 mb-5 mx-2' style={{ width: "50%" }}>
                    <table className='table '>
                        <thead>
                            <tr>

                                <th scope="col">All Categories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryCoupons?.filter((item) => !item.IsChecked).map((product, index) => {
                                return <tr key={index}>
                                    <td scope="row" onClick={() => categorySelectionHandler(product.categoryId, product)}>{product.categoryName}</td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div >
                )}
                <div className='ToppingSelect_table  ' style={{ width: "50%" }} >
                    {/* <SelectedCoupns
                        selectedCategory={categoryCoupons}
                        categorySelectionHandler={categorySelectionHandlers}

                    /> */}
                    {categoryCoupons?.filter(item => item.IsChecked) < 1 ? (
                        ""
                    ) : (<div className='coupons_table mt-3 mb-5 '>

                        <table className='table m-0'>
                            <thead>

                                <tr>
                                    <th scope="col" >selected Categories</th>
                                </tr>

                            </thead>
                            <tbody>
                                {categoryCoupons?.filter(item => item.IsChecked).map((selectedCat, index) => {
                                    return <tr key={index}>
                                        <td scope="row" onClick={() => categorySelectionHandlers(selectedCat.categoryId, selectedCat)}>{selectedCat.categoryName}</td>
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

export default CouponsTable;