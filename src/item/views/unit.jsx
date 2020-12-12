import MUI from 'mui-datatables'
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
import unitCtrl from '../controllers/item.controller';
export class Unit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ItemUnits: [],
            ID: 0,
            Name: '',
            Description: '',
            Show: false,
            Submit: 'Register'
        }
    }
    
    handleClose = () => this.setState({ Show: false });
    handleShow = () => this.setState({ Show: true });
    handleName = event => this.setState({ Name: event.target.value });
    handleDescription = event => this.setState({ Description: event.target.value });

    getUnits = async () => {
        let result = await unitCtrl.getAll("getUnits")
        if (result) {
            this.setState({ ItemUnits: result })
        }
    }

    componentDidMount = async () => {
        await this.getUnits();
    }


    updateModal = (id) => {
        let unit = this.state.ItemUnits.find(i => i.id === id);
        this.setState({
            ID: unit.id,
            Name: unit.name,
            Description: unit.description,
            Show: true,
            Submit: 'Update'
        })
    }

    deleteUnit = async (id) => {

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

            let response = await unitCtrl.delete("deletUnit", id);
            if (response) {
                Swal.fire(
                    'Deleted!',
                    'Unit has been deleted.',
                    'success'
                );
                window.location.reload();
            } else {
                ErrorAlert(response.Error);
            }
        }
    }

    insertUnitType = async event => {
        event.preventDefault();
        let obj = {ID:this.state.ID,Name:this.state.Name,Description:this.state.Description };
        let result = this.state.Submit === "Register" ?
             await unitCtrl.insert("insertUnit", obj) : await unitCtrl.update("updateUnit",obj);
        if (result === true) {
            SuccessAlert("Register Successful");
            window.location.reload();
        } else {
            ErrorAlert("Something went wrong");
        }

    }
    render() {
        let columns = ["ID", "Name", "Description", "Update", "Delete"]
        return (
            <div className="container" style={{ marginTop: "30px" }}>

                <div className="row">
                    <div className="col-sm-12">
                        <Button variant="primary" onClick={this.handleShow} style={{ width: "200px" }}>
                            Insert Item Type <Icon icon={checkSquareO}></Icon>
                        </Button>
                        <MUI className="mt-2"
                            title="Item Units"
                            data={
                                this.state.ItemUnits.map(u => {
                                    let array = [
                                        u.id, u.name, u.description,

                                        <button className="btn btn-primary" onClick={this.updateModal.bind(this, u.id)} >Update <Icon icon={checkSquareO} /></button>,//qitu ja jepum idn ne parameter
                                        <button className="btn btn-danger" onClick={this.deleteUnit.bind(this, u.id)} >Delete <Icon icon={trashO} /></button> // edhe qito ikonat i mer copy shtoja tash qito edhe tjerave qe i bone categoris types edhe docs veq kqyri metodat anej ne api
                                    ]
                                    return array;
                                })
                            }
                            columns={columns}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <Modal show={this.state.Show} onHide={this.handleClose}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {
                                        `${this.state.Submit} Unit Type`
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.insertUnitType}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12 form-group">
                                                <label>Unit Name</label>
                                                <input type="text" placeholder="Type Name" className="form-control"
                                                    onChange={this.handleName} value={this.state.Name} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <textarea rows="7" className="form-control" placeholder="Description"
                                                    onChange={this.handleDescription} value={this.state.Description} >

                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button id="submit" type="submit" className="float-left btn btn-primary">{this.state.Submit} <Icon icon={checkSquareO}></Icon></button>
                                    <Button className="btn btn-danger" onClick={this.handleClose}>Close <Icon icon={close} style={{ marginTop: "-10px" }}></Icon></Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                </div>

            </div>
        )

    }

}

export default Unit