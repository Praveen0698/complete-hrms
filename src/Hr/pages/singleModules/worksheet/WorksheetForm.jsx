import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateWorksheet from "./StateWorksheet";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";

const WorksheetForm = ({ formData, setFormData,setFormVisible,setToggle }) => {
  const navigate = useNavigate();

  const {
    setWorksheet,
    setDesciption,
    project,
    setProject,
    setEmployeeName,
    dateError,
    setDateError,
    employeeName
  } = StateWorksheet();

  const loadWorksheet = async () => {
    const result = await api.loadWorksheet();
    setWorksheet(result);
  };

  useEffect(() => {
    loadWorksheet();
    fetchProjects();
    fetchEmployee();
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handledesChange = (e) => {
    setDesciption(e.target.value);
  };
  const enforceMaxLength = (value, maxLength) => {
    return value.slice(0, maxLength);
  };

  const handleWorkSheetTitleChange = (e) => {
    const value = enforceMaxLength(e.target.value, 100);
    setFormData({
      ...formData,
      workSheetTitle: value,
    });
  };

  const isSubjectValid = () => {
    const { workSheetTitle } = formData;
    return (
      /^[A-Za-z]+$/.test(workSheetTitle) &&
      workSheetTitle.length >= 2 &&
      workSheetTitle.length <= 50
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "createdDate") {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: value,
    });
  };

  const saveWorksheet = async () => {
    await api.saveWorksheet(formData);
    navigate("/worksheets");
    setFormData({
      workSheetTitle: "",
      startDate: "",
      endDate: "",
      estimatedHour: "",
      project: "",
      employeeName: "",
      assignedTo: "",
      description: "",
      taskName: "",
      challengepart: "",
      workProgress: "",
      createdDate: "",
    });
  };

  const handleSubmit = (e) => {
    loadWorksheet();
  };

  const fetchProjects = async () => {
    const projectsData = await api.fetchProjects();
    setProject(projectsData);
  };

  const fetchEmployee = async () => {
    const employeeData = await api.fetchEmployee();
    setEmployeeName(employeeData);
  };

  const Work = [
    {
      value: "Choose",
      label: "Select progress",
    },
    {
      value: "Incomplete",
      label: "Incomplete",
    },
    {
      value: "Complete",
      label: "Complete",
    },
  ];

  console.log(project)
  console.log(employeeName)

  const cancelButton = () => {
    setFormVisible(false)
    setToggle(false)
    setFormData({
      workSheetTitle: "",
    startDate: "",
    endDate: "",
    estimatedHour: "",
    project: "",
    employeeName: "",
    assignedTo: "",
    description: "",
    taskName: "",
    challengepart: "",
    workProgress: "",
    createdDate: "",
    })
  }

  let buttonCheck = formData.workSheetTitle.length>0 && formData.startDate.length>0 && formData.endDate.length>0 && formData.estimatedHour.length>0 && formData.project.length>0 && formData.assignedTo.length>0 && formData.taskName.length>0 && formData.description.length>0 && formData.challengepart.length>0 && formData.workProgress.length>0 && formData.createdDate.length>0


  return (
    <form onSubmit={handleSubmit}>

    <div className="data-input-fields">
    <FormControl fullWidth>
          <InputLabel id="demo-worksheet-select-label">Employee Name</InputLabel>
          <Select
            labelId="demo-worksheet-select-label"
            id="selectedEmployee"
            value={formData.employeeName}
            name="employeeName"
            label="employeeName"
            onChange={(e) => handleInputChange(e)}
            
          >
            {employeeName && employeeName.map((item, index) => {
              return (
                <MenuItem key={index} value={item.employeeName}>
                  {item.employeeName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          name="workSheetTitle"
          id="workSheetTitle"
          value={formData.workSheetTitle}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2,
            maxLength: 100,
          }}
          error={ formData.workSheetTitle.length !== 0 && !(formData.workSheetTitle.length >= 2 &&
      formData.workSheetTitle.length <= 10)}
          helperText={
            formData.workSheetTitle.length !== 0 && !(formData.workSheetTitle.length >= 2 &&
      formData.workSheetTitle.length <= 10)
              ? "Subject length should be between 2 and 50 characters."
              : ""
          }
          onInput={(e) => {
            e.target.value = enforceMaxLength(e.target.value, 100);
            handleWorkSheetTitleChange(e);
          }}
        />
    </div>
      <div className="data-input-fields">

        <TextField
          margin="dense"
          type="date"
          label="Start Date"
          fullWidth
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{shrink:true}}
        />

        <TextField
          margin="dense"
          type="date"
          label="End Date"
          fullWidth
          name="endDate"
          id="endDate"
          value={formData.endDate}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{shrink:true}}
        />

        <TextField
          margin="dense"
          label="Estimated Hour"
          type="text"
          fullWidth
          name="estimatedHour"
          id="estimatedHour"
          value={formData.estimatedHour}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>

      <div className="data-input-fields">
        <FormControl fullWidth>
          <InputLabel id="demo-worksheet-select-label">Project Name</InputLabel>
          <Select
            labelId="demo-worksheet-select-label"
            id="selectedEmployee"
            value={formData.project}
            name="project"
            label="Project"
            onChange={(e) => handleInputChange(e)}
            required
          >
            {project && project.map((item, index) => {
              return (
                <MenuItem key={index} value={item.projectTitle}>
                  {item.projectTitle}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Assigned To"
          type="text"
          fullWidth
          name="assignedTo"
          id="assignedTo"
          value={formData.assignedTo}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          name="description"
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2, // Set your minimum length here
            maxLength: 500, // Set your maximum length here
          }}
          onInput={(e) => {
            e.target.value = enforceMaxLength(e.target.value, 500);
            handledesChange(e);
          }}
        />

        <TextField
          margin="dense"
          label="Task Name"
          type="text"
          fullWidth
          name="taskName"
          id="taskName"
          value={formData.taskName}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>

      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Challenge Part"
          type="text"
          fullWidth
          name="challengepart"
          id="challengepart"
          value={formData.challengepart}
          onChange={(e) => handleInputChange(e)}
          required
        />

        <TextField
          id="workProgress"
          margin="dense"
          select
          fullWidth
          defaultValue="Choose"
          SelectProps={{
            native: true,
          }}
          value={formData.workProgress}
          onChange={(e) => handleInputChange(e)}
          name="workProgress"
        >
          {Work.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Created Date"
          type="date"
          fullWidth
          name="createdDate"
          id="createdDate"
          value={formData.createdDate}
          onChange={(e) => handleInputChange(e)}
          required
          error={dateError}
          helperText={dateError ? "Please select the current date" : ""}
          InputLabelProps={{shrink:true}}
        />
      </div>

      <div className="data-buttons">
        <Button
          id="input-btn-submit"
          variant="outlined"
          type="submit"
          onClick={saveWorksheet}
          disabled={buttonCheck ? false : true}
        >
          Submit
        </Button>
        <Button
          id="input-btn-cancel"
          variant="outlined"
          onClick={cancelButton}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default WorksheetForm;
