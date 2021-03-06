import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Login from "./Login";
import Profile from "./Profile";

function Routes({ setToken }) {
    return (
        <div className="Routes">
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/companies"><Companies /></Route>
                <Route exact path="/companies/:handle"><Company /></Route>
                <Route exact path="/jobs"><Jobs /></Route>
                <Route exact path="/login"><Login setToken={setToken} /></Route>
                <Route exact path="/profile"><Profile /></Route>

                {/* <Redirect to="/" /> */}
            </Switch>
        </div>
    );
}

export default Routes;