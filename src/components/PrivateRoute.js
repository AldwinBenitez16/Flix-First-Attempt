import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, getData, ...rest}) => {

    return (
        <Route
            {...rest}
            render={ props => getData.user.isAuthenticated ? (
                <Component {...props} /> // Loads the component passed to it
            ) : (
                <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
                }} />// Redirects to signin page
            )}
        />
    );
};
