import docCtrl from '../controllers/docs.controller'
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

export class Docs extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Docs: [],
            ID:0,
            Name: '',
            Description: '',
            Show:false,
            Submit:'Register'
        }
    }

    handleClose = () => this.setState({Show:false,Name:'',Description:'',Submit:'Register'});
    handleShow = () => this.setState({Show:true});


    handleName = event => this.setState({ Name: event.target.value });
    handleDescription = event => this.setState({ Description: event.target.value });

    
    getDocs = async () => {
        let result = await docCtrl.getDocs();
        if (result) {
            this.setState({ Docs: result });
        }
    }

    
    componentDidMount = async () => {
        await this.getDocs();
    }
    updateModal = (id) =>{
        let doc = this.state.Docs.find(i => i.id === id); 
        this.setState({
            ID:doc.id,
            Name:doc.name,
            Description:doc.description,
            Show:true,
            Submit:'Update'
        })
    }
    deleteDoc = async (id) => {
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
            let response = await docCtrl.delete("deleteDoc",id);
            if(response){
                Swal.fire(
                  'Deleted!',
                  'Document Type has been deleted.',
                  'success'
                );
                window.location.reload();
            }else{
                ErrorAlert(response.Error);
            }
        }
    }



    insertDocType = async event => {
        event.preventDefault();
        let obj = {Code:this.state.Name,Description:this.state.Description};
        let result = await docCtrl.insertDoc(obj);
        if(result === true){
            SuccessAlert("Register Successful");
        }else{
            ErrorAlert("Something went wrong");
        }
    }


    render() {
        let columns = ["ID", "Name", "Description", "Update", "Delete"]
        return (
            <div className="container-fluid" style={{ marginTop: "30px" }}>
                <div className="row">
                    <div className="col-sm-12">
                        <Button variant="primary" onClick={this.handleShow} style={{width: "200px"}}>
                            Insert Doc Type <Icon icon={checkSquareO}></Icon>
                        </Button>
                        <MUI
                            title="DOC Types"
                            data={
                                this.state.Docs.map(d => {
                                    let array = [
                                        d.docTypeID, d.code, d.description,
                                        <button className="btn btn-primary" onClick={this.updateModal.bind(this,u.id)} >Update <Icon icon={checkSquareO}/></button>,
                                        <button className="btn btn-danger" onClick={deleteDoc.bind(this,u.id)} >Delete <Icon icon={trashO}/></button>
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
                                        `${this.state.Submit} Doc Type`
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.insertDocType}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12 form-group">
                                                <label>Doc Type Name</label>
                                                <input type="text" placeholder="Doc Name" className="form-control"
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

export default Docs
