import React from 'react';
import "./Categorytable.scss";
import Tablesearch from '../../Category/Tablesearch';
import TableCategory from '../../Category/TableCategory';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';


const Categorytable =({setAlert}) => {
    const dispatch = useDispatch()
    dispatch(navTitle("Categories"));
    return (
        <>
            <div className="productOuter p-3">
                <Tablesearch/>
                <TableCategory setAlert={setAlert}/>
            </div>
        </>
    )
}

export default Categorytable;
