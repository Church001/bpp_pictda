import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
import Datatable from 'react-bs-datatable'; // Import this package
import {
    Row, Col,Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup,
} from 'reactstrap';
import gql from 'graphql-tag';
import {client} from ".."
import Table from 'react-bootstrap/Table'
// import {
//     Dropdown, DropdownToggle, DropdownMenu, DropdownItem
// } from 'reactstrap';
import  _ from "lodash"

const onSortFunction = {
  date(columnValue) {
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  },
};

class Users extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            showModal : false,
            closeAll: false,
            users: [],
            clickedUser: {},
            currentData: "All",
            supplierModal: false,
            products:[]
        }
    }

    componentWillMount(){
        console.log("COMPONENT WILL MOUNT", this.props.rest)
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
            console.log("RESULT DASHBOARD", result.data)
            this.setState({
                users: result.data.users
            })
        })
        .catch( error => {
            console.log("ERROR DASHBOARD", error)
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

    render(){
        console.log("USERS",this.state.users)
        return (
            <div>
                <Modal isOpen={!_.isEmpty(this.state.clickedUser)} toggle={this.toggle2} className={this.props.className}>
                    <ModalHeader toggle={this.toggle2}>Product Detail</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <br />
                        <Button 
                            color="success" 
                            onClick={this.toggleSupplier}
                            style={{    
                                width: "150px",
                                height: "50px",
                                backgroundColor: "#37474f",
                                border: "0px",
                                color: "#baafaf"
                            }}
                        >
                            See Supplier
                        </Button>
                            <Modal 
                                isOpen={this.state.supplierModal} 
                                toggle={this.toggleNested} 
                                onClosed={this.state.closeAll ? this.toggle2 : undefined}
                            >
                                <ModalHeader>Products Detail</ModalHeader>
                                <ModalBody>Stuff and things</ModalBody>
                                <ModalFooter>
                                    <Button 
                                        color="primary" 
                                        onClick={this.toggleSupplier}
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
                
                <div className="content">
                    <Row>
                    <Col xs={12} md={12}>
                        <div className="page-title">
                            <div className="float-left">
                                {/* <h3 className="title">{this.state.currentData}</h3> */}
                            </div>
                            <div className="float-right">
                                <h1 className="title"></h1>
                                {/* <Dropdown 
                                    direction="down" 
                                    isOpen={this.state.btnDropleft} 
                                    toggle={() => { this.setState({ btnDropleft: !this.state.btnDropleft }); }}
                                >
                                    <DropdownToggle caret>
                                        Filter By Category
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>All</DropdownItem>
                                        <DropdownItem>Furnitures</DropdownItem>
                                        <DropdownItem>Electronics</DropdownItem>
                                        <DropdownItem>Building Materials</DropdownItem>
                                        <DropdownItem>Stationaries</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown> */}
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
                                            { this.state.users.map( (user, i) => {
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
            </div>
        );
    }
}

export default Users;
