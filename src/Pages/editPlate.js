import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import "./editPlate.css";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoneOutlineSharpIcon from "@material-ui/icons/DoneOutlineSharp";
import { motion } from "framer-motion";
import SnackBar from "@material-ui/core/Snackbar";

const api = axios.create(
  "https://europe-west1-car-plate-numbers.cloudfunctions.net/api"
);

export class editPlate extends Component {
  componentDidMount() {
    this.setState({ id: this.props.location.state.carPlate.Id });
    console.log(this.state.id);
  }
  state = {
    id: "",
    name: "",
    surname: "",
    platenr: "",
    DefName: this.props.location.state.carPlate.Name,
    DefSurname: this.props.location.state.carPlate.Surname,
    DefPlateNr: this.props.location.state.carPlate.PlateNr,
    snackBarErr: false,
    snackBarMsg: "",
  };
  handleSurnameOnChange = async (event) => {
    await this.setState({ surname: event.target.value });
  };
  handleNameOnChange = async (event) => {
    await this.setState({ name: event.target.value });
  };
  handlePlateNrOnChange = async (event) => {
    await this.setState({ platenr: event.target.value });
  };
  checkChanges = async () => {
    if (this.state.name === "") {
      await this.setState({ name: this.state.DefName });
    }
    if (this.state.platenr === "") {
      await this.setState({ platenr: this.state.DefPlateNr });
    }
    if (this.state.surname === "") {
      await this.setState({ surname: this.state.DefSurname });
    }
    await this.setState({ id: this.props.location.state.carPlate.Id });
    // console.log("Name: ", this.state.name);
    // console.log("Surname: ", this.state.surname);
    // console.log("PlateNr: ", this.state.platenr);
    // console.log("Id: ", this.state.id);
    await api
      .post(
        "https://europe-west1-car-plate-numbers.cloudfunctions.net/api/setCarPlate",
        {
          data: {
            id: this.state.id,
            name: this.state.name,
            surname: this.state.surname,
            platenr: this.state.platenr,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        alert(resp.data.message);
        window.location.href = "/";
      })
      .catch((err) => {
        //console.log(err.response.data);
        this.setState({ snackBarMsg: err.response.data });
        this.setState({ snackBarErr: true });
      });
  };
  render() {
    return (
      <motion.div animate={{ opacity: [0, 1] }}>
        <SnackBar
          onClose={() => this.setState({ snackBarErr: false })}
          autoHideDuration={5000}
          open={this.state.snackBarErr}
          message={this.state.snackBarMsg}
        />

        <div className="container">
          <TextField
            className="textfield"
            defaultValue={this.state.DefName}
            label="Name"
            variant="filled"
            onChange={this.handleNameOnChange}
          ></TextField>
          <TextField
            className="textfield"
            defaultValue={this.state.DefSurname}
            label="Surname"
            variant="filled"
            onChange={this.handleSurnameOnChange}
          ></TextField>
          <TextField
            className="textfield"
            defaultValue={this.state.DefPlateNr}
            label="Plate No."
            variant="filled"
            onChange={this.handlePlateNrOnChange}
          ></TextField>
        </div>
        <div>
          <Button
            className="edit-confirm"
            variant="contained"
            color="primary"
            onClick={this.checkChanges}
            startIcon={<DoneOutlineSharpIcon />}
          >
            Confirm
          </Button>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button
              className="edit-back"
              variant="contained"
              color="secondary"
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
          </NavLink>
        </div>
      </motion.div>
    );
  }
}

export default editPlate;
