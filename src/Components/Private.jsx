
import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import RecordList from "./RecordsList"
import EditRecordList from "./EditRecordList"
function Private() {
    var data = useSelector((state) => state)
    // console.log(data);
      if(data.Login.isAuth){
        return(
            <div>
                 <Route exact path="/dashboard" render={()=> <RecordList/>}/> 
                 <Route path="/dashboard/:id" render={()=> <EditRecordList/>}/>
            </div>
        )}
        else {
            alert("You are Logged out ! Please Login to get access!");
            return <Redirect to="/" />
        }
}

export default Private