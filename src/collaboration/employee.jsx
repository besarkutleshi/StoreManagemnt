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
import Loader from '../helpers/loader';
export class Employee extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Employees: [],
            ID: 0,
            Name: '',
            Surname: '',
            Phone: '',
            Email: '',
            Street: '',
            City: '',
            PostalCode: '',
            Country: '',
            Submit: 'Register',
            Description: '',
            Show: false,
            IsLoading: false
        }
    }

    handleShow = () => this.setState({ Show: true });
    handleClose = () => this.setState({ Show: false,Name:'',Surname:'',Phone:'',Email:'',Street:'',City:'',PostalCode:'',Country:'',Submit:'Register'});
    
    handleName = event => this.setState({ Name: event.target.value });
    handleSurname = event => this.setState({ Surname: event.target.value });
    handlePhone = event => this.setState({ Phone: event.target.value });
    handleEmail = event => this.setState({ Email: event.target.value });
    handleStreet = event => this.setState({ Street: event.target.value });
    handleCity = event => this.setState({ City: event.target.value });
    handlePostalCode = event => this.setState({ PostalCode: event.target.value });
    handleCountry = event => this.setState({ Country: event.target.value });
    handleDescription = event => this.setState({ Description: event.target.value });


    getEmployees = async () => {
        let result = await collaboration.getEmployees();
        if (result) {
            this.setState({ Employees: result });
        }
    }

    componentDidMount = async () => {
        this.setState({IsLoading:true})
        await this.getEmployees();
        this.setState({IsLoading:false})
    }

    updateModal = (id) => {
        let obj = this.state.Employees.find(e => e.id === id);
        this.setState({
            ID: obj.id,
            Name: obj.name,
            Surname: obj.surname,
            Email: obj.email,
            Phone: obj.phone,
            Street: obj.address.street,
            City: obj.address.city,
            Country: obj.address.country,
            PostalCode: obj.address.postalCode,
            Submit: 'Update',
            Show: true
        })
    }

    deleteEmployee = async (id) => {
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
            let response = await collaboration.deleteEmployee(id);
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

    insertEmployee = async event => {
        event.preventDefault();
        let address = { Street: this.state.Street, City: this.state.City, Country: this.state.Country, PostalCode: this.state.PostalCode };
        let obj = { ID: this.state.ID, Name: this.state.Name, Surname: this.state.Surname, Email: this.state.Email, Phone: this.state.Phone, Address: address };
        let result = this.state.Submit === "Register" ?
            await collaboration.insertEmployee(obj) : await collaboration.updateEmployee(obj);
        if (result) {
            SuccessAlert(`${this.state.Submit} Successful`);
            window.location.reload();
            this.setState({ Submit: 'Register' })
            return;
        }
        ErrorAlert("Something Went Wrong")
    }


    render() {
        let columns = ["ID", "NAME", "SURNAME", "EMAIL", "PHONE", "COUNTRY", "CITY", "STREET", "POSTAL CODE", "UPDATE", "DELETE"]
        if(this.state.IsLoading){
            return <Loader />
        }
        return (
            <div className="container-fluid mt-5">
                <div className="row justify-content-around">
                    <div className="col-sm-12">
                        <Button variant="primary" onClick={this.handleShow} style={{ width: "200px" }}>
                            Insert Employee <Icon icon={checkSquareO}></Icon>
                        </Button>
                        <MUIDataTable className="mt-2"
                            title="Employees"
                            data={
                                this.state.Employees.map(e => {
                                    let array = [
                                        e.id, e.name, e.surname, e.email, e.phone, e.address.country, e.address.city, e.address.street, e.address.postalCode,
                                        <button onClick={this.updateModal.bind(this, e.id)} className="btn btn-primary">Update <Icon icon={checkSquareO} /></button>,
                                        <button onClick={this.deleteEmployee.bind(this, e.id)} className="btn btn-danger">Delete <Icon icon={trashO} /></button>
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
                        <form id="myForm" method="post" onSubmit={this.insertEmployee}>
                            <Modal.Body>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Name">Name</label>
                                            <input id="Name" type="text" className="form-control" placeholder="Name"
                                                value={this.state.Name} onChange={this.handleName} />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Surname">Surname</label>
                                            <input id="Surname" type="text" className="form-control" placeholder="Surname"
                                                value={this.state.Surname} onChange={this.handleSurname} />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Phone">Phone</label>
                                            <input id="Phone" type="text" className="form-control" placeholder="Phone"
                                                value={this.state.Phone} onChange={this.handlePhone} />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Email">Email</label>
                                            <input id="Email" type="text" className="form-control" placeholder="Email"
                                                value={this.state.Email} onChange={this.handleEmail} />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Street">Street</label>
                                            <input id="Street" type="text" className="form-control" placeholder="Street"
                                                value={this.state.Street} onChange={this.handleStreet} />
                                        </div>

                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="City">City</label>
                                            <input id="City" type="text" className="form-control" placeholder="City"
                                                value={this.state.City} onChange={this.handleCity} />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Country">Country</label>
                                            <input id="Country" type="text" className="form-control" placeholder="Country"
                                                value={this.state.Country} onChange={this.handleCountry} />
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Postal">Postal Code</label>
                                            <input id="Postal" type="text" className="form-control" placeholder="Postal Code"
                                                value={this.state.PostalCode} onChange={this.handlePostalCode} />
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

export default Employee
