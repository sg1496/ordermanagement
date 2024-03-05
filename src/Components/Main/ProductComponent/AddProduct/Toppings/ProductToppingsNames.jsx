import { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings } from '../../../../../Store/Slice/ToppingSlices';
import ToppingSelectionTable from '../../../ToppingComponent/ToppingRequiredTable/ToppingSelectionTable';
import { useParams } from 'react-router-dom';
import ProductToppingSelectionTable from './ProductToppingSelectionTable';
import verifyToken from '../../../../SignIn/verifyToken';

function ToppingNames(props) {
    console.log("check props data", props.topingname)
    const loginToken = verifyToken()
    const dispatch = useDispatch()
    const combinationPropsData = props.combinationHandler
    const { id } = useParams();

    const ToppingData = useSelector((state) => state.ToppingSlices.data)

    useEffect(() => {
        dispatch(fetchApiDataToppings(loginToken.userID))
    }, [])

    useEffect(() => {
        if (ToppingData) {
            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(ToppingData));
            ToppingDatafinaltemp.map((e) => {
                e.IsChecked = false;
                if (id) {
                    var tempmatch = props.combinationHandler.productToppingsList.filter(x => x.combinationProductId === e.toppingId);
                    if (tempmatch.length > 0 && id > 0) {
                        e.IsChecked = true;
                    }
                } else {
                    var tempmatch = props.topingname.filter(x => x.toppingId === e.toppingId && x.IsChecked == true);
                    if (tempmatch.length > 0) {
                        e.IsChecked = true;
                    }
                }
            });
            console.log("check effect data", ToppingDatafinaltemp)
            props.toppingnameData(ToppingDatafinaltemp)
            
        }
    }, [ToppingData])

    const toppingNameChangeHandler = (check, id, item) => {
        const itemselected = [...props.topingname];
        if (check) {
            item.IsChecked = true;
        }
        else {
            item.IsChecked = false;
        }
        itemselected.filter(x => x.toppingId === id).IsChecked = check;
        props.toppingnameData(itemselected)
    }

    const unCheckHandler = (id) => {
        const updatedData = props.topingname.map(item => {
            if (item.toppingId === id) {
                return { ...item, IsChecked: false };
            }
            return item;
        });
        props.toppingnameData(updatedData)
    }


    const combinationDataSendParent = (data) => {
        props.combinationDataNameSend(data)
    }


    return (
        <div className=' d-flex aligns-item-center w-100'>
            <div className='productSection__table mt-3' style={{ width: "30%" }}>

                <table className='table common-design m-0 '>
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col" >Topping Names</th>
                            <th scope="col" className='text-center'>Food Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.topingname?.map((item, index) => {

                            return <tr key={index}>
                                <td className='text-center addProduct__subcategoryCheckboxes'>
                                    <input className="form-check-input"
                                        id={item.toppingId}
                                        type="checkbox"
                                        checked={item.IsChecked}
                                        onChange={(e) => toppingNameChangeHandler(e.target.checked, item.toppingId, item)}
                                    />
                                </td>
                                <td>{item.toppingName}</td>
                                <td className='text-center'>
                                    {item.foodTypeId === 1 ? "veg" : "non-veg"}
                                </td>
                            </tr>
                        }
                        )}
                    </tbody>
                </table>

            </div >
            <div className='ToppingSelect_table mx-5' style={{ width: "70%" }} >
                <ProductToppingSelectionTable
                    toppingNameData={props.topingname.filter(x => x.IsChecked == true)}
                    selectedToppingName={props.combinationHandler.productToppingsList}
                    unCheckHandler={unCheckHandler}
                    combinationPropsData={combinationPropsData}
                    combinationDataSendParent={combinationDataSendParent}
                    data={props}
                />
            </div>
        </div>
    )
}

export default ToppingNames;