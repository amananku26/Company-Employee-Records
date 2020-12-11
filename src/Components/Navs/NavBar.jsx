import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link,useHistory} from "react-router-dom"
import { useSelector } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const history =  useHistory()
  const classes = useStyles();
  var data = useSelector((state) => state)
  console.log(data);

  const handleLogout = () => {
    console.log("Logout CLicked")
    history.push("/")
  }
 
  if(data.Login.isAuth){
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography align="left" variant="h4" className={classes.title}>
            Company Employee Records
            </Typography>
            {/* <Link style={{textDecoration:"none"}} to="/dashboard"><Button style={{color:"black" , merginRight:"18px", background:"white",borderRadius:"55px"}}><ArrowBackIcon/></Button></Link> */}
            <button  style={{color:"black" , merginRight:"18px", background:"white",borderRadius:"55px"}} onClick={handleLogout}>Go Back</button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography align="left" variant="h5" className={classes.title}>
          Company Employee Records
          </Typography>
         <Button style={{color:"white" , merginRight:"18px",borderRadius:"55px"}}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// useHistory.goBack()