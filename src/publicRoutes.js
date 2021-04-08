import React from "react";
import { Router, Switch, Route, withRouter, Redirect } from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import layout from "./layout";
import { BlankLayout, LoaderLayout } from "./layout";
import LogoSpinner from "./components/common/LogoSpinner";
import Error from "./containers/Error";
import Config from "./config.json";

export default [
    {
        path: "/",
        exact: true,
        layout: BlankLayout,
        component: LogoSpinner,
        strict: true,
    },
    {
        path: "/home",
        layout: layout,
        exact: true,
        component: withRouter(Home),
        strict: true,
    },
    {
        path: "/login",
        layout: BlankLayout,
        exact: true,
        component: withRouter(Login),
        strict: true,
    },
    {
        path: "/register",
        layout: BlankLayout,
        exact: true,
        component: withRouter(Register),
        strict: true,
    },
    {
        path: "/404",
        layout: BlankLayout,
        exact: true,
        component: withRouter(Error),
        strict: true,
    },
    {
        path: "/:booth_url",
        exact: true,
        layout: BlankLayout,
        component: LogoSpinner,
        strict: true,
    },
    {
        // path: "a*",
        layout: BlankLayout,
        exact: true,
        component: withRouter(Error),
        strict: true,
    },
];
