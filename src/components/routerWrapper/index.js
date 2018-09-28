import React, {Component} from "react";
import {Switch, Redirect, Route} from "react-router-dom";
class RouteWrapper extends Component {
    constructor() {
        super();
    }
    render() {
        const {routes,prop} = this.props;
        return (
            <Switch>
                {routes.map((item, index) => {
                    return (
                        <Route
                            key={index}
                            path={`${prop.match.path}/${item.path}`}
                            render={location => {
                            return <item.component {...location} routes={item.children}/>
                        }}/>
                    );
                })}
            </Switch>
        );
    }
}
export default RouteWrapper;
