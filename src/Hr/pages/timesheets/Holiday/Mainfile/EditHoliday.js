import React, {
    useEffect,
    useState,
  } from "react";
  import axios from "axios";
  import Button from "@mui/material/Button";
  
  import {
    Link,
    useNavigate,
    useParams,
  } from "react-router-dom";

  import Header from "../../../../components/Header";
  import SideBar from "../../../../components/SideBar";
  import CompanyLogoFile from "../../../../components/CompanyLogoFile";
  
  const EditHoliday = () => {
    let navigate = useNavigate();
  
    const { id } = useParams();
  
    const [holiday, setHoliday] = useState({
        eventName: "",
        startDate: "",
        endDate: "",
        description: "",
    });
    const {
        eventName, startDate, endDate, description
    } = holiday;
  
    useEffect(() => {
      loadHoliday();
    }, []);
  
    const loadHoliday = async () => {
      const result = await axios.get(
        `http://localhost:8084/holidays/get/${id}`
      );
      setHoliday(result.data);
    };
  
    const handleInputChange = (e) => {
      setHoliday({
        ...holiday,
        [e.target.name]: e.target.value,
      });
    };
    const updateHoliday = async (e) => {
      e.preventDefault();
      await axios.put(
        `http://localhost:8084/holidays/update/${id}`,
        holiday
      );
      navigate("/timesheets/holiday");
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
        <div className="head-foot-part">
        <div className="col-sm-8 py-2 px-5 shadow">
        <h2 className="mt-5"> Edit Holiday</h2>
        <form onSubmit={(e) => updateHoliday(e)}>
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="eventName">
              Event Name
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="eventName"
              id="eventName"
              required
              value={eventName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
  
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="startDate">
              Start Date
            </label>
            <input
              className="form-control col-sm-6"
              type="date"
              name="startDate"
              id="startDate"
              required
              value={startDate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
  
          <div className="input-group mb-5">
            <label
              className="input-group-text"
            >
              End Date
            </label>
            <input
              className="form-control col-sm-6"
              type="date"
              name="endDate"
              id="endDate"
              required
              value={endDate}
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
                  onClick={() => navigate("/timesheets/holiday")}
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
  
  export default EditHoliday;
  