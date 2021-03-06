import React from "react";
import { Route, withRouter } from "react-router-dom";
import Index from "./Home/index.js";
import House from "./House";
import Profile from "./Profile";
import Rent from "./Rent/index.js";
import RentAdd from "./Rent/Add/index.js";
import RentSeach from "./Rent/Search/index.js";
import { TabBar } from 'antd-mobile';
import "./Home.css";
import "../assets/fonts/iconfont.css";
import {tabbarList} from "./tabbar.json"

class Home extends React.PureComponent {
  state = {
    selectedTab: this.props.location.pathname,
    hidden: false
  }
  mapTabbarList = () => {
    return tabbarList.map(item => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.id}
          icon={<i className={`iconfont ${item.icon}`}></i>}
          selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.props.history.push(item.path)
            this.setState({
              selectedTab: item.path,
            });
          }}
        >
        </TabBar.Item>
      )
    })
  }
  render() {
    return (
      <div>
        {/* route */}
        <Route path="/Home" exact>
          <Index />
        </Route>
        <Route path="/Home/house">
          <House />
        </Route>
        <Route path="/Home/profile" component={Profile}>
        </Route>
        <Route path="/Home/rent" component={Rent} exact></Route>
        <Route path="/Home/rent/add" component={RentAdd}></Route>
        <Route path="/Home/rent/search" component={RentSeach}></Route>
        {/* navbar */}
        <div className="tabBar">
          <TabBar
            noRenderContent
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
            tabBarPosition="bottom"
          >
            {this.mapTabbarList()}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
