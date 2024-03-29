import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";

import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditSalaryTemplate = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [salaryTemplate, setSalaryTemplate] = useState({
    basicSalary: "",
  });


  useEffect(() => {
    loadSalaryTemplate();
  }, []);
  const loadSalaryTemplate = async () => {
    const result = await axios.get(
        `http://13.200.246.216:5000/salaryTemplate/get/${id}`
    );
    setSalaryTemplate(result.data);
};

  const handleInputChange = (e) => {
    setSalaryTemplate({
      ...salaryTemplate,
      [e.target.name]: e.target.value,
    });
  };
const updateSalaryTemplate = async (e) => {
    e.preventDefault();
    await axios.put(
        `http://13.200.246.216:5000/salaryTemplate/update/${id}`,
      salaryTemplate
    );
    navigate("/payroll/salaryTemplate");
};

const [menu, setMenu] = useState(false);
  return (

    <div>
     <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
      <div className="head-foot-part" style={{ padding: "0" }}>
      <div className="col-sm-8 py-2 px-5 shadow">
      <h2 className="mt-5">Edit Salary Template</h2>
      <form onSubmit={(e) => updateSalaryTemplate(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="LoanName">
            Basic Salary
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="basicSalary"
            id="basicSalary"
            required
            value={salaryTemplate.basicSalary}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="data-buttons">
                <Button id="input-btn-submit" variant="outlined" type="submit">
                  Submit
                </Button>
                <Button
                  id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/payroll/salary-template")}
                >
                  Back
                </Button>
              </div>
      </form>
    </div>
      </div>
    </div>
  </div>
  
  );
};

export default EditSalaryTemplate;
