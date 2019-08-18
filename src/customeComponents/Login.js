import React from 'react';
import {
    Row, Col,
} from 'reactstrap';

import {
    
} from 'components';
import logo from "../assets/img/logo1.png"

class Login extends React.Component{ 

    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
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
                                        // backgroundColor:"#0f110f"
                                        backgroundColor:"#ffffff"
                                    }}
                                    >
                                    <div id="login" className="login loginpage offset-xl-4 offset-lg-3 offset-md-3 offset-0 col-12 col-md-6 col-xl-4">
                                        {/* <h1><a href="#!" title="Login Page" tabIndex="-1">&nbsp;</a></h1> */}
                                        {/* <h2>BPP| Admin</h2> */}
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
                                                        name="un" 
                                                        id="user_name" 
                                                        className="form-control"
                                                        placeholder="username"
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
                                                        name="pwd" 
                                                        id="user_pass" 
                                                        className="input" 
                                                        size="20" 
                                                        placeholder="password"
                                                        style={{
                                                            backgroundColor:"#efe7e7",
                                                            borderRadius:"10px"
                                                        }}
                                                    />
                                                </label>
                                            </p>
                                        </form>
                                            <p className="submit">
                                                <button 
                                                    type="button" 
                                                    name="wp-submit" 
                                                    id="wp-submit" 
                                                    className="btn btn-accent btn-block" 
                                                    value="Sign In" 
                                                    style={{backgroundColor:"green"}}
                                                >
                                                 Submit
                                                </button>
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
