import React from 'react';
import "./ManageTable.scss";
import ManageUserTable from '../ManageUserTable/ManageUserTable';
import UserTableAddbtn from '../ManageUserTable/UserTableAddbtn';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';

function ManageTable() {
    const dispatch = useDispatch();
    dispatch(navTitle("Manage Users"));
    return (
        <>
            <div className="productOuter p-3">
               <UserTableAddbtn/>
               <ManageUserTable/>
               
            </div>
        </>
    )
}

export default ManageTable;