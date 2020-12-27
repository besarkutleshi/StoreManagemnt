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

export class StoreHouse extends Component {

    constructor(props) {
        super(props)

        this.state = {
            StoreHouses: [],
            ID: 0,
            Name: '',
            City: '',
            Phone: '',
            Description: '',
            Submit: 'Register',
            IsLoading: false,
            Show: false
        }
    }

    
    handleShow = () => this.setState({Show:true});
    handleClose = () => this.setState({Show:false,Name:'',City:'',Phone:'',Description:'',Submit:'Register'});
    handleName = event => this.setState({Name:event.target.value});
    handleCity = event => this.setState({City:event.target.value});
    handlePhone = event => this.setState({Phone:event.target.value});
    handleDescription = event => this.setState({Description:event.target.value});

    getPos = async () => {
        let result = await collaboration.getPoss();
        if (result) {
            this.setState({ StoreHouses: result })
        }
    }

    componentDidMount = async () => {
        await this.getPos();
    }

    updateModal = (id) => {
        let obj = this.state.StoreHouses.find(st => st.id === id);
        this.setState({
            ID:obj.id,
            Name:obj.name,
            City:obj.city,
            Phone:obj.phone,
            Description:obj.description,
            Submit:'Update',
            Show:true
        })
    }

    deleteStoreHouse = async (id) => {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if(result.isConfirmed){
            let response = await collaboration.deletePos(id);
            if(response){
                Swal.fire(
                  'Deleted!',
                  'Change has been deleted.',
                  'success'
                );
                window.location.reload();
            }else{
                ErrorAlert(response.Error);
            }
        }
    }

    insertStoreHouse = async event => {
        event.preventDefault();
        let obj = { ID: this.state.ID, Name: this.state.Name, City: this.state.City,Phone:this.state.Phone,Description: this.state.Description };
        let result = this.state.Submit === "Register" ?
            await collaboration.insertPos(obj) : await collaboration.updatePos(obj);
        if (result) {
            SuccessAlert(`${this.state.Submit} Successful`);
            window.location.reload();
            this.setState({ Submit: 'Register' })
            return;
        }
        ErrorAlert("Something Went Wrong")
    }

    render() {
        let columns = ["ID", "NAME", "CITY", "PHONE", "DESCRIPTION", "UPDATE", "DELETE"]
        return (
            <div className="container-fluid mt-5">
                <div class="row justify-content-center">
                    <div className="col-sm-10">
                        <Button variant="primary" onClick={this.handleShow} style={{width: "200px"}}>
                            Insert Employee <Icon icon={checkSquareO}></Icon>
                        </Button>
                        <MUIDataTable className="mt-2"
                            title="Store Houses"
                            data={
                                this.state.StoreHouses.map(st => {
                                    const array = [
                                        st.id, st.name, st.city,st.phone, st.description,
                                        <button onClick={this.updateModal.bind(this, st.id)} className="btn btn-primary">Update <Icon icon={pencil} /></button>,
                                        <button onClick={this.deleteStoreHouse.bind(this, st.id)} className="btn btn-danger">Delete <Icon icon={trashO} /></button>
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
                            <form id="myForm" method="post" onSubmit={this.insertStoreHouse}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Name">Name</label>
                                                <input id="Name" type="text" className="form-control" placeholder="Name" required
                                                    value={this.state.Name} onChange={this.handleName} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="Phone">Phone</label>
                                                <input id="Phone" type="text" className="form-control" placeholder="Phone" required
                                                    value={this.state.Phone} onChange={this.handlePhone} />
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <label htmlFor="City">City</label>
                                                <input id="City" type="text" className="form-control" placeholder="City" required
                                                    value={this.state.City} onChange={this.handleCity} />
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
                                    <Button className="btn btn-danger" onClick={this.handleClose}>Close <Icon icon={close} style={{marginTop:"-10px"}}></Icon></Button>
                                </Modal.Footer>
                            </form>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default StoreHouse
