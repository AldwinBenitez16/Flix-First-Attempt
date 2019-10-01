import React, {Component} from 'react';

// Links
import { Link } from 'react-router-dom';

// axios
import axios from 'axios';

// Components
import Form from './Form';

import Loading from '../components/Loading';

// CSS
import '../css/login.css';

class Login extends Component {

    UNSAFE_componentWillMount() {
        const {fetchProducts} = this.props;

        fetchProducts(
            'https://api.themoviedb.org/3/authentication/token/new?api_key=a34097a10fd6daf67cb09e71f3d7a0ea',
            'token'
        );
    }

    state = {
        username: '',
        password: '',
        errors: []
    };

    render() {
        const {getData, fetchProducts} = this.props;
        const {username, password, errors} = this.state;

        if(!getData.data.token) return <Loading />

        return (
            <div className="login-form">
                <div className='login-overlay'>
                    <h1>Sign In</h1>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                        <React.Fragment>
                            <input 
                            id="username" 
                            name="username" 
                            type="text"
                            value={username} 
                            onChange={this.change} 
                            placeholder="User Name" />
                            <input 
                            id="password" 
                            name="password"
                            type="password"
                            value={password} 
                            onChange={this.change} 
                            placeholder="Password" />                
                        </React.Fragment>
                    )} />
                </div>
                {/* <p>
                    Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                </p> */}
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    submit = () => {
        
    }
    
    cancel = () => {
        
    }
}

export default Login;