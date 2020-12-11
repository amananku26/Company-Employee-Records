import React,{useState} from 'react'
import { useSelector,useDispatch } from "react-redux"
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getUserData} from "../redux/actionCreator"
import {useHistory} from "react-router-dom"
import "../App.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


function Login(props){
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    var data = useSelector((state) => state)
    // console.log(data.Login.isAuth , "LoginCheck")
    // console.log(props)
    const handleSubmit = (e) => {
       e.preventDefault()
      //  console.log(username,password)
       dispatch(getUserData({username:username,password:password}))
    }
    if(data.Login.isAuth){
      // console.log(history)
     history.push("/dashboard")
    }
    return(
        <div className="ParentOfLogin">
          <form className={classes.root} onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e)=> setUsername(e.target.value)} /> <br/> <br/>
          <TextField id="outlined-basic" label="pasword" variant="outlined" value={password} onChange={(e)=> setPassword(e.target.value)} />  <br/>
          <TextField type="submit" value="Login"/>
          </form>
        </div>
    )
}

export default Login