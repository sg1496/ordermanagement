import React from 'react'

const Dining = () => {
    return (
        <>
            <div className="addProduct__basicTabs">
                <form>
                    <div className="addProduct__basic d-flex mb-4">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Category Name:
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

                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Category Name:
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
                   
                </form>
            </div>
        </>
    )
}

export default Dining