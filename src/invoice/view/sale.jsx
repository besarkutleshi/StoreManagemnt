import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'selectize/dist/js/standalone/selectize.js'
import 'selectize/dist/css/selectize.bootstrap3.css'
import $ from 'jquery';
import itemController from '../../item/controllers/item.controller';
import collaboration from '../../collaboration/collaboration';
import invoiceCtrl from '../controller/invoice.controller';
import SuccessAlert from '../../SuccessAlert';
import ErrorAlert from '../../ErrorAlert';
import saveimage from '../../images/save.png'
import Icon from 'react-icons-kit'
import { pencil } from 'react-icons-kit/fa/pencil';
import { trashO } from 'react-icons-kit/fa/trashO'
import '../../css/table.css'
import { close } from 'react-icons-kit/fa/close'
import helpScript from '../../js/helpScript';
import Loader from '../../helpers/loader'
export class Sale extends Component {

    static id = 1;
    static docno = 1;
    static currentId = 0;
    constructor(props) {
        super(props)

        this.state = {
            InvertoryHeader: {},
            Suppliers: [],
            Items: [],
            Stores: [],
            InvertoryHeader: { Bodies: [] },
            Bodies: [],
            BodyID: '0',
            HeaderID: '0',
            SupplierID: '',
            StoreID: '',
            Description: '',
            MaxID: '',
            Amount: 0.00,
            state: '',
            IsLoading:false
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
            this.setState({ Stores: result })
        }
    }
    getMaxID = async () => {
        let maxid = await invoiceCtrl.getInvoicesMaxID('getInvoicesMaxID');
        if (maxid) {
            this.setState({ MaxID: maxid });
        }
    }

    componentDidMount = async () => {
        $('#sidebar').toggleClass('active');
        // $(document).ready(function () {
        //     $('#inserted').DataTable({
        //         searching: false,
        //         bLengthChange: false,
        //         bPaginate: false,
        //     })
        // });
        Sale.id = 1;
        this.setState({IsLoading:true})
        await this.getItems();
        await this.getSuppliers();
        await this.getStores();
        await this.getMaxID();
        this.setState({IsLoading:false})
        $(this.searchItem).selectize();
        $(this.Store).selectize();
        $(this.Supplier).selectize();
    }

    insertBody = () => {
        if (this.Store.value === '' || this.Supplier.value === '' || this.searchItem.value === '' || this.discount.value === ''
            || this.price.value === '' || this.quantity.value === '') {
            ErrorAlert("Please fill in empty box's");
        }
        else if (this.price.value <= 0) {
            ErrorAlert("Price must be greater than 0");
        }
        else if (this.quantity.value <= 0) {
            ErrorAlert("Quantity must be greater than 0");
        }
        else if (this.discount.value < 0) {
            ErrorAlert("Quantity must be greater or equals than 0");
        } 
        else {
            let amount = 0;
            if (!this.state.InvertoryHeader.hasOwnProperty('DocNo')) {
                let obj = {
                    DocNo: Sale.docno++, DocTypeID: '2', PosID: this.Store.value,
                    Description: this.Description.value, SupplierID: this.Supplier.value, Bodies: []
                };
                this.setState({ InvertoryHeader: obj }, () => {
                    let body = { ID: Sale.id++, Item: { Name: this.searchItem.textContent }, HeaderID: this.state.MaxID, ItemID: this.searchItem.value, Quantity: this.quantity.value, Price: this.price.value, Discount: this.discount.value }
                    this.state.InvertoryHeader.Bodies.push(body);
                    amount = body.Quantity * body.Price;
                    this.state.Amount += amount;
                    this.deleteItemFileds();
                })
            } else {
                let body = { ID: Sale.id++, Item: { Name: this.searchItem.textContent }, HeaderID: this.state.MaxID, ItemID: this.searchItem.value, Quantity: this.quantity.value, Price: this.price.value, Discount: this.discount.value }
                this.state.InvertoryHeader.Bodies.push(body);
                amount = body.Quantity * body.Price;
                this.state.Amount += amount;
                this.deleteItemFileds();
            }
        }
    }

    deleteItemFileds = () => {
        this.setState({ state: '' });
        this.price.value = '';
        this.discount.value = '';
        this.quantity.value = '';
        $('#noactive').hide();
        $('#inserted').show();
        $(document).ready(function () {
            helpScript._appendDataTable('inserted');
        });
    }

    insertInvoice = async event => {
        event.preventDefault();
        let result = await invoiceCtrl.insertInvoice(this.state.InvertoryHeader, "insertInvoice");
        if (result) {
            SuccessAlert("Register Successful");
            this.Paid.value = this.Pay.value;
            this.Back.value = this.BackP.value;
            this.setState({
                Amount:0,
                InvertoryHeader:{Bodies:[]}
            })
            this.Pay.value = '';
            this.BackP.value = '';
            this.Description.value = '';
            $('#noactive').show();
            $('#inserted').hide();
            $("[data-dismiss=modal]").trigger({ type: "click" })
        } else {
            ErrorAlert(result);
        }
    }

    updateModal = (id) => {
        let obj = this.state.InvertoryHeader.Bodies.find(o => o.ID === id);
        Sale.currentId = id;
        if (obj) {
            this.priceU.value = obj.Price;
            this.discountU.value = obj.Discount;
            this.quantityU.value = obj.Quantity;
            this.searchItemU.value = obj.ItemID;
            $(this.searchItemU).selectize();
        }
    }

    updateBody = () => {
        this.state.InvertoryHeader.Bodies.forEach(obj => {
            if (obj.ID === Sale.currentId) {
                obj.ItemID = this.searchItemU.value;
                obj.Price = this.priceU.value;
                obj.Quantity = this.quantityU.value;
                obj.Discount = this.discountU.value;
            }
        });
        this.deleteItemFileds();
        this.calculateAmount();
        $("[data-dismiss=modal]").trigger({ type: "click" })
    }

    calculateAmount = () => {
        let amount = 0;
        this.state.InvertoryHeader.Bodies.forEach(element => {
            amount = element.Quantity * element.Price;
        });
        this.setState({ Amount: amount })
    }

    delete = (id) => {
        this.state.InvertoryHeader.Bodies.forEach(element => {
            if (element.ID === id) {
                this.state.InvertoryHeader.Bodies.splice(element, 1);
                this.deleteItemFileds();
                this.calculateAmount();
                return;
            }
        });
        if(this.state.InvertoryHeader.Bodies.length === 0){
            this.setState({InvertoryHeader:{Bodies:[]}})
            $('#noactive').show();
            $('#inserted').hide();
        }
    }

    render() {
        if(this.state.IsLoading){
            return <Loader />
        }
        return (
            <div className="container-fluid">
                <div className="row" style={{ marginTop: '-40px' }}>
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-6" style={{ marginTop: "40px" }}>
                                <div className="card" style={{ width: "150px" }}>
                                    <div className="card-body d-flex">
                                        <img src={saveimage} width="50px" height="50px" alt="" />
                                        <button ref={(s) => this.save = s} className="btn" onClick={() => {
                                            this.Pay.value = this.state.Amount.toFixed(2)
                                        }} data-toggle="modal" data-target="#payModal">
                                            SAVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <h3 className="float-right" ref={(a) => this.amount = a} style={{ fontSize: '120px' }} >{this.state.Amount.toFixed(2)}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <select ref={(s) => this.searchItem = s} className="form-control">
                                    <option value="">None</option>
                                    {
                                        this.state.Items.map(it => {
                                            return (
                                                <option value={it.id}>{it.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="Price" ref={(p) => this.price = p} />
                            </div>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="Quantity" ref={(q) => this.quantity = q} />
                            </div>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="Discount" ref={(d) => this.discount = d} />
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-secondary" style={{ width: '100%' }} onClick={this.insertBody.bind(this)}>Insert</button>
                            </div>
                        </div>
                        <hr/>
                        <div className="row mt-2">
                            <div className="col-sm-12">
                                <div className="table-responsive" style={{ height: "440px" }}>
                                    <div id="noactive" className="text-center">
                                        No active items
                                    </div>
                                    <table id="inserted" class="display" style={{ display: 'none' }}>
                                        <thead>
                                            <tr>
                                                <th>Update</th>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Discount</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.InvertoryHeader.Bodies.map(b => {
                                                    return (
                                                        <tr>
                                                            <td><button onClick={this.updateModal.bind(this, b.ID)} data-toggle="modal" data-target="#updateModal" className="btn btn-secondary"><Icon icon={pencil} /></button></td>
                                                            <td>{b.Item.Name}</td>
                                                            <td>{b.Price}</td>
                                                            <td>{b.Quantity}</td>
                                                            <td>{b.Discount}</td>
                                                            <td><button onClick={this.delete.bind(this, b.ID)} className="btn btn-danger"><Icon icon={trashO} /></button></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row mt-2">
                            <div className="col-sm-3">
                                <label htmlFor="">Supplier</label>
                                <select ref={(s) => this.Supplier = s} className="form-control" value={this.state.SupplierID} onChange={(e) => this.setState({ SupplierID: e.target.value })}>
                                    <option value="9">Klient</option>
                                  {
                                        this.state.Suppliers.map(it => {
                                            return (
                                                <option value={it.id}>{it.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor="">Store House</label>
                                <select ref={(st) => this.Store = st} className="form-control" value={this.state.StoreID} onChange={(e) => this.setState({ StoreID: e.target.value })}>
                                   {
                                        this.state.Stores.map(it => {
                                            return (
                                                <option value={it.id}>{it.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="">Description</label>
                                <textarea ref={(d) => this.Description = d} placeholder="Description" rows="4" className="form-control"></textarea>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="">Paid</label>
                                <textarea ref={(p) => this.Paid = p} rows="1" readOnly className="form-control" style={{ color: 'green', textAlign: 'right', fontSize: '62px' }}>0:00</textarea>
                            </div>
                            <div className="col-sm-3">
                                <label htmlFor="">Back</label>
                                <textarea ref={(b) => this.Back = b} rows="1" readOnly className="form-control" style={{ color: 'red', textAlign: 'right', fontSize: '62px' }}>0:00</textarea>
                            </div>
                        </div>

                        <div id="update" className="row">
                            <div className="row">
                                <div class="modal fade modal-center" id="updateModal">
                                    <div class="modal-dialog modal-lg modal-dialog-centered">
                                        <div class="modal-content">

                                            <div class="modal-header">
                                                <h4 class="modal-title">Update Invoice Body</h4>
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            </div>

                                            <div class="modal-body">
                                                <div className="row">
                                                    <div className="col-sm-6 form-group">
                                                        <label htmlFor="Item">Item</label>
                                                        <select ref={(item) => this.searchItemU = item} className="form-control">
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
                                                        <input ref={(p) => this.priceU = p} type="text" className="form-control" placeholder="$" required />
                                                    </div>
                                                    <div className="col-sm-6 form-group">
                                                        <label htmlFor="Quantity">Quantity</label>
                                                        <input ref={(q) => this.quantityU = q} type="text" className="form-control" placeholder="Quantity" required />
                                                    </div>
                                                    <div className="col-sm-6 form-group">
                                                        <label htmlFor="Discount">Discount</label>
                                                        <input ref={(d) => this.discountU = d} type="text" className="form-control" placeholder="Discount" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close <Icon icon={close} /></button>
                                                <button type="submit" onClick={this.updateBody.bind(this)} class="btn btn-primary">Update <Icon icon={pencil} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="pay" className="row">
                            <div className="row">
                                <div class="modal fade modal-center" id="payModal">
                                    <div class="modal-dialog modal-lg modal-dialog-centered">
                                        <div class="modal-content">
                                            <div className="modal-header">

                                            </div>
                                            <div class="modal-body">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <label htmlFor="">Pay</label>
                                                        <input type="text" className="form-control" style={{ color: 'green', textAlign: 'right', fontSize: '62px' }} 
                                                            ref={(p) => this.Pay = p} onChange={() => {
                                                                this.BackP.value = this.Pay.value - this.state.Amount
                                                        }}/>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <label htmlFor="">Back</label>
                                                        <textarea ref={(b) => this.BackP = b} rows="1" readOnly className="form-control" 
                                                            style={{ color: 'red', textAlign: 'right', fontSize: '62px' }}>0:00</textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close <Icon icon={close} /></button>
                                                <button type="submit" onClick={this.insertInvoice.bind(this)} class="btn btn-primary">Pay <Icon icon={pencil} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sale
