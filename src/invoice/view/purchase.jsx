import MUIDataTable from 'mui-datatables';
import React, { Component } from 'react'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { trashO } from 'react-icons-kit/fa/trashO'
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
import { list } from 'react-icons-kit/icomoon/list';
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
            BodyID:'0',
            HeaderID:'0',
            InvoiceID: '',
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
    }

    handleBody = () => this.setState({ ShowBodies: true })
    handleClose = () => {
        $(this.insert).hide();
        $(this.activeItems).hide();
        $(this.purchaseList).show();
        $(this.Bodies).hide();
    }

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
        this.SaveInvoice.disabled = true;
        await this.getTotalPurchases();
        await this.getTodayPurchase();
        await this.getInvoiceTypes();
        await this.getInvoices();
        await this.getItems();
        await this.getSuppliers();
        await this.getStores();
        await this.getMaxID();
    }

    updateModal = (id) => {
        let obj = this.state.Invoices.find(i => i.invertoryID === id);
        if (obj) {
            this.setState({
                InvoiceID: obj.invertoryID,
                InvoiceNumber: obj.docNo,
                Description: obj.description,
                InvoiceTypeID: obj.docTypeID,
                PosID: obj.posID,
                SupplierID: obj.supplierID
            })
        }
    }

    updateInvoice = async event => {
        event.preventDefault();
        let obj = { InvertoryID: this.state.InvoiceID, DocNo: this.invNumber.value, DocTypeID: this.iType.value, PosID: this.Store.value, SupplierID: this.Supplier.value, Description: this.Description.value };
        let result = await invoiceCtrl.updateInvoice(obj, "updateInvoice");
        if (result) {
            SuccessAlert("Update Successful");
            window.location.reload();
        }
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
                    this.deleteItemFileds();
                })
            } else {
                let body = { Item: { Name: this.itemSelect.textContent }, HeaderID: this.state.MaxID, ItemID: this.itemSelect.value, Quantity: this.state.Quantity, Price: this.state.Price, Discount: this.state.Discount }
                this.state.InvertoryHeader.Bodies.push(body);
                this.deleteItemFileds();
            }
            $(this.invNumber).attr('disabled', 'disabled');
            $(this.iType)[0].selectize.disable();
            $(this.Store)[0].selectize.disable();
            $(this.Supplier)[0].selectize.disable();
            this.SaveInvoice.disabled = false;
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
            ItemID: '',
        })
    }

    updateItemModal = (id) => {
        let obj = this.state.InvertoryHeader.Bodies.find(i => i.ItemID === id);
        if (obj) {
            this.setState({
                ItemID: obj.ItemID,
                Price: obj.Price,
                Quantity: obj.Quantity,
                Discount: obj.Discount
            })
        }
    }

    updateItem = async event => {
        event.preventDefault();
        let body = { Item: { Name: this.itemSelect.textContent }, HeaderID: this.state.MaxID, ItemID: this.itemSelect.value, Quantity: this.state.Quantity, Price: this.state.Price, Discount: this.state.Discount }
        this.state.InvertoryHeader.Bodies.forEach(element => {
            if(element.ItemID === this.state.ItemID){
                element.Item.name = body.Item.Name;
                element.ItemID = body.ItemID;
                element.Quantity = body.Quantity;
                element.Price = body.Price;
                element.Discount = body.Discount;
                this.deleteItemFileds();
                $("#itemModal .close").click()
                return;
            }
        });
    }

    deleteItem = (id) => {
        this.state.InvertoryHeader.Bodies.forEach(element => {
            if(element.ItemID === id){
                this.state.InvertoryHeader.Bodies.splice(element,1);
                this.deleteItemFileds();
                return;
            }
        });
    }

    getBodies = async (headerid) => {
        this.setState({HeaderID:headerid})
        let result = await invoiceCtrl.getInvoicesBody(headerid);
        if (result) {
            this.setState({ Bodies: result },() => {
                $(this.purchaseList).hide();
                $(this.Bodies).show();
            })
        }else{
            ErrorAlert("Does not have Items")
        }
    }

    insertBody = async event => {
        event.preventDefault();
        let id = await invoiceCtrl.getInvoicesMaxID("getInvoicesBodyMaxID");
        let obj = {ID:this.state.BodyID,HeaderID:this.state.HeaderID,ItemID:this.state.ItemID,Quantity:this.state.Quantity,Price:this.state.Price,Discount:this.state.Discount};
        let result = this.state.Submit === "Register" ? 
            await invoiceCtrl.insertInvoice(obj,"insertInvoiceBody") : await invoiceCtrl.updateInvoice(obj,"updateInvoiceBody");
        if(result){
            let invoicebody = {id:id,headerid:this.state.HeaderID,
                item:{id:this.state.ItemID,name:this.itemSelect.textContent},price:this.state.Price,quantity:this.state.Quantity,discount:this.state.Discount};
            if(this.state.Submit === "Update"){
                this.state.Bodies.forEach(element => {
                    if(element.id === this.state.BodyID){
                        element.item.id = invoicebody.item.id;
                        element.price = invoicebody.price;
                        element.quantity = invoicebody.quantity;
                        element.discount = invoicebody.discount;
                    }
                })
            }else{
                this.state.Bodies.push({id:id,headerid:this.state.HeaderID,
                    item:{id:this.state.ItemID,name:this.itemSelect.textContent},price:this.state.Price,quantity:this.state.Quantity,discount:this.state.Discount});
            }
            SuccessAlert("Register Successful");
            this.deleteItemFileds();
            $("[data-dismiss=modal]").trigger({type:"click"})
        }
    }

    updateInvoiceBody = (id) => {
        let obj = this.state.Bodies.find(b => b.id === id);
        if(obj){
            this.setState({
                BodyID:obj.id,
                ItemID:obj.item.id,
                Price:obj.price,
                Quantity:obj.quantity,
                Discount:obj.discount,
                Submit:'Update'
            })
        }
    }

    deleteInvoiceBody = async (id) => {
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
            let response = await invoiceCtrl.deleteInvoice(id, "deleteInvoiceBody");
            this.state.Bodies.forEach(element => {
                if(element.id === id){
                    this.state.Bodies.splice(element,1);
                    this.deleteItemFileds();
                    return;
                }
            })
            if (response) {
                Swal.fire(
                    'Deleted!',
                    'Change has been deleted.',
                    'success'
                );
            } else {
                ErrorAlert(response.Error);
            }
        }
    }

    getTotalPurchases = async () => {
        let result = await invoiceCtrl.getTotalPurchaseAll();
        $(this.totalAmount).text(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

    getTodayPurchase = async () => {
        let result = await invoiceCtrl.getTotalPurchaseToday();
        $(this.todayAmount).text(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

    render() {
        let columns = ["Update", "Invoice Number", "Invoice Type", "Store", "Supplier", "Date", "Description", "Items", "Delete"]
        return (
            <div className="container-fluid">

                <div className="row" ref={(l) => this.purchaseList = l}>
                    <div className="col-sm-12 mb-3">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px 5px grey'}}>
                                        <p className="text-center text-muted lead">Today Invoices Count</p>
                                        <p className="text-center">{this.state.Invoices.filter(sl => sl.docDate.toString().split('T')[0] === (new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()).toString()).length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px  5px grey'}}>
                                        <p className="text-center text-muted lead">Today Invoices Amount</p>
                                        <p className="text-center" ref={(t) => this.todayAmount = t}></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px  5px grey'}}>
                                        <p className="text-center text-muted lead">All Invoices Count</p>
                                        <p className="text-center">{this.state.Invoices.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px  5px grey'}}>
                                        <p className="text-center text-muted lead">All Invoices Amount</p>
                                        <p className="text-center" ref={(all) => this.totalAmount = all}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <button onClick={this.handleShow} type="button" class="btn btn-primary" style={{ width: "200px" }}>
                            Insert Invoice <Icon icon={checkSquareO}></Icon>
                        </button>
                        <MUIDataTable className="mt-2"
                            title="Purchase Invoices"
                            data={
                                this.state.Invoices.map(i => {
                                    let array = [
                                        <button onClick={this.updateModal.bind(this, i.invertoryID)} data-toggle="modal" data-target="#myModal" className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                        i.docNo, i.docType.description, i.pos.name, i.supplier.name, i.docDate.toString().split('T')[0], i.description,
                                        <button onClick={this.getBodies.bind(this,i.invertoryID)} className="btn btn-secondary"><Icon icon={list}/></button>,
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
                    <div className="row" style={{ marginBottom: "10px" }}>
                        <div className="col-sm-4">
                            <button className="btn btn-primary" onClick={this.handleClose}><Icon icon={list} />  Invoice List</button>
                        </div>
                    </div>
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
                            <textarea rows="7" type="text" className="form-control" placeholder="Description"
                                value={this.state.Description} onChange={this.handleDescription} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                            <button type="button" onClick={this.insertBody.bind(this)} className="btn btn-primary">Insert Item <Icon icon={checkSquareO}></Icon></button>
                        </div>
                        <div className="col-sm-2">

                        </div>
                        <div className="col-sm-5">
                            <button ref={(sv) => this.SaveInvoice = sv} type="button" onClick={this.insertInvoice.bind(this)} className="btn btn-primary float-right">Save Invoice <Icon icon={checkSquareO}></Icon></button>
                        </div>
                    </div>
                </form>

                <div className="row" id="activeitmes" ref={(al) => this.activeItems = al} style={{ marginTop: "20px", display: "none" }}>
                    <div className="col-sm-12">
                        <MUIDataTable
                            title="Active Items"
                            data={
                                this.state.InvertoryHeader.Bodies.map(b => {
                                    let array = [
                                        <button onClick={this.updateItemModal.bind(this, b.ItemID)} data-backdrop="false" data-toggle="modal" data-target="#itemModal" className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                        b.Item.Name, b.Price, b.Quantity, b.Discount,
                                        <button onClick={this.deleteItem.bind(this, b.ItemID)} className="btn btn-danger"><Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={["Update", "Item", "Pirce", "Qunatity", "Discount", "Delete"]}
                        />
                    </div>
                </div>

                <form action="" onSubmit={this.updateInvoice}>
                    <div className="row">
                        <div class="modal fade modal-center" id="myModal">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4 class="modal-title">Update Invoice</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div class="modal-body">
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Name">Invoice Number</label>
                                                <input ref={(invNumber) => this.invNumberU = invNumber} id="Namee" type="text" className="form-control" placeholder="Name" required
                                                    value={this.state.InvoiceNumber} onChange={this.handleInvoiceNumber} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Phone">Invoice Type</label>
                                                <select ref={(type) => this.iTypeU = type} className="form-control" value={this.state.InvoiceTypeID} onChange={this.handleInvoiceType}>
                                                    {
                                                        this.state.InvoicesType.map(it => {
                                                            return (
                                                                <option value={it.docTypeID}>{it.code}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="City">Supplier</label>
                                                <select ref={(supp) => this.SupplierU = supp} className="form-control" value={this.state.SupplierID} onChange={this.handleSupplier}>
                                                    {
                                                        this.state.Suppliers.map(it => {
                                                            return (
                                                                <option value={it.id}>{it.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="store">Store</label>
                                                <select ref={(store) => this.StoreU = store} className="form-control" value={this.state.PosID} onChange={this.handlePos}>
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
                                            <div className="col-sm-12 form-group">
                                                <label htmlFor="description">Description</label>
                                                <textarea ref={(d) => this.DescriptionU = d} rows="7" id="description" type="text" className="form-control" placeholder="Description"
                                                    value={this.state.Description} onChange={this.handleDescription} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" onClick={() => this.setState({InvoiceNumber:'',InvoiceTypeID:'',SupplierID:'',PosID:'',Description:''})} class="btn btn-danger" data-dismiss="modal">Close <Icon icon={close} /></button>
                                        <button type="submit" class="btn btn-primary">Update <Icon icon={pencil} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={this.updateItem}>
                    <div className="row">
                        <div class="modal fade modal-center" id="itemModal">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4 class="modal-title">Update Invoice</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div class="modal-body">
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Item">Item</label>
                                                <select ref={(item) => this.itemSelectU = item} className="form-control" value={this.state.ItemID} onChange={this.handleItem}>
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
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Price">Price</label>
                                                <input ref={(p) => this.Price = p} type="text" className="form-control" placeholder="$" required
                                                    value={this.state.Price} onChange={this.handlePrice} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Quantity">Quantity</label>
                                                <input ref={(q) => this.Quantity = q} type="text" className="form-control" placeholder="Quantity" required
                                                    value={this.state.Quantity} onChange={this.handleQuantity} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Discount">Discount</label>
                                                <input ref={(d) => this.Discount = d} type="text" className="form-control" placeholder="Discount" required
                                                    value={this.state.Discount} onChange={this.handleDiscount} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button onClick={() => this.setState({ItemID:'',Price:'',Quantity:'',Discount:''})} type="button" class="btn btn-danger" data-dismiss="modal">Close <Icon icon={close} /></button>
                                        <button type="submit" class="btn btn-primary">Update <Icon icon={pencil} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div ref={(b) => this.Bodies = b} className="row" style={{display:"none"}}>
                    <div className="col-sm-12">
                        <button className="btn btn-primary mr-3" onClick={this.handleClose}><Icon icon={list} />  Invoice List</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#insertBody" style={{ width: "200px" }}>
                            Insert Body <Icon icon={checkSquareO}></Icon>
                        </button>
                        <MUIDataTable className="mt-2"
                            title = "Invoice Body"
                            data = {
                                this.state.Bodies.map(ib => {
                                    let array = [
                                        <button onClick={this.updateInvoiceBody.bind(this, ib.id)} data-toggle="modal" data-target="#insertBody" className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                        ib.item.name, ib.price, ib.quantity, ib.discount,
                                        <button onClick={this.deleteInvoiceBody.bind(this, ib.id)} className="btn btn-danger"><Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={["Update", "Item", "Price", "Quantity", "Discount", "Delete"]}
                        />
                    </div>
                </div>
           
                <form onSubmit={this.insertBody}>
                    <div className="row">
                        <div class="modal fade modal-center" id="insertBody">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4 class="modal-title">{this.state.Submit} Invoice Body</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div class="modal-body">
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Item">Item</label>
                                                <select ref={(item) => this.itemSelectU = item} className="form-control" value={this.state.ItemID} onChange={this.handleItem}>
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
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Price">Price</label>
                                                <input ref={(p) => this.Price = p} type="text" className="form-control" placeholder="$" required
                                                    value={this.state.Price} onChange={this.handlePrice} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Quantity">Quantity</label>
                                                <input ref={(q) => this.Quantity = q} type="text" className="form-control" placeholder="Quantity" required
                                                    value={this.state.Quantity} onChange={this.handleQuantity} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Discount">Discount</label>
                                                <input ref={(d) => this.Discount = d} type="text" className="form-control" placeholder="Discount" required
                                                    value={this.state.Discount} onChange={this.handleDiscount} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" onClick={() => this.setState({Price:'',Discount:'',ItemID:'',Quantity:'',Submit:'Register'})} data-dismiss="modal">Close <Icon icon={close} /></button>
                                        <button type="submit" class="btn btn-primary">{this.state.Submit} <Icon icon={pencil} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default PurchaseList
