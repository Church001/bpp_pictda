import React from 'react';
import {
    Row, Col,
} from 'reactstrap';
import gql from 'graphql-tag';
import {
    
} from 'components';
import logo from "../assets/img/logo1.png"
import {client} from ".." 
import { withRouter } from 'react-router';
import _ from "lodash"

class Login extends React.Component{ 

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            loading: false
        }
    }
    componentDidMount(){

    }

    onchange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (username, password) => {
        this.setState({
            loading: true
        })

        client.mutate(({
            variables: {
                username: username,
                password: password
            },
           mutation: gql `
                mutation SignIn($username: String!, $password: String!){
                    signIn(username:$username, password:$password){
                        token
                    }
                }
           ` 
        }))
        .then( response => {
            localStorage.setItem("__", response.data.signIn.token)
            setTimeout(() => this.props.history.push("/"), 3000)
        })
        
        .catch( error => {
            console.log(`ERROR ${error}`)
        })
    }   

    render(){
        return (
            <div>
                <div className=""
                    style={{backgroundColor:"#ffffff"}}
                >
                    <Row>
                        <Col xs={12} md={12}>

                            <div 
                                className="container-fluid"
                                
                                >
                                <div className="login-wrapper row"
                                    style={{
                                        backgroundColor:"#ffffff"
                                    }}
                                    >
                                    <div id="login" className="login loginpage offset-xl-4 offset-lg-3 offset-md-3 offset-0 col-12 col-md-6 col-xl-4">
                                        <img 
                                            src={logo} 
                                            style={{
                                                    marginTop:"40px",
                                                    width:"180px", 
                                                    height:"180px",
                                                    marginLeft:"25%"
                                                }}
                                            />
                                        <form name="loginform" id="loginform">
                                            <p>
                                                <label htmlFor="user_login">
                                                    <input 
                                                        type="text" 
                                                        name="email" 
                                                        id="user_name" 
                                                        className="form-control"
                                                        placeholder="username"
                                                        onChange={e => this.onchange(e)}
                                                        required
                                                        style={{
                                                            backgroundColor:"#efe7e7",
                                                            borderRadius:"10px"
                                                        }}
                                                    />
                                                </label>
                                            </p>
                                            <p>
                                                <label htmlFor="user_pass">
                                                    <input 
                                                        type="password" 
                                                        name="password" 
                                                        id="user_pass" 
                                                        className="input"
                                                        onChange={e => this.onchange(e)} 
                                                        size="20" 
                                                        placeholder="password"
                                                        disabled={_.isEmpty(this.state.email)}
                                                        required
                                                        style={{
                                                            backgroundColor:"#efe7e7",
                                                            borderRadius:true?"10px": "20px"
                                                        }}
                                                    />
                                                </label>
                                            </p>
                                        </form>
                                            <p className="submit">
                                            { 
                                                this.state.loading
                                                ?
                                               <button 
                                                    type="button" 
                                                    name="wp-submit" 
                                                    id="wp-submit" 
                                                    className="btn btn-accent btn-block" 
                                                    value="Sign In" 
                                                    style={{backgroundColor:"red"}}
                                                    disabled
                                                    // onClick={() => this.submit(this.state.email, this.state.password)}
                                                >
                                                 Loading...
                                                </button>
                                                :
                                                <button 
                                                    type="button" 
                                                    name="wp-submit" 
                                                    id="wp-submit" 
                                                    className="btn btn-accent btn-block" 
                                                    value="Sign In" 
                                                    style={{backgroundColor:"green"}}
                                                    disabled={_.isEmpty(this.state.password)}
                                                    onClick={() => this.submit(this.state.email, this.state.password)}
                                                >
                                                 Submit
                                                </button>
                                            }
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Login;
// export default (withRouter(Login));
