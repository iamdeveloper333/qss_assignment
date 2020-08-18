import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import EditLocation from './EditLocation';
import AddLocation from './AddLocation';
import "react-table/react-table.css";
import 'semantic-ui-css/semantic.min.css'; 
import '../styles/App.css';


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter >
        <div>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/add"} component={AddLocation} /> 
            <Route exact path={"/edit/:id"} component={EditLocation} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
 
export default App;