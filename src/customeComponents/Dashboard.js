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
import CountTo from 'react-count-to';

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
                        <div className="col-12"
                            style={{marginTop:"20px"}}
                            >
                            <section className="box ">
                            <header className="panel_header">
                                <h2 className="title float-left">Analytics</h2>
                                
                            </header>
                            <div className="content-body">    <div className="row">

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-info">
                                            <div className="wid-content">
                                                <i className='i-user icon-lg'></i>
                                                <h2><CountTo speed={3000} from={1001} to={3504}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Users</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-success">
                                            <div className="wid-content">
                                                <i className='i-heart icon-lg'></i>
                                                <h2>
                                                    <CountTo speed={4000} from={1001} to={4504}/>
                                                </h2>
                                                <div className="clearfix"></div>
                                                <span>Products</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-danger">
                                            <div className="wid-content">
                                                <i className='i-user icon-lg'></i>
                                                <h2><CountTo speed={3000} from={1001} to={3304}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Furnitures</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-purple">
                                            <div className="wid-content">
                                                <i className='i-share icon-lg'></i>
                                                <h2><CountTo speed={3000} from={1001} to={7504}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Electronics</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-secondary">
                                            <div className="wid-content">
                                                <i className='i-rocket icon-lg'></i>
                                                <h2><CountTo speed={3000} from={11} to={87}/></h2>
                                                <h2><span>MB</span></h2>
                                                <div className="clearfix"></div>
                                                <span>Stationaries</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-secondary">
                                            <div className="wid-content">
                                                <i className='i-note icon-lg'></i>
                                                <h2><CountTo speed={3000} from={100} to={1624}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Building Materials</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-secondary">
                                            <div className="wid-content">
                                                <i className='i-note icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={224}/></h2>
                                                <div className="clearfix"></div>
                                                <span>People disliked it</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-secondary">
                                            <div className="wid-content">
                                                <i className='i-note icon-lg'></i>
                                                <h2><CountTo speed={3000} from={1001} to={9824}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Pages Bookmarked!</span>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                            </section>
                        </div>


                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Dashboard;
