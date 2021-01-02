import React, { Component } from 'react'
import itemCtrl from '../controllers/item.controller'
import Mui from 'mui-datatables'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { trashO } from 'react-icons-kit/fa/trashO'
import { Button, Modal } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { close } from 'react-icons-kit/fa/close'
import ErrorAlert from '../../ErrorAlert'
import SuccessAlert from '../../SuccessAlert'
import Swal from 'sweetalert2'
import collaboration from '../../collaboration/collaboration.js'
import Loader from '../../helpers/loader'
export class Item extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Items: [],
            ID: '',
            Barcode: '',
            Name: '',
            UnitID: 0,
            Units: [],
            CategoryId: 0,
            Categories: [],
            TypeID: 0,
            Types: [],
            SupplierID: 0,
            Suppliers: [],
            Active: 'true',
            PurchasePrice: '',
            SalePrice: '',
            Description: '',
            StockQuantity: '',
            Submit: 'Register',
            IsLoading: false,
            Show: false
        }
    }

    handleShow = () => this.setState({ Show: true });
    handleClose = () => this.setState({ Show: false, Barcode: '', Name: '', UnitID: 0, CategoryId: 0, TypeID: 0, SupplierID: 0, PurchasePrice: '', SalePrice: '', Description: '', StockQuantity: '', Submit: 'Register' });
    handleBarcode = event => this.setState({ Barcode: event.target.value });
    handleName = event => this.setState({ Name: event.target.value });
    handleUnit = event => this.setState({ UnitID: event.target.value });
    handleCategory = event => this.setState({ CategoryId: event.target.value });
    handleType = event => this.setState({ TypeID: event.target.value });
    handleSupplier = event => this.setState({ SupplierID: event.target.value });
    handleActive = event => this.setState({ Active: event.target.value });
    handlePurchasePrice = event => this.setState({ PurchasePrice: event.target.value });
    handleSalePrice = event => this.setState({ SalePrice: event.target.value });
    handledDescription = event => this.setState({ Description: event.target.value });
    handledStockQuantity = event => this.setState({ StockQuantity: event.target.value });

    getSuppliers = async () => {
        let result = await collaboration.getCollaborations();
        if (result) {
            this.setState({ Suppliers: result });
        }
    }

    getItems = async (method) => {
        let result = await itemCtrl.getAll(method);
        if (result) {
            switch (method) {
                case "getItems":
                    this.setState({ Items: result });
                    break;
                case "getCategoires":
                    this.setState({ Categories: result });
                    break;
                case "getUnits":
                    this.setState({ Units: result });
                    break;
                case "getTypes":
                    this.setState({ Types: result });
                    break;
            }
        }
    }

    componentDidMount = async () => {
        this.setState({IsLoading:true})
        await this.getItems('getItems');
        await this.getItems('getCategoires');
        await this.getItems('getUnits');
        await this.getItems('getTypes');
        await this.getSuppliers();
        this.setState({IsLoading:false})
    }

    updateModal = (id) => {
        let item = this.state.Items.find(i => i.id === id);
        this.setState({
            ID: item.id,
            Barcode: item.barcode,
            Name: item.name,
            CategoryId: item.categoryId,
            UnitID: item.unitID,
            TypeID: item.typeID,
            SupplierID: item.supplierID,
            Active: item.active,
            PurchasePrice: item.purchasePrice,
            SalePrice: item.salePrice,
            Description: item.description,
            StockQuantity: item.stockQuantity,
            Show: true,
            Submit: 'Update'
        })
    }

    deleteItem = async (barcode) => {
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
            let response = await itemCtrl.delete("deleteItem", barcode);
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

    insertItem = async event => {
        event.preventDefault();
        alert('ss')
        let obj = {
            ID: this.state.ID, Barcode: this.state.Barcode, Name: this.state.Name, UnitID: this.state.UnitID, CategoryId: this.state.CategoryId, TypeID: this.state.TypeID, SupplierID: this.state.SupplierID,
            Active: this.state.Active, PurchasePrice: this.state.PurchasePrice, SalePrice: this.state.SalePrice, StockQuantity: this.state.StockQuantity, Description: this.state.Description
        };
        let result = this.state.Submit === "Register" ?
            await itemCtrl.insert("insertItem", obj) : await itemCtrl.update("updateItem", obj);
        if (result) {
            SuccessAlert(`${this.state.Submit} Successful`);
            window.location = "";
            this.setState({ Submit: 'Register' })
            return;
        }
        ErrorAlert("Something Went Wrong")
    }


    render() {
        let cols = ["Barcode", "Name", "Pruchase Price", "Sale Price", "Category", "Unit", "Type", "Supplier", "Description", "Update", "Delete"]
        if(this.state.IsLoading){
            return <Loader />
        }
        return (
            <div className="container-fluid">

                <div className="row justify-content-center" style={{ marginTop: "30px" }}>
                    <div className="col-sm-12">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" style={{ width: "200px" }}>
                            Insert Item <Icon icon={checkSquareO}></Icon>
                        </button>
                        <Mui className="mt-1"
                            title="Items"
                            data={
                                this.state.Items.map(i => {
                                    const array = [
                                        i.barcode, i.name, i.purchasePrice, i.salePrice, i.category.name, i.unit.name, i.type.name, i.supplier.name, i.description,
                                        <button onClick={this.updateModal.bind(this, i.id)} data-toggle="modal" data-target="#myModal" className="btn btn-primary">Update <Icon icon={checkSquareO} /></button>,
                                        <button onClick={this.deleteItem.bind(this, i.barcode)} className="btn btn-danger">Delete <Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={cols}
                        />
                    </div>
                </div>

                <div className="row">
                    <div class="modal fade" id="myModal">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    {`${this.state.Submit} Item`}
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <form id="myForm" method="post" onSubmit={this.insertItem}>
                                    <div class="modal-body">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="barcode">Barcode</label>
                                                    <input id="barcode" type="text" className="form-control" placeholder="Barcode"
                                                        value={this.state.Barcode} onChange={this.handleBarcode} />
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Name">Name</label>
                                                    <input id="Name" type="text" className="form-control" placeholder="Name"
                                                        value={this.state.Name} onChange={this.handleName} />
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Categories">Categories</label>
                                                    <select className="form-control" value={this.state.CategoryId} onChange={this.handleCategory}>
                                                        <option value="0">Not selected</option>
                                                        {
                                                            this.state.Categories.map(c => {
                                                                return (
                                                                    <option value={c.id}>{c.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Types">Types</label>
                                                    <select className="form-control" value={this.state.TypeID} onChange={this.handleType}>
                                                        <option value="0">Not selected</option>
                                                        {
                                                            this.state.Types.map(emp => {
                                                                return (
                                                                    <option value={emp.id}>{emp.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Units">Units</label>
                                                    <select className="form-control" value={this.state.UnitID} onChange={this.handleUnit}>
                                                        <option value="0">Not selected</option>
                                                        {
                                                            this.state.Units.map(emp => {
                                                                return (
                                                                    <option value={emp.id}>{emp.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Suppliers">Suppliers</label>
                                                    <select className="form-control" value={this.state.SupplierID} onChange={this.handleSupplier}>
                                                        <option value="0">Not selected</option>
                                                        {
                                                            this.state.Suppliers.map(emp => {
                                                                return (
                                                                    <option value={emp.id}>{emp.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Active">Active</label>
                                                    <select className="form-control" value={this.state.Active} onChange={this.handleActive}>
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="purchase">Purchase Price</label>
                                                    <input id="purchase" type="text" className="form-control" placeholder="Purchase Price"
                                                        value={this.state.PurchasePrice} onChange={this.handlePurchasePrice} />
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Sale">Sale Price</label>
                                                    <input id="Sale" type="text" className="form-control" placeholder="Sale Price"
                                                        value={this.state.SalePrice} onChange={this.handleSalePrice} />
                                                </div>
                                                <div className="col-sm-4 form-group">
                                                    <label htmlFor="Stock">Stock Quantity</label>
                                                    <input id="Stock" type="text" className="form-control" placeholder="Stock Quantity"
                                                        value={this.state.StockQuantity} onChange={this.handledStockQuantity} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 form-group">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea rows="7" id="description" type="text" className="form-control" placeholder="Description"
                                                        value={this.state.Description} onChange={this.handledDescription} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button id="submit" type="submit" className="float-left btn btn-primary">{this.state.Submit} <Icon icon={checkSquareO}></Icon></button>
                                        <button className="btn btn-danger" data-dismiss="modal">Close <Icon icon={close} style={{ marginTop: "-10px" }}></Icon></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item
