import React from "react";
import { withRouter } from "react-router-dom";
import "./index.css";

class Map extends React.PureComponent {
    renderMap = () => {
        const { BMapGL } = window;
        var map = new BMapGL.Map("container");
        var point = new BMapGL.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
    }
    componentDidMount() {
        this.renderMap();
    }
    render() {
        return (
            <div className="map">
                <div id="container"></div>
            </div>
        )
    }
}

export default withRouter(Map);