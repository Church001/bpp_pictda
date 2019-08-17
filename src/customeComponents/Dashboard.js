// import React, { Component } from 'react'

// class Dashboard extends Component {
//     render() {
//         return (
//             <div>
//                 <p>Dashboard</p>
//             </div>
//         )
//     }
// }

// export default Dashboard

import React from 'react';
import {
    Table,
    Row, Col,
} from 'reactstrap';

import {
    
} from 'components';

import { Line, Bar } from 'react-chartjs-2';

import {
    dashboardAllProductsChart,
    dashboardAllProductsChart1,
    dashboardAllProductsChart2,
    dashboardAllProductsChart6,
    dashboardAllProductsChart3,
} from 'variables/general/dashboard-charts-9.jsx';

//import styles from 'jvectormap/jquery-jvectormap.css'
import { VectorMap } from 'react-jvectormap';

import {
    playlistCharts7,
    playlistCharts8,
    playlistCharts9,
    playlistCharts10,
} from 'variables/general/dashboard-charts-9.jsx';

var IMGDIR = process.env.REACT_APP_IMGDIR;

class Dashboard extends React.Component{
   
        constructor(props) {
          super(props);
          this.state = {
            data1: [
                        {
                            latLng: [41.90, 12.45],
                            name: 'Vatican City'
                        }, {
                            latLng: [43.73, 7.41],
                            name: 'Monaco'
                        }, {
                            latLng: [-0.52, 166.93],
                            name: 'Nauru'
                        }, {
                            latLng: [-8.51, 179.21],
                            name: 'Tuvalu'
                        }, {
                            latLng: [43.93, 12.46],
                            name: 'San Marino'
                        }, {
                            latLng: [47.14, 9.52],
                            name: 'Liechtenstein'
                        }, {
                            latLng: [7.11, 171.06],
                            name: 'Marshall Islands'
                        }, {
                            latLng: [17.3, -62.73],
                            name: 'Saint Kitts and Nevis'
                        }, {
                            latLng: [3.2, 73.22],
                            name: 'Maldives'
                        }, {
                            latLng: [17.11, -61.85],
                            name: 'Antigua and Barbuda'
                        }, {
                            latLng: [-4.61, 55.45],
                            name: 'Seychelles'
                        }, {
                            latLng: [7.35, 134.46],
                            name: 'Palau'
                        }, {
                            latLng: [42.5, 1.51],
                            name: 'Andorra'
                        }
              ]
            };
          }

    
    render(){

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="page-title">
                                <div className="float-left">
                                    <h1 className="title">Admin Dashboard</h1>
                                </div>
                            </div>
                            <div className="row margin-0">
                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox">
                                    <div className="widdata">
                                        <i className='widicon i-user icon-lg icon-primary'></i>
                                        <h3 className="widtitle">Users</h3>
                                        <h3 className="widtag">32</h3>
                                    </div> 
                                    </div>
                                </div>

                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox bg-primary colored">
                                    <div className="widdata">
                                        <i className='widicon i-basket icon-lg icon-white'></i>
                                        <h3 className="widtitle">Products</h3>
                                        <h3 className="widtag">12</h3>
                                    </div> 
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox">
                                    <div className="widdata">
                                        <i className='widicon i-badge icon-lg icon-primary'></i>
                                        <h3 className="widtitle">Awards</h3>
                                        <h3 className="widtag">34</h3>
                                    </div> 
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox bg-primary colored">
                                    <div className="widdata">
                                        <i className='widicon i-wallet icon-lg icon-white'></i>
                                        <h3 className="widtitle">Earnings</h3>
                                        <h3 className="widtag">21</h3>
                                    </div> 
                                    </div>
                                </div>

                                <div className="col-xl-2 d-xl-block d-lg-none d-md-none d-sm-block col-sm-4 col-6">
                                    <div className="db_box iconbox">
                                    <div className="widdata">
                                        <i className='widicon i-pencil icon-lg icon-primary'></i>
                                        <h3 className="widtitle">Posts</h3>
                                        <h3 className="widtag">30</h3>
                                    </div> 
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="row margin-0">
                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox">
                                    <div className="widdata">
                                        <i className='widicon i-user icon-lg icon-primary'></i>
                                        <h3 className="widtitle">Users</h3>
                                        <h3 className="widtag">32</h3>
                                    </div> 
                                    </div>
                                </div>

                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox bg-primary colored">
                                    <div className="widdata">
                                        <i className='widicon i-basket icon-lg icon-white'></i>
                                        <h3 className="widtitle">Products</h3>
                                        <h3 className="widtag">12</h3>
                                    </div> 
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox">
                                    <div className="widdata">
                                        <i className='widicon i-badge icon-lg icon-primary'></i>
                                        <h3 className="widtitle">Awards</h3>
                                        <h3 className="widtag">34</h3>
                                    </div> 
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                    <div className="db_box iconbox bg-primary colored">
                                    <div className="widdata">
                                        <i className='widicon i-wallet icon-lg icon-white'></i>
                                        <h3 className="widtitle">Earnings</h3>
                                        <h3 className="widtag">21</h3>
                                    </div> 
                                    </div>
                                </div>

                                <div className="col-xl-2 d-xl-block d-lg-none d-md-none d-sm-block col-sm-4 col-6">
                                    <div className="db_box iconbox">
                                    <div className="widdata">
                                        <i className='widicon i-pencil icon-lg icon-primary'></i>
                                        <h3 className="widtitle">Posts</h3>
                                        <h3 className="widtag">30</h3>
                                    </div> 
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

export default Dashboard;
