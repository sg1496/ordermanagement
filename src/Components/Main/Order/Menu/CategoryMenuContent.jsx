import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderGetProductCategory } from '../../../../Store/Slice/OrderSlices'
import './CategoryMenuContent.css';

const CategoryMenuContent = (props) => {
    const dispatch = useDispatch()
    const orderProduct = useSelector(item => item.OrderSlices.productCategory)
    
    useEffect(() => {
        if (!props.categoryid) return
        dispatch(OrderGetProductCategory(props.categoryid))
    }, [props.categoryid])

    return (
        <>
            <div className='row d-flex menu-items-row' id='menuItems'>
                {orderProduct?.map((item, index) => {
                    return <div className='order_productbox col-md-2 ps-0' key={index}>
                        <div className='menu-item'>
                            <button className='menu-item-button'>{item.productName}</button>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default CategoryMenuContent