import { useEffect } from 'react';
import "./ProductTable.scss";
import images from "../../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataProduct, fetchDelApiDataProduct, fetchEditProduct, resetStates } from "../../../../../Store/Slice/ProductSlices"
import { useNavigate } from 'react-router-dom';

function ProductTable() {
    const dispatch = useDispatch()
    const navigate =  useNavigate()

    const productList = useSelector((state) => state.ProductSlices.data)
    const productMessage = useSelector((product) => product.ProductSlices.message)


    useEffect(() => {
        dispatch(fetchApiDataProduct())
    }, [productMessage])

    console.log("first", productMessage)


    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">is Active?</th>
                            <th scope="col">Food Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {productList && productList.map((item, index) => {
                            return < tr key={index} >
                                <td scope="row">{item.productName}</td>
                                <td>{item.isActive.toString()}</td>
                                <td>{item.foodTypeId <= 1 ? "Veg" : "Non-veg"}</td>
                                <td>{item.taxClassId}</td>
                                <td>
                                    <div className="productAction__buttons d-flex">
                                        <span>
                                            <img
                                                src={images.editIcon}
                                                alt="Edit Icon"
                                                onClick={()=> (dispatch(fetchEditProduct(item.productId), navigate(`/add-product/productform/${item.productId}`)))}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                src={images.deleteIcon}
                                                alt="Delete Icon"
                                                onClick={() => (dispatch(fetchDelApiDataProduct(item.productId)), dispatch(resetStates())) }
                                            />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        })
                        }

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default ProductTable
