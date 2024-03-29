import React, {
    useEffect,
    useState,
  } from "react";
  import axios from "axios";
  import Button from "@mui/material/Button";

  import Header from "../../../../components/Header";
  import SideBar from "../../../../components/SideBar";
  import CompanyLogoFile from "../../../../components/CompanyLogoFile";
  
  import {
    Link,
    useNavigate,
    useParams,
  } from "react-router-dom";
  
  const EditTicket = () => {
    let navigate = useNavigate();
  
    const { id } = useParams();

  
    const [ticket, setTicket] = useState({
      employeeName: "",
    });
   
    useEffect(() => {
      loadTicket();
    }, []);
  
    const loadTicket = async () => {
      const result = await axios.get(
        `http://13.200.246.216:5000/tickets/get/${id}`
      );
      setTicket(result.data);
    };
  
    const handleInputChange = (e) => {
      setTicket({
        ...ticket,
        [e.target.name]: e.target.value,
      });
    };
    const updateTicket = async (e) => {
      e.preventDefault();
      await axios.put(
        `http://13.200.246.216:5000/tickets/update/${id}`,
        ticket
      );
      navigate("/ticket");
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
        <div className="col-sm-8 py-2 px-5  shadow">
        <h2 className="mt-5"> Edit Ticket</h2>
        <form onSubmit={(e) => updateTicket(e)}>
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="employeeName">
             Employee Name
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="employeeName"
              id="employeeName"
              required
              value={ticket.employeeName}
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
                  onClick={() => navigate("/ticket")}
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
  
  export default EditTicket;
  