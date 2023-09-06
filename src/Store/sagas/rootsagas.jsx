import { takeEvery,call, put} from "redux-saga/effects"
import { fetchApiData } from "../Slice/VariantSlices"
import axios from "axios";
let url = import.meta.env.VITE_APP_FOODS_API;
function* workGetCatsFetch() {
    const response = yield call(()=> fetch(`${url}/variant/GetAllVariants`));
    const formattedresponse = yield response.json();
    yield put(fetchApiData(formattedresponse)) 
    
    console.log("api data",response);
}

 export function* watcherSaga() {
    console.log("watchersaga");
    yield takeEvery('api/fetchApiData', workGetCatsFetch);
    
    
}

