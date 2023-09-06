import React from 'react';
import "./Description.scss";
import { useDispatch } from 'react-redux';
import { navTitle } from '../../../../../Store/Slice/NavSlices';

function Description() {
    const dispatch = useDispatch();
    dispatch(navTitle("Add Products"));
    return (
        <>
            <div className='addProduct__descriptionTab'>
                <form>
                    <div className="addProduct__descriptionFormm">
                        <div className="addProduct__description">
                            <label htmlFor="description" className='form-label inputForm__label'>Description :</label>
                            <textarea name="" id="description" cols="10" rows="5" className='form-control w-25' placeholder='This product is'></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Description