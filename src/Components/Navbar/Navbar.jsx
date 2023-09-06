import React from "react";
import Toggler from "./Toggler/Toggler";
import List from "./List/List";
import "./Navbar.scss";

function Navbar() {
    return (
        <aside className="aside__Navbar">
            <Toggler />
            <List />
        </aside>
    );
}

export default Navbar;
