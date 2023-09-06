import React from 'react';
import "./Buttons.scss";

function Buttons(props) {
    return (
        <>
            <div className="addproduct__submitButtons d-flex pt-4 pb-2">
                <button type="submit" className="saveButton">
                    {props.fname}
                </button>
                <button className="cancelButton" type='reset' onClick={props.cancelHandler}>{props.Sname}</button>
            </div>
        </>
    )
}

export default Buttons
