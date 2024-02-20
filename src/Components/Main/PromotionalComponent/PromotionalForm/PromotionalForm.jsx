import React from 'react'
import Buttons from '../../ProductComponent/Buttons/NewButtons'

const PromotionalForm = () => {
    return (
        <>
            <div className="addProduct__basicTabs">
                <form>

                    <div className="addProduct__basic d-flex mb-4">

                        <div className="addProduct__productNamed">
                            <label htmlFor="taxClass" className="form-label inputForm__label" >
                                Select Type:
                            </label>
                            <select
                                className="form-select "
                                name='parentCategoryId'
                                id="taxClass"
                            >
                                <option value={"A"}>A</option>
                                <option value={"B"}>B</option>
                                <option value={"C"}>C</option>
                                <option value={"D"}>D</option>


                            </select>
                        </div>

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Activity Name:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                className="form-control"
                                placeholder="Pizza"
                                name='categoryName'
                                required
                            />
                        </div>

                       


                    </div>

                    <hr style={{color: "red"}}/>
                    <div>


                        <Buttons fname="Save"
                            Sname="Cancel"

                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default PromotionalForm