import React, { useState } from 'react'
import "./Settings.scss"
import { NavLink, Outlet } from 'react-router-dom';





const Settings = () => {
  const [showform, setshowform] = useState(true)

  const clickfn = () => {
    setshowform(!showform)
  }
  return (
    <div   >
     
      <div>
      <div className='addProduct__navtab d-flex'>
        <NavLink to="generalform">General</NavLink>
        <NavLink to="storedetails">Store Details</NavLink>
        <NavLink to="ReceiptFormat">Receipt Format</NavLink>
        <NavLink to="RewardProgram">Reward Program</NavLink>

        

      </div>
      <div className='navTabs__content p-3'>
          <Outlet />
        </div>
        </div>

    </div>
  )
}
export default Settings;