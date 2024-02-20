import React from 'react';
import "./Buttons.scss";

function Buttons({ saveButtonEnable = true, ...props }) {




    return (
        <>
            <div className="addproduct__submitButtons d-flex pt-4 pb-2">
                
                {props.Pname && <button className="saveButton" type='button' onClick={props.prevHandler}>{props.Pname}</button>}
                <button className="cancelButton" type='reset' onClick={props.cancelHandler}>{props.Sname}</button>
                {props.Ename && <button className="saveButton" type='button' onClick={props.nextHandler}>{props.Ename}</button>}
                {props.fname && <button type="submit" className="saveButton"  >
                    {props.fname}
                </button>}


            </div>
        </>
    )
}

export default Buttons
