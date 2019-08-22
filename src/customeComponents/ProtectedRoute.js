import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
      {...rest}
      render={props =>{
        // console.log("REST", rest)
        if(auth.isAuthenticated === true ){
          return (
            <Component {...props} {...rest} />
          )
        }
        else{
         return( 
          <Redirect to="/login" />
          )
        }
      }}
    />
  );


export default ProtectedRoute