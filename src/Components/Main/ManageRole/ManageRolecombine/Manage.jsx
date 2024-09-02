import React from 'react';
import "./Manage.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';
import ManageRoleAddBtn from '../ManageUserTable/ManageRoleAddBtn';
import ManageRoleDataTable from '../ManageUserTable/ManageRoleDataTable';


const Manage =({setAlert}) => {
    const dispatch = useDispatch();
    dispatch(navTitle("Manage Role"));
    return (
        <>
            <div className="productOuter p-3">
               <ManageRoleAddBtn/>
               <ManageRoleDataTable setAlert={setAlert}/>
               
               
            </div>
        </>
    )
}

export default Manage;