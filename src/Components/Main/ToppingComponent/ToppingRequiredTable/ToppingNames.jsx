import { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings } from '../../../../Store/Slice/ToppingSlices';
import ToppingSelectionTable from "../ToppingRequiredTable/ToppingSelectionTable";
import { useParams } from 'react-router-dom';

const dummy = [
    {
        toppingCombinationId: 86,
        combinationToppingId: 1132,
        quantity: 3,
        variantId: 14
    },

    {
        toppingCombinationId: 87,
        combinationToppingId: 1131,
        quantity: 3,
        variantId: 14
    }
]



function ToppingNames(props) {

    const ToppingData = useSelector((state) => state.ToppingSlices.data)
    const [ToppingDatafinal, setToppingDatafinal] = useState([])
    const edit = useParams();
    
  
    useEffect(() => {   
        //let abc=[]    
        if(ToppingData)
        {
            const ToppingDatafinaltemp = JSON.parse(JSON.stringify(ToppingData));
            ToppingDatafinaltemp.map((e) => {
                    e.IsChecked = false;
                    var tempmatch= dummy.filter(x=>x.combinationToppingId === e.toppingId);
                    if(tempmatch.length>0 && edit.id>0)
                    {
                        e.IsChecked = true;
                    }
              });
              setToppingDatafinal(ToppingDatafinaltemp);
          
        }
     
    }, [ToppingData])

   
  
   
    const combinationPropsData = props.combinationHandler
    // console.log("editStatus -------------------",combinationPropsData.toppingCombinatiomQuantityList // );

    const dispatch = useDispatch()
    const [dummyId, setDummyId] = useState({})
    const [checkid, setcheckid] = useState([])
  //  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjm", dummyId);

  


console.log("Edit Data:",edit);
    // selector
   

    useEffect(() => {
        dispatch(fetchApiDataToppings())
    }, [checkid])

    // useEffect(() => {
    //     const checkeddddd = [];
    //      if(edit.id>0){
    //     ToppingData?.map((item) => {
    //         item.ischecked=false;
    //         dummy.filter((selection) => {
    //             if (selection.combinationToppingId == item.toppingId) {
    //                 item.ischecked=true;

    //                 const newData = { ...item, selection }
    //                 checkeddddd.push(newData)
    //             }
    //         })
    //     })
    //     setcheckid(checkeddddd, true)
        
    //      }
    // }, [ToppingData])

    const toppingNameChangeHandler = (check, id, item) => {


      
        const itemselected = [...ToppingDatafinal];
        if (check) {            
            item.IsChecked=true;
        }
        else {           
            item.IsChecked=false;
        }    
       itemselected.filter(x=>x.toppingId===id).IsChecked=check;
        setToppingDatafinal(itemselected);
     
    }

    const unCheckHandler = (id) => {

        document.getElementById(id).checked = false;

        const uncheck = checkid.filter((item) => id != item.toppingId)

        setcheckid(uncheck)

    }

    const combinationHandler = (data) => {
        props.combinationHandlers(data)
    }


    return (
        

        <div className=' d-flex aligns-item-center w-100'>
            <div className='productSection__table mt-3' style={{ width: "30%" }}>
                
          
            <table className='table m-0 '>
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col" >Topping Names</th>
                            <th scope="col" className='text-center'>Food Type</th>

                        </tr>
                    </thead>
                    <tbody>

                        { ToppingDatafinal.map((item, index) => {
                      
                      return       <tr key={index}>
                                <td className='text-center'>
                                    <input className="form-check-input"
                                        
                                        id={item.toppingId} type="checkbox" checked={item.IsChecked} onClick={(e) => toppingNameChangeHandler(e.target.checked, item.toppingId, item)} />
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
                    toppingNameData={ToppingDatafinal.filter(x=>x.IsChecked==true)}
                    combinationHandler={combinationHandler}
                    unCheckHandler={unCheckHandler}
                    combinationPropsData={combinationPropsData}
                />
            </div>
        </div>
    )
}

export default ToppingNames;