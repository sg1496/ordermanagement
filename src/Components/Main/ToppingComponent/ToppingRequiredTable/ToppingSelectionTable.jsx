import React, { useEffect } from "react";
import tablebin from "../../../../assets/svg/tablebin.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../../../Store/Slice/VariantSlices";
import { fetchApiDataToppings } from "../../../../Store/Slice/ToppingSlices";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ToppingSelectionTable(props) {
   
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
  const dummydata = useSelector((state) => state.ToppingSlices.dummy.toppingCombinatiomQuantityList);

  useEffect(() => {
    const allda = [];
    if (variantSelectionTable && toppingCheckName &&  props.selectedToppingName.length > 0 
    ) {
      toppingCheckName.map((item2) => {
        let c = [];
       
        let newData = {
          mainToppingId: item2.toppingId,
          mainToppingName: item2.toppingName,
        };
        let idExist = props.selectedToppingName.filter(
          (element) => element.combinationToppingId === item2.toppingId
        );
        
        if (idExist.length > 0) {
          variantSelectionTable.map((item1) => {
            props.selectedToppingName.map((selectedData) => {
              if (
                selectedData.variantId === item1.variantId &&
                selectedData.combinationToppingId === item2.toppingId
              ) {
                let dataas = {
                  ...item1,
                  selection: {
                    toppingCombinationId: selectedData.toppingCombinationId,
                    combinationToppingId: item2.toppingId,
                    quantity: selectedData.quantity,
                    variantId: item1.variantId,
                  },
                };
                c.push(dataas);
                
              }
            });
          });
        } else {
          variantSelectionTable.map((item1) => {
            let dataas = {
              ...item1,
              selection: {
                toppingCombinationId:-1,
                combinationToppingId: item2.toppingId,
                quantity: 0,
                variantId: item1.variantId,
              },
            };
            c.push(dataas);
            
          });
        }
        newData = { ...newData, allTrailData: c };
        allda.push(newData);
      });
      setTrial(allda);
    } else if (variantSelectionTable && toppingCheckName) {
      toppingCheckName.map((item1) => {
        var c = [];

        var newData = {
          mainToppingId: item1.toppingId,
          mainToppingName: item1.toppingName,
        };
        variantSelectionTable.map((item) => {
          let dataas = {
            ...item,
            selection: {
              combinationToppingId: item1.toppingId,
              quantity: 0,
              variantId: item.variantId,
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

  const combinationChangeHandler = (e, variantId, toppingId) => {
    let newArr = trial.map((item, i) => { 
      if (id && item.mainToppingId === toppingId) {
        var c = [];
        item.allTrailData.map((traildata, ind) => {
          if (traildata.variantId === variantId) {
            var t = {
              ...traildata,
              selection: {
                toppingCombinationId:traildata.selection.toppingCombinationId,
                combinationToppingId: toppingId,
                quantity: parseInt(e.target.value),
                variantId: traildata.variantId,
              },
            };
            c.push(t);
          } else {
            var t = {
              ...traildata,
              selection: {
                toppingCombinationId:traildata.selection.toppingCombinationId,
                combinationToppingId: toppingId,
                quantity: traildata.selection.quantity,
                variantId: traildata.variantId,
              },
            };
            c.push(t);
          }
        });
        return { ...item, allTrailData: c };
      }else  if (item.mainToppingId === toppingId) {
        var c = [];
        item.allTrailData.map((traildata, ind) => {
          if (traildata.variantId === variantId) {
            var t = {
              ...traildata,
              selection: {
                toppingCombinationId:-1,
                combinationToppingId: toppingId,
                quantity: parseInt(e.target.value),
                variantId: traildata.variantId,
              },
            };
            c.push(t);
          } else {
            var t = {
              ...traildata,
              selection: {
                toppingCombinationId:-1,
                combinationToppingId: toppingId,
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

  // functions
  const deleteHandler = (id) => {
    const deleteddata = trial.filter((item) => item.mainToppingId !== id);
    setTrial(deleteddata);
    props.unCheckHandler(id);
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
                      {item.mainToppingName}
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
                                    item.mainToppingId
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                    <td className="pt-4">
                      <img
                        src={tablebin}
                        alt="Delete Icon"
                        onClick={() => deleteHandler(item.mainToppingId)}
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

export default ToppingSelectionTable;
