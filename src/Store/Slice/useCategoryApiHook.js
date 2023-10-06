import { useEffect } from "react";

const fetchApiDataCategorys = ()=>{
useEffect(() => {
     const fetchApiDataCategory = createAsyncThunk('api/fetchData', async () => {
        try {
            const response = await axios.get(`${url}/category/GetAllCategories`);
            return response.data;
        } catch (error) {
            console.log("error ", error);
            throw new Error(error.message);
        }
    });
}, [])
}

export default fetchApiDataCategorys
