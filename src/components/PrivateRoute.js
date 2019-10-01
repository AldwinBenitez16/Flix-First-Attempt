import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loading from '../components/Loading';

export default ({ component: Component, getData, ...rest}) => {

    if(getData.user.session_id === "") return <Loading /> 

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
