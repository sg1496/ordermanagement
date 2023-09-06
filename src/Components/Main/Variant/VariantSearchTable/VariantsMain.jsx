import React from 'react';
import VariantSearch from './VariantSearch/VariantSearch';
import VariantTable from './VariantTable/VariantTable';

import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
const VariantsMain = () => {
    const dispatch = useDispatch()
    dispatch(navTitle("Variant"))

    return (
        <>
            <div className="productOuter p-3">
                <VariantSearch />
                <VariantTable />
            </div>
        </>
    )
}

export default VariantsMain;