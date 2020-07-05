import React, { Component } from "react";
import axios from "axios";
import "./main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { motion } from "framer-motion";
//components
import PlateTable from "../Components/PlateTable";
import Create from "../Components/Create";

const api = axios.create();

export class main extends Component {
  state = {
    carPlates: [],
    loadingScreen: true,
    currentPage: 1,
    platesPerPage: 5,
  };
  async componentDidMount() {
    await api
      .get(
        "https://europe-west1-car-plate-numbers.cloudfunctions.net/api/getCarPlates"
      )
      .then((result) => {
        this.setState({ carPlates: result.data });
        this.setState({ loadingScreen: false });
        console.log(this.state.carPlates);
      })
      .catch((err) => {
        alert("Blocked by CORS");
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {this.state.loadingScreen ? (
          <div>
            <Backdrop open={true}>
              <CircularProgress color="secondary" />
            </Backdrop>
          </div>
        ) : (
          <motion.div animate={{ opacity: [0, 1] }}>
            <PlateTable carPlates={this.state.carPlates} />
            <div className="createBTN">
              <Create />
            </div>
          </motion.div>
        )}
      </div>
    );
  }
}

export default main;
