import MUIDataTable from 'mui-datatables';
import React, { Component } from 'react'
import collaboration from './collaboration'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { trashO } from 'react-icons-kit/fa/trashO'
import { Button, Modal } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { close } from 'react-icons-kit/fa/close'
import ErrorAlert from '../ErrorAlert'
import SuccessAlert from '../SuccessAlert'
import Swal from 'sweetalert2'
import { pencil } from 'react-icons-kit/fa/pencil';
import Loader from '../helpers/loader';
export class EmployeePos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Data: [],
            EmployeeID: 0,
            Employees: [],
            StoreHouseID: 0,
            StoreHouses: [],
            Description: '',
            Show: false,
            IsLoading: false,
            Submit: 'Register'
        }
    }

    handleShow = () => this.setState({ Show: true });
    handleClose = () => this.setState({ Show: false,EmployeeID:0,StoreHouseID:0,Submit:'Register',Description:''});
    handleEmployee = event => this.setState({ EmployeeID: event.target.value });
    handleStoreHouse = event => this.setState({ StoreHouseID: event.target.value });
    handleDescription = event => this.setState({Description:event.target.value});

    getData = async () => {
        let result = await collaboration.getEPs();
        console.log(result);
        if (result) {
            this.setState({ Data: result });
        }
    }

    getEmployees = async () => {
        let result = await collaboration.getEmployees();
        if (result) {
            this.setState({ Employees: result });
        }
    }

    getStoreHouses = async () => {
        let result = await collaboration.getPoss();
        if (result) {
            this.setState({ StoreHouses: result });
        }
    }

    componentDidMount = async () => {
        this.setState({IsLoading:true})
        await this.getData();
        await this.getEmployees();
        await this.getStoreHouses();
        this.setState({IsLoading:false})
    }

    updateModal = (id) => {
        let obj = this.state.Data.find(d => d.id === id);
        if (obj) {
            this.setState({
                ID: obj.id,
                Description: obj.description,
                EmployeeID: obj.employeeID,
                StoreHouseID: obj.posID,
                Submit: 'Update',
                Show: true
            })
        }
    }

    deleteEmployeePos = async (id) => {
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
            let response = await collaboration.deleteEp(id);
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

    insertEP = async event => {
        event.preventDefault();
        let obj = {ID:this.state.ID,EmployeeID: this.state.EmployeeID, PosID: this.state.StoreHouseID, Description: this.state.Description };
        let result = this.state.Submit === "Register" ?
            await collaboration.insertEP(obj) : await collaboration.updateEP(obj);
        if (result) {
            SuccessAlert(`${this.state.Submit} Successful`);
            window.location.reload();
            this.setState({ Submit: 'Register' })
            return;
        }
        ErrorAlert("Something Went Wrong")
    }

    render() {
        let cols = ["ID", "EMPLOYEE NAME", "STORE HOUSE", "DESCRIPTION", "UPDATE", "DELETE"]
        if(this.state.IsLoading){
            return <Loader />
        }
        return (
            <div className="container-fluid mt-5">
                <div className="row justify-content-center">
                    <div className="col-sm-10">
                        <Button variant="primary" onClick={this.handleShow} style={{ width: "300px" }}>
                            Insert Employee & Store House <Icon icon={checkSquareO}></Icon>
                        </Button>
                        <MUIDataTable className="mt-2"
                            title="Employee & Store House"
                            data={
                                this.state.Data.map(d => {
                                    let array = [
                                        d.id, d.employee.name, d.pos.name, d.description,
                                        <button onClick={this.updateModal.bind(this, d.id)} className="btn btn-primary">Update <Icon icon={pencil} /></button>,
                                        <button onClick={this.deleteEmployeePos.bind(this, d.id)} className="btn btn-danger">Delete <Icon icon={trashO} /></button>
                                    ]
                                    return array;
                                })
                            }
                            columns={cols}
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
                                {`${this.state.Submit} Employee & Store House`}
                            </Modal.Title>
                        </Modal.Header>
                        <form id="myForm" method="post" onSubmit={this.insertEP}>
                            <Modal.Body>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Employee">Employee</label>
                                            <select className="form-control" value={this.state.EmployeeID} onChange={this.handleEmployee} >
                                                <option value="0">Not Selected</option>
                                                {
                                                    this.state.Employees.map(e => {
                                                        return (
                                                            <option value={e.id}>{e.name} {e.surname}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Store">Store House</label>
                                            <select className="form-control" value={this.state.StoreHouseID} onChange={this.handleStoreHouse} >
                                                <option value="0">Not Selected</option>
                                                {
                                                    this.state.StoreHouses.map(e => {
                                                        return (
                                                            <option value={e.id}>{e.name} {e.city}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea rows="7" id="description" type="text" className="form-control" placeholder="Description"
                                                value={this.state.Description} onChange={this.handleDescription} />
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
        )
    }
}

export default EmployeePos
