import React, { useState } from 'react';




function FormTable() {

    const [selectedvalue1, setselectedvalue1] = useState("And")
    const [selectedvalue2, setselectedvalue2] = useState("And")

    const changeHandler1 = (e) => {
        setselectedvalue1(e.target.value);
    };
    const changeHandler2 = (e) => {
        setselectedvalue2(e.target.value);
    };
    return (
        <>
            <div className='productSection__table mt-5'>
                <table className='table m-0 text-center'>
                    <thead >
                        <tr style={{width: "100%"}}>
                            <th style={{ border: "Transparent", width: "20%" }} >

                            </th>
                            <th scope="col" style={{ width: "10%" }} >
                                Category
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                                Product
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                                Variant
                            </th>
                            <th scope="col" style={{ width: "15%" }}>
                                Quantity
                            </th>
                            <th scope="col" style={{ width: "15%" }}>
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr className='text-center'>
                            <td></td>
                            <td  >

                                <div className="addProduct__productName text-center">
                                    <select className=" inputForm__inputField " id="taxClass" >
                                        <option defaultValue>Pizza</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>
                            </td>
                            <td  >
                            <div className="addProduct__productName text-center ">
                                <select className=" inputForm__inputField " id="taxClass" >
                                    <option defaultValue>Margerita</option>
                                    <option value="one">one</option>
                                    <option value="two">two</option>
                                    <option value="Three">three</option>
                                </select>
                                </div>
                            </td>
                            <td className='text-center'>
                                <div className="addProduct__productName text-center">
                                    <select className=" inputForm__inputField " id="taxClass" >
                                        <option defaultValue>Extra Cheeze</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>
                            </td>

                            <td className='text-center'>
                                <div className="addProduct__productName text-center">

                                    <input
                                        type="number"
                                        id="product-name"
                                        className=" inputForm__inputField"
                                        placeholder="5"
                                        required
                                    />
                                </div>
                            </td>
                            <td></td>

                        </tr>
                        <tr>
                            <td  >

                                <div className="addProduct__productName  ">
                                    <select className=" inputForm__inputField " value={selectedvalue1} onChange={changeHandler1} id="taxClass" >
                                        <option value="And">And</option>
                                        <option value="Or">Or</option>
                                    </select>

                                </div>
                            </td>
                            <td  >

                                {selectedvalue1 === 'Or' && <div className="addProduct__productName ">
                                    <select className=" inputForm__inputField" id="taxClass" >
                                        <option defaultValue>pizza</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>}
                            </td>
                            <td className='text-center'>
                                <div className="addProduct__productName">
                                    <select className="inputForm__inputField " id="taxClass" >
                                        <option defaultValue>Margerita</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>
                            </td>
                            <td className='text-center'>
                                <div className="addProduct__productName">
                                    <select className="inputForm__inputField" id="taxClass" >
                                        <option defaultValue>Extra cheeze</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>
                            </td>

                            <td className='text-center'>
                                <div className="addProduct__productName">

                                    <input
                                        type="number"
                                        id="product-name"
                                        className=" inputForm__inputField"
                                        placeholder="5"
                                        required
                                    />
                                </div>
                            </td>
                            <td className='text-center'>
                                {selectedvalue1 === "And" && <div className="addProduct__productNamed">

                                    <input
                                        type="number"
                                        id="product-name"
                                        className=" inputForm__inputField"
                                        placeholder="285/-"
                                        required
                                    />
                                </div>}
                            </td>

                        </tr>
                        
                        <tr>
                            <td  >

                                <div className="addProduct__productName  ">
                                    <select className=" inputForm__inputField " value={selectedvalue2} onChange={changeHandler2} id="taxClass" >                                       
                                        <option value="And">And</option>
                                        <option value="Or">Or</option>
                                    </select>

                                </div>
                            </td>
                            <td  >

                            {selectedvalue2 === 'Or' && <div className="addProduct__productName ">
                                    <select className=" inputForm__inputField" id="taxClass" >
                                        <option defaultValue>pizza</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>}
                            </td>

                            <td className='text-center'>
                                <div className="addProduct__productName">
                                    <select className=" inputForm__inputField" id="taxClass" >
                                        <option defaultValue>Margerita</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>
                            </td>
                            <td className='text-center'>
                                <div className="addProduct__productName">
                                    <select className=" inputForm__inputField" id="taxClass" >
                                        <option defaultValue>Extra Cheeze</option>
                                        <option value="one">one</option>
                                        <option value="two">two</option>
                                        <option value="Three">three</option>
                                    </select>
                                </div>
                            </td>

                            <td className='text-center'>
                                <div className="addProduct__productName">
                                    <input
                                        type="Number"
                                        id="product-name"
                                        className=" inputForm__inputField"
                                        placeholder="5"
                                        required
                                    />
                                </div>
                            </td>
                            <td className='text-center'>
                                {selectedvalue2 === "And" && <div className="addProduct__productNamed">

                                    <input
                                        type="number"
                                        id="product-name"
                                        className=" inputForm__inputField"
                                        placeholder="285/-"
                                        required
                                    />
                                </div>}
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default FormTable;