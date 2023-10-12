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
                                                                                                                                    

// const sagaMiddleware = createSagaMiddleware();
const store = configureStore(
    {
        reducer:
        {
            navheader: NavSlices,
            categorySlices: CategorySlices,
            variantSlices: apiSlices,
            ToppingSlices: ToppingSlices,
            ProductSlices: ProductSlices,
            SupplierSlices: SupplierSlices
            

        },
 
        // middleware: [sagaMiddleware]
        
    },
    )
    // sagaMiddleware.run(watcherSaga)

    
export default store;