import React from "react";
import { Route, Switch } from "react-router-dom";

import Table from "./components/Table";
import NavBar from "./UI/navbar/NavBar";
import FinalTable from "./pages/finalTable/FinalTable";

function App() {
  return (
    <React.StrictMode>
      <NavBar />
      <Switch>
        <Route path="/create">
          <Table />
        </Route>
        <Route path="/table">
          <FinalTable />

        </Route>
      </Switch>
    </React.StrictMode>
  );
}

export default App;
