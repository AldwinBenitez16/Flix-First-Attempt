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

    userRef = React.createRef();
    passRef = React.createRef();

    render() {
        const {getData} = this.props;
        const {errors} = getData.user;
        if(!getData.data.token) return <Loading />
        
        return (
            <div className="login-form">
                <button onClick={() => {
                    console.log(this.props.getData.user);
                }}>adasdada</button>
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
                            ref={this.userRef}
                            placeholder="User Name" />
                            <input 
                            id="password" 
                            name="password"
                            type="password"
                            ref={this.passRef}
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

    async change() {
        const {getUserInfo} = this.props;

        const username = this.userRef.current.name;
        const uservalue = this.userRef.current.value;

        const passname = this.passRef.current.name;
        const passvalue = this.passRef.current.value;

        await getUserInfo({
            [username]: uservalue,
            [passname]: passvalue
        });
        await this.getSessionId();

    }

    submit = () => {
        this.change();
    }

    validateToken = () => {
        const {getData} = this.props;
        const {user} = this.props.getData;

        const data = axios({
            url: 'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=a34097a10fd6daf67cb09e71f3d7a0ea',
            method: 'post',
            data: {
                username: user.username,
                password: user.password,
                request_token: getData.data.token.request_token,
            }
        })
        .catch(err => console.log('Could not retrieve id', err));
        return data;
    }

    async getSessionId() {
        const {getData, getUserInfo} = this.props;
        const data = await this.validateToken();
        if(data && data.status === 200) {
            await axios({
                url: `https://api.themoviedb.org/3/authentication/session/new?api_key=a34097a10fd6daf67cb09e71f3d7a0ea`,
                method: 'post',
                data: {
                    request_token: getData.data.token.request_token
                },
            })
            .then(res => {
                getUserInfo({
                    isAuthenticated: true,
                    session_id: res.data.session_id
                });
                console.log('Succesfully retrieved session Id');
            })
            .catch(err => console.log('Could not retrieve id', err));
        }

    }
    
    cancel = () => {
        window.location.pathname = '/home';
    }
}

export default Login;