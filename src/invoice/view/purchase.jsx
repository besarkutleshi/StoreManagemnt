import MUIDataTable from 'mui-datatables';
import React, { Component } from 'react'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { trashO } from 'react-icons-kit/fa/trashO'
import { Button, Modal } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { close } from 'react-icons-kit/fa/close'
import ErrorAlert from '../../ErrorAlert'
import SuccessAlert from '../../SuccessAlert'
import Swal from 'sweetalert2'
import { pencil } from 'react-icons-kit/fa/pencil';
import invoiceCtrl from '../controller/invoice.controller';
import itemController from '../../item/controllers/item.controller';
import collaboration from '../../collaboration/collaboration';
import 'selectize/dist/js/standalone/selectize.js'
import 'selectize/dist/css/selectize.bootstrap3.css'
import $ from 'jquery'
import Helper from '../../Helper';
export class PurchaseList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            Invoices:[],
            InvoicesType:[],
            Suppliers:[],
            Items:[],
            Stores:[],
            InvertoryHeader:{},
            Bodies:[],
            InvoiceNumber:'',
            InvoiceTypeID:0,
            SupplierID:0,
            PosID:0,
            Description:'',
            ItemID:0,
            Price:0,
            Quantity:0,
            Discount:0,
            Show:false,
            Submit:'Register',
            IsLoading:false,
            MaxID:''
        }
    }

    handleShow = () => {
        this.setState({Show:true},()=>{
            $(this.itemSelect).selectize();
            $(this.iType).selectize();
            $(this.Supplier).selectize();
            $(this.Store).selectize();
            if(this.state.Bodies.length === 0){
                $(this.bodies).hide();
            }
        });
    }
    handleClose = () => this.setState({Show:false});
    handleInvoiceNumber = event => this.setState({InvoiceNumber:event.target.value})
    handleInvoiceType = event => this.setState({InvoiceTypeID:event.target.value})
    handleSupplier = event => this.setState({SupplierID:event.target.value})
    handlePos = event => this.setState({PosID:event.target.value})
    handleDescription = event => this.setState({Description:event.target.value})
    handleItem = event => this.setState({ItemID:event.target.value})
    handlePrice = event => this.setState({Price:event.target.value})
    handleQuantity = event => this.setState({Quantity:event.target.value})
    handleDiscount = event => this.setState({Discount:event.target.value})
    
    getInvoices = async () => {
        let result = await invoiceCtrl.getInvoices();
        if(result){
            let invoices = result.filter(r => r.docType.description === "FATURE BLERJE");
            this.setState({Invoices:invoices});
        }
    }

    getInvoiceTypes = async () => {

    }

    getItems = async () => {
        let result = await itemController.getAll("getItems");
        if(result){
            this.setState({Items:result})
        }
    }

    getSuppliers = async () => {
        let result = await collaboration.getCollaborations();
        if(result){
            this.setState({Suppliers:result});
        }
    }

    getStores = async () => {
        let result = await collaboration.getPoss();
        if(result){
            this.setState({Stores:result});
        }
    }

    getMaxID = async () => {
        let maxid = await invoiceCtrl.getInvoicesMaxID('getInvoicesMaxID');
        if(maxid){
            this.setState({MaxID:maxid});
        }
    }

    componentDidMount = async () => {
        await this.getInvoices();
        await this.getItems();
        await this.getSuppliers();
        await this.getStores();
        await this.getMaxID();
    }

    updateModal = (id) => {
    }

    deleteInvoice = async (id) => {
    }
    
    insertBody = async event => {
        event.preventDefault();
        if(!this.state.InvertoryHeader.hasOwnProperty('DocNo')){
            alert('hini')
            let obj = {DocNo:this.state.InvoiceNumber,DocTypeID:this.state.InvoiceTypeID,PosID:this.state.PosID,
                Description:this.state.Description,SupplierID:this.state.SupplierID,Bodies:[]};
            this.setState({InvertoryHeader:obj},()=>{
                let body = {HeaderID:'',ItemID:this.state.ItemID,Quantity:this.state.Quantity,Price:this.state.Price,Discount:this.state.Discount}
                this.state.InvertoryHeader.Bodies.push(body);
                console.log(this.state.InvertoryHeader);
            })
        }
    }


    render() {
        let columns = ["Invoice Number","Invoice Type","Store","Supplier","Date","Description","Update","Delete"]
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <Button variant="primary" onClick={this.handleShow.bind(this)} style={{width: "200px"}}>
                            Insert Invoice <Icon icon={checkSquareO}></Icon>
                        </Button>
                        <MUIDataTable className="mt-2"
                            title = "Purchase Invoices"
                            data = {
                                this.state.Invoices.map(i => {
                                    let array = [
                                        i.docNo,i.docType.description,i.pos.name,i.supplier.name,i.docDate.toString().split('T')[0],i.description,
                                        <button onClick={this.updateModal.bind(this, i.id)} className="btn btn-primary">Update <Icon icon={pencil} /></button>,
                                        <button onClick={this.deleteInvoice.bind(this, i.id)} className="btn btn-danger">Delete <Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={columns}
                        />
                    </div>
                </div>
                            
                <div className="row">
                    <Modal show={this.state.Show} onHide={this.handleClose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {`${this.state.Submit} Employee`}
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.insertBody}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-4 form-group">
                                                <label htmlFor="Name">Invoice Number</label>
                                                <input id="Name" type="text" className="form-control" placeholder="Name" required
                                                    value={this.state.InvoiceNumber} onChange={this.handleInvoiceNumber} />
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <label htmlFor="Phone">Invoice Type</label>
                                                <select ref={(type) => this.iType = type} className="form-control" value={this.state.InvoiceTypeID} onChange={this.handleInvoiceType}>
                                                    <option value="">Not Selected</option>
                                                    {
                                                        this.state.InvoicesType.map(it => {
                                                            
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <label htmlFor="City">Supplier</label>
                                                <select ref={(supp) => this.Supplier = supp} className="form-control" value={this.state.SupplierID} onChange={this.handleSupplier}>
                                                    <option value="">Not Selected</option>
                                                    {
                                                        this.state.Suppliers.map(it => {
                                                            return(
                                                                <option value={it.id}>{it.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <label htmlFor="store">Store</label>
                                                <select ref={(store) => this.Store = store} className="form-control" value={this.state.PosID} onChange={this.handlePos}>
                                                    <option value="">Not Selected</option>
                                                    {
                                                        this.state.Stores.map(it => {
                                                            return(
                                                                <option value={it.id}>{it.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-4 form-group">
                                                <label htmlFor="Description">Description</label>
                                                <input id="Description" type="text" className="form-control" placeholder="Description" required
                                                    value={this.state.Description} onChange={this.handleDescription} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Item">Item</label>
                                                <select ref={(item) => this.itemSelect = item} id="1" className="form-control" value={this.state.ItemID} onChange={this.handleItem}>
                                                    <option value="">Not Selected</option>
                                                    {
                                                        this.state.Items.map(it => {
                                                            return(
                                                                <option value={it.id}>{it.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Price">Price</label>
                                                <input id="Price" type="text" className="form-control" placeholder="Price" required
                                                    value={this.state.Price} onChange={this.handlePrice} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Quantity">Quantity</label>
                                                <input id="Quantity" type="text" className="form-control" placeholder="Quantity" required
                                                    value={this.state.Quantity} onChange={this.handleQuantity} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Discount">Discount</label>
                                                <input id="Discount" type="text" className="form-control" placeholder="Discount" required
                                                    value={this.state.Discount} onChange={this.handleDiscount} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 form-group">
                                                <label htmlFor="description">Description</label>
                                                <textarea rows="7" id="description" type="text" className="form-control" placeholder="Description"
                                                value={this.state.Description} onChange={this.handleDescription} />
                                            </div>
                                        </div>
                                        <div ref={(body) => this.bodies = body} className="row" id="activeitmes">
                                            <div className="col-sm-12">
                                                <MUIDataTable 
                                                    title = "Active Items"


                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button id="submit" type="submit" className="float-left btn btn-primary">{this.state.Submit} <Icon icon={checkSquareO}></Icon></button>
                                    <Button className="btn btn-danger" onClick={this.handleClose}>Close <Icon icon={close} style={{marginTop:"-10px"}}></Icon></Button>
                                </Modal.Footer>
                            </form>
                    </Modal>
                </div>
            
            </div>
        )
    }
}

export default PurchaseList
