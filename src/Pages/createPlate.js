import React, { Component } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoneOutlineSharpIcon from "@material-ui/icons/DoneOutlineSharp";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./createPlate.css";

export class createPlate extends Component {
  state = {
    name: "",
    surname: "",
    platenr: "",
  };

  handlePlateChange = async (event) => {
    await this.setState({ platenr: event.target.value });
  };
  handleNameChange = async (event) => {
    await this.setState({ name: event.target.value });
  };
  handleSurnameChange = async (event) => {
    await this.setState({ surname: event.target.value });
  };
  createNewRecord() {
    console.log("name ", this.state.name);
    console.log("surname ", this.state.surname);
    console.log("platenr", this.state.platenr);
    axios
      .post(
        "https://europe-west1-car-plate-numbers.cloudfunctions.net/api/createCarPlate",
        {
          name: this.state.name,
          surname: this.state.surname,
          platenr: this.state.platenr,
        }
      )
      .then((resp) => {
        alert("Record created successfuly");
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }
  render() {
    return (
      <div className="container">
        <div>
          <TextField
            className="textfield"
            label="Name"
            variant="filled"
            onChange={this.handleNameChange}
          ></TextField>
          <TextField
            className="textfield"
            label="Surname"
            variant="filled"
            onChange={this.handleSurnameChange}
          ></TextField>
          <TextField
            className="textfield"
            label="Plate No."
            variant="filled"
            onChange={this.handlePlateChange}
          ></TextField>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DoneOutlineSharpIcon />}
            className="create-confirm"
            onClick={() => this.createNewRecord()}
          >
            Confirm
          </Button>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button
              className="create-back"
              variant="contained"
              color="secondary"
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default createPlate;
