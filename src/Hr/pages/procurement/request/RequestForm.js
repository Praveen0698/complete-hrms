import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RequestState from "../request/RequestState";
import * as RequestApi from "../request/RequestApi";

const RequestForm = ({ formData, setFormData, setFormVisible, setToggle }) => {
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();
  const {
    toggle,
    formVisible,
    dateError,
    setDateError,
    request,
    setRequest,
    open,
    setOpen,
    recDelete,
    setRecDelete,
  } = RequestState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "createdDate") {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }
    
    setFormData({
      ...formData,
      [name]: value,
      [e.target.name]: e.target.value,
      
    });
  };
 

  const [items, setItems] = useState([
    {
      id: 1,
      descriptionOfMaterialId: 0,
      descriptionOfMaterialOrGoodsOrService: "",
      unitName: "",
      quantity: 0,
    },
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      descriptionOfMaterialId: 0,
      descriptionOfMaterialOrGoodsOrService: "",
      unitName: "",
      quantity: 0,
    };

    setItems([...items, newItem]);
  };

  console.log(formData);

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    setItems(updatedItems);
    
    setFormData({
      ...formData,
 
    });
    const formDataWithUpdatedItems = {
      ...formData,
    };

    if (field === "descriptionOfMaterialOrGoodsOrService") {
      formDataWithUpdatedItems.descriptionOfMaterialOrGoodsOrService = value;
    }

    if (field === "unitName") {
      formDataWithUpdatedItems.unitName = value;
    }

    if (field === "quantity") {
      formDataWithUpdatedItems.quantity = value;
    }

    setFormData(formDataWithUpdatedItems);
  };

  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(0, maxLength);
  };

  const saveRequest = async () => {
    try {
      await RequestApi.saveRequest(formData);
     
      handleClose();
    } catch (error) {
      console.error("Error saving debit:", error);
    }
  };
  const loadRequest = async () => {
    try {
      const result = await RequestApi.loadRequest();
      RequestState(result);
    } catch (error) {
      console.error("Error loading request:", error.response.data);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    handleClose();
  };

  const VoucherTypes = [
    {
      value: "",
      label: "Select Requesting Person",
    },
    {
      value: "Sarmistha Jena",
      label: "Sarmistha Jena",
    },
    {
      value: "Pritam Behera",
      label: "Pritam Behera",
    },
    {
      value: "Sourav Moharana",
      label: "Sourav Moharana",
    },
    {
      value: "Hrusikesh Jena",
      label: "Hrusikesh Jena",
    },
    {
      value: "Aditi Mishra",
      label: "Aditi Mishra",
    },
    {
      value: "Subham Parida",
      label: "Subham Parida",
    },
    





  ];
  const DepartmentTypes = [
    {
      value: "",
      label: "Select Department Type",
    },
    {
      value: "Technical",
      label: "Technical",
    },
    {
      value: "Backend",
      label: "Backend",
    },
    {
      value: "Frontend",
      label: "Frontend",
    },
    {
      value: "SEO",
      label: "SEO",
    },
  ];

  let buttonCheck = true;
  // formData.voucherType.length>0 &&
  // formData.date.length > 0 &&
  // formData.remark.length > 0 &&
  // formData.accountName.length > 0 &&
  // formData.subType.length > 0 &&
  // formData.ledgerComment.length > 0 &&
  // formData.amount.length > 0;

  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setFormData({
      createdDate: getCurrentDate(),
      requestId: 0,
      requestingPerson: "",
      requestingDepartment: "",
      expectedTimeToHaveTheGoodStarts: "",
      expectedTimeToHaveTheGoodEnds: "",
      reasonForRequesting: "",
      createdDate: "",
      descriptionOfMaterialEntities: [
        {
          descriptionOfMaterialId: 0,
          descriptionOfMaterialOrGoodsOrService: "",
          unitName: "",
          quantity: 0,
        },
      ],
    });
  };

  const handleListChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedEntities = [...prevData.descriptionOfMaterialEntities];
      updatedEntities[index] = {
        ...updatedEntities[index],
        [name]: value,
      };
      return {
        ...prevData,
        descriptionOfMaterialEntities: updatedEntities,
      };
    });
  };

  console.log(formData.descriptionOfMaterialEntities);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            margin="dense"
            label="Create Date"
            type="date"
            fullWidth
            name="createdDate"
            id="createdDate"
            value={formData.createdDate}
            onChange={(e) => handleInputChange(e)}
            required
            error={dateError}
            helperText={dateError && "Please select the current date"}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
            }}
          >
            <TextField
              style={{
                margin: "8px 15px",
                width: "30%",
              }}
              label="Requesting Person"
              id="outlined-size-small"
              select
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              name="requestingPerson"
              value={formData.requestingPerson}
              onChange={(e) => handleInputChange(e)}
            >
              {VoucherTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              style={{
                margin: "8px 15px",
                width: "30%",
              }}
              label="Requesting Department"
              id="outlined-size-small"
              select
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              name="requestingDepartment"
              value={formData.requestingDepartment}
              onChange={(e) => handleInputChange(e)}
            >
              {DepartmentTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
            }}
          >
            <TextField
              style={{
                margin: "8px 15px",
                width: "30%",
              }}
              margin="dense"
              label=" ExpectedTimeToHaveTheGoodStarts"
              type="date"
              fullWidth
              name="expectedTimeToHaveTheGoodStarts"
              id="expectedTimeToHaveTheGoodStarts"
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.expectedTimeToHaveTheGoodStarts}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <TextField
              style={{
                margin: "8px 15px",
                width: "30%",
              }}
              margin="dense"
              label="ExpectedTimeToHaveTheGoodEnds"
              type="date"
              fullWidth
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              name="expectedTimeToHaveTheGoodEnds"
              id="expectedTimeToHaveTheGoodEnds"
              value={formData.expectedTimeToHaveTheGoodEnds}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <TableContainer component={Paper}>
            <Table style={{ border: "1px solid #ddd" }}>
              <TableHead>
                <TableRow style={{ background: "#f2f2f2" }}>
                  <TableCell className="table-data">
                    Description Of Material/Good/Services
                  </TableCell>
                  <TableCell className="table-data">Unit</TableCell>
                  <TableCell className="table-data">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index} style={{ border: "1px solid #ddd" }}>
                    <TableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <TextField
                        id="outlined-size-small"
                        name="descriptionOfMaterialOrGoodsOrService"
                        value={
                          formData.descriptionOfMaterialEntities[index]
                            ?.descriptionOfMaterialOrGoodsOrService
                        }
                        onChange={(e) => handleListChange(index, e)}
                        style={{ width: "100%" }}
                      />
                    </TableCell>

                    {/* unit name  */}
                    <TableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <TextField
                        style={{
                          // margin: "8px 15px",
                          width: "100%",
                        }}
                        id="outlined-size-small"
                        name="unitName"
                        value={
                          formData.descriptionOfMaterialEntities[index]
                            ?.unitName
                        }
                        onChange={(e) => handleListChange(index, e)}
                      ></TextField>
                    </TableCell>

                    {/* unitname */}
                    <TableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      <TextField
                        type="text"
                        name="quantity"
                        value={
                          formData.descriptionOfMaterialEntities[index]
                            ?.quantity
                        }
                        onChange={(e) => {
                          handleItemChange(
                            item.quantity,
                            "quantity",
                            e.target.value
                          );
                          handleListChange(index, e);
                        }}
                        style={{ width: "90%" }}
                      />
                    </TableCell>

                    {/* Action */}

                    <TableCell
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        // startIcon={<AddIcon />}
                        onClick={() => addItem(item.id)}
                        style={{
                          marginBottom: "7px",
                          justifyContent: "center",
                        }}
                      >
                        {/* Add Item */}
                        {<AddIcon />}
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        // startIcon={<DeleteIcon />}
                        onClick={() => removeItem(item.id)}
                      >
                        {/* Delete */}
                        {<DeleteIcon />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {/* <TextField
            name="quantity"
            type="number"
            label="Qy"
            id="outlined-size-small"
            value={totalAmount}
            style={{ width: "20%" }}
            required
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              handleItemChange(items[0].id, "total", e.target.value);
              handleInputChange(e);
            }}
          /> */}
            <TextField
              margin="dense"
              label="Reason For Requesting"
              type="text"
              halfWidth
              name="reasonForRequesting"
              id="reasonForRequesting"
              value={formData.reasonForRequesting}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            style={{
              // display: "flex",
              // justifyContent: "end",
              marginBottom: "20px",
            }}
          ></div>

          <div className="data-buttons">
            <Button
              id="input-btn-submit"
              className="submit"
              type="submit"
              onClick={saveRequest}
              variant="outlined"
              disabled={buttonCheck ? false : true}
            >
              Submit
            </Button>
            <Button
              id="input-btn-cancel"
              className="cancel"
              onClick={cancelButton}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
