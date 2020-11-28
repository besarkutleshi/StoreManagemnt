
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
import catCtrl from '../controllers/item.controller';


    export class Unit extends Component {
        constructor(props) {
            super(props)
    
            this.state = {
                ItemUnits: [],
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

        getUnits = async () =>{
            let result = await catCtrl.getAll("getUnits")
            if(result){
                this.setState({ItemUnit:result})
            }
        }
    
        componentDidMount = async () => {
            await this.getUnits();
        }
        insertUnitType = async event => {
            event.preventDefault();
            let obj = {Name:this.state.Name,Description:this.state.Description};
            let result = await catCtrl.insert("insertUnit",obj);
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
                                Insert Item Type <Icon icon={checkSquareO}></Icon>
                            </Button>
                            <MUI
                                title="Item Units"
                                data={
                                    this.state.ItemUnits.map(u => {
                                        let array = [ 
                                            u.id, u.name, u.description,
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