import React, { useState } from 'react';
import "./ListItems.scss"
import images from '../../../../assets/images';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';

function ListItems({ isActive }) {
    const dispatch = useDispatch();

    const [show1, setshow1] = useState(false);
    const [show2, setshow2] = useState(false);

    const handleSubmenuShow = () => {
        setshow1(!show1)
    }

    const handleSubmenuShow2 = () => {
        setshow2(!show2)
    }
    return (
        <>
            <li className="sidebar_listItems">
                {/* <div className="sidebar_listItemsInner d-flex align-items-center activeclass"> */}
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` }>
                    <img src={images.orders} alt="Orders" loading='lazy' className='img-fluid' />
                    <p>Orders</p>
                </div>
            </li>
            <li className="sidebar_listItems">
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` } onClick={handleSubmenuShow}>
                    <img src={images.productManagment} alt="Product Management" loading='lazy' className='img-fluid' />
                    <p>Product Management <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg></p>
                </div>
                <div className="sidebar__innerMenu">
                    {show1 &&
                        <div className="sidebar__innerSubmenu">
                            <ul className="list-unstyled d-flex flex-column">
                                <li className="sidebarInner__SUblist">
                                    <Link to="categorytable">Category</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="toppings">Toppings</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="product" >Product</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="mainsuppliertable" >Supplier</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="maincouponsform" >Coupons</Link>
                                </li>
                                {/* <li className="sidebarInner__SUblist">
                                    <Link to="managetable" >Manage User</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="manageRoleTable">Manage Role</Link>
                                </li> */}
                                <li className="sidebarInner__SUblist">
                                    <Link to="settings" >Settings</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="combotable" >Combo Products</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="variant_table" >Variant</Link>
                                </li>

                            </ul>
                        </div>
                    }
                </div>

            </li >
            <li className="sidebar_listItems">
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` }>
                    <img src={images.promotionManagment} alt="Promotion Management" loading='lazy' className='img-fluid' />
                    <Link to="promotional_Table" style={{ textDecoration: "none" }}><p >Promotional Management</p></Link>
                </div>
            </li>
            <li className="sidebar_listItems">
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` }>
                    <img src={images.kitchen} alt="Kitchen Screen" loading='lazy' className='img-fluid' />
                    <p>Kitchen Screen</p>
                </div>
            </li>
            <li className="sidebar_listItems">
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` }>
                    <img src={images.locality} alt="Locality" loading='lazy' className='img-fluid' />
                    <Link to="localityTable" style={{ textDecoration: "none" }}><p >Locality</p></Link>
                </div>
            </li>
            <li className="sidebar_listItems">
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` }>
                    <img src={images.productManagment} alt="Stock Management" loading='lazy' className='img-fluid' />
                    <p>Stock Management</p>
                </div>
            </li>
            <li className="sidebar_listItems">
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` } onClick={handleSubmenuShow2}>
                    <img src={images.user} alt="User" loading='lazy' className='img-fluid' />
                    <p>Users <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg></p>
                </div>
                <div className="sidebar__innerMenu">
                    {show2 &&
                        <div className="sidebar__innerSubmenu">
                            <ul className="list-unstyled d-flex flex-column">

                                <li className="sidebarInner__SUblist">
                                    <Link to="managetable" >Manage User</Link>
                                </li>
                                <li className="sidebarInner__SUblist">
                                    <Link to="manageRoleTable">Manage Role</Link>
                                </li>


                            </ul>
                        </div>
                    }
                </div>

            </li>
            <li className="sidebar_listItems">
                <div className= {`sidebar_listItemsInner d-flex align-items-center ${isActive? 'activeclass': ""}` }>
                    <img src={images.report} alt="Report" loading='lazy' className='img-fluid' />
                    <p>Reports</p>
                </div>
            </li>
        </>
    )
}

export default ListItems
