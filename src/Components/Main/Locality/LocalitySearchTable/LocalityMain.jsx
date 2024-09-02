import React from 'react';
import LocalitySearch from './LocalitySearch/LocalitySearch';
import LocalityTable from './LocalityTable/LocalityTable';
import { useDispatch } from 'react-redux';
// import { navTitle } from '../../../../Store/Slice/NavSlices';
const LocalityMain= ({setAlert}) => {
    // const dispatch = useDispatch()
    // dispatch(navTitle("Locality"))

    return (
        <>
            <div className="productOuter p-3">
                <LocalitySearch />
                <LocalityTable setAlert={setAlert}/>
            </div>
        </>
    )
}

export default LocalityMain;