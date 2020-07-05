const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore(); // database
const app = express();

app.use(cors({ origin: true }));

// GET method to retrieve a CarPlate by ID
app.get("/getCarPlate", async (req, resp) => {
  const snapshot = await db
    .collection("Car-Plates")
    .where("Id", "", req.body.id)
    .get()
    .catch((err) => {
      resp.status(500).json("Something went wrong");
      console.log(err);
    });
  if (snapshot.empty) {
    return resp.json("No matches found.");
  }
  return resp.json({ match: snapshot });
});

// GET method to retrieve a list of CarPlates
app.get("/getCarPlates", async (req, resp) => {
  await db
    .collection("Car-Plates")
    .orderBy("Name", "asc")
    .get()
    .then((data) => {
      let plates = [];
      data.forEach((plate) => {
        plates.push({
          Id: plate.id,
          Name: plate.data().Name,
          Surname: plate.data().Surname,
          PlateNr: plate.data().PlateNr,
        });
      });
      return resp.json(plates);
    })
    .catch((err) => console.log(err));
});

function PlateLetterValidation(platenr) {
  var reg = /^[A-Z]{3}/;
  return reg.test(platenr);
}
function PlateNumberValidation(platenr) {
  var reg = /[0-9]{3}$/;
  return reg.test(platenr);
}

// POST method to CREATE a new unique CarPlate
app.post("/createCarPlate", async (req, resp) => {
  if (req.body.platenr.length > 6) {
    return resp
      .status(400)
      .json(
        "Wrong plate number format. Must be 3 uppercase letters and 3 numbers 0-9"
      );
  }
  const platenr = req.body.platenr;
  if (
    platenr.length < 6 ||
    platenr.length > 6 ||
    PlateLetterValidation(platenr) === false ||
    PlateNumberValidation(platenr) === false
  ) {
    return resp
      .status(400)
      .json(
        "Wrong plate number format. Must be 3 UPPERCASE letters and 3 numbers 0-9. For ex.: ASD123"
      );
  }

  const exists = await db
    .collection("Car-Plates")
    .where("PlateNr", "==", req.body.platenr)
    .get()
    .catch((err) => {
      resp.status(500).json("Something went wrong.");
      console.log(err);
    });
  if (!exists.empty) {
    return resp
      .status(400)
      .json(`Car plate: ${req.body.platenr} already exists.`);
  }
  const newPlate = {
    Name: req.body.name,
    Surname: req.body.surname,
    PlateNr: req.body.platenr,
  };
  db.collection("Car-Plates")
    .add(newPlate)
    .then((doc) => {
      return resp.json({ message: `Plate: ${doc.id} created successfully` });
    })
    .catch((err) => {
      resp.status(500).json({ error: "Something went wrong" });
      console.log(err);
    });
});

// DELETE method to DELETE desired Car Plate by ID
app.delete("/deleteCarPlate", async (req, resp) => {
  await db
    .collection("Car-Plates")
    .doc(req.body.id)
    .delete()
    .then(() => {
      return resp.json({
        message: `Plate ${req.body.id} removed successfully`,
      });
    })
    .catch((err) => {
      resp.status(500).json({ error: "Something went wrong" });
      console.log(err);
    });
});

// POST method to UPDATE desired Car Plate's information by ID
app.post("/setCarPlate", async (req, resp) => {
  const plate = req.body.platenr;
  if (
    plate.length < 6 ||
    plate.length > 6 ||
    PlateLetterValidation(plate) === false ||
    PlateNumberValidation(plate) === false
  ) {
    return resp
      .status(400)
      .json(
        "Wrong plate number format. Must be 3 UPPERCASE letters and 3 numbers 0-9. For ex.: ASD123"
      );
  }

  await db
    .collection("Car-Plates")
    .doc(req.body.id)
    .set({
      Name: req.body.name,
      Surname: req.body.surname,
      PlateNr: req.body.platenr,
    })
    .then((success) =>
      resp.json({
        message: `Plate ${req.body.id} has been modified successfully`,
      })
    )
    .catch((err) => {
      resp.status(400).json(`Something went wrong.`);
      console.log(err);
    });
});

exports.api = functions.region("europe-west1").https.onRequest(app);
