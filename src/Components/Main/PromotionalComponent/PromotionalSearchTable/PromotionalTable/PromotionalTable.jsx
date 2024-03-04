import React, { useEffect, useState } from 'react';
import images from '../../../../../assets/images';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import verifyToken from '../../../../SignIn/verifyToken';
import { DeletePromotionalActivity, GetAllPromotionalActivities, GetSinglePromotionalActivity } from '../../../../../Store/Slice/PromotionalSlices';


const PromotionalTable = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loginToken = verifyToken()

    const promotionalActivity = useSelector(item => item.PromotionalSlices.data)
    const promotionalActivityMessage = useSelector(item => item.PromotionalSlices.message)

    console.log("check message", promotionalActivityMessage)

    useEffect(() => {
        dispatch(GetAllPromotionalActivities(loginToken.userID))
    }, [promotionalActivityMessage])





    return (
        <>
            <div className='productSection__table mt-3'>
                <table className='table m-0'>
                    <thead>
                        <tr>
                            <th scope="col">Activity Name</th>
                            <th scope="col">Promotional Type</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Display Order</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {promotionalActivity?.map((activity, index) => {
                            return <tr key={index}>
                                <td scope="row">{activity.activityName}</td>
                                <td>{activity.typeName}</td>
                                <td>{String(activity.isActive)}</td>
                                <td>{activity.displayOrder}</td>
                                <td>
                                    <div className="productAction__buttons d-flex">
                                        <span>
                                            <img
                                                src={images.editIcon}
                                                alt="Edit Icon"
                                                onClick={() => (dispatch(GetSinglePromotionalActivity(activity.promotionalActivityId)), navigate(`/promotional_Form/${activity.promotionalActivityId}`))}
                                            />
                                        </span>
                                        <span>
                                            <img
                                                src={images.deleteIcon}
                                                alt="Delete Icon"
                                                onClick={() => dispatch(DeletePromotionalActivity({
                                                    promotionalActivityId: activity.promotionalActivityId,
                                                    loginUserId: loginToken.userID
                                                }))}
                                            />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )
}

export default PromotionalTable
