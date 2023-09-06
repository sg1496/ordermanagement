import { useEffect } from 'react';
import "./ProductTable.scss";
import images from "../../../../../assets/images"
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataProduct } from "../../../../../Store/Slice/ProductSlices"

function ProductTable() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchApiDataProduct())
    }, [])
    const productList = useSelector((state) => state.ProductSlices.data)
    console.log(productList)

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

                        {productList && productList.map((item, index) =>{
                        return < tr key={index} >
                            <td scope="row">{item.productName}</td>
                            <td>{item.isActive.toString()}</td>
                            <td>{item.foodTypeId <=1 ? "Veg" :"Non-veg"}</td>
                            <td>{item.taxClassId}</td>
                            <td>
                                <div className="productAction__buttons d-flex">
                                    <span><img src={images.editIcon} alt="Edit Icon" /></span>
                                    <span><img src={images.deleteIcon} alt="Delete Icon" /></span>
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
