import React, { useState, useEffect } from 'react'
import invCtrl from '../controller/invoice.controller'
import Mui from 'mui-datatables'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { trashO } from 'react-icons-kit/fa/trashO'
import Icon from 'react-icons-kit'
import { close } from 'react-icons-kit/fa/close'
import ErrorAlert from '../../ErrorAlert'
import SuccessAlert from '../../SuccessAlert'
import Swal from 'sweetalert2'
import { pencil } from 'react-icons-kit/fa/pencil';
import itemController from '../../item/controllers/item.controller';
import collaboration from '../../collaboration/collaboration';
import 'selectize/dist/js/standalone/selectize.js'
import 'selectize/dist/css/selectize.bootstrap3.css'
import $ from 'jquery'
import { list } from 'react-icons-kit/icomoon/list';
import 'selectize/dist/js/standalone/selectize.js'
import 'selectize/dist/css/selectize.bootstrap3.css'
import Loader from '../../helpers/loader'
const SaleList = () => {

    const [salesList, setSaleList] = useState([]);
    const [docNo,setDocNo] = useState('');
    const [posID,setPosID] = useState('');
    const [supplierID,setSupplierID] = useState('');
    const [description,setDescription] = useState('');
    const [invertoryID,setInvertoriID] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [items, setItems] = useState([]);
    const [stores, setStores] = useState([]);
    const [bodies, setBodies] = useState([]);
    const [bodyID, setBodyID] = useState('');
    const [itemID, setItemID] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [todayAmount,setTodayAmount] = useState('')
    const [allAmount,setAllAmount] = useState('')
    const [submit, setSubmit] = useState('Register');
    const [isLoading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        let result = await invCtrl.getInvoices();
        if (result) {
            let invoices = result.filter(r => r.docType.description === "FATURE SHITJE");
            setSaleList(invoices);
        }
        $('#bodies').hide();
        result = await invCtrl.getTotalSaleToday();
        setTodayAmount(result)
        result = await invCtrl.getTotalSaleAll();
        setAllAmount(result);
        await getItems();
        await getSuppliers();
        await getStores();
        setLoading(false);
    }, [])


    const getItems = async () => {
        let result = await itemController.getAll("getItems");
        if (result) {
            setItems(result);
        }
    }

    const getSuppliers = async () => {
        let result = await collaboration.getCollaborations();
        if (result) {
            setSuppliers(result)
        }
    }

    const getStores = async () => {
        let result = await collaboration.getPoss();
        if (result) {
            setStores(result);
        }
    }

    const updateModal = (obj) => {
        setDocNo(obj.docNo);
        setSupplierID(obj.supplierID);
        setPosID(obj.posID);
        setDescription(obj.description);
        setInvertoriID(obj.invertoryID)
    }

    const updateInvoice = async () => {
        let obj = {InvertoryID:invertoryID,DocNo:docNo,DocTypeID:2,SupplierID:supplierID,PosID:posID,Description:description};
        let result = await invCtrl.updateInvoice(obj,"updateInvoice");
        if (result) {
            SuccessAlert('Update Successful');
            window.location.reload();
        } else {
            ErrorAlert("Something went wrong");
        }
    }

    const getBodies = async (id) => {
        setInvertoriID(id);
        let result = await invCtrl.getInvoicesBody(id);
        if (result) {
            setBodies(result);
            $('#invoices').hide();
            $('#bodies').show();
        }else{
            ErrorAlert("Does not have Items")
        }
    }

    const deleteInvoice = async (id) => {
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
            let result = await invCtrl.deleteInvoice(id, "deleteInvoice");
            if (result) {
                SuccessAlert('Delete Successful');
                window.location.reload();
            } else {
                ErrorAlert("Something went wrong");
            }
        }
    }

    const updateInvoiceBody = (id) => {
        let obj = bodies.find(b => b.id === id);
        if(obj){
            setBodyID(obj.id);
            setItemID(obj.item.id);
            setPrice(obj.price);
            setQuantity(obj.quantity);
            setDiscount(obj.discount);
            setSubmit('Update');
        }
    }

    const deleteInvoiceBody = async (id) => {
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
            let response = await invCtrl.deleteInvoice(id, "deleteInvoiceBody");
            setBodies(bodies.filter(b => b.id !== id));
            if (response) {
                Swal.fire(
                    'Deleted!',
                    'Change has been deleted.',
                    'success'
                );
                if(bodies.length === 0){
                    window.location.reload();
                }
            } else {
                ErrorAlert(response.Error);
            }
        }
    }

    const showhide = (bool) => {
        if(bool){
            $('#invoices').show();
            $('#bodies').hide();
        }else{
            $('#invoices').hide();
            $('#bodies').show();
        }
    }

    const insertBody = async () => {
        let id = await invCtrl.getInvoicesMaxID("getInvoicesBodyMaxID");
        let obj = {ID:id,HeaderID:invertoryID,ItemID:itemID,Quantity:quantity,Price:price,Discount:discount};
        console.log(obj);
        let result = submit === "Register" ? 
            await invCtrl.insertInvoice(obj,"insertInvoiceBody") : await invCtrl.updateInvoice(obj,"updateInvoiceBody");
        if(result){
            let invoicebody = {id:id,headerid:invertoryID,
                item:{id:itemID,name:$('#itemSelect option:selected').text()},price:price,quantity:quantity,discount:discount};
            if(submit === "Update"){
                bodies.forEach(element => {
                    if(element.id === bodyID){
                        element.item.id = invoicebody.item.id;
                        element.price = invoicebody.price;
                        element.quantity = invoicebody.quantity;
                        element.discount = invoicebody.discount;
                    }
                })
            }else{
                bodies.push({id:id,headerid:invertoryID,
                    item:{id:itemID,name:$('#itemSelect option:selected').text()},price:price,quantity:quantity,discount:discount});
            }
            SuccessAlert("Register Successful");
            deleteData();
            $("[data-dismiss=modal]").trigger({type:"click"})
        }else{
            ErrorAlert('sss')
        }
    }

    const deleteData = () => {
        setItemID('');
        setPrice('');
        setQuantity('');
        setDiscount('');
        $("[data-dismiss=modal]").trigger({ type: "click" })
    }

    const getTodayInvoices = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    }

    if(isLoading){
        return <Loader />
    }
    if (salesList.length > 0) {
        return (
            <div className="container-fluid">
                <div className="row" id="invoices">
                    <div className="col-sm-12 mb-3">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px 5px grey'}}>
                                        <p className="text-center text-muted lead">Today Invoices Count</p>
                                        <p className="text-center">{salesList.filter(sl => sl.docDate.toString().split('T')[0] === new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0')).length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px  5px grey'}}>
                                        <p className="text-center text-muted lead">Today Invoices Amount</p>
                                        <p className="text-center">{todayAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &euro;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px  5px grey'}}>
                                        <p className="text-center text-muted lead">All Invoices Count</p>
                                        <p className="text-center">{salesList.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-body" style={{'box-shadow': '5px 5px  5px grey'}}>
                                        <p className="text-center text-muted lead">All Invoices Amount</p>
                                        <p className="text-center">{allAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &euro;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <Mui
                            title="Sale's List"
                            data={
                                salesList.map(i => {
                                    let array = [
                                        <button onClick={updateModal.bind(this,i)} data-toggle="modal" data-target="#myModal" className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                        i.docNo, i.docType.description, i.pos.name, i.supplier.name, i.docDate.toString().split('T')[0], i.description,
                                        <button onClick={getBodies.bind(this,i.invertoryID)} className="btn btn-secondary"><Icon icon={list} /></button>,
                                        <button onClick={deleteInvoice.bind(this, i.invertoryID)} className="btn btn-danger"><Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={["Update", "Invoice Number", "Invoice Type", "Store", "Supplier", "Date", "Description", "Items", "Delete"]}
                        />
                    </div>
                </div>
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
                                            <input value={docNo} onChange={(e) => setDocNo(e.target.value)} type="text" className="form-control" placeholder="Invoice Number" required/>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="City">Supplier</label>
                                            <select className="form-control" value={supplierID} onChange={(e) => setSupplierID(e.target.value)}>
                                                <option value="9">Klient</option>
                                                {
                                                    suppliers.map(it => {
                                                        return (
                                                            <option value={it.id}>{it.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="store">Store</label>
                                            <select className="form-control" value={posID} onChange={(e) => setPosID(e.target.value)}>
                                                {
                                                    stores.map(it => {
                                                        return (
                                                            <option value={it.id}>{it.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Name">Description</label>
                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" required/>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close <Icon icon={close} /></button>
                                    <button type="submit" onClick={updateInvoice.bind(this)} class="btn btn-primary">Update <Icon icon={pencil} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="row" id="bodies">
                    <div className="col-sm-12">
                        <button className="btn btn-primary mr-3 mb-2" onClick={showhide.bind(this,true)}><Icon icon={list} />  Invoice List</button>
                        <button type="button" class="btn btn-primary mb-2" data-toggle="modal" data-target="#insertBody" style={{ width: "200px" }}>
                            Insert Body <Icon icon={checkSquareO}></Icon>
                        </button>
                        <Mui 
                            title = "Invoice Body"
                            data = {
                                bodies.map(ib => {
                                    let array = [
                                        <button onClick={updateInvoiceBody.bind(this, ib.id)} data-toggle="modal" data-target="#insertBody" className="btn btn-secondary"><Icon icon={pencil} /></button>,
                                        ib.item.name, ib.price, ib.quantity, ib.discount,
                                        <button onClick={deleteInvoiceBody.bind(this, ib.id)} className="btn btn-danger"><Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={["Update", "Item", "Price", "Quantity", "Discount", "Delete"]}
                        />
                    </div>
                </div>

                <div className="row">
                        <div class="modal fade modal-center" id="insertBody">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4 class="modal-title">{submit} Invoice Body</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div class="modal-body">
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Item">Item</label>
                                                <select value={itemID} onChange={(e) => setItemID(e.target.value)} id="itemSelect" className="form-control">
                                                    <option value="">Not Selected</option>
                                                    {
                                                        items.map(it => {
                                                            return (
                                                                <option value={it.id}>{it.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Price">Price</label>
                                                <input type="text" className="form-control" placeholder="$" required
                                                    value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Quantity">Quantity</label>
                                                <input type="text" className="form-control" placeholder="Quantity" required
                                                    value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Discount">Discount</label>
                                                <input type="text" className="form-control" placeholder="Discount" required
                                                    value={discount} onChange={(e) => setDiscount(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" onClick={deleteData.bind(this)} class="btn btn-danger">Close <Icon icon={close} /></button>
                                        <button type="submit" onClick={insertBody.bind(this)} class="btn btn-primary">{submit} <Icon icon={pencil} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default SaleList
