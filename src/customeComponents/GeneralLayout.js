import React from 'react';
import {
    Switch,
    Redirect
} from 'react-router-dom';
import _ from "lodash"
import { topbarStyle, menuStyle, menuType, topbarType, navWidth} from 'variables/settings/general.jsx';
import Dashboard from './Dashboard';
import Products from './Products';
import Users from './Users';
import Header from './Header';
import Sidebar from './Sidebar';
import customRoute from './routes';
import ProtectedRoute from './ProtectedRoute';
import gql from 'graphql-tag';
import {client} from ".."
import jwt_decode from "jwt-decode"

let User = {}

if(localStorage.__){
    User = jwt_decode(localStorage.__)
}

class GeneralLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            menuColor: menuStyle,
            topbarColor: topbarStyle,
            menuType: menuType,
            topbarType: topbarType,
            allProducts: [],
            allUsers: [],
            allData:{}
        };
        this.menuSettings = this.menuSettings.bind(this);
        this.topbarSettings = this.topbarSettings.bind(this);
    }

    menuSettings(val1,val2) {
        this.setState({
          menuColor: val1,
          menuType: val2,
        });
    }
    topbarSettings(val1,val2) {
        this.setState({
          topbarColor: val1,
          topbarType: val2,
        });
    }

    componentWillMount(){
            if(this.props.location.pathname === "/" && this.props.match.isExact === true){
                this.props.history.push("/dashboard")
            }    
    }
    componentDidMount(){
        if(!_.isEmpty(User)){
            client.query({
                query: gql `
                {
                    products {
                        name,
                        id,
                        manufacturer,
                        price_per_unit,
                        category,
                        company_name,
                        description,
                        user {
                            id,
                            surname,
                            othernames,
                            phonenumber,
                            company_address,
                            company_name,
                            email,
                            description,
                            role,
                        }
                    },

                    users{
                        id,
                        surname,
                        othernames,
                        phonenumber,
                        company_address,
                        company_name,
                        email,
                        description,
                        role,
                        products{
                            name,
                            id,
                            manufacturer,
                            price_per_unit,
                            category,
                            company_name,
                            description
                        }
                    }
                }
                `
            })
            .then( result => {
                this.setState({
                    allData: result.data
                })
            })
            .catch( error => {
                // console.log("ERROR DASHBOARD", error)
            })
        }
    }

    componentWillUnmount(){
    }
    componentDidUpdate(e) {
      if(e.history.action === "PUSH"){
        this.refs.mainPanel.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
      }
    }

    passer = data => {
        console.log("PASSE DATA", data)
    }

    render(){
      let  auth = {
          isAuthenticated: !_.isEmpty(User)
        }
        return (
            <div 
                className="wrapper" 
                ref="themeWrapper" 
                data-menu={this.state.menuColor} 
                data-topbar={this.state.topbarColor} 
                data-menutype={this.state.menuType} 
                data-topbartype={this.state.topbarType}
            >
                <Header 
                    {...this.props} 
                    navtype={navWidth} 
                    admintype={'general'}
                />
                <Sidebar 
                    {...this.props} 
                    routes={customRoute} 
                    admintype={'general'}
                />
                <div className="main-panel" ref="mainPanel">
                    <Switch>
                        <ProtectedRoute
                            rest={this.state.allData}
                            funct={this.passer}
                            auth={auth}
                            path="/dashboard"
                            exact
                            component={Dashboard}
                        />
                        <ProtectedRoute
                            rest={this.state.allData}
                            auth={auth}
                            path="/products"
                            exact
                            component={Products}
                        />
                        <ProtectedRoute
                            rest={this.state.allData}
                            auth={auth} 
                            path="/users"
                            exact
                            component={Users}
                        />
                        <Redirect 
                            from="**"
                            to="/error"
                        />
                    </Switch> 
                </div>
                {/* <Footer/> */}
            </div>
        );
    }
}

export default GeneralLayout;
