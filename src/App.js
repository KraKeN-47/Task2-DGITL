import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import axios from "axios";

//Pages
import editPages from "./Pages/editPlate";
import main from "./Pages/main";
import createPlate from "./Pages/createPlate";

function App() {
  return (
    <div className="App">
      <Router>
        <AnimatePresence>
          <Switch>
            <Route exact path="/" component={main}></Route>
            <Route exact path="/createPlate" component={createPlate}></Route>
            <Route exact path="/editPlate" component={editPages}></Route>
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
