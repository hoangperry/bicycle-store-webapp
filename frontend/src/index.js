import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import Body from 'layouts/body';


import './assets/scss/style.css';

ReactDOM.render(

    <HashRouter>
        <Switch>
            <Body />
        </Switch>
    </HashRouter>
    , document.getElementById('root')); 
