import React from 'react';
import "./Toppings.scss";
import ToppingSearch from './ToppingSearch/ToppingSearch';
import ToppingTable from './ToppingTable/ToppingTable';
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../Store/Slice/NavSlices';

const Toppings = ({setAlert}) => {
const dispatch = useDispatch()
dispatch(navTitle("Toppings"))

    return (
        <>
            <div className="productOuter p-3">
                <ToppingSearch />
                <ToppingTable setAlert={setAlert} />
            </div>
        </>
    )
}

export default Toppings
