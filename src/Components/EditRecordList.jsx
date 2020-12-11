import React,{useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import {PatchUserData} from "../redux/actionCreator"

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 100,
        paddingTop: '56.25%', // 16:9
      },
}));

function EditRecordList(props) {
    const classes = useStyles();
    const history = useHistory()
    var data = useSelector((state) => state)
    const dispatch = useDispatch()
    // console.log(data, "EditRecordList")
    // console.log(history, "editerewr")
     
    const [Changename,setName] = useState("")
    const [Changegender,setGender] = useState("")
    const [Changedepartment,setDepartment] = useState("")
    const [Changedate,setDate] = useState("")

    const handleChangeEdit = (e) => {
        // e.preventDefault()
        // console.log(Changename,Changegender,Changedepartment,Changedate,user_id)
        dispatch(PatchUserData({Changename,Changegender,Changedepartment,Changedate,user_id}))
    }

    // console.log(props)
    const { user_id,
        avatar_url, department, payment, username_fullname,
        description, joiningDate, } = data.Login



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <CardMedia
                            className={classes.media}
                            image={avatar_url}
                            title="Paella dish"
                        />
                         <Typography align="left">Name: {username_fullname}</Typography>
                         <Typography align="left">Joining Date: {joiningDate}</Typography>
                         <Typography align="left">ID: {description}</Typography>
                         <Typography align="left">Department: {department}</Typography>
                         <h3>Payment</h3>
                         {
                             payment.map((item)=> {
                                 return(
                                    <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                      <TableHead>
                                        <TableRow>
                                          <StyledTableCell align="left">Month</StyledTableCell>
                                          <StyledTableCell align="left">Year</StyledTableCell>
                                          <StyledTableCell align="left">Amount</StyledTableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {payment.map((row) => (
                                          <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                              {row.month}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.year}</StyledTableCell>
                                            <StyledTableCell align="left">Rs.{row.amount}</StyledTableCell>
                                          </StyledTableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                 )
                             })
                         }

                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                  
                   <TextField id="outlined-basic" label="Edit Name" variant="outlined" value={Changename} onChange={(e)=>setName(e.target.value)}  /> <br/>
                    <TextField id="outlined-basic" label="Edit Gender" variant="outlined" value={Changegender} onChange={(e)=>setGender(e.target.value)} /> <br/>
                    
                    <TextField id="outlined-basic" label="Edit Department" variant="outlined" value={Changedepartment} onChange={(e)=>setDepartment(e.target.value)} />  <br/>
                    <TextField type="date" id="outlined-basic" variant="outlined" value={Changedate} onChange={(e)=>setDate(e.target.value)} /> <br/><br/>
                    <button onClick={handleChangeEdit}>Change</button>
                  
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default EditRecordList