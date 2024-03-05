import { useState, useEffect, useContext, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings } from '../../../../Store/Slice/ToppingSlices';
import ToppingSelectionTable from "../ToppingRequiredTable/ToppingSelectionTable";
import { useParams } from 'react-router-dom';
import verifyToken from '../../../SignIn/verifyToken';
import { productData } from '../../ProductComponent/AddProduct/ProductForm/ProductForm';

function ToppingNames(props) {
  
    const dispatch = useDispatch()
    const loginToken = verifyToken()
    const combinationPropsData = props.combinationHandler
    const { id } = useParams();



    useEffect(() => {
        dispatch(fetchApiDataToppings(loginToken.userID))
    }, [])  
    
    const ToppingData = useSelector((state) => state.ToppingSlices.data)

    const [ToppingDatafinal, setToppingDatafinal] = useState([])  

    useEffect(() => {
       
        if (ToppingData) {
            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(ToppingData));
            ToppingDatafinaltemp.map((e) => {
                e.IsChecked = false;
                // props.combinationHandler.toppingCombinatiomQuantityList
                var tempmatch = props.combinationHandler.toppingCombinatiomQuantityList.filter(x => x.combinationToppingId === e.toppingId);
                if (tempmatch.length > 0 && id > 0) {
                    e.IsChecked = true;
                }
            });
            setToppingDatafinal(ToppingDatafinaltemp);
        }
    }, [ToppingData])

    const toppingNameChangeHandler = (check, id, item) => {
        const itemselected = [...ToppingDatafinal];
        if (check) {
            item.IsChecked = true;
        }
        else {
            item.IsChecked = false;
        }
        itemselected.filter(x => x.toppingId === id).IsChecked = check;
        setToppingDatafinal(itemselected);
    }

    const unCheckHandler = (id) => {
        const updatedData = ToppingDatafinal.map(item => {
            if (item.toppingId === id) {
                return { ...item, IsChecked: false };
            }
            return item;
        });
        setToppingDatafinal(updatedData);
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
                        {ToppingDatafinal.map((item, index) => {
                           
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
            <div className='ToppingSelect_table mx-5' style={{ width: "50%" }} >
                
                <ToppingSelectionTable
                    toppingNameData={ToppingDatafinal.filter(x => x.IsChecked == true)}
                    selectedToppingName={props.combinationHandler.toppingCombinatiomQuantityList}
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