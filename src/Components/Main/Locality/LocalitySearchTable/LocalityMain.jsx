import React from 'react';
import LocalitySearch from './LocalitySearch/LocalitySearch';
import LocalityTable from './LocalityTable/LocalityTable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
const LocalityMain= () => {
    const dispatch = useDispatch()
    dispatch(navTitle("Locality"))

    return (
        <>
            <div className="productOuter p-3">
                <LocalitySearch />
                <LocalityTable />
            </div>
        </>
    )
}

export default LocalityMain;