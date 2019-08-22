import moment from 'moment'; // Example for onSort prop
import React from 'react'; // Import React
import Datatable from 'react-bs-datatable'; // Import this package
import {
    Row, Col,Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup,
} from 'reactstrap';
import gql from 'graphql-tag';
import {client} from ".."
import Table from 'react-bootstrap/Table'
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import  _ from "lodash"

const onSortFunction = {
  date(columnValue) {
    return moment(columnValue, 'Do MMMM YYYY').valueOf();
  },
};


class Products extends React.Component{
   
    constructor(props){
        super(props)
        this.state = {
            showModal : false,
            showModal2: false,
            closeAll: false,
            products: [],
            clickedProduct: {},
            supplier: {},
            supplierModal: false,
            selection:"all"
        }
    }

    componentWillMount(){
        console.log("COMPONENT WILL MOUNT", this.props)
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
                }
            }
            `
        })
        .then( result => {
            console.log("RESULT", result.data)
            this.setState({
                products: result.data.products
            })
        })
        .catch(error => {
            console.log("ERROR", error)
        })
    }

    enterSelection = value => {
        this.setState({
            selection: value
        })
    }

    filterProducts = (data, filter) => {
        let result = []
            if(filter === "all"){
                result = [...this.state.products]
                
            }
           else{ 
               data.map( single => {
                    if(single.category === filter){
                        result.push(single)
                    }
                })
            }
        return result;
    }

    toggleModal = () => {
        this.setState({
            clickedProduct: {}
        })
    }

    toggleModal2 = () => {
        this.setState({
            showModal2: !this.state.showModal2
        })
    }

    toggleSupplier = () => {
        this.setState({
            supplierModal: !this.state.supplierModal
        })
    }
    populateSupplier = data => {
        this.setState({
            supplier: data
        })
    }

    clickProduct = data => {
        this.setState({
            clickedProduct: data,
            supplier:data.user
        })
    }

    render(){
        return (
            <div>
                <Modal isOpen={!_.isEmpty(this.state.clickedProduct)} toggle={this.toggle2} className={this.props.className}>
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
                                <ModalHeader>Supplier Detail</ModalHeader>
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
                        <div className="float-right">
                                <h1 className="title"></h1>
                                <Dropdown 
                                    direction="down" 
                                    isOpen={this.state.btnDropleft} 
                                    toggle={() => { 
                                        this.setState({ btnDropleft: !this.state.btnDropleft }); 
                                    }}
                                >
                                    <DropdownToggle caret>
                                        Filter By Category
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem
                                            onClick={() => this.enterSelection("all")}
                                        >
                                            All
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => this.enterSelection("furniture")}
                                        >
                                            Furnitures
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => this.enterSelection("electronics")}
                                        >
                                            Electronics
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => this.enterSelection("building")}
                                        >
                                            Building Materials
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => this.enterSelection("stationaries")}
                                        >
                                            Stationaries
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                    </div>
                    <div className="col-12">
                        <section className="box ">
                            <header className="panel_header">
                                <h2 className="title float-left">{this.state.selection}</h2>
                                
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
                                                <h5>Product Name</h5>
                                            </th>
                                            <th>
                                                <h5>Manufacturer</h5>
                                            </th>
                                            <th>
                                                <h5>Category</h5>
                                            </th>
                                            <th>
                                                <h5>Price</h5>
                                            </th>
                                            <th>
                                                <h5></h5>
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.filterProducts(this.state.products,this.state.selection).map( (product, i) => {
                                                return(
                                                    <tr
                                                        key={product.id}
                                                    >
                                                        <td>{i+1}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.manufacturer}</td>
                                                        <td>{product.category}</td>
                                                        <td>{product.price_per_unit}</td>
                                                        <td>
                                                            <button
                                                                onClick ={() => this.clickProduct(product)}
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

export default Products;
