import React from 'react';
import {
    Row, Col,
} from 'reactstrap';
import CountTo from 'react-count-to';
import gql from 'graphql-tag';
import {client} from ".."

class Dashboard extends React.Component{
   
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            products:[],
            users:[],
            furniture:[],
            stationaries:[],
            building:[],
            electronics:[]
        };
    }

    filterBuilding = (data) => {
        let result = []
        
        data.map( one => {
                
        })
        
        return result
    }

    filterElectronics = (data) => {

    }

    filterStationaries = (data) => {

    }

    filterFurniture = (data) => {

    }

    componentDidMount(){
        client.query({
            query: gql `
            {
                products {
                    name,
                    id
                },

                users{
                    id,
                    surname
                }
            }
            `
        })
        .then( result => {
            console.log("RESULT DASHBOARD", result)
            // this.setState({
            //     loading: false
            // })
        })
        .catch( error => {
            console.log("ERROR DASHBOARD", error)
        })
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
                                        <div className="tile-counter bg-info">
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
                                        {/* <div className="tile-counter bg-danger">
                                            <div className="wid-content">
                                                <i className='i-note icon-lg'></i>
                                                <h2><CountTo speed={3000} from={100} to={1624}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Building Materials</span>
                                            </div>
                                        </div> */}

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        {/* <div className="tile-counter bg-info">
                                            <div className="wid-content">
                                                <i className='i-note icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={224}/></h2>
                                                <div className="clearfix"></div>
                                                <span>People disliked it</span>
                                            </div>
                                        </div> */}

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-success">
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
