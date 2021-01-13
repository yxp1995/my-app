import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home.js";
import CityList from "./pages/CityList.js";
import Map from "./pages/map/index.js";

class RouterComponent extends React.PureComponent {
    render() {
        return (
            <Router>
                <div className="App"> 
                  <nav>
                    <ul>
                      <li>
                        {/* <Link to="/Home">首页</Link> */}
                      </li>
                      <li>
                        {/* <Link to="/CityList">城市列表</Link> */}
                      </li>
                    </ul>
                  </nav>
          
                  {/* A <Switch> looks through its children <Route>s and
                      renders the first one that matches the current URL. */}
                  <Switch>
                    {/* <Route exact path="/">
                        <Redirect to="/Home" />
                    </Route> */}
                    <Route path="/Home">
                      <Home />
                    </Route>
                    <Route path="/map">
                      <Map />
                    </Route>
                    <Route path="/CityList">
                      <CityList />
                    </Route>
                    <Route path="/" render = {() => <Redirect to="/Home"/>}>
                    </Route>
                  </Switch>
                </div>
            </Router>
        )
    }
}

export default RouterComponent