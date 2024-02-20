import React from 'react'
import PromotionalSearch from './PromotionalSearch/PromotionalSearch'
import PromotionalTable from './PromotionalTable/PromotionalTable'
import { useDispatch } from 'react-redux'
import { navTitle } from '../../../../Store/Slice/NavSlices'

const PromotionalMain = () => {
    const dispatch = useDispatch()
    dispatch(navTitle("promotional Table"))

    return (
        <>
            <div className="productOuter p-3">
                <PromotionalSearch/>
                <PromotionalTable />
            </div>
        </>
    )
}

export default PromotionalMain