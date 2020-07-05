import React, { Component } from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import axios from "axios";

const api = axios.create({
  baseURL: "https://europe-west1-car-plate-numbers.cloudfunctions.net/api",
});

export class Confirmation extends Component {
  delete(toDelete) {
    console.log(toDelete);
    // this should go inside the axios call
    const index = this.props.carPlates.findIndex((x) => x.Id === toDelete);
    this.props.carPlates.splice(index, 1);
    this.props.updateConfirm();
    // ------------------------------------
    api
      .delete("/deleteCarPlate", {
        id: toDelete,
      })
      .then((resp) => {
        if (resp.status !== 500) {
          this.setState({ confirmDel: false });
        }
        const index = this.props.carPlates.findIndex((x) => x.Id === toDelete);
        this.props.carPlates.splice(index, 1);
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <Modal
          ref={this.test}
          className="confirmation"
          isOpen={this.props.confirmDel}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          style={{ overlay: { background: "rgba(36, 123, 160, 0.7)" } }}
        >
          <div>Are you sure you want to delete this record?</div>
          <br></br>
          <Button
            className="plate-right"
            color="primary"
            variant="contained"
            onClick={() => {
              this.delete(this.props.delPlateId);
            }}
          >
            Confirm
          </Button>
          <Button
            className="plate-left"
            variant="contained"
            onClick={this.props.updateConfirm}
            color="secondary"
          >
            Cancel
          </Button>
        </Modal>
      </div>
    );
  }
}

export default Confirmation;
