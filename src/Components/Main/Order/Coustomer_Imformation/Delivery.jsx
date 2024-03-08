import React from 'react'

const Delivery = () => {
    return (
        <>
            <div className="row addProduct__basicTabs">
                <form>
                    <div className="addProduct__basic d-flex mb-4 col-mb-2">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                Phone Number:
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
                                Customer Name:
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
                    <div className="addProduct__basic d-flex mb-4 col-mb-2">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                House Number:
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
                                Locality:
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
                    <div className="addProduct__basic d-flex mb-4 col-mb-2">
                        <div className="addProduct__productNamed">
                            <label htmlFor="product-name" className="form-label inputForm__label">
                                City:
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
                                Pincode:
                                <span className="formRequired">*</span>
                            </label>
                            <input
                                type="number"
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

export default Delivery