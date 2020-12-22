import React from "react";
import {withRouter} from "react-router-dom";

class CityList extends React.PureComponent {
    render() {
        console.log(this.props)
        return (
            <div>CityList</div>
        )
    }
}

export default withRouter(CityList)