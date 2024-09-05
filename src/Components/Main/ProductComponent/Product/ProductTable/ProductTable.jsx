import React, { useEffect, useState, useCallback, useMemo } from 'react';
import "./ProductTable.scss";
import images from "../../../../../assets/images";
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataProduct, fetchDelApiDataProduct, fetchEditProduct, resetStates } from "../../../../../Store/Slice/ProductSlices";
import { useNavigate } from 'react-router-dom';
import { Pagination, Stack, CircularProgress } from '@mui/material';
import verifyToken from '../../../../SignIn/verifyToken';
import AlertDialog from '../../../../utils/DeleteConfirmationAlert';

const ProductTable = ({ setAlert }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginToken = verifyToken();

    const [page, setPage] = useState(1);
    const [deleteModel, setDeleteModel] = useState({ check: false, id: null });
    const perPageItem = 1;

    const { data: productList = [], message: productMessage, search: searchtext } = useSelector((state) => state.ProductSlices);

    useEffect(() => {
        if (loginToken?.userID) {
            dispatch(fetchApiDataProduct(loginToken.userID));
        }
    }, [dispatch, loginToken?.userID, productMessage]);

    const filteredData = useMemo(() => {
        return productList?.filter(({ productName }) =>
            productName.toLowerCase().includes(searchtext.toLowerCase())
        );
    }, [productList, searchtext]);

    const totalPages = Math.ceil(filteredData?.length / perPageItem);

    const changePageHandler = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    const closeHandler = useCallback(() => {
        setDeleteModel({ check: false });
    }, []);

    const deleteHandler = useCallback(() => {
        if (deleteModel.id) {
            dispatch(fetchDelApiDataProduct(deleteModel.id));
            setDeleteModel({ check: false, id: null });
            setAlert({ type: "success", message: "Product deleted successfully" });
        }
    }, [dispatch, deleteModel.id, setAlert]);

    const handleEdit = useCallback((productId) => {
        dispatch(fetchEditProduct(productId));
        navigate(`/dashboard/add-product/productform/${productId}`);
    }, [dispatch, navigate]);

    const handleDelete = useCallback((productId) => {
        setDeleteModel({ check: true, id: productId });
        dispatch(resetStates());
    }, [dispatch]);

    console.log("product list", productList >= 0);


    return (
        <>
            <AlertDialog
                open={deleteModel}
                onClose={closeHandler}
                title="Confirmation"
                message="Are you sure you want to delete this product?"
                onDelete={deleteHandler}
            />
            <div className="productSection__table mt-3">
                <table className="table m-0">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Is Active?</th>
                            <th scope="col">Food Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.length > 0 ? (
                            filteredData?.slice((page - 1) * perPageItem, page * perPageItem).map((item) => (
                                <tr key={item.productId}>
                                    <td>{item.productName}</td>
                                    <td>{item.isActive.toString()}</td>
                                    <td>{item.foodTypeId <= 1 ? "Veg" : "Non-veg"}</td>
                                    <td>{item.taxClassId}</td>
                                    <td>
                                        <div className="productAction__buttons d-flex">
                                            <span onClick={() => handleEdit(item.productId)}>
                                                <img src={images.editIcon} alt="Edit Icon" />
                                            </span>
                                            <span onClick={() => handleDelete(item.productId)}>
                                                <img src={images.deleteIcon} alt="Delete Icon" />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {productList?.length >= 0 ? (
                                            <p className='empty_message'>Your product list is currently empty</p>

                                        ) : (
                                            <Stack>
                                                <CircularProgress color="secondary" />
                                            </Stack>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div className="wrapper">
                        <Stack>
                            <Pagination
                                color="primary"
                                count={totalPages}
                                page={page}
                                onChange={changePageHandler}
                            />
                        </Stack>
                    </div>
                )}
            </div>
        </>
    );
};

export default React.memo(ProductTable);
