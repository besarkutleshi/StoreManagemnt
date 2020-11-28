
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

export class Type extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ItemTypes: [],
            ID:0,
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




    getTypes = async () =>{
        let result = await catCtrl.getAll("getTypes")
        if(result){
            this.setState({ItemTypes:result})
        }
    }

    componentDidMount = async () => {
        await this.getTypes();
    }
    updateModal = (id) =>{
        let type = this.state.ItemTypes.find(i => i.id === id); 
        this.setState({
            ID:type.id,
            Name:type.name,
            Description:type.description,
            Show:true,
            Submit:'Update'
        })
    }
    deleteType = async (id) => {
        
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
            let response = await itemCtrl.delete("deleteType",id);
            if(response){
                Swal.fire(
                  'Deleted!',
                  'Type has been deleted.',
                  'success'
                );
                window.location.reload();
            }else{
                ErrorAlert(response.Error);
            }
        }
    }

    insertItemType = async event => {
        event.preventDefault();
        let obj = {Name:this.state.Name,Description:this.state.Description};
        let result = await catCtrl.insert("insertType",obj);
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
                            title="Item Type"
                            data={
                                this.state.ItemTypes.map(d => {
                                    let array = [
                                        d.id, d.name, d.description,
                                        <button className="btn btn-primary" onClick={this.updateModal.bind(this,d.id)} >Update <Icon icon={checkSquareO}/></button>,
                                        <button className="btn btn-danger" onClick={deleteType.bind(this,d.id)} >Delete <Icon icon={trashO}/></button>
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
                                        `${this.state.Submit} Item Type`
                                    }
                                </Modal.Title>
                            </Modal.Header>
                            <form id="myForm" method="post" onSubmit={this.insertItemType}>
                                <Modal.Body>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12 form-group">
                                                <label>Type Name</label>
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


export default Types