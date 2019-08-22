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
            loading:true,
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
               if(one.category === "building"){
                   result.push(one)
               }
        })
        return result
    }

    filterElectronics = (data) => {
        let result = []
        data.map( one => {
            if(one.category === "electronics"){
                result.push(one)
            }
         })
        return result
    }

    filterStationaries = (data) => {
        let result = []
        data.map( one => {
            if(one.category === "stationaries"){
                result.push(one)
            }
         })
        return result
    }

    filterFurniture = (data) => {
        let result = []
        data.map( one => {
            if(one.category === "furnitures"){
                result.push(one)
            }
         })
        return result
    }
    
    componentWillMount(){
        console.log("COMPONENT WILL MOUNT", this.props.rest)
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
                    description
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
                }
            }
            `
        })
        .then( result => {
            console.log("RESULT DASHBOARD", result.data.products)
            this.setState({
                products: result.data.products,
                users: result.data.users,
                loading: false

            })
        })
        .catch( error => {
            console.log("ERROR DASHBOARD", error)
        })

        // console.log(filterBuilding)
    }

    render(){

        return (
            <div>
            { 
            !this.state.loading 
                ?
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
                                                <h2><CountTo speed={3000} from={0} to={this.filterBuilding(this.state.products).length}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Building Material</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-success">
                                            <div className="wid-content">
                                                <i className='i-heart icon-lg'></i>
                                                <h2>
                                                    <CountTo speed={4000} from={0} to={this.filterStationaries(this.state.products).length}/>
                                                </h2>
                                                <div className="clearfix"></div>
                                                <span>Stationaries</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-danger">
                                            <div className="wid-content">
                                                <i className='i-user icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={this.filterFurniture(this.state.products).length}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Furnitures</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-purple">
                                            <div className="wid-content">
                                                <i className='i-share icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={this.filterElectronics(this.state.products).length}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Electronics</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-info">
                                            <div className="wid-content">
                                                <i className='i-user icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={this.state.users.length}/></h2>
                                                {/* <h2><span></span></h2> */}
                                                <div className="clearfix"></div>
                                                <span>Users</span>
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
                                                <h2><CountTo speed={3000} from={0} to={this.state.products.length}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Products</span>
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
                :
                <div className="content">
                    <h1>
                        Loading...
                    </h1>
                </div>
            }
            </div>
        );
    }
}

export default Dashboard;
