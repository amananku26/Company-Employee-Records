import React from "react"
import NavBar from "./Navs/NavBar"
import { Route, Switch } from "react-router-dom"
import Login from "./Login"
import Private from "./Private"

function Routing(){

    return(
        <div>
            <NavBar/>
            <Switch>
            <Route exact path="/" render={()=> <Login />} />
            <Route path="/dashboard" render={()=> <Private/>}/>
            </Switch>
        </div>
    )
}

export default Routing