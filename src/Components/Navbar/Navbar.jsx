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

const drawerHandlers=()=>{
    if(drawer === true){
        setDrawer(false)
    }
}

const drawerClick=()=>{
    if(drawer === false){
        setDrawer(true)
    }
}
    return (
        <aside className="aside__Navbar">
            <Toggler  drawerHandler={drawerHandler}/>
            <List drawerHandlers={drawerHandlers} drawerClick={drawerClick} drawerData={drawer} />
        </aside>
    );
}

export default Navbar;
