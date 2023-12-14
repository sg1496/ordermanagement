
import React, { useEffect } from "react";
import tablebin from '../../../../../assets/svg/tablebin.svg';
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../../../../Store/Slice/VariantSlices";
import { fetchApiDataToppings } from "../../../../../Store/Slice/ToppingSlices";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ProductToppingSelectionTable(props) {
    

    const dispatch = useDispatch();
    const { id } = useParams();

    // useState
    const [toppingCheckName, setToppingCheckName] = useState("");
    const [trial, setTrial] = useState([]);
    

    // useEffect
    useEffect(() => {
        setToppingCheckName(props.toppingNameData);
    }, [props.toppingNameData]);

    useEffect(() => {
        dispatch(fetchApiData());
        dispatch(fetchApiDataToppings());
    }, []);

    const variantSelectionTable = useSelector((state) => state.variantSlices.data);

    useEffect(() => {
        const allda = [];
        if (variantSelectionTable && toppingCheckName && props.selectedToppingName.length > 0
        ) {
            const addKeyCheck = JSON.parse(JSON.stringify(toppingCheckName));
            addKeyCheck.map((item2) => {
                item2.isRemoved = false
                item2.isDeleted = false

                let c = [];
                let newData


                let idExist = props.selectedToppingName.filter(
                    (element) => {
                        if (element.combinationProductId === item2.toppingId) {
                            newData = {
                                // mainToppingId: item2.toppingId,
                                // mainToppingName: item2.toppingName,
                                ...item2, selectionD: { toppingId: item2.toppingId, isRemoved: element.isRemoved, isDeleted: element.isDeleted }
                                
                            };
                            return newData
                        }
                    }
                );

                if (idExist.length > 0) {

                    variantSelectionTable.map((item1) => {
                        props.selectedToppingName.map((selectedData) => {
                            if (
                                selectedData.variantId === item1.variantId &&
                                selectedData.combinationProductId === item2.toppingId
                            ) {
                                let dataas = {
                                    ...item1,
                                    selection: {
                                        productCombinationId: selectedData.productCombinationId,
                                        combinationProductId: item2.toppingId,
                                        quantity: selectedData.quantity,
                                        variantId: item1.variantId,

                                    },
                                };
                                c.push(dataas);

                            }
                        });
                    });
                } else {
                    newData = {
                        // mainToppingId: item2.toppingId,
                        // mainToppingName: item2.toppingName,
                        ...item2, selectionD: { toppingId: item2.toppingId, isRemoved: false, isDeleted: 0  }
                        
                    };
                    variantSelectionTable.map((item1) => {
                        let dataas = {
                            ...item1,
                            selection: {
                                productCombinationId: -1,
                                combinationProductId: item2.toppingId,
                                quantity: 0,
                                variantId: item1.variantId,
                                isRemoved: false,
                                
                            },
                        };
                        c.push(dataas);
                    });
                }
                newData = { ...newData, allTrailData: c };
                allda.push(newData);
            });
            setTrial(allda);
        } else
            if (variantSelectionTable && toppingCheckName) {
                const addKeyCheck = JSON.parse(JSON.stringify(toppingCheckName));
                addKeyCheck.map((item1) => {
                   
                    item1.isRemoved = false
                    item1.isDeleted = false
                    var c = [];
                    

                    var newData = {
                        ...item1, selectionD: { toppingId: item1.toppingId, isRemoved: false, isDeleted: 0 }
                    };
                    variantSelectionTable.map((item) => {
                        let dataas = {
                            ...item,
                            selection: {
                                productCombinationId: -1,
                                combinationProductId: item1.toppingId,
                                quantity: 0,
                                variantId: item.variantId,
                                isRemoved: false,
                               


                            },
                        };
                        c.push(dataas);
                        // allda.push(dataas)
                    });
                    
                    newData = { ...newData, allTrailData: c };
                    allda.push(newData);
                });

                setTrial(allda);

            }
    }, [variantSelectionTable, toppingCheckName]);


    // useEffect(() => {

    //     const allda = [];
    //     if (variantSelectionTable && toppingCheckName && props.selectedToppingName.length > 0
    //     ) {
    //         toppingCheckName.map((item2) => {
    //             let c = [];

    //             let newData = {
    //                 // mainToppingId: item2.toppingId,
    //                 // mainToppingName: item2.toppingName,
    //                 ...item2
    //             };
    //             let idExist = props.selectedToppingName.filter(
    //                 (element) => element.combinationProductId === item2.toppingId
    //             );

    //             if (idExist.length > 0) {
    //                 variantSelectionTable.map((item1) => {
    //                     props.selectedToppingName.map((selectedData) => {
    //                         if (
    //                             selectedData.variantId === item1.variantId &&
    //                             selectedData.combinationProductId === item2.toppingId
    //                         ) {
    //                             let dataas = {
    //                                 ...item1,
    //                                 selection: {
    //                                     productCombinationId: selectedData.productCombinationId,
    //                                     combinationProductId: item2.toppingId,
    //                                     quantity: selectedData.quantity,
    //                                     variantId: item1.variantId,
    //                                 },
    //                             };
    //                             c.push(dataas);

    //                         }
    //                     });
    //                 });
    //             } else {
    //                 variantSelectionTable.map((item1) => {
    //                     let dataas = {
    //                         ...item1,
    //                         selection: {
    //                             productCombinationId: -1,
    //                             combinationProductId: item2.toppingId,
    //                             quantity: 0,
    //                             variantId: item1.variantId,

    //                         },
    //                     };
    //                     c.push(dataas);

    //                 });
    //             }
    //             newData = { ...newData, allTrailData: c };
    //             allda.push(newData);
    //         });
    //         setTrial(allda);
    //     } else if (variantSelectionTable && toppingCheckName) {
    //         toppingCheckName.map((item1) => {
    //             var c = [];

    //             var newData = {
    //                 // mainToppingId: item1.toppingId,
    //                 // mainToppingName: item1.toppingName,
    //                 ...item1
    //             };
    //             variantSelectionTable.map((item) => {
    //                 let dataas = {
    //                     ...item,
    //                     selection: {
    //                         combinationProductId: item1.toppingId,
    //                         quantity: 0,
    //                         variantId: item.variantId,

    //                     },
    //                 };
    //                 c.push(dataas);
    //                 // allda.push(dataas)
    //             });
    //             newData = { ...newData, allTrailData: c };
    //             allda.push(newData);
    //         });

    //         setTrial(allda);
    //         
    //     }
    // }, [variantSelectionTable, toppingCheckName]);

    const combinationChangeHandler = (e, variantId, toppingId) => {
        let newArr = trial.map((item, i) => {
            if (item.toppingId === toppingId) {
                var c = [];
                item.allTrailData.map((traildata, ind) => {

                    if (traildata.variantId === variantId) {
                        var t = {
                            ...traildata,
                            selection: {
                                productCombinationId: traildata.selection.productCombinationId,
                                combinationProductId: toppingId,
                                quantity: parseInt(e.target.value),
                                variantId: traildata.variantId,
                            },
                        };
                        c.push(t);
                    } else {
                        var t = {
                            ...traildata,
                            selection: {
                                productCombinationId: traildata.selection.productCombinationId,
                                combinationProductId: toppingId,
                                quantity: traildata.selection.quantity,
                                variantId: traildata.variantId,

                            },
                        };
                        c.push(t);
                    }
                });
                return { ...item, allTrailData: c };
            } else if (item.toppingId === toppingId) {
                var c = [];
                item.allTrailData.map((traildata, ind) => {
                    if (traildata.variantId === variantId) {
                        var t = {
                            ...traildata,
                            selection: {
                                productCombinationId: -1,
                                combinationProductId: toppingId,
                                quantity: parseInt(e.target.value),
                                variantId: traildata.variantId,

                            },
                        };
                        c.push(t);
                    } else {
                        var t = {
                            ...traildata,
                            selection: {
                                productCombinationId: -1,
                                combinationProductId: toppingId,
                                quantity: traildata.selection.quantity,
                                variantId: traildata.variantId,

                            },
                        };
                        c.push(t);
                    }
                });
                return { ...item, allTrailData: c };
            }
            else {
                return item;
            }
        });

        setTrial(newArr);
        props.combinationDataSendParent(newArr);
    };

   
    const toppingNameChangeHandler = (id, e, item) => {
       
    
        let newArr = trial.map((topping) => {
            if (topping.toppingId === id) {
                return {
                    ...topping,
                    selectionD: {
                        ...topping.selectionD,
                        isRemoved: e.target.name === 'isRemoved' ? e.target.checked : topping.selectionD.isRemoved,
                        isDeleted: 1 // Not sure if this property is necessary for your case
                    }
                };
            }
            return topping;
        });
    
        
        setTrial(newArr);
        props.combinationDataSendParent(newArr);
    };

   

    return (
        <>
            <div className="productSection__table  mt-3">
                {toppingCheckName < 1 ? (
                    ""
                ) : (
                    <table className="table m-0 text-center">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "30%" }}>
                                    Topping Name
                                </th>
                                <th scope="col" style={{ width: "45%" }} colSpan={"3"}>
                                    Required Quantity
                                </th>
                                <th scope="col">
                                    isRemoved
                                </th>
                                <th scope="col" style={{ width: "25%" }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {trial?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="pt-4">
                                            {item.toppingName}
                                        </td>

                                        {item?.allTrailData.map((data, ind) => {
                                            return (
                                                <td key={ind}>
                                                    <div className="d-flex justify-content-center aligns-item-center">
                                                        <div style={{ width: "100px" }}>
                                                            <label
                                                                htmlFor="product-name"
                                                                className="form-label "
                                                            >
                                                                {data.variantName}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id={data.variantId}
                                                                className="form-control"
                                                                placeholder="Pizza"
                                                                name="quantity"
                                                                value={data.selection.quantity}
                                                                onChange={(e) =>
                                                                    combinationChangeHandler(
                                                                        e,
                                                                        data.variantId,
                                                                        item.toppingId
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        })}

                                        <td className="pt-4">
                                            <div className="form-check form-switchs pt-1 ms-4 abc">
                                                <input
                                                    type="checkbox"
                                                    id={`isActive${index}`}
                                                    className="form-check-input p-2 toggle_btn"
                                                    name="isRemoved"
                                                    checked={item.selectionD.isRemoved}
                                                    onChange={(e) => toppingNameChangeHandler(item.toppingId,e, item)}
                                                />
                                            </div>
                                        </td>
                                        <td className="pt-4">
                                            <img
                                                src={tablebin}
                                                alt="Delete Icon"
                                                onClick={(e) =>( toppingNameChangeHandler(item.toppingId,e, null, ),props.unCheckHandler(item.toppingId))}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default ProductToppingSelectionTable;






































// import React, { useEffect } from "react";
// import tablebin from '../../../../../assets/svg/tablebin.svg';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchApiData } from "../../../../../Store/Slice/VariantSlices";
// import { fetchApiDataToppings } from "../../../../../Store/Slice/ToppingSlices";
// import { useParams } from "react-router-dom";
// import { useState } from "react";

// function ProductToppingSelectionTable(props) {

//     const dispatch = useDispatch();
//     const { id } = useParams();

//     // useState
//     const [toppingCheckName, setToppingCheckName] = useState("");
//     const [trial, setTrial] = useState([]);
//     

//     // useEffect
//     useEffect(() => {
//         setToppingCheckName(props.toppingNameData);
//     }, [props.toppingNameData]);

//     useEffect(() => {
//         dispatch(fetchApiData());
//         dispatch(fetchApiDataToppings());
//     }, []);

//     const variantSelectionTable = useSelector((state) => state.variantSlices.data);


//     const toppingNameChangeHandler = (e, item, id) => {

//         let newArr = trial.map((item) => {
//             if (item.toppingId === id) {
//                 return {
//                     ...item,
//                     selectionD: {
//                         toppingId: item.toppingId,
//                         isRemoved: e.target.name === 'isRemoved' ? e.target.checked : item.selectionD.isRemoved,
//                     }
//                 };
//             } else {
//                 return item;
//             }
//         })
//         setTrial(newArr)
//         props.combinationDataSendParent(newArr);
//         // item.allTrailData[0].selection.isRemoved=check
//         // item.allTrailData[1].selection.isRemoved=check
//         // item.allTrailData[2].selection.isRemoved=check

//         // item.allTrailData?.map((item) => {
//         //     item.selection.isRemoved = check
//         // })

//     }

//     useEffect(() => {
//         const allda = [];
//         if (variantSelectionTable && toppingCheckName && props.selectedToppingName.length > 0
//         ) {
//             const addKeyCheck = JSON.parse(JSON.stringify(toppingCheckName));
//             addKeyCheck.map((item2) => {
//                 item2.isRemoved = false

//                 let c = [];
//                 let newData

//                  newData = {
//                     // mainToppingId: item2.toppingId,
//                     // mainToppingName: item2.toppingName,
//                     ...item2
//                 };
//                 let idExist = props.selectedToppingName.filter(
//                     (element) => element.combinationProductId === item2.toppingId
//                 );

//                 if (idExist.length > 0) {
//                     variantSelectionTable.map((item1) => {
//                         props.selectedToppingName.map((selectedData) => {
//                             if (
//                                 selectedData.variantId === item1.variantId &&
//                                 selectedData.combinationProductId === item2.toppingId
//                             ) {
//                                 let dataas = {
//                                     ...item1,
//                                     selection: {
//                                         productCombinationId: selectedData.productCombinationId,
//                                         combinationProductId: item2.toppingId,
//                                         quantity: selectedData.quantity,
//                                         variantId: item1.variantId,
//                                         isRemoved: selectedData.isRemoved
//                                     },
//                                 };
//                                 c.push(dataas);

//                             }
//                         });
//                     });
//                 } else {
//                      newData = {
//                         // mainToppingId: item2.toppingId,
//                         // mainToppingName: item2.toppingName,
//                         ...item2, selectionD: { toppingId: item2.toppingId, isRemoved: false }
//                     };
//                     variantSelectionTable.map((item1) => {
//                         let dataas = {
//                             ...item1,
//                             selection: {
//                                 productCombinationId: -1,
//                                 combinationProductId: item2.toppingId,
//                                 quantity: 0,
//                                 variantId: item1.variantId,
//                                 isRemoved: false
//                             },
//                         };
//                         c.push(dataas);
//                     });
//                 }
//                 newData = { ...newData, allTrailData: c };
//                 allda.push(newData);
//             });
//             setTrial(allda);
//         } else
//             if (variantSelectionTable && toppingCheckName) {
//                 const addKeyCheck = JSON.parse(JSON.stringify(toppingCheckName));
//                 addKeyCheck.map((item1) => {
//                     item1.isRemoved = false
//                     var c = [];

//                     var newData = {
//                         ...item1, selectionD: { toppingId: item1.toppingId, isRemoved: false }
//                     };
//                     variantSelectionTable.map((item) => {
//                         let dataas = {
//                             ...item,
//                             selection: {
//                                 combinationProductId: item1.toppingId,
//                                 quantity: 0,
//                                 variantId: item.variantId,

//                             },
//                         };
//                         c.push(dataas);
//                         // allda.push(dataas)
//                     });
//                     newData = { ...newData, allTrailData: c };
//                     allda.push(newData);
//                 });

//                 setTrial(allda);
//                 
//             }
//     }, [variantSelectionTable, toppingCheckName]);



//     const combinationChangeHandler = (e, variantId, toppingId) => {
//         
//         let newArr = trial.map((item, i) => {
//            
//             if (id && item.toppingId === toppingId) {

//                 var c = [];


//                 item.allTrailData.map((traildata, ind) => {

//                     if (traildata.variantId === variantId) {
//                         var t = {
//                             ...traildata,
//                             selection: {
//                                 productCombinationId: traildata.selection.productCombinationId,
//                                 combinationProductId: item.toppingId,
//                                 quantity: parseInt(e.target.value),
//                                 variantId: traildata.variantId,
//                             },
//                         };
//                         c.push(t);
//                     } else {
//                         var t = {
//                             ...traildata,
//                             selection: {
//                                 productCombinationId: traildata.selection.productCombinationId,
//                                 combinationProductId: item.toppingId,
//                                 quantity: traildata.selection.quantity,
//                                 variantId: traildata.variantId,
//                             },
//                         };
//                         c.push(t);
//                     }
//                 });
//                 return { ...item, allTrailData: c };
//             } else if (item.toppingId === toppingId) {

//                 var c = [];


//                 item.allTrailData.map((traildata, ind) => {

//                     if (traildata.variantId === variantId) {
//                         var t = {
//                             ...traildata,
//                             selection: {
//                                 productCombinationId: -1,
//                                 combinationProductId: item.toppingId,
//                                 quantity: parseInt(e.target.value),
//                                 variantId: traildata.variantId,
//                             },
//                         };
//                         c.push(t);
//                     } else {
//                         var t = {
//                             ...traildata,
//                             selection: {
//                                 productCombinationId: -1,
//                                 combinationProductId: item.toppingId,
//                                 quantity: traildata.selection.quantity,
//                                 variantId: traildata.variantId,
//                             },
//                         };
//                         c.push(t);
//                     }
//                 });
//                 return { ...item, allTrailData: c, };
//             } else {
//                 return item;
//             }
//         });

//         setTrial(newArr);
//         props.combinationDataSendParent(newArr);
//     };











//     // functions
//     const deleteHandler = (id) => {
//         const deleteddata = trial.filter((item) => item.mainToppingId !== id);
//         setTrial(deleteddata);
//         props.unCheckHandler(id);
//     };

//     return (
//         <>
//             <div className="productSection__table  mt-3">
//                 {toppingCheckName < 1 ? (
//                     ""
//                 ) : (
//                     <table className="table m-0 text-center">
//                         <thead>
//                             <tr>
//                                 <th scope="col" style={{ width: "30%" }}>
//                                     Topping Name
//                                 </th>
//                                 <th scope="col" style={{ width: "45%" }} colSpan={"3"}>
//                                     Required Quantity
//                                 </th>
//                                 <th scope="col">
//                                     isRemoved
//                                 </th>
//                                 <th scope="col" style={{ width: "25%" }}>
//                                     Action
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {trial?.map((item, index) => {
//                                 
//                                 return (
//                                     <tr key={index}>
//                                         <td className="pt-4">
//                                             {item.toppingName}
//                                         </td>

//                                         {item?.allTrailData.map((data, ind) => {
//                                             return (
//                                                 <td key={ind}>
//                                                     <div className="d-flex justify-content-center aligns-item-center">
//                                                         <div style={{ width: "100px" }}>
//                                                             <label
//                                                                 htmlFor="product-name"
//                                                                 className="form-label "
//                                                             >
//                                                                 {data.variantName}
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 id={data.variantId}
//                                                                 className="form-control"
//                                                                 placeholder="Pizza"
//                                                                 name="quantity"
//                                                                 value={data.selection.quantity}
//                                                                 onChange={(e) =>
//                                                                     combinationChangeHandler(
//                                                                         e,
//                                                                         data.variantId,
//                                                                         item.toppingId
//                                                                     )
//                                                                 }
//                                                             />

//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                             );
//                                         })}
//                                         <td className="pt-4">
//                                             <div className="form-check form-switchs pt-1 ms-4 abc">
//                                                 <input
//                                                     type="checkbox"
//                                                     id={`isActive${index}`}
//                                                     className="form-check-input p-2 toggle_btn"
//                                                     name="isRemoved"
//                                                     // checked={item.selection.isRemoved}
//                                                     onChange={(e) => toppingNameChangeHandler(e, item, item.toppingId)}
//                                                 />
//                                             </div>
//                                         </td>




//                                         <td className="pt-4">
//                                             <img
//                                                 src={tablebin}
//                                                 alt="Delete Icon"
//                                                 onClick={() => deleteHandler(item.mainToppingId)}
//                                             />
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </>
//     );
// }

// export default ProductToppingSelectionTable;
