import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "./PlateTable.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
// import axios from "axios";
import Confirmation from "./Confirmation";

// const api = axios.create({
//   baseURL: "https://europe-west1-car-plate-numbers.cloudfunctions.net/api",
// });

export class PlateTable extends Component {
  state = {
    confirmDel: false,
    delPlateId: "",
  };
  selectedToDel(plateId) {
    this.setState({ confirmDel: true });
    this.setState({ delPlateId: plateId });
  }
  handleConfirmUpdate() {
    this.setState({ confirmDel: false });
  }
  render() {
    return (
      <div>
        <TableContainer component={Paper} className="app">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Nr.</h3>
                </TableCell>
                <TableCell>
                  <h3>Name</h3>
                </TableCell>
                <TableCell>
                  <h3>Surname</h3>
                </TableCell>
                <TableCell>
                  <h3>Plate Nr.</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.carPlates.map((row, index) => (
                <TableRow key={row.Id}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell>{row.Surname}</TableCell>
                  <TableCell>{row.PlateNr}</TableCell>
                  <TableCell>
                    <NavLink
                      to={{
                        pathname: "/editPlate",
                        state: {
                          carPlate: this.props.carPlates[index],
                          loading: true,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<EditIcon />}
                      >
                        EDIT
                      </Button>
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() =>
                        this.selectedToDel(this.props.carPlates[index].Id)
                      }
                      startIcon={<DeleteIcon />}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Confirmation
          confirmDel={this.state.confirmDel}
          delPlateId={this.state.delPlateId}
          updateConfirm={this.handleConfirmUpdate.bind(this)}
          carPlates={this.props.carPlates}
        />
      </div>
    );
  }
}

export default PlateTable;
