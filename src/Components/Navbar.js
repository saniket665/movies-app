import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display: "flex", alignItems: "center", paddingLeft: "1rem", marginTop: "1rem"}}>
                <Link to="/" style={{textDecoration: "none"}}><h1 style={{fontSize: "2.2rem"}}>Movie App</h1></Link>
                <Link to="/favourite" style={{textDecoration: "none"}}><h2 style={{marginLeft: "1rem", marginTop: "5px"}}>Favorites</h2></Link>
            </div>
        )
    }
}

