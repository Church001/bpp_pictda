import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
/*import 'font-awesome/css/font-awesome.min.css';*/
import 'assets/scss/zest-admin.css';
import 'assets/fonts/simple-line-icons.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Login from './customeComponents/Login';
// import Dashboard from './customeComponents/Dashboard';
import GeneralLayout from './customeComponents/GeneralLayout';
import Error from './customeComponents/Error';
// import ProtectedRoute from './customeComponents/ProtectedRoute';
import jwt_decode from "jwt-decode"

const hist = createBrowserHistory();

let user = ""
if(localStorage.__){
    user = jwt_decode(localStorage.__)
    // console.log("USER DECODED", user)
    const currentTime = Date.now() / 1000000;
    if (user.exp < currentTime) {
      window.location.href = '/login';
    }
    if(user.role !== "admin"){
        window.location.href = '/login';
    }
}
// else{
//     window.location.href = '/login';
// }

export const client = new ApolloClient({
    uri: "https://bpp-mobile.herokuapp.com/graphql"
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router history={hist} basename={process.env.REACT_APP_BASEDIR}>
            <Switch>
                <Route 
                    path='/login'
                    component={Login}
                />
                <Route 
                    path="/error"
                    exact
                    component={Error}
                />
                <Route 
                    path='/'
                    component={GeneralLayout}
                    
                />
            </Switch>
        </Router>
    </ApolloProvider>
, document.getElementById('root'));
