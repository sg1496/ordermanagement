import React from 'react';
import "./Main.scss"

import { Route, Routes } from 'react-router-dom';

import Heading from './Heading/Heading';
import Basic from './ProductComponent/AddProduct/Basic/Basic';
import PCategories from './ProductComponent/AddProduct/Categories/Categories';
import Description from './ProductComponent/AddProduct/Description/Description';
import Variants from './ProductComponent/AddProduct/Variants/Variants';
import AddProduct from './ProductComponent/AddProduct/AddProduct';
import Product from './ProductComponent/Product/Product';
import Toppings from './ToppingComponent/Toppings/Toppings';
import Categories from './ProductComponent/AddProduct/Categories/Categories';
import AddCategory from "../Main/CategoryComponent/AddCategory/AddCategory"
import Category from './CategoryComponent/AddCategory/category/Category';
import SubCategory from './CategoryComponent/AddCategory/sub-category/SubCategory';
import Products from './CategoryComponent/AddCategory/products/Products';
import SupplierForm from './Supplier/SupplierForm/SupplierForm';
import Mainsuppliertable from './Supplier/Suppliertablecomp/Mainsuppliertable';
import MainCouponsform from './Coupons/MainCouponsform';
import Categorytable from './CategoryComponent/AddCategory/Categorytable/Categorytable';
import LocalityTable from './Locality/LocalityTable';
import ManageTable from './ManageUser/ManageTable/ManageTable';
import ManageuserForm from './ManageUser/MangaeUserForm/ManageuserForm';
import ManageRoleForm from './ManageRole/ManageRoleForm';
import Settings from './Settings/Settings';
import GeneralForm from './Settings/GeneralForm';
import StoreDetails from './Settings/StoreDetails';
import ReceiptFormat from './Settings/ReceiptFormat';
import RewardProgram from './Settings/RewardProgram';
import ToppingForm from './ToppingComponent/ToppingForm/ToppingForm';
import ComboTable from './ComboComponent/ComboTableComponent/ComboTable/ComboTable';
import ComboForm from './ComboComponent/ComboFormComponent/ComboForm';
import VariantsMain from './Variant/VariantSearchTable/VariantsMain';
import Variantform from './Variant/VariantForm/Variantform';




function Main() {
    return (
        <div className='mainSection'>
            <Heading />
            <div className="mainInner m-3">
                <div className="mainIneerSection m-3">
                    <Routes>
                        <Route index element={<Product />} />

                        <Route path='product' element={<Product />} />
                        <Route path="toppingform" element={<ToppingForm />} />
                        <Route path='toppingform/:id' element={<ToppingForm/>}/>
                        <Route path="toppings" element={<Toppings />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path='categorytable' element={<Categorytable />} />
                        <Route path='supplierform' element={<SupplierForm />} />
                        <Route path='mainsuppliertable' element={<Mainsuppliertable />} />
                        <Route path='maincouponsform' element={<MainCouponsform />} />
                        <Route path='localityTable' element={<LocalityTable />} />
                        <Route path='managetable' element={<ManageTable />} />
                        <Route path='manageuserform' element={<ManageuserForm />} />
                        <Route path='manageroleform' element={<ManageRoleForm />} />
                        <Route path='combotable' element={<ComboTable />} />
                        <Route path='comboform' element={<ComboForm />} />
                        <Route path='variant_table' element={<VariantsMain/>}/>
                        <Route path='variant_form' element={<Variantform/>}/>
                        <Route path='variant_form/:id' element={<Variantform/>}/>
                        <Route path='add-category/category/:id' element={<Category/>}/>
                        




                        <Route path='add-product' element={<AddProduct />}>
                            <Route index element={<Basic />} />
                            <Route path='basic' element={<Basic />} />
                            <Route path='categories' element={<PCategories />} />
                            <Route path='description' element={<Description />} />
                            <Route path='variants' element={<Variants />} />
                        </Route>




                        <Route path='settings' element={<Settings />}>
                            <Route index element={<GeneralForm />} />
                            <Route path='generalform' element={<GeneralForm />} />
                            <Route path='storedetails' element={<StoreDetails />} />
                            <Route path='receiptformat' element={<ReceiptFormat />} />
                            <Route path='rewardprogram' element={<RewardProgram />} />
                        </Route>



                     

                        <Route path='add-category' element={<AddCategory/>}>
                            <Route index element={<Category />} />
                            <Route path='category' element={<Category />} />                            
                            <Route path='subcategory' element={<SubCategory />} />
                            <Route path='products' element={<Products />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Main
