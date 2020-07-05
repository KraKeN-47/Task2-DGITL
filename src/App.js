import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import axios from "axios";

//Pages
import editPages from "./Pages/editPlate";
import main from "./Pages/main";
import createPlate from "./Pages/createPlate";

// const api = axios.create({
//   baseURL: "https://europe-west1-car-plate-numbers.cloudfunctions.net/api",
// });
function App() {
  // const api = axios.create({
  //   baseURL: "http://localhost:5000/car-plate-numbers/europe-west1/api",
  // });
  // // api
  // //   .delete("/test", {
  // //     id: "oVcCcEYUiqsBBkBaGJYm",
  // //   })
  // //   .then((resp) => console.log(resp));
  // axios.delete("http://localhost:5000/car-plate-numbers/europe-west1/test", {
  //   id: "oVcCcEYUiqsBBkBaGJYm",
  // });
  // api
  //   .post("/createCarPlate", {
  //     name: "Rere",
  //     surname: "Rere",
  //     platenr: "REV666",
  //   })
  //   .then((resp) => console.log(resp));
  // api
  //   .post("/setCarPlate", {
  //     name: "Front-end",
  //     surname: "to REST",
  //     platenr: "HRZ791",
  //   })
  //   .then((resp) => console.log(resp))
  //   .catch((err) => console.log(err));
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={main}></Route>
          <Route exact path="/createPlate" component={createPlate}></Route>
          <Route exact path="/editPlate" component={editPages}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
