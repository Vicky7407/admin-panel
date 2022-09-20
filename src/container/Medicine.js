import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {useSelector,useDispatch} from 'react-redux';
import { AddData, DeleteData, Medicinedata, UpdateData } from "../redux/action/Action.medicine";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Medicine(props) {
  const [open, setOpen] = useState(false);
  const [ setData] = useState([]);
  const [dopen, setDOpen] = useState(false);
  const [did,setDid]=useState(0);
  const [update,setUpdate] =useState(false);
  const [medicineData, setMedicineData] = useState([])
 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDClickOpen = () => {
    setDOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
    // setUpdate(false);
    formikObj.resetForm();
  };

  const handleDelete = (params) => {
    let handledelete = JSON.parse(localStorage.getItem("data"));
    // let Deletedata = handledelete.filter((i) => i.id !==did);
    // localStorage.setItem("data", JSON.stringify(Deletedata));
    dispatch(DeleteData(did))
    loadData();
    handleClose();
  };
  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("data"));
    console.log("data",localData)
    if (localData !== null) {
      setData(localData);
    }
  
  };

  let schema = yup.object().shape({
    Name: yup.string().required("Enter Medicine name"),
    price: yup
      .number()
      .required("Enter medicine price")
      .positive("price can't be negative"),
    Quantity: yup.string().required("Enter Quantity"),
    Expiry: yup.string().required("Enter Expiry date"),
    Pro_pic: yup.mixed().required("Please select file"),
    // createdOn: yup.date().default(function () {
    //   return new Date();
    // }),
  });

  // to local storage
  const handleData = (values) => {
    let localData = JSON.parse(localStorage.getItem("data"));
    let id = Math.floor(Math.random() * 1000);
    const addId = {
      id: id,
      ...values,
    };
    dispatch(AddData(addId));
    // if (localdata === null) {
    //   localStorage.setItem("data", JSON.stringify([addId]));
    // } else {
    //   localdata.push(addId);
    //   localStorage.setItem("data", JSON.stringify(localdata));
    // }
    formikObj.resetForm();
    handleClose();
  };

  const handleEdit =(params) =>{
    handleClickOpen();
    formikObj.setValues(params.row);
    updateData(values);
    setUpdate(true);
  }
  const updateData = (values) =>{
    let localdata = JSON.parse(localStorage.getItem("data"));
  //   const uData=localdata.map((l) =>{
  //     if(l.id===values.id){
  //      return values;
  //     }else{
  //      return l;
  //     }
  //  });
   dispatch(UpdateData(values))
   loadData();
   setUpdate(false);
  }
   const dispatch = useDispatch()
   const medicine = useSelector(state => state.Medicine)
  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem("data"));
    // if (data) {
    //   setData(data);
    // }
    dispatch(Medicinedata())
  }, []);
  const formikObj = useFormik({
    initialValues: {
      Name: "",
      price: "",
      Quantity: "",
      Expiry: "",
    },
    validationSchema: schema,
    onSubmit: (values , action) => {
        if(update){
          updateData(values);
        }else{
          handleData(values);
        }
      loadData();
      handleClose();
    },
  });
  const listdata = () =>{
    let localData = JSON.parse(localStorage.getItem('data'));
    if (localData !== null) {
      setData(localData)
    }
  }
  useEffect(() =>{
    listdata();
  }, [])

  useEffect(() => {
    if (medicine.MD) {
      setMedicineData(medicine.MD)
    }
  },[medicine.MD])
  
  const handleSearch = (val) => {
    // let Medicinedata = JSON.parse(localStorage.getItem("data"));
    let Medicinedata = medicine.MD;
    let  filterData=Medicinedata.filter((item) =>(
      item.Name.toLowerCase().includes(val.toLowerCase())||
      item.price.toString().includes(val)||
      item.Quantity.toString().includes(val)||
      item.Expiry.toString().includes(val)
     ))
      setMedicineData(filterData);
      // JSON.parse(localStorage.getItem("medicine"))
  }
  // const SearchData = searchdata.length > 0 ? searchdata : data;

  useEffect(()=>{

  },[])
  
  const columns = [
    { field: "Name", headerName: "Medicine Name", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "Quantity", headerName: "Quantity", width: 150 },
    { field: "Expiry", headerName: "Expiry", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
        <Box>
          <Button onClick={() => {handleEdit(params)}}>
             <EditIcon />
          </Button>
          <Button color="error" onClick={() =>{ handleDClickOpen(params); setDid(params.id); }}>
            <DeleteIcon />
          </Button>
        </Box>
        </div>
      ),
    },
    {
      field:"Pro_pic",
      headerName:"Profile pic_URL",
      width: 150,
      rendercell:() =>{
        <div>
          <AccountCircleIcon  sx={{ width: 40, height: 40, color: "text" }} />
        </div>
      }
    }
  ];

  const { errors, handleBlur, handleChange, handleSubmit, touched,values,setFieldValue } = formikObj;
  const c = useSelector(state=>state.counter);
  
  return (
  <>
    {
      medicine.isLoading?
        <p style={{textAlign:"center"}}> Stay tuned ....</p>
        :
      medicine.error !==''?
        <p>{medicine.error}</p> 
        :
      <div>
        <h1>Working on:{c.counter}</h1>
        <h2>Medicine.</h2>
        <Box sx={{ m: 1}}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add Medicine
            </Button>
            <TextField sx={{width:500,}}
                name="serch"
                margin="dense"
                label="Search"
                type="text"
                fullWidth
                variant="filled"
                id="filled-basic"
                onChange={(e)=> handleSearch(e.target.value)}
              />
          </Stack>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={medicineData && medicineData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Formik values={formikObj}>
            <Form onSubmit={handleSubmit}>
              <DialogTitle>Add Medicine</DialogTitle>
              <DialogContent>
                {/* <DialogContentText></DialogContentText> */}
                <TextField
                  value={values.Name}
                  margin="dense"
                  name="Name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p style={{ color: "red" }}>{errors.name}</p>
                ) : (
                  ""
                )}
                <TextField
                  value={values.price}
                  margin="dense"
                  name="price"
                  label="price"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && touched.price ? (
                  <p style={{ color: "red" }}>{errors.price}</p>
                ) : (
                  ""
                )}
                <TextField
                  value={values.Quantity}
                  margin="dense"
                  name="Quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.Quantity && touched.Quantity ? (
                  <p style={{ color: "red" }}>{errors.Quantity}</p>
                ) : (
                  ""
                )}
                <TextField
                  value={values.Expiry}
                  margin="dense"
                  name="Expiry"
                  label="Expiry"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.Expiry && touched.Expiry ? (
                  <p style={{ color: "red" }}>{errors.Expiry}</p>
                ) : (
                  ""
                )}
                <TextField
                  type="file"
                  name="Pro_pic"
                  variant="outlined" 
                  onChange={(e) =>setFieldValue("Pro_pic",e.target.files[0])}
                />
                {errors.Pro_pic && touched.Pro_pic ? (
                  <p style={{ color: "red" }}>{errors.Pro_pic}</p>
                ) : (
                  ""
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                  update?
                  <Button type="submit">Update</Button>
                  :
                  <Button type="submit">Add</Button>
                }
                
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
        <Dialog
          open={dopen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure want to delete?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    }
  </>
  );
}

export default Medicine;