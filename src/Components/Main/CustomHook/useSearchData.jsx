import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchStates } from '../../../Store/Slice/LocalitySlices';

export const useSearchData = (initialData, name) => {
    const dispatch = useDispatch()
    const searchdata2 = useSelector((state) => state.LocalitySlices.search)
    const [searchData, setSearchData] = useState(initialData);

    useEffect(() => {
        if (searchdata2 === "") {
            setSearchData(initialData);
            return;
        }

        const filteredData = initialData?.filter((item) => {
            return item[name].toLowerCase().indexOf(searchdata2.toLowerCase()) !== -1;
        });

        setSearchData(filteredData)


    }, [searchdata2, initialData, name]);

    return searchData;

};