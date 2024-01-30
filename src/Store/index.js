import { configureStore } from "@reduxjs/toolkit";
import NavSlices from "./Slice/NavSlices";
import apiSlices from "./Slice/VariantSlices";
import {fetchApiData} from "./Slice/VariantSlices"
import CategorySlices from "./Slice/CategorySlices";
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from "./sagas/rootsagas";
import ToppingSlices from "./Slice/ToppingSlices";
import ProductSlices from "./Slice/ProductSlices";
import SupplierSlices from "./Slice/SupplierSlices";
import LocalitySlices from "./Slice/LocalitySlices";
import ManageUsers from "./Slice/ManageUsers";
import ManageRoleSlices from "./Slice/ManageRoleSlices";
import LoginSlices from "./Slice/LoginSlices";
import CouponSlices from "./Slice/CouponSlices";

                                                                                                                                    

// const sagaMiddleware = createSagaMiddleware();
const store = configureStore(
    {
        reducer:
        {
            LoginSlices: LoginSlices,
            navheader: NavSlices,
            categorySlices: CategorySlices,
            variantSlices: apiSlices,
            ToppingSlices: ToppingSlices,
            ProductSlices: ProductSlices,
            SupplierSlices: SupplierSlices,
            LocalitySlices: LocalitySlices,
            ManageUserSlices: ManageUsers,
            ManageRoleSlices: ManageRoleSlices,
            CouponSlices : CouponSlices

            

        },
 
        // middleware: [sagaMiddleware]
        
    },
    )
    // sagaMiddleware.run(watcherSaga)

    
export default store;