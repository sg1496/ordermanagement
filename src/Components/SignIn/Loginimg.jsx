import React from 'react'
import foodTable from "../../assets/images/foodTable.png"
import "./Loginimg.css"
import Login from './Login'

const Loginimg = ({setAlert}) => {
    return (
        <>
         
            <div className='row Login_bg ' >
                <div className='col '>
                    <Login setAlert={setAlert}/>
                </div>
                <div className='col image_pic'>
                    <img src={foodTable} alt='foodimg'></img>
                </div>

            </div>
        {/* </div > */}



        </>
    )
}
export default Loginimg;
