import React, { useEffect, useState } from 'react'
import '../Layout.css'
import { useDispatch, useSelector } from 'react-redux'
import verifyToken from '../../../SignIn/verifyToken'
import { fetchApiDataCategory } from '../../../../Store/Slice/CategorySlices'
import CategoryMenuContent from './CategoryMenuContent'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const CategoryMenu = () => {
    const loginToken = verifyToken()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('dining')
    const [categoryID, setCategoryID] = useState()////////////////////////////////////////////////////////////////
    console.log(categoryID + 'women day');
    const categoryData = useSelector(category => category.CategorySlices.data)

    useEffect(() => {
        dispatch(fetchApiDataCategory(loginToken.userID))
    }, [])

    useEffect(() => {
        setCategoryID(categoryData && categoryData[0].categoryId)
    }, [categoryData])


    const categoryHandler = (e, id) => {
        // setActiveTab('dining')
        setCategoryID(id);
        let menuItems = document.querySelectorAll("#menuCategoryTabs > li:not(:first-of-type)")
        for (var item of menuItems) {
            item.classList.remove('active');
        }

    }

    useEffect(() => {
        let tabsOrder = document.getElementById('menuCategoryTabs');

        if (!categoryID) return
        // if (categoryID !== 22) {
        //     tabsOrder.children[0].classList.remove('active');
        // }
        if (categoryID != null && tabsOrder != null && tabsOrder != 'undefined' && tabsOrder != '') {

            tabsOrder.children[0].classList.add('active');
        } else {

            tabsOrder.children[0].classList.add('');
        }
    }, [categoryID])



    console.log("dddddddddddddddddd", categoryID)
    return (
        <div style={{ width: "62.5%" }} className='ms-5' >
            <div className='layout_head px-3'>Customer Impformation</div>
            <div style={{ borderRadius: "0px", borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px", }} className='mainInner mb-3'>
                <div className="mainIneerSection m-3">
                    <div className="common-tabs-wrap ">
                        <ul class="nav nav-tabs common-tabs menuContainer" id='menuCategoryTabs'>
                            {categoryData?.map((category, index) => {
                                return <li key={index} className="menu_li"><a data-toggle="tab" href="dining" onClick={(e) => categoryHandler(e, category.categoryId)}>{category.categoryName}</a></li>
                            })}
                        </ul>
                        <div class="tab-content addProduct__basicTabs">
                            <div id="home" class="tab-pane fade in active show">
                                {activeTab === 'dining' ? <CategoryMenuContent categoryid={categoryID} /> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CategoryMenu