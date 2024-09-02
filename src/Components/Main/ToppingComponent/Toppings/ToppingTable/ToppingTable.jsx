import React, { useEffect, useState } from 'react';
import "./ToppingTable.scss";
import images from '../../../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiDataToppings, fetchEditTopping, fetchDelApiDataToppings, resetStates } from '../../../../../Store/Slice/ToppingSlices';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import verifyToken from '../../../../SignIn/verifyToken';
import AlertDialog from '../../../../utils/DeleteConfirmationAlert';


function ToppingTable({setAlert}) {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const loginToken = verifyToken()
    const [filterData, setFilterData] = useState(null);
    const [deleteModel, setDeleteModel] = useState({ check: false, id: null })
    const [page, setPage] = useState(1)
    const perPageItem = 10;

    // useSelector
    const message = useSelector((state) => state.ToppingSlices.message)
    const toppings = useSelector((state) => state.ToppingSlices.data)
    const searchText = useSelector((state) => state.ToppingSlices.search);


    // dispatch useEffect
    useEffect(() => {
        dispatch(fetchApiDataToppings(loginToken.userID))
    }, [message])

    useEffect(() => {
        if (toppings && toppings) {
            const filteredValue = toppings?.filter((item) => {
                return (
                    item.toppingName.toLowerCase().includes(searchText.toLowerCase())
                )
            })
            setFilterData(filteredValue)
            setPage(1)
        }
    }, [toppings, searchText])

    const changePageHandler = (event, newPage) => {
        setPage(newPage)
    }

    const closeHandler = () => {
        setDeleteModel({ check: false })
    }

    const deleteHandler = () => {
        dispatch(fetchDelApiDataToppings(deleteModel.id))
        setDeleteModel({check: false, id:null})
        setAlert({type: "success", message: "Topping delete successfully"})    
    }

    return (
        <>
            <AlertDialog
                open={deleteModel}
                onClose={closeHandler}
                title="Confirmation"
                message="Are you sure you want to delete Topping"
                onDelete={deleteHandler}
            />

            <div className='productSection__table mt-3 '>
                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col">Topping Name</th>
                            <th scope="col">Short Code</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Topping Allowed</th>
                            <th scope="col">Food Type</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!filterData ?
                            <tr>
                                <td colSpan={6}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <Stack>
                                            <CircularProgress color='secondary' />
                                        </Stack>
                                    </div>
                                </td>
                            </tr>
                            :
                            filterData?.slice((page - 1) * perPageItem, page * perPageItem)?.map((item, id) => {
                                return <tr key={id}>
                                    <td scope="row">{item.toppingName}</td>
                                    <td>{item.toppingAbbr}</td>
                                    <td>{item.isActive.toString()}</td>
                                    <td>{item.isToppingAllowed.toString()}</td>
                                    <td>{item.foodTypeId === 1 ? "veg" : "non-veg"}</td>
                                    <td>
                                        <div className="productAction__buttons d-flex">
                                            <span><img src={images.editIcon} alt="Edit Icon" onClick={() => (dispatch(fetchEditTopping(item.toppingId), navigate(`/dashboard/toppingform/${item.toppingId}`)))} /></span>
                                            <span>
                                                <img src={images.deleteIcon}
                                                    alt="Delete Icon"
                                                    onClick={() => (setDeleteModel({ check: true, id: item.toppingId }), dispatch(resetStates()))} />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className='wrapper'>
                    {perPageItem < filterData?.length && <Stack>
                        <Pagination
                            color='primary'
                            count={Math.ceil(filterData && filterData ? filterData?.length : 0) / perPageItem}
                            page={page}
                            onChange={changePageHandler}
                        />
                    </Stack>}
                </div>
            </div >
        </>
    )
}

export default ToppingTable
