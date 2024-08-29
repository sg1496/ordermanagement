import React, { useEffect, useState } from 'react';
import './App.css';
// import Main from './Components/Main/Main'
import { Route, Routes } from 'react-router-dom';

import AddProduct from './Components/Main/ProductComponent/AddProduct/AddProduct';
import Product from './Components/Main/ProductComponent/Product/Product';
import Toppings from './Components/Main/ToppingComponent/Toppings/Toppings';
import Categories from './Components/Main/ProductComponent/AddProduct/Categories/Categories';
import AddCategory from "./Components/Main/CategoryComponent/AddCategory/AddCategory"
import Category from './Components/Main/CategoryComponent/AddCategory/category/Category';
import Products from './Components/Main/CategoryComponent/AddCategory/products/Products';
import SupplierForm from './Components/Main/Supplier/SupplierForm/SupplierForm';
import Mainsuppliertable from './Components/Main/Supplier/Suppliertablecomp/Mainsuppliertable';
import MainCouponsform from './Components/Main/Coupons/MainCouponsform';
import Categorytable from './Components/Main/CategoryComponent/AddCategory/Categorytable/Categorytable';
import ManageTable from './Components/Main/ManageUser/ManageTable/ManageTable';
import ManageuserForm from './Components/Main/ManageUser/MangaeUserForm/ManageuserForm';
import Settings from './Components/Main/Settings/Settings';
import GeneralForm from './Components/Main/Settings/GeneralForm';
import StoreDetails from './Components/Main/Settings/StoreDetails';
import ReceiptFormat from './Components/Main/Settings/ReceiptFormat';
import RewardProgram from './Components/Main/Settings/RewardProgram';
import ToppingForm from './Components/Main/ToppingComponent/ToppingForm/ToppingForm';
import ComboTable from './Components/Main/ComboComponent/ComboTableComponent/ComboTable/ComboTable';
import ComboForm from './Components/Main/ComboComponent/ComboFormComponent/ComboForm';
import VariantsMain from './Components/Main/Variant/VariantSearchTable/VariantsMain';
import Variantform from './Components/Main/Variant/VariantForm/Variantform';
import LocalityMain from './Components/Main/Locality/LocalitySearchTable/LocalityMain';
import LocalityForm from './Components/Main/Locality/LocalityForm/LocalityForm';
import ProductForm from './Components/Main/ProductComponent/AddProduct/ProductForm/ProductForm';
import Manage from './Components/Main/ManageRole/ManageRolecombine/Manage';
import ManageRoleForm from './Components/Main/ManageRole/ManageRoleForm/ManageRoleForm';
import Main from './Components/Main/Main';
import Loginimg from './Components/SignIn/Loginimg';
import Alerts from './Components/utils/alertMessage';
import { useSelector } from 'react-redux';

function App() {
  const [alert, setAlert] = useState(null);
  const isLogin = useSelector(st => st.LoginSlices.data)

  return (
    <div className='mainDiv'>
      <Routes>
        <Route path='login' element={<Loginimg />} />
        <Route path='/' element={<Main />}>
          <Route index element={<LocalityMain  setAlert={setAlert}/>} />
          <Route path='localityTable' element={<LocalityMain setAlert={setAlert} />} />
          <Route path='locality_form' element={<LocalityForm  setAlert={setAlert}/>} />
          <Route path='locality_form/:id' element={<LocalityForm setAlert={setAlert} />} />
          <Route path='product' element={<Product setAlert={setAlert}/>} />
          <Route path="toppingform" element={<ToppingForm setAlert={setAlert}/>} />
          <Route path='toppingform/:id' element={<ToppingForm setAlert={setAlert}/>} />
          <Route path="toppings" element={<Toppings setAlert={setAlert}/>} />
          <Route path="categories" element={<Categories setAlert={setAlert}/>} />
          <Route path='categorytable' element={<Categorytable setAlert={setAlert}/>} />
          <Route path='supplierform' element={<SupplierForm setAlert={setAlert}/>} />
          <Route path='supplierform/:id' element={<SupplierForm setAlert={setAlert}/>} />
          <Route path='mainsuppliertable' element={<Mainsuppliertable setAlert={setAlert}/>} />
          <Route path='maincouponsform' element={<MainCouponsform setAlert={setAlert}/>} />

          <Route path='managetable' element={<ManageTable setAlert={setAlert}/>} />
          <Route path='manageuserform' element={<ManageuserForm setAlert={setAlert} />} />
          <Route path='manageuserform/:id' element={<ManageuserForm setAlert={setAlert} />} />
          <Route path='manageroleform' element={<ManageRoleForm setAlert={setAlert}/>} />
          <Route path='manageroleform/:id' element={<ManageRoleForm setAlert={setAlert}/>} />
          <Route path='manageRoleTable' element={<Manage setAlert={setAlert}/>} />
          <Route path='combotable' element={<ComboTable setAlert={setAlert}/>} />
          <Route path='comboform' element={<ComboForm setAlert={setAlert}/>} />
          <Route path='variant_table' element={<VariantsMain setAlert={setAlert} />} />
          <Route path='variant_form' element={<Variantform setAlert={setAlert} />} />
          <Route path='variant_form/:id' element={<Variantform setAlert={setAlert} />} />


          <Route path='add-product' element={<AddProduct setAlert={setAlert}/>}>
            <Route index element={<ProductForm setAlert={setAlert}/>} />
            <Route path='productform' element={<ProductForm setAlert={setAlert}/>} />
            <Route path='productform/:id' element={<ProductForm setAlert={setAlert}/>} />
          </Route>


          <Route path='settings' element={<Settings setAlert={setAlert}/>}>
            <Route index element={<GeneralForm setAlert={setAlert}/>} />
            <Route path='generalform' element={<GeneralForm setAlert={setAlert}/>} />
            <Route path='storedetails' element={<StoreDetails setAlert={setAlert}/>} />
            <Route path='receiptformat' element={<ReceiptFormat setAlert={setAlert}/>} />
            <Route path='rewardprogram' element={<RewardProgram setAlert={setAlert}/>} />
          </Route>


          <Route path='add-category/category' element={<Category setAlert={setAlert}/>} />
          <Route path='add-category' element={<AddCategory setAlert={setAlert}/>}>
            <Route index element={<Category setAlert={setAlert}/>} />
            <Route path='category/:id' element={<Category setAlert={setAlert}/>} />
            <Route path='products' element={<Products setAlert={setAlert}/>} />
          </Route>
        </Route>
      </Routes>
      {alert && (
        <Alerts
          open={true}
          type={alert.type}
          msg={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  )
}

export default App




