import React from 'react';
import "./Mainsuppliertable.scss";
import SupplierTablesearch from '../SupplierTable/SupplierTablesearch';
import SupplierTable from '../SupplierTable/Suppliertable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';

const Mainsuppliertable = ({setAlert}) => {
    const dispatch = useDispatch()
    dispatch(navTitle("Suppliers"))
    return (
        <>
            <div className="productOuter p-3">
                <SupplierTablesearch />
                <SupplierTable setAlert={setAlert} />
            </div>
        </>
    )
}

export default Mainsuppliertable;