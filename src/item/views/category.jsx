
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
import catCtrl from '../controllers/item.controller'

export class Category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Docs: [],
            Name: '',
            Description: '',
            Show:false,
            Submit:'Register'
        }
    }
    handleClose = () => this.setState({Show:false});
    handleShow = () => this.setState({Show:true});
    handleName = event => this.setState({ Name: event.target.value });
    handleDescription = event => this.setState({ Description: event.target.value });




    getCategories = async () =>{
        let result = await catCtrl.getAll("getCategoires")
    }

    componentDidMount = async () => {
        await this.getCategories();
    }

    insertCategoryType = async event => {
        event.preventDefault();
        let obj = {Code:this.state.Name,Description:this.state.Description};
        let result = await catCtrl.insert(obj);
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
                            title="Item Category"
                            data={
                                this.state.Docs.map(d => {
                                    let array = [
                                        d.docTypeID, d.code, d.description,
                                        <button>Update</button>,
                                        <button>Delete</button>
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
                                        `${this.state.Submit} Item Category`
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.insert}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12 form-group">
                                                <label>Category Name</label>
                                                <input type="text" placeholder="Category Name" className="form-control"
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


export default Category
