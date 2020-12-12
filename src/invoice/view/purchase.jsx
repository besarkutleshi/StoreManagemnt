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
import docCtrl from '../../docs/controllers/docs.controller'
export class PurchaseList extends Component {

    static Bodies = []
    constructor(props) {
        super(props);

        this.state = {
            Invoices: [],
            InvoicesType: [],
            Suppliers: [],
            Items: [],
            Stores: [],
            InvertoryHeader: { Bodies: [] },
            Bodies: [],
            InvoiceNumber: '',
            InvoiceTypeID: 0,
            SupplierID: 0,
            PosID: 0,
            Description: '',
            ItemID: 0,
            Price: '',
            Quantity: '',
            Discount: '',
            Show: false,
            ShowBodies: false,
            Submit: 'Register',
            IsLoading: false,
            MaxID: ''
        }
    }

    handleShow = () => {

        $(this.insert).show();
        $(this.activeItems).show();
        $(this.purchaseList).hide();
        $(this.itemSelect).selectize();
        $(this.iType).selectize();
        $(this.Supplier).selectize();
        $(this.Store).selectize();
        // this.ShowBody.disabled = true;
        // this.Submit.disabled = true;
    }
    handleBody = () => this.setState({ ShowBodies: true })
    handleClose = () => this.setState({ Show: false });
    handleCloseBodies = () => this.setState({ ShowBodies: false });
    handleInvoiceNumber = event => this.setState({ InvoiceNumber: event.target.value })
    handleInvoiceType = event => this.setState({ InvoiceTypeID: event.target.value })
    handleSupplier = event => this.setState({ SupplierID: event.target.value })
    handlePos = event => this.setState({ PosID: event.target.value })
    handleDescription = event => this.setState({ Description: event.target.value })
    handleItem = event => this.setState({ ItemID: event.target.value })
    handlePrice = event => this.setState({ Price: event.target.value })
    handleQuantity = event => this.setState({ Quantity: event.target.value })
    handleDiscount = event => this.setState({ Discount: event.target.value })

    getInvoices = async () => {
        let result = await invoiceCtrl.getInvoices();
        if (result) {
            let invoices = result.filter(r => r.docType.description === "FATURE BLERJE");
            this.setState({ Invoices: invoices });
        }
    }

    getInvoiceTypes = async () => {
        let result = await docCtrl.getDocs();
        if (result) {
            this.setState({ InvoicesType: result })
        }
    }

    getItems = async () => {
        let result = await itemController.getAll("getItems");
        if (result) {
            this.setState({ Items: result })
        }
    }

    getSuppliers = async () => {
        let result = await collaboration.getCollaborations();
        if (result) {
            this.setState({ Suppliers: result });
        }
    }

    getStores = async () => {
        let result = await collaboration.getPoss();
        if (result) {
            this.setState({ Stores: result });
        }
    }

    getMaxID = async () => {
        let maxid = await invoiceCtrl.getInvoicesMaxID('getInvoicesMaxID');
        if (maxid) {
            this.setState({ MaxID: maxid });
        }
    }

    componentDidMount = async () => {
        await this.getInvoiceTypes();
        await this.getInvoices();
        await this.getItems();
        await this.getSuppliers();
        await this.getStores();
        await this.getMaxID();
    }

    updateModal = (id) => {
    }

    deleteInvoice = async (id) => {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            let response = await invoiceCtrl.deleteInvoice(id, "deleteInvoice");
            if (response) {
                Swal.fire(
                    'Deleted!',
                    'Change has been deleted.',
                    'success'
                );
                window.location.reload();
            } else {
                ErrorAlert(response.Error);
            }
        }
    }

    insertBody = () => {
        if (this.iType.value === '' || this.Store.value === '' || this.Supplier.value === '' || this.invNumber.value === '' || this.itemSelect.value === ''
            || this.Discount.value === '' || this.Price.value === '' || this.Quantity.value === '') {
            ErrorAlert("Please fill in empty box's")
        }
        else {
            if (!this.state.InvertoryHeader.hasOwnProperty('DocNo')) {
                let obj = {
                    DocNo: this.invNumber.value, DocTypeID: this.iType.value, PosID: this.Store.value,
                    Description: this.state.Description, SupplierID: this.Supplier.value, Bodies: []
                };
                this.setState({ InvertoryHeader: obj }, () => {
                    let body = { Item: { Name: this.itemSelect.textContent }, HeaderID: this.state.MaxID, ItemID: this.itemSelect.value, Quantity: this.state.Quantity, Price: this.state.Price, Discount: this.state.Discount }
                    this.state.InvertoryHeader.Bodies.push(body);
                    this.Count.textContent = `${this.state.InvertoryHeader.Bodies.length} Item`;
                    this.deleteItemFileds();
                    console.log(this.state.InvertoryHeader);
                })
            } else {
                let body = { Item: { Name: this.itemSelect.textContent }, HeaderID: this.state.MaxID, ItemID: this.itemSelect.value, Quantity: this.state.Quantity, Price: this.state.Price, Discount: this.state.Discount }
                this.state.InvertoryHeader.Bodies.push(body);
                this.Count.textContent = `${this.state.InvertoryHeader.Bodies.length} Item's`;
                this.deleteItemFileds();
            }
            $(this.invNumber).attr('disabled', 'disabled');
            $(this.iType)[0].selectize.disable();
            $(this.Store)[0].selectize.disable();
            $(this.Supplier)[0].selectize.disable();
            this.ShowBody.disabled = false;
            this.Submit.disabled = false;
            this.Quantity.textContent = ''
            this.Price.textContent = ''
            this.Discount.textContent = ''
        }
    }

    insertInvoice = async event => {
        event.preventDefault();
        let result = await invoiceCtrl.insertInvoice(this.state.InvertoryHeader, "insertInvoice");
        if (result) {
            SuccessAlert("Register Successful");
            window.location.reload();
        }
    }

    deleteItemFileds = () => {
        this.setState({
            Price: '',
            Quantity: '',
            Discount: '',
            ItemID: ''
        })
    }


    render() {
        let columns = ["Update", "Invoice Number", "Invoice Type", "Store", "Supplier", "Date", "Description", "Delete"]
        return (
            <div className="container-fluid">
                <div className="row" ref={(l) => this.purchaseList = l}>
                    <div className="col-sm-12">
                        <button onClick={this.handleShow} type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" style={{ width: "200px" }}>
                            Insert Invoice <Icon icon={checkSquareO}></Icon>
                        </button>
                        <MUIDataTable className="mt-2"
                            title="Purchase Invoices"
                            data={
                                this.state.Invoices.map(i => {
                                    let array = [
                                        <button onClick={this.updateModal.bind(this, i.invertoryID)} className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                        i.docNo, i.docType.description, i.pos.name, i.supplier.name, i.docDate.toString().split('T')[0], i.description,
                                        <button onClick={this.deleteInvoice.bind(this, i.invertoryID)} className="btn btn-danger"><Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={columns}
                        />
                    </div>
                </div>

                <form id="myForm" method="post" onSubmit={this.insertInvoice} ref={(i) => this.insert = i} style={{ display: "none" }}>
                    <div className="row">
                        <div className="col-sm-3 form-group">
                            <label htmlFor="Name">Invoice Number</label>
                            <input ref={(invNumber) => this.invNumber = invNumber} id="Name" type="text" className="form-control" placeholder="Name" required
                                value={this.state.InvoiceNumber} onChange={this.handleInvoiceNumber} />
                        </div>
                        <div className="col-sm-3 form-group">
                            <label htmlFor="Phone">Invoice Type</label>
                            <select ref={(type) => this.iType = type} className="form-control" value={this.state.InvoiceTypeID} onChange={this.handleInvoiceType}>
                                <option value="">Not Selected</option>
                                {
                                    this.state.InvoicesType.map(it => {
                                        return (
                                            <option value={it.docTypeID}>{it.code}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm-3 form-group">
                            <label htmlFor="City">Supplier</label>
                            <select ref={(supp) => this.Supplier = supp} className="form-control" value={this.state.SupplierID} onChange={this.handleSupplier}>
                                <option value="">Not Selected</option>
                                {
                                    this.state.Suppliers.map(it => {
                                        return (
                                            <option value={it.id}>{it.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm-3 form-group">
                            <label htmlFor="store">Store</label>
                            <select ref={(store) => this.Store = store} className="form-control" value={this.state.PosID} onChange={this.handlePos}>
                                <option value="">Not Selected</option>
                                {
                                    this.state.Stores.map(it => {
                                        return (
                                            <option value={it.id}>{it.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 form-group">
                            <label htmlFor="Item">Item</label>
                            <select ref={(item) => this.itemSelect = item} id="1" className="form-control" value={this.state.ItemID} onChange={this.handleItem}>
                                <option value="">Not Selected</option>
                                {
                                    this.state.Items.map(it => {
                                        return (
                                            <option value={it.id}>{it.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm-3 form-group">
                            <label htmlFor="Price">Price</label>
                            <input ref={(p) => this.Price = p} type="text" className="form-control" placeholder="$" required
                                value={this.state.Price} onChange={this.handlePrice} />
                        </div>
                        <div className="col-sm-3 form-group">
                            <label htmlFor="Quantity">Quantity</label>
                            <input ref={(q) => this.Quantity = q} type="text" className="form-control" placeholder="Quantity" required
                                value={this.state.Quantity} onChange={this.handleQuantity} />
                        </div>
                        <div className="col-sm-3 form-group">
                            <label htmlFor="Discount">Discount</label>
                            <input ref={(d) => this.Discount = d} type="text" className="form-control" placeholder="Discount" required
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
                    <div className="row">
                        <div className="col-sm-5">
                            <button type="button" onClick={this.insertBody.bind(this)} className="btn btn-primary">Insert Item <Icon icon={checkSquareO}></Icon></button>
                        </div>
                    </div>
                </form>

                <div className="row" id="activeitmes" ref={(al) => this.activeItems = al} style={{marginTop:"20px",display:"none"}}>
                        <div className="col-sm-12">
                            <MUIDataTable
                                title="Active Items"
                                data={
                                    this.state.InvertoryHeader.Bodies.map(b => {
                                        let array = [
                                            <button onClick={this.updateModal.bind(this, b.itemID)} className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                            b.Item.Name, b.Price, b.Quantity, b.Discount,
                                            <button onClick={this.deleteInvoice.bind(this, b.itemID)} className="btn btn-danger"><Icon icon={trashO} /></button>
                                        ]
                                        return array;
                                    })
                                }
                                columns={["Update", "Item", "Pirce", "Qunatity", "Discount", "Delete"]}
                            />
                        </div>
                    </div>
            </div>
        )
    }
}

export default PurchaseList
