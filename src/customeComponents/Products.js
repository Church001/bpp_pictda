import React from 'react'; // Import React
import {
    Row, Col,Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import gql from 'graphql-tag';
import {client} from ".."
import Table from 'react-bootstrap/Table'
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import  _ from "lodash"
import logo1 from "../assets/img/logo1.png"
import user from "../assets/img/user.png"

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
            selection:"all",
            loading: true,
            error:{},
            displayProducts:[]
        }
    }

    componentWillMount(){
        if(!_.isEmpty(this.props.rest.products)){
            this.setState({
                products:this.props.rest.products,
                loading: false
            })
        }
    }

    componentDidMount(){
        if(_.isEmpty(this.state.products)){
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
            this.setState({
                products: result.data.products,
                loading: false
            })
        })
        .catch(error => {
            this.setState({
                error: error
            })
        })
        }
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

    filterer = (obj, keyword) => {
        let result = false
        for(let key in obj){
            if(_.includes(obj[key], keyword)){
                return true
            }
        }
        return result
    }

    onSearch = (e, data) => {
        e.preventDefault()
        let result = []
        let word = ""
        word = word + e.target.value.toUpperCase()
        let searchWord = word
        data.map( one => {
            if(this.filterer(one, word) === true){
                result.push(one)
            }
        })
        this.setState({
            products: result
        })
    }

    render(){
        return (
            <div>
                <Modal isOpen={!_.isEmpty(this.state.clickedProduct)} toggle={this.toggle2} className={this.props.className}>
                    <ModalHeader toggle={this.toggle2}>
                       Product Detail
                    </ModalHeader>
                    <ModalBody>
                        <div className="team-img">
                            <img 
                                className="img-fluid" 
                                src={logo1} 
                                alt="" 
                                style={{
                                    width: "248px",
                                    height: "250px",
                                    marginLeft: "18%"
                                }}
                            />
                        </div>
                        <div className="team-info">
                            <h4>Product Name:{"    "}
                                <span>
                                    {!_.isEmpty(this.state.clickedProduct.name)?this.state.clickedProduct.name:""}
                                </span>
                            </h4>
                            <h4>Manufacturer:{"    "}
                                <span>
                                    {!_.isEmpty(this.state.clickedProduct.manufacturer)?this.state.clickedProduct.manufacturer:""}
                                </span>
                            </h4>
                            <h4>Price:{"    "}
                                <span>
                                ₦{!_.isEmpty(this.state.clickedProduct.price_per_unit)?this.state.clickedProduct.price_per_unit:""}
                                </span>
                                {"    "}(per unit)
                            </h4>
                            <h4>Category:{"    "}
                                <span>
                                    {!_.isEmpty(this.state.clickedProduct.category)?this.state.clickedProduct.company_name:""}
                                </span>
                            </h4>
                            <h4>Company Name:{"    "}
                                <span>
                                    {!_.isEmpty(this.state.clickedProduct.company_name)}
                                </span>
                            </h4>
                            <h5>
                                Description:{"    "}
                                <span>
                                    {!_.isEmpty(this.state.clickedProduct.description)?this.state.clickedProduct.description:""}
                                </span>
                            </h5>
                        </div>
                            <Modal 
                                isOpen={this.state.supplierModal} 
                                toggle={this.toggleNested} 
                                onClosed={this.state.closeAll ? this.toggle2 : undefined}
                            >
                                <ModalHeader>Supplier Detail</ModalHeader>
                                <ModalBody>
                            {
                            !_.isEmpty(this.state.supplier) ?
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
                                            {!_.isEmpty(this.state.supplier.surname)?this.state.supplier.surname:""}{" "}{!_.isEmpty(this.state.supplier.othernames)?this.state.supplier.othernames:""}
                                        </span>
                                    </h4>
                                    <h4>Company:{"    "}
                                        <span>
                                            {!_.isEmpty(this.state.supplier.company_name)?this.state.supplier.company_name:""}
                                        </span>
                                    </h4>
                                    <h4>Phone Number:{"    "}
                                        <span>
                                        {!_.isEmpty(this.state.supplier.phonenumber)?this.state.supplier.phonenumber:""}
                                        </span>
                                    </h4>
                                    <h4>Address:{"    "}
                                        <span>
                                            {!_.isEmpty(this.state.supplier.company_address)?this.state.supplier.company_address:""}
                                        </span>
                                    </h4>
                                    <h4>Company Name:{"    "}
                                        <span>
                                            {!_.isEmpty(this.state.clickedProduct.company_name)?this.state.clickedProduct.company_name:""}
                                        </span>
                                    </h4>
                                    <h5>
                                        Email:{"    "}
                                        <span>
                                            {!_.isEmpty(this.state.supplier.email)?this.state.supplier.email:""}
                                        </span>
                                    </h5>
                                </div>
                                :
                                <div className="team-info">
                                    <h2>No Supplier for this Product</h2>
                                </div>
                            }

                                </ModalBody>
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
                            color="success" 
                            onClick={this.toggleSupplier}
                            style={{    
                                width: "150px",
                                height: "50px",
                                backgroundColor: "#37474f",
                                border: "0px",
                                color: "#baafaf",
                                marginRight: "200px"
                            }}
                        >
                            See Supplier
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
                                    onClick={() => this.searchToggle()}
                                >
                                    <i className="i-magnifier">
                                    </i>
                                </InputGroupAddon>
                                <Input 
                                    placeholder="Search..." 
                                    onChange={(e) => this.onSearch(e, this.props.rest.products)}
                                />
                            </InputGroup>
                        </form>
                        </div>
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
                                <h2 className="title float-left">{this.state.selection}{" "}PRODUCTS</h2>
                                
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
                                            {
                                            !this.state.loading
                                            ?
                                                !_.isEmpty(this.state.products)
                                                ?
                                                this.filterProducts(this.state.products,this.state.selection).map( (product, i) => {
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
                                                :
                                                !_.isEmpty(this.state.error)
                                                ?
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td
                                                            style={{textAlign:"center"}}
                                                        >
                                                        An Error Occurred. <a href="/products">refresh</a>
                                                        </td>
                                                    </tr>
                                                :
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td
                                                            style={{textAlign:"center"}}
                                                        >
                                                            No Products found
                                                        </td>
                                                    </tr>
                                            :
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td
                                                    style={{textAlign:"center"}}
                                                >
                                                    fetching products...
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

export default Products;
