import React, { useEffect } from "react";
import tablebin from "../../../../assets/svg/tablebin.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../../../Store/Slice/VariantSlices";
import { fetchApiDataToppings } from "../../../../Store/Slice/ToppingSlices";
import { useParams } from "react-router-dom";
import { useState } from "react";
import verifyToken from "../../../SignIn/verifyToken";

const ToppingSelectionTable = (props) =>{
  const loginToken = verifyToken()

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
    dispatch(fetchApiData(loginToken.userID));
    dispatch(fetchApiDataToppings(loginToken.userID));
  }, []);

  const variantSelectionTable = useSelector((state) => state.VariantSlices.data);


  useEffect(() => {
    const allda = [];
    if (variantSelectionTable && toppingCheckName && props.selectedToppingName.length > 0
    ) {
      const addKeyCheck = JSON.parse(JSON.stringify(toppingCheckName));
      addKeyCheck.map((item2) => {
        item2.isDeleted = false
        let c = [];
        let newData


        let idExist = props.selectedToppingName.filter(
          (element) => {
            if (element.combinationToppingId === item2.toppingId) {
              newData = {
                ...item2, selectionD: { toppingId: item2.toppingId, isDeleted: element.isDeleted }
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
          newData = {
            // mainToppingId: item2.toppingId,
            // mainToppingName: item2.toppingName,
            ...item2, selectionD: { toppingId: item2.toppingId, isDeleted: 0 }

          };
          variantSelectionTable.map((item1) => {
            let dataas = {
              ...item1,
              selection: {
                toppingCombinationId: -1,
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
      const addKeyCheck = JSON.parse(JSON.stringify(toppingCheckName));
      addKeyCheck.map((item1) => {
        item1.isRemoved = false
        var c = [];

        var newData = {
          ...item1, selectionD: { toppingId: item1.toppingId, isDeleted: 0 }
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
      if (id && item.toppingId === toppingId) {
        var c = [];
        item.allTrailData.map((traildata, ind) => {
          if (traildata.variantId === variantId) {
            var t = {
              ...traildata,
              selection: {
                toppingCombinationId: traildata.selection.toppingCombinationId,
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
                toppingCombinationId: traildata.selection.toppingCombinationId,
                combinationToppingId: toppingId,
                quantity: traildata.selection.quantity,
                variantId: traildata.variantId,
                isDeleted: traildata.selection.isDeleted
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
                toppingCombinationId: -1,
                combinationToppingId: toppingId,
                quantity: parseInt(e.target.value),
                variantId: traildata.variantId,
                isDeleted: traildata.selection.isDeleted
              },
            };
            c.push(t);
          } else {
            var t = {
              ...traildata,
              selection: {
                toppingCombinationId: -1,
                combinationToppingId: toppingId,
                quantity: traildata.selection.quantity,
                variantId: traildata.variantId,
                isDeleted: traildata.selection.isDeleted
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
                      <img
                        src={tablebin}
                        alt="Delete Icon"
                        onClick={() => (toppingNameChangeHandler(item.toppingId),props.unCheckHandler(item.toppingId))}
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
