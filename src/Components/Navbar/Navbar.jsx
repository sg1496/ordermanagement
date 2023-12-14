import React from "react";
import Toggler from "./Toggler/Toggler";
import List from "./List/List";
import "./Navbar.scss";
import { useState } from "react";

function Navbar(props) {

const [drawer, setDrawer] = useState(false)

const drawerHandler=()=>{
    if(drawer === false){
        setDrawer(true)
    }else{
        setDrawer(false)
    }
}
    return (
        <aside className="aside__Navbar">
            <Toggler  drawerHandler={drawerHandler}/>
            <List drawerData={drawer} />
        </aside>
    );
}

export default Navbar;
