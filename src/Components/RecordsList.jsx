import React, { useEffect, useState } from "react"
import { getdata } from "../redux/actionCreator"
import { useSelector, useDispatch } from "react-redux"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom"
import TablePagination from '@material-ui/core/TablePagination';
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

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

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function RecordList() {

    const classes = useStyles();
    const dispatch = useDispatch()
    const [searchItem,setSearchItem] = useState("")

    useEffect(() => {
        dispatch(getdata({searchItem}));
    }, []);

    var data = useSelector((state) => state)
    // console.log(data, "RecordList")
    const history = useHistory()
    const handleEdit = (user_id,
        avatar_url, department, payment, username_fullname,
        description) => {
        // console.log(user_id,
        //     avatar_url, department, payment, username_fullname,
        //     description)
        history.push({
            pathname: `/dashboard/${user_id}`,
            state: {
                user_id: user_id,
                avatar_url: avatar_url,
                department: department,
                username_fullname: username_fullname,
                description: description
            },
        })
    }
    const [selectb,setSelectOption]  = useState("All")
    const [selectc,setSelectOptionC]  = useState("All")
    const handleDepartment = (e) => {
        setSelectOption(e.target.value)
    }

    const handleGenderChange = (e) => {
        setSelectOptionC(e.target.value)
    }

    const [perpage,setPerpage] = useState(3)
    const [currentPage,setcurrentPage] = useState(1)
    // const [searchItem,setSearchItem] = useState("")
    const handleSearch = () => {
        // console.log(searchItem)
        dispatch(getdata({searchItem}))
    }
  
    const handleClick = (currentPageNumber) => {
        setcurrentPage(currentPageNumber)
        
      };

    var totalbtn = Math.ceil(data.Login.AllData.length / 3)
    // console.log(totalbtn)

   const filterLogic = (data, index) => {
        let start = currentPage * perpage - perpage;
        let end = start + perpage;
        return index >= start && index < end;
      };
    let btnArr = new Array(totalbtn).fill(0);

    return (
        <TableContainer component={Paper}>
            <br/>
            Sort By Department :  
            <select style={{marginRight:"25px"}} onChange={handleDepartment}>
            <option name="All" value="All">All</option>
              <option name="women" value="Software Engineer">Software Engineer</option>
              <option name="men" value="Full Stack Developer">Full Stack Developer</option>
              <option name="jewelery" value="System Engineer">System Engineer</option>
            </select>
            Sort By Gender :  
            <select onChange={handleGenderChange}>
            <option name="All" value="All">All</option>
              <option name="men" value="male">male</option>
              <option name="jewelery" value="female">female</option>
            </select>
            <input style={{marginLeft:"25px"}}  placeholder="Enter Search Value" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}    />
            <button style={{border:"none"}} onClick={handleSearch}>Search</button>
            <br/> <br/>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Employee ID</StyledTableCell>
                        <StyledTableCell align="left">Image</StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Gender</StyledTableCell>
                        <StyledTableCell align="left">Department</StyledTableCell>
                        <StyledTableCell align="left">Edit</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.Login.AllData?.filter(filterLogic)
                   .filter(item => {
                        if (selectb == "All") {
                          return (item.department)
                        }
                        else if (selectb == undefined) {
                          return (item.department)
                        } else {
                          return (item.department == selectb)
                        }
                      })
                      .filter(item => {
                        if (selectc == "All") {
                          return (item.gender)
                        }
                        else if (selectc == undefined) {
                          return (item.gender)
                        } else {
                          return (item.gender == selectc)
                        }
                      })
                    //  .filter(item=> {
                    //      return item.username_fullname == searchItem
                    //  }) 
                    .map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.description}
                            </StyledTableCell>
                            <StyledTableCell align="left"> <Avatar alt="Cindy Baker" src={row.avatar_url} /> </StyledTableCell>
                            <StyledTableCell align="left">{row.username_fullname}</StyledTableCell>
                            <StyledTableCell align="left">{row.gender}</StyledTableCell>
                            <StyledTableCell align="left">{row.department}</StyledTableCell>
                            <StyledTableCell align="left">
                                {
                                    row.user_id == data.Login.user_id &&
                                    <Link to={`/dashboard/${row.user_id}`} >
                                        <button onClick={() => handleEdit(row.user_id,
                                            row.avatar_url, row.department, row.payment, row.username_fullname,
                                            row.description
                                        )}>edit</button>
                                    </Link>
                                }
                                {/* <button onClick={handleEdit}>edit</button> */}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                {btnArr.map((item, index) => (
                    <button key={index} id={index} onClick={() => handleClick(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </TableContainer>
    )
}

export default RecordList
