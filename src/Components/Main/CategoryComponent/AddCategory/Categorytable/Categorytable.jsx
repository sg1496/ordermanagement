import React from 'react';
import "./Categorytable.scss";
import Tablesearch from '../../Category/Tablesearch';
import TableCategory from '../../Category/TableCategory';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';


const Categorytable =() => {
    const dispatch = useDispatch()
    dispatch(navTitle("Categories"));
    return (
        <>
            <div className="productOuter p-3">
                <Tablesearch/>
                <TableCategory/>
            </div>
        </>
    )
}

export default Categorytable;
