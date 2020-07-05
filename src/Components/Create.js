import React, { Component } from "react";

// material ui
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

//css
import { NavLink } from "react-router-dom";

export class Create extends Component {
  render() {
    return (
      <NavLink to="/createPlate" style={{ textDecoration: "none" }}>
        <Fab size="large" color="secondary">
          <AddIcon />
        </Fab>
      </NavLink>
    );
  }
}

export default Create;
