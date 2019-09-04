import React from 'react';
import {
    Row, Col,
} from 'reactstrap';
import CountTo from 'react-count-to';
import gql from 'graphql-tag';
import {client} from ".."
import _ from "lodash"
import productIcon from "../assets/img/productIcon.png"

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
        if(!_.isEmpty(this.props.rest.products)||!_.isEmpty(this.props.rest.users)){
            this.setState({
                products: this.props.rest.products,
                users:this.props.rest.users,
                loading: false
            })
        }
        else {

        }
    }

    componentDidMount(){
        if(_.isEmpty(this.state.products) || _.isEmpty(this.state.users)){
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
                this.setState({
                    products: result.data.products,
                    users: result.data.users,
                    loading: false

                })
            })
            .catch( error => {
                // console.log("ERROR DASHBOARD", error)
            })
        }
        else {
            this.setState({
                products: this.props.rest.products,
                users:this.props.rest.users,
                loading: false
            })
        }
    }

    render(){
        // console.log("STATE", this.state.products)
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
                                                <i className='i-wrench icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={this.filterBuilding(this.state.products).length}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Building Material</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-success">
                                            <div className="wid-content">
                                                <i className='i-pencil icon-lg'></i>
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
                                                <i className='i-drawer icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={this.filterFurniture(this.state.products).length}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Furnitures</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-purple">
                                            <div className="wid-content">
                                                <i className='i-screen-desktop icon-lg'></i>
                                                <h2><CountTo speed={3000} from={0} to={this.filterElectronics(this.state.products).length}/></h2>
                                                <div className="clearfix"></div>
                                                <span>Electronics</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="tile-counter bg-info">
                                            <div className="wid-content">
                                                <i className='i-people icon-lg'></i>
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
                                                <i className='i-social-dropbox icon-lg'></i>
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
                <div>
                <div className="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="content-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="page_error_code text-primary"/>                     
                                            <h1 className="page_error_info">loading...</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            </div>
        );
    }
}

export default Dashboard;
