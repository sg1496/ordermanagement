import React from 'react';

import ComboSearch from '../ComboMainSearch/ComboSearch';
import ComboMainTable from '../ComboMainTable/ComboMainTable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';





const ComboTable = () => {
    const dispatch = useDispatch();
    dispatch(navTitle("Combo Table"));
    return (
        <>
            <div className="productOuter p-3">
                <ComboSearch />
                <ComboMainTable/>
               
            </div>
        </>
    )
}

export default ComboTable;
