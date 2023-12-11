import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocs = () => (
    <SwaggerUI url="/swagger.json" />
);

const App = () => (
    <Router>
        <Switch>
            <Route path="/docs" component={SwaggerDocs} />
            <Redirect to="/docs" />
        </Switch>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));