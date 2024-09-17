import React from 'react';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import CouponSearch from './CouponSearch/CouponSearch';
import CouponTable from './CouponTable/CouponTable';

const CouponMain = ({ setAlert }) => {
    const dispatch = useDispatch()
    dispatch(navTitle("Coupon"))

    return (
        <>
            <div className="productOuter p-3">
                <CouponSearch />
                <CouponTable setAlert = {setAlert}/>
            </div>
        </>
    )
}

export default CouponMain;