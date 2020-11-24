import MUIDataTable from 'mui-datatables'
import React, { Component } from 'react'
import collaborationCtrl from './collaboration.js'
import { checkSquareO } from 'react-icons-kit/fa/checkSquareO'
import { trashO } from 'react-icons-kit/fa/trashO'
import { Button, Modal } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { close } from 'react-icons-kit/fa/close'
import ErrorAlert from '../ErrorAlert'
import SuccessAlert from '../SuccessAlert'
import Swal from 'sweetalert2'
export class Collaboration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Collaborations: [],
            ID: 0,
            Name: '',
            City: '',
            Phone: '',
            Email: '',
            Description: '',
            Show: false,
            IsLoading: false,
            Submit: 'Register'
        }
    }

    handleShow = () => this.setState({ Show: true });
    handleClose = () => this.setState({ Show: false });
    handleName = event => this.setState({ Name: event.target.value })
    handleCity = event => this.setState({ City: event.target.value })
    handlePhone = event => this.setState({ Phone: event.target.value })
    handleEmail = event => this.setState({ Email: event.target.value })
    handleDescription = event => this.setState({ Description: event.target.value })

    getCollaborations = async () => {
        let result = await collaborationCtrl.getCollaborations();
        if (result) {
            this.setState({ Collaborations: result })
        }
    }

    componentDidMount = async () => {
        await this.getCollaborations();
    }

    updateModal = (id) => {
        let obj = this.state.Collaborations.find(c => c.id === id);
        this.setState({
            ID: obj.id,
            Name: obj.name,
            Phone: obj.phone,
            Email: obj.mail,
            Description: obj.description,
            City: obj.city,
            Submit: 'Update',
            Show: true
        })
    }

    deleteCollaboration = async (id) => {

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
            let response = await collaborationCtrl.deleteCollaboration(id);
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

    insertCollaboration = async event => {
        event.preventDefault();
        let obj = { ID: this.state.ID, Name: this.state.Name, Mail: this.state.Email, Phone: this.state.Phone, City: this.state.City, Description: this.state.Description };
        console.log(obj);
        let result = this.state.Submit === "Register" ?
            await collaborationCtrl.insertCollaboration(obj) : await collaborationCtrl.updateCollaboration(obj);
        if (result) {
            SuccessAlert(`${this.state.Submit} Successful`);
            window.location.reload();
            return;
        }
        ErrorAlert("Something went wrong");
    }

    render() {
        let columns = ["ID", "NAME", "CITY", "PHONE", "EMAIL", "DESCRIPTION", "UPDATE", "DELETE"];
        return (
            <div className="container-fluid mt-5">
                <div className="row justify-content-center">
                    <div className="col-sm-10">
                        <Button variant="primary" onClick={this.handleShow} style={{ width: "200px" }}>
                            Insert Collaboration <Icon icon={checkSquareO}></Icon>
                        </Button>
                        <MUIDataTable className="mt-2"
                            title="Collaboratios"
                            data={
                                this.state.Collaborations.map(c => {
                                    let array = [
                                        c.id, c.name, c.city, c.phone, c.mail, c.description,
                                        <button onClick={this.updateModal.bind(this, c.id)} className="btn btn-primary">Update <Icon icon={checkSquareO} /></button>,
                                        <button onClick={this.deleteCollaboration.bind(this, c.id)} className="btn btn-danger">Delete <Icon icon={trashO} /></button>
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
                                {`${this.state.Submit} Collaboration`}
                            </Modal.Title>
                        </Modal.Header>
                        <form id="myForm" method="post" onSubmit={this.insertCollaboration}>
                            <Modal.Body>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="Name">Name</label>
                                            <input id="Name" type="text" className="form-control" placeholder="Name"
                                                value={this.state.Name} onChange={this.handleName} />
                                        </div>

                                        <div className="col-sm-6 form-group">
                                            <label htmlFor="City">City</label>
                                            <input id="City" type="text" className="form-control" placeholder="City"
                                                value={this.state.City} onChange={this.handleCity} />
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

export default Collaboration
