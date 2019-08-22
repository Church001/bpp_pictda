import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

// import { Header, Footer, Sidebar, ChatSidebar, Stylebar } from 'components'
import dashboardRoutes from 'routes/general.jsx';
import { topbarStyle, menuStyle, menuType, topbarType, navWidth, chatWidth, chatType } from 'variables/settings/general.jsx';
import Dashboard from './Dashboard';
import Products from './Products';
import Users from './Users';
import Header from './Header';
import Sidebar from './Sidebar';
import customRoute from './routes';
import ProtectedRoute from './ProtectedRoute';
import gql from 'graphql-tag';
import {client} from ".."

//var ps;

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

    componentDidMount(){
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
            console.log("GENERALLAYOUT RESULT", result.data)
            this.setState({
                // loading: false
                allData: result.data
            })
        })
        .catch( error => {
            console.log("ERROR DASHBOARD", error)
        })
    }

    componentWillUnmount(){}
    componentDidUpdate(e) {
      if(e.history.action === "PUSH"){
        this.refs.mainPanel.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
      }
    }

    render(){
      let  auth = {
          isAuthenticated: true
      }
        return (
            <div className="wrapper" ref="themeWrapper" data-menu={this.state.menuColor} data-topbar={this.state.topbarColor} data-menutype={this.state.menuType} data-topbartype={this.state.topbarType}>

                <Header 
                    {...this.props} 
                    navtype={navWidth} 
                    admintype={'general'}
                />
                <Sidebar 
                    {...this.props} 
                    routes={customRoute} 
                    // routes={dashboardRoutes} 
                    admintype={'general'}
                />
                <div className="main-panel" ref="mainPanel">
                    <Switch>
                        {/* {
                            dashboardRoutes.map((prop,key) => {
                                console.log("PROPS", prop)
                                if(prop.collapse){
                                    return prop.views.map((prop2,key2) => {
                                        return (
                                            <Route path={prop2.path} component={prop2.component} key={key2}/>
                                        );
                                    })
                                }
                                if(prop.redirect)
                                    return (
                                        <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                                    );
                                return (
                                    <Route path={prop.path} component={prop.component} key={key}/>
                                );
                            })
                        } */}
                        <ProtectedRoute
                            rest={this.state.allData}
                            auth={auth}
                            path="/"
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
                    {/* <Footer fluid/> */}
                </div>
                {/* <ChatSidebar {...this.props} routes={dashboardRoutes} chatwidth={chatWidth}  chattype={chatType}/>
                <Stylebar menuSettings={this.menuSettings} topbarSettings={this.topbarSettings} /> */}
            </div>
        );
    }
}

export default GeneralLayout;
