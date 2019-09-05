import React from 'react'; // Import React
import {
    Row, Col,Button, Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    InputGroup, 
    InputGroupAddon, 
    Input
} from 'reactstrap';
import gql from 'graphql-tag';
import {client} from ".."
import Table from 'react-bootstrap/Table'
import user from "../assets/img/user.png"
import  _ from "lodash"


class Users extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            showModal : false,
            closeAll: false,
            users: [],
            clickedUser: {},
            currentData: "All",
            productModal: false,
            products:[],
            loading: true,
            error: {}
        }
    }
    
    componentDidMount(){
        client.query({
            query: gql `
            {
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
                loading: false,
                users: result.data.users
            })
        })
        .catch( error => {
            this.setState({
                error: error
            })
        })
    }


    clickProduct = data => {
        this.setState({
            clickedUser: data,
            products:data.products
        })
    }

    toggleModal = () => {
        this.setState({
            clickedUser: {}
        })
    }

    toggleProducts = () =>{
        this.setState({
            productModal: !this.state.productModal
        })
    }

    render(){
        return (
            <div>
                <Modal isOpen={!_.isEmpty(this.state.clickedUser)} toggle={this.toggle2} className={this.props.className}>
                    <ModalHeader toggle={this.toggle2}>Supplier Detail</ModalHeader>
                    <ModalBody>
                            <div className="team-info">
                                <div className="team-img">
                                    <img 
                                        className="img-fluid" 
                                        src={user} 
                                        alt="" 
                                        style={{
                                            width: "248px",
                                            height: "250px",
                                            marginLeft: "18%"
                                        }}
                                    />
                                </div>
                                <h4>Supplier Name:{"    "}
                                    <span>
                                        {!_.isEmpty(this.state.clickedUser.surname)?this.state.clickedUser.surname:""}{" "}{!_.isEmpty(this.state.clickedUser.othernames)?this.state.clickedUser.othernames:""}
                                    </span>
                                </h4>
                                <h4>Company:{"    "}
                                    <span>
                                        {!_.isEmpty(this.state.clickedUser.company_name)?this.state.clickedUser.company_name:""}
                                    </span>
                                </h4>
                                <h4>Phone Number:{"    "}
                                    <span>
                                    {!_.isEmpty(this.state.clickedUser.phonenumber)?this.state.clickedUser.phonenumber:""}
                                    </span>
                                </h4>
                                <h4>Address:{"    "}
                                    <span>
                                        {!_.isEmpty(this.state.clickedUser.company_address)?this.state.clickedUser.company_address:""}
                                    </span>
                                </h4>
                                <h5>
                                    Email:{"    "}
                                    <span>
                                        {!_.isEmpty(this.state.clickedUser.email)?this.state.clickedUser.email:""}
                                    </span>
                                </h5>
                            </div>
                                                 
                            <Modal 
                                isOpen={this.state.productModal} 
                                toggle={this.toggleNested} 
                                onClosed={this.state.closeAll ? this.toggle2 : undefined}
                            >
                                <ModalHeader>Products Detail</ModalHeader>
                                <ModalBody>
                                    {
                                        !_.isEmpty(this.state.products)
                                        ?
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                <th>S/N</th>
                                                <th>Product</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.products.map( (product, i) => {
                                                   return( 
                                                        <tr
                                                            key={product.id}
                                                        >
                                                            <td>{i+1}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.category}</td>
                                                            <td>₦{Number(product.price_per_unit).toLocaleString()}</td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                        </Table>
                                        :
                                        <h3>Supplier has No Products</h3>
                                    }
                                </ModalBody>
                                <ModalFooter>
                                    <Button 
                                        color="primary" 
                                        onClick={this.toggleProducts}
                                        style={{    
                                            width: "80px",
                                            height: "50px",
                                            backgroundColor: "#37474f",
                                            border: "0px",
                                            color: "#baafaf"
                                        }}
                                    >
                                        Done
                                    </Button>{' '}
                                </ModalFooter>
                            </Modal>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="success" 
                            onClick={this.toggleProducts}
                            style={{    
                                width: "150px",
                                height: "50px",
                                backgroundColor: "#37474f",
                                border: "0px",
                                color: "#baafaf",
                                marginRight: "200px"
                            }}
                        >
                            See Products
                        </Button>
                        <Button 
                            color="primary" 
                            onClick={this.toggleModal}
                            style={{    
                                width: "80px",
                                height: "50px",
                                backgroundColor: "#37474f",
                                border: "0px",
                                color: "#baafaf"
                            }}
                        >Done</Button>{' '}
                    </ModalFooter>
                </Modal>
                
            {
                <div className="content">
                    <Row>
                    <Col xs={12} md={12}>
                        <div className="page-title">
                            <div className="float-left">
                            <form 
                                className="topbar-search-form"
                                style={{
                                    marginTop:"5px"
                                }}
                                >
                                <InputGroup className="topbar-search open">
                                    <InputGroupAddon addonType="append" 
                                        // onClick={() => this.searchToggle()}
                                    >
                                        <i className="i-magnifier">
                                        </i>
                                    </InputGroupAddon>
                                    <Input placeholder="Search..." />
                                </InputGroup>
                            </form>
                            </div>
                            <div className="float-right">
                                <h1 className="title"></h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <section className="box ">
                                <header className="panel_header">
                                    <h2 className="title float-left">All Users</h2>
                                </header>
                                <div className="content-body">
                                    <div className="row">
                                        <div className="col-lg-12 dt-disp">
                                        <Table responsive>
                                        <thead>
                                            <tr>
                                            <th>
                                                <h5>S/N</h5>
                                            </th>
                                            <th>
                                                <h5>Supplier Name</h5>
                                            </th>
                                            <th>
                                                <h5>Company Name</h5>
                                            </th>
                                            <th>
                                                <h5>Email</h5>
                                            </th>
                                            <th>
                                                <h5>Phone Number</h5>
                                            </th>
                                            <th>
                                                <h5></h5>
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                            !this.state.loading
                                            ?
                                                !_.isEmpty(this.state.users)
                                                ?
                                                this.state.users.map( (user, i) => {
                                                    return(
                                                        <tr
                                                            key={user.id}
                                                        >
                                                            <td>{i+1}</td>
                                                            <td>{user.surname}{" "}{user.othernames}</td>
                                                            <td>{user.company_name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phonenumber}</td>
                                                            <td>
                                                                <button
                                                                    onClick ={() => this.clickProduct(user)}
                                                                    style={{    
                                                                        width: "80px",
                                                                        height: "30px",
                                                                        backgroundColor: "#37474f",
                                                                        border: "0px",
                                                                        color: "#baafaf"
                                                                    }}
                                                                >
                                                                    View
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                !_.isEmpty(this.state.error)
                                                ?
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td
                                                        style={{textAlign:"center"}}
                                                    >
                                                       An Error Occurred. <a href="/users">refresh</a>
                                                    </td>
                                                </tr>
                                                :
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td
                                                        style={{textAlign:"center"}}
                                                    >
                                                        No Suppliers found
                                                    </td>
                                                </tr>
                                            :
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td
                                                    style={{textAlign:"center"}}
                                                >
                                                    fetching suppliers...
                                                </td>
                                            </tr>
                                            }   
                                        </tbody>
                                        </Table>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </Col>
                    </Row>
                </div>
            }
            </div>
        );
    }
}

export default Users;
