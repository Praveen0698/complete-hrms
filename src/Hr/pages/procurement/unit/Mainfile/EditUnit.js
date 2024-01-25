import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";

const EditPolicies = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [expenses, setExpenses] = useState({
    title: "",
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const result = await axios.get(`http://13.200.246.216:5000/policies/get/${id}`);
    setExpenses(result.data);
  };

  const handleInputChange = (e) => {
    setExpenses({
      ...expenses,
      [e.target.name]: e.target.value,
    });
  };

  const updateExpenses = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.200.246.216:5000/policies/update/${id}`, expenses);
    navigate("/organisation/policies");
  };

  return (
    <div>
    <Header />
    <div className="dashboard-container">
      <SideBar />
      <div className="head-foot-part" style={{ padding: "0" }}>
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Expenses</h2>
      <form onSubmit={(e) => updateExpenses(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="purchaseDate">
            Title
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="title"
            id="title"
            required
            value={expenses.title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

    

        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg"
            >
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/organisation/policies"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
      </div>
    </div>
  </div>
   
  );
};

export default EditPolicies;
